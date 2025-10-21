import React from 'react';
import Spinner from './Spinner';
import CopyButton from './CopyButton';
import SyntaxHighlightedPrompt from './SyntaxHighlightedPrompt';
import { AiModel } from '../../types';

interface GeneratedPromptDisplayProps {
    isLoading: boolean;
    prompt: string;
    placeholder: string;
    model: AiModel | null;
}

const GeneratedPromptDisplay: React.FC<GeneratedPromptDisplayProps> = ({ isLoading, prompt, placeholder, model }) => {
    return (
        <div className="relative w-full min-h-[150px] p-4 bg-surface-2 border border-border-main rounded-2xl flex flex-grow items-center justify-center text-text-main font-sans text-sm leading-relaxed">
            {isLoading && <Spinner />}
            {!isLoading && !prompt && <p className="text-text-secondary text-center">{placeholder}</p>}
            {!isLoading && prompt && (
                <>
                    <SyntaxHighlightedPrompt prompt={prompt} model={model} />
                    <CopyButton textToCopy={prompt} />
                </>
            )}
        </div>
    );
};

export default GeneratedPromptDisplay;