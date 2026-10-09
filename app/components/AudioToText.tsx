"use client";

import { useEffect, useRef, useState } from "react";
import type { ProgressCallback } from "@huggingface/transformers";
import { WHISPER_LANGUAGES } from "@/app/lib/whisperLanguages";

type Mode = "english" | "multilingual";
type Phase = "idle" | "decoding" | "loading" | "transcribing" | "done";
type Device = "webgpu" | "wasm";

type Transcriber = (
  audio: Float32Array,
  options?: Record<string, unknown>,
) => Promise<{ text: string }>;

type LoadedTranscriber = {
  transcriber: Transcriber;
  device: Device;
};

const ENGLISH_MODEL = "onnx-community/whisper-tiny.en";
const MULTILINGUAL_MODEL = "onnx-community/whisper-tiny";
const TARGET_SAMPLE_RATE = 16000;
const CHUNK_LENGTH_S = 30;
const STRIDE_LENGTH_S = 5;
const MAX_FILE_BYTES = 100 * 1024 * 1024;
const MAX_AUDIO_SECONDS = 30 * 60;
const MIN_AUDIO_SECONDS = 0.4;
const ACCEPTED_EXTENSIONS = new Set([
  "mp3",
  "wav",
  "m4a",
  "aac",
  "flac",
  "ogg",
  "oga",
  "opus",
  "webm",
  "weba",
  "mp4",
  "aif",
  "aiff",
]);
const FILE_INPUT_ACCEPT =
  "audio/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.oga,.opus,.webm,.weba,.mp4,.aif,.aiff";

const transcriberCache = new Map<string, Promise<LoadedTranscriber>>();

function canUseWebGpu(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "gpu" in navigator &&
    typeof navigator.gpu !== "undefined"
  );
}

function getExtension(name: string): string {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index + 1).toLowerCase() : "";
}

function looksLikeAudio(file: File): boolean {
  if (file.type) {
    if (file.type.startsWith("audio/")) return true;
    if (file.type === "video/mp4" || file.type === "application/ogg") return true;
    return false;
  }
  return ACCEPTED_EXTENSIONS.has(getExtension(file.name));
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatClock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatElapsed(seconds: number): string {
  return `${seconds.toFixed(1)}s`;
}

function countChunks(durationSeconds: number): number {
  const windowLength = CHUNK_LENGTH_S;
  const jump = CHUNK_LENGTH_S - 2 * STRIDE_LENGTH_S;
  if (durationSeconds <= windowLength) return 1;
  let count = 1;
  let offset = 0;
  while (offset + windowLength < durationSeconds) {
    offset += jump;
    count += 1;
  }
  return count;
}

async function decodeAudioFile(
  file: File,
): Promise<{ duration: number; samples: Float32Array }> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioContextCtor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextCtor) {
    throw new Error("unsupported-browser");
  }
  const context = new AudioContextCtor();
  let buffer: AudioBuffer;
  try {
    buffer = await context.decodeAudioData(arrayBuffer);
  } finally {
    if (context.state !== "closed") {
      void context.close().catch(() => undefined);
    }
  }

  const duration = buffer.duration;
  if (!Number.isFinite(duration) || duration < MIN_AUDIO_SECONDS) {
    throw new Error("too-short");
  }
  if (duration > MAX_AUDIO_SECONDS) {
    throw new Error("too-long");
  }

  const frameCount = Math.max(1, Math.ceil(duration * TARGET_SAMPLE_RATE));
  const offlineContext = new OfflineAudioContext(1, frameCount, TARGET_SAMPLE_RATE);
  const source = offlineContext.createBufferSource();
  source.buffer = buffer;
  source.connect(offlineContext.destination);
  source.start();
  const rendered = await offlineContext.startRendering();
  if (rendered.length === 0) {
    throw new Error("decode-failed");
  }

  return { duration, samples: rendered.getChannelData(0) };
}

