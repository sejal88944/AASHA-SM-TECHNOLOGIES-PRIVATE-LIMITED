import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicesSection.css';
import { FlipReveal, FlipRevealItem } from './gsap/FlipReveal';
import { TiltCard } from './gsap/TiltCard';

const ServicesSection = () => {
    const [filter, setFilter] = useState('all');

    const services = [
        {
            id: 1,
            title: 'Website Development',
            description: 'Enhance your online presence seamlessly with our all-in-one web design company. We offer comprehensive solutions including website...',
            icon: '/H-1.webp',
            slug: 'website-development',
            category: 'development'
        },
        {
            id: 2,
            title: 'Web Design',
            description: 'Web designing is an art! Your website design shows your business insight. A well known saying is "First impression is the lasting one"...',
            icon: '/H-2.webp',
            slug: 'web-design',
            category: 'design'
        },
        {
            id: 3,
            title: 'Search Engine Optimization',
            description: 'Secure top search rankings for preferred keywords, generating vital leads essential for business development. Optimize for targeted search terms...',
            icon: '/H-3.webp',
            slug: 'seo',
            category: 'marketing'
        },
        {
            id: 4,
            title: 'Custom Software Development',
            description: 'Tailoring applications to meet specific business needs is crucial in today\'s competitive landscape. Custom software development involves...',
            icon: '/H-4.webp',
            slug: 'custom-software',
            category: 'development'
        },
        {
            id: 5,
            title: 'Social Media Marketing',
            description: 'Our expert marketing teams enhance conversions, drive recurring traffic, and broaden online presence. Benefit from specialized...',
            icon: '/H-5.webp',
            slug: 'social-media-marketing',
            category: 'marketing'
        },
        {
            id: 6,
            title: 'Pay Per Click Marketing',
            description: 'PPC stands for pay-per-click, a model of internet marketing in which advertisers pay a fee each time one of their ads is clicked...',
            icon: '/H-6.webp',
            slug: 'ppc-marketing',
            category: 'marketing'
        }
    ];

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'development', label: 'Development' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'design', label: 'Design' }
    ];

    return (
        <section className="services-section">
            <div className="services-container">
                <div className="services-header">
                    <p className="services-badge">OUR SERVICES</p>
                    <h2 className="services-title">Our <span className="highlight-text">Best Services</span></h2>

                    {/* Toggle Group Filter */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px', flexWrap: 'wrap' }}>
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                style={{
                                    padding: '8px 24px',
                                    borderRadius: '50px',
                                    border: '1px solid #e2e8f0',
                                    background: filter === f.id ? '#3AB472' : 'transparent',
                                    color: filter === f.id ? '#fff' : '#64748b',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <FlipReveal
                    className="services-grid"
                    keys={[filter]}
                    showClass="service-card-visible" // Just a marker class if needed, or flex/block
                    hideClass="service-card-hidden" // Using custom hidden class if needed, or 'hidden'
                // For display:none, we can use inline styles or existing Classes.
                // FlipReveal component we made handles display none via hideClass
                >
                    {services.map((service) => (
                        <FlipRevealItem
                            key={service.id}
                            flipKey={service.category}
                            // Services can override hiding if we want, but FlipRevealItem handles visibility.
                            // We need to ensure the wrapper has the card styles or the inner div does.
                            // The original code had <div className="service-card">.
                            // FlipRevealItem wraps it. We should probably apply "service-card" to the ITEM?
                            // Or put the card INSIDE item.
                            // "service-grid" is a grid container. Children must be grid items.
                            // So FlipRevealItem must be the grid item.
                            className="service-card-wrapper" // Wrapper for flip
                            data-flip-id={`service-${service.id}`} // Add data-flip-id for GSAP Flip tracking
                        >
                            <TiltCard
                                key={service.id}
                                style={{
                                    borderRadius: '24px',
                                    background: 'white',
                                    border: '1px solid #f1f5f9',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                                highlightClassName="bg-white/20"
                            >
                                <div style={{ height: '240px', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                                    <img src={service.icon} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }}></div>
                                    <div style={{
                                        position: 'absolute', top: '20px', right: '20px',
                                        background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)',
                                        padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase'
                                    }}>
                                        {/* Use category or parse logic, here mostly fixed */}
                                        SERVICE
                                    </div>
                                </div>
                                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '16px', lineHeight: '1.3' }}>{service.title}</h3>
                                    <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{service.description}</p>
                                    <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Link to={`/services/${service.slug}`} style={{ fontWeight: '600', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </TiltCard>
                        </FlipRevealItem>
                    ))}
                </FlipReveal>
            </div>

            <style>{`
                .service-card-hidden {
                    display: none;
                }
                .service-card-visible {
                    display: flex; /* service-card uses flex */
                }
                /* Ensure grid works: FlipReveal has .services-grid class. */
                /* FlipRevealItem is the direct child of Grid. */
                /* If FlipRevealItem is visible, it takes space. */
                .flip-reveal-item {
                   /* By default it's a div. */
                   height: 100%;
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;
