import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { name: 'Sarah Johnson', role: 'CEO, TechFlow', text: "AASHA-SM TECHNOLOGIES transformed our online presence. Their attention to detail and creative approach is unmatched." },
        { name: 'Michael Chen', role: 'Founder, StartUp Inc', text: "The developed application exceeded our expectations. Professional, timely, and innovative." },
        { name: 'Emily Davis', role: 'Marketing Director', text: "A fantastic partner for our digital marketing needs. We've seen significant growth since working with them." },
    ];

    return (
        <section style={{ padding: '100px 5%', background: '#ffffff' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Testimonials</span>
                <h2 style={{ fontSize: '36px', margin: '10px 0 0', fontWeight: '800', color: '#111827' }}>What Our Clients Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {testimonials.map((t, i) => (
                    <div key={i} style={{ padding: '40px', background: '#f9fafb', borderRadius: '24px', position: 'relative' }}>
                        <div style={{ fontSize: '40px', color: 'var(--primary)', opacity: 0.2, position: 'absolute', top: '20px', left: '20px', fontFamily: "'Merriweather', serif" }}>"</div>
                        <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.7', marginBottom: '20px', position: 'relative', zIndex: 1 }}>{t.text}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '50px', height: '50px', background: '#e5e7eb', borderRadius: '50%' }}></div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: '#111827' }}>{t.name}</div>
                                <div style={{ fontSize: '14px', color: '#6b7280' }}>{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
