import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Facebook, Instagram, Linkedin, Zap, Layers, BarChart, Sparkles, MessageCircle, Share2, TrendingUp, Target } from 'lucide-react';
import './SocialMediaMarketing.css';

const SocialMediaMarketing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Styles matching the reference reference
    const styles = {
        container: {
            fontFamily: "'Merriweather', serif",
            color: '#333',
            lineHeight: '1.6',
            overflowX: 'hidden',
        },
        heroSection: {
            background: 'linear-gradient(135deg, #e0f7fa 0%, #ffe4e6 50%, #f3e8ff 100%)', // Pastel gradient
            padding: '100px 5% 80px 5%',
            textAlign: 'center',
        },
        heroTitle: {
            fontSize: '36px',
            marginBottom: '20px',
            color: '#1a1a1a',
            fontWeight: '700',
        },
        heroSubtitle: {
            fontSize: '56px',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '30px',
            lineHeight: '1.1',
        },
        heroText: {
            fontSize: '18px',
            color: '#4b5563',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.8',
        },
        section: {
            padding: '80px 5%',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            position: 'relative',
        },
        sectionTitle: {
            fontSize: '42px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '40px',
            color: '#1a1a1a',
        },
        subSectionTitle: {
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#1a1a1a',
            marginTop: '60px',
        },
        textList: {
            textAlign: 'center',
            maxWidth: '1000px',
            margin: '0 auto 50px auto',
        },
        listItem: {
            marginBottom: '15px',
            fontSize: '18px',
            color: '#4b5563',
        },
        boldTerm: {
            color: '#1a1a1a',
            fontWeight: '700',
        },
        cardGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '50px',
        },
        card: {
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)', // Purple to Pink gradient
            padding: '30px',
            borderRadius: '16px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            minHeight: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '700',
            transition: 'transform 0.3s ease',
        },
        contentItem: {
            marginBottom: '24px',
        },
        contentTitle: {
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '8px',
            color: '#1a1a1a',
        },
        contentText: {
            fontSize: '16px',
            color: '#4b5563',
            lineHeight: '1.7',
        }
    };

    return (
        <div className="social-media-marketing-page-wrapper" style={{ ...styles.container, fontFamily: "'Merriweather', serif" }}>
            {/* Hero Section with Video Background */}
            <div style={{
                position: 'relative',
                height: '90vh',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                {/* Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1
                    }}
                >
                    <source src="/Social Media Marketing.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark Overlay */}
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    zIndex: -1
                }}></div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        maxWidth: '1000px',
                        padding: '0 20px',
                        color: 'white'
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(30px, 3vw, 62px)',
                            fontFamily: "'Merriweather', serif",
                            fontStyle: 'italic',
                            fontWeight: '900',
                            marginBottom: '24px',
                            lineHeight: '1.2',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Social Media <span style={{ color: 'var(--primary)' }}>Marketing</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            maxWidth: '800px',
                            margin: '0 auto 40px auto',
                            color: 'rgba(255,255,255,0.95)'
                        }}
                    >
                        Master the social landscape with data-driven strategies. From community building to high-performance ads, we help your brand connect, engage, and grow across every platform that matters to your audience.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                        style={{
                            padding: '16px 45px',
                            background: 'white',
                            color: 'var(--primary)',
                            border: 'none',
                            borderRadius: '50px',
                            fontSize: '18px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        Get Started Today
                    </motion.button>
                </motion.div>
            </div>



            {/* Why Social Media is Essential Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ padding: '100px 5% 40px 5%', background: '#f8fafc' }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>

                    {/* Left: Icon/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}
                    >
                        <motion.div
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                borderRadius: '20px',
                                overflow: 'hidden'
                            }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                            >
                                <source src="/social-media-marketing.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ flex: 1.5, minWidth: '300px' }}
                    >
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '10px'
                        }}>
                            SOCIAL MEDIA MARKETING
                        </div>
                        <h2 style={{
                            fontSize: '42px',
                            fontFamily: "'Merriweather', serif",
                            fontStyle: 'italic',
                            fontWeight: '800',
                            color: 'var(--secondary)',
                            marginBottom: '24px',
                            lineHeight: '1.2'
                        }}>
                            Why Social Media is Essential<br />for Your Business
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: '#64748b',
                            lineHeight: '1.7',
                            marginBottom: '30px'
                        }}>
                            Social media is the heartbeat of modern brand-customer relationships. It's not just about posting; it's about being present where your customers spend their time. With billions active daily, it's the ultimate channel to build trust, humanize your brand, and drive direct engagement that leads to loyal customers and sustainable growth.
                        </p>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            {[
                                "Instant Brand Awareness",
                                "Targeted Customer Reach",
                                "Real-time Customer Feedback",
                                "Increased Website Traffic"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ x: 10 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'default' }}
                                >
                                    <CheckCircle size={20} color="var(--primary)" fill="var(--primary)" stroke="white" />
                                    <span style={{ fontSize: '16px', color: '#475569', fontWeight: '500' }}>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Our Social Media Process Section */}
            <div style={{ padding: '40px 5% 40px 5%', background: '#fff' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: '36px',
                            fontFamily: "'Merriweather', serif",
                            fontStyle: 'italic',
                            fontWeight: '800',
                            color: 'var(--secondary)',
                            marginBottom: '16px'
                        }}
                    >
                        Our Social Media Process
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: '16px',
                            color: '#64748b',
                            maxWidth: '700px',
                            margin: '0 auto 80px auto'
                        }}
                    >
                        A systematic approach to growing your social presence through strategic planning, creative execution, and data-driven optimization.
                    </motion.p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '40px',
                        marginTop: '60px'
                    }}>
                        {[
                            { step: "01", title: "Strategy & Planning", desc: "We deep dive into your brand goals, target audience behavior, and competitor analysis to create a tailored content roadmap.", delay: 0, image: "/H-4.webp" },
                            { step: "02", title: "Content Excellence", desc: "Our creative team produces high-quality visuals, reels, and engaging copy that resonates with your community and brand voice.", delay: 0.2, image: "/SEO-2.png", margin: true },
                            { step: "03", title: "Growth & Optimization", desc: "We actively manage your community, run targeted campaigns, and analyze performance data to continuously improve results.", delay: 0.4, image: "/SEO-1.png" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: item.delay }}
                                whileHover={{ y: -10 }}
                                style={{
                                    flex: '1',
                                    minWidth: '300px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    marginTop: item.margin ? '40px' : '0',
                                    position: 'relative'
                                }}
                            >
                                {/* Background faint number */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '140px',
                                    fontWeight: '950',
                                    color: 'var(--primary)',
                                    opacity: 0.08,
                                    zIndex: 0,
                                    pointerEvents: 'none',
                                    lineHeight: 1,
                                    filter: 'blur(1px)'
                                }}>
                                    {item.step}
                                </div>

                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'rgba(55, 180, 111, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)',
                                        marginBottom: '24px',
                                        border: '2px solid var(--primary)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        zIndex: 1,
                                        boxShadow: '0 10px 30px rgba(55, 180, 111, 0.1)',
                                        padding: '15px'
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </motion.div>
                                <h3 style={{ fontFamily: "'Merriweather', serif", fontStyle: 'italic', fontSize: '22px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '16px' }}>{item.title}</h3>
                                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6' }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* OUR SERVICES / Strategic Growth Section */}
            <SocialStrategicGrowth />

            {/* Pricing Packages Section */}
            <PricingPackages />

            {/* Bottom Contact CTA */}
            <ContactCTA />

        </div>
    );
};


