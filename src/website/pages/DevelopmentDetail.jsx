import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';
import Loader from '../../admin/components/Loader';

const DevelopmentDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        fetchService();
    }, [slug]);

    // Auto-slide effect (Only for images)
    useEffect(() => {
        if (service && service.portfolioItems && service.portfolioItems.length > 1) {
            const currentItem = service.portfolioItems[selectedImage];

            // Only auto-slide if it's an IMAGE
            if (currentItem.type === 'image') {
                const timer = setTimeout(() => {
                    setSelectedImage(prev => (prev + 1) % service.portfolioItems.length);
                }, 3000); // 3 seconds for images

                return () => clearTimeout(timer);
            }
            // If it's a VIDEO, wait for onEnded event (no timer)
        }
    }, [service, selectedImage]);


    const fetchService = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "developments", slug);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setService({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No such development service!");
                navigate('/developments');
            }
        } catch (error) {
            console.error("Error fetching development:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <Loader />
            </div>
        );
    }

    if (!service) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px'
            }}>
                <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px' }}>
                    Development Not Found
                </h2>
                <button
                    onClick={() => navigate('/developments')}
                    style={{
                        padding: '12px 30px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Back to Developments
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff' }}>
            {/* Hero Section - Service Type, Title, Description */}
            <div style={{
                padding: '80px 5% 60px 5%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <button
                        onClick={() => navigate('/developments')}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                    >
                        ← Back to Developments
                    </button>

                    {/* Service Type Badge */}
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 18px',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        borderRadius: '25px',
                        fontSize: '13px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '20px',
                        marginLeft: '16px',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        {service.serviceType}
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: '56px',
                            fontWeight: '800',
                            marginBottom: '30px',
                            color: 'white',
                            lineHeight: '1.2',
                            textAlign: 'center'
                        }}
                        dangerouslySetInnerHTML={{ __html: service.title }}
                    />

                    {/* Description */}
                    <div
                        style={{
                            fontSize: '20px',
                            color: 'rgba(255,255,255,0.95)',
                            lineHeight: '1.8',
                            maxWidth: '900px',
                            margin: '0 auto',
                            textAlign: 'center'
                        }}
                        dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                </div>
            </div>

            {/* Portfolio Gallery Section */}
            {service.portfolioItems && service.portfolioItems.length > 0 && (
                <div style={{ padding: '30px 5%', background: '#f9fafb' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: '32px',
                            fontWeight: '800',
                            marginBottom: '30px',
                            color: '#1a1a1a',
                            textAlign: 'center'
                        }}>
                            Project Portfolio
                        </h2>

                        {/* Main Image/Video Display */}
                        <div style={{
                            marginBottom: '20px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            background: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {service.portfolioItems[selectedImage].type === 'image' ? (
                                <img
                                    src={service.portfolioItems[selectedImage].url}
                                    alt={`${service.title.replace(/<[^>]+>/g, '')} - Portfolio ${selectedImage + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        display: 'block'
                                    }}
                                />
                            ) : (
                                <video
                                    key={selectedImage}
                                    src={service.portfolioItems[selectedImage].url}
                                    controls
                                    autoPlay
                                    muted
                                    onEnded={() => {
                                        // Auto-play next item when video ends
                                        if (selectedImage < service.portfolioItems.length - 1) {
                                            setSelectedImage(selectedImage + 1);
                                        } else {
                                            // Loop back to first item
                                            setSelectedImage(0);
                                        }
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        display: 'block'
                                    }}
                                />
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {service.portfolioItems.length > 1 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '12px'
                            }}>
                                {service.portfolioItems.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        style={{
                                            position: 'relative',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === index
                                                ? '3px solid #667eea'
                                                : '3px solid transparent',
                                            transition: 'all 0.3s ease',
                                            aspectRatio: '1/1',
                                            background: 'white'
                                        }}
                                        onMouseOver={(e) => {
                                            if (selectedImage !== index) {
                                                e.currentTarget.style.border = '3px solid #e5e7eb';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedImage !== index) {
                                                e.currentTarget.style.border = '3px solid transparent';
                                            }
                                        }}
                                    >
                                        {item.type === 'image' ? (
                                            <img
                                                src={item.url}
                                                alt={`Thumbnail ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <video
                                                    src={item.url}
                                                    muted
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                {/* Play Icon Overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '40px',
                                                    height: '40px',
                                                    background: 'rgba(0,0,0,0.6)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '20px',
                                                    pointerEvents: 'none'
                                                }}>
                                                    ▶
                                                </div>
                                            </>
                                        )}
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '10px',
                                            fontWeight: '600'
                                        }}>
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Specialties Section */}
            {service.specialties && (
                <div style={{ padding: '80px 5%', background: 'white' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: '42px',
                            fontWeight: '800',
                            marginBottom: '40px',
                            color: '#1a1a1a',
                            textAlign: 'center'
                        }}>
                            What We Offer
                        </h2>
                        <div
                            style={{
                                fontSize: '18px',
                                color: '#4b5563',
                                lineHeight: '1.8',
                                maxWidth: '900px',
                                margin: '0 auto'
                            }}
                            dangerouslySetInnerHTML={{ __html: service.specialties }}
                        />
                    </div>
                </div>
            )}

            {/* Work Description Section */}
            {service.workDescription && (
                <div style={{ padding: '80px 5%', background: '#f9fafb' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div
                            style={{
                                fontSize: '18px',
                                color: '#4b5563',
                                lineHeight: '1.8',
                                maxWidth: '900px',
                                margin: '0 auto'
                            }}
                            dangerouslySetInnerHTML={{ __html: service.workDescription }}
                        />
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div style={{
                padding: '80px 5%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textAlign: 'center'
            }}>
                <h2
                    style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '20px'
                    }}
                    dangerouslySetInnerHTML={{ __html: `Interested in ${service.title}?` }}
                />
                <p style={{
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '30px',
                    maxWidth: '600px',
                    margin: '0 auto 30px auto'
                }}>
                    Submit your requirements and let's build something amazing together
                </p>
                <button
                    onClick={() => navigate('/contact')}
                    style={{
                        padding: '16px 40px',
                        background: 'white',
                        color: '#667eea',
                        border: 'none',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                    }}
                >
                    Get in Touch
                </button>
            </div>
            <style>
                {`
                    h1, h2, h3, h4, h5, h6 {
                        font-family: 'Merriweather', serif !important;
                    }
                    p, span, div, li, a {
                        font-family: 'Merriweather', serif;
                    }
                    .rich-text-content {
                        font-family: 'Merriweather', serif !important;
                    }
                    .rich-text-content h1, 
                    .rich-text-content h2, 
                    .rich-text-content h3, 
                    .rich-text-content h4 {
                        font-family: 'Merriweather', serif !important;
                    }
                `}
            </style>
        </div>
    );
};

export default DevelopmentDetail;
