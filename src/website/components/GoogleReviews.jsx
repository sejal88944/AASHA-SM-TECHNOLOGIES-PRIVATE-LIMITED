import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, ExternalLink, Quote } from 'lucide-react';
import db from '../../firebase/firestore';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import './GoogleReviews.css';

const GoogleReviews = () => {
    const googleReviewsLink = "https://maps.app.goo.gl/V4B32nkhY8J3rq2g7";
    const writeReviewLink = "https://g.page/r/CfCjlkmVrVBzEBM/review";

    // 10 REAL REVIEWS FROM GMB WITH GENUINE PROFILE PHOTOS
    const fallbackReviews = [
        {
            name: "Aditya Jamdade",
            rating: 5,
            text: "The most reliable IT partner for software development. Their technical expertise helped us build a robust digital infrastructure with zero downtime.",
            date: "1 month ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjWx2l-4-DXnRRHCIGfvL6IWZI_t74u5W215Wfivi3ChV2i5hXnw=s80-c-rp-br100-mo"
        },
        {
            name: "Sumit Suryavanshi",
            rating: 5,
            text: "Best IT company. Delivering high-quality custom software, scalable websites, and smart automation for our business growth.",
            date: "1 month ago",
            img: "https://lh3.googleusercontent.com/a/ACg8ocLYjA0DAwNIfK5dBXZeWUoAEJrhBcj6sXPKd7pwxOyYlj6p-N4=w45-h45-p-rp-mo-br100"
        },
        {
            name: "Suraj patil",
            rating: 5,
            text: "Excellent technical support and innovative solutions. AASHA-SM TECHNOLOGIES built a custom management system that transformed our business operations.",
            date: "2 months ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjUDepfW9juwJPnGi5I3fGVd5G3txKDjaXFWT2oMBQlVsu3iKWU=w45-h45-p-rp-mo-br100"
        },
        {
            name: "Priyanka Patil",
            rating: 5,
            text: "Leading IT company with high dedication to results. Their software solutions are top-notch and truly future-ready.",
            date: "1 month ago",
            img: "https://lh3.googleusercontent.com/a/ACg8ocIF9376U33HXpg1O_ftYNK7bJNSUPHAEFXusMyb-lgomiWnJg=w45-h45-p-rp-mo-br100"
        },
        {
            name: "Asha Patil",
            rating: 5,
            text: "Professional team with deep technical knowledge. Highly recommend them for custom software development and system automation.",
            date: "2 months ago",
            img: "https://lh3.googleusercontent.com/a/ACg8ocLFccukuMITrc3vzvXQ5lEZd6BKLymnsuTwYkO4p10Hxj7uJQ=w45-h45-p-rp-mo-br100"
        },
        {
            name: "Swapnil SP",
            rating: 5,
            text: "Best IT company for website development and business software. The team is very responsive and understands technical requirements perfectly.",
            date: "3 weeks ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjW-CGsd-lYJCb1pBI1soCQBBvOLX8rDpa6pkwsoY37PjnaaGfWV=w45-h45-p-rp-mo-br100"
        },
        {
            name: "Pranav Shanigonda",
            rating: 5,
            text: "Great experience! They built a high-performance website for us that exceeded all our expectations in terms of speed and security.",
            date: "1 month ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjUYxnBVP0sH678kH6sSiQjPaaVjYgAeKFve6e9H5U4_gQV1NKs=w45-h45-p-rp-mo-br100"
        },
        {
            name: "Shriraj Patil",
            rating: 5,
            text: "Highly effective automation and system design. Best technology partner in Sangli for businesses looking to scale digitally.",
            date: "4 months ago",
            img: "https://lh3.googleusercontent.com/a/ACg8ocLE5XplhUXx1M3doVtM5TuYNYEKqevfCIKyh5bRtmsG1ogiJg=w45-h45-p-rp-mo-br100"
        },
        {
            name: "shardul kapare",
            rating: 5,
            text: "Top class technology services. Very creative team for web design, UI/UX, and robust software architecture.",
            date: "2 weeks ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjWrNGTSoF1kR00LlVaZLUvgovBQtBRlKUty0uuOwVUwk_LKt0tc=w45-h45-p-rp-mo-ba3-br100"
        },
        {
            name: "darshan chougule",
            rating: 5,
            text: "Innovative technology strategies and data-driven solutions. Truly helped our business modernize with smart automation and future-ready systems.",
            date: "3 months ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjVO-w5_8fl3oe-4IvSPCkyjrRzN-4Abxhbu7T8YoB7FzWiP3rWs=w45-h45-p-rp-mo-br100"
        },
        {
            name: "ranjit narawade",
            rating: 5,
            text: "Reliable and professional technical partners. Their expertise in website development and system architecture is exceptional and future-ready.",
            date: "1 month ago",
            img: "https://lh3.googleusercontent.com/a-/ALV-UjXNVOUW4XGLzoruCikgEeQisMJoN98xb1jyXrLuA_O4Yb54oMMS=w45-h45-p-rp-mo-br100"
        }
    ];

    const [reviews, setReviews] = useState(fallbackReviews);
    const [activeIndex, setActiveIndex] = useState(0);

    // Limit dots to 3
    const getVisibleDots = () => {
        if (reviews.length <= 3) return reviews.map((_, i) => i);
        if (activeIndex === 0) return [0, 1, 2];
        if (activeIndex === reviews.length - 1) return [reviews.length - 3, reviews.length - 2, reviews.length - 1];
        return [activeIndex - 1, activeIndex, activeIndex + 1];
    };

    useEffect(() => {
        const fetchLiveReviews = async () => {
            try {
                const q = query(collection(db, 'google_reviews'), orderBy('timestamp', 'desc'), limit(15));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const dynamicReviews = querySnapshot.docs.map(doc => doc.data());
                    setReviews(dynamicReviews);
                }
            } catch (error) {
                console.error("Error fetching dynamic reviews:", error);
            }
        };

        fetchLiveReviews();
    }, []);

    useEffect(() => {
        if (reviews.length === 0) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    const darkNavy = '#050811';
    const accentBlue = 'var(--accent)';

    return (
        <section className="google-reviews-section">
            {/* Background Decorative Element - Ambient Glow */}
            <div className="reviews-bg-glow" />

            <div className="reviews-container">
                <div className="reviews-grid">

                    {/* Left Side: Call to Action */}
                    <div className="reviews-text-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            {/* <div style={{
                                width: '32px',
                                height: '32px',
                                background: '#fff',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '6px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                            }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '100%' }} />
                            </div> */}
                            {/* <span style={{ color: '#fff', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>REVIEWS</span> */}
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 42px)',
                                fontWeight: '900',
                                color: 'white',
                                lineHeight: '1.1',
                                marginBottom: '16px',
                                fontFamily: "'Merriweather', serif",
                                fontStyle: 'italic',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            Trusted by <br />
                            <span style={{
                                color: 'var(--primary)'
                            }}>Happy Clients.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={{
                                fontSize: '15px',
                                color: 'rgba(255, 255, 255, 0.6)',
                                lineHeight: '1.5',
                                marginBottom: '24px',
                                fontFamily: "'Merriweather', serif"
                            }}
                        >
                            Our clients' success is our greatest achievement. Explore what 220+ clients have to say about AASHA-SM TECHNOLOGIES.
                        </motion.p>

                        <div className="review-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <a href={writeReviewLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: 'white', color: darkNavy, borderRadius: '100px', fontSize: '14px', fontWeight: '900', textDecoration: 'none', transition: '0.3s' }}>
                                <MessageSquare size={16} /> Write Review
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Review Carousel */}
                    <div className="review-carousel-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="review-card"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Quote size={50} style={{ position: 'absolute', top: '15px', right: '25px', color: 'rgba(255, 255, 255, 0.05)', zIndex: 0 }} />

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', gap: '5px', marginBottom: '12px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < reviews[activeIndex].rating ? "#fbbf24" : "none"} color="#fbbf24" />
                                        ))}
                                    </div>

                                    <p style={{ fontSize: '16px', fontStyle: 'italic', color: 'white', lineHeight: '1.5', marginBottom: '20px', fontFamily: "'Merriweather', serif" }}>
                                        "{reviews[activeIndex].text}"
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%',
                                            background: '#f1f1f1',
                                            overflow: 'hidden',
                                            border: '2px solid rgba(255,255,255,0.2)',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                        }}>
                                            <img
                                                src={reviews[activeIndex].img}
                                                alt={reviews[activeIndex].name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                referrerPolicy="no-referrer"
                                                onError={(e) => {
                                                    e.target.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '15px', fontWeight: '900', color: 'white', margin: 0, fontFamily: "'Merriweather', serif" }}>
                                                {reviews[activeIndex].name}
                                            </h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }}></div>
                                                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0, fontWeight: '600' }}>Verified • {reviews[activeIndex].date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Dots - Filtered to show only 3 dots */}
                        <div style={{ position: 'absolute', bottom: -15, left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            {getVisibleDots().map((dotIndex) => (
                                <div key={dotIndex} style={{ width: activeIndex === dotIndex ? '16px' : '6px', height: '6px', borderRadius: '3px', background: activeIndex === dotIndex ? accentBlue : 'rgba(255,255,255,0.2)', transition: '0.3s' }} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;
