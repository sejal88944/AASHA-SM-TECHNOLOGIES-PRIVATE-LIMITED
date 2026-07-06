import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Layout, Code, Settings, LifeBuoy, Rocket, ChevronRight } from 'lucide-react';
import './ProcessSection.css';

const ProcessSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    const steps = [
        {
            icon: <ClipboardList size={32} strokeWidth={2} />,
            title: "Analysis",
            color: "#F26522",
            desc: "Thorough requirement gathering to align technology with your business objectives. We analyze user personas, define project scopes, and eliminate potential roadblocks early.",
            deliverables: ["Scope Definition", "Feasibility Analysis", "Tech Stack Selection"]
        },
        {
            icon: <Layout size={32} strokeWidth={2} />,
            title: "Strategy",
            color: "#FF9800",
            desc: "Architecting scalable digital systems and user-centric designs. We map wireframes, establish branding guidelines, and design high-fidelity interactive mockups.",
            deliverables: ["UI/UX Prototyping", "System Architecture", "Resource Mapping"]
        },
        {
            icon: <Code size={32} strokeWidth={2} />,
            title: "Development",
            color: "#2196F3",
            desc: "Agile engineering using modern frameworks and standard coding practices. We focus on clean code, responsive layouts, API integrations, and optimal performance.",
            deliverables: ["Agile Development", "API Integrations", "Security Setup"]
        },
        {
            icon: <Settings size={32} strokeWidth={2} />,
            title: "Deployment",
            color: "#4CAF50",
            desc: "Continuous integration and optimization for a smooth launch. We perform cross-browser testing, configure cloud servers, and apply SEO/speed optimizations.",
            deliverables: ["CI/CD Automation", "SEO & Speed Audit", "Cloud Go-Live"]
        },
        {
            icon: <LifeBuoy size={32} strokeWidth={2} />,
            title: "Support",
            color: "#9C27B0",
            desc: "Proactive maintenance, backups, and support to ensure system uptime. We monitor application health, apply security updates, and deliver feature enhancements.",
            deliverables: ["24/7 Monitoring", "Daily Backups", "Continuous Updates"]
        }
    ];

    const currentStep = steps[activeTab];

    return (
        <section className="roadmap-section">
            {/* Ambient Background Glows */}
            <div className="roadmap-bg-glow-1"></div>
            <div className="roadmap-bg-glow-2"></div>
            
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="process-header">
                    <motion.div
                        className="roadmap-tag-container"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="dot"></span>
                        <span className="roadmap-tag">OUR ROADMAP</span>
                        <span className="dot"></span>
                    </motion.div>
                    
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Our Process, Your Success
                    </motion.h2>
                    
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Click through the steps below to see how we turn your vision into reality.
                    </motion.p>
                </div>

                {/* Interactive Dashboard Layout */}
                <div className="stepper-dashboard">
                    {/* Top Tab Bar */}
                    <div className="stepper-tabs">
                        {steps.map((step, index) => {
                            const isActive = activeTab === index;
                            return (
                                <button
                                    key={index}
                                    className={`stepper-tab-btn ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveTab(index)}
                                    style={{
                                        '--accent-color': step.color,
                                        '--accent-color-15': `${step.color}15`
                                    }}
                                >
                                    <div className="tab-num">0{index + 1}</div>
                                    <div className="tab-title">{step.title}</div>
                                    {isActive && (
                                        <motion.div 
                                            className="active-indicator" 
                                            layoutId="activeTabIndicator"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Content Card Panel */}
                    <div className="stepper-content-panel">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="stepper-card-grid"
                                style={{ '--accent-color': currentStep.color }}
                            >
                                {/* Left Info Details */}
                                <div className="stepper-card-info">
                                    <div className="stepper-icon-circle" style={{ background: `${currentStep.color}15`, color: currentStep.color }}>
                                        {currentStep.icon}
                                    </div>
                                    
                                    <div className="step-badge" style={{ background: `${currentStep.color}15`, color: currentStep.color }}>
                                        Step 0{activeTab + 1}
                                    </div>
                                    
                                    <h3 className="active-step-heading">{currentStep.title}</h3>
                                    
                                    <p className="active-step-desc">{currentStep.desc}</p>
                                </div>

                                {/* Right Deliverables List */}
                                <div className="stepper-card-deliverables">
                                    <h4 className="deliverables-heading">Key Focus & Deliverables</h4>
                                    <ul className="deliverables-list">
                                        {currentStep.deliverables.map((item, idx) => (
                                            <motion.li 
                                                key={idx}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="deliverable-item"
                                            >
                                                <div className="check-bullet" style={{ background: currentStep.color }}>
                                                    <ChevronRight size={14} color="#090d16" strokeWidth={3} />
                                                </div>
                                                <span>{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.div 
                    className="roadmap-footer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="footer-icon">
                        <Rocket size={32} />
                    </div>
                    <p>Ready to launch your project?</p>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSection;
