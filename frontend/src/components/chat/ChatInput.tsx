import { useState, type FormEvent } from "react";

interface ChatInputProps {
  onSend: (prompt: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="group">
      <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-2 focus-within:border-cyan-500/50 transition-all shadow-lg">
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none p-4 text-slate-200 placeholder:text-slate-600"
          placeholder="Posez une question sur vos documents..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all"
        >
          {disabled ? '...' : 'Envoyer'}
        </button>
      </div>
    </form>
  );
};