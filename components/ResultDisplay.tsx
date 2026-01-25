import React from 'react';
import { Download, AlertCircle, Share2 } from 'lucide-react';

interface ResultDisplayProps {
  imageSrc: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageSrc, isLoading, error }) => {
  if (!imageSrc && !isLoading && !error) return null;

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `nanobanana-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="aspect-square w-full max-w-2xl mx-auto bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-yellow-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-slate-400 font-medium animate-pulse">Dreaming up your image...</p>
        </div>
      )}

      {imageSrc && !isLoading && (
        <div className="animate-fade-in">
          <div className="group relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 max-w-2xl mx-auto">
            <img
              src={imageSrc}
              alt="Generated Art"
              className="w-full h-auto object-cover"
            />
            
            {/* Overlay actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end gap-3">
              <button 
                onClick={handleDownload}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors"
                title="Download Image"
              >
                <Download className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
            Generated with Gemini 2.5 Flash Image
          </p>
        </div>
      )}
    </div>
  );
};
