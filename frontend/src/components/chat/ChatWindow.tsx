import { ChatResponse } from "./ChatResponse.js";

interface ChatWindowProps {
  response: string | null;
  isLoading: boolean;
}

export default function ChatWindow({ response, isLoading }: ChatWindowProps) {
    return (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
          
          <h2 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 ${!isLoading && 'hidden'}`}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Réponse du modèle local
          </h2>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-sans text-sm md:text-base">
            {response ? (
              <ChatResponse content={response} />
            ) : (
              <span className="text-slate-700 italic text-mono">Prêt pour votre analyse de document...</span>
            )}
            
            {isLoading && (
              <span className="inline-block w-2 h-5 bg-cyan-500 animate-pulse align-middle ml-1"></span>
            )}
          </div>
        </section>
    );
}