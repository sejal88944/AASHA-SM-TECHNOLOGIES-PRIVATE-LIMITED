import React from 'react';
import { Check } from 'lucide-react';

const SMMServicesSection = () => {
    return (
        <div style={{ padding: '80px 5%', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    color: '#333',
                    marginBottom: '50px'
                }}>
                    Key Services by Our SMM Agency
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px'
                }}>

                    {/* Social Media Strategy */}
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
                                background: 'var(--accent)', // Violet
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
                                Strategy Development
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            Successful campaigns begin with strategic planning.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['Market Research', 'Detailed Content Calendars', 'Consistency Planning'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '16px', color: '#334155', textAlign: 'left' }}>
                                    <Check size={18} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Creation */}
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
                                background: 'var(--primary)', // Pink
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
                                Content Creation
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            We produce tailored content that connects with your audience.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['Eye-catching Graphics', 'Engaging Videos', 'Platform-specific Content'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '16px', color: '#334155', textAlign: 'left' }}>
                                    <Check size={18} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Paid Advertising */}
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
                                background: '#0ea5e9', // Sky Blue
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
                                Paid Campaigns
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            Reach the right audience with effective paid advertising.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['Meta Ads (Fb/Insta)', 'LinkedIn Ads', 'Twitter Ads'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '16px', color: '#334155', textAlign: 'left' }}>
                                    <Check size={18} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Community Management */}
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
                                background: '#f59e0b', // Amber
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
                                Community Mgmt
                            </h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px', lineHeight: '1.6' }}>
                            Fostering a strong brand community through interaction.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                            {['Responding to Comments', 'Managing Feedback', 'Audience Interaction'].map((item, i) => (
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

export default SMMServicesSection;
