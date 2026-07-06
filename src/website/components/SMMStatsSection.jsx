import React, { useState, useEffect, useRef } from 'react';

const SMMStatsSection = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const target1 = 500;
    const target2 = 1000;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Run once
                }
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2500; // Slightly faster for punchier feel
        const interval = 20;
        const steps = duration / interval;

        const increment1 = target1 / steps;
        const increment2 = target2 / steps;

        let current1 = 0;
        let current2 = 0;

        const timer = setInterval(() => {
            current1 += increment1;
            current2 += increment2;

            if (current1 >= target1) {
                setCount1(target1);
            } else {
                setCount1(Math.ceil(current1));
            }

            if (current2 >= target2) {
                setCount2(target2);
                clearInterval(timer);
            } else {
                setCount2(Math.ceil(current2));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible]);

    const stats = [
        {
            value: count1 + "+",
            label: "Social Media Account Handle"
        },
        {
            value: count2 + "+", // Added + based on image "1000+"
            label: "Customer Satisfaction"
        }
    ];

    return (
        <div ref={sectionRef} style={{ padding: '80px 5%', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>

                {/* Stats Column */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div style={{
                                fontSize: '80px',
                                fontWeight: '800',
                                color: 'transparent',
                                WebkitTextStroke: '2px #9ca3af', // Matched outline color
                                fontFamily: "'Merriweather', serif",
                                lineHeight: '1',
                                marginBottom: '10px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '18px', color: '#6b7280' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Card 1: Decade of Excellence */}
                <div style={{
                    flex: '1 1 350px',
                    background: '#f8fafc', // Light gray bg like SEO
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '400px',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', color: 'var(--secondary)' }}>
                            Decade of Excellence
                        </h3>
                        <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '15px' }}>
                            With over 10 years of B2B client services and industry experience, trust our seasoned expertise.
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                        <img
                            src="/SEO-1.png"
                            alt="Excellence Illustration"
                            style={{ maxWidth: '180px', height: 'auto' }}
                        />
                    </div>
                </div>

                {/* Card 2: Global Impact */}
                <div style={{
                    flex: '1 1 350px',
                    background: '#f8fafc',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '400px',
                    transition: 'transform 0.3s ease',
                    cursor: 'default'
                }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', color: 'var(--secondary)' }}>
                            Global Impact
                        </h3>
                        <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '15px' }}>
                            Serving 500+ clients worldwide, our highly skilled team delivers tailored, quality web solutions for sustainable business growth.
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                        <img
                            src="/SEO-2.png"
                            alt="Global Impact Illustration"
                            style={{ maxWidth: '180px', height: 'auto' }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SMMStatsSection;
