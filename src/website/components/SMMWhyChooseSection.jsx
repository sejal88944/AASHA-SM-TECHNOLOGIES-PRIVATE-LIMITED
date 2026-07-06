import React from 'react';

const SMMWhyChooseSection = () => {
    return (
        <div style={{ padding: '80px 5%', background: '#F9FAFB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: '#333',
                    marginBottom: '30px'
                }}>
                    Why Choose AASHA-SM TECHNOLOGIES for Social Media Marketing?
                </h2>

                <p style={{
                    fontSize: '18px',
                    color: '#64748b',
                    marginBottom: '50px',
                    maxWidth: '800px',
                    margin: '0 auto 50px auto',
                    lineHeight: '1.6'
                }}>
                    We specialize in creating effective <strong style={{ color: '#334155' }}>social media marketing solutions</strong> designed specifically for your business growth.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Item 1 */}
                    <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '15px' }}>
                            1. Proven Expertise
                        </h3>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
                            Our skilled team develops <strong style={{ color: '#334155' }}>innovative strategies</strong> that foster growth and engagement across all platforms.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '15px' }}>
                            2. Customized Solutions
                        </h3>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
                            We design campaigns that align with your <strong style={{ color: '#334155' }}>unique business objectives</strong> and target audience.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--secondary)', marginBottom: '15px' }}>
                            3. Comprehensive Services
                        </h3>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
                            From <strong style={{ color: '#334155' }}>strategy development to performance analysis</strong>, we handle every aspect of your social media marketing.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SMMWhyChooseSection;
