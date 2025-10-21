import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AiModel } from '../types';
import { AI_MODELS } from '../constants';
import { engineerPromptForModel } from '../services/geminiService';
import GeneratedPromptDisplay from './common/GeneratedPromptDisplay';

const PromptEngineer: React.FC = () => {
    const [idea, setIdea] = useState('');
    const [selectedModel, setSelectedModel] = useState<AiModel>(AiModel.MIDJOURNEY);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleGenerateClick = useCallback(async () => {
        if (!idea) return;
        setIsLoading(true);
        setGeneratedPrompt('');
        try {
            const prompt = await engineerPromptForModel(idea, selectedModel);
            setGeneratedPrompt(prompt);
        } catch (err) {
            console.error(err);
            setGeneratedPrompt("An error occurred while generating the prompt.");
        } finally {
            setIsLoading(false);
        }
    }, [idea, selectedModel]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 flex flex-col gap-2">
                    <label htmlFor="idea-input" className="font-bold text-text-heading">1. Describe Your Idea</label>
                    <textarea
                        id="idea-input"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g., A futuristic city skyline at sunset, with flying cars"
                        className="w-full h-28 p-3 bg-surface-2 border border-border-main rounded-xl focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300 resize-none font-medium text-text-main"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="model-select" className="font-bold text-text-heading">2. Target AI Model</label>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            id="model-select"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between text-left p-3 bg-surface-2 border border-border-main rounded-xl focus:ring-2 focus:ring-border-focus focus:border-border-focus transition-colors duration-300 font-medium text-text-main"
                        >
                            <span>{selectedModel}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute z-10 w-full mt-1 bg-surface-2 border border-border-main rounded-xl shadow-lg max-h-60 overflow-auto">
                                {AI_MODELS.map(model => (
                                    <li key={model}>
                                        <button
                                            onClick={() => {
                                                setSelectedModel(model);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-text-main font-medium hover:bg-accent/20 transition-colors duration-150"
                                        >
                                            {model}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleGenerateClick}
                    disabled={!idea || isLoading}
                    className="w-full md:w-auto bg-accent text-white font-bold py-3 px-8 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                    {isLoading ? 'Engineering...' : 'Generate Prompt'}
                </button>
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
                <h2 className="text-xl font-bold text-text-heading">3. Optimized Prompt</h2>
                <GeneratedPromptDisplay
                    isLoading={isLoading}
                    prompt={generatedPrompt}
                    placeholder="Your optimized prompt will appear here..."
                    model={selectedModel}
                />
            </div>
        </div>
    );
};

export default PromptEngineer;