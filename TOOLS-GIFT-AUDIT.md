# ToolsGift — Security & Hardening Audit

**Date:** 2026-10-06
**Repo root:** `C:\Users\pc\OneDrive\Desktop\ToolsGift`
**Scope:** application source (`app/**`), `next.config.ts`, `package.json`, `tsconfig.json`, `eslint.config.mjs`, `public/**`, `.github/workflows/**`.
`.env.local` was never read, opened, or inspected; no secrets or env values appear in this document.
**Git state:** all changes are uncommitted in the working tree — no commits were made.

---

## 1. Verification (final run of this batch)

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | **PASS** (0 errors) |
| `npm run lint` | **PASS** (0 errors, 0 warnings) |
| `npm run build` | **PASS** (production build completes) |
| `npm audit --omit=dev` | **0 vulnerabilities** |
| `npm audit` | **5 high severity** (dev-only chain, accepted — see §2) |
| Next.js | **16.3.8** |

`package.json` and `package-lock.json` were **not modified by this hardening batch** — file hashes were captured before the work and re-verified identical afterwards. They do differ from `HEAD` because of earlier dependency remediation already present in the working tree: `next` 16.3.4 → 16.3.8, `xlsx` 0.18.5 → `0.20.3` (SheetJS CDN tarball), plus `overrides` for `pptxgenjs.image-size` and `argparse`.

The site ships **56 tool pages** (64 `page.tsx` files in total).

---

## 2. Findings status (actual current code)

### Fixed — verified in the current working tree

- **C1 — production build broken** → **FIXED.** `npm run build` completes.
- **C2 — UTF-8 BOM in `app/globals.css`** → **FIXED.** First bytes of the file are not a BOM.
- **H1 — Turbopack/webpack config conflict** → **FIXED.** `next.config.ts` uses `turbopack.root` + `outputFileTracingRoot` and has no webpack section; build passes.
- **C3 — AdSense loads before consent** → **FIXED.** The only third-party advertising script in the app is the AdSense tag in `app/layout.tsx`, wrapped in `<ConsentGate type="advertising">`. Verified behaviour in existing code: absent before any consent (`ConsentGate` starts as `false` and renders `null`), mounted on **Accept**, not mounted on **Reject**, unmounted and banner reopened on **Reset**. Every other `<script>` tag in `app/` is first-party JSON-LD structured data; `public/` contains no ad or tracking script.
- **H2 — `xlsx` 0.18.5 advisories** → **RESOLVED in the working tree.** Dependency now resolves `xlsx@0.20.3` from `https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz`; `npm audit --omit=dev` reports 0 vulnerabilities. (Change predates this batch; not touched here.)
- **H3 — Next.js RCE advisory** → **RESOLVED.** Next.js **16.3.8**; production audit clean.
- **H4 — DOMPurify advisory (transitive)** → **RESOLVED.** Lockfile resolves `dompurify@3.4.16` (via `jspdf` optional deps); production audit clean.
- **H5 — unauthenticated/unlimited upload & share abuse** → **FIXED.** Per-IP in-memory rate limits: share creation **10/hour**, video upload token **5/hour**, share deletion **30/hour**; size caps (image 4 MB, batch 20 MB total / 4 MB per image, file 50 MB, video 500 MB, text result 5 MB); zero-byte uploads rejected before any Blob write; `tool`/`resultTitle` validated (non-empty, ≤ 200 chars); content types normalized before storage and before being written into a response header; batch capped at 50 images; `sanitizeFilename` applied to every stored/served filename.
- **H6 — share page self-fetch trusting the Host header** → **FIXED.** `app/share/[id]/page.tsx` reads share metadata directly with `@vercel/blob` in a server component. A search of `app/` finds no `Host`/`x-forwarded-host` header reads and no self-fetch.
- **H7 — consent machinery not enforced / over-claiming** → **FIXED.** Consent is versioned (`CONSENT_VERSION = 2`, `policyVersion`), stored with `grantedAt`, and every Accept / Reject / Save / Reset path dispatches `toolsgift-consent-change` (Reset additionally dispatches `toolsgift-consent-reset`, which reopens the banner).
- **H8 — shared files/links cannot be deleted by the creator** → **FIXED in this batch.** Full design and verification in §3.
- **H10 — pdf.js worker fetched from CDN without SRI** → **FIXED.** `app/lib/pdfWorker.ts` resolves `pdfjs-dist/build/pdf.worker.min.mjs` through `new URL(..., import.meta.url)` — package-local, same origin, no CDN involved (so no SRI requirement).
- **Expiry purge** → already present: `app/lib/shareCleanup.ts` erases a share as soon as an expired link is accessed and runs a throttled sweep for expired share metadata and stale `video-uploads/` blobs.

