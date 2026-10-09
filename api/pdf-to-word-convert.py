import os
import subprocess
import sys
import tempfile
from email.parser import BytesParser
from email.policy import default
from http.server import BaseHTTPRequestHandler
from pathlib import Path
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 4 * 1024 * 1024:
                return self.reply(413, b"PDF must be smaller than 4 MB.")
            content_type = self.headers.get("Content-Type", "")
            if "multipart/form-data" not in content_type:
                return self.reply(400, b"Upload a PDF file.")
            body = self.rfile.read(length)
            message = BytesParser(policy=default).parsebytes(
                ("Content-Type: " + content_type + "\r\nMIME-Version: 1.0\r\n\r\n").encode() + body
            )
            pdf_data = None
            filename = "document.pdf"
            for part in message.iter_parts():
                if part.get_content_disposition() == "form-data" and part.get_param("name", header="content-disposition") == "file":
                    filename = part.get_filename() or filename
                    pdf_data = part.get_payload(decode=True)
                    break
            if not pdf_data or not filename.lower().endswith(".pdf"):
                return self.reply(400, b"Please upload a PDF file.")
            with tempfile.TemporaryDirectory() as tmp:
                src, dst = Path(tmp) / "input.pdf", Path(tmp) / "output.docx"
                src.write_bytes(pdf_data)
                script = Path.cwd() / "scripts" / "pdf_to_word.py"
                result = subprocess.run([sys.executable, str(script), str(src), str(dst)], capture_output=True, text=True, timeout=240)
                if result.returncode != 0 or not dst.is_file() or dst.stat().st_size == 0:
                    print("PDF conversion failed:", result.stderr[-4000:])
                    return self.reply(500, b"Conversion failed. Please try another readable PDF.")
                data = dst.read_bytes()
            safe = "".join(c if c.isalnum() or c in "._-" else "_" for c in Path(filename).stem) or "document"
            self.send_response(200)
            self.send_header("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            self.send_header("Content-Disposition", 'attachment; filename="' + safe + '.docx"')
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
        except Exception as exc:
            print("PDF-to-Word error:", repr(exc))
            self.reply(500, b"Conversion failed. Please try again.")
    def reply(self, status, body):
        self.send_response(status)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)
