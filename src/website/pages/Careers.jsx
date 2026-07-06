import React, { useEffect, useState } from 'react';
import { Bot, MessageSquare, CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import CareerForm from '../components/CareerForm';
import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
import db from '../../firebase/firestore';
import './Careers.css';

const Careers = () => {
    const [drives, setDrives] = useState([]);
    const [showDrives, setShowDrives] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchDrives = async () => {
            try {
                const settingsSnap = await getDoc(doc(db, 'settings', 'test_portal'));
                if (settingsSnap.exists() && settingsSnap.data().showOnWebsite) {
                    const q = query(
                        collection(db, 'tests'),
                        where('isActive', '==', true)
                    );
                    const querySnapshot = await getDocs(q);
                    const activeDrives = [];
                    querySnapshot.forEach((doc) => {
                        activeDrives.push({ id: doc.id, ...doc.data() });
                    });
                    
                    // Sort in memory to avoid index requirements
                    activeDrives.sort((a, b) => {
                        const t1 = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
                        const t2 = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
                        return t2 - t1; // Descending
                    });

                    setDrives(activeDrives);
                    setShowDrives(true);
                }
            } catch (err) {
                console.error("Error fetching drives:", err);
            }
        };
        fetchDrives();
    }, []);

    const techList = [
        { name: 'HTML5', icon: 'html' },
        { name: 'CSS3', icon: 'css' },
        { name: 'JavaScript', icon: 'js' },
        { name: 'React.js', icon: 'react' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'React Native', icon: 'react' },
        { name: 'Flutter', icon: 'flutter' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'Firebase', icon: 'firebase' },
        { name: 'AWS', icon: 'aws' },
        { name: 'WhatsApp API', lucide: <MessageSquare size={20} color="#25D366" /> },
        { name: 'Razorpay', lucide: <CreditCard size={20} color="#3395FF" /> },
        { name: 'AI/ML', lucide: <Bot size={20} color="#F26522" /> },
        { name: 'REST APIs', icon: 'postman' }
    ];

    return (
        <PageTransition>
            <div className="careers-page-wrapper">
                
                {/* Hero Section */}
                <section className="careers-hero">
                    <div className="careers-hero-glow-1"></div>
                    <div className="careers-hero-glow-2"></div>
                    
                    <div className="careers-hero-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="careers-badge"
                        >
                            <div className="careers-badge-dot"></div>
                            Join Our Team
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="careers-title"
                        >
                            Careers
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="careers-subtitle"
                        >
                            Build the future of technology with AASHA-SM TECHNOLOGIES PRIVATE LIMITED. Join our team of innovators and engineers to build custom web systems, CRM/ERP solutions, and next-gen AI Automations.
                        </motion.p>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="tech-stack-section">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-heading"
                    >
                        Technologies We <span className="highlight-text">Work With</span>
                    </motion.h2>
                    
                    <div className="tech-grid">
                        {techList.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="tech-item"
                            >
                                {tech.lucide ? (
                                    tech.lucide
                                ) : (
                                    <img 
                                        src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                                        alt={tech.name} 
                                        className="tech-icon"
                                    />
                                )}
                                <span className="tech-name">
                                    {tech.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Active Internship Drives Section */}
                {showDrives && drives.length > 0 && (
                    <section className="drives-section">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-heading"
                        >
                            Active Internship <span className="highlight-text">Assessment Drives</span>
                        </motion.h2>
                        
                        <div className="drives-grid">
                            {drives.map((drive, idx) => (
                                <motion.div
                                    key={drive.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="drive-card"
                                >
                                    <div>
                                        <h3 className="drive-card-title">{drive.title}</h3>
                                        <div className="drive-card-info">
                                            <span><strong>College:</strong> {drive.college?.name || 'Open Pool'}</span>
                                        </div>
                                        <div className="drive-card-info">
                                            <span><strong>Duration:</strong> {drive.durationMinutes || 30} minutes</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`/test/${drive.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="drive-card-btn"
                                    >
                                        Register & Start Test <ArrowRight size={15} />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Join Our Team Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="application-section"
                >
                    <div className="application-header">
                        <h2 className="application-title">
                            Join Our <span className="highlight-text">Team</span>
                        </h2>
                        <p className="application-desc">
                            If you're excited about making an impact and growing your career with a dynamic, creative team we'd love to hear from you!
                        </p>
                    </div>

                    <div id="apply-form">
                        <CareerForm />
                    </div>
                </motion.section>
            </div>
        </PageTransition>
    );
};

export default Careers;