### Partially fixed

- **H9 — heavy libraries statically imported** → **MOSTLY FIXED.** `pdfjs-dist`, `xlsx`, `jspdf`, `pptxgenjs`, `mammoth`, `tesseract.js` and `docx` are all loaded with `await import(...)` at point of use. **Remaining:** `jszip` is still a static import in `BatchConverter.tsx`, `PDFToJPG.tsx` and `PowerPointToPDF.tsx`.

### Dev-only tooling vulnerability — ACCEPTED (upstream, no safe fix)

- `braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next` — **5 high severity, dev-only**.
  - `npm audit --omit=dev` = **0 vulnerabilities** (no production impact).
  - The only `npm audit fix --force` route downgrades `eslint-config-next` to 14.x, which is prohibited (Next.js 16.3.8 must stay aligned). Not fixable without violating that constraint; left as accepted dev-tooling risk.

---

## 3. H8 — creator share deletion (implemented in this batch)

**Design**

1. `POST /api/share` generates `deleteCapability = randomBytes(32).toString("base64url")` (43 characters, CSPRNG) and persists **only** `sha256(capability)` as `deleteCapabilityHash` inside the private share metadata blob.
2. The plaintext capability is returned **exactly once**, in the creation response: `{ shareId, shareUrl, expiresAt, deleteCapability }`.
3. `GET /api/share` deletes `deleteCapabilityHash` from the object it returns; `/api/share/image` streams bytes only. The hash and the capability are therefore never readable through any read endpoint.
4. `DELETE /api/share?id=<shareId>` authenticates with `Authorization: Bearer <capability>`:
   share-id format check → capability format check → per-IP rate limit (30/hour) → read metadata → SHA-256 comparison using `timingSafeEqual` → `eraseShare()` (asset first, then metadata, so a partial failure never orphans an asset).
   No `console.*` statement in the route logs the capability; error logging covers the error object only.
5. Shares created before this change have no stored hash → `DELETE` answers **404** (no unauthenticated erasure path is opened).
6. **Creator UI** — a `Delete Link` button was added only where share creation already flows through a shared component: `ShareResult.tsx`, `ShareFileResult.tsx` (together ≈ 40 document/image tools) and `VideoToLink.tsx`. The capability is kept in component state, sent only in the Authorization header, and is never written to a URL, `localStorage`, or a log. Helper: `app/lib/shareDelete.ts`.

**Live verification** (local `next start`, stopped afterwards)

| Case | Result |
| --- | --- |
| Create text share | `200`, `deleteCapability` length 43 |
| `DELETE` with correct capability | `200 {"deleted":true}` |
| `GET` after deletion | `404` (metadata gone) |
| `DELETE` with wrong but well-formed capability | `401` |
| `DELETE` without `Authorization` | `401` |
| `DELETE` with malformed share id | `400` |
| `GET` payload contains `deleteCapabilityHash` | no |
| `GET` payload contains the capability | no |

Both shares created during verification were deleted; no test artifacts remain.

**Genuine remaining limitations**

- The capability exists only in the creator's page memory — closing or refreshing the tool page drops it (the link still expires on schedule).
- Shares created **before** this batch have no capability hash and cannot be creator-deleted (404) until they expire.
- Rate-limit counters are in-memory per server instance (not distributed).

---

## 4. Upload / share validation (this batch)

**Server (`app/api/share`)** — zero-byte file / image / video / batch item rejected with 400 *before* `put()`; batch larger than 50 images rejected; text share larger than 5 MB rejected with 413; `tool` and `resultTitle` must be non-empty and ≤ 200 characters; every stored content type goes through `normalizeContentType()` (bare `type/subtype` only, lower-cased, parameters stripped) and a video share must carry a real `video/*` type; image/batch entries must carry `image/*`.

