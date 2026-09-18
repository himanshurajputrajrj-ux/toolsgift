import type { ReactNode } from "react";
type ToolSEOContentProps = {
  toolKey: string;
};
const TOOLS: Record<string, { name: string; description: string }> = {
  "background-remover": {
    name: "Background Remover",
    description: "Remove image backgrounds online for product photos, profile graphics, presentations and everyday image editing.",
  },
  "excel-to-pdf": {
    name: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF online for sharing, printing and consistent document presentation.",
  },
  "html-to-pdf": {
    name: "HTML to PDF",
    description: "Convert HTML content into PDF documents online for saving, sharing, printing and document workflows.",
  },
  "image-to-pdf": {
    name: "Image to PDF",
    description: "Convert images into PDF documents online for documents, applications, sharing and printing.",
  },
  "image-to-word": {
    name: "Image to Word",
    description: "Convert image-based content into Word documents online for editing and document reuse.",
  },
  "ocr-pdf": {
    name: "OCR PDF",
    description: "Extract searchable text from scanned and image-based PDF documents with online OCR processing.",
  },
  "passport-photo": {
    name: "Passport Photo Maker",
    description: "Create passport-size photos online for applications, documents and other identification-related uses.",
  },
  "pdf-comparer": {
    name: "PDF Comparer",
    description: "Compare two PDF documents online to identify differences between document versions.",
  },
  "pdf-compressor": {
    name: "PDF Compressor",
    description: "Compress PDF files online to reduce file size for easier sharing, storage and uploading.",
  },
  "pdf-cropper": {
    name: "PDF Cropper",
    description: "Crop PDF pages online to remove unwanted margins and create cleaner document pages.",
  },
  "pdf-editor": {
    name: "PDF Editor",
    description: "Edit PDF documents online for common document editing and file-management tasks.",
  },
  "pdf-forms": {
    name: "PDF Forms",
    description: "Work with PDF forms online for common form-related document workflows.",
  },
  "pdf-merger": {
    name: "Merge PDF",
    description: "Merge multiple PDF files into one document online for easier sharing and organization.",
  },
  "pdf-organizer": {
    name: "PDF Organizer",
    description: "Rearrange and organize PDF pages online to create documents in the order you need.",
  },
  "pdf-page-numbers": {
    name: "PDF Page Numbers",
    description: "Add page numbers to PDF documents online to improve navigation and document organization.",
  },
  "pdf-protector": {
    name: "PDF Protector",
    description: "Protect PDF documents online with supported security options for safer document sharing.",
  },
  "pdf-redactor": {
    name: "PDF Redactor",
    description: "Redact sensitive information from PDF documents before sharing or publishing them.",
  },
  "pdf-repair": {
    name: "PDF Repair",
    description: "Repair supported damaged or problematic PDF files when documents do not open or work correctly.",
  },
  "pdf-rotator": {
    name: "PDF Rotator",
    description: "Rotate PDF pages online to correct document orientation and alignment.",
  },
  "pdf-signer": {
    name: "PDF Signer",
    description: "Add electronic signatures to PDF documents online for common digital signing workflows.",
  },
  "pdf-splitter": {
    name: "PDF Splitter",
    description: "Split PDF documents online into separate files or selected pages for easier sharing and organization.",
  },
  "pdf-summarizer": {
    name: "PDF Summarizer",
    description: "Summarize PDF documents online to review the main information in longer files more quickly.",
  },
  "pdf-to-excel": {
    name: "PDF to Excel",
    description: "Convert PDF tables and document content into Excel files for spreadsheet-based workflows.",
  },
  "pdf-to-jpg": {
    name: "PDF to JPG",
    description: "Convert PDF pages into JPG images online for previews, sharing and image-based workflows.",
  },
  "pdf-to-markdown": {
    name: "PDF to Markdown",
    description: "Convert PDF content into Markdown format for documentation, editing and structured text workflows.",
  },
  "pdf-to-pdfa": {
    name: "PDF to PDF/A",
    description: "Convert PDF documents to PDF/A format for long-term document preservation and archival workflows.",
  },
  "pdf-to-powerpoint": {
    name: "PDF to PowerPoint",
    description: "Convert PDF documents into PowerPoint presentations for editing and presentation workflows.",
  },
  "pdf-to-word": {
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word files for editing and content reuse.",
  },
  "pdf-translator": {
    name: "PDF Translator",
    description: "Translate PDF document content online to make files easier to read in different languages.",
  },
  "pdf-unlocker": {
    name: "PDF Unlocker",
    description: "Remove supported PDF restrictions from documents you are authorized to modify.",
  },
  "pdf-watermark": {
    name: "PDF Watermark",
    description: "Add watermarks to PDF documents online for branding, identification and document management.",
  },
  "powerpoint-to-pdf": {
    name: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF for consistent sharing, printing and distribution.",
  },
  "scan-to-pdf": {
    name: "Scan to PDF",
    description: "Create PDF documents from scanned or captured pages for digital storage and sharing.",
  },
  "social-qr-card": {
    name: "QR Code Generator",
    description: "Create QR code cards for social profiles, links and contact information.",
  },
  "webp-converter": {
    name: "WebP Converter",
    description: "Convert images to and from WebP format online for websites and flexible image workflows.",
  },
  "word-to-image": {
    name: "Word to Image",
    description: "Convert Word document pages into images for previews, sharing and image-based workflows.",
  },
  "word-to-pdf": {
    name: "Word to PDF",
    description: "Convert Word documents to PDF online for sharing, printing and document distribution.",
  },
};
const FAQS: Record<string, [string, string][]> = {
  image: [
    ["Can I use this tool online?", "Yes. ToolsGift provides this tool directly in your web browser without requiring a separate desktop application."],
    ["How do I use this tool?", "Select your file, use the available options, start processing and download the resulting file."],
    ["Is this tool free to use?", "The ToolsGift tool is available online for everyday file-processing tasks."],
    ["What file formats are supported?", "Supported formats depend on the specific tool. The upload interface shows the formats accepted by the tool."],
    ["Can I process another file?", "Yes. After completing one operation, you can select another supported file and process it."],
    ["Do I need special software?", "No separate desktop software is required to use the online tool."],
    ["Can I download the result?", "Yes. After processing is complete, use the download option provided by the tool."],
    ["What if my file does not process?", "Check that the file is supported and try again. A different compatible file can also help identify whether the issue is file-specific."],
  ],
  pdf: [
    ["Can I use this PDF tool online?", "Yes. ToolsGift provides this PDF tool through your web browser for common PDF document workflows."],
    ["How do I use the PDF tool?", "Select the required PDF file or files, configure the available options, start the operation and download the result."],
    ["Is this PDF tool free to use?", "The ToolsGift PDF tool is available online for everyday PDF-processing tasks."],
    ["What PDF files are supported?", "The supported file requirements depend on the individual tool. The upload interface shows the applicable options."],
    ["Can I process another PDF?", "Yes. You can select another supported PDF after completing an operation."],
    ["Will my original PDF be changed?", "The processed result is created separately. Keep your original file if you need an unchanged copy."],
    ["Can I download the processed PDF?", "Yes. Use the download control provided after the PDF operation finishes."],
    ["What if my PDF does not process?", "Check that the document is a valid supported PDF and try the operation again."],
  ],
  office: [
    ["Can I use this converter online?", "Yes. ToolsGift provides the conversion tool directly in your web browser."],
    ["How do I convert a file?", "Upload the source document, choose the available options, start processing and download the generated file."],
    ["What formats are supported?", "Supported input and output formats depend on the specific converter and are shown in its interface."],
    ["Is the converter free to use?", "The ToolsGift converter is available online for everyday document conversion."],
    ["Can I edit the converted file?", "If the output format is editable, you can open it in compatible software and make further changes."],
    ["Can I convert another document?", "Yes. After the first conversion, you can select another supported document."],
    ["Can I download the converted file?", "Yes. The resulting file can be downloaded after processing is complete."],
    ["What if conversion fails?", "Check that the source file is supported and try again with a compatible document."],
  ],
};
export default function ToolSEOContent({ toolKey }: ToolSEOContentProps): ReactNode {
  const tool = TOOLS[toolKey];
  if (!tool) return null;
  const type =
    toolKey.startsWith("pdf-") ||
    toolKey === "ocr-pdf" ||
    toolKey === "scan-to-pdf"
      ? "pdf"
      : toolKey.includes("excel") ||
        toolKey.includes("word") ||
        toolKey.includes("powerpoint") ||
        toolKey === "html-to-pdf"
        ? "office"
        : "image";
  const faqs = FAQS[type];
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
        Open the tool, select the required file or enter the required
        information, use the available options, start processing and download
        the result when it is ready.
      </p>
      <h2 className="mt-7 text-2xl font-bold text-slate-900">
        Why Use {tool.name} Online?
      </h2>
      <p className="mt-3 leading-7 text-slate-600">
        An online workflow can be convenient when you need to complete a
        file-processing task without installing separate desktop software.
        ToolsGift is designed for simple, everyday image and document
        workflows.
      </p>
      <h2 className="mt-7 text-2xl font-bold text-slate-900">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 space-y-5">
        {faqs.map(([question, answer]) => (
          <div key={question}>
            <h3 className="text-lg font-semibold text-slate-900">
              {question}
            </h3>
            <p className="mt-2 leading-7 text-slate-600">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
