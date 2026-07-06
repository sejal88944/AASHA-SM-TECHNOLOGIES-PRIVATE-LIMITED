import React, { createContext, useContext, useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/all';

gsap.registerPlugin(Flip);

const FlipContext = createContext({
    shouldShow: () => true,
    showClass: '',
    hideClass: ''
});

export const FlipReveal = ({ children, keys, showClass = '', hideClass = 'hidden', className, ...props }) => {
    const containerRef = useRef(null);
    const stateRef = useRef(null);

    // Determine visibility function based on keys
    const shouldShow = useMemo(() => (itemKey) => {
        if (!keys || keys.includes('all')) return true;
        if (Array.isArray(itemKey)) {
            return itemKey.some(k => keys.includes(k));
        }
        return keys.includes(itemKey);
    }, [keys]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Selector: Select both visible AND likely hidden items if they still exist in DOM
        const targets = gsap.utils.toArray(".flip-reveal-item", container);

        // Capture state (of layout BEFORE changes if we could, but React already rendered).
        // Standard React Flip: Capture State -> State Change -> Flip.from(State).
        // Since React handles State Change (classes), we need to capture state BEFORE React render?
        // We can't easily. So we capture state in effect, which is AFTER render.
        // This means stateRef.current holds the state of the *previous* render.
        // This is exactly what we want.

        if (stateRef.current) {
            Flip.from(stateRef.current, {
                targets: targets,
                duration: 0.5,
                ease: "power2.inOut",
                absolute: true,
                // Handle entering elements (hidden -> visible)
                onEnter: elements => {
                    gsap.fromTo(elements,
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
                    );
                },
                // Handle leaving elements (visible -> hidden)
                // Note: React has ALREADY applied the 'hidden' class (display: none).
                // So Flip sees them as 0 size.
                // To animate them out, we must prevent them from being display:none immediately.
                // But we can't easily undo React's render.
                // However, Flip 'absolute: true' might have captured their previous position in stateRef.
                // If we set 'display: block' (or whatever) on them via GSAP immediately, we can animate them out.
                onLeave: elements => {
                    // Force them to be visible for the exit animation
                    gsap.set(elements, { display: 'flex' });
                    gsap.to(elements, {
                        opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => {
                            gsap.set(elements, { display: 'none' }); // Restore hidden state
                        }
                    });
                }
            });
        }

        stateRef.current = Flip.getState(targets);

    }, [keys, shouldShow]);

    return (
        <FlipContext.Provider value={{ shouldShow, showClass, hideClass }}>
            <div ref={containerRef} className={className} {...props}>
                {children}
            </div>
        </FlipContext.Provider>
    );
};

export const FlipRevealItem = ({ children, flipKey, className = "", style, ...props }) => {
    const { shouldShow, showClass, hideClass } = useContext(FlipContext);
    const visible = shouldShow(flipKey);

    // We avoid display:none in the class if we want GSAP to handle exit? 
    // No, we need React to manage "final state".
    // We'll let GSAP override it during animation.

    const finalClass = `flip-reveal-item ${className} ${visible ? showClass : hideClass}`;

    return (
        <div className={finalClass} data-flip-key={flipKey} style={style} {...props}>
            {children}
        </div>
    );
};
