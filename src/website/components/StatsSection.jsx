import React, { useState, useEffect, useRef } from 'react';
import './StatsSection.css';

const StatsSection = () => {
    const [counts, setCounts] = useState({
        projects: 0,
        clients: 0,
        experience: 0,
        satisfaction: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        { id: 'projects', label: 'Projects Completed', target: 500, suffix: '+' },
        { id: 'clients', label: 'Happy Clients', target: 150, suffix: '+' },
        { id: 'experience', label: 'Years Experience', target: 4, suffix: '+' },
        { id: 'satisfaction', label: 'Client Satisfaction', target: 98, suffix: '%' }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    const animateCounters = () => {
        const duration = 1500; // 1.5 seconds
        const frameRate = 30;
        const totalFrames = duration / frameRate;
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            
            if (frame >= totalFrames) {
                const finalCounts = {};
                stats.forEach(s => finalCounts[s.id] = s.target);
                setCounts(finalCounts);
                clearInterval(timer);
            } else {
                const nextCounts = {};
                stats.forEach(s => {
                    nextCounts[s.id] = Math.floor(s.target * progress);
                });
                setCounts(nextCounts);
            }
        }, frameRate);
    };

    return (
        <section className="stats-section" ref={sectionRef}>
            <div className="stats-container">
                <div className="stats-grid">
                    {stats.map(stat => (
                        <div key={stat.id} className="stat-card">
                            <div className="stat-number">
                                {counts[stat.id]}{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
