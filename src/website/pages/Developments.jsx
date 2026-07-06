import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../admin/components/Loader';

import { TiltCard } from '../components/gsap/TiltCard';

const Developments = () => {
    const [developments, setDevelopments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentSlides, setCurrentSlides] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchDevelopments();
    }, []);

    useEffect(() => {
        const intervals = {};
        filteredDevelopments.forEach((service) => {
            if (service.portfolioItems && service.portfolioItems.length > 1) {
                intervals[service.id] = setInterval(() => {
                    setCurrentSlides(prev => ({
                        ...prev,
                        [service.id]: ((prev[service.id] || 0) + 1) % service.portfolioItems.length
                    }));
                }, 3000);
            }
        });
        return () => Object.values(intervals).forEach(interval => clearInterval(interval));
    }, [developments, selectedCategory]);

    const fetchDevelopments = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "developments"));
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const activeItems = items.filter(item => item.status === 'active');
            setDevelopments(activeItems);
        } catch (error) {
            console.error("Error fetching developments:", error);
        } finally {
            setLoading(false);
        }
    };

    const serviceTypes = ['All', ...new Set(developments.map(s => s.serviceType))];
    const filteredDevelopments = selectedCategory === 'All'
        ? developments
        : developments.filter(s => s.serviceType === selectedCategory);

    const handleDevelopmentClick = (id) => {
        navigate(`/developments/${id}`);
    };

    const heroGradient = 'linear-gradient(135deg, #0ea5e9 0%, var(--accent) 100%)'; // Blue to Sky
    const navyColor = 'var(--secondary)';

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Merriweather', serif" }}>
            {/* Hero Section */}
            <div style={{
                padding: '100px 5% 40px 5%',
                background: 'linear-gradient(to right, #f8fafc, #ffffff)',
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
                        background: 'rgba(14, 165, 233, 0.1)',
                        color: '#0284c7',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '700',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Future Ready
                    </div>
                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: '800',
                        color: navyColor,
                        lineHeight: '1.2',
                        marginBottom: '16px'
                    }}>
                        Building The <br />
                        <span style={{
                            background: heroGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Next Generation
                        </span>
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: '#64748b',
                        lineHeight: '1.6',
                        marginBottom: '24px',
                        maxWidth: '90%'
                    }}>
                        From innovative web applications to complex enterprise systems,
                        our development solutions are engineered for scale and performance.
                    </p>
                    <button
                        onClick={() => document.getElementById('developments-grid').scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '12px 32px',
                            background: heroGradient,
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)',
                            transition: 'transform 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        View Projects <span>↓</span>
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
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(242, 101, 34, 0.1) 100%)',
                        borderRadius: '50%',
                        filter: 'blur(50px)',
                        zIndex: -1
                    }}></div>

                    <img
                        src="https://img.freepik.com/free-vector/app-development-concept-with-programming-languages_23-2148688949.jpg"
                        alt="Development Hero"
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

            {/* Category Filter */}
            <div style={{
                padding: '20px 5%',
                background: 'white',
                position: 'sticky',
                top: '80px',
                zIndex: 90,
                borderBottom: '1px solid #f1f5f9'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {serviceTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedCategory(type)}
                            style={{
                                padding: '8px 20px',
                                background: selectedCategory === type ? 'transparent' : '#f8fafc',
                                color: selectedCategory === type ? '#0284c7' : '#64748b',
                                border: selectedCategory === type ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '700',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div id="developments-grid" style={{ padding: '60px 5%', maxWidth: '1400px', margin: '0 auto' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                        <Loader />
                    </div>
                ) : filteredDevelopments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
                        <h3>No Developments Found</h3>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                        gap: '40px'
                    }}>
                        {filteredDevelopments.map((service) => (
                            <TiltCard
                                key={service.id}
                                onClick={() => handleDevelopmentClick(service.id)}
                                style={{
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    background: 'white',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                    border: '1px solid #f1f5f9',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                                highlightClassName="bg-white/20"
                            >
                                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                                    {service.portfolioItems && service.portfolioItems.length > 0 ? (
                                        service.portfolioItems.map((item, index) => {
                                            const currentIndex = currentSlides[service.id] || 0;
                                            return (
                                                <div key={index} style={{
                                                    position: 'absolute', inset: 0, opacity: index === currentIndex ? 1 : 0, transition: 'opacity 0.5s'
                                                }}>
                                                    {item.type === 'image' ? (
                                                        <img src={item.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted loop autoPlay />
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#e2e8f0' }} />
                                    )}
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }}></div>
                                    <div style={{
                                        position: 'absolute', top: '20px', right: '20px',
                                        background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)',
                                        padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0284c7'
                                    }}>
                                        {service.serviceType}
                                    </div>
                                </div>
                                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: navyColor, marginBottom: '16px', lineHeight: '1.3' }} dangerouslySetInnerHTML={{ __html: service.title }} />
                                    <div style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: service.description?.replace(/<[^>]*>/g, '').substring(0, 120) + '...' }} />
                                    <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '600', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Developments;
