import type { ChangeEvent } from "react";

interface FileUploaderProps {
  onUpload: (file: File) => void;
  uploading: boolean;
  fileName: string | null;
}

export const FileUploader = ({ onUpload, uploading, fileName }: FileUploaderProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="mb-6">
      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all 
        ${fileName ? 'border-cyan-500/50 bg-slate-800/40' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800'}`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-bold">Cliquez pour uploader</span> ou glissez-déposez
          </p>
          {fileName ? (
            <span className="text-cyan-400 font-mono text-xs animate-pulse">✓ {fileName}</span>
          ) : (
            <span className="text-slate-600 text-xs">PDF uniquement (max. 10MB)</span>
          )}
        </div>
        <input type="file" className="hidden" accept=".pdf" onChange={handleChange} disabled={uploading} />
      </label>
    </div>
  );
};