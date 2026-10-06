# ToolsGift

ToolsGift is a fast, client-side suite of free online image and PDF tools
(compressor, converter, resizer, PDF merger/splitter, OCR, editor, signer, and
more). Files are processed in your browser whenever possible, which keeps your
documents on your device.

## Features

- 50+ image, PDF, and utility tools
- Client-side file processing (privacy-friendly)
- "Share result" links for text, images, batch ZIPs, documents, and videos
- Video → Link uploads with configurable expiry
- Cookie consent with opt-in gating for advertising (no scripts load before
  consent)
- Light/dark theme, 26-language UI selector, SEO metadata and sitemap

## Tech stack

- Next.js (App Router, Turbopack build)
- React 19 + TypeScript
- Tailwind CSS v4
- Vercel Blob (`@vercel/blob`) for the Share / Video upload features
- Client libraries: pdf-lib, pdfjs-dist, jspdf, tesseract.js, xlsx, docx,
  mammoth, pptxgenjs, and others

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

The Share and Video upload features use Vercel Blob. For those API routes to
work (locally or in production) provide a Blob read/write token:

```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

Put it in `.env.local` locally and set it as an environment variable in the
Vercel project. Note that `*.env*` files are gitignored and never committed.
Without this token the rest of the site still builds and works; only file
sharing/upload endpoints will fail at runtime.

## Scripts

| Command            | Purpose                              |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm run build`    | Production build (Turbopack)         |
| `npm run start`    | Start the production server          |
| `npm run lint`     | Run ESLint                           |
| `npx tsc --noEmit` | Type-check without emitting files    |

## Project structure

- `app/tools/*/page.tsx` - one page per tool (static, with metadata/JSON-LD)
- `app/components/*` - tool UI components; most processing is client-side
- `app/api/share/*` - share creation, metadata, and file download endpoints
- `app/api/video-upload` - Vercel Blob handleUpload proxy for videos
- `app/lib/shareCleanup.ts` - expiry sweep and erasure for shared blobs
- `public/` - static assets (OG image, Tesseract worker assets, ads.txt)

## Deploying on Vercel

Connect the repository to Vercel. The build command is `npm run build` (Next.js
default). Set `BLOB_READ_WRITE_TOKEN` in the project environment variables
before enabling the share/video features.

For local production testing that mirrors Vercel, run `npm run build` then
`npm run start` from the repo root (CI and Vercel build from the repo root).