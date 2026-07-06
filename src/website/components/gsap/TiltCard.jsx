import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const TiltCard = ({ children, className = "", highlightClassName = "", ...props }) => {
    const cardRef = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt
            // Max tilt of 10 degrees?
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                // Scale slightly to enhance effect?
                scale: 1.02,
                ease: "power2.out"
            });

            // Adjust highlight position
            if (highlightRef.current) {
                // Move gradient/highlight opposite to mouse or with mouse?
                // Usually a "glare" effect moves to follow the light source if we imagine mouse is light?
                // Or if it's a reflection...
                // Let's just follow mouse for highlight center.
                gsap.to(highlightRef.current, {
                    duration: 0.5,
                    left: x,
                    top: y,
                    opacity: 0.3,
                    ease: "power2.out"
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: "power2.out"
            });

            if (highlightRef.current) {
                gsap.to(highlightRef.current, {
                    duration: 0.5,
                    opacity: 0,
                    ease: "power2.out"
                });
            }
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`tilt-card ${className}`}
            style={{ transformStyle: 'preserve-3d', position: 'relative', ...props.style }}
            {...props}
        >
            {/* Highlight/Glare layer */}
            <div
                ref={highlightRef}
                // Default glare style if no class provided, or use provided class
                className={`tilt-highlight ${highlightClassName}`}
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 10,
                    opacity: 0,
                    // If highlightClassName provides background, this inline background might conflict.
                    // But radial gradient is good default.
                    // The user passed `bg-white/15` which suggests they want a flat overlay?
                    // Flat overlay following mouse is weird. Radial is better for 'glare'.
                    // I will keep the radial gradient in inline style but allow className to add stuff.
                }}
            />
            {children}
        </div>
    );
};
