import React, { useState, useCallback } from 'react';
import { generatePromptFromImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import GeneratedPromptDisplay from './common/GeneratedPromptDisplay';

const ImageUploadPlaceholder: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-border-main rounded-2xl text-text-secondary group-hover:border-accent group-hover:text-text-main transition-colors duration-300 bg-surface-2 h-full flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-4 text-sm font-semibold">Drag & drop an image here, or click to select a file.</p>
        <p className="text-xs mt-1">AI-powered image analysis.</p>
    </div>
);

const ReversePromptGenerator: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null);
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleGenerateClick = useCallback(async () => {
        if (!imageFile) return;

        setIsLoading(true);
        setGeneratedPrompt('');
        setError(null);

        try {
            const base64Image = await fileToBase64(imageFile);
            const prompt = await generatePromptFromImage(base64Image, imageFile.type);
            setGeneratedPrompt(prompt);
        } catch (err) {
            setError('Failed to generate prompt. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [imageFile]);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-text-heading">1. Upload Your Image</h2>
                <label htmlFor="image-upload" className="cursor-pointer group flex-grow">
                    <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    {imagePreview ? (
                         <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl border border-border-main shadow-sm" />
                    ) : (
                        <ImageUploadPlaceholder />
                    )}
                </label>
                {error && <p className="text-rose-500 text-sm font-semibold">{error}</p>}
                <button
                    onClick={handleGenerateClick}
                    disabled={!imageFile || isLoading}
                    className="w-full mt-auto bg-accent text-white font-bold py-3 px-4 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? 'Analyzing...' : 'Generate Prompt'}
                </button>
            </div>
            
            <div className="flex flex-col gap-4">
                 <h2 className="text-xl font-bold text-text-heading">2. Generated Prompt</h2>
                <GeneratedPromptDisplay
                    isLoading={isLoading}
                    prompt={generatedPrompt}
                    placeholder="Your generated prompt will appear here..."
                    model={null}
                />
                <button
                    onClick={() => console.log('Akariii button clicked!')}
                    className="w-full mt-auto bg-accent text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                >
                    Akariii
                </button>
            </div>
        </div>
    );
};

export default ReversePromptGenerator;