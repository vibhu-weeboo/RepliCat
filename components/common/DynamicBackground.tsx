import React, { useRef, useEffect } from 'react';

const DynamicBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | undefined>(undefined);

    const cleanup = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.style.display = 'block';

        let animationLoop: (time: number) => void;
        let setup: () => void;
        
        const handleResize = () => {
            cleanup();
            if(setup) {
                setup();
            }
            if(animationLoop) {
                animationFrameId.current = requestAnimationFrame(animationLoop);
            }
        };
        
        window.addEventListener('resize', handleResize);

        cleanup(); 
        
        const shapes: any[] = [];
        const numShapes = 20;
        const particles: any[] = [];
        const numParticles = 100;
        const effects: any[] = [];
        const effectWords = ['POW!', 'ZAP!', 'BAM!', 'BOOM!'];
        const accentColors = ['#00FFFF', '#FF00FF'];
        let character: any = {};

        const createShape = () => {
            const type = ['circle', 'square', 'star', 'squiggle'][Math.floor(Math.random() * 4)];
            const color = accentColors[Math.floor(Math.random() * accentColors.length)];
            const hasEyes = type === 'circle' && Math.random() < 0.3;

            return {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 20 + 20,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                color,
                type,
                hasEyes,
                isBlinking: false,
                blinkCounter: Math.floor(Math.random() * 200) + 100,
                pulseOffset: Math.random() * 1000,
                points: type === 'squiggle' ? Array.from({ length: 5 }, () => ({
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 30,
                })) : [],
            };
        };
        
        const createParticle = () => {
            return {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1,
            };
        };
        
        const createCharacter = () => {
            return {
                state: 'hidden', // hidden, peeking, looking, leaving, reacting
                timer: Math.random() * 300 + 200, // Time until next action
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0,
                size: 60,
                peekEdge: 'left',
                reactionTimer: 0,
            };
        };

        setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            shapes.length = 0;
            for (let i = 0; i < numShapes; i++) {
                shapes.push(createShape());
            }
            particles.length = 0;
            for (let i = 0; i < numParticles; i++) {
                particles.push(createParticle());
            }
            effects.length = 0;
            const numEffects = 3;
            for (let i = 0; i < numEffects; i++) {
                const maxLife = 300;
                effects.push({
                    text: effectWords[Math.floor(Math.random() * effectWords.length)],
                    x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
                    y: Math.random() * canvas.height * 0.8 + canvas.height * 0.1,
                    rotation: (Math.random() - 0.5) * 0.6,
                    color: accentColors[Math.floor(Math.random() * accentColors.length)],
                    life: Math.random() * maxLife,
                    maxLife: maxLife,
                    pulseOffset: Math.random() * 1000,
                });
            }
            character = createCharacter();
        };
        
        const drawShape = (shape: any, scale: number) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.scale(scale, scale);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#000000';
            ctx.fillStyle = shape.color;

            ctx.beginPath();
            switch (shape.type) {
                case 'circle':
                    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                    break;
                case 'square':
                    ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                    break;
                case 'star':
                    const outerRadius = shape.size / 2;
                    const innerRadius = shape.size / 4;
                    let rot = Math.PI / 2 * 3;
                    let step = Math.PI / 5;
                    ctx.moveTo(0, -outerRadius);
                    for (let i = 0; i < 5; i++) {
                        ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
                        rot += step;
                        ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
                        rot += step;
                    }
                    ctx.closePath();
                    break;
                case 'squiggle':
                    ctx.moveTo(shape.points[0].x, shape.points[0].y);
                    for (let i = 1; i < shape.points.length - 1; i++) {
                        const xc = (shape.points[i].x + shape.points[i + 1].x) / 2;
                        const yc = (shape.points[i].y + shape.points[i + 1].y) / 2;
                        ctx.quadraticCurveTo(shape.points[i].x, shape.points[i].y, xc, yc);
                    }
                    break;
            }
            if (shape.type !== 'squiggle') ctx.fill();
            ctx.stroke();

            if (shape.type === 'circle' && shape.hasEyes) {
                const eyeRadius = shape.size * 0.1;
                const eyeOffsetX = shape.size * 0.18;
                const eyeOffsetY = -shape.size * 0.1;
                ctx.fillStyle = '#000000';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 2;
                if (shape.isBlinking) {
                    ctx.beginPath();
                    ctx.moveTo(-eyeOffsetX - eyeRadius, eyeOffsetY);
                    ctx.lineTo(-eyeOffsetX + eyeRadius, eyeOffsetY);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(eyeOffsetX - eyeRadius, eyeOffsetY);
                    ctx.lineTo(eyeOffsetX + eyeRadius, eyeOffsetY);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(-eyeOffsetX, eyeOffsetY, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(eyeOffsetX, eyeOffsetY, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        };

        const drawCharacter = (char: any) => {
            ctx.save();
            let shakeX = 0;
            let shakeY = 0;
            if(char.state === 'reacting') {
                shakeX = (Math.random() - 0.5) * 8;
                shakeY = (Math.random() - 0.5) * 8;
            }
            ctx.translate(char.x + shakeX, char.y + shakeY);
            
            // Body
            ctx.fillStyle = '#FFD700'; // Gold
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, char.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Eyes
            const eyeRadius = char.size * 0.15;
            const eyeOffsetX = char.size * 0.2;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(-eyeOffsetX, -5, eyeRadius, 0, Math.PI * 2);
            ctx.arc(eyeOffsetX, -5, eyeRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Pupils
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(-eyeOffsetX, -5, eyeRadius * 0.5, 0, Math.PI * 2);
            ctx.arc(eyeOffsetX, -5, eyeRadius * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const updateCharacter = (char: any) => {
            const speed = 2;

            if (char.state === 'hidden') {
                char.timer--;
                if (char.timer <= 0) {
                    char.state = 'peeking';
                    const edges = ['left', 'right', 'top', 'bottom'];
                    char.peekEdge = edges[Math.floor(Math.random() * edges.length)];
                    switch (char.peekEdge) {
                        case 'left':
                            char.x = -char.size;
                            char.y = Math.random() * canvas.height;
                            char.targetX = char.size / 2;
                            char.targetY = char.y;
                            break;
                        case 'right':
                            char.x = canvas.width + char.size;
                            char.y = Math.random() * canvas.height;
                            char.targetX = canvas.width - char.size / 2;
                            char.targetY = char.y;
                            break;
                        case 'top':
                            char.x = Math.random() * canvas.width;
                            char.y = -char.size;
                            char.targetX = char.x;
                            char.targetY = char.size / 2;
                            break;
                        case 'bottom':
                            char.x = Math.random() * canvas.width;
                            char.y = canvas.height + char.size;
                            char.targetX = char.x;
                            char.targetY = canvas.height - char.size / 2;
                            break;
                    }
                }
            } else if (char.state === 'peeking') {
                char.x += (char.targetX - char.x) * 0.1;
                char.y += (char.targetY - char.y) * 0.1;
                if (Math.abs(char.x - char.targetX) < 1 && Math.abs(char.y - char.targetY) < 1) {
                    char.state = 'looking';
                    char.timer = Math.random() * 150 + 100; // Look for 1.5-3 seconds
                }
            } else if (char.state === 'looking') {
                char.timer--;
                // Check for reactions
                for(const effect of effects) {
                    const dist = Math.hypot(char.x - effect.x, char.y - effect.y);
                    if(dist < 150) {
                        char.state = 'reacting';
                        char.reactionTimer = 20; // React for 20 frames
                        break;
                    }
                }

                if (char.timer <= 0 && char.state === 'looking') {
                    char.state = 'leaving';
                    switch (char.peekEdge) {
                        case 'left': char.targetX = -char.size; break;
                        case 'right': char.targetX = canvas.width + char.size; break;
                        case 'top': char.targetY = -char.size; break;
                        case 'bottom': char.targetY = canvas.height + char.size; break;
                    }
                }
            } else if (char.state === 'leaving') {
                 char.x += (char.targetX - char.x) * 0.1;
                 char.y += (char.targetY - char.y) * 0.1;
                 if (Math.abs(char.x - char.targetX) < 1 && Math.abs(char.y - char.targetY) < 1) {
                    char.state = 'hidden';
                    char.timer = Math.random() * 300 + 200; // Wait 3-5 seconds
                }
            } else if (char.state === 'reacting') {
                char.reactionTimer--;
                if(char.reactionTimer <= 0) {
                    char.state = 'looking'; // Go back to looking
                }
            }
        };


        const draw = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FDFDFD';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -p.radius) p.x = canvas.width + p.radius;
                if (p.x > canvas.width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = canvas.height + p.radius;
                if (p.y > canvas.height + p.radius) p.y = -p.radius;

                ctx.fillStyle = `rgba(0, 0, 0, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            shapes.forEach(shape => {
                shape.x += shape.vx;
                shape.y += shape.vy;
                shape.rotation += shape.rotationSpeed;
        
                if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
                if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        
                if (shape.hasEyes) {
                    shape.blinkCounter--;
                    if (shape.blinkCounter <= 0) {
                        shape.isBlinking = !shape.isBlinking;
                        shape.blinkCounter = shape.isBlinking ? 10 : Math.floor(Math.random() * 200) + 100;
                    }
                }

                const pulseTime = time + shape.pulseOffset;
                const pulse = (Math.sin(pulseTime / 1000 * Math.PI * 2) + 1) / 2;
                const scale = 1 + pulse * 0.1;

                drawShape(shape, scale);
            });

            for (let i = effects.length - 1; i >= 0; i--) {
                const effect = effects[i];
                effect.life--;

                if (effect.life <= 0) {
                    Object.assign(effect, {
                        text: effectWords[Math.floor(Math.random() * effectWords.length)],
                        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
                        y: Math.random() * canvas.height * 0.8 + canvas.height * 0.1,
                        rotation: (Math.random() - 0.5) * 0.6,
                        color: accentColors[Math.floor(Math.random() * accentColors.length)],
                        life: effect.maxLife,
                        maxLife: effect.maxLife,
                        pulseOffset: Math.random() * 1000,
                    });
                }

                const lifeRatio = effect.life / effect.maxLife;
                let scale = 1;

                if (lifeRatio > 0.95) { 
                    scale = (1 - lifeRatio) / 0.05;
                }
                
                const pulseTime = time + effect.pulseOffset;
                const pulse = (Math.sin(pulseTime / 1000 * Math.PI * 2) + 1) / 2;
                const pulseScale = 1 + pulse * 0.1;
                
                ctx.save();
                ctx.translate(effect.x, effect.y);
                ctx.rotate(effect.rotation);
                ctx.scale(scale * pulseScale, scale * pulseScale);
                ctx.globalAlpha = 1;
                ctx.font = 'bold 50px Bangers';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 8;
                ctx.strokeText(effect.text, 0, 0);
                ctx.fillStyle = effect.color;
                ctx.fillText(effect.text, 0, 0);
                ctx.restore();
            }

            updateCharacter(character);
            if (character.state !== 'hidden') {
                drawCharacter(character);
            }
        };

        animationLoop = (time) => {
            draw(time);
            animationFrameId.current = requestAnimationFrame(animationLoop);
        };
        
        if (animationLoop && setup) {
            setup();
            animationFrameId.current = requestAnimationFrame(animationLoop);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            cleanup();
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default DynamicBackground;