async function createTranscriber(
  model: string,
  preferWebGpu: boolean,
  onProgress: (percent: number) => void,
): Promise<LoadedTranscriber> {
  const { pipeline } = await import("@huggingface/transformers");
  const progressCallback: ProgressCallback = (info) => {
    if (info.status === "progress_total") {
      onProgress(Math.max(0, Math.min(100, Math.round(info.progress))));
    }
  };

  if (preferWebGpu) {
    try {
      const transcriber = await pipeline("automatic-speech-recognition", model, {
        dtype: "q8",
        device: "webgpu",
        progress_callback: progressCallback,
      });
      return { transcriber: transcriber as unknown as Transcriber, device: "webgpu" };
    } catch {
      // Fall through to the WebAssembly backend.
    }
  }

  const transcriber = await pipeline("automatic-speech-recognition", model, {
    dtype: "q8",
    progress_callback: progressCallback,
  });
  return { transcriber: transcriber as unknown as Transcriber, device: "wasm" };
}

async function loadTranscriber(
  model: string,
  onProgress: (percent: number) => void,
  forceWasm: boolean,
): Promise<LoadedTranscriber> {
  const preferWebGpu = !forceWasm && canUseWebGpu();
  const cacheKey = `${model}::${preferWebGpu ? "webgpu" : "wasm"}`;
  let pending = transcriberCache.get(cacheKey);
  if (!pending) {
    pending = createTranscriber(model, preferWebGpu, onProgress).catch((error) => {
      transcriberCache.delete(cacheKey);
      throw error;
    });
    transcriberCache.set(cacheKey, pending);
  }
  return pending;
}

function evictWebGpuEntries() {
  for (const key of [...transcriberCache.keys()]) {
    if (key.endsWith("::webgpu")) {
      transcriberCache.delete(key);
    }
  }
}

function describeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (message === "unsupported-browser") {
    return "This browser cannot decode audio files. Try the latest version of Chrome, Edge, Firefox or Safari.";
  }
  if (message === "too-short") {
    return "The audio file is empty or too short to transcribe.";
  }
  if (message === "too-long") {
    return "The audio is longer than 30 minutes. Please split it into shorter files first.";
  }
  if (
    message.includes("fetch") ||
    message.includes("network") ||
    message.includes("Failed to fetch") ||
    message.includes("Load failed")
  ) {
    return "The speech model could not be downloaded. Check your internet connection and try again — the model is cached after the first download.";
  }
  return "Transcription failed. Please try again, or use a different audio file or format.";
}

