
import fitz
from langchain_text_splitters import RecursiveCharacterTextSplitter

def extract_text_from_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        text=""
        for page in doc:
            text += page.get_text()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.create_documents([text])
        return chunks
    except Exception as e:
        print(f"Erreur lors de l'extraction du texte : {e}")
        return None