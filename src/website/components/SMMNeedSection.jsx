import React from 'react';

const SMMNeedSection = () => {
    // Gradient for the cards matching the reference image (purple to pink)
    const cardGradient = 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)';

    const cards = [
        "Social media advertising: Facebook, Instagram, Twitter.",
        "Social media analytics: Tracking engagement.",
        "Ads analysis: Target audience.",
        "Targeting: Demographics, interests.",
        "Understanding consumers: Marketing campaigns.",
        "Beyond ads: Building relationships."
    ];

    return (
        <div style={{ padding: '80px 5%', background: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Title */}
                <h2 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    textAlign: 'center',
                    marginBottom: '40px',
                    color: '#1a1a1a',
                    lineHeight: '1.2'
                }}>
                    Why Businesses in Sangli<br />Need Social Media Marketing
                </h2>

                {/* Text List */}
                <div style={{
                    textAlign: 'center',
                    maxWidth: '1000px',
                    margin: '0 auto 60px auto'
                }}>
                    <p style={{ marginBottom: '15px', fontSize: '18px', color: '#4b5563' }}>
                        <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Social media marketing</strong> is essential for businesses looking to grow and succeed in today’s competitive market.
                    </p>
                    <p style={{ marginBottom: '15px', fontSize: '18px', color: '#4b5563' }}>
                        <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Enhancing Digital Presence:</strong> Platforms like Instagram and Facebook are crucial for increasing brand visibility.
                    </p>
                    <p style={{ marginBottom: '15px', fontSize: '18px', color: '#4b5563' }}>
                        <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Boosting Brand Awareness:</strong> Strategic marketing efforts help raise recognition among potential customers.
                    </p>
                    <p style={{ marginBottom: '15px', fontSize: '18px', color: '#4b5563' }}>
                        <strong style={{ color: '#1a1a1a', fontWeight: '700' }}>Engaging Directly with Customers:</strong> Social media enables brands to connect directly with their target audience.
                    </p>
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px'
                }}>
                    {cards.map((text, index) => (
                        <div
                            key={index}
                            style={{
                                background: cardGradient,
                                padding: '30px',
                                borderRadius: '16px',
                                color: 'white',
                                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)', // Purple shadow
                                minHeight: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontSize: '20px',
                                fontWeight: '700',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.2)';
                            }}
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SMMNeedSection;
