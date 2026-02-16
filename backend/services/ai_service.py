

import asyncio
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import ChatOllama
from langchain_community.vectorstores import Chroma
from typer import prompt


class AIService:
    def __init__(self):
        self.embed_model = HuggingFaceEmbeddings(model_name="paraphrase-MiniLM-L3-v2")
        self.vector_db = None
        self.llm = ChatOllama(
            model="qwen2.5:0.5b",
            temperature=0.3, # Plus proche de 0 = plus factuel et moins d'hallucinations
            top_k=20,
            top_p=0.9
        )

    def index_pdf(self,chunks):
        self.vector_db = Chroma.from_documents(chunks, self.embed_model)
        return f"PDF indexé avec succès en {len(chunks)} chunks."
    
    async def get_streaming_response(self, question:str):
        if not self.vector_db:
            yield "data: error:Aucun document PDF n'a été chargé. Veuillez d'abord télécharger un PDF.\n\n"
            return
        docs = self.vector_db.similarity_search(question, k=3)
        context = "\n---\n".join([doc.page_content for doc in docs])
        prompt_text = f"""
        Tu réponds UNIQUEMENT avec les informations présentes dans les extraits.
        Si l'information n'est PAS dans le document, réponds EXACTEMENT :
        "Information non présente dans le document."

        N'ajoute aucune connaissance externe.
        N'interprète pas.
        N'invente rien.
        Répond dans la même langue que la question posée.

        EXTRAITS :
        {context}

        QUESTION : {question}

        RÉPONSE :
        """
        try:
            async for chunk in self.llm.astream(prompt):
                if chunk.content:
                    yield f"data: {chunk.content}\n\n"
                    await asyncio.sleep(0.01)
        except Exception as e:
            yield f"data: Erreur IA : {str(e)}\n\n"

ai_service = AIService()