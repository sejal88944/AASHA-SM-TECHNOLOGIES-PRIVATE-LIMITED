import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Menu, X } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase/firestore';
import './Navbar.css';

const Navbar = () => {
    const [services, setServices] = useState([]);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
    const location = useLocation();

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 960);
            if (window.innerWidth > 960) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setShowServicesDropdown(false);
        setShowCompanyDropdown(false);
        setExpandedCategory(null);
    }, [location]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "services"));
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const activeServices = servicesData.filter(service => service.status === 'active');
            setServices(activeServices);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    // Group services by service type - Memoized for performance
    const groupedServices = React.useMemo(() => {
        const grouped = {};
        services.forEach(service => {
            if (!grouped[service.serviceType]) {
                grouped[service.serviceType] = [];
            }
            grouped[service.serviceType].push(service);
        });
        return grouped;
    }, [services]);

    // Handlers
    const handleDropdownEnter = (setter) => {
        if (!isMobile) setter(true);
    };

    const handleDropdownLeave = (setter) => {
        if (!isMobile) setter(false);
    };

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="/ASM Logo.jpeg" alt="AASHA-SM TECHNOLOGIES" style={{ height: '40px', objectFit: 'contain' }} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
                className="mobile-menu-toggle"
                onClick={() => {
                    if (isMobileMenuOpen) {
                        setShowServicesDropdown(false);
                        setShowCompanyDropdown(false);
                        setExpandedCategory(null);
                    }
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-link">Home</Link>

                {/* Company Dropdown */}
                <div
                    className="dropdown-container"
                    onMouseEnter={() => handleDropdownEnter(setShowCompanyDropdown)}
                    onMouseLeave={() => handleDropdownLeave(setShowCompanyDropdown)}
                >
                    <div
                        className="nav-link"
                        onClick={(e) => {
                            if (isMobile) {
                                e.stopPropagation();
                                setShowCompanyDropdown(!showCompanyDropdown);
                            }
                        }}
                    >
                        Company
                        <ChevronDown size={14} className={showCompanyDropdown ? 'rotate-180' : ''} style={{ transition: 'transform 0.2s', marginLeft: '4px' }} />
                    </div>

                    {showCompanyDropdown && (
                        <div className="dropdown-wrapper">
                            <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
                                <Link to="/about" className="dropdown-item">About Us</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Services Dropdown */}
                <div
                    className="dropdown-container"
                    onMouseEnter={() => handleDropdownEnter(setShowServicesDropdown)}
                    onMouseLeave={() => handleDropdownLeave(setShowServicesDropdown)}
                >
                    {(isMobile || isMobileMenuOpen) ? (
                        <div
                            className="nav-link"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowServicesDropdown(!showServicesDropdown);
                            }}
                        >
                            Services
                            {services.length > 0 && <ChevronDown size={14} className={showServicesDropdown ? 'rotate-180' : ''} style={{ transition: 'transform 0.2s', marginLeft: '4px' }} />}
                        </div>
                    ) : (
                        <Link
                            to="/services"
                            className="nav-link"
                        >
                            Services
                            {services.length > 0 && <ChevronDown size={14} className={showServicesDropdown ? 'rotate-180' : ''} style={{ transition: 'transform 0.2s', marginLeft: '4px' }} />}
                        </Link>
                    )}

                    {showServicesDropdown && services.length > 0 && (
                        <div className="dropdown-wrapper">
                            <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>

                                {Object.entries(groupedServices).map(([serviceType, servicesInType]) => {
                                    const firstService = servicesInType[0];

                                    // Single Service in Type
                                    if (servicesInType.length === 1) {
                                        return (
                                            <Link
                                                key={firstService.id}
                                                to={`/services/${firstService.id}`}
                                                className="dropdown-item"
                                            >
                                                {firstService.icon && (
                                                    (firstService.icon.startsWith('http') || firstService.icon.startsWith('/')) ?
                                                        <img src={firstService.icon} alt="icon" width="20" height="20" /> :
                                                        <span style={{ marginRight: '8px' }}>{firstService.icon}</span>
                                                )}
                                                {serviceType}
                                            </Link>
                                        );
                                    }

                                    // Multiple Services (Nested)
                                    const isExpanded = expandedCategory === serviceType;
                                    return (
                                        <div 
                                            key={serviceType} 
                                            className="nested-dropdown-container"
                                            onClick={(e) => {
                                                if (isMobile) {
                                                    e.stopPropagation();
                                                    setExpandedCategory(isExpanded ? null : serviceType);
                                                }
                                            }}
                                        >
                                            <div className="dropdown-item" style={{ justifyContent: 'space-between' }}>
                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                    {firstService.icon && (
                                                        (firstService.icon.startsWith('http') || firstService.icon.startsWith('/')) ?
                                                            <img src={firstService.icon} alt="icon" width="20" height="20" /> :
                                                            <span style={{ marginRight: '8px' }}>{firstService.icon}</span>
                                                    )}
                                                    {serviceType}
                                                </span>
                                                <ChevronRight 
                                                    size={14} 
                                                    color="#9ca3af" 
                                                    className={isExpanded ? 'rotate-90' : ''}
                                                    style={{ transition: 'transform 0.2s' }}
                                                />
                                            </div>

                                            {(!isMobile || isExpanded) && (
                                                <div className="nested-dropdown">
                                                    {servicesInType.map((service) => {
                                                        const cleanTitle = service.title
                                                            .replace(/<[^>]+>/g, '')
                                                            .replace(/&amp;/g, '&')
                                                            .trim();

                                                        return (
                                                            <Link
                                                                key={service.id}
                                                                to={`/services/${service.id}`}
                                                                className="dropdown-item"
                                                            >
                                                                {cleanTitle}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <Link to="/blog" className="nav-link">Blog</Link>
                <Link to="/careers" className="nav-link">Careers</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
        </header>
    );
};

export default Navbar;
