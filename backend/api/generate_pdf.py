from fpdf import FPDF

def generate_pdf(quiz_text: str) -> bytes:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    for line in quiz_text.split('\n'):
        pdf.multi_cell(0, 10, line)
    pdf_bytes = bytes()
    pdf.output("quiz.pdf")
    with open("quiz.pdf", "rb") as f:
        pdf_bytes = f.read()
    return pdf_bytes