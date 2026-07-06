import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';
import './FAQContactSection.css';

const FAQContactSection = () => {
    // FAQ State
    const [openIndex, setOpenIndex] = useState(0);

    // Form State
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

    const faqs = [
        {
            question: "What services does AASHA-SM TECHNOLOGIES PRIVATE LIMITED specialize in?",
            answer: "AASHA-SM TECHNOLOGIES PRIVATE LIMITED is a premium digital agency specializing in custom website development, scalable CRM/ERP systems, mobile applications, and advanced digital optimization including SEO, GEO, AEO, and SXO."
        },
        {
            question: "How does AASHA-SM TECHNOLOGIES optimize websites for AI search engines (GEO & AEO)?",
            answer: "We implement Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). By structuring content with schema markup, natural language patterns, and clear direct answers, we ensure your business ranks highly in AI search summaries like ChatGPT, Google Gemini, and Perplexity."
        },
        {
            question: "What is SXO and how does AASHA-SM TECHNOLOGIES apply it?",
            answer: "SXO (Search Experience Optimization) combines traditional SEO with user experience (UX) design. AASHA-SM TECHNOLOGIES builds fast, responsive, and highly interactive interfaces that satisfy both search engine algorithms and human visitors to maximize conversions."
        },
        {
            question: "Does AASHA-SM TECHNOLOGIES PRIVATE LIMITED provide customized software solutions?",
            answer: "Yes. We design and build fully customized software solutions including CRMs, HRMs, ERPs, and automated chatbots tailored to your specific workflows, all optimized for search accessibility."
        },
        {
            question: "How can we start our digital growth journey with AASHA-SM TECHNOLOGIES?",
            answer: "You can get started by submitting the contact form on this page or connecting with us via WhatsApp. Our team will perform an initial analysis and suggest the right custom strategy for your business."
        }
    ];

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
                createdAt: new Date().toISOString()
            });

            // 2. Send Email via FormSubmit AJAX
            const emailData = new FormData();
            emailData.append("Name", formData.name);
            emailData.append("Phone", formData.phone);
            emailData.append("Email", formData.email);
            emailData.append("Company", formData.company);
            emailData.append("Service Needed", formData.service);
            emailData.append("Message", formData.message);
            emailData.append("_template", "table");
            emailData.append("_subject", "New Inquiry from Website Home Page");

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

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="faq-contact-section">
            {/* Background decoration matching the reference (Blue curve bottom right) */}
            <div className="faq-contact-bg-decor"></div>

            <div className="faq-contact-container">

                {/* Left Column: FAQs */}
                <div className="faq-column">
                    <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--secondary)', marginBottom: '30px', lineHeight: '1.2' }}>
                        Frequently Asked <br /> <span className="highlight-text">Questions</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={{
                                background: '#fff', // White background for container
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                border: '1px solid #e2e8f0' // Light border
                            }}>
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: openIndex === index ? 'rgba(242, 101, 34, 0.05)' : 'none', // Active Light Orange (Faint)
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: 'var(--secondary)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {faq.question}
                                    {openIndex === index ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="#64748b" />}
                                </button>
                                <div style={{
                                    height: openIndex === index ? 'auto' : '0',
                                    padding: openIndex === index ? '0 20px 20px 20px' : '0 20px 0 20px',
                                    color: '#64748b',
                                    lineHeight: '1.6',
                                    fontSize: '14px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: form */}
                <div className="faq-column">
                    <div className="faq-form-card">
                        <div style={{ marginBottom: '24px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>HAVE QUESTIONS?</span>
                            <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--secondary)', marginTop: '6px' }}>Send us a Message</h3>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="faq-input faq-input-full"
                            />

                            <div className="faq-form-row">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone no"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="faq-input faq-input-half"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="faq-input faq-input-half"
                                />
                            </div>

                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={formData.company}
                                onChange={handleChange}
                                className="faq-input faq-input-full"
                            />

                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="faq-input faq-input-full"
                                style={{ color: formData.service ? '#334155' : '#94a3b8' }}
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
                                rows="4"
                                className="faq-input faq-input-full"
                                style={{ resize: 'none' }}
                            ></textarea>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: '14px',
                                    background: 'var(--secondary)', // Navy blue
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '30px',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    cursor: loading ? 'wait' : 'pointer',
                                    transition: 'background 0.2s',
                                    marginTop: '8px'
                                }}
                                onMouseOver={(e) => !loading && (e.target.style.background = 'var(--primary)')}
                                onMouseOut={(e) => !loading && (e.target.style.background = 'var(--secondary)')}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>

                            {status === 'success' && <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>Message Sent Successfully! We will connect with you soon.</p>}
                            {status === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong. Try again.</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQContactSection;
