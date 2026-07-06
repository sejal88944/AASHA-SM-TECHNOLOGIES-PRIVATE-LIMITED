import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../admin/components/Loader';
import SEOBenefitsSection from '../components/SEOBenefitsSection';
import SEOFAQSection from '../components/SEOFAQSection';
import SEOStatsCards from '../components/SEOStatsCards';
import SEOServicesSection from '../components/SEOServicesSection';
import SEOWhyChooseSection from '../components/SEOWhyChooseSection';
import SMMServicesSection from '../components/SMMServicesSection';
import SMMWhyChooseSection from '../components/SMMWhyChooseSection';
import SMMNeedSection from '../components/SMMNeedSection';
import SMMBenefitsSection from '../components/SMMBenefitsSection';
import SMMSelectionSection from '../components/SMMSelectionSection';
import SMMBestServicesSection from '../components/SMMBestServicesSection';
import SMMStatsSection from '../components/SMMStatsSection';

// STATIC DATA FOR MARKETING SERVICES
const marketingData = {
    'seo-optimization': {
        title: 'SEO Agency in Sangli',
        category: 'Growth & Intelligence',
        description: `
            <div style="text-align: center; max-width: 900px; margin: 0 auto;">
                <p style="font-size: 16px; color: #e2e8f0; line-height: 1.8;">
                    Looking for a <strong style="color: #fbbf24;">trusted SEO company in Sangli</strong> that delivers measurable results? Itorix Infotech offers customized <strong style="color: #fbbf24;">SEO services in Sangli</strong> designed to improve your search rankings, drive organic traffic, and enhance brand visibility.
                </p>
                <p style="font-size: 16px; color: #e2e8f0; line-height: 1.8; margin-top: 20px;">
                    Our data-driven strategies help businesses stand out—whether you're targeting <strong style="color: #fbbf24;">local customers in Sangli</strong> or a global audience.
                </p>
            </div>
        `,
        specialties: `
            <div style="text-align: center; margin-bottom: 50px;">
                <h2 style="font-size: 36px; fontWeight: 800; color: var(--secondary); letter-spacing: -1px;">Modern SEO Ecosystem</h2>
                <p style="color: #64748b; font-size: 18px; margin-top: 10px;">Holistic optimization for the era of Artificial Intelligence.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
                <!-- Card 1 -->
                <div style="background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); transition: transform 0.3s ease; border: 1px solid #f1f5f9;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 60px; height: 60px; background: #e0f2fe; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #0284c7;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <h3 style="font-size: 22px; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">Semantic Intelligence</h3>
                    <p style="color: #64748b; line-height: 1.6;">Search engines now understand context, not just keywords. We optimize your content structure to align with <strong>Google's NLP algorithms</strong> for higher relevance.</p>
                </div>

                <!-- Card 2 -->
                <div style="background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); transition: transform 0.3s ease; border: 1px solid #f1f5f9;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 60px; height: 60px; background: #fdf2f8; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--primary);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M7.5 16.5v.01"></path><path d="M16.5 7.5v.01"></path></svg>
                    </div>
                    <h3 style="font-size: 22px; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">Core Web Vitals & UX</h3>
                    <p style="color: #64748b; line-height: 1.6;">Speed is currency. We ensure your site passes all <strong>Core Web Vitals</strong>, ensuring lightning-fast loads and seamless interactivity that Google rewards.</p>
                </div>

                <!-- Card 3 -->
                <div style="background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); transition: transform 0.3s ease; border: 1px solid #f1f5f9;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 60px; height: 60px; background: #f0fdf4; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #16a34a;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    </div>
                    <h3 style="font-size: 22px; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">Voice Search Readiness</h3>
                    <p style="color: #64748b; line-height: 1.6;">With the rise of smart speakers, we optimize for natural language queries and <strong>conversational keywords</strong> to capture the future of search.</p>
                </div>

                <!-- Card 4 -->
                <div style="background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); transition: transform 0.3s ease; border: 1px solid #f1f5f9;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 60px; height: 60px; background: #fff7ed; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #ea580c;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <h3 style="font-size: 22px; font-weight: 700; color: var(--secondary); margin-bottom: 12px;">Technical Authority</h3>
                    <p style="color: #64748b; line-height: 1.6;">Advanced schema markup, crawl budget optimization, and JavaScript SEO to ensure deep indexing of your most valuable content.</p>
                </div>
            </div>
        `,
        workDescription: `
            <div style="background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary) 100%); border-radius: 30px; overflow: hidden; padding: 60px 5%; color: white; text-align: center;">
                <h2 style="font-size: 36px; fontWeight: 800; margin-bottom: 20px;">The Methodology</h2>
                <p style="color: #cbd5e1; font-size: 18px; margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto;">Our process merges data science with creative content strategy to build an unshakeable digital foundation.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px;">
                    <!-- Step 1 -->
                    <div style="text-align: left;">
                        <div style="font-size: 60px; font-weight: 800; opacity: 0.1; line-height: 1; margin-bottom: -20px; color: white;">01</div>
                        <h3 style="font-size: 24px; font-weight: 700; color: #38bdf8; margin-bottom: 15px;">Smart Audit</h3>
                        <p style="color: #94a3b8; line-height: 1.7;">Deep dive analysis into competitors, keywords gaps, and technical health using enterprise tools.</p>
                    </div>

                    <!-- Step 2 -->
                    <div style="text-align: left;">
                        <div style="font-size: 60px; font-weight: 800; opacity: 0.1; line-height: 1; margin-bottom: -20px; color: white;">02</div>
                        <h3 style="font-size: 24px; font-weight: 700; color: #c084fc; margin-bottom: 15px;">Strategic Blueprint</h3>
                        <p style="color: #94a3b8; line-height: 1.7;">Defining topic clusters, internal linking structures, and authority-building campaigns.</p>
                    </div>

                    <!-- Step 3 -->
                    <div style="text-align: left;">
                        <div style="font-size: 60px; font-weight: 800; opacity: 0.1; line-height: 1; margin-bottom: -20px; color: white;">03</div>
                        <h3 style="font-size: 24px; font-weight: 700; color: #4ade80; margin-bottom: 15px;">Execution & Scale</h3>
                        <p style="color: #94a3b8; line-height: 1.7;">Content production, link acquisition, and real-time rank tracking to adapt and scale.</p>
                    </div>
                </div>

                <div style="margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <h3 style="font-size: 24px; margin-bottom: 20px;">Ready to dominate the SERPs?</h3>
                    <a href="/contact" style="display: inline-block; padding: 16px 40px; background: white; color: var(--secondary); text-decoration: none; font-weight: 700; border-radius: 50px; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(255,255,255,0.2);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 30px rgba(255,255,255,0.3)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 20px rgba(255,255,255,0.2)'">
                        Launch Campaign
                    </a>
                </div>
            </div>
        `,
        processSteps: [],
        portfolioItems: [],
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>'
    },
    'social-media-marketing': {
        title: 'Social<br />Media Marketing Company In Sangli',
        category: 'Social Media',
        description: `
            <div style="text-align: center; max-width: 900px; margin: 0 auto;">
                <p style="font-size: 16px; color: inherit; line-height: 1.8;">
                    In today's fast-moving digital world, a strong social media presence is crucial for business success. Sangli, with its thriving industries and startups, has seen an increasing need for social media marketing services.
                </p>
                <p style="font-size: 16px; color: inherit; line-height: 1.8; margin-top: 20px;">
                    If you're looking for a trustworthy <strong style="color: inherit; font-weight: 800;">social media marketing company in Pune</strong>, AASHA-SM TECHNOLOGIES is your best choice.
                </p>
            </div>
        `,
        specialties: '', // Rendered via component
        workDescription: '', // Removed "The Methodology" as per user request

        processSteps: [],
        portfolioItems: [],
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'
    },
    // SEO Services
    'local-seo': {
        title: 'Local SEO',
        category: 'Search Engine Optimization',
        description: '<p>Dominate your local market. We optimize your online presence to attract more business from relevant local searches.</p>',
        specialties: '<p>Google My Business Optimization, Local Citation Building, and Geo-Targeted Content.</p>',
        processSteps: [
            { title: 'Audit', description: 'Analyze current local presence (NAP, Listings).', icon: '' },
            { title: 'Optimization', description: 'Update GMB, build citations, and optimize on-page signals.', icon: '' },
            { title: 'Growth', description: 'Monitor rankings and manage reviews for sustained growth.', icon: '' }
        ]
    },
    'international-seo': {
        title: 'International SEO',
        category: 'Search Engine Optimization',
        description: '<p>Expand your reach globally. We help you target international markets with multilingual and multi-regional SEO strategies.</p>',
        specialties: '<p>Hreflang implementation, International Keyword Research, and Technical Structure Optimization.</p>',
        processSteps: []
    },
    'generative-engine-optimizationgeo': {
        title: 'Generative Engine Optimization (GEO)',
        category: 'Search Engine Optimization',
        description: '<p>Future-proof your SEO. Optimize for AI-driven search engines like SearchGPT and Google SGE.</p>',
        specialties: '<p>Entity-based optimization, Conversational keywords, and Structured Data.</p>',
        processSteps: []
    },
    'country-wise-seo': {
        title: 'Country Wise SEO',
        category: 'Search Engine Optimization',
        description: '<p>Target specific countries with tailored SEO strategies that respect local language, culture, and search behaviors.</p>',
        specialties: '<p>ccTLD strategy, Localized content, and Country-specific backlinks.</p>',
        processSteps: []
    },
    'state-wise-seo': {
        title: 'State Wise SEO',
        category: 'Search Engine Optimization',
        description: '<p>Dominate specific states or regions within a country. Perfect for businesses with regional operations.</p>',
        specialties: '<p>Regional landing pages, State-specific keyword targeting.</p>',
        processSteps: []
    },
    'city-wise-seo': {
        title: 'City Wise SEO',
        category: 'Search Engine Optimization',
        description: '<p>Granular targeting for cities. Ideal for multi-location businesses wanting to rank high in specific metropolitan areas.</p>',
        specialties: '<p>Hyper-local content, City-specific landing pages.</p>',
        processSteps: []
    },
    'e-commerce-seo': {
        title: 'E-Commerce SEO',
        category: 'Search Engine Optimization',
        description: '<p>Drive more sales. We optimize your online store to rank higher for product searches and convert visitors into buyers.</p>',
        specialties: '<p>Product page optimization, Site architecture, and Schema markup for products.</p>',
        processSteps: []
    },
    // Social Media Services
    'facebook-marketing': {
        title: 'Facebook Marketing',
        category: 'Social Media Marketing',
        description: '<p>Leverage the world\'s largest social platform. targeted ads and engaging content to grow your brand.</p>',
        specialties: '<p>Ad Campaign Management, Audience Targeting, and Community Engagement.</p>',
        processSteps: []
    },
    'instagram-marketing': {
        title: 'Instagram Marketing',
        category: 'Social Media Marketing',
        description: '<p>Build a visual brand. We create stunning visuals and reels to capture your audience on Instagram.</p>',
        specialties: '<p>Reel creation, Influencer collaborations, and Story strategies.</p>',
        processSteps: []
    },
    'linkedin-marketing': {
        title: 'LinkedIn Marketing',
        category: 'Social Media Marketing',
        description: '<p>The premier platform for B2B. Connect with decision-makers and professionals to generate high-quality leads.</p>',
        specialties: '<p>B2B Lead Generation, Thought Leadership, and Sponsored Content.</p>',
        processSteps: []
    },
    'ppc-marketing': {
        title: 'PPC Marketing',
        category: 'Social Media Marketing',
        description: '<p>Immediate results with Pay-Per-Click. We manage your ad spend to maximize ROI across platforms.</p>',
        specialties: '<p>Google Ads, Social Ads, and Conversion Tracking.</p>',
        processSteps: []
    },
    'lead-generation': {
        title: 'Lead Generation',
        category: 'Social Media Marketing',
        description: '<p>Fill your sales funnel. We use targeted strategies to identify and attract potential customers for your business.</p>',
        specialties: '<p>Landing page optimization, Lead magnets, and Funnel building.</p>',
        processSteps: []
    },
    'email-marketing': {
        title: 'Email Marketing',
        category: 'Social Media Marketing',
        description: '<p>Nurture your leads. Automated email campaigns that keep your audience engaged and drive repeat business.</p>',
        specialties: '<p>Newsletter campaigns, Drip sequences, and List segmentation.</p>',
        processSteps: []
    }
};

const MarketingDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    const isSMM = slug === 'social-media-marketing';
    const heroGradient = isSMM
        ? 'linear-gradient(135deg, #dcfce7 0%, #fce7f3 50%, #e0e7ff 100%)' // Pastel Green/Pink/Lavender
        : 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)'; // Default Marketing Pink/Purple

    const heroTextColor = isSMM ? 'var(--secondary)' : 'white';
    const heroDescColor = isSMM ? '#475569' : 'rgba(255,255,255,0.95)';
    const backButtonBg = isSMM ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.2)';
    const backButtonBorder = isSMM ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)';
    const backButtonText = isSMM ? '#334155' : 'white';
    const badgeBg = isSMM ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.2)';
    const badgeText = isSMM ? '#334155' : 'white';

    useEffect(() => {
        // Simulate loading for smooth UX
        setLoading(true);
        setTimeout(() => {
            const data = marketingData[slug];
            if (data) {
                setService(data);
            } else {
                // Fallback or Not Found logic
                console.log("Service not found in static data");
                // Optional: navigate('/marketing');
            }
            setLoading(false);
        }, 500);
    }, [slug]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <Loader />
            </div>
        );
    }

    if (!service) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px'
            }}>
                <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px' }}>
                    Service Not Found
                </h2>
                <button
                    onClick={() => navigate('/marketing')}
                    style={{
                        padding: '12px 30px',
                        background: gradient,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Back to Marketing
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', overflowX: 'hidden', width: '100%' }}>
            {/* Hero Section - Service Type, Title, Description */}
            <div style={{
                padding: '80px 5% 60px 5%',
                background: heroGradient,
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <button
                        onClick={() => navigate('/marketing')}
                        style={{
                            padding: '10px 20px',
                            background: backButtonBg,
                            color: backButtonText,
                            border: `1px solid ${backButtonBorder}`,
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = isSMM ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)'}
                        onMouseOut={(e) => e.target.style.background = backButtonBg}
                    >
                        ← Back to Marketing
                    </button>

                    {/* Service Type Badge */}
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 18px',
                        background: badgeBg,
                        color: badgeText,
                        borderRadius: '25px',
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '20px',
                        marginLeft: '16px',
                        border: `1px solid ${backButtonBorder}`
                    }}>
                        {service.category || 'Marketing Service'}
                    </div>

                    {/* Title */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        {service.icon && (
                            <div
                                style={{ width: '60px', height: '60px', color: heroTextColor }}
                                dangerouslySetInnerHTML={{ __html: service.icon }}
                            />
                        )}
                        <h1
                            style={{
                                fontSize: '56px',
                                fontWeight: '800',
                                color: heroTextColor,
                                lineHeight: '1.2',
                                textAlign: 'center'
                            }}
                            dangerouslySetInnerHTML={{ __html: service.title }}
                        />
                    </div>

                    {/* Description */}
                    {/* Description */}
                    <div
                        className="rich-text-content"
                        style={{
                            fontSize: '20px',
                            color: heroDescColor,
                            lineHeight: '1.8',
                            maxWidth: '900px',
                            margin: '0 auto',
                            textAlign: 'center'
                        }}
                        dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                </div>
            </div>

            {/* Conditional SEO/SMM Why Choose Section */}
            {slug === 'seo-optimization' && <SEOWhyChooseSection />}
            {slug === 'social-media-marketing' && (
                <>
                    <SMMNeedSection />
                    <SMMBenefitsSection />
                    <SMMSelectionSection />
                    <SMMSelectionSection />
                    <SMMBestServicesSection />
                    <SMMStatsSection />
                </>
            )}

            {/* Specialties Section / SEO Services */}
            {slug === 'seo-optimization' ? (
                <SEOServicesSection />
            ) : slug === 'social-media-marketing' ? (
                null // Removed SMMServicesSection as per user request
            ) : (
                service.specialties && (
                    <div style={{ padding: '80px 5%', background: 'white' }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            <h2 style={{
                                fontSize: '42px',
                                fontWeight: '800',
                                marginBottom: '40px',
                                color: '#1a1a1a',
                                textAlign: 'center'
                            }}>
                                Key Features & Benefits
                            </h2>
                            <div
                                className="rich-text-content"
                                style={{
                                    fontSize: '18px',
                                    color: '#4b5563',
                                    lineHeight: '1.8',
                                    maxWidth: '900px',
                                    margin: '0 auto'
                                }}
                                dangerouslySetInnerHTML={{ __html: service.specialties }}
                            />
                        </div>
                    </div>
                )
            )}

            {/* Conditional SEO Benefits Section */}
            {slug === 'seo-optimization' && <SEOBenefitsSection />}

            {/* Work Description Section */}
            {service.workDescription && slug !== 'seo-optimization' && (
                <div style={{ padding: '80px 5%', background: '#f9fafb' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            marginBottom: '40px',
                            color: '#1a1a1a',
                            textAlign: 'center'
                        }}>
                            How We Do It
                        </h2>
                        <div
                            className="rich-text-content"
                            style={{
                                fontSize: '18px',
                                color: '#4b5563',
                                lineHeight: '1.8',
                                maxWidth: '900px',
                                margin: '0 auto'
                            }}
                            dangerouslySetInnerHTML={{ __html: service.workDescription }}
                        />
                    </div>
                </div>
            )}

            {/* Process Steps (Stepped Layout) */}
            {service.processSteps && service.processSteps.length > 0 && (
                <div style={{ padding: '80px 5%', background: '#fff' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ position: 'relative' }}>
                            {service.processSteps.map((step, index) => {
                                // Calculate alignment: Left, Center, Right
                                const alignment = index % 3 === 0 ? 'flex-start'
                                    : index % 3 === 1 ? 'center'
                                        : 'flex-end';

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: alignment,
                                            marginBottom: index === service.processSteps.length - 1 ? '0' : '-40px', // Overlap slightly for flow
                                            position: 'relative',
                                            zIndex: 1
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: '400px',
                                            position: 'relative',
                                            padding: '20px'
                                        }}>
                                            {/* Icon and Number Row */}
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px' }}>
                                                {/* Icon Bubble */}
                                                <div style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    background: '#e0f2fe', // Light Blue
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                                    position: 'relative',
                                                    zIndex: 2
                                                }}>
                                                    {step.icon ? (
                                                        <div style={{ width: '40px', height: '40px', color: 'var(--primary)' }} dangerouslySetInnerHTML={{ __html: step.icon }} />
                                                    ) : (
                                                        <span style={{ fontSize: '30px' }}>📄</span>
                                                    )}
                                                </div>

                                                {/* Outline Number */}
                                                <div style={{
                                                    fontSize: '60px',
                                                    fontWeight: '800',
                                                    color: 'transparent',
                                                    WebkitTextStroke: '2px #cbd5e1', // Outline effect
                                                    fontFamily: "'Merriweather', serif"
                                                }}>
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>

                                                {/* Dashed Connector Line (Horizontal) */}
                                                <div style={{
                                                    flex: 1,
                                                    height: '2px',
                                                    borderTop: '2px dashed #cbd5e1',
                                                    marginTop: '10px',
                                                    minWidth: '50px',
                                                    display: index % 3 === 2 ? 'none' : 'block' // Hide on rightmost item to avoid overflow
                                                }}></div>
                                            </div>

                                            {/* Text Content */}
                                            <div>
                                                <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>
                                                    {step.title}
                                                </h3>
                                                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {service.portfolioItems && service.portfolioItems.length > 0 && (
                <div style={{ padding: '60px 5%', background: 'white' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            marginBottom: '30px',
                            color: '#1a1a1a',
                            textAlign: 'center'
                        }}>
                            Success Stories
                        </h2>

                        {/* Main Image/Video Display */}
                        <div style={{
                            marginBottom: '20px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            background: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {service.portfolioItems[selectedImage].type === 'image' ? (
                                <img
                                    src={service.portfolioItems[selectedImage].url}
                                    alt={`${service.title.replace(/<[^>]+>/g, '')} - Portfolio ${selectedImage + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        display: 'block'
                                    }}
                                />
                            ) : (
                                <video
                                    key={selectedImage}
                                    src={service.portfolioItems[selectedImage].url}
                                    controls
                                    autoPlay
                                    muted
                                    onEnded={() => {
                                        // Auto-play next item when video ends
                                        if (selectedImage < service.portfolioItems.length - 1) {
                                            setSelectedImage(selectedImage + 1);
                                        } else {
                                            // Loop back to first item
                                            setSelectedImage(0);
                                        }
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        display: 'block'
                                    }}
                                />
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {service.portfolioItems.length > 1 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '12px'
                            }}>
                                {service.portfolioItems.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        style={{
                                            position: 'relative',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === index
                                                ? '3px solid var(--primary)'
                                                : '3px solid transparent',
                                            transition: 'all 0.3s ease',
                                            aspectRatio: '1/1',
                                            background: 'white'
                                        }}
                                        onMouseOver={(e) => {
                                            if (selectedImage !== index) {
                                                e.currentTarget.style.border = '3px solid #e5e7eb';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedImage !== index) {
                                                e.currentTarget.style.border = '3px solid transparent';
                                            }
                                        }}
                                    >
                                        {item.type === 'image' ? (
                                            <img
                                                src={item.url}
                                                alt={`Thumbnail ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <video
                                                    src={item.url}
                                                    muted
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                {/* Play Icon Overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '40px',
                                                    height: '40px',
                                                    background: 'rgba(0,0,0,0.6)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '20px',
                                                    pointerEvents: 'none'
                                                }}>
                                                    ▶
                                                </div>
                                            </>
                                        )}
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '10px',
                                            fontWeight: '600'
                                        }}>
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Conditional SEO Stats Cards */}
            {slug === 'seo-optimization' && <SEOStatsCards />}

            {/* Conditional SEO FAQ Section */}
            {slug === 'seo-optimization' && <SEOFAQSection />}

            {/* CTA Section */}
            <div style={{
                padding: '80px 5%',
                background: heroGradient,
                textAlign: 'center'
            }}>
                <h2
                    style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        color: isSMM ? 'var(--secondary)' : 'white',
                        marginBottom: '20px'
                    }}
                    dangerouslySetInnerHTML={{ __html: `Ready to Grow with ${service.title.replace('<br />', ' ')}?` }}
                />
                <p style={{
                    fontSize: '18px',
                    color: isSMM ? '#475569' : 'rgba(255,255,255,0.9)',
                    marginBottom: '30px',
                    maxWidth: '600px',
                    margin: '0 auto 30px auto'
                }}>
                    Let's create a strategy that drives results for your business.
                </p>
                <button
                    onClick={() => navigate('/contact')}
                    style={{
                        padding: '16px 40px',
                        background: 'white',
                        color: 'var(--primary)',
                        border: 'none',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                    }}
                >
                    Get Started Now
                </button>
                <style>
                    {`
                    h1, h2, h3, h4, h5, h6 {
                        font-family: 'Merriweather', serif !important;
                    }
                    p, span, div, li, a {
                        font-family: 'Merriweather', serif;
                    }
                    .rich-text-content {
                        font-family: 'Merriweather', serif !important;
                    }
                    .rich-text-content h1, 
                    .rich-text-content h2, 
                    .rich-text-content h3, 
                    .rich-text-content h4 {
                        font-family: 'Merriweather', serif !important;
                    }
                `}
                </style>
            </div>
        </div>
    );
};

export default MarketingDetail;
