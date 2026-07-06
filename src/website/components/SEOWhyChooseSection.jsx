import React from 'react';

const SEOWhyChooseSection = () => {
    return (
        <div style={{ padding: '80px 5%', background: '#F9FAFB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: '#333',
                    marginBottom: '30px'
                }}>
                    Why Choose AASHA-SM TECHNOLOGIES as your Digital Agency?
                </h2>

                <p style={{
                    fontSize: '18px',
                    color: '#64748b',
                    marginBottom: '50px',
                    maxWidth: '800px',
                    margin: '0 auto 50px auto',
                    lineHeight: '1.6'
                }}>
                    As a <strong style={{ color: '#334155' }}>leading SEO agency</strong>, we provide <strong style={{ color: '#334155' }}>results-driven SEO services</strong> tailored to your business goals.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Item 1 */}
                    <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '15px' }}>
                            1. Proven SEO Expertise Across Industries
                        </h3>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
                            Our team has successfully executed <strong style={{ color: '#334155' }}>SEO campaigns for real estate, healthcare, education, manufacturing, B2B, startups and etc.</strong>
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '15px' }}>
                            2. Custom SEO Strategies for Maximum ROI
                        </h3>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
                            We create <strong style={{ color: '#334155' }}>personalized SEO plans</strong> based on your industry, competition, and target audience for long-term growth.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '15px' }}>
                            3. Transparent Performance Tracking
                        </h3>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
                            Get <strong style={{ color: '#334155' }}>detailed SEO reports</strong> with key metrics like rankings, traffic, and conversions—no hidden surprises.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SEOWhyChooseSection;
