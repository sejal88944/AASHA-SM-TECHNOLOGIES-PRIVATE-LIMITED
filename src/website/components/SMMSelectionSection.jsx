import React from 'react';

const SMMSelectionSection = () => {
    return (
        <div style={{ padding: '80px 5%', background: '#F9FAFB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>

                {/* Part 1: How to Select */}
                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        color: '#1a1a1a',
                        marginBottom: '40px',
                        lineHeight: '1.3'
                    }}>
                        How to Select the<br />Right Social Media Marketing Agency in Sangli ?
                    </h2>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6' }}>
                            <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Assess the Portfolio:</strong> Examine the agency’s past projects to understand their skills and expertise.
                        </p>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6' }}>
                            <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Consider Industry Experience:</strong> An agency with a solid background in your industry will be more attuned to market trends.
                        </p>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6' }}>
                            <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Prioritize Transparent Communication:</strong> Open and clear communication is essential for successful project execution.
                        </p>
                    </div>
                </div>

                {/* Part 2: Why Choose Us */}
                <div>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        color: '#1a1a1a',
                        marginBottom: '30px',
                        lineHeight: '1.3'
                    }}>
                        Why Choose AASHA-SM TECHNOLOGIES for<br />Social Media Marketing?
                    </h2>

                    <p style={{ fontSize: '18px', color: '#4b5563', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
                        At AASHA-SM TECHNOLOGIES, we specialize in creating effective <strong style={{ color: '#1a1a1a' }}>social media marketing solutions</strong> designed specifically for your business.
                    </p>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6' }}>
                            <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Proven Expertise:</strong> Our skilled team develops innovative strategies that foster growth.
                        </p>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6' }}>
                            <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Customized Solutions:</strong> We design campaigns that align with your unique business objectives.
                        </p>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6' }}>
                            <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Comprehensive Services:</strong> From strategy development to performance analysis, we handle every aspect of your social media marketing.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SMMSelectionSection;
