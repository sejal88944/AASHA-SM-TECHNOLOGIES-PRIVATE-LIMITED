import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const DrawLineText = ({
    text,
    fontSize = 40,
    color = "currentColor",
    strokeWidth = 1,
    className = "",
    align = "center",
    children,
    ...props
}) => {
    const textRef = useRef(null);

    useEffect(() => {
        const textEl = textRef.current;
        if (!textEl) return;

        // Ensure we have length. If we used tspans, getComputedTextLength still works on the <text> parent.
        const totalLength = textEl.getComputedTextLength();

        // Set initial state
        // Set initial state
        gsap.set(textEl, {
            fillOpacity: 0,
            stroke: color, // This might override tspan stroke? No, usually tspan specificity or inheritance... wait. If tspan has stroke, it uses it.
            // If we set stroke on parent, children inherit.
            // If we want mixed stroke colors, we should set stroke on tspans too.
            // But let's set a default stroke here just in case.
            strokeWidth: strokeWidth,
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength,
        });

        // Animate
        const tl = gsap.timeline();

        tl.to(textEl, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
        })
            .to(textEl, {
                fillOpacity: 1, // Reveal the fill
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");

        return () => tl.kill();
    }, [text, color, strokeWidth, children]); // Add children to dependency

    return (
        <div className={className} style={{ width: '100%', display: 'flex', justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
            <svg
                width="100%"
                height={props.height || (fontSize * 1.4)}
                style={{ overflow: 'visible', maxWidth: '100%' }}
            // Removing fixed viewBox to allow browser to handle layout naturally if we start messing with width
            // But text x="50%" needs a coordinate system. 
            // Let's rely on standard SVG behavior: 100% width/height maps to element-size coordinate system.
            >
                <text
                    ref={textRef}
                    x={align === 'center' ? "50%" : align === 'right' ? "100%" : "0"}
                    y="65%"
                    dominantBaseline="middle"
                    textAnchor={align === 'center' ? "middle" : align === 'right' ? "end" : "start"}
                    fontSize={fontSize}
                    fontFamily="inherit"
                    fontWeight="inherit"
                    fontStyle="inherit"
                >
                    {children || text}
                </text>
            </svg>
        </div>
    );
};