export default function AudioToText() {
  const inputRef = useRef<HTMLInputElement>(null);
  const samplesRef = useRef<Float32Array | null>(null);
  const startedAtRef = useRef<number>(0);

  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("english");
  const [language, setLanguage] = useState("en");
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [resultName, setResultName] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const busy = phase === "decoding" || phase === "loading" || phase === "transcribing";

  useEffect(() => {
    if (phase !== "loading" && phase !== "transcribing") return;
    const id = window.setInterval(() => {
      setElapsed((Date.now() - startedAtRef.current) / 1000);
    }, 250);
    return () => window.clearInterval(id);
  }, [phase]);

  const resetResult = () => {
    setText("");
    setResultName("");
    setCopied(false);
    setProgress(null);
    setElapsed(0);
  };

  const handleFile = async (selected: File) => {
    if (busy) return;
    resetResult();
    setError("");

    if (!looksLikeAudio(selected)) {
      setFile(null);
      samplesRef.current = null;
      setDuration(null);
      setError(
        "That does not look like an audio file. Please choose an audio recording such as MP3, WAV, FLAC, OGG, M4A/AAC, Opus or WebM.",
      );
      return;
    }

    if (selected.size > MAX_FILE_BYTES) {
      setFile(null);
      samplesRef.current = null;
      setDuration(null);
      setError(
        `This file is ${formatBytes(selected.size)}. The maximum supported size is ${formatBytes(MAX_FILE_BYTES)}.`,
      );
      return;
    }

    if (selected.size === 0) {
      setFile(null);
      samplesRef.current = null;
      setDuration(null);
      setError("The selected file is empty.");
      return;
    }

    setFile(selected);
    setPhase("decoding");
    setStatus("Reading audio…");
    setProgress(null);

    try {
      const { duration: decodedDuration, samples } = await decodeAudioFile(selected);
      samplesRef.current = samples;
      setDuration(decodedDuration);
      setPhase("idle");
      setStatus("");
    } catch (decodeError) {
      samplesRef.current = null;
      setDuration(null);
      setFile(selected);
      setPhase("idle");
      setStatus("");
      if (decodeError instanceof Error && decodeError.message === "too-long") {
        setError(
          "This recording is longer than 30 minutes. Please split it into shorter files first.",
        );
      } else if (
        decodeError instanceof Error &&
        decodeError.message === "too-short"
      ) {
        setError("The audio file is empty or too short to transcribe.");
      } else {
        setError(
          "Your browser could not decode this file. Please try a common format such as MP3, WAV or FLAC, or re-export the recording from another format.",
        );
      }
    }
  };

  const startTranscription = async () => {
    if (busy) return;
    const samples = samplesRef.current;
    if (!file || !samples || duration === null) {
      setError("Please choose an audio file first.");
      return;
    }

    setError("");
    resetResult();
    startedAtRef.current = Date.now();
    setElapsed(0);
    setPhase("loading");
    setStatus(
      canUseWebGpu()
        ? "Preparing the speech model…"
        : "Preparing the speech model… (first run downloads about 40 MB)",
    );
    setProgress(null);

    const model = mode === "english" ? ENGLISH_MODEL : MULTILINGUAL_MODEL;
    const totalChunks = countChunks(duration);
    let completedChunks = 0;
    let loaded: LoadedTranscriber | null = null;

    const handleModelProgress = (percent: number) => {
      setProgress(percent);
      setStatus(`Downloading the speech model… ${percent}%`);
    };

    try {
      loaded = await loadTranscriber(model, handleModelProgress, false);
    } catch (loadError) {
      setPhase("idle");
      setStatus("");
      setProgress(null);
      setError(describeError(loadError));
      return;
    }

    setPhase("transcribing");
    setProgress(0);
    setStatus("Transcribing speech to text…");

    const streamer = {
      put: () => undefined,
      end: () => {
        completedChunks += 1;
        const percent = Math.min(
          99,
          Math.round((completedChunks / Math.max(1, totalChunks)) * 100),
        );
        setProgress(percent);
        setStatus(`Transcribing speech to text… ${percent}%`);
      },
      flush: () => undefined,
    };

    const options: Record<string, unknown> = {
      chunk_length_s: CHUNK_LENGTH_S,
      stride_length_s: STRIDE_LENGTH_S,
      streamer,
    };
    if (mode === "multilingual") {
      options.language = language;
      options.task = "transcribe";
    }

    const run = async (current: LoadedTranscriber) =>
      current.transcriber(samples, options);

    try {
      let result: { text: string };
      try {
        result = await run(loaded);
      } catch (runError) {
        if (loaded.device === "webgpu") {
          evictWebGpuEntries();
          loaded = await loadTranscriber(model, handleModelProgress, true);
          setProgress(null);
          setStatus("Retrying on the compatible browser engine…");
          result = await run(loaded);
        } else {
          throw runError;
        }
      }

      const finalText = (result?.text ?? "").trim();
      setText(finalText);
      setResultName(file.name);
      setProgress(100);
      setPhase("done");
      setStatus(
        finalText
          ? `Transcription complete in ${formatElapsed((Date.now() - startedAtRef.current) / 1000)}.`
          : "Finished, but no speech was detected in this recording.",
      );
      if (!finalText) {
        setError(
          "No speech was detected. The recording may be silent, the language may not match, or the audio may be too noisy.",
        );
      }
    } catch (runError) {
      setPhase("idle");
      setStatus("");
      setProgress(null);
      setError(describeError(runError));
    }
  };

  const clearAndReset = () => {
    if (busy) return;
    setFile(null);
    samplesRef.current = null;
    setDuration(null);
    resetResult();
    setError("");
    setStatus("");
    setPhase("idle");
    setElapsed(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const copyText = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setError("Copying to the clipboard failed. Please select the text and copy it manually.");
    }
  };

  const downloadText = () => {
    if (!text) return;
    const baseName = (resultName || file?.name || "transcription").replace(
      /\.[^/.]+$/,
      "",
    );
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Audio to Text
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Transcribe speech from an audio file into editable text, entirely in
            your browser.
          </p>
        </div>

        <div className="mt-6">
          <input
            ref={inputRef}
            type="file"
            accept={FILE_INPUT_ACCEPT}
            className="sr-only"
            aria-label="Choose an audio file"
            disabled={busy}
            onChange={(event) => {
              const selected = event.target.files?.[0];
              if (selected) void handleFile(selected);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!busy) setDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!busy) setDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setDragging(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setDragging(false);
              if (busy) return;
              const dropped = event.dataTransfer.files?.[0];
              if (dropped) void handleFile(dropped);
            }}
            disabled={busy}
            aria-describedby="audio-to-text-formats"
            className={`w-full rounded-xl border-2 border-dashed px-6 py-12 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              dragging
                ? "border-blue-500 bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/30"
                : "border-gray-300 hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-500"
            } ${busy ? "cursor-not-allowed opacity-70" : ""}`}
          >
            <div className="text-4xl" aria-hidden="true">
              🎤
            </div>
            <div className="mt-3 font-semibold text-gray-900 dark:text-white">
              {phase === "decoding"
                ? "Reading audio…"
                : file
                  ? "Choose a different audio file"
                  : "Drop an audio file here or click to browse"}
            </div>
            <div
              id="audio-to-text-formats"
              className="mt-1 text-sm text-gray-500 dark:text-gray-400"
            >
              MP3, WAV, FLAC, OGG, M4A/AAC, Opus, WebM &middot; up to 100 MB and
              30 minutes
            </div>
          </button>
        </div>

        {file && (
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">
              Selected file
            </span>
            <span className="max-w-full truncate">{file.name}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {formatBytes(file.size)}
            </span>
            {duration !== null && (
              <span className="text-gray-500 dark:text-gray-400">
                {formatClock(duration)} audio
              </span>
            )}
            {!busy && (
              <button
                type="button"
                onClick={clearAndReset}
                className="ml-auto rounded-lg border border-gray-300 px-3 py-1 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Remove
              </button>
            )}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="audio-to-text-mode"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Model
            </label>
            <select
              id="audio-to-text-mode"
              value={mode}
              disabled={busy}
              onChange={(event) => setMode(event.target.value as Mode)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option value="english">
                English (optimized for English audio)
              </option>
              <option value="multilingual">
                Multilingual (choose the spoken language)
              </option>
            </select>
          </div>

          {mode === "multilingual" && (
            <div>
              <label
                htmlFor="audio-to-text-language"
                className="block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Spoken language
              </label>
              <select
                id="audio-to-text-language"
                value={language}
                disabled={busy}
                onChange={(event) => setLanguage(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              >
                {WHISPER_LANGUAGES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name.charAt(0).toUpperCase() + name.slice(1)} ({code})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void startTranscription()}
            disabled={busy || !file || duration === null}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phase === "done" ? "Transcribe Again" : "Start Transcription"}
          </button>

          {file && !busy && (
            <button
              type="button"
              onClick={clearAndReset}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Clear &amp; Reset
            </button>
          )}
        </div>

        {(busy || status) && (
          <div
            className="mt-6"
            role="status"
            aria-live="polite"
            data-testid="audio-to-text-status"
          >
            <div className="mb-2 flex justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span>{status}</span>
              {elapsed > 0 && busy && <span>{formatElapsed(elapsed)}</span>}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              {progress === null ? (
                <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-600" />
              ) : (
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
          >
            {error}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">
          <p>
            <span className="font-semibold text-gray-900 dark:text-white">
              Private by design:
            </span>{" "}
            your audio never leaves this browser. Transcription runs locally with
            the open-source Whisper speech model; on first use the model file
            (about 40 MB) is downloaded from Hugging Face and cached by your
            browser.
          </p>
          <p className="mt-2">
            Results depend on audio quality, background noise and the model
            selected. The multilingual model supports the languages listed in the
            selector, but accuracy varies by language.
          </p>
        </div>
      </section>

      {(phase === "done" || text) && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Transcribed Text
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {wordCount} {wordCount === 1 ? "word" : "words"} &middot;{" "}
              {text.length} characters
            </p>
          </div>

          <label htmlFor="audio-to-text-result" className="sr-only">
            Transcribed text
          </label>
          <textarea
            id="audio-to-text-result"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Transcribed text will appear here. You can edit it before copying or downloading."
            className="mt-4 min-h-72 w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copyText()}
              disabled={!text}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied" : "Copy Text"}
            </button>
            <button
              type="button"
              onClick={downloadText}
              disabled={!text}
              className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download TXT
            </button>
            <button
              type="button"
              onClick={clearAndReset}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Clear &amp; Reset
            </button>
          </div>

          {resultName && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Source: {resultName}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
