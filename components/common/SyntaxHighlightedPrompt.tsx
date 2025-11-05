import React from 'react';
import { AiModel } from '../../types';
import { parsePrompt } from '../../utils/syntaxHighlighter';

interface SyntaxHighlightedPromptProps {
    prompt: string;
    model: AiModel | null;
}

const SyntaxHighlightedPrompt: React.FC<SyntaxHighlightedPromptProps> = ({ prompt, model }) => {
    const tokens = parsePrompt(prompt, model);

    return (
        <p className="whitespace-pre-wrap w-full pr-10">
            {tokens.map((token, index) => (
                <span key={index} className={`token-${token.type}`}>
                    {token.text}
                </span>
            ))}
        </p>
    );
};

export default SyntaxHighlightedPrompt;
