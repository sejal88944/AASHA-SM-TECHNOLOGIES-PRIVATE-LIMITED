import React, { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import './LegalPages.css';

const TermsOfUse = () => {
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
                        <div className="legal-badge">Agreement</div>
                        <h1 className="legal-title">Terms of Use</h1>
                        <p className="legal-subtitle">Last Updated: June 28, 2026</p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="legal-content-container">
                    <p style={{ fontSize: '15.5px', lineHeight: '1.8', marginBottom: '35px', color: '#475569' }}>
                        Welcome to AASHA-SM TECHNOLOGIES. By accessing our website, subscribing to our services, or utilizing our custom software systems, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before accessing or using our services.
                    </p>

                    <section className="legal-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and browsing this website, you accept without limitation or qualification these Terms of Use. If you do not agree to these terms, you are prohibited from utilizing our site assets, code elements, content materials, or services.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Intellectual Property Rights</h2>
                        <p>
                            This website, its source code, layouts, design aesthetics, illustrations, animations, and branding elements are the exclusive intellectual property of AASHA-SM TECHNOLOGIES PRIVATE LIMITED and are protected under international copyright, trademark, patent, and trade secret laws.
                        </p>
                        <p>
                            Unauthorized duplication, reverse-engineering, modification, or redistribution of our web layouts, admin panel structures, or software codebases is strictly prohibited without prior written consent.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Permitted User Conduct</h2>
                        <p>
                            You agree to use this site only for lawful purposes. You are prohibited from:
                        </p>
                        <ul>
                            <li>Uploading or transmitting any content that is defamatory, obscene, harassing, or infringes on intellectual property rights.</li>
                            <li>Attempting to breach, disable, or circumvent the website's security features, admin portals, or form endpoints.</li>
                            <li>Using automated scrapers, bots, or extraction scripts to harvest data from our pages or directories.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>4. Disclaimer of Warranties</h2>
                        <p>
                            This site and all its services are provided on an "AS IS" and "AS AVAILABLE" basis. AASHA-SM TECHNOLOGIES PRIVATE LIMITED makes no representations or warranties of any kind, express or implied, as to the completeness, reliability, or availability of the website, custom automation scripts, or search engine ranking outcomes.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Limitation of Liability</h2>
                        <p>
                            In no event shall AASHA-SM TECHNOLOGIES PRIVATE LIMITED, its directors, engineers, or partners be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of, or inability to use, this website, its forms, or its custom CRM/ERP tools.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Governing Law</h2>
                        <p>
                            These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal actions or proceedings arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
                        </p>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default TermsOfUse;
