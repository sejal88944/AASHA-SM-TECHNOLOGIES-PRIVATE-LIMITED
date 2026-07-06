import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a decision
        const consent = localStorage.getItem('aashasm_cookie_consent');
        if (!consent) {
            // Delay rendering by 2000ms for a smoother, premium visual entry
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('aashasm_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('aashasm_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="cookie-consent-card"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="cookie-consent-header">
                        <div className="cookie-consent-icon-container">
                            <ShieldCheck size={22} />
                        </div>
                        <h4 className="cookie-consent-title">Cookie Preferences</h4>
                    </div>

                    <p className="cookie-consent-text">
                        We use cookies to improve system navigation, analyze site performance, and customize smart CRM/ERP or AI Automations. Learn more in our{' '}
                        <Link to="/cookies" className="cookie-consent-link">
                            Cookie Policy
                        </Link>.
                    </p>

                    <div className="cookie-consent-buttons">
                        <button 
                            className="cookie-btn-decline" 
                            onClick={handleDecline}
                        >
                            Decline
                        </button>
                        <button 
                            className="cookie-btn-accept" 
                            onClick={handleAccept}
                        >
                            Accept All
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
