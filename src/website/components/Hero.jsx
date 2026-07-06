import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="standard-hero">
            <div className="hero-video-bg">
                <video 
                    muted 
                    loop 
                    playsInline 
                    autoPlay
                    preload="auto"
                    className="hero-video"
                >
                    <source src="/2605193_Abstract_Technology_1920x1080.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-overlay"></div>
            </div>
            
            <div className="container">
                <div className="hero-centered-content">
                    <motion.div
                        className="hero-text-content"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="hero-uptitle">Empowering Digital Excellence</span>
                        <h1 className="hero-main-title">
                            Building the Future with <br />
                            Next-Gen <span className="text-orange">Digital Solutions</span>
                        </h1>
                        <p className="hero-lead-text">
                            AASHA-SM TECHNOLOGIES PRIVATE LIMITED helps businesses grow with custom website development, next-gen AI Automations, scalable software solutions, and strategic IT consulting.
                        </p>
                        <div className="hero-btn-group">
                            <button className="btn-primary" onClick={() => navigate('/services')}>
                                Our Services <ArrowRight size={18} />
                            </button>
                            <button className="btn-outline" onClick={() => navigate('/contact')}>
                                Contact Us
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
