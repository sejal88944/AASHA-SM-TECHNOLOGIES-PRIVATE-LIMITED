import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';
import Loader from '../../admin/components/Loader';
import { ArrowLeft, Play, Target, Zap, Award, CheckCircle2, Sparkles, Check } from 'lucide-react';
import './ServiceDetail.css';

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        fetchService();
        window.scrollTo(0, 0);
    }, [slug]);

    // Auto-rotate banner slideshow
    useEffect(() => {
        if (service?.bannerMedia && service.bannerMedia.length > 1) {
            const timer = setInterval(() => {
                setCurrentBannerIndex(prev => (prev + 1) % service.bannerMedia.length);
            }, 5000); // Change every 5 seconds

            return () => clearInterval(timer);
        }
    }, [service]);

    const fetchService = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "services", slug);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // Normalize bannerMedia to array (handle old object format)
                let bannerMedia = [];
                if (data.bannerMedia) {
                    if (Array.isArray(data.bannerMedia)) {
                        bannerMedia = data.bannerMedia;
                    } else if (typeof data.bannerMedia === 'object' && data.bannerMedia.url) {
                        bannerMedia = [data.bannerMedia];
                    }
                }

                setService({ id: docSnap.id, ...data, bannerMedia });
            } else {
                navigate('/services');
            }
        } catch (error) {
            console.error("Error fetching service:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc' }}>
                <Loader />
            </div>
        );
    }

    if (!service) return null;

    // Tabs data
    const tabs = [
        {
            id: 0,
            title: "Who it’s for",
            icon: <Target size={20} />,
            subtitle: "Target Audience",
            content: service.specialties || service.description
        },
        {
            id: 1,
            title: "How it helps",
            icon: <Zap size={20} />,
            subtitle: "Business Impact",
            content: service.workDescription || "We deliver exceptional results through strategic planning, creative execution, and continuous optimization."
        },
        {
            id: 2,
            title: "Includes",
            icon: <Award size={20} />,
            subtitle: "Deliverables",
            content: service.includes || "Expert team, proven results, transparent communication, and dedicated support throughout your project journey."
        }
    ];

    return (
        <div className="service-detail-page">
            {/* Hero Section */}
            <div className="service-hero">
                <div className="hero-media-wrapper">
                    {service.bannerMedia && service.bannerMedia.length > 0 ? (
                        service.bannerMedia.map((item, index) => (
                            <div key={index} style={{ opacity: currentBannerIndex === index ? 1 : 0, transition: 'opacity 1s ease-in-out', position: 'absolute', inset: 0 }}>
                                {item.type === 'image' ? (
                                    <div className="hero-bg-media" style={{ backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}></div>
                                ) : (
                                    <video className="hero-bg-media" src={item.url} autoPlay loop muted playsInline />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="hero-animated-bg"></div>
                    )}
                    <div className="hero-overlay"></div>
                </div>

                {/* Top Buttons - Positioned at top */}
                <div className="hero-top-actions">
                    <button onClick={() => navigate('/services')} className="back-btn">
                        <ArrowLeft size={16} /> Back to Services
                    </button>
                    <div className="service-type-badge">
                        {service.serviceType}
                    </div>
                </div>

                {/* Centered Content */}
                <div className="service-hero-content">
                    <h1 className="hero-service-title" dangerouslySetInnerHTML={{ __html: service.title }} />

                    <div className="hero-service-desc" dangerouslySetInnerHTML={{ __html: service.description }} />
                </div>

                {/* Bottom CTA Button */}
                <button onClick={() => navigate('/contact')} className="hero-cta">
                    Get Started
                </button>
            </div>

            {/* Portfolio Section */}
            {service.portfolioItems && service.portfolioItems.length > 0 && (
                <div className="portfolio-section">
                    <div className="portfolio-container">
                        <div className="section-header-center">
                            <div className="section-subtitle">OUR WORK</div>
                            <h2 className="section-title-dark">Portfolio Gallery</h2>
                            <p className="section-desc">Explore our latest projects and creative work</p>
                        </div>

                        {/* Main Slide */}
                        <div className="portfolio-main-card">
                            {service.portfolioItems[selectedImage].type === 'image' ? (
                                <img
                                    src={service.portfolioItems[selectedImage].url}
                                    alt={`Portfolio ${selectedImage + 1}`}
                                    className="portfolio-slide"
                                />
                            ) : (
                                <video
                                    src={service.portfolioItems[selectedImage].url}
                                    controls
                                    className="portfolio-slide"
                                />
                            )}

                            {service.portfolioItems.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImage(prev => prev === 0 ? service.portfolioItems.length - 1 : prev - 1)}
                                        className="nav-arrow nav-prev"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={() => setSelectedImage(prev => (prev + 1) % service.portfolioItems.length)}
                                        className="nav-arrow nav-next"
                                    >
                                        →
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {service.portfolioItems.length > 1 && (
                            <div className="thumbnails-grid">
                                {service.portfolioItems.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className="thumbnail-item"
                                        style={{
                                            border: selectedImage === index ? '3px solid var(--primary)' : '3px solid transparent',
                                            boxShadow: selectedImage === index ? '0 8px 20px rgba(55, 180, 111, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {item.type === 'image' ? (
                                            <img src={item.url} alt="" className="thumbnail-media" />
                                        ) : (
                                            <video src={item.url} muted className="thumbnail-media" />
                                        )}
                                        {item.type === 'video' && (
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                                                <Play size={16} fill="white" color="white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tabs Section */}
            {(service.specialties || service.workDescription) && (
                <div className="tabs-section">
                    <div className="tabs-header-row">
                        <div>
                            <div className="section-subtitle">WHAT WE DELIVER</div>
                            <h2 className="section-title-dark">Our Professional <br /> <span style={{ color: 'var(--primary)' }}>Value Propositions</span></h2>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {['Strategic Plan', 'Creative Design', 'Proven Results'].map((tag, index) => (
                                <div key={index} style={{ padding: '10px 20px', background: '#f8fafc', borderRadius: '30px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tabs-main-layout">
                        {/* Nav */}
                        <div className="tabs-nav">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                >
                                    <div className="tab-btn-icon">
                                        {tab.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: activeTab === tab.id ? 'var(--primary)' : '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                                            {tab.subtitle}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', color: activeTab === tab.id ? 'var(--secondary)' : '#64748b' }}>
                                            {tab.title}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="tab-content-area">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="tab-content-text"
                                    dangerouslySetInnerHTML={{ __html: tabs.find(t => t.id === activeTab).content }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;
