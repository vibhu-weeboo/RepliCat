import { GoogleGenAI } from "@google/genai";
import { AiModel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePromptFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType,
                data: base64Image,
            },
        };

        const textPart = {
            text: `Analyze this image in extreme detail. Generate a rich, descriptive, and creative prompt that could be used by an AI image generation model like Midjourney or DALL-E to recreate a similar image. Focus on visual elements, subjects, composition, lighting, style, and mood. The prompt should be a single, cohesive paragraph ready for use.`
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error generating prompt from image:", error);
        return "Sorry, I couldn't analyze that image. Please try another one. This might be due to a missing API key.";
    }
};

export const engineerPromptForModel = async (idea: string, model: AiModel): Promise<string> => {
    try {
        const systemInstruction = `You are a world-class prompt engineering expert for generative AI models. Your task is to take a user's simple idea and a target model, and transform it into a highly detailed, optimized, and effective prompt specifically for that model. You must understand the unique syntax, keywords, and parameters of the chosen model. Add model-specific parameters like aspect ratios or style codes where appropriate. The final output should ONLY be the prompt itself, without any explanation or introductory text.`;
        
        const userPrompt = `Idea: "${idea}". Target Model: "${model}". Generate the prompt.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error engineering prompt:", error);
        return "Sorry, I couldn't generate a prompt for that idea. Please try again. This might be due to a missing API key.";
    }
};