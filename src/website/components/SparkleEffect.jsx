import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase/firestore';

const SparkleEffect = () => {
    // Keep a persistent reference to the AudioContext
    const audioCtxRef = React.useRef(null);
    const hasFiredRef = React.useRef(false);

    // Initialize Audio Context once
    useEffect(() => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtxRef.current = new AudioContext();
            }
        } catch (e) {
            console.error("Audio init error:", e);
        }

        // Cleanup
        return () => {
            if (audioCtxRef.current) {
                audioCtxRef.current.close().catch(() => { });
            }
        };
    }, []);

    useEffect(() => {
        const checkAndFireSparkles = async () => {
            try {
                const docRef = doc(db, "admin", "general");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().sparkleActive) {
                    const soundActive = docSnap.data().sparkleSoundActive || false;
                    const soundUrl = docSnap.data().sparkleSoundUrl || null;
                    handleEffectTrigger(soundActive, soundUrl);
                }
            } catch (err) {
                console.error("Error checking sparkle settings:", err);
            }
        };

        checkAndFireSparkles();
    }, []);

    const handleEffectTrigger = (soundEnabled, soundUrl) => {
        if (!soundEnabled) {
            fireVisuals();
            return;
        }

        const ctx = audioCtxRef.current;
        if (!ctx) {
            fireVisuals();
            return;
        }

        // 1. Always fire visuals immediately (T=0)
        fireVisuals();

        const startTime = Date.now();
        // Extended Time Limit: 8 Seconds
        // This gives plenty of time for the user to click/tap if autoplay is blocked.
        const timeLimit = 8000;

        // Helper to trigger valid sound
        const triggerSound = () => {
            if (!hasFiredRef.current) {
                // If it's a "Delayed" start (interaction), re-fire visuals to sync them
                if (Date.now() - startTime > 300) {
                    fireVisuals();
                }
                playBlastSound(ctx, soundUrl);
                hasFiredRef.current = true;
            }
        };

        // 2. Try playing immediately (Autoplay)
        if (ctx.state === 'running') {
            triggerSound();
        } else {
            // Try to resume immediately
            ctx.resume().then(() => {
                triggerSound();
            }).catch(() => { });
        }

        // 3. Persistent Interaction Listener
        const interactionHandler = () => {
            ctx.resume().then(() => {
                const elapsed = Date.now() - startTime;
                if (elapsed < timeLimit) {
                    triggerSound();
                }
            }).catch(e => console.error("Audio resume failed:", e));

            cleanup();
        };

        const cleanup = () => {
            ['click', 'keydown', 'touchstart', 'mousedown', 'pointerdown'].forEach(evt =>
                document.removeEventListener(evt, interactionHandler)
            );
        };

        ['click', 'keydown', 'touchstart', 'mousedown', 'pointerdown'].forEach(evt =>
            document.addEventListener(evt, interactionHandler)
        );

        setTimeout(cleanup, timeLimit + 100);
    };

    const playBlastSound = async (ctx, customUrl) => {
        try {
            const now = ctx.currentTime;
            const duration = 3.0;

            // 1. If Custom URL exists
            if (customUrl) {
                try {
                    const response = await fetch(customUrl);
                    if (!response.ok) throw new Error("Fetch failed");
                    const arrayBuffer = await response.arrayBuffer();
                    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

                    const source = ctx.createBufferSource();
                    const gainNode = ctx.createGain();

                    source.buffer = audioBuffer;
                    source.connect(gainNode);
                    gainNode.connect(ctx.destination);

                    source.start(now);
                    gainNode.gain.setValueAtTime(1, now + duration - 0.5);
                    gainNode.gain.linearRampToValueAtTime(0, now + duration);
                    source.stop(now + duration);
                    return;
                } catch (err) {
                    console.error("Custom audio failed, fallback to synth.", err);
                }
            }

            // 2. Generated Sound Fallback 
            // A. The "POP" (Impact at start)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            gain.gain.setValueAtTime(0.8, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.stop(now + 0.15);

            // B. The "Sparkle/Tinkle" Stream (Lasts full 3 seconds)
            const noteCount = 30; // Number of tinkles
            const frequencies = [1200, 880, 1500, 1800, 2200, 2400];

            for (let i = 0; i < noteCount; i++) {
                // Random time within the 3 second window
                const timeOffset = Math.random() * duration;
                // Concentration: More density at start, less at end
                // Let's keep it uniform or slightly weighted to start? Uniform is fine for "Flying"

                const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

                const sOsc = ctx.createOscillator();
                const sGain = ctx.createGain();

                sOsc.type = 'sine';
                sOsc.frequency.setValueAtTime(freq, now);

                sOsc.connect(sGain);
                sGain.connect(ctx.destination);

                const startTime = now + timeOffset;

                sOsc.start(startTime);

                sGain.gain.setValueAtTime(0, startTime);
                // Short ting
                sGain.gain.linearRampToValueAtTime(0.4, startTime + 0.05);
                sGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

                sOsc.stop(startTime + 0.4);
            }

        } catch (e) {
            console.error("Sound play error:", e);
        }
    };

    const fireVisuals = () => {
        // First burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#a855f7', 'var(--primary)', '#14b8a6', '#f59e0b'],
            disableForReducedMotion: true
        });

        // Fire a few more bursts instead of every frame
        const burstCount = 6;
        for (let i = 1; i <= burstCount; i++) {
            setTimeout(() => {
                // left edge
                confetti({
                    particleCount: 20,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.6 },
                    colors: ['#6366f1', '#a855f7', 'var(--primary)', '#14b8a6', '#f59e0b']
                });
                // right edge
                confetti({
                    particleCount: 20,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.6 },
                    colors: ['#6366f1', '#a855f7', 'var(--primary)', '#14b8a6', '#f59e0b']
                });
            }, i * 500); // Every 500ms for 3 seconds
        }
    };

    return null;
};

export default SparkleEffect;
