import React from 'react';
import { Settings, Image as ImageIcon, Palette, Sparkles } from 'lucide-react';
import { ART_STYLES, ASPECT_RATIOS, GenerationSettings } from '../types';

interface InputControlsProps {
  settings: GenerationSettings;
  onChange: (newSettings: GenerationSettings) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export const InputControls: React.FC<InputControlsProps> = ({
  settings,
  onChange,
  isLoading,
  onGenerate,
}) => {
  const handleChange = (key: keyof GenerationSettings, value: string) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="space-y-6">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-blue-400" />
            Image Description
          </label>
          <textarea
            value={settings.prompt}
            onChange={(e) => handleChange('prompt', e.target.value)}
            placeholder="A futuristic city floating in the clouds, golden hour lighting..."
            className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 outline-none transition-all resize-none"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Style Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              Artistic Style
            </label>
            <div className="relative">
              <select
                value={settings.style}
                onChange={(e) => handleChange('style', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 appearance-none focus:ring-2 focus:ring-yellow-500/50 outline-none cursor-pointer"
                disabled={isLoading}
              >
                {ART_STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Aspect Ratio Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-400" />
              Aspect Ratio
            </label>
            <div className="relative">
              <select
                value={settings.aspectRatio}
                onChange={(e) => handleChange('aspectRatio', e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 appearance-none focus:ring-2 focus:ring-yellow-500/50 outline-none cursor-pointer"
                disabled={isLoading}
              >
                {ASPECT_RATIOS.map((ratio) => (
                  <option key={ratio.value} value={ratio.value}>
                    {ratio.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading || !settings.prompt.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform duration-200 flex items-center justify-center gap-2
            ${isLoading || !settings.prompt.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-yellow-400 to-amber-600 text-slate-950 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-[1.01] active:scale-[0.99]'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              Generate Image
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};