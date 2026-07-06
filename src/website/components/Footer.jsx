import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import {
    unlockAdminPortal,
    ADMIN_UNLOCK_CLICKS,
    ADMIN_UNLOCK_RESET_MS
} from '../../utils/adminAccess';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();
    const clickCountRef = useRef(0);
    const resetTimerRef = useRef(null);

    const handleConnectedClick = () => {
        clickCountRef.current += 1;

        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }

        if (clickCountRef.current >= ADMIN_UNLOCK_CLICKS) {
            clickCountRef.current = 0;
            unlockAdminPortal();
            navigate('/aashasm-portal/login');
            return;
        }

        resetTimerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
        }, ADMIN_UNLOCK_RESET_MS);
    };

    return (
        <footer className="footer-section">
            {/* Scroll Top Button */}
            <div className="footer-scroll-top">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="scroll-top-btn"
                    title="Scroll to Top"
                >
                    <ArrowUp size={20} />
                </button>
            </div>

            <div className="footer-container">
                {/* Top Row: Title + Content */}
                <div className="footer-top">
                    {/* Left Side: Big Title */}
                    <div className="footer-title-col">
                        <h2 className="footer-title-h2">
                            <span className="footer-font-arial">Stay</span>{' '}
                            <span
                                className="footer-font-times footer-connected-trigger"
                                onClick={handleConnectedClick}
                                role="presentation"
                            >
                                connected
                            </span>
                        </h2>
                    </div>

                    {/* Right Side: Contact, Follow Us */}
                    <div className="footer-links-area">
                        {/* Contact Column */}
                        <div className="footer-column">
                            <h4>Contact</h4>

                            <div className="footer-contact-items">
                                <div className="footer-item">
                                    <div className="footer-label">Contact Us</div>
                                    <a href="tel:+919529998320" className="footer-link">+91 95299 98320</a>
                                </div>

                                <div className="footer-item">
                                    <div className="footer-label">New Business Inquiries</div>
                                    <a href="mailto:adminsmtechsolution@gmail.com" className="footer-link">adminsmtechsolution@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Follow Us Column */}
                        <div className="footer-column">
                            <h4>Follow Us</h4>
                            <div className="footer-social-grid">
                                <a href="https://www.instagram.com/aashasmtechnologies.in?igsh=MXZvMTF5ZG5yeXp0ZQ==" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                                <a href="https://www.facebook.com/share/1BSJtutCf9/" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
                                <a href="https://www.linkedin.com/company/aasha-sm-technologies/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Copyright + Legal Links */}
                <div className="footer-bottom">
                    <div>
                        © 2026 AASHA-SM TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
                    </div>
                    <div className="footer-legal-links">
                        <Link to="/privacy-policy" className="footer-link">Privacy Notice</Link>
                        <Link to="/terms" className="footer-link">Terms of Use</Link>
                        <Link to="/cookies" className="footer-link">Cookie Preferences</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
