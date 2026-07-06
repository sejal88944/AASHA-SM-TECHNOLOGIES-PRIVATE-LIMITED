import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import db from '../../firebase/firestore';

const HiringPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [hiringData, setHiringData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHiringData = async () => {
            try {
                const docRef = doc(db, "admin", "hiring");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().active) {
                    setHiringData(docSnap.data());

                    const timer = setTimeout(() => {
                        setShowPopup(true);
                    }, 10000); // 10 seconds delay

                    return () => clearTimeout(timer);
                }
            } catch (err) {
                console.error("Error fetching hiring data:", err);
            }
        };

        fetchHiringData();
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleApply = () => {
        setShowPopup(false);
        navigate('/careers');
        setTimeout(() => {
            const formElement = document.getElementById('apply-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    };

    return (
        <AnimatePresence>
            {showPopup && hiringData && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(12px)',
                    fontFamily: "'Merriweather', serif"
                }}>
                    <style>
                        {`
                            @media (max-width: 640px) {
                                .hiring-popup-card {
                                    width: 90% !important;
                                    max-width: 350px !important;
                                    height: auto !important;
                                    max-height: 85vh !important;
                                    display: flex !important;
                                    flex-direction: column !important;
                                    border-radius: 20px !important;
                                }
                                .hiring-popup-content {
                                    padding: 20px 20px 25px !important;
                                    display: flex !important;
                                    flex-direction: column !important;
                                    justify-content: center !important;
                                    align-items: center !important;
                                    text-align: center !important;
                                    gap: 15px !important;
                                }
                                .hiring-popup-logo-container {
                                    position: relative !important;
                                    top: 0 !important;
                                    left: 0 !important;
                                    width: 100% !important;
                                    margin-bottom: 10px !important;
                                    display: flex !important;
                                    justify-content: flex-start !important;
                                    z-index: 10 !important;
                                }
                                .hiring-popup-logo-container img {
                                    width: 110px !important;
                                }
                                .hiring-popup-logo-spacer {
                                    display: none !important;
                                }
                                .hiring-popup-title-section {
                                    margin-bottom: 10px !important;
                                }
                                .hiring-popup-title {
                                    font-size: 26px !important;
                                }
                                .hiring-popup-desc {
                                    font-size: 14px !important;
                                    line-height: 1.4 !important;
                                    max-width: 240px !important;
                                }
                                .hiring-popup-tags-container {
                                    padding: 15px !important;
                                    margin-bottom: 15px !important;
                                    width: 100% !important;
                                    box-sizing: border-box !important;
                                    border-radius: 16px !important;
                                }
                                .hiring-popup-tag {
                                    font-size: 13px !important;
                                    padding: 8px 12px !important;
                                    width: 100% !important;
                                    justify-content: center !important;
                                }
                                .hiring-popup-btn {
                                    padding: 15px !important;
                                    font-size: 16px !important;
                                    width: 100% !important;
                                    border-radius: 12px !important;
                                }
                                .close-btn-mobile {
                                    top: 15px !important;
                                    right: 15px !important;
                                    width: 28px !important;
                                    height: 28px !important;
                                }
                            }
                        `}
                    </style>
                    <motion.div
                        className="hiring-popup-card"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
                        style={{
                            background: hiringData.backgroundImage
                                ? `url(${hiringData.backgroundImage}) center/cover no-repeat`
                                : 'linear-gradient(145deg, #ffffff, #f8fafc)',
                            borderRadius: '24px',
                            maxWidth: '480px',
                            width: '100%',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.2) inset',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Overlay/Shadow for readability */}
                        {hiringData.backgroundImage && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(255, 255, 255, 0.4)',
                                zIndex: 0
                            }} />
                        )}
                        {/* Decorative Top Gradient */}

                        {/* Top Right Circle Decoration */}
                        <div style={{
                            position: 'absolute',
                            top: '-60px',
                            right: '-60px',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(55,180,111,0.1) 0%, rgba(255,255,255,0) 70%)',
                            pointerEvents: 'none'
                        }} />

                        <button
                            onClick={handleClose}
                            className="close-btn-mobile"
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid #e2e8f0',
                                background: 'white',
                                color: '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = '#ef4444';
                                e.currentTarget.style.borderColor = '#fee2e2';
                                e.currentTarget.style.background = '#fef2f2';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = '#64748b';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.background = 'white';
                            }}
                        >
                            <X size={18} />
                        </button>

                        <div className="hiring-popup-content" style={{
                            padding: '40px 32px 32px',
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Logo at the Top */}
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    zIndex: 10
                                }}
                                className="hiring-popup-logo-container"
                            >
                                <img src="/ASM Logo.jpeg" alt="AASHA-SM TECHNOLOGIES" style={{ width: '120px', height: 'auto', objectFit: 'contain' }} />
                            </motion.div>

                            {/* Spacer to preserve original card height since logo is now absolute positioned */}
                            <div className="hiring-popup-logo-spacer" style={{ height: '42px', marginBottom: '20px' }} />

                            {/* Title & Description Middle-Top */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="hiring-popup-title-section"
                                style={{ textAlign: 'center', marginBottom: '24px' }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginBottom: '4px'
                                }}>
                                    <h2 className="hiring-popup-title" style={{
                                        fontFamily: "'Merriweather', serif",
                                        fontStyle: 'italic',
                                        fontSize: '32px',
                                        fontWeight: '800',
                                        color: 'var(--primary)',
                                        margin: 0,
                                        letterSpacing: '-0.02em',
                                        textShadow: hiringData.backgroundImage ? '0 1px 2px rgba(5, 5, 5, 0.8)' : 'none'
                                    }}>
                                        We're Hiring!
                                    </h2>
                                </div>
                                <p className="hiring-popup-desc" style={{
                                    color: '#334155',
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    margin: '0 auto',
                                    maxWidth: '300px',
                                    fontWeight: '600'
                                }}>
                                    Join our team and help us build amazing digital experiences.
                                </p>
                            </motion.div>

                            {/* Tags Section Middle-Bottom */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="hiring-popup-tags-container"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    marginBottom: '28px',
                                    width: '100%',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginBottom: '15px'
                                }}>
                                    <Briefcase size={16} color="var(--primary)" />
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: '#000000',
                                        margin: 0
                                    }}>
                                        Open Positions
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                    justifyContent: 'center'
                                }}>
                                    {hiringData.positions && hiringData.positions.map((pos, index) => (
                                        <motion.span
                                            key={index}
                                            className="hiring-popup-tag"
                                            whileHover={{ scale: 1.05, backgroundColor: '#dcfce7' }}
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                color: '#166534',
                                                padding: '10px 16px',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                border: '1px solid #dcfce7',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                                cursor: 'default'
                                            }}
                                        >
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                                            {pos}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA Button Bottom */}
                            <motion.button
                                className="hiring-popup-btn"
                                onClick={handleApply}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    scale: [1, 1.01, 1]
                                }}
                                transition={{
                                    delay: 0.5,
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '14px',
                                    padding: '16px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Apply Now <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HiringPopup;
