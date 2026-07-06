import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollDown = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide the button when near the bottom of the page
            const scrollPosition = window.scrollY + window.innerHeight;
            const bottomPosition = document.documentElement.scrollHeight - 100;

            if (scrollPosition > bottomPosition) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNextSection = () => {
        // Find all sections on the current page
        const sections = Array.from(document.querySelectorAll('section, .home-page-wrapper > div'));
        const currentScroll = window.scrollY;

        // Find the next section that starts below the current scroll position
        const nextSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            // We look for a section whose top is more than 100px below current scroll
            // (to avoid scrolling to the same section)
            return rect.top > 100;
        });

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If no next section, just scroll down by one viewport
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    onClick={scrollToNextSection}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        zIndex: 999,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '10px',
                        pointerEvents: 'auto'
                    }}
                >
                    <span style={{
                        fontFamily: "'Merriweather', serif",
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#4a4a4a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        userSelect: 'none'
                    }}>
                        Scroll Down
                    </span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={20} color="var(--primary)" strokeWidth={3} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollDown;
