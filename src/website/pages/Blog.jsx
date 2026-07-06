import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../admin/components/Loader';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/gsap/TiltCard';
import './Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
        window.scrollTo(0, 0);
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "blogs"));
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const publishedBlogs = items
                .filter(blog => blog.status === 'published')
                .sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });

            setBlogs(publishedBlogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', ...new Set(blogs.map(blog => blog.category.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()).filter(Boolean))];

    const filteredBlogs = activeCategory === 'All'
        ? blogs
        : blogs.filter(blog => blog.category.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() === activeCategory);

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-glow-1"></div>
                <div className="blog-hero-glow-2"></div>

                <div className="container">
                    <div className="hero-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hero-badge"
                        >
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                            Our Knowledge Hub
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hero-title"
                        >
                            Blogs & Insights
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="hero-subtitle"
                        >
                            Stay updated with the latest trends in custom web development, CRM/ERP software architecture, smart AI Automations, and generative search engine optimizations (SEO/GEO).
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <button
                                onClick={() => document.getElementById('articles').scrollIntoView({ behavior: 'smooth' })}
                                className="hero-cta-btn"
                            >
                                Explore Articles
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Category Filter Bar */}
            <nav className="blog-filter-bar">
                <div className="filter-container">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Blog Grid */}
            <div id="articles" className="blog-grid-section">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                        <Loader />
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="no-articles"
                    >
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--secondary)', marginBottom: '12px' }}>No articles found</h3>
                        <p style={{ color: '#64748b' }}>Try exploring a different category or check back later.</p>
                        <button
                            onClick={() => setActiveCategory('All')}
                            className="reset-btn"
                        >
                            Reset filter
                        </button>
                    </motion.div>
                ) : (
                    <div className="blog-grid">
                        {filteredBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TiltCard
                                    onClick={() => navigate(`/blog/${blog.id}`)}
                                    className="blog-card"
                                >
                                    <div className="blog-card-media">
                                        <img
                                            src={blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop'}
                                            alt={blog.title}
                                            className="blog-card-img"
                                        />
                                        <div className="blog-card-overlay"></div>
                                        {blog.category && (
                                            <div
                                                className="blog-category-badge"
                                                dangerouslySetInnerHTML={{ __html: blog.category }}
                                            />
                                        )}
                                    </div>

                                    <div className="blog-card-body">
                                        <div className="blog-meta">
                                            <div className="blog-date">
                                                <Calendar size={14} />
                                                {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>

                                        <h3 className="blog-card-title">
                                            {blog.title.replace(/<[^>]*>/g, '')}
                                        </h3>

                                        <p className="blog-card-excerpt">
                                            {(blog.excerpt || blog.content).replace(/<[^>]+>/g, '').substring(0, 120) + '...'}
                                        </p>

                                        <div className="blog-card-footer">
                                            <div className="read-more">
                                                Read Article <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
