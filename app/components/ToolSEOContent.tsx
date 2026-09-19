import type { ReactNode } from "react";
type ToolSEOContentProps = {
  toolKey: string;
};
type ToolData = {
  name: string;
  description: string;
  action: string;
  input: string;
  output: string;
  useCase: string;
  benefit: string;
};
type RelatedTool = {
  name: string;
  href: string;
};
const RELATED_TOOLS: Record<string, RelatedTool[]> = {
  "pdf-comparer": [
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
    { name: "PDF Merger", href: "/tools/pdf-merger" },
    { name: "PDF Splitter", href: "/tools/pdf-splitter" },
  ],
  "pdf-compressor": [
    { name: "PDF Merger", href: "/tools/pdf-merger" },
    { name: "PDF Splitter", href: "/tools/pdf-splitter" },
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF Protector", href: "/tools/pdf-protector" },
  ],
  "pdf-cropper": [
    { name: "PDF Rotator", href: "/tools/pdf-rotator" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Page Numbers", href: "/tools/pdf-page-numbers" },
  ],
  "pdf-editor": [
    { name: "PDF Forms", href: "/tools/pdf-forms" },
    { name: "PDF Redactor", href: "/tools/pdf-redactor" },
    { name: "PDF Signer", href: "/tools/pdf-signer" },
    { name: "PDF Watermark", href: "/tools/pdf-watermark" },
  ],
  "pdf-forms": [
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Signer", href: "/tools/pdf-signer" },
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Redactor", href: "/tools/pdf-redactor" },
  ],
  "pdf-merger": [
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Splitter", href: "/tools/pdf-splitter" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
    { name: "PDF Protector", href: "/tools/pdf-protector" },
  ],
  "pdf-organizer": [
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Merger", href: "/tools/pdf-merger" },
    { name: "PDF Splitter", href: "/tools/pdf-splitter" },
    { name: "PDF Page Numbers", href: "/tools/pdf-page-numbers" },
  ],
  "pdf-page-numbers": [
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Cropper", href: "/tools/pdf-cropper" },
    { name: "PDF Rotator", href: "/tools/pdf-rotator" },
  ],
  "pdf-protector": [
    { name: "PDF Unlocker", href: "/tools/pdf-unlocker" },
    { name: "PDF Signer", href: "/tools/pdf-signer" },
    { name: "PDF Watermark", href: "/tools/pdf-watermark" },
    { name: "PDF Redactor", href: "/tools/pdf-redactor" },
  ],
  "pdf-redactor": [
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Unlocker", href: "/tools/pdf-unlocker" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Watermark", href: "/tools/pdf-watermark" },
  ],
  "pdf-repair": [
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Unlocker", href: "/tools/pdf-unlocker" },
    { name: "PDF Merger", href: "/tools/pdf-merger" },
  ],
  "pdf-rotator": [
    { name: "PDF Cropper", href: "/tools/pdf-cropper" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Page Numbers", href: "/tools/pdf-page-numbers" },
  ],
  "pdf-signer": [
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Forms", href: "/tools/pdf-forms" },
    { name: "PDF Watermark", href: "/tools/pdf-watermark" },
  ],
  "pdf-splitter": [
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Merger", href: "/tools/pdf-merger" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
  ],
  "pdf-summarizer": [
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF to Markdown", href: "/tools/pdf-to-markdown" },
    { name: "PDF Translator", href: "/tools/pdf-translator" },
    { name: "PDF Comparer", href: "/tools/pdf-comparer" },
  ],
  "pdf-to-excel": [
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint" },
    { name: "PDF to Markdown", href: "/tools/pdf-to-markdown" },
    { name: "PDF to PDF/A", href: "/tools/pdf-to-pdfa" },
  ],
  "pdf-to-jpg": [
    { name: "Image to PDF", href: "/tools/image-to-pdf" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Cropper", href: "/tools/pdf-cropper" },
    { name: "PDF Rotator", href: "/tools/pdf-rotator" },
  ],
  "pdf-to-markdown": [
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF Summarizer", href: "/tools/pdf-summarizer" },
    { name: "PDF Translator", href: "/tools/pdf-translator" },
    { name: "PDF to Excel", href: "/tools/pdf-to-excel" },
  ],
  "pdf-to-pdfa": [
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Repair", href: "/tools/pdf-repair" },
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
  ],
  "pdf-to-powerpoint": [
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF to Excel", href: "/tools/pdf-to-excel" },
    { name: "PDF to Markdown", href: "/tools/pdf-to-markdown" },
    { name: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf" },
  ],
  "pdf-to-word": [
    { name: "PDF to Excel", href: "/tools/pdf-to-excel" },
    { name: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint" },
    { name: "PDF to Markdown", href: "/tools/pdf-to-markdown" },
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
  ],
  "pdf-translator": [
    { name: "PDF Summarizer", href: "/tools/pdf-summarizer" },
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF to Markdown", href: "/tools/pdf-to-markdown" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
  ],
  "pdf-unlocker": [
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Repair", href: "/tools/pdf-repair" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "PDF Redactor", href: "/tools/pdf-redactor" },
  ],
  "pdf-watermark": [
    { name: "PDF Protector", href: "/tools/pdf-protector" },
    { name: "PDF Redactor", href: "/tools/pdf-redactor" },
    { name: "PDF Signer", href: "/tools/pdf-signer" },
    { name: "PDF Editor", href: "/tools/pdf-editor" },
  ],
  "background-remover": [
    { name: "Image Enhancer", href: "/tools/enhancer" },
    { name: "Image Compressor", href: "/tools/compressor" },
    { name: "Image Converter", href: "/tools/converter" },
    { name: "Image Resizer", href: "/tools/resizer" },
  ],
  "excel-to-pdf": [
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
    { name: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Protector", href: "/tools/pdf-protector" },
  ],
  "html-to-pdf": [
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
    { name: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf" },
    { name: "Image to PDF", href: "/tools/image-to-pdf" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
  ],
  "image-to-pdf": [
    { name: "Image Converter", href: "/tools/converter" },
    { name: "Image Compressor", href: "/tools/compressor" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Merger", href: "/tools/pdf-merger" },
  ],
  "image-to-word": [
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
    { name: "Image to PDF", href: "/tools/image-to-pdf" },
    { name: "OCR PDF", href: "/tools/ocr-pdf" },
    { name: "Image Converter", href: "/tools/converter" },
  ],
  "ocr-pdf": [
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF to Markdown", href: "/tools/pdf-to-markdown" },
    { name: "PDF Summarizer", href: "/tools/pdf-summarizer" },
    { name: "Image to PDF", href: "/tools/image-to-pdf" },
  ],
  "passport-photo": [
    { name: "Image Cropper", href: "/tools/cropper" },
    { name: "Image Resizer", href: "/tools/resizer" },
    { name: "Image Enhancer", href: "/tools/enhancer" },
    { name: "Image Compressor", href: "/tools/compressor" },
  ],
  "scan-to-pdf": [
    { name: "Image to PDF", href: "/tools/image-to-pdf" },
    { name: "OCR PDF", href: "/tools/ocr-pdf" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
    { name: "PDF Organizer", href: "/tools/pdf-organizer" },
  ],
  "social-qr-card": [
    { name: "Image Converter", href: "/tools/converter" },
    { name: "Image Compressor", href: "/tools/compressor" },
    { name: "Image Resizer", href: "/tools/resizer" },
    { name: "WebP Converter", href: "/tools/webp-converter" },
  ],
  "webp-converter": [
    { name: "Image Converter", href: "/tools/converter" },
    { name: "Image Compressor", href: "/tools/compressor" },
    { name: "Image Resizer", href: "/tools/resizer" },
    { name: "Batch Converter", href: "/tools/batch-converter" },
  ],
  "word-to-image": [
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
    { name: "Image Converter", href: "/tools/converter" },
    { name: "Image Compressor", href: "/tools/compressor" },
    { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
  ],
  "word-to-pdf": [
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf" },
    { name: "Excel to PDF", href: "/tools/excel-to-pdf" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
  ],
};const TOOLS: Record<string, ToolData> = {
  "background-remover": {
    name: "Background Remover",
    description: "Remove the background from images online to create cleaner product photos, profile graphics and visual assets.",
    action: "remove the background from an image",
    input: "a supported image file",
    output: "an image with the processed background",
    useCase: "product photography, profile graphics and design projects",
    benefit: "separating the main subject from an unwanted background",
  },
  "excel-to-pdf": {
    name: "Excel to PDF",
    description: "Convert Excel spreadsheets into PDF documents for sharing, printing and consistent document presentation.",
    action: "convert a spreadsheet into PDF",
    input: "an Excel spreadsheet supported by the tool",
    output: "a PDF version of the spreadsheet",
    useCase: "sharing spreadsheets as fixed-layout documents",
    benefit: "making spreadsheet files easier to share and print",
  },
  "compressor": {
    name: "Image Compressor",
    description: "Compress JPG, PNG and WebP images online to reduce file size while keeping useful image quality.",
    action: "compress an image and reduce its file size",
    input: "a supported JPG, PNG or WebP image",
    output: "a compressed image file",
    useCase: "reducing image sizes for websites, uploads, email attachments and storage",
    benefit: "making images easier to upload, share and store",
  },
  "converter": {
    name: "Image Converter",
    description: "Convert images online between JPG, PNG and WebP formats for flexible image use and sharing.",
    action: "convert an image from one supported format to another",
    input: "a supported JPG, PNG or WebP image",
    output: "an image in the selected output format",
    useCase: "changing image formats for websites, editing workflows, uploads and compatibility",
    benefit: "getting images into the format needed for different uses",
  },
  "batch-converter": {
    name: "Batch Image Converter",
    description: "Convert multiple JPG, PNG and WebP images online in one batch for faster image-processing workflows.",
    action: "convert multiple images together",
    input: "multiple supported JPG, PNG or WebP images",
    output: "converted image files in the selected format",
    useCase: "bulk image conversion for websites, projects, uploads and organized file collections",
    benefit: "converting multiple images without processing them one by one",
  },
  "cropper": {
    name: "Image Cropper",
    description: "Crop JPG, PNG and WebP images online to remove unwanted areas and create cleaner compositions.",
    action: "crop an image to the selected area",
    input: "a supported image file",
    output: "a cropped image file",
    useCase: "removing unwanted edges, changing framing and preparing images for different layouts",
    benefit: "creating cleaner image compositions with the area you need",
  },
  "enhancer": {
    name: "Image Enhancer",
    description: "Enhance images online to improve clarity and overall visual quality for everyday image-processing needs.",
    action: "enhance the appearance of an image",
    input: "a supported image file",
    output: "an enhanced image file",
    useCase: "improving images for websites, social media, documents and personal projects",
    benefit: "making images look clearer and more refined",
  },
  "image-metadata": {
    name: "Image Metadata",
    description: "View and manage image metadata online to inspect file information and remove supported metadata when needed.",
    action: "inspect or clean supported image metadata",
    input: "a supported image file",
    output: "image metadata information or a cleaned image file",
    useCase: "checking image file information and preparing images for sharing",
    benefit: "understanding and managing information stored inside image files",
  },
  "resizer": {
    name: "Image Resizer",
    description: "Resize JPG, PNG and WebP images online to specific dimensions for websites, uploads, documents and other uses.",
    action: "change the dimensions of an image",
    input: "a supported image file",
    output: "an image with the selected dimensions",
    useCase: "preparing images for websites, social media, documents and uploads",
    benefit: "getting images to the dimensions required for different platforms and layouts",
  },
  "rotator": {
    name: "Image Rotator",
    description: "Rotate JPG, PNG and WebP images online to correct orientation or create the desired image angle.",
    action: "rotate an image to the selected orientation",
    input: "a supported image file",
    output: "a rotated image file",
    useCase: "correcting image orientation and adjusting image presentation",
    benefit: "quickly fixing or changing the orientation of an image",
  },  "html-to-pdf": {
    name: "HTML to PDF",
    description: "Convert HTML content into PDF documents for saving, sharing, printing and document workflows.",
    action: "turn HTML content into a PDF document",
    input: "HTML content supported by the tool",
    output: "a PDF document generated from the HTML",
    useCase: "saving web-style content as portable documents",
    benefit: "creating a downloadable PDF from HTML content",
  },
  "image-to-pdf": {
    name: "Image to PDF",
    description: "Convert images into PDF documents for applications, records, sharing, printing and everyday document workflows.",
    action: "convert images into a PDF document",
    input: "supported image files",
    output: "a PDF containing the selected image content",
    useCase: "turning photos or scanned images into documents",
    benefit: "combining image content into a portable PDF file",
  },
  "image-to-word": {
    name: "Image to Word",
    description: "Convert image-based content into Word documents for editing, reuse and document workflows.",
    action: "convert image content into a Word document",
    input: "a supported image file",
    output: "a Word document generated from the image content",
    useCase: "working with content that starts as an image",
    benefit: "moving image-based content into an editable document workflow",
  },
  "ocr-pdf": {
    name: "OCR PDF",
    description: "Process scanned and image-based PDF documents with OCR to make text easier to search and work with.",
    action: "extract text from an image-based PDF",
    input: "a supported scanned or image-based PDF",
    output: "a processed PDF with OCR-related text content",
    useCase: "scanned documents and image-based PDF files",
    benefit: "making text inside scanned documents easier to search or reuse",
  },
  "passport-photo": {
    name: "Passport Photo Maker",
    description: "Create passport-size photos online for applications, documents and other identification-related uses.",
    action: "prepare an image as a passport-size photo",
    input: "a suitable photo",
    output: "a passport-size photo based on the tool's available settings",
    useCase: "application forms and document-photo requirements",
    benefit: "preparing a photo in a convenient document-photo format",
  },
  "pdf-comparer": {
    name: "PDF Comparer",
    description: "Compare PDF documents online to help identify differences between two document versions.",
    action: "compare two PDF documents",
    input: "two supported PDF documents",
    output: "a comparison result based on the selected documents",
    useCase: "checking different versions of contracts, reports or documents",
    benefit: "reviewing changes between PDF versions",
  },
  "pdf-compressor": {
    name: "PDF Compressor",
    description: "Compress PDF files online to reduce file size for easier sharing, storage and uploading.",
    action: "reduce the file size of a PDF",
    input: "a supported PDF document",
    output: "a compressed PDF file",
    useCase: "email attachments, uploads and file storage",
    benefit: "making large PDF files easier to handle and share",
  },
  "pdf-cropper": {
    name: "PDF Cropper",
    description: "Crop PDF pages online to remove unwanted margins and create cleaner document pages.",
    action: "crop the visible area of PDF pages",
    input: "a supported PDF document",
    output: "a PDF with the selected page areas cropped",
    useCase: "removing excess margins or unwanted page areas",
    benefit: "creating cleaner page layouts",
  },
  "pdf-editor": {
    name: "PDF Editor",
    description: "Edit PDF documents online for common document editing and file-management tasks.",
    action: "make supported edits to a PDF document",
    input: "a supported PDF document",
    output: "an edited PDF document",
    useCase: "making common changes to PDF files",
    benefit: "handling routine PDF editing without a separate desktop workflow",
  },
  "pdf-forms": {
    name: "PDF Forms",
    description: "Work with PDF forms online for common form-related document workflows.",
    action: "work with supported PDF form content",
    input: "a supported PDF form",
    output: "a processed PDF form",
    useCase: "digital form and document workflows",
    benefit: "handling supported PDF form tasks online",
  },
  "pdf-merger": {
    name: "Merge PDF",
    description: "Merge multiple PDF files into one document for easier sharing, organization and document management.",
    action: "combine multiple PDF files into one document",
    input: "two or more supported PDF files",
    output: "a single merged PDF",
    useCase: "combining reports, documents or related PDF files",
    benefit: "keeping related documents together in one PDF",
  },
  "pdf-organizer": {
    name: "PDF Organizer",
    description: "Rearrange PDF pages online to create documents in the order you need.",
    action: "reorder and organize PDF pages",
    input: "a supported PDF document",
    output: "an organized PDF with the selected page order",
    useCase: "fixing page order in reports, applications and document collections",
    benefit: "putting PDF pages into the correct sequence",
  },
  "pdf-page-numbers": {
    name: "PDF Page Numbers",
    description: "Add page numbers to PDF documents to improve navigation and document organization.",
    action: "add page numbers to PDF pages",
    input: "a supported PDF document",
    output: "a PDF containing the added page numbers",
    useCase: "reports, manuals, applications and longer documents",
    benefit: "making multi-page documents easier to navigate",
  },
  "pdf-protector": {
    name: "PDF Protector",
    description: "Protect PDF documents with supported security options for safer document sharing and file management.",
    action: "apply supported protection settings to a PDF",
    input: "a supported PDF document",
    output: "a protected PDF",
    useCase: "documents that need supported access protection",
    benefit: "adding an extra protection layer to a PDF file",
  },
  "pdf-redactor": {
    name: "PDF Redactor",
    description: "Redact sensitive information from PDF documents before sharing or publishing them.",
    action: "redact selected information from a PDF",
    input: "a supported PDF document",
    output: "a redacted PDF document",
    useCase: "removing sensitive information before document sharing",
    benefit: "helping prevent selected information from being disclosed",
  },
  "pdf-repair": {
    name: "PDF Repair",
    description: "Repair supported damaged or problematic PDF files when documents do not open or work correctly.",
    action: "attempt to repair a problematic PDF",
    input: "a supported PDF that has a problem",
    output: "a repaired PDF when the file can be successfully processed",
    useCase: "PDF files that fail to open or behave unexpectedly",
    benefit: "attempting recovery of a usable PDF document",
  },
  "pdf-rotator": {
    name: "PDF Rotator",
    description: "Rotate PDF pages online to correct document orientation and alignment.",
    action: "rotate PDF pages",
    input: "a supported PDF document",
    output: "a PDF with the selected page orientation changed",
    useCase: "correcting sideways or incorrectly oriented pages",
    benefit: "making PDF pages easier to read and present",
  },
  "pdf-signer": {
    name: "PDF Signer",
    description: "Add electronic signatures to PDF documents for common digital signing workflows.",
    action: "add a supported signature to a PDF",
    input: "a supported PDF document and the required signature information",
    output: "a signed PDF document",
    useCase: "documents that need a digital signing step",
    benefit: "handling supported signing tasks online",
  },
  "pdf-splitter": {
    name: "PDF Splitter",
    description: "Split PDF documents into separate files or selected pages for easier sharing and organization.",
    action: "split a PDF into selected pages or sections",
    input: "a supported PDF document",
    output: "one or more PDF files based on the selected split options",
    useCase: "separating chapters, pages or sections from a larger PDF",
    benefit: "creating smaller, more focused PDF files",
  },
  "pdf-summarizer": {
    name: "PDF Summarizer",
    description: "Summarize PDF documents to review the main information in longer files more quickly.",
    action: "create a summary of PDF content",
    input: "a supported PDF document",
    output: "a generated summary of the document content",
    useCase: "quickly reviewing longer reports and documents",
    benefit: "getting a shorter overview before reading the complete document",
  },
  "pdf-to-excel": {
    name: "PDF to Excel",
    description: "Convert PDF tables and document content into Excel files for spreadsheet-based workflows.",
    action: "convert supported PDF content into an Excel file",
    input: "a supported PDF document",
    output: "an Excel spreadsheet",
    useCase: "working with tabular PDF information in spreadsheets",
    benefit: "moving supported PDF data into a spreadsheet workflow",
  },
  "pdf-to-jpg": {
    name: "PDF to JPG",
    description: "Convert PDF pages into JPG images for previews, sharing and image-based workflows.",
    action: "convert PDF pages into JPG images",
    input: "a supported PDF document",
    output: "JPG images generated from the PDF pages",
    useCase: "creating image previews or sharing individual PDF pages as images",
    benefit: "turning document pages into common image files",
  },
  "pdf-to-markdown": {
    name: "PDF to Markdown",
    description: "Convert PDF content into Markdown format for documentation, editing and structured text workflows.",
    action: "convert supported PDF content into Markdown",
    input: "a supported PDF document",
    output: "Markdown text or a Markdown file",
    useCase: "documentation and text-editing workflows",
    benefit: "moving supported PDF content into a Markdown-based workflow",
  },
  "pdf-to-pdfa": {
    name: "PDF to PDF/A",
    description: "Convert PDF documents to PDF/A format for long-term document preservation and archival workflows.",
    action: "convert a PDF into PDF/A format",
    input: "a supported PDF document",
    output: "a PDF/A document when conversion succeeds",
    useCase: "document archiving and long-term preservation workflows",
    benefit: "preparing documents for PDF/A-based archival workflows",
  },
  "pdf-to-powerpoint": {
    name: "PDF to PowerPoint",
    description: "Convert PDF documents into PowerPoint presentations for editing and presentation workflows.",
    action: "convert supported PDF content into a PowerPoint presentation",
    input: "a supported PDF document",
    output: "a PowerPoint presentation",
    useCase: "turning PDF-based material into presentation content",
    benefit: "moving supported PDF content into a presentation workflow",
  },
  "pdf-to-word": {
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word files for editing and content reuse.",
    action: "convert supported PDF content into a Word document",
    input: "a supported PDF document",
    output: "a Word document",
    useCase: "editing or reusing content from PDF documents",
    benefit: "moving supported PDF content into an editable document workflow",
  },
  "pdf-translator": {
    name: "PDF Translator",
    description: "Translate PDF document content online to make supported files easier to read in different languages.",
    action: "translate supported PDF content",
    input: "a supported PDF document",
    output: "translated document content or a translated PDF result",
    useCase: "reading documents written in another language",
    benefit: "making supported PDF content easier to understand across languages",
  },
  "pdf-unlocker": {
    name: "PDF Unlocker",
    description: "Remove supported PDF restrictions from documents you are authorized to modify.",
    action: "remove supported restrictions from a PDF",
    input: "a PDF whose restrictions you are authorized to modify",
    output: "a PDF with supported restrictions removed",
    useCase: "working with PDF files that have supported editing or access restrictions",
    benefit: "restoring supported document functionality for authorized users",
  },
  "pdf-watermark": {
    name: "PDF Watermark",
    description: "Add watermarks to PDF documents for branding, identification and document management.",
    action: "add a watermark to PDF pages",
    input: "a supported PDF document and the watermark information",
    output: "a watermarked PDF",
    useCase: "branding, document identification and file management",
    benefit: "adding visible identification or branding to PDF pages",
  },
  "powerpoint-to-pdf": {
    name: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF for consistent sharing, printing and distribution.",
    action: "convert a presentation into PDF",
    input: "a supported PowerPoint presentation",
    output: "a PDF version of the presentation",
    useCase: "sharing presentations as fixed-layout documents",
    benefit: "creating a convenient PDF version for sharing or printing",
  },
  "scan-to-pdf": {
    name: "Scan to PDF",
    description: "Create PDF documents from scanned or captured pages for digital storage and sharing.",
    action: "create a PDF from scanned or captured pages",
    input: "supported scanned or captured page images",
    output: "a PDF document containing the selected pages",
    useCase: "digitizing paper documents and scanned pages",
    benefit: "bringing scanned pages together into a PDF document",
  },
  "social-qr-card": {
    name: "QR Code Generator",
    description: "Create QR code cards for social profiles, links and contact information.",
    action: "create a QR code from supported link or contact information",
    input: "a supported URL, profile link or contact detail",
    output: "a generated QR code card",
    useCase: "sharing social profiles, websites and contact information",
    benefit: "giving people a quick way to open a link by scanning a QR code",
  },
  "webp-converter": {
    name: "WebP Converter",
    description: "Convert images to and from WebP format for websites and flexible image workflows.",
    action: "convert an image between supported formats and WebP",
    input: "a supported image file",
    output: "an image in the selected supported format",
    useCase: "website images and modern image-format workflows",
    benefit: "changing image formats for different compatibility or web-use needs",
  },
  "word-to-image": {
    name: "Word to Image",
    description: "Convert Word document pages into images for previews, sharing and image-based document workflows.",
    action: "convert Word document pages into images",
    input: "a supported Word document",
    output: "image files generated from the document pages",
    useCase: "sharing document pages as images or creating previews",
    benefit: "turning document pages into common image-based content",
  },
  "word-to-pdf": {
    name: "Word to PDF",
    description: "Convert Word documents to PDF for sharing, printing and document distribution.",
    action: "convert a Word document into PDF",
    input: "a supported Word document",
    output: "a PDF version of the document",
    useCase: "sharing documents in a consistent PDF format",
    benefit: "creating a portable version of a Word document",
  },
};
export default function ToolSEOContent({
  toolKey,
}: ToolSEOContentProps): ReactNode {
  const tool = TOOLS[toolKey];
  if (!tool) return null;
  const faq = [
    [
      `What does ${tool.name} do?`,
      `ToolsGift ${tool.name} is designed to ${tool.action}. It is intended for ${tool.useCase}.`,
    ],
    [
      `How do I use ${tool.name}?`,
      `Open the ${tool.name} tool, provide ${tool.input}, use the available options, start the operation and download ${tool.output} when processing is complete.`,
    ],
    [
      `What can I use with ${tool.name}?`,
      `Use ${tool.input}. The exact supported formats and file requirements are shown by the tool's upload or input interface.`,
    ],
    [
      `What result does ${tool.name} create?`,
      `${tool.name} creates ${tool.output}. The exact result depends on the file and options selected during processing.`,
    ],
    [
      `Who can use ${tool.name}?`,
      `${tool.name} can be useful for everyday personal, work, study and document or image-processing tasks related to ${tool.useCase}.`,
    ],
    [
      `Why would I use ${tool.name} online?`,
      `Using ${tool.name} online can be convenient when you need to ${tool.action} without installing separate desktop software.`,
    ],
    [
      `Can I use ${tool.name} for ${tool.useCase}?`,
      `Yes. ${tool.name} is designed for workflows such as ${tool.useCase}, provided the required input is supported by the tool.`,
    ],
    [
      `What if ${tool.name} does not process my file?`,
      `Check that ${tool.input} meets the tool's supported requirements and try again. If the issue continues, test with another compatible file.`,
    ],
  ];
  return (
    <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900">
        About {tool.name}
      </h2>
      <p className="mt-3 leading-7 text-slate-600">{tool.description}</p>
      <h2 className="mt-7 text-2xl font-bold text-slate-900">
        How to Use {tool.name}
      </h2>
      <p className="mt-3 leading-7 text-slate-600">
        Start by providing {tool.input}. Then use the available controls to
        {` ${tool.action}`} and download {tool.output} when processing is
        complete.
      </p>
      <h2 className="mt-7 text-2xl font-bold text-slate-900">
        Common Uses of {tool.name}
      </h2>
      <p className="mt-3 leading-7 text-slate-600">
        {tool.name} can be useful for {tool.useCase}. Its main benefit is{" "}
        {tool.benefit}.
      </p>
      <h2 className="mt-7 text-2xl font-bold text-slate-900">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 space-y-5">
        {faq.map(([question, answer]) => (
          <div key={question}>
            <h3 className="text-lg font-semibold text-slate-900">
              {question}
            </h3>
            <p className="mt-2 leading-7 text-slate-600">{answer}</p>
          </div>
        ))}
      </div>
      {RELATED_TOOLS[toolKey] && (
        <div className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-bold text-slate-900">Related Tools</h2>
          <p className="mt-2 text-sm text-slate-600">Explore more useful tools for working with your files.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED_TOOLS[toolKey].map((relatedTool) => (
              <a
                key={relatedTool.href}
                href={relatedTool.href}
                className="rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-sm font-medium text-black transition hover:border-black/20 hover:bg-slate-100"
              >
                {relatedTool.name}
              </a>
            ))}
          </div>
        </div>
      )}    </section>
  );
}



