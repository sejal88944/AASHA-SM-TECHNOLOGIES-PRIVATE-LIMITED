import React from 'react';

import { TrendingUp, Users, Target, BarChart, Globe, PenTool } from 'lucide-react';

const Marketing = () => {
    const heroGradient = 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)'; // Orange Gradient
    const navyColor = 'var(--secondary)';

    const offerings = [
        { title: 'Social Media Marketing', icon: Users, desc: 'Engage your audience and build brand loyalty across all major social platforms.' },
        { title: 'SEO Optimization', icon: TrendingUp, desc: 'Rank higher on search engines and drive organic traffic to your website.' },
        { title: 'Content Strategy', icon: PenTool, desc: 'Create compelling content that connects with your customers and tells your story.' },
        { title: 'Paid Advertising', icon: Target, desc: 'Targeted ad campaigns that deliver high ROI and measurable results.' },
        { title: 'Market Analytics', icon: BarChart, desc: 'Data-driven insights to refine your strategy and maximize performance.' },
        { title: 'Brand Identity', icon: Globe, desc: 'Build a strong, recognizable brand that stands out in the marketplace.' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Merriweather', serif" }}>
            {/* Hero Section */}
            <div style={{
                padding: '100px 5% 40px 5%',
                background: 'linear-gradient(to right, #fdf4ff, #ffffff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
                position: 'relative',
                overflow: 'hidden',
                flexWrap: 'wrap'
            }}>
                {/* Text Content */}
                <div style={{ flex: 1, minWidth: '300px', maxWidth: '600px', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        background: 'rgba(242, 101, 34, 0.1)',
                        color: 'var(--primary)',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '700',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Grow Your Business
                    </div>
                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: '800',
                        color: navyColor,
                        lineHeight: '1.2',
                        marginBottom: '16px'
                    }}>
                        Strategic <br />
                        <span style={{
                            color: 'var(--primary)',
                            display: 'inline-block'
                        }}>
                            Digital Marketing
                        </span>
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: '#64748b',
                        lineHeight: '1.6',
                        marginBottom: '24px',
                        maxWidth: '90%'
                    }}>
                        Data-driven strategies to amplify your reach, engage your audience,
                        and convert visitors into loyal customers.
                    </p>
                    <button
                        onClick={() => document.getElementById('offerings').scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '12px 32px',
                            background: heroGradient,
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)',
                            transition: 'transform 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Start Growing <span>↓</span>
                    </button>
                </div>

                {/* Hero Illustration */}
                <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '350px',
                        height: '350px',
                        background: 'linear-gradient(135deg, rgba(242, 101, 34, 0.1) 0%, rgba(230, 74, 25, 0.1) 100%)',
                        borderRadius: '50%',
                        filter: 'blur(50px)',
                        zIndex: -1
                    }}></div>

                    <img
                        src="https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-smartphones-marketing-managers-gamification-marketing-social-media-promotion-concept_335657-268.jpg"
                        alt="Marketing Hero"
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '20px',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                            transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                            transition: 'transform 0.5s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'}
                        onMouseOut={(e) => e.target.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)'}
                    />
                </div>
            </div>

            {/* Offerings Grid */}
            <div id="offerings" style={{ padding: '80px 5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', color: navyColor, marginBottom: '16px' }}>Our Marketing Solutions</h2>
                        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                            Comprehensive tools and strategies designed to elevate your brand presence.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '30px'
                    }}>
                        {offerings.map((item, index) => (
                            <div key={index}
                                onClick={() => window.location.href = `/marketing/${item.title.toLowerCase().replace(/ /g, '-')}`}
                                style={{
                                    background: 'white',
                                    padding: '40px',
                                    borderRadius: '24px',
                                    border: '1px solid #f1f5f9',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #fff5f0 0%, #ffe0d1 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px',
                                    color: 'var(--primary)'
                                }}>
                                    <item.icon size={28} />
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: '700', color: navyColor, marginBottom: '12px' }}>{item.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Marketing;
