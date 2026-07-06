import React from 'react';
import { Check } from 'lucide-react';

const SEOServicesSection = () => {
    return (
        <div style={{ padding: '20px 5% 80px 5%', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: '#333',
                    marginBottom: '50px'
                }}>
                    Comprehensive SEO Services in Sangli
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px'
                }}>

                    {/* On-Page SEO */}
                    <div style={{
                        background: '#f8fafc',
                        padding: '40px 30px',
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{
                                background: '#84cc16',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Check color="white" size={24} strokeWidth={3} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary)', margin: 0, textAlign: 'left' }}>
                                On-Page SEO
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            We optimize your website to rank higher and improve user experience.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['Keyword-optimized content', 'Meta title & description', 'Mobile-friendly setup'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '16px', color: '#334155', textAlign: 'left' }}>
                                    <Check size={18} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Off-Page SEO */}
                    <div style={{
                        background: '#f8fafc',
                        padding: '40px 30px',
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{
                                background: '#84cc16',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Check color="white" size={24} strokeWidth={3} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary)', margin: 0, textAlign: 'left' }}>
                                Off-Page SEO
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            We enhance your online authority with external strategies.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['High-quality backlinks', 'Industry guest posting', 'Directory submissions'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '16px', color: '#334155', textAlign: 'left' }}>
                                    <Check size={18} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical SEO */}
                    <div style={{
                        background: '#f8fafc',
                        padding: '40px 30px',
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'default'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{
                                background: '#84cc16',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Check color="white" size={24} strokeWidth={3} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary)', margin: 0, textAlign: 'left' }}>
                                Technical SEO
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            We improve website performance audits and fixes.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['Speed optimization', 'Crawl error resolution', 'Schema markup'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '16px', color: '#334155', textAlign: 'left' }}>
                                    <Check size={18} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SEOServicesSection;