const ContactCTA = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '80px 5%', background: '#f8fafc' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '60px 40px',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px'
                }}
            >
                <div>
                    <h2 style={{
                        fontSize: 'clamp(32px, 4vw, 42px)',
                        fontFamily: "'Merriweather', serif",
                        fontStyle: 'italic',
                        fontWeight: '800',
                        color: 'var(--secondary)',
                        marginBottom: '16px',
                        lineHeight: '1.2'
                    }}>
                        Ready to Grow Your <br /> <span className="highlight-text" style={{ color: 'var(--primary)' }}>Digital Presence?</span>
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#64748b',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Stop worrying about algorithms and start focusing on results. Let's build a strategy that works for you.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, background: 'var(--primary)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/contact')}
                    style={{
                        padding: '16px 45px',
                        background: 'var(--secondary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                >
                    Contact Us Now
                </motion.button>
            </motion.div>
        </div>
    );
};


const SocialStrategicGrowth = () => {
    const strategies = [
        {
            title: "Meta Ecosystem (Facebook & Ads)",
            tagline: "This is where broad audience engagement happens.",
            description: "Focused on building a strong community and driving conversions through Facebook and Meta's powerful ad network.",
            icon: <Facebook size={32} />,
            color: "var(--primary)",
            who: "B2C brands, local businesses, and community-focused organizations.",
            helps: "Increases brand reach, drives traffic, and fuels customer acquisition.",
            features: [
                "Targeted Meta Ad Campaigns",
                "Community Page Management",
                "Messenger Automation & Bots",
                "Lookalike Audience Strategy"
            ]
        },
        {
            title: "Instagram Branding & Visuals",
            tagline: "This is where your brand's visual identity comes alive.",
            description: "Strategies focused on high-impact visual storytelling and engagement through reels and aesthetics.",
            icon: <Instagram size={32} />,
            color: "var(--primary)",
            who: "Lifestyle, Fashion, Food, and Visual-first brands.",
            helps: "Builds a premium brand image and high follower engagement.",
            subsections: [
                {
                    name: "Content Core",
                    items: ["Reels & Video Strategy", "Aesthetic Grid Planning", "Story Engagement Tactics", "Influencer Collaborations"]
                },
                {
                    name: "Growth Ops",
                    items: ["Trend Integration", "UGC (User Generated Content)", "Hashtag & SEO Strategy", "Shoppable Posts"]
                }
            ]
        },
        {
            title: "LinkedIn B2B Authority",
            tagline: "This is where professional credibility is established.",
            description: "Focused on establishing thought leadership and high-quality B2B lead generation.",
            icon: <Linkedin size={32} />,
            color: "var(--primary)",
            who: "IT firms, Consultants, B2B startups, and Corporate leaders.",
            helps: "Generates high-ticket leads and builds industry authority.",
            features: [
                "Founder/CXO Personal Branding",
                "Targeted B2B Lead Gen",
                "Industry Thought Leadership",
                "Employee Advocacy Programs"
            ]
        },
        {
            title: "Paid Performance (PPC) & ROI",
            tagline: "This is where immediate results are achieved.",
            description: "Data-driven advertising strategies across platforms to maximize return on ad spend.",
            icon: <Zap size={32} />,
            color: "var(--primary)",
            who: "Businesses looking for quick scaling and measurable ROI.",
            helps: "Drives immediate sales, sign-ups, and brand saturation.",
            features: [
                "Multi-Channel Ad Scaling",
                "Retargeting Funnels",
                "Conversion Rate Optimization",
                "ROI-Focused Reporting"
            ]
        },
        {
            title: "Social Growth Strategy",
            tagline: "This is where clarity replaces guesswork.",
            description: "A comprehensive roadmap for multi-channel dominance and sustained growth.",
            icon: <Target size={32} />,
            color: "var(--primary)",
            who: "Brands looking for a structured long-term digital presence.",
            helps: "Ensures consistency, saves time, and aligns social with business goals.",
            features: [
                "360° Social Media Audit",
                "Competitor Analysis",
                "Content Ecosystem Design",
                "Monthly Performance Mapping"
            ]
        }
    ];

    return (
        <div style={{ padding: '40px 5% 40px 5%', background: '#ffffff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{
                        color: 'var(--primary)',
                        fontWeight: '700',
                        marginBottom: '16px',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Strategic Growth Modules
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontFamily: "'Merriweather', serif",
                        fontStyle: 'italic',
                        fontWeight: '900',
                        color: 'var(--secondary)',
                        marginBottom: '20px',
                        lineHeight: '1.1'
                    }}>
                        Dominate the <span style={{ color: 'var(--primary)' }}>Social Landscape</span>
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#64748b',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Explore our specialized social media modules designed to scale your presence, build authority, and drive real business impact across all platforms.
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '40px' }}>
                    {strategies.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="growth-card"
                            style={{
                                background: '#f8fafc',
                                borderRadius: '30px',
                                padding: '40px',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                gap: '40px',
                                flexWrap: 'wrap',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                            whileHover={{
                                scale: 1.01,
                                borderColor: item.color,
                                boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
                            }}
                        >
                            {/* Left: Identifier */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: `${item.color}15`,
                                        color: item.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px'
                                    }}>
                                    {item.icon}
                                </motion.div>
                                <motion.h3 style={{ fontFamily: "'Merriweather', serif", fontStyle: 'italic', fontSize: '26px', fontWeight: '800', color: 'var(--secondary)', marginBottom: '8px' }}>{item.title}</motion.h3>
                                <p style={{ fontSize: '16px', fontWeight: '600', color: item.color, marginBottom: '16px' }}>{item.tagline}</p>
                                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>{item.description}</p>

                                <div style={{ background: '#ffffff', padding: '18px', borderRadius: '18px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Who it’s for</div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{item.who}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>How it helps</div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{item.helps}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Lists */}
                            <div style={{ flex: '1.2', minWidth: '300px' }}>
                                {item.features && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                        {item.features.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.05, x: 5 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '12px', background: '#fff', border: '1px solid #f1f5f9', cursor: 'default' }}
                                            >
                                                <CheckCircle size={16} color={item.color} />
                                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>{f}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {item.subsections && (
                                    <div className="growth-subsections" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                        {item.subsections.map((sub, i) => (
                                            <div key={i}>
                                                <h4 style={{ fontFamily: "'Merriweather', serif", fontStyle: 'italic', fontSize: '16px', fontWeight: '800', color: 'var(--secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }}></div>
                                                    {sub.name}
                                                </h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {sub.items.map((it, j) => (
                                                        <motion.div
                                                            key={j}
                                                            whileHover={{ x: 5, color: item.color }}
                                                            style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}
                                                        >
                                                            <div style={{ width: '4px', height: '1px', background: '#cbd5e1' }}></div>
                                                            {it}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style>
                {`
                    @media (max-width: 768px) {
                        .growth-card {
                            padding: 30px 15px !important;
                            gap: 30px !important;
                        }
                        .growth-subsections {
                            grid-template-columns: 1fr !important;
                        }
                    }
                    
                    @media (max-width: 600px) {
                        /* Hero Section Mobile */
                        h1 {
                            font-size: clamp(28px, 8vw, 40px) !important;
                            line-height: 1.2 !important;
                        }
                        
                        /* Button Mobile */
                        button {
                            padding: 14px 32px !important;
                            font-size: 16px !important;
                        }
                        
                        /* Section Headings Mobile */
                        h2 {
                            font-size: clamp(28px, 7vw, 36px) !important;
                            line-height: 1.2 !important;
                        }
                        
                        h3 {
                            font-size: clamp(20px, 5vw, 24px) !important;
                        }
                        
                        /* Paragraph Text Mobile */
                        p {
                            font-size: 15px !important;
                            line-height: 1.6 !important;
                        }
                        
                        /* Growth Cards Mobile */
                        .growth-card {
                            padding: 25px 20px !important;
                            gap: 25px !important;
                            border-radius: 20px !important;
                        }
                        
                        /* Process Steps Mobile */
                        .process-step {
                            min-width: 100% !important;
                            margin-top: 0 !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

const PricingPackages = () => {
    const packages = [
        {
            name: "SILVER PACKAGE",
            badge: "🥈",
            color: "#94a3b8", // Silver/Slate
            gradient: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
            subtitle: "Perfect for businesses starting their digital journey",
            includes: ["4 Creatives per month", "2 Reels per month"],
            whoFor: ["Small businesses", "Local service providers", "New brands", "Businesses with minimal online presence"],
            benefits: ["Builds basic online presence", "Ensures consistency in posting", "Introduces your brand digitally", "Helps customers recognize your business", "Professional content instead of random posts"],
            footer: "✨ Best for getting started the right way."
        },
        {
            name: "GOLD PACKAGE",
            badge: "🥇",
            color: "#f59e0b", // Gold/Amber
            gradient: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
            subtitle: "For growing brands that want visibility & engagement",
            includes: ["6 Creatives per month", "3 Reels per month"],
            whoFor: ["Growing businesses", "Clinics, consultants & startups", "Brands looking to increase engagement"],
            benefits: ["Stronger brand visibility", "Better engagement on social platforms", "Professionally designed content", "Builds trust and credibility", "Improves inquiry & lead potential"],
            footer: "✨ Ideal for businesses ready to grow steadily.",
            popular: true
        },
        {
            name: "PLATINUM PACKAGE",
            badge: "🏆",
            color: "var(--accent)", // Platinum/Purple
            gradient: "linear-gradient(135deg, #ede9fe 0%, var(--accent) 100%)",
            subtitle: "For brands that want performance & positioning",
            includes: ["8 Creatives per month", "4 Reels per month"],
            whoFor: ["Established businesses", "Lead-focused brands", "Competitive industries"],
            benefits: ["High-quality, strategy-driven content", "Strong brand recall", "Better engagement & reach", "Content aligned with business goals", "Strong storytelling & branding"],
            footer: "✨ Designed for brands that want to stand out."
        },
        {
            name: "DIAMOND PACKAGE",
            badge: "💎",
            color: "#06b6d4", // Diamond/Cyan
            gradient: "linear-gradient(135deg, #ecfeff 0%, #06b6d4 100%)",
            subtitle: "For brands ready to dominate digitally",
            includes: ["10 Creatives per month", "8 High-quality Reels per month"],
            whoFor: ["Established & premium brands", "Businesses scaling aggressively", "Brands focused on authority building"],
            benefits: ["High-impact branding & storytelling", "Strong and consistent online presence", "Advanced content & growth strategy", "Higher engagement & conversions", "Premium creative execution"],
            footer: "✨ Best for brands serious about digital dominance."
        }
    ];

    return (
        <div style={{ padding: '40px 5% 80px 5%', background: '#f8fafc' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{
                        fontSize: '48px',
                        fontFamily: "'Merriweather', serif",
                        fontStyle: 'italic',
                        fontWeight: '800',
                        color: 'var(--secondary)',
                        marginBottom: '16px',
                        textTransform: 'uppercase'
                    }}>
                        SOCIAL MEDIA MARKETING PACKAGES
                    </h2>
                    <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
                        Choose the perfect plan to elevate your brand's social presence and drive real business growth.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    alignItems: 'stretch'
                }}>
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -15 }}
                            style={{
                                background: 'white',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                border: pkg.popular ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                                transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                                zIndex: pkg.popular ? 2 : 1
                            }}
                        >
                            {pkg.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    zIndex: 10
                                }}>
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Header */}
                            <div style={{
                                padding: '40px 30px',
                                background: pkg.gradient,
                                textAlign: 'center',
                                color: 'var(--secondary)'
                            }}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>{pkg.badge}</div>
                                <h3 style={{ fontFamily: "'Merriweather', serif", fontStyle: 'italic', fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>{pkg.name}</h3>
                                <p style={{ fontSize: '14px', lineHeight: '1.4', opacity: 0.8, fontWeight: '500' }}>{pkg.subtitle}</p>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Includes */}
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '4px', height: '16px', background: pkg.color, borderRadius: '4px' }}></div>
                                        INCLUDES:
                                    </h4>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                        {pkg.includes.map((item, i) => (
                                            <li key={i} style={{ fontSize: '15px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                <span style={{ color: pkg.color }}>✔</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Who Is It For */}
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '4px', height: '16px', background: pkg.color, borderRadius: '4px' }}></div>
                                        WHO IS IT FOR?
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {pkg.whoFor.map((item, i) => (
                                            <span key={i} style={{
                                                background: '#f1f5f9',
                                                padding: '4px 12px',
                                                borderRadius: '30px',
                                                fontSize: '13px',
                                                color: '#64748b',
                                                fontWeight: '500'
                                            }}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* How It Helps */}
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '4px', height: '16px', background: pkg.color, borderRadius: '4px' }}></div>
                                        HOW IT HELPS YOU:
                                    </h4>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                        {pkg.benefits.map((item, i) => (
                                            <li key={i} style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pkg.color, marginTop: '7px', flexShrink: 0 }}></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{
                                padding: '24px 30px',
                                borderTop: '1px solid #f1f5f9',
                                textAlign: 'center',
                                background: '#fcfcfc'
                            }}>
                                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#475569', marginBottom: '20px' }}>{pkg.footer}</p>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => (window.location.href = '/contact')}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: pkg.color,
                                        color: pkg.color === '#fef3c7' ? 'var(--secondary)' : 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: `0 8px 16px ${pkg.color}33`
                                    }}
                                >
                                    Select Plan
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialMediaMarketing;
