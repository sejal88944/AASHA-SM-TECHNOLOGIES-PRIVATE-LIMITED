import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';
import Loader from '../../admin/components/Loader';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/blogContent.css';
import './BlogDetail.css';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        fetchBlog();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [slug]);

    // Auto-rotate banner slideshow
    useEffect(() => {
        if (blog?.bannerMedia && blog.bannerMedia.length > 1) {
            const timer = setInterval(() => {
                setCurrentBannerIndex(prev => (prev + 1) % blog.bannerMedia.length);
            }, 5000); // Change every 5 seconds

            return () => clearInterval(timer);
        }
    }, [blog]);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
    };

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "blogs", slug);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // Normalize bannerMedia to array (handle old/missing data)
                let bannerMedia = [];
                if (data.bannerMedia && Array.isArray(data.bannerMedia)) {
                    bannerMedia = data.bannerMedia;
                } else if (data.imageUrl) {
                    // Fallback to featured image as first banner item
                    bannerMedia = [{ url: data.imageUrl, type: 'image' }];
                }

                setBlog({ id: docSnap.id, ...data, bannerMedia });
            } else {
                navigate('/blog');
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#ffffff' }}>
                <Loader />
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="blog-detail-page">
            {/* Reading Progress Bar */}
            <div
                className="reading-progress-bar"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            {/* Immersive Banner Section */}
            <div className="detail-banner">
                {/* Banner Media Slideshow */}
                <AnimatePresence initial={false}>
                    {blog.bannerMedia && blog.bannerMedia.length > 0 ? (
                        blog.bannerMedia.map((item, index) => (
                            index === currentBannerIndex && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className="banner-media-wrapper"
                                >
                                    {item.type === 'image' ? (
                                        <div
                                            className="banner-bg-image"
                                            style={{ backgroundImage: `url(${item.url})` }}
                                        />
                                    ) : (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="banner-video"
                                        >
                                            <source src={item.url} type="video/mp4" />
                                        </video>
                                    )}
                                </motion.div>
                            )
                        ))
                    ) : (
                        /* Fallback to Featured Image */
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="banner-media-wrapper"
                        >
                            <div
                                className="banner-bg-image"
                                style={{ backgroundImage: `url(${blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600'})` }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modern Gradient Overlay */}
                <div className="banner-overlay"></div>

                {/* Top Buttons */}
                <div className="banner-top-actions">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/blog')}
                        className="back-btn"
                    >
                        <ArrowLeft size={16} /> Back to Hub
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="category-pill"
                        dangerouslySetInnerHTML={{ __html: blog.category || 'Insights' }}
                    />
                </div>

                {/* Content Overlay (Centered Title) */}
                <div className="banner-title-section">
                    <header style={{ color: 'white' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="banner-title"
                            dangerouslySetInnerHTML={{ __html: blog.title }}
                        />

                        {blog.excerpt && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="banner-excerpt"
                                dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                            />
                        )}
                    </header>
                </div>

                {/* Meta Info at Bottom of Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="banner-meta-info"
                >
                    <div className="meta-item">
                        <User size={20} />
                        <span dangerouslySetInnerHTML={{ __html: blog.author || 'AASHA-SM Team' }} />
                    </div>
                    <div className="meta-item">
                        <Calendar size={20} />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </motion.div>
            </div>

            <div className="content-spacer"></div>

            {/* Article Content */}
            <article className="detail-article">
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                {blog.tags && (
                    <div className="tags-section">
                        <div className="tags-label">TAGS</div>
                        <div className="tags-list">
                            {blog.tags.split(',').map((tag, i) => (
                                <span key={i} className="tag-item">
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Modern CTA Section */}
            <div className="detail-cta-section">
                <div className="cta-card">
                    {/* Abstract Shapes */}
                    <div className="cta-shape cta-shape-1"></div>
                    <div className="cta-shape cta-shape-2"></div>

                    <div className="cta-content">
                        <h2 className="cta-title">
                            Ready to Scale Your Digital Presence?
                        </h2>
                        <p className="cta-desc">
                            Join hundreds of businesses that have transformed their growth with our data-driven strategies.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/contact')}
                            className="cta-btn"
                        >
                            Start Your Journey <ArrowRight size={20} />
                        </motion.button>

                        <div className="cta-features">
                            {['SEO Optimized', 'Data Driven', 'ROI Focused'].map((item, i) => (
                                <div key={i} className="cta-feature-item">
                                    <div className="cta-dot"></div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
