import React from 'react';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-yellow-500/10 rounded-full">
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 mb-4">
        AI Image Generator
      </h1>
      <p className="text-slate-400 text-lg max-w-xl mx-auto">
        Transform your imagination into visual reality using the power of the Gemini 2.5 Flash Image model.
      </p>
    </div>
  );
};