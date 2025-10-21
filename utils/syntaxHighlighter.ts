import { AiModel } from '../types';

export type Token = {
  text: string;
  type: 'default' | 'param' | 'value' | 'keyword';
};

const modelParams: Record<AiModel, string[]> = {
    [AiModel.MIDJOURNEY]: ['--ar', '--v', '--style', '--niji', '--chaos', '--quality', '--seed', '--stop', '--stylize', '--tile', '--weird'],
    [AiModel.DALLE]: [], // Less param-driven
    [AiModel.STABLE_DIFFUSION]: [], // Uses weights which is harder to parse simply
    [AiModel.VEO]: [],
    [AiModel.SORA]: [],
    [AiModel.IMAGEN]: ['--negative_prompt'],
};

const commonKeywords = new Set([
  'photorealistic', 'hyperrealistic', 'realistic', 'ultrarealistic', 'unreal engine', 'octane render',
  'trending on artstation', 'dramatic lighting', 'cinematic lighting', 'studio lighting',
  '4k', '8k', 'hd', 'uhd', 'detailed', 'intricate details', 'sharp focus', 'vray',
  'masterpiece', 'award-winning', 'epic', 'stunning', 'fantasy', 'sci-fi', 'portrait',
  'landscape', 'concept art', 'digital painting', 'matte painting', 'oil painting',
  'watercolor', 'impressionism', 'surrealism', 'steampunk', 'cyberpunk',
]);

export const parsePrompt = (prompt: string, model: AiModel | null): Token[] => {
    if (!prompt) return [];
    
    // Split prompt by spaces and newlines while preserving them
    const segments = prompt.split(/(\s+)/);
    const tokens: Token[] = [];
    const params = model ? modelParams[model] : [];

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const trimmedSegment = segment.trim();

        if (segment.match(/^\s+$/)) { // It's whitespace
            tokens.push({ text: segment, type: 'default' });
            continue;
        }

        if (params.includes(trimmedSegment)) {
            tokens.push({ text: segment, type: 'param' });
            // The next non-whitespace segment is the value
            if (i + 2 < segments.length) {
                // The space between param and value
                tokens.push(segments[i+1].match(/^\s+$/) ? { text: segments[i+1], type: 'default' } : { text: '', type: 'default'});
                // The value
                tokens.push({ text: segments[i+2], type: 'value' });
                i += 2;
            }
        } else if (commonKeywords.has(trimmedSegment.toLowerCase().replace(/[.,]$/, ''))) {
            tokens.push({ text: segment, type: 'keyword' });
        } else {
            tokens.push({ text: segment, type: 'default' });
        }
    }

    return tokens;
};
