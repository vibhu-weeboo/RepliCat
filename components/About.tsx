import React from 'react';

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => {
    return (
        <div className="feature-card flex flex-col items-center text-center p-6 rounded-2xl bg-surface-2/30 backdrop-blur-md border border-border-main/70">
            <div className="p-4 bg-accent/20 rounded-full mb-4 text-accent">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-text-heading mb-2">{title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
    );
};

const About: React.FC = () => {
    return (
        <section className="mt-16 py-8">
            <div className="w-full max-w-xs mx-auto h-px bg-border-main mb-12 opacity-50"></div>
            <h2 className="text-5xl sm:text-6xl font-bold text-center text-text-heading mb-12 title-cartoonnetwork">
                About RepliCat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-text-main max-w-3xl mx-auto">
                <FeatureCard
                    title="Reverse Prompting"
                    description="Upload any image and let our Gemini-powered AI analyze it to generate a detailed, descriptive prompt that could recreate it."
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    }
                />
                <FeatureCard
                    title="Prompt Engineering"
                    description="Transform your simple ideas into powerful, model-specific prompts. Optimized for Veo, Midjourney, DALL-E, and more."
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm-1 6a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm1 3a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
                            <path d="M7 12a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zM9 8a1 1 0 00-1 1v.01a1 1 0 102 0V9a1 1 0 00-1-1z" />
                        </svg>
                    }
                />
            </div>
            <p className="text-center mt-8 text-text-secondary max-w-3xl mx-auto font-medium">
                RepliCat is your creative <span className="text-text-main font-bold">copy cat</span>, designed to bridge the gap between your vision and the amazing capabilities of generative AI.
            </p>
        </section>
    );
};

export default About;