
import os
import shutil
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse

from services import ai_service
from services.pdf_service import extract_text_from_pdf
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

router = APIRouter()
UPLOAD_FOLDER = "uploads"

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        chunks = extract_text_from_pdf(file_path)
        count = ai_service.index_pdf(chunks)
        print(f"Fichier PDF téléchargé et traité avec succès indexé en {len(chunks)} chunks.")
        return {"message": f"Fichier PDF téléchargé et traité avec succès indexé en {len(chunks)} chunks."}
    except Exception as e:
        return {"error": f"Erreur lors du téléchargement ou du traitement du PDF : {e}"}

@router.post("/ask")
async def ask_question(question: str):
    return StreamingResponse(ai_service.get_streaming_response(question), media_type="text/event-stream")