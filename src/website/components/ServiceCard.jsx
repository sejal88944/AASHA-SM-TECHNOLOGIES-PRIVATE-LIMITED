import React from 'react';

const ServiceCard = ({ title, icon, description }) => {
    return (
        <div style={{
            padding: '40px',
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid #f3f4f6',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                color: 'var(--primary)',
                marginBottom: '24px',
                padding: '16px',
                background: 'var(--light-bg)',
                borderRadius: '16px',
                width: 'fit-content'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-color)' }}>{title}</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '16px' }}>{description}</p>
        </div>
    );
};

export default ServiceCard;
