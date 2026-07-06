import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConnectedCapabilities.css';

gsap.registerPlugin(ScrollTrigger);

const items = [
    { id: 'Software', label: 'Custom Software', path: '/services/software', desc: 'We build scalable, secure, and high-performance custom software solutions tailored specifically to your business needs.' },
    { id: 'website', label: 'Web Development', path: '/services/website', desc: 'Professional website development services focused on high performance, modern design, and mobile responsiveness.' },
    { id: 'automation', label: 'Automation', path: '/services/automation', desc: 'Streamline your business operations with smart automation systems that improve efficiency and reduce manual work.' },
    { id: 'digital-transformation', label: 'Transformation', path: '/services/digital-transformation', desc: 'Modernize your business with digital transformation strategies that keep you ahead in the competitive market.' },
    { id: 'whatsapp-api', label: 'WhatsApp API', path: '/services/whatsapp-api', desc: 'Power your communication with WhatsApp API & Automation solutions for faster and smarter customer engagement.' },
    { id: 'business-analysis', label: 'Business Analysis', path: '/services/analysis', desc: 'Thorough business analysis and requirement gathering to ensure your technology solutions match your goals.' },
    { id: 'SEO', label: 'SEO & Growth', path: '/services/SEO', desc: 'SEO-optimized digital solutions that help your business rank higher on search engines and attract quality leads.' },
    { id: 'system-design', label: 'System Design', path: '/services/design', desc: 'Strategic planning and system design to build robust digital ecosystems for long-term business success.' },
    { id: 'support', label: 'Support', path: '/services/support', desc: 'Reliable ongoing support and maintenance to ensure your digital systems always perform at their best.' }
];

const ConnectedCapabilities = () => {
    const sectionRef = useRef(null);
    const orbitRef = useRef(null);
    const itemRefs = useRef([]);
    const videoRefs = useRef([]);
    const [activeItem, setActiveItem] = useState(items[0]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1000);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Configuration
    const radius = isMobile ? 220 : 400; // 220 for Mobile, 400 for Desktop larger spread
    const focalAngle = isMobile ? -90 : 0; // -90 (Top) for Mobile, 0 (Right) for Desktop

    const tweenRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const itemCount = items.length;
            const angleStep = 360 / itemCount;

            // 1. Initial Setup: Position items in a circle
            itemRefs.current.forEach((el, index) => {
                if (!el) return;
                const initialAngleDeg = index * angleStep;
                const angleRad = (initialAngleDeg * Math.PI) / 180;

                // Cartesian coordinates
                const x = radius * Math.cos(angleRad);
                const y = radius * Math.sin(angleRad);

                // Store initial angle for calculations
                el.dataset.angle = initialAngleDeg;

                // Set initial transform
                gsap.set(el, {
                    x: x,
                    y: y
                });
            });

            // 2. Auto Rotation Animation (Infinite)
            tweenRef.current = gsap.to(orbitRef.current, {
                rotation: -360, // Rotate Counter-Clockwise (or Clockwise)
                duration: 20, // 20 seconds for full circle
                repeat: -1,
                ease: "none",
                onUpdate: () => {
                    const currentRot = gsap.getProperty(orbitRef.current, "rotation");
                    // Normalize rotation to 0-360 positive
                    let normalizedRot = currentRot % 360;
                    if (normalizedRot < 0) normalizedRot += 360;

                    let bestDiff = 360;
                    let bestIndex = 0;

                    // 3. Update Items (Counter-Rotate + Highlight)
                    itemRefs.current.forEach((el, index) => {
                        if (!el) return;
                        const initialAngle = parseFloat(el.dataset.angle);

                        // Calculate World Angle
                        // If container rotates by R, Item World Angle = Initial + R
                        let currentWorldAngle = (initialAngle + currentRot) % 360;
                        if (currentWorldAngle < 0) currentWorldAngle += 360;

                        // Difference from Focal Angle
                        let diff = Math.abs(currentWorldAngle - focalAngle);
                        if (diff > 180) diff = 360 - diff;

                        // Proximity calc
                        const proximity = Math.max(0, 1 - (diff / 60));

                        // Counter Rotate text to keep it upright
                        // Keep all circles visible (opacity: 1) and same size
                        gsap.set(el, {
                            rotation: -currentRot,
                            opacity: 1, // Always visible
                            scale: 1, // Same size for all
                            zIndex: Math.round(proximity * 100)
                        });

                        if (diff < bestDiff) {
                            bestDiff = diff;
                            bestIndex = index;
                        }
                    });

                    // Update Active State
                    setActiveItem(prev => items[bestIndex].id !== prev.id ? items[bestIndex] : prev);
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    const handleMouseEnter = () => {
        if (tweenRef.current) tweenRef.current.pause();
        videoRefs.current.forEach(vid => vid && vid.pause());
    };

    const handleMouseLeave = () => {
        if (tweenRef.current) tweenRef.current.play();
        videoRefs.current.forEach(vid => vid && vid.play().catch(() => { }));
    };

    return (
        <section className="capabilities-section" ref={sectionRef}>
            <div className="capabilities-content">

                {/* Left: Orbit System */}
                <div className="orbit-column">
                    <div
                        className="orbit-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >

                        {/* Background SVG Decoration */}
                        <svg className="orbit-svg-track" viewBox="0 0 800 800">
                            {/* Define a faint circle matching rotation path */}


                            {/* Orange Arc Segment - Static "Active Zone" Marker */}
                            {/* Positioned at Angle 0 (Right side). 0 degrees is (400+300, 400) = (700, 400). */}
                            {/* Draw arc from -30 to +30 degrees */}
                            {/* SVG Path A rx ry x-axis-rotation large-arc-flag sweep-flag x y */}
                            {/* Start point: -30deg. x = 400 + 300*cos(-30), y = 400 + 300*sin(-30) */}
                            {/* End point: +30deg. */}
                            {/* Let's just create a static visual marker on the right */}

                            <defs>
                                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Rotatable Item Container */}
                        <div className="orbit-rotator" ref={orbitRef}>
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`orbit-item ${activeItem.id === item.id ? 'active' : ''}`}
                                    ref={el => itemRefs.current[index] = el}
                                >
                                    <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                                        <div className="orbit-dot"></div>
                                        <span className="orbit-label">
                                            <video
                                                ref={el => videoRefs.current[index] = el}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="orbit-video-bg"
                                            >
                                                <source src="/CircleBg.mp4" type="video/mp4" />
                                            </video>
                                            <span style={{ position: 'relative', zIndex: 2 }}>{item.label}</span>
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


                {/* Right: Static Text Content */}
                <div className="text-column">
                    <div className="text-content-wrapper">
                        <div className="text-label">
                            <span className="text-indicator-line"></span>
                            CONNECTED CAPABILITIES
                        </div>

                        <h2 className="text-heading">
                            {activeItem.label}
                        </h2>

                        <p className="text-description">
                            {activeItem.desc}
                        </p>

                        <Link to={activeItem.path} className="action-button">
                            <span>Explore {activeItem.label}</span>
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>

            </div>
        </section >
    );
};

export default ConnectedCapabilities;
