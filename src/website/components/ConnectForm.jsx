import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';
import './ConnectForm.css';

const ConnectForm = ({ simple = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            // 1. Save to Firebase
            await addDoc(collection(db, "inquiries"), {
                ...formData,
                type: 'connect_form',
                createdAt: new Date().toISOString()
            });

            // 2. Send Email via FormSubmit AJAX
            const emailData = new FormData();
            emailData.append("Name", formData.name);
            emailData.append("Email", formData.email);
            emailData.append("Phone", formData.phone);
            emailData.append("Message", formData.message);
            emailData.append("_template", "table");
            emailData.append("_subject", "New Message from Connect Form");

            await fetch("https://formsubmit.co/ajax/adminsmtechsolution@gmail.com", {
                method: "POST",
                body: emailData
            });

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setStatus(null), 5000); // Clear success message after 5s
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const FormFields = () => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                    <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 48px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            outline: 'none',
                            fontSize: '15px',
                            transition: 'all 0.2s',
                            color: '#334155',
                            background: '#f8fafc'
                        }}
                        onFocus={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.background = '#f8fafc';
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                    <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 48px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            outline: 'none',
                            fontSize: '15px',
                            transition: 'all 0.2s',
                            color: '#334155',
                            background: '#f8fafc'
                        }}
                        onFocus={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.background = '#f8fafc';
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                    <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 0000 0000 00"
                        required
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 48px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            outline: 'none',
                            fontSize: '15px',
                            transition: 'all 0.2s',
                            color: '#334155',
                            background: '#f8fafc'
                        }}
                        onFocus={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.background = '#f8fafc';
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Your Message</label>
                <div style={{ position: 'relative' }}>
                    <MessageSquare size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        required
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 48px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            outline: 'none',
                            fontSize: '15px',
                            transition: 'all 0.2s',
                            color: '#334155',
                            background: '#f8fafc',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.background = '#f8fafc';
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    opacity: loading ? 0.7 : 1
                }}
                onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
                {loading ? 'Sending...' : (
                    <>
                        Send Message <Send size={18} />
                    </>
                )}
            </button>

            {status === 'success' && (
                <div style={{ padding: '12px', background: '#dcfce7', color: '#166534', borderRadius: '8px', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
                    Message sent successfully! We'll get back to you soon.
                </div>
            )}
            {status === 'error' && (
                <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
                    Something went wrong. Please try again later.
                </div>
            )}
        </form>
    );

    if (simple) {
        return <FormFields />;
    }

    return (
        <section style={{
            padding: '80px 5%',
            background: '#f9fafb',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div className="connect-container">
                {/* Text Content */}
                <div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: '#6366f1',
                        borderRadius: '30px',
                        fontSize: '14px',
                        fontWeight: '700',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }}></span>
                        Connect With Us
                    </div>
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: '800',
                        color: 'var(--secondary)',
                        marginBottom: '24px',
                        lineHeight: '1.2'
                    }}>
                        Let's Built something great together.
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#64748b',
                        lineHeight: '1.8',
                        marginBottom: '40px'
                    }}>
                        We're here to help and answer any questions you might have. We look forward to hearing from you.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#334155', fontWeight: '500' }}>
                            <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <Mail size={20} color="#6366f1" />
                            </div>
                            adminsmtechsolution@gmail.com
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#334155', fontWeight: '500' }}>
                            <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <Phone size={20} color="#6366f1" />
                            </div>
                            +91 95299 98320
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '24px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #f1f5f9'
                }}>
                    <FormFields />
                </div>
            </div>
        </section>
    );
};

export default ConnectForm;