**Server (`app/api/share/image`)** — the content type is re-normalized before it is written into the response header, and the filename is re-sanitized before `Content-Disposition`.

**Server (`app/api/video-upload`)** — upload path is validated before a token is issued (prefix `video-uploads/`, non-empty, ≤ 250 chars, trimmed, no control characters, no `.`/`..` path segments); the existing `video/*` allow-list, 500 MB cap and 5/hour/IP rate limit are unchanged.

**Client** — `VideoToLink` rejects empty video files and sanitizes the generated upload pathname *before* the Blob client upload starts; `ShareFileResult` refuses to upload a 0-byte file.

No CAPTCHA, database, Redis, external service, or dependency was added.

---

## 5. Consent behaviour (existing code only — verified, not re-implemented)

- **Before consent:** `ConsentGate` initial state is `false` → returns `null` → the AdSense script tag is not in the rendered DOM.
- **Accept All:** `saveCookieConsent(true, true)` + `toolsgift-consent-change` → `ConsentGate` re-checks → script mounts and loads.
- **Reject Optional:** `saveCookieConsent(false, false)` → gate stays closed → script never loads.
- **Reset** (Footer link and Cookie Preferences dialog): `clearCookieConsent()` + both events → script unmounted, consent banner re-opened.
- No other advertising or analytics script exists in `app/` or `public/`.

---

## 6. Tests

**NOT ADDED.** The repository has no test framework: no `test` script in `package.json`, no jest/vitest/playwright/mocha configuration, and no `*.test.*` / `*.spec.*` files under `app/`. Per instructions no test dependency was installed.

---

## 7. CI

Added `.github/workflows/ci.yml` (runs on push to `master` and on pull requests):

1. `npm ci`
2. `npx tsc --noEmit`
3. `npm run lint`
4. `npm run build`
5. `npm audit --omit=dev` — failing gate (currently 0 vulnerabilities)
6. `npm audit` — `continue-on-error: true`, informational only; **full audit is not a failing gate**

---

## 8. Genuine remaining items

1. **`jszip` statically imported** in `BatchConverter.tsx`, `PDFToJPG.tsx`, `PowerPointToPDF.tsx` (H9 remainder, bundle weight only).
2. **Dev-only `eslint-config-next` advisory chain** — accepted/upstream; no fix that respects the "no downgrade" constraint.
3. **No test framework** — process gap, deliberately not installed in this batch.
4. **In-memory rate limiting** — per instance; resets on cold start and is not shared across replicas.
5. **Delete capability is ephemeral** — not persisted (no accounts/database), so a creator can delete a share only in the session where it was created.
6. **Working tree is uncommitted** — no commits were made, as instructed.

---

## FINAL STATUS

- **Production audit (`npm audit --omit=dev`)**: **0 vulnerabilities**
- **Full audit (`npm audit`)**: **5 high severity, dev-only** (`braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next`) — **accepted/upstream**, only fixable by a prohibited downgrade; kept non-blocking in CI.
- **Build / typecheck / lint**: **PASS**
- **Next.js**: **16.3.8**; `package.json` / `package-lock.json` unchanged by this batch
- **H8 creator deletion**: **IMPLEMENTED AND VERIFIED** (capability → SHA-256 hash at rest → one-time plaintext → `DELETE` with `Authorization` header → asset + metadata erased; never logged)
- **Upload/share hardening**: **IMPLEMENTED** (rate limits, size/empty/type/metadata validation, filename sanitization, all before Blob where practical)
- **Consent**: **VERIFIED** (no ad script before consent; Accept loads, Reject does not, Reset removes it and reopens the UI)
- **Tests**: **NOT ADDED** (no existing framework)
- **CI**: **ADDED** (`.github/workflows/ci.yml`)
- **Ready for adding new tools?** **YES.** Typecheck, lint and production build all pass, production dependencies audit clean, and the share/upload/consent controls described above are in place. Remaining items are performance weight (jszip), dev-only tooling advisories, and process gaps (tests, commits) — none of them blocks adding new tools.
