# 🧠 DocuMind AI

**DocuMind AI** est une application RAG (Retrieval-Augmented Generation) haute performance qui permet de discuter en temps réel avec vos documents PDF. L'application utilise une IA locale (via Ollama) pour garantir la confidentialité des données et une réponse ultra-rapide.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20TS-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Ollama](https://img.shields.io/badge/IA-Ollama%20(Qwen%202.5)-orange)

---

## 🚀 Fonctionnalités

- 📂 **Analyse de PDF :** Extraction de texte et découpage intelligent (Chunking) avec `LangChain`.
- ⚡ **Vector Database :** Indexation sémantique locale avec `ChromaDB`.
- 🤖 **IA Locale :** Réponses générées par le modèle `qwen2.5:0.5b` via Ollama.
- 💬 **Streaming UI :** Interface de chat fluide avec rendu Markdown complet.
- 🏗️ **Clean Architecture :** Séparation stricte entre les services (IA, PDF) et les contrôleurs API.

---

## 🛠️ Stack Technique

### Frontend
- **React 18** (TypeScript)
- **Tailwind CSS** (UI Moderne & Dark Mode)
- **React Markdown** (Rendu des réponses structurées)
- **Lucide React** (Iconographie)

### Backend
- **FastAPI** (Python 3.10+)
- **LangChain / Ollama** (Orchestration LLM)
- **ChromaDB** (Base de données vectorielle)
- **PyMuPDF** (Parsing de documents haute fidélité)

---

## 📦 Architecture du Projet

Le projet est structuré en **Monorepo** pour faciliter la gestion du cycle de vie du code :

.
├── backend/            # API FastAPI & Logique RAG
│   ├── app/
│   │   ├── api/        # Endpoints (Controllers)
│   │   ├── services/   # Logique métier (IA, PDF)
│   │   └── models/     # Schémas Pydantic
│   └── uploads/        # Stockage temporaire des fichiers
├── frontend/           # Interface React
│   ├── src/
│   │   ├── components/ # Composants UI découpés
│   │   ├── services/   # Appels API (Chat & Upload)
│   │   └── hooks/      # Logique React réutilisable
└── README.md           # Documentation centrale


⚙️ Installation et Lancement
1. Prérequis
Ollama installé avec le modèle chargé : ollama run qwen2.5:0.5b

Python 3.10+

Node.js & npm

2. Backend
Bash

cd backend
python -m venv venv
source venv/bin/activate  # Ou venv\Scripts\activate sur Windows
pip install -r requirements.txt
python main.py
3. Frontend
Bash

cd frontend
npm install
npm run dev
