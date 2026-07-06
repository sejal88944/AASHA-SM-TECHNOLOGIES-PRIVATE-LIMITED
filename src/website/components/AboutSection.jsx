import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
    const navigate = useNavigate();
    return (
        <section className="premium-about">
            <div className="container">
                <div className="about-grid">
                    {/* Left Column: Stats Dashboard instead of image */}
                    <motion.div 
                        className="about-stats-column"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="stats-box-grid">
                            <div className="stat-box-card large-stat" style={{ '--card-glow': '#F26522' }}>
                                <div className="stat-value">99%</div>
                                <div className="stat-label">Client Satisfaction</div>
                            </div>
                            <div className="stat-box-card" style={{ '--card-glow': '#2196F3' }}>
                                <div className="stat-value">50+</div>
                                <div className="stat-label">Projects Completed</div>
                            </div>
                            <div className="stat-box-card" style={{ '--card-glow': '#4CAF50' }}>
                                <div className="stat-value">100%</div>
                                <div className="stat-label">Handcrafted Custom Code</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Brand content */}
                    <motion.div 
                        className="about-content-column"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="section-tag">Who We Are</span>
                        <h2 className="section-title">Driving Digital Excellence Across Industries</h2>
                        <p className="about-text">
                            AASHA-SM TECHNOLOGIES PRIVATE LIMITED is a premier Pune-based IT solutions provider dedicated to transforming businesses through technology. We deliver custom-built software, next-gen AI Automations, high-end web solutions, CRM/ERP integrations, and advanced search optimizations (SEO, GEO, SXO).
                        </p>
                        
                        <div className="about-features">
                            {[
                                "Expert Software Architects",
                                "Agile Development Process",
                                "Dedicated Support Team"
                            ].map((feature, idx) => (
                                <motion.div 
                                    key={idx}
                                    className="feature-item"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                >
                                    <CheckCircle2 className="feature-icon" />
                                    <span>{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button 
                            className="about-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/about')}
                        >
                            Learn More About Us
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
