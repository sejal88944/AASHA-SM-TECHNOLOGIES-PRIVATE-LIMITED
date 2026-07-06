import React, { useEffect } from 'react';
import { Check, Cpu, Eye, Compass, ShieldAlert, Sparkles, TrendingUp, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ConsultationForm from '../components/ConsultationForm';
import './About.css';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <div className="about-page-wrapper">

                {/* Hero Section (Dark & Glowing Tech Backdrop - No Image) */}
                <section className="about-hero">
                    <div className="about-hero-glow-1"></div>
                    <div className="about-hero-glow-2"></div>

                    <div className="about-hero-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="about-badge"
                        >
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                            Who We Are
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="about-title"
                        >
                            AASHA-SM TECHNOLOGIES
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="about-subtitle"
                        >
                            Pioneering the Next Era of Digital Innovation, Software Engineering, AI Automations, and Advanced Search Optimizations.
                        </motion.p>
                    </div>
                </section>

                {/* 1. Intro Section (Left Image Replaced with Value Pillars Grid) */}
                <section className="about-section">
                    <div className="about-flex">
                        {/* Left Side: Core Value Pillars */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="about-pillars-column"
                        >
                            <div className="about-pillar-card" style={{ '--accent': '#F26522' }}>
                                <div className="pillar-header">
                                    <div className="pillar-icon"><Cpu size={24} /></div>
                                    <h3>AI & Software Scale</h3>
                                </div>
                                <p>We architect custom CRM/ERP solutions and deploy next-gen AI Automations to optimize workflows and scale business operations.</p>
                            </div>

                            <div className="about-pillar-card" style={{ '--accent': '#2196F3' }}>
                                <div className="pillar-header">
                                    <div className="pillar-icon"><TrendingUp size={24} /></div>
                                    <h3>AI Search Reach (GEO/AEO)</h3>
                                </div>
                                <p>We engineer structured content and API schema markups to guarantee your brand ranks at the top of AI Search Answers (ChatGPT, Gemini, Perplexity).</p>
                            </div>

                            <div className="about-pillar-card" style={{ '--accent': '#4CAF50' }}>
                                <div className="pillar-header">
                                    <div className="pillar-icon"><HeartHandshake size={24} /></div>
                                    <h3>Search Experience (SXO)</h3>
                                </div>
                                <p>We combine traditional SEO with user experience (UX) to build fast, responsive, and secure web environments that drive conversions.</p>
                            </div>
                        </motion.div>

                        {/* Right Content Side: Detailed Optimized Story */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="about-content-side"
                        >
                            <span className="section-tag">ABOUT OUR COMPANY</span>
                            <h2 className="section-heading-about">Our Digital Story</h2>
                            <div className="about-text">
                                <p style={{ marginBottom: '18px' }}>
                                    AASHA-SM TECHNOLOGIES PRIVATE LIMITED is a premium software engineering and search marketing agency based in Pune, India. We design and build enterprise-grade web solutions, scalable digital systems, and custom automation workflows.
                                </p>
                                <p style={{ marginBottom: '18px' }}>
                                    Our mission is to help modern businesses stay ahead of the digital curve. By integrating custom CRM/ERP architectures with next-generation AI Automations and voice/AI search engines optimizations (GEO, AEO), we build future-proof systems.
                                </p>
                                <p>
                                    Whether you need a custom-built website, complex business software, WhatsApp chatbot automations, or search visibility that dominates AI algorithms, AASHA-SM TECHNOLOGIES guarantees speed, security, and long-term scaling success.
                                </p>
                                <p style={{ marginTop: '24px', color: '#F26522', fontWeight: 800 }}>
                                    Your Trusted Strategic Technology Partner for Enterprise Transformation.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Mission / Vision Section (Right Image Replaced with Tech/Capabilities Grid) */}
                <section className="vision-section">
                    <div className="vision-grid">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="vision-content-left"
                        >
                            <h2 className="vision-main-heading">
                                Scaling Businesses with <span style={{ color: 'var(--primary)' }}>Next-Gen Tech</span>
                            </h2>

                            <div className="vision-list">
                                <div className="vision-item">
                                    <div className="vision-icon">
                                        <Eye size={26} color="white" />
                                    </div>
                                    <div>
                                        <h3 className="vision-title">VISION</h3>
                                        <p className="vision-desc">
                                            To serve as the cornerstone of digital transformation by delivering innovative, secure, and highly-optimized software solutions that connect brands and automate workflows globally.
                                        </p>
                                    </div>
                                </div>

                                <div className="vision-item">
                                    <div className="vision-icon">
                                        <Compass size={26} color="white" />
                                    </div>
                                    <div>
                                        <h3 className="vision-title">OUR PROCESS</h3>
                                        <p className="vision-desc">
                                            A meticulous, data-driven cycle covering analysis, UI/UX prototyping, high-fidelity development, automated chatbot deployment, and advanced AI optimization.
                                        </p>
                                    </div>
                                </div>

                                <div className="vision-item">
                                    <div className="vision-icon">
                                        <Sparkles size={26} color="white" />
                                    </div>
                                    <div>
                                        <h3 className="vision-title">AI SEARCH DOMINANCE (SXO/GEO)</h3>
                                        <p className="vision-desc">
                                            We structure your platforms to rank not only on standard Google searches but inside generative AI models, making your services easily citeable by AI bots.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Capabilities Matrix (Grid of Badges instead of image) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="vision-content-right"
                        >
                            <div className="established-badge">
                                <span className="established-tag">Established Partner</span>
                                <h3 className="since-text">SINCE 2026</h3>
                            </div>
                            
                            <div className="capabilities-grid-container">
                                <h4 className="capabilities-title">Core Technology Matrix</h4>
                                <div className="capabilities-pills-list">
                                    {[
                                        { text: "Custom Web Dev", color: "#F26522" },
                                        { text: "Software Engineering", color: "#2196F3" },
                                        { text: "AI-Powered Automations", color: "#4CAF50" },
                                        { text: "CRM/ERP Architecture", color: "#FF9800" },
                                        { text: "WhatsApp API & Chatbots", color: "#9C27B0" },
                                        { text: "Search Engine Optimization (SEO)", color: "#E91E63" },
                                        { text: "Generative Engine Optimization (GEO)", color: "#00BCD4" },
                                        { text: "Answer Engine Optimization (AEO)", color: "#3F51B5" },
                                        { text: "Search Experience (SXO)", color: "#009688" }
                                    ].map((pill, idx) => (
                                        <div 
                                            key={idx} 
                                            className="tech-badge-pill"
                                            style={{ 
                                                '--pill-accent': pill.color,
                                                '--pill-accent-15': `${pill.color}15`
                                            }}
                                        >
                                            <Check size={12} style={{ color: pill.color, marginRight: '6px' }} strokeWidth={3} />
                                            <span>{pill.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. Contact Section */}
                <section className="about-contact-cta">
                    <div className="cta-flex">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ flex: 1 }}
                        >
                            <h2 className="section-heading-about">
                                Ready to build <br />
                                <span style={{ color: 'var(--primary)' }}>your digital future?</span>
                            </h2>
                            <p className="about-text" style={{ maxWidth: '480px' }}>
                                Get in touch with AASHA-SM TECHNOLOGIES PRIVATE LIMITED for custom website development, AI-powered business automations, and search performance strategies.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ flex: 1, maxWidth: '550px', width: '100%' }}
                        >
                            <ConsultationForm />
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default About;
