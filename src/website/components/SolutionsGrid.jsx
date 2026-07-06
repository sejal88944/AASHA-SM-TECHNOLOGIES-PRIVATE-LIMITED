import React from 'react';
import { motion } from 'framer-motion';
import { 
    Globe, 
    Code, 
    MessageSquare, 
    Smartphone, 
    CreditCard, 
    Cpu, 
    ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SolutionsGrid.css';

const solutions = [
    {
        title: "Custom Websites",
        description: "Modern, SEO-friendly, and high-performance websites built for your brand.",
        icon: <Globe size={28} />,
        color: "#F26522",
        video: "/0_Web_Page_Website_3840x2160.mp4#t=1"
    },
    {
        title: "Custom Software",
        description: "Specialized CRM, HRM, and ERP solutions tailored to your unique business workflows.",
        icon: <Code size={28} />,
        color: "#1a1a1a",
        video: "/0_Data_Analytics_1280x720.mp4#t=1"
    },
    {
        title: "WhatsApp API",
        description: "Automated Chatbots & Bulk messaging campaigns for seamless communication.",
        icon: <MessageSquare size={28} />,
        color: "#F26522",
        video: "/0_Whatsapp_Messenger_1280x720.mp4#t=1"
    },
    {
        title: "Mobile Applications",
        description: "Native and cross-platform mobile apps for Android and iOS devices.",
        icon: <Smartphone size={28} />,
        color: "#1a1a1a",
        video: "/WhatsApp Video 2026-05-06 at 6.04.03 PM.mp4#t=1"
    },
    {
        title: "Payment Gateways",
        description: "Secure and seamless payment integration for your e-commerce platform.",
        icon: <CreditCard size={28} />,
        color: "#F26522",
        video: "/WhatsApp Video 2026-05-06 at 6.57.04 PM.mp4#t=1"
    },
    {
        title: "AI Automations",
        description: "Smart AI-driven automation to enhance efficiency and reduce manual work.",
        icon: <Cpu size={28} />,
        color: "#1a1a1a",
        video: "/WhatsApp Video 2026-05-06 at 6.57.07 PM.mp4#t=1"
    }
];

const SolutionCard = ({ item, index, navigate }) => {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        // No initialization needed, reduces initial load
    }, []);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.log("Video play interrupted", err));
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <motion.div 
            className={`solution-card ${item.video ? 'has-video' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
                scale: 1.03, 
                y: -10,
                transition: { duration: 0.3 }
            }}
            onClick={() => navigate('/services')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
        >
            {item.video && (
                <video 
                    ref={videoRef}
                    className="card-video-bg"
                    src={item.video}
                    loop 
                    muted 
                    playsInline
                    preload="metadata"
                />
            )}
            {item.video && <div className="card-video-overlay"></div>}
            
            <motion.div 
                className="card-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                {item.icon}
            </motion.div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
            <div className="card-footer">
                <motion.span 
                    className="learn-more"
                    whileHover={{ x: 5 }}
                >
                    Get Started <ArrowRight size={16} />
                </motion.span>
            </div>
            <div className="hover-glow"></div>
        </motion.div>
    );
};

const SolutionsGrid = () => {
    const navigate = useNavigate();
    return (
        <section className="solutions-section">
            <div className="container">
                <div className="section-header">
                    <motion.span 
                        className="section-tag"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2 
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Advanced Tech Solutions for <span className="text-orange">Modern Business</span>
                    </motion.h2>
                    <motion.p 
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        We specialize in building scalable digital products, smart AI Automations, and customized workflows to keep you ahead of the competition.
                    </motion.p>
                </div>

                <div className="solutions-grid">
                    {solutions.map((item, index) => (
                        <SolutionCard 
                            key={index} 
                            item={item} 
                            index={index} 
                            navigate={navigate} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};



export default SolutionsGrid;
