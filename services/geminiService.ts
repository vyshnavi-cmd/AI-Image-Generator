import { GoogleGenAI } from "@google/genai";
import { GenerationSettings } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (settings: GenerationSettings): Promise<string> => {
  const { prompt, style, aspectRatio } = settings;

  // Enhance the prompt with the selected style
  const enhancedPrompt = `${prompt}. \n\nArtistic Style: ${style}. \n\nHigh quality, detailed.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // NanoBanana model
      contents: {
        parts: [
          {
            text: enhancedPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any, // "1:1" | "3:4" | "4:3" | "9:16" | "16:9"
        },
      },
    });

    // Iterate through parts to find the image data
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          // Determine MIME type (usually image/png or image/jpeg from API)
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }

    throw new Error("No image content generated. The model might have refused the prompt.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};
