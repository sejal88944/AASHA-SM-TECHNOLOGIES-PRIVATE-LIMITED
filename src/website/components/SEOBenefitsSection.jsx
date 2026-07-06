import React, { useState } from 'react';
import { Share2, Castle, Users, Search, FileText } from 'lucide-react';

const SEOBenefitsSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            title: "Ranking Importance",
            icon: <Share2 size={24} />,
            progressLabel: "Increase Ranking",
            progressValue: 95,
            content: [
                {
                    title: "1. Increased Visibility",
                    text: "Websites on the first page of search results get the majority of clicks. A higher ranking boosts your visibility, helping you reach a wider audience."
                },
                {
                    title: "2. Drives Organic Traffic",
                    text: "Higher rankings lead to more organic traffic, meaning users find your website naturally through searches. This traffic is more valuable since users are actively seeking the products or services you offer."
                },
                {
                    title: "3. Builds Trust and Credibility",
                    text: "Websites that rank at the top are often perceived as more credible and trustworthy by users. High-ranking sites benefit from stronger brand authority and recognition."
                },
                {
                    title: "4. Competitive Advantage",
                    text: "Ranking higher than your competitors gives you an edge. It increases your chances of capturing potential customers before they find your competitors' websites."
                },
                {
                    title: "5. Improves Conversion Rates",
                    text: "With better rankings, you're likely to attract more qualified visitors who are ready to convert, leading to higher sales and business growth."
                }
            ]
        },
        {
            id: 1,
            title: "Effective SEO Strategy For Business Growth",
            icon: <Castle size={24} />,
            progressLabel: "Effective strategy",
            progressValue: 91,
            content: [
                {
                    title: "1. Keyword Research and Optimization",
                    text: "Begin with thorough keyword research to identify the terms your target audience uses to search for your products or services. Use tools like Google Keyword Planner or Ahrefs to find relevant keywords with good search volume and manageable competition. Incorporate these keywords naturally into your content, meta tags, and headers."
                },
                {
                    title: "2. High-Quality Content Creation",
                    text: "Content is the backbone of any SEO strategy. Focus on creating valuable, informative, and engaging content that answers your audience's questions. Regularly update your blog with articles, guides, and infographics."
                },
                {
                    title: "3. Onsite Optimization",
                    text: "Ensure that all technical aspects of your site are optimized. This includes improving page load speed, optimizing images, ensuring mobile-friendliness, and using clear and concise URLs."
                },
                {
                    title: "4. Link Building",
                    text: "Building backlinks from reputable websites is essential to establish your domain authority. Use techniques like guest posting, broken link building, and content promotion to earn high-quality backlinks."
                },
                {
                    title: "5. User Experience (UX) Optimization",
                    text: "Search engines prioritize websites that provide a seamless user experience. Make sure your website is easy to navigate, has a clean design, and loads quickly."
                }
            ]
        },
        {
            id: 2,
            title: "How To Bring Visitors To Your Website",
            icon: <Users size={24} />,
            progressLabel: "Visitors",
            progressValue: 93,
            content: [
                {
                    title: "1. Optimize for Target Keywords",
                    text: "One of the first steps to bringing visitors is optimizing your site for the right keywords. Conduct in-depth keyword research to understand what terms your target audience is using."
                },
                {
                    title: "2. Leverage Social Media Platforms",
                    text: "Social media is a powerful tool for driving traffic. Share your content across platforms like Facebook, Instagram, LinkedIn, and Twitter to engage with a broader audience."
                },
                {
                    title: "3. Optimize for Mobile Users",
                    text: "With more people using smartphones to browse the internet, ensuring your website is mobile-friendly is essential. Optimize your design for smaller screens to keep visitors engaged."
                },
                {
                    title: "4. Use Engaging Calls to Action (CTAs)",
                    text: "A strong call to action can convert visitors into engaged users. Encourage visitors to sign up for newsletters, download free resources, or explore more content."
                },
                {
                    title: "5. Regularly Update Content",
                    text: "Outdated content can reduce your site's appeal and ranking. Regularly update your blog posts, landing pages, and other content to reflect the latest trends and data."
                },
                {
                    title: "6. Utilize Google Analytics for Insights",
                    text: "Monitor your website traffic using Google Analytics. It provides valuable insights into visitor behavior, such as where your traffic is coming from and what pages are popular."
                }
            ]
        },
        {
            id: 3,
            title: "Major Search Engines: How They Shape Online Visibility",
            icon: <Search size={24} />,
            progressLabel: "Major Search Engines",
            progressValue: 98,
            content: [
                {
                    title: "1. Google",
                    text: "Google is by far the most dominant search engine, commanding over 90% of the global search market. Known for its powerful algorithms and focus on user experience, Google continuously refines its search results to deliver the most relevant content."
                },
                {
                    title: "2. Bing",
                    text: "Bing, owned by Microsoft, holds the second-largest market share after Google. Although smaller, Bing is still a significant player, especially in certain regions and industries. It offers unique features like image search and video preview."
                },
                {
                    title: "3. Yahoo!",
                    text: "Although powered by Bing's search engine technology, Yahoo! remains a popular search platform, particularly in the U.S. market. Many users still trust Yahoo! for its comprehensive approach to news, finance, and entertainment content."
                }
            ]
        },
        {
            id: 4,
            title: "Understanding Search Results: How They Impact Your SEO",
            icon: <FileText size={24} />,
            progressLabel: "Search Results",
            progressValue: 98,
            content: [
                {
                    title: "1. Organic Search Results",
                    text: "Organic search results are the unpaid listings that appear because they are deemed most relevant to the search query. These results are based on a website's SEO efforts."
                },
                {
                    title: "2. Paid Search Results",
                    text: "Paid search results, also known as pay-per-click (PPC) ads, appear at the top of search engine result pages (SERPs). Advertisers bid on keywords to have their ads displayed."
                },
                {
                    title: "3. Featured Snippets",
                    text: "Featured snippets are short, highlighted answers that appear at the top of the search results, often referred to as 'Position Zero'. They provide direct answers to user queries."
                },
                {
                    title: "4. Local Search Results",
                    text: "Local search results are essential for businesses targeting customers in specific locations. These results often include a map and business listings."
                },
                {
                    title: "5. Image and Video Search Results",
                    text: "Search engines also display images and videos in search results, especially for queries that benefit from visual content. Optimizing your multimedia content helps capture this traffic."
                }
            ]
        }
    ];

    const tags = ["SEO", "Page Rank", "Backlink", "keyword", "Traffic", "Research"];

    return (
        <div style={{ background: 'var(--secondary)', padding: '80px 5%', fontFamily: "'Merriweather', serif", color: 'white' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '60px', gap: '30px' }}>
                    <div>
                        <span style={{ color: '#6366f1', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', display: 'block', marginBottom: '10px' }}>
                            WHAT WE OFFER
                        </span>
                        <h2 style={{ fontSize: '42px', fontWeight: '800', maxWidth: '600px', lineHeight: '1.2' }}>
                            WHY SEO IS BENEFICIAL TO YOUR BUSINESS?
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                        {tags.map((tag, i) => (
                            <div key={i} style={{
                                border: '1px solid #334155',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                textAlign: 'center',
                                color: '#cbd5e1',
                                background: 'rgba(255,255,255,0.02)'
                            }}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Interactive Section */}
                <div style={{ display: 'flex', gap: '40px', flexDirection: 'row', flexWrap: 'wrap' }}>

                    {/* Left Sidebar (Tabs) */}
                    <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === index;
                            const isLast = index === tabs.length - 1;
                            const isFirst = index === 0;

                            return (
                                <div
                                    key={tab.id}
                                    onClick={() => setActiveTab(index)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                        padding: '30px 25px',
                                        cursor: 'pointer',
                                        background: isActive ? 'linear-gradient(90deg, var(--accent) 0%, var(--accent) 100%)' : 'rgba(255,255,255,0.03)',
                                        border: '1px solid #334155',
                                        borderBottom: isLast ? '1px solid #334155' : 'none',
                                        borderRadius: isFirst ? '20px 20px 0 0' : isLast ? '0 0 20px 20px' : '0',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ flexShrink: 0 }}>
                                        {React.cloneElement(tab.icon, { color: 'white', size: 28 })}
                                    </div>
                                    <span style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1.4' }}>
                                        {tab.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Content Area */}
                    <div style={{
                        flex: '2',
                        minWidth: '300px',
                        background: 'var(--secondary)',
                        borderRadius: '20px',
                        padding: '50px',
                        border: '1px solid #334155',
                        position: 'relative'
                    }}>
                        <div style={{ marginBottom: '60px' }}>
                            {tabs[activeTab].content.map((item, i) => (
                                <div key={i} style={{ marginBottom: '25px' }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'white' }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Progress Bar Footer */}
                        <div style={{ marginTop: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>{tabs[activeTab].progressLabel}</span>
                                <div style={{
                                    background: 'white',
                                    color: 'var(--secondary)',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    position: 'relative'
                                }}>
                                    {tabs[activeTab].progressValue}%
                                    {/* Small arrow for tooltip effect */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-4px',
                                        left: '50%',
                                        transform: 'translateX(-50%) rotate(45deg)',
                                        width: '8px',
                                        height: '8px',
                                        background: 'white'
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${tabs[activeTab].progressValue}%`,
                                    height: '100%',
                                    background: 'var(--accent)',
                                    borderRadius: '10px',
                                    transition: 'width 1s ease-in-out'
                                }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SEOBenefitsSection;
