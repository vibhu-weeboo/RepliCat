import React from 'react';

const DecorativeShapes: React.FC = () => {
    return (
        <div className="decorative-shapes-container">
            {/* Squiggle Top Left */}
            <svg className="shape-cn-squiggle" width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.96875 42.9999C18.4688 12.9999 50.5937 -1.00014 62.9688 5.49986C75.3438 11.9999 56.4688 38.4999 59.4688 53.4999C62.4688 68.4999 98.9688 77.4999 113.969 73.9999" stroke="black" strokeWidth="6" strokeLinecap="round"/>
            </svg>
            {/* Star Bottom Right */}
            <svg className="shape-cn-star" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5L61.2257 38.7743L95.1056 38.7743L66.9399 59.2257L78.1656 92.9999L50 72.5486L21.8344 92.9999L33.0601 59.2257L4.89436 38.7743L38.7743 38.7743L50 5Z" fill="#FF00FF" stroke="black" strokeWidth="6"/>
            </svg>
            {/* Bubbles Bottom Left */}
            <div className="shape-cn-bubbles">
                <div className="bubble1"></div>
                <div className="bubble2"></div>
                <div className="bubble3"></div>
            </div>
            {/* ZigZag Top Right */}
            <svg className="shape-cn-zigzag" width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L50 25L20 45L50 65L20 85" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M40 5L70 25L40 45L70 65L40 85" stroke="#00FFFF" strokeWidth="8" strokeLinecap="round"/>
            </svg>
            {/* Star Top Middle */}
            <svg className="shape-cn-star-middle" width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5L61.2257 38.7743L95.1056 38.7743L66.9399 59.2257L78.1656 92.9999L50 72.5486L21.8344 92.9999L33.0601 59.2257L4.89436 38.7743L38.7743 38.7743L50 5Z" fill="#00FFFF" stroke="black" strokeWidth="6"/>
            </svg>
            {/* Pow Bottom Middle */}
            <div className="shape-cn-pow-middle" style={{ fontFamily: "'Bangers', cursive" }}>
                <p style={{ color: '#FF00FF', WebkitTextStroke: '3px black', fontSize: '4rem', transform: 'rotate(-10deg)' }}>POW!</p>
            </div>
        </div>
    );
};

export default DecorativeShapes;