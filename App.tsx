import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { InputControls } from './components/InputControls';
import { ResultDisplay } from './components/ResultDisplay';
import { generateImage } from './services/geminiService';
import { GenerationSettings, ART_STYLES, ASPECT_RATIOS } from './types';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GenerationSettings>({
    prompt: '',
    style: ART_STYLES[0],
    aspectRatio: ASPECT_RATIOS[0].value,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!settings.prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(settings);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating the image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        
        <Hero />

        <div className="space-y-12">
          <InputControls
            settings={settings}
            onChange={setSettings}
            isLoading={isLoading}
            onGenerate={handleGenerate}
          />
          
          <ResultDisplay
            imageSrc={generatedImage}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <footer className="text-center mt-20 text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} AI Image Generator.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;