import { useState, type FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { chatService } from './services/chatService.js'
import { fileService } from './services/fileService.js'
import { ChatResponse } from './components/chat/ChatResponse.js'
import { ChatInput } from './components/chat/ChatInput.js'
import { FileUploader } from './components/upload/FileUploader.js'
import Header from './components/layout/Header.js'
import ChatWindow from './components/chat/ChatWindow.js'

function App() {
 const [prompt, setPrompt] = useState('')
 const [response, setResponse] = useState('')
 const [isLoading, setIsLoading] = useState(false)
 const [uploading, setUploading] = useState(false);
const [fileName, setFileName] = useState<string | null>(null);

const handleFileUpload = async (file: File) => {
  if (!file) return;

  setUploading(true);
  try {
    await fileService.uploadPDF(file);
    setFileName(file.name);
    alert("Document analysé et prêt !");
  } catch (error) {
    alert("Erreur lors de l'upload du document.");
  } finally {
    setUploading(false);
  }
};

 const handleSubmit = async (prompt: string) => {
    if(!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    try {
      await chatService.askQuestion(prompt, (chunk) => {
        setResponse(prev => prev + chunk);
      });
    } catch (error) {
      console.error('Error:', error);
      setResponse("Désolé, une erreur est survenue lors de la communication avec l'IA.")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 flex flex-col items-center'>
      <Header/>
      <main className="w-full max-w-4xl flex flex-col gap-6">
        
        <FileUploader onUpload={handleFileUpload} uploading={uploading} fileName={fileName} />

        {/* Affichage de la réponse */}
        <ChatWindow response={response} isLoading={isLoading} />

        {/* Input de chat */}
        <ChatInput onSend={handleSubmit} disabled={isLoading || uploading} />
      </main>
    </div>
  )
}

export default App
