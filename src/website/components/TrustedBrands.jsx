import React from 'react';
import './TrustedBrands.css';

const TrustedBrands = () => {
    // Placeholder for logos. In a real scenario, these would be image paths.
    // Since we don't have the specific client logos, we'll use text or placeholders.
    // Repetitive list to ensure smooth infinite loop
    const brands = [
        { name: "Choundeshwari", src: "/Logo/choundeshwari.jpg" },
        { name: "Bite Factory", src: "/Logo/Bite-Factory-Logo.png" },
        { name: "Pravinya", src: "/Logo/Pravinya logo 11.png" },
        { name: "Digi", src: "/Logo/Digi.png" },
        { name: "Swastik", src: "/Logo/Swastik.png" },
        { name: "Raghuvir", src: "/Logo/Raghuvir.png" },
        { name: "NGO", src: "/Logo/NGO.png" },

        // Duplicate for seamless loop
        { name: "Choundeshwari", src: "/Logo/choundeshwari.jpg" },
        { name: "Bite Factory", src: "/Logo/Bite-Factory-Logo.png" },
        { name: "Pravinya", src: "/Logo/Pravinya logo 11.png" },
        { name: "Digi", src: "/Logo/Digi.png" },
        { name: "Swastik", src: "/Logo/Swastik.png" },
        { name: "Raghuvir", src: "/Logo/Raghuvir.png" },
        { name: "NGO", src: "/Logo/NGO.png" }
    ];

    return (
        <section className="trusted-brands-section">
            <div className="trusted-headers">
                <h2 className="trusted-main-title">
                    Top Rated IT Solutions & Software Company
                </h2>
                <h3 className="trusted-sub-title">
                    Trusted by 500+ Industry Leaders
                </h3>
                <div className="trusted-divider"></div>
            </div>

            <div className="logo-marquee-container">
                <div className="logo-marquee-content">
                    {brands.map((brand, index) => (
                        <div key={index} className="brand-logo-item">
                            <img
                                src={brand.src}
                                alt={brand.name}
                                className="brand-logo-img"
                                style={brand.name === 'Srujan' ? { height: '25px' } : {}}
                                onError={(e) => {
                                    e.target.style.display = 'none'; // Hide if image broken
                                    e.target.parentNode.innerHTML = `<span class="brand-placeholder">${brand.name}</span>`;
                                }}
                            />
                        </div>
                    ))}
                </div>
                {/* Duplicate for seamless scrolling if CSS animation is used */}
                <div className="logo-marquee-content" aria-hidden="true">
                    {brands.map((brand, index) => (
                        <div key={`dup-${index}`} className="brand-logo-item">
                            <img
                                src={brand.src}
                                alt={brand.name}
                                className="brand-logo-img"
                                style={brand.name === 'Srujan' ? { height: '25px' } : {}}
                                onError={(e) => {
                                    e.target.style.display = 'none'; // Hide if image broken
                                    e.target.parentNode.innerHTML = `<span class="brand-placeholder">${brand.name}</span>`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBrands;
