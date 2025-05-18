from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import docx
import os
import io
from generate_pdf import generate_pdf
from request import generate_quiz_questions_gemini

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the QuizGPT API"}


@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    filename = file.filename.lower()

    if filename.endswith(".txt"):
        content = await file.read()
        text = content.decode("utf-8")

    elif filename.endswith(".pdf"):
        try:
            reader = PyPDF2.PdfReader(file.file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error reading PDF: {str(e)}")

    elif filename.endswith(".docx"):
        try:
            contents = await file.read()
            with open("temp.docx", "wb") as temp_file:
                temp_file.write(contents)
            doc = docx.Document("temp.docx")
            text = "\n".join([para.text for para in doc.paragraphs])
            os.remove("temp.docx")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error reading DOCX: {str(e)}")

    else:
        raise HTTPException(
            status_code=400, detail="Unsupported file type. Please upload a .txt, .pdf, or .docx file.")

    quiz_text = generate_quiz_questions_gemini(text)

    pdf_data = generate_pdf(quiz_text)

    return StreamingResponse(io.BytesIO(pdf_data), media_type="application/pdf", headers={
        "Content-Disposition": "inline; filename=quiz.pdf"
    })
