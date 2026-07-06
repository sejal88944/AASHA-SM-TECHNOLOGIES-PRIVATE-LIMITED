import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        formData.append("_captcha", "false");
        formData.append("_subject", "New Submission from AASHA-SM TECHNOLOGIES Website");
        formData.append("_template", "table");

        try {
            const response = await fetch("https://formsubmit.co/ajax/adminsmtechsolution@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setSubmitted(true);
                e.target.reset();
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <div className="contact-page">


                <div className="contact-content">
                    <div className="contact-container">

                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="contact-left"
                        >
                            <h2 className="contact-heading-main">
                                Ready to start your digital journey with a trusted technology partner?
                            </h2>
                            <p className="contact-description">
                                Get in touch with AASHA-SM TECHNOLOGIES for website development, custom software, and digital solutions tailored to your business needs. We are here to help you build scalable and secure digital systems.
                            </p>

                            <div className="contact-info-list">
                                {/* Address */}
                                <a 
                                    href="https://maps.app.goo.gl/V4B32nkhY8J3rq2g7" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="contact-info-item contact-address-link"
                                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '15px' }}
                                >
                                    <div style={{ color: 'var(--primary)', marginTop: '4px' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <span className="contact-info-text">
                                        <strong>AASHA-SM TECHNOLOGIES PRIVATE LIMITED</strong><br />
                                        Pune (service delivery across Maharashtra & India)<br />
                                        Pune, MH 411045, India
                                    </span>
                                </a>

                                {/* Phone */}
                                <div className="contact-info-item">
                                    <div style={{ color: 'var(--primary)' }}>
                                        <Phone size={24} />
                                    </div>
                                    <span className="contact-info-text" style={{ fontWeight: 700 }}>+91 95299 98320</span>
                                </div>

                                {/* Email */}
                                <div className="contact-info-item">
                                    <div style={{ color: 'var(--primary)' }}>
                                        <Mail size={24} />
                                    </div>
                                    <span className="contact-info-text" style={{ fontWeight: 700 }}>adminsmtechsolution@gmail.com</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="contact-right"
                        >
                            <h2 className="contact-form-heading">Send us a message</h2>

                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="success-card"
                                >
                                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Message Sent!</h3>
                                        <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="Full Name" placeholder="John Doe" required className="form-input" />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="Email Address" placeholder="john@example.com" required className="form-input" />
                                    </div>

                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input type="text" name="Subject" placeholder="Project Inquiry" required className="form-input" />
                                    </div>

                                    <div className="form-group">
                                        <label>Your Message</label>
                                        <textarea name="Message" placeholder="Tell us about your project..." className="form-input form-textarea"></textarea>
                                    </div>

                                    <button type="submit" disabled={loading} className="submit-btn">
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                    </div>
                </div>

                {/* Google Maps Section */}
                <div className="map-section">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219126.1806445906!2d73.875624!3d18.508838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C+Maharashtra%2C+India!5e0!3m2!1sen!2sin!4v1766915105634!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Aasha-SM Technologies Location"
                    ></iframe>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
