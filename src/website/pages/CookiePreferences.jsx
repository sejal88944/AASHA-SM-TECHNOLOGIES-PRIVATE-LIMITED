import React, { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import './LegalPages.css';

const CookiePreferences = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <div className="legal-page-wrapper">
                
                {/* Hero Banner */}
                <section className="legal-hero">
                    <div className="legal-hero-glow-1"></div>
                    <div className="legal-hero-glow-2"></div>
                    
                    <div className="legal-hero-content">
                        <div className="legal-badge">Data Preferences</div>
                        <h1 className="legal-title">Cookie Policy</h1>
                        <p className="legal-subtitle">Last Updated: June 28, 2026</p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="legal-content-container">
                    <p style={{ fontSize: '15.5px', lineHeight: '1.8', marginBottom: '35px', color: '#475569' }}>
                        This Cookie Policy explains how AASHA-SM TECHNOLOGIES PRIVATE LIMITED utilizes cookies and similar tracking technologies when you browse our site. It outlines what cookies are, how they enhance your web experience, and how you can manage your settings.
                    </p>

                    <section className="legal-section">
                        <h2>What are cookies?</h2>
                        <p>
                            Cookies are small text data files containing key-value identifiers sent to your browser by a website you visit. A cookie file is stored locally on your device and enables the website or trusted third-party services to recognize your session, remember your language preferences, and optimize load speeds on subsequent visits.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>How we utilize cookies</h2>
                        <p>
                            When you access and browse our digital pages, we may place cookies in your browser directory to support the following operational objectives:
                        </p>
                        <ul>
                            <li>
                                <strong>System Functionality:</strong> Activating core features such as secure admin dashboard logins, route transitions, and persistent form submission inputs.
                            </li>
                            <li>
                                <strong>Analytics Tracking:</strong> Assessing search pattern behaviors, average page durations, and referral channels to optimize our website architecture.
                            </li>
                            <li>
                                <strong>Preferences Storage:</strong> Storing user customizations and choice flags to prevent repeating inputs.
                            </li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>Categories of cookies we deploy</h2>
                        <p>
                            We employ both temporary session cookies (which close automatically when your browser shuts) and persistent cookies (which remain on your device until they expire or are cleared manually):
                        </p>
                        <ul>
                            <li>
                                <strong>Essential Cookies:</strong> Critical for enabling core website navigation, user authentication blocks, and protecting forms from spam submittals.
                            </li>
                            <li>
                                <strong>Performance & Analytics Cookies:</strong> Gathers aggregated metrics data on how visitors interact with our pages to help us refine design layouts.
                            </li>
                            <li>
                                <strong>Functional Cookies:</strong> Remembers your chosen filters, search settings, and layout customizations.
                            </li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>Managing your cookie choices</h2>
                        <p>
                            Most web browsers allow you to manage cookies through their preferences settings. You can configure your browser to notify you when receiving cookies, block cookies entirely, or delete existing cookies on cache clearance.
                        </p>
                        <p>
                            Please note that blocking or deleting cookies may affect your browsing experience, causing certain page elements to load slower or preventing specific personalized features from rendering correctly.
                        </p>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default CookiePreferences;
