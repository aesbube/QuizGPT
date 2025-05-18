import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key=os.getenv("GEMINI_API_KEY")


def generate_quiz_questions_gemini(text: str) -> str:
    prompt = f"""You are an AI teacher. Create 15 multiple-choice quiz questions based on the following content. Each question should have 4 options (A-D) and indicate the correct answer. Give me only the questions without any additional text or explanation. 

Content:
{text}

Format:
1. Question?
   A) Option A
   B) Option B
   C) Option C
   D) Option D
   Answer: B
"""

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text
