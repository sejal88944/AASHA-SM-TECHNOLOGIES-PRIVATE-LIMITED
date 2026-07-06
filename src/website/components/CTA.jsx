import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-content">
                    <div className="cta-badge">
                        <span className="cta-badge-icon">🚀</span>
                        <span className="cta-badge-text">Let's Get Started</span>
                    </div>
                    <h2 className="cta-title">Ready to Transform Your <span className="highlight-text">Digital Presence?</span></h2>
                    <p className="cta-description">
                        Join hundreds of successful businesses who have elevated their brand with our innovative digital solutions.
                        Let's create something amazing together!
                    </p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="cta-btn cta-btn-primary">
                            <span>Start Your Project</span>
                            <svg className="cta-btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/services" className="cta-btn cta-btn-secondary">
                            <span>Explore Services</span>
                        </Link>
                    </div>
                    <div className="cta-features">
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span className="cta-feature-text">Free Consultation</span>
                        </div>
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span className="cta-feature-text">24/7 Support</span>
                        </div>
                        <div className="cta-feature">
                            <span className="cta-feature-icon">✓</span>
                            <span className="cta-feature-text">Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>
                <div className="cta-decoration">
                    <div className="cta-circle cta-circle-1"></div>
                    <div className="cta-circle cta-circle-2"></div>
                    <div className="cta-circle cta-circle-3"></div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
