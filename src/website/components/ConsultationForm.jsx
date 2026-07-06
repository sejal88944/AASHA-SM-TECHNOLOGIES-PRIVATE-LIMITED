import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';

const ConsultationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            // 1. Save to Firebase
            await addDoc(collection(db, "inquiries"), {
                ...formData,
                type: 'consultation_form',
                createdAt: new Date().toISOString()
            });

            // 2. Send Email via FormSubmit AJAX
            const emailData = new FormData();
            emailData.append("Name", formData.name);
            emailData.append("Phone", formData.phone);
            emailData.append("Email", formData.email);
            emailData.append("Company", formData.company);
            emailData.append("Service Looking For", formData.service);
            emailData.append("Message", formData.message);
            emailData.append("_template", "table");
            emailData.append("_subject", "New Consultation Request");

            await fetch("https://formsubmit.co/ajax/adminsmtechsolution@gmail.com", {
                method: "POST",
                body: emailData
            });

            setStatus('success');
            setFormData({ name: '', phone: '', email: '', company: '', service: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'white',
            padding: '30px', // Reduced padding
            borderRadius: '20px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f1f5f9',
            fontFamily: "'Merriweather', serif"
        }}>
            <div style={{ marginBottom: '20px' }}> {/* Reduced margin */}
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>WE ARE HERE FOR YOU!</span>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--secondary)', marginTop: '6px' }}>Get A Free Consultation</h3> {/* Reduced font size */}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}> {/* Reduced gap */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        padding: '10px 14px', // Reduced input padding
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px', // Slightly smaller radius
                        background: '#fff',
                        color: '#334155',
                        outline: 'none',
                        fontSize: '14px' // Slightly smaller font
                    }}
                />

                <div style={{ display: 'flex', gap: '14px' }}> {/* Reduced gap */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone no"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                            flex: 1,
                            padding: '10px 14px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            background: '#fff',
                            color: '#334155',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            flex: 1,
                            padding: '10px 14px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            background: '#fff',
                            color: '#334155',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: '#fff',
                        color: '#334155',
                        outline: 'none',
                        fontSize: '14px'
                    }}
                />

                <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: '#fff',
                        color: formData.service ? '#334155' : '#94a3b8',
                        outline: 'none',
                        fontSize: '14px',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        backgroundSize: '16px'
                    }}
                >
                    <option value="" disabled>Services Looking For?</option>
                    <option value="Custom Website Development">Custom Website Development</option>
                    <option value="Software Development (CRM, HRM, ERP)">Software Development (CRM, HRM, ERP)</option>
                    <option value="Mobile Application Development">Mobile Application Development</option>
                    <option value="WhatsApp API & Chatbot Automation">WhatsApp API & Chatbot Automation</option>
                    <option value="AI & Smart Automation Solutions">AI & Smart Automation Solutions</option>
                    <option value="Payment Gateway Integration">Payment Gateway Integration</option>
                    <option value="Cloud & Infrastructure Services">Cloud & Infrastructure Services</option>
                    <option value="Other">Other</option>
                </select>

                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3" // Reduced rows
                    style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: '#fff',
                        color: '#334155',
                        outline: 'none',
                        fontSize: '14px',
                        resize: 'none',
                        fontFamily: 'inherit'
                    }}
                ></textarea>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '12px', // Reduced padding
                        background: 'var(--secondary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        fontSize: '15px', // Reduced font size
                        fontWeight: '700',
                        cursor: loading ? 'wait' : 'pointer',
                        transition: 'all 0.3s ease',
                        marginTop: '5px' // Reduced margin
                    }}
                    onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

                {status === 'success' && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>Message sent successfully!</p>}
                {status === 'error' && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>Something went wrong. Try again.</p>}
            </form>
        </div>
    );
};

export default ConsultationForm;
