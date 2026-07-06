import React, { useState } from 'react';

const SMMBestServicesSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            title: "SOCIAL MEDIA STRATEGY DEVELOPMENT",
            content: "We provide a range of high-value social media consultancy services through which we help you to achieve tangible results from their social media activities."
        },
        {
            id: 1,
            title: "SOCIAL MEDIA ADVERTISING MANAGEMENT",
            content: "Our social media advertising services are proven to accelerate growth. By advertising through social media, 100% of our clients have seen results."
        },
        {
            id: 2,
            title: "SOCIAL MEDIA CONTENT CREATION",
            content: "We provide a range of social media writing and posting services to help you directly or indirectly market your offerings through online social media."
        }
    ];

    const tags = ["Social Media", "Marketing", "Advertisement", "Content Creation"];

    return (
        <div style={{ background: '#ffffff', padding: '100px 5%', color: 'var(--secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header Row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '40px',
                    marginBottom: '80px'
                }}>
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{
                            color: 'var(--primary)',
                            fontWeight: '700',
                            marginBottom: '16px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            OUR SERVICES
                        </div>
                        <h2 style={{
                            fontSize: '48px',
                            fontWeight: '800',
                            lineHeight: '1.2',
                            margin: 0,
                            letterSpacing: '-1px',
                            color: 'var(--secondary)'
                        }}>
                            Our best services for social media marketing
                        </h2>
                    </div>

                    {/* Tags */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                        maxWidth: '400px',
                        justifyContent: 'flex-end',
                        alignContent: 'flex-start'
                    }}>
                        {tags.map((tag, index) => (
                            <div key={index} style={{
                                padding: '8px 20px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '30px',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#64748b',
                                background: '#f8fafc',
                                transition: 'all 0.3s'
                            }}
                                onMouseOver={(e) => {
                                    e.target.style.borderColor = 'var(--primary)';
                                    e.target.style.color = 'var(--primary)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.borderColor = '#e2e8f0';
                                    e.target.style.color = '#64748b';
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabbed Content */}
                <div style={{
                    display: 'flex',
                    gap: '40px',
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
                    {/* Tabs List */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0',
                        background: '#fff',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                    }}>
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    textAlign: 'left',
                                    padding: '32px 40px',
                                    background: activeTab === tab.id
                                        ? 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)'
                                        : 'transparent',
                                    color: activeTab === tab.id ? 'white' : 'var(--secondary)',
                                    border: 'none',
                                    borderBottom: index !== tabs.length - 1 ? '1px solid #e2e8f0' : 'none',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    display: 'block',
                                    width: '100%',
                                    opacity: 1
                                }}
                                onMouseOver={(e) => {
                                    if (activeTab !== tab.id) e.target.style.background = '#f8fafc';
                                }}
                                onMouseOut={(e) => {
                                    if (activeTab !== tab.id) e.target.style.background = 'transparent';
                                }}
                            >
                                <span style={{ display: 'block', maxWidth: '90%', lineHeight: '1.4' }}>
                                    {tab.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div style={{
                        flex: 1.5,
                        background: '#f8fafc',
                        borderRadius: '24px',
                        padding: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: '340px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            color: 'var(--primary)',
                            fontWeight: '800',
                            fontSize: '20px',
                            marginBottom: '20px',
                            textTransform: 'uppercase'
                        }}>
                            What we deliver :
                        </div>
                        <p style={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            color: '#475569',
                            margin: 0,
                            maxWidth: '540px',
                            fontWeight: '500'
                        }}>
                            {tabs[activeTab].content}
                        </p>
                    </div>
                </div>
            </div>

            {/* Responsive Styles Injection */}
            <style>
                {`
                    @media (max-width: 900px) {
                        div[style*="flex-direction: row"] {
                            flex-direction: column !important;
                        }
                        div[style*="justify-content: flex-end"] {
                            justify-content: flex-start !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default SMMBestServicesSection;
