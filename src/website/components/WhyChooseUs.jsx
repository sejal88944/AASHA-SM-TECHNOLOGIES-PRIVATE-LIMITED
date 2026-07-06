import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, Rocket, HeartHandshake, Lightbulb } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <Users size={28} />,
            title: 'Expert Development Team',
            description: 'Our team is specialized in high-performance website and custom software development.',
            accent: 'rgba(242, 101, 34, 0.1)'
        },
        {
            icon: <Target size={28} />,
            title: 'Custom Business Solutions',
            description: 'We build digital systems tailored specifically to your unique business requirements.',
            accent: 'rgba(26, 26, 26, 0.05)'
        },
        {
            icon: <Shield size={28} />,
            title: 'Scalable & Secure Systems',
            description: 'We use the latest technologies to ensure your software is both secure and scalable.',
            accent: 'rgba(242, 101, 34, 0.1)'
        },
        {
            icon: <Rocket size={28} />,
            title: 'Digital Transformation',
            description: 'We help businesses modernize operations with smart automation and future-ready systems.',
            accent: 'rgba(26, 26, 26, 0.05)'
        },
        {
            icon: <HeartHandshake size={28} />,
            title: 'Reliable Support',
            description: 'We provide ongoing maintenance and support to ensure your technology never stops working.',
            accent: 'rgba(242, 101, 34, 0.1)'
        },
        {
            icon: <Lightbulb size={28} />,
            title: 'Innovation First',
            description: 'We leverage cutting-edge AI and cloud technologies to keep you ahead of the competition.',
            accent: 'rgba(26, 26, 26, 0.05)'
        }
    ];

    return (
        <section className="premium-why">
            <div className="why-bg-accent"></div>
            <div className="container">
                <div className="why-header">
                    <motion.span 
                        className="section-tag"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        Value Proposition
                    </motion.span>
                    <motion.h2 
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Partner with <span className="text-orange">AASHA-SM TECHNOLOGIES?</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        We don't just build software; we build foundations for your long-term digital growth.
                    </motion.p>
                </div>
                
                <div className="why-grid">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            className="why-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ 
                                y: -10, 
                                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="why-icon-wrapper" style={{ backgroundColor: feature.accent }}>
                                {feature.icon}
                            </div>
                            <h3 className="why-card-title">{feature.title}</h3>
                            <p className="why-card-desc">{feature.description}</p>
                            <div className="card-border-glow"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
