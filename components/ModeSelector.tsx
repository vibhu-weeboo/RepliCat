import React from 'react';
import { Mode } from '../types';

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeButton: React.FC<{
  label: string;
  icon: React.ReactElement;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent ${
      isActive
        ? 'bg-accent text-white shadow-sm'
        : 'bg-transparent text-text-secondary hover:bg-surface-button hover:text-text-main'
    }`}
  >
    {icon}
    {label}
  </button>
);

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex gap-2 sm:gap-3 p-1.5 bg-surface-2 rounded-2xl max-w-md mx-auto border border-border-main">
      <ModeButton
        label="Reverse Prompt"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        }
        isActive={currentMode === Mode.REVERSE_PROMPT}
        onClick={() => onModeChange(Mode.REVERSE_PROMPT)}
      />
      <ModeButton
        label="Prompt Engineer"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106.886-.54 2.042.061 2.287.947.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106-.54-.886-.061-2.042.947-2.287 1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        }
        isActive={currentMode === Mode.PROMPT_ENGINEER}
        onClick={() => onModeChange(Mode.PROMPT_ENGINEER)}
      />
    </div>
  );
};

export default ModeSelector;