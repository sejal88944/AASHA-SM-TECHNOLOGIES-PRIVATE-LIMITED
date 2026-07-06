import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../admin/components/Loader';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentSlides, setCurrentSlides] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
        window.scrollTo(0, 0);
    }, []);

    // Auto-slide effect for each service card
    useEffect(() => {
        const intervals = {};

        filteredServices.forEach((service) => {
            if (service.portfolioItems && service.portfolioItems.length > 1) {
                intervals[service.id] = setInterval(() => {
                    setCurrentSlides(prev => ({
                        ...prev,
                        [service.id]: ((prev[service.id] || 0) + 1) % service.portfolioItems.length
                    }));
                }, 3000); // Change image every 3 seconds
            }
        });

        return () => {
            Object.values(intervals).forEach(interval => clearInterval(interval));
        };
    }, [services, selectedCategory]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "services"));
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Filter only active services
            const activeServices = servicesData.filter(service => service.status === 'active');
            setServices(activeServices);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get unique service types for filtering
    const serviceTypes = ['All', ...new Set(services.map(s => s.serviceType))];

    // Filter services based on selected category
    const filteredServices = selectedCategory === 'All'
        ? services
        : services.filter(s => s.serviceType === selectedCategory);

    const handleServiceClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    return (
        <div className="services-page">
            {/* Hero Section */}
            <div className="services-hero">
                <div className="services-hero-glow-1"></div>
                <div className="services-hero-glow-2"></div>
                
                <div className="container">
                    <div className="services-hero-centered">
                        <div className="hero-badge">
                            Premium Solutions
                        </div>
                        <h1 className="hero-title">
                            Empowering Growth with <br />
                            <span className="text-orange">
                                Next-Gen Digital Solutions & AI Automations
                            </span>
                        </h1>
                        <p className="hero-desc">
                            AASHA-SM TECHNOLOGIES PRIVATE LIMITED provides enterprise website development, custom software systems, smart AI Automations, and generative search engine optimizations to scale your business.
                        </p>
                        <button
                            onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
                            className="hero-cta-btn"
                        >
                            Explore Our Solutions <span>↓</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="services-filter-bar">
                <div className="filter-buttons">
                    {serviceTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedCategory(type)}
                            className={`filter-btn ${selectedCategory === type ? 'active' : ''}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div id="services-grid" className="services-grid-section">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                        <Loader />
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
                        <h3>No Services Found</h3>
                    </div>
                ) : (
                    <div className="services-grid">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => handleServiceClick(service.id)}
                                className="service-card"
                            >
                                {/* Media Section */}
                                <div className="card-media">
                                    {service.portfolioItems && service.portfolioItems.length > 0 ? (
                                        service.portfolioItems.map((item, index) => {
                                            const currentIndex = currentSlides[service.id] || 0;
                                            return (
                                                <div key={index} className="card-image-bg" style={{ opacity: index === currentIndex ? 1 : 0 }}>
                                                    {item.type === 'image' ? (
                                                        <img src={item.url} alt="" className="card-image" />
                                                    ) : (
                                                        <video src={item.url} className="card-image" muted loop autoPlay />
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#e2e8f0' }} />
                                    )}

                                    {/* Gradient Overlay */}
                                    <div className="card-overlay"></div>

                                    {/* Type Badge */}
                                    <div className="service-type-badge">
                                        {service.serviceType}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="card-content">
                                    <h3 className="service-title" dangerouslySetInnerHTML={{ __html: service.title }} />

                                    {service.description && service.description.trim() ? (
                                        <div className="service-desc" dangerouslySetInnerHTML={{
                                            __html: service.description.substring(0, 200) + '...'
                                        }} />
                                    ) : (
                                        <div className="service-desc">
                                            Explore our professional services designed to help your business grow and succeed.
                                        </div>
                                    )}

                                    <div className="card-footer">
                                        <span className="learn-more">
                                            Learn More →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Contact CTA */}
            <ContactCTA />



        </div>
    );
};

const ContactCTA = () => {
    const navigate = useNavigate();
    return (
        <div className="contact-cta-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="contact-cta-card"
            >
                <div>
                    <h2 className="cta-title-main">
                        Ready to Start Your <br />
                        <span style={{ color: 'var(--primary)' }}>Digital Journey?</span>
                    </h2>
                    <p style={{
                        marginTop: '16px',
                        fontSize: '18px',
                        color: '#64748b',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Get in touch with AASHA-SM TECHNOLOGIES PRIVATE LIMITED for website development, custom software, and digital solutions tailored to your needs. Start your journey with a trusted technology partner today.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/contact')}
                    className="cta-button"
                >
                    Contact Us Now
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Services;
