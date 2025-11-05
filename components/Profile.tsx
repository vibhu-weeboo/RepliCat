import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="fixed top-6 left-6 z-50">
            <div
                className="w-12 h-12 flex items-center justify-center bg-surface-1/80 backdrop-blur-md rounded-full shadow-lg border border-border-main/50"
                aria-label="Profile icon"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-text-main" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
        </div>
    );
};

export default Profile;