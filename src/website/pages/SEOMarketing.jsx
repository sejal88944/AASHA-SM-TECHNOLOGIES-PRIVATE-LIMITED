import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, Globe, MapPin, ShoppingCart, Sparkles, TrendingUp, Zap, Shield, BarChart, Cpu, LocateFixed, Navigation, FileSearch, RefreshCw, Layers, LineChart, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


import './SEOMarketing.css';


const SEOMarketing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="seo-marketing-page-wrapper" style={{ fontFamily: "'Merriweather', serif", overflowX: 'hidden' }}>

            {/* Hero Section with Gradient Background */}
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
                    <source src="/GettyImages-1395400730.mov" type="video/mp4" />
                    <source src="/GettyImages-1395400730.mov" type="video/quicktime" />
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

                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 2, maxWidth: '900px', color: 'white', padding: '0 20px' }}
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
                            lineHeight: '1.1',
                            marginBottom: '24px',
                            textTransform: 'uppercase'
                        }}
                    >
                        Search Engine <span style={{ color: 'var(--primary)' }}>Optimization</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            color: 'rgba(255,255,255,0.95)',
                            maxWidth: '800px',
                            margin: '0 auto 40px auto'
                        }}
                    >
                        Dominate search rankings with comprehensive SEO strategies. From local to international, we optimize your online presence to drive organic traffic, increase visibility, and maximize ROI across all search engines.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                        style={{
                            padding: '16px 40px',
                            background: 'white',
                            color: 'var(--primary)',
                            border: 'none',
                            borderRadius: '50px',
                            fontSize: '18px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        Get Started <MoveRight size={20} />
                    </motion.button>
                </motion.div>
            </div>



            {/* Why SEO is Important Section */}
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
                                <source src="/6912552_Motion_Graphics_Motion_Graphic_3840x2160.mp4" type="video/mp4" />
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
                            SEARCH ENGINE OPTIMIZATION
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
                            Why SEO is Essential<br />for Your Business
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: '#64748b',
                            lineHeight: '1.7',
                            marginBottom: '30px'
                        }}>
                            Search Engine Optimization is the foundation of digital success. With 93% of online experiences beginning with a search engine, SEO ensures your business is discovered by potential customers at the exact moment they're looking for your products or services. Effective SEO drives organic traffic, builds credibility, and delivers sustainable long-term growth without the ongoing costs of paid advertising.
                        </p>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            {[
                                "Increased Organic Traffic",
                                "Higher Search Rankings",
                                "Better User Experience",
                                "Long-term ROI"
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

            {/* Our SEO Process Section */}
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
                        Our SEO Process
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
                        A proven methodology that delivers measurable results and sustainable growth through comprehensive optimization strategies.
                    </motion.p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '40px',
                        marginTop: '60px'
                    }}>
                        {/* SEO Process Steps List */}
                        {[
                            { step: "01", title: "Audit & Research", desc: "Comprehensive website audit, competitor analysis, and keyword research to identify opportunities and create a data-driven strategy.", delay: 0, image: "/H-2.webp" },
                            { step: "02", title: "On-Page Optimization", desc: "Optimize content, meta tags, headers, internal linking, and technical elements to improve search engine crawlability and user experience.", delay: 0.2, image: "/H-3.webp", margin: true },
                            { step: "03", title: "Off-Page & Monitoring", desc: "Build high-quality backlinks, manage online reputation, and continuously monitor rankings with detailed reporting and ongoing optimization.", delay: 0.4, image: "/H-6.webp" }
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
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        marginBottom: '24px',
                                        border: '2px solid var(--primary)',
                                        position: 'relative',
                                        background: '#fff',
                                        zIndex: 1,
                                        boxShadow: '0 10px 30px rgba(55, 180, 111, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
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

            {/* Strategic SEO Growth Sections */}
            <StrategicGrowthSections />

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
                        Ready to Skyrocket Your <br /> <span className="highlight-text" style={{ color: 'var(--primary)' }}>Search Rankings?</span>
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#64748b',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Partner with us to build a data-driven SEO strategy that drives organic growth and high-quality traffic.
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



const StrategicGrowthSections = () => {
    const strategies = [
        {
            title: "Google & Local Growth",
            tagline: "This is where nearby customers discover you.",
            description: "Focused on improving visibility in local and map-based searches.",
            icon: <LocateFixed size={32} />,
            color: "var(--primary)",
            who: "Local businesses, service providers, and multi-location brands.",
            helps: "Drives local inquiries, walk-ins, and builds online trust.",
            features: [
                "Google My Business Optimization",
                "Local SEO & Map Ranking",
                "Review & Reputation Management",
                "Hyper-Local Visibility Strategy"
            ]
        },
        {
            title: "Advanced SEO & Growth Marketing",
            tagline: "This is where long-term organic growth is built.",
            description: "SEO strategies focused on quality traffic and authority.",
            icon: <LineChart size={32} />,
            color: "var(--primary)",
            who: "Businesses serious about sustainable search visibility.",
            helps: "Improves rankings, attracts relevant users, and builds credibility.",
            subsections: [
                {
                    name: "Technical SEO",
                    items: ["Website Speed Optimization", "Core Web Vitals", "Mobile SEO", "Indexing & Crawl Optimization", "Schema Markup"]
                },
                {
                    name: "On-Page SEO",
                    items: ["Search Intent Mapping", "EEAT-Based Content Optimization", "Internal Linking Strategy", "Featured Snippet Optimization"]
                },
                {
                    name: "Off-Page SEO",
                    items: ["High Authority Backlinks", "Digital PR", "Brand Mentions", "Local Citations"]
                },
                {
                    name: "Content-Led SEO",
                    items: ["SEO Blogs & Articles", "Pillar–Cluster Strategy", "Case Studies & Whitepapers", "Video SEO"]
                }
            ]
        },
        {
            title: "AI & Future-Ready SEO",
            tagline: "This is where search is heading next.",
            description: "Optimised for AI-driven discovery and answer-based platforms.",
            icon: <Cpu size={32} />,
            color: "var(--primary)",
            who: "Forward-thinking brands preparing for the future of search.",
            helps: "Improves brand visibility across AI search tools and platforms.",
            features: [
                "Generative SEO (AI Search Optimization)",
                "ChatGPT / Gemini / Perplexity Visibility",
                "Answer Engine Optimization (AEO)",
                "Knowledge Graph Optimization",
                "AI Search Brand Presence"
            ]
        },
        {
            title: "Hyper-Local & Industry SEO",
            tagline: "This is where niche visibility matters most.",
            description: "SEO tailored to location and industry-specific behaviour.",
            icon: <Navigation size={32} />,
            color: "var(--primary)",
            who: "Businesses operating in specific cities, regions, or industries.",
            helps: "Connects your brand with the right audience, in the right place.",
            features: [
                "Area-wise & City-wise SEO",
                "Google Maps 3-Pack Ranking",
                "Multi-Location SEO",
                "Industry Expertise: Healthcare, Education, Real Estate, Manufacturing, Service"
            ]
        },
        {
            title: "SEO Consulting & Growth Strategy",
            tagline: "This is where clarity replaces guesswork.",
            description: "Focused on analysis, direction, and informed decision-making.",
            icon: <FileSearch size={32} />,
            color: "var(--primary)",
            who: "Businesses seeking strategic clarity before execution.",
            helps: "Identifies gaps, opportunities, and clear growth paths.",
            features: [
                "360° SEO Audit",
                "Competitor Gap Analysis",
                "Keyword Opportunity Mapping",
                "Penalty Recovery",
                "Conversion Rate Optimization (CRO)",
                "Funnel-Based SEO"
            ]
        },
        {
            title: "Reputation & Brand Protection",
            tagline: "This is where trust is managed and protected.",
            description: "Focused on safeguarding your digital image.",
            icon: <Shield size={32} />,
            color: "var(--primary)",
            who: "Brands that value credibility and long-term reputation.",
            helps: "Builds trust, manages perception, and protects brand value.",
            features: [
                "Online Reputation Management",
                "Negative Content Suppression",
                "Brand Trust Building",
                "Digital Brand Defense"
            ]
        },
        {
            title: "SEO Growth Retainer",
            tagline: "This is where growth becomes consistent.",
            description: "A long-term partnership model, not one-time execution.",
            icon: <RefreshCw size={32} />,
            color: "var(--primary)",
            who: "Businesses looking for continuous optimisation and support.",
            helps: "Ensures steady, structured, and scalable growth.",
            features: [
                "Monthly SEO Execution",
                "Quarterly Growth Roadmap",
                "SEO + Ads + Content Integration",
                "Founder / Leadership Branding",
                "Long-Term Growth Planning"
            ]
        }
    ];

    return (
        <div style={{ padding: '40px 5% 100px 5%', background: '#ffffff' }}>
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
                        Unlock Your Full <span style={{ color: 'var(--primary)' }}>Organic Potential</span>
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#64748b',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Explore our specialized SEO modules designed to scale your business, protect your reputation, and prepare you for the future of search.
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
                                background: '#f1f5f9',
                                borderRadius: '30px',
                                padding: '50px',
                                boxShadow: 'none',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                gap: '50px',
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
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '20px',
                                        background: `${item.color}15`,
                                        color: item.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '30px'
                                    }}>
                                    {item.icon}
                                </motion.div>
                                <motion.h3 style={{ fontFamily: "'Merriweather', serif", fontStyle: 'italic', fontSize: '32px', fontWeight: '800', color: 'var(--secondary)', marginBottom: '12px' }}>{item.title}</motion.h3>
                                <p style={{ fontSize: '18px', fontWeight: '600', color: item.color, marginBottom: '20px' }}>{item.tagline}</p>
                                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '30px' }}>{item.description}</p>

                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Who it’s for</div>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#334155' }}>{item.who}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>How it helps</div>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#334155' }}>{item.helps}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Lists */}
                            <div style={{ flex: '1.2', minWidth: '300px' }}>
                                {item.features && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                        {item.features.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.05, x: 5 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', background: '#fff', border: '1px solid #f1f5f9', cursor: 'default' }}
                                            >
                                                <CheckCircle size={18} color={item.color} />
                                                <span style={{ fontSize: '15px', fontWeight: '500', color: '#475569' }}>{f}</span>
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



export default SEOMarketing;
