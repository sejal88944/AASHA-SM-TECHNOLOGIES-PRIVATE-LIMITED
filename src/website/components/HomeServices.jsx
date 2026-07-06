import React, { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import db from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Loader from '../../admin/components/Loader';
import './HomeServices.css';

const HomeServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const q = query(
                    collection(db, "services"),
                    where("status", "==", "active"),
                    limit(3)
                );
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices(items);
            } catch (error) {
                console.error("Error fetching home services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return null;
    if (services.length === 0) return null;

    return (
        <section className="home-services-section">
            <div className="container">
                <div className="section-header-flex">
                    <div className="header-text">
                        <motion.span
                            className="section-tag"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Our Services
                        </motion.span>
                        {/* <motion.h2 
                            className="section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Specialized <span className="text-orange">IT Solutions</span>
                        </motion.h2> */}
                    </div>
                    <motion.button
                        className="view-all-btn desktop-only"
                        onClick={() => navigate('/services')}
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        View All Services <ArrowRight size={18} />
                    </motion.button>
                </div>

                <div className="services-grid-home">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="home-service-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/services/${service.id}`)}
                        >
                            <div className="card-image-wrapper">
                                <img
                                    src={service.portfolioItems?.[0]?.url || 'https://via.placeholder.com/400x250'}
                                    alt={service.title}
                                />
                                <div className="category-badge">{service.serviceType}</div>
                            </div>
                            <div className="card-body">
                                <h3 dangerouslySetInnerHTML={{ __html: service.title }} />
                                <p dangerouslySetInnerHTML={{
                                    __html: (service.description || '').substring(0, 100) + '...'
                                }} />
                                <span className="read-more">Learn More <ArrowRight size={16} /></span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mobile-only-center">
                    <button
                        className="view-all-btn"
                        onClick={() => navigate('/services')}
                    >
                        View All Services <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
