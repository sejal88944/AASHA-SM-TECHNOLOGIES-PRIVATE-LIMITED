import React, { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import './LegalPages.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <div className="legal-page-wrapper">
                
                {/* Hero Banner */}
                <section className="legal-hero">
                    <div className="legal-hero-glow-1"></div>
                    <div className="legal-hero-glow-2"></div>
                    
                    <div className="legal-hero-content">
                        <div className="legal-badge">Security & Trust</div>
                        <h1 className="legal-title">Privacy Policy</h1>
                        <p className="legal-subtitle">Last Updated: June 28, 2026</p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="legal-content-container">
                    <p style={{ fontSize: '15.5px', lineHeight: '1.8', marginBottom: '35px', color: '#475569' }}>
                        AASHA-SM TECHNOLOGIES PRIVATE LIMITED ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us. Please read this policy carefully. If you do not agree with the terms outlined here, please discontinue accessing the site.
                    </p>

                    <section className="legal-section">
                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect information in several ways depending on how you interact with our website and services. The types of data we collect include:
                        </p>
                        <ul>
                            <li>
                                <strong>Personal Data:</strong> Personally identifiable details such as your name, corporate email address, contact number, and other information that you voluntarily provide to us when submitting contact, FAQ, or consultation forms.
                            </li>
                            <li>
                                <strong>Technical & Derivative Data:</strong> Analytics details automatically gathered by our servers, such as your IP address, browser type, device operating system, access timestamps, and referring pages.
                            </li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>2. Use of Your Information</h2>
                        <p>
                            We use the collected information to ensure a secure, customized, and efficient user experience. Specifically, we may use your details to:
                        </p>
                        <ul>
                            <li>Administer and manage user inquiries, consultations, and form responses.</li>
                            <li>Deliver custom software systems, AI automations, and search marketing deliverables.</li>
                            <li>Send transactional notifications, security alerts, and system updates.</li>
                            <li>Enhance technical reliability, performance tracking, and SEO effectiveness of the website.</li>
                            <li>Safeguard against fraudulent activities or unauthorized access.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. Disclosure of Your Information</h2>
                        <p>
                            We do not sell, rent, or trade your personal information. We may disclose gathered data only in the following specific scenarios:
                        </p>
                        <ul>
                            <li>
                                <strong>Compliance with Law:</strong> When required to satisfy any applicable regulatory requirements, legal processes, governmental requests, or enforceable policies.
                            </li>
                            <li>
                                <strong>Trusted Third-Party Service Providers:</strong> Sharing details with trusted vendors that perform services on our behalf (such as hosting, form submission processing, or analytics providers) under strict confidentiality agreements.
                            </li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>4. Data Security</h2>
                        <p>
                            We implement appropriate administrative, technical, and physical security measures designed to safeguard your personal data. However, please be aware that no transmission over the internet or computer storage system can be guaranteed to be 100% secure.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Contact Information</h2>
                        <p>
                            For questions, concerns, or requests regarding this Privacy Policy, please contact our administrative team at:
                        </p>
                        <div className="legal-contact-card">
                            <p>
                                <strong>AASHA-SM TECHNOLOGIES PRIVATE LIMITED</strong><br />
                                <strong>Location:</strong> Pune, Maharashtra, India<br />
                                <strong>Email:</strong> adminsmtechsolution@gmail.com<br />
                                <strong>Phone:</strong> +91 95299 98320
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default PrivacyPolicy;
