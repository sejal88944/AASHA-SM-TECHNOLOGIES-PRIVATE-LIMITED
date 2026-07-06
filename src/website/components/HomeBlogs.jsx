import React, { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, where, orderBy } from 'firebase/firestore';
import db from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import './HomeBlogs.css';

const HomeBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const q = query(
                    collection(db, "blogs"),
                    where("status", "==", "published"),
                    orderBy("createdAt", "desc"),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBlogs(items);
            } catch (error) {
                console.error("Error fetching home blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return null;
    if (blogs.length === 0) return null;

    return (
        <section className="home-blogs-section">
            <div className="container">
                <div className="section-header-flex">
                    <div className="header-text">
                        <motion.span 
                            className="section-tag"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Latest Updates
                        </motion.span>
                        <motion.h2 
                            className="section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Insights & <span className="text-orange">Blog Posts</span>
                        </motion.h2>
                    </div>
                    <motion.button 
                        className="view-all-btn desktop-only"
                        onClick={() => navigate('/blog')}
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        View All Blogs <ArrowRight size={18} />
                    </motion.button>
                </div>

                <div className="blogs-grid-home">
                    {blogs.map((blog, index) => (
                        <motion.div 
                            key={blog.id}
                            className="home-blog-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/blog/${blog.id}`)}
                        >
                            <div className="blog-image-wrapper">
                                <img 
                                    src={blog.imageUrl || 'https://via.placeholder.com/400x250'} 
                                    alt={blog.title} 
                                />
                                {blog.category && (
                                    <div className="blog-category" dangerouslySetInnerHTML={{ __html: blog.category }} />
                                )}
                            </div>
                            <div className="blog-content-body">
                                <div className="blog-meta-home">
                                    <Calendar size={14} />
                                    <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <h3 dangerouslySetInnerHTML={{ __html: blog.title }} />
                                <p dangerouslySetInnerHTML={{ 
                                    __html: (blog.excerpt || blog.content || '').replace(/<[^>]+>/g, '').substring(0, 90) + '...' 
                                }} />
                                <span className="read-more">Read More <ArrowRight size={16} /></span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mobile-only-center">
                    <button 
                        className="view-all-btn"
                        onClick={() => navigate('/blog')}
                    >
                        View All Blogs <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeBlogs;
