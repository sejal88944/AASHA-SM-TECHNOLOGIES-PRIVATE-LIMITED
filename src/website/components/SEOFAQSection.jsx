import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SEOFAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "What is SEO?",
            answer: "SEO, or Search Engine Optimization, is the process of improving a website’s visibility on search engines like Google, Bing, and Yahoo! By optimizing your site for relevant keywords, content, and user experience, you increase its chances of ranking higher in search engine results, which can drive more organic traffic to your website."
        },
        {
            question: "What services does AASHA-SM TECHNOLOGIES provide?",
            answer: "Our team offers a full range of services, including keyword research, on-page optimization, technical SEO, content creation, link building, local SEO, and ongoing performance tracking. We customize each SEO campaign based on your business goals and industry."
        },
        {
            question: "How long does it take to see results from SEO?",
            answer: "SEO is a long-term strategy, and while some improvements can be seen in the first few months, significant results typically take 3 to 6 months. The timeline varies based on your website’s current status, competition, and targeted keywords."
        },
        {
            question: "How do you determine the best keywords for my business?",
            answer: "We conduct thorough keyword research using tools like Google Keyword Planner, Ahrefs, and SEMrush. Our team analyzes search volume, competition, and relevance to identify the most valuable keywords that will drive traffic and conversions for your business."
        },
        {
            question: "What is the difference between on-page and off-page SEO?",
            answer: "On-page SEO refers to optimizations made directly on your website, such as improving content quality, optimizing meta tags, and ensuring proper keyword usage. Off-page SEO involves activities outside of your website, such as building high-quality backlinks, social media promotion, and guest blogging to increase your site’s authority and rankings."
        },
        {
            question: "Do you offer local SEO services?",
            answer: "Yes, we specialize in local SEO, helping businesses improve their visibility in location-based searches. We optimize your Google My Business profile, build local citations, and use location-specific keywords to help you attract more customers in your area."
        },
        {
            question: "What makes your SEO agency different from others?",
            answer: "Our agency stands out by offering personalized SEO strategies tailored to each client’s unique needs. We focus on transparency, providing regular reports and clear communication. Our team stays updated with the latest SEO trends and algorithms to ensure your website maintains its competitive edge."
        },
        {
            question: "Can I do SEO on my own, or should I hire a professional?",
            answer: "While it's possible to handle basic SEO on your own, hiring an SEO professional or agency can be beneficial for achieving better results, especially in competitive markets. SEO experts have the knowledge, tools, and experience to develop effective strategies that can help your website rank higher and perform better."
        },
        {
            question: "Will you provide regular reports on the campaign's progress?",
            answer: "Absolutely! We provide detailed monthly reports that outline the progress of your SEO campaign. These reports include keyword rankings, traffic analysis, backlink updates, and actionable insights to ensure you understand the performance and results."
        },
        {
            question: "Can you help recover my website from a Google penalty?",
            answer: "Yes, we have experience in recovering websites from Google penalties, whether due to algorithm updates or manual actions. We conduct a full site audit to identify the issue, remove harmful links or content, and implement a recovery plan to restore your rankings."
        },
        {
            question: "Do you follow ethical SEO practices?",
            answer: "Yes, we strictly adhere to ethical SEO practices, often referred to as “white hat SEO.” We focus on long-term strategies that align with search engine guidelines, avoiding shortcuts or manipulative tactics that could harm your website’s rankings."
        },
        {
            question: "Can your SEO services help increase my sales?",
            answer: "Yes, our goal is to not only improve your website’s rankings but also increase traffic that converts into leads and sales. By driving targeted traffic through effective SEO, we help businesses grow their customer base and revenue."
        }
    ];

    return (
        <div style={{ padding: '80px 5%', background: '#F9FAFB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '50px',
                    color: '#333'
                }}>
                    SEO Frequently Asked Questions
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                style={{
                                    background: 'white',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                                }}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '20px 30px',
                                        background: isOpen ? '#f8fafc' : 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: 'var(--secondary)',
                                        transition: 'background 0.3s ease'
                                    }}
                                >
                                    {item.question}
                                    {isOpen ? (
                                        <ChevronUp size={20} color="#64748b" />
                                    ) : (
                                        <ChevronDown size={20} color="#64748b" />
                                    )}
                                </button>
                                <div style={{
                                    height: isOpen ? 'auto' : '0',
                                    opacity: isOpen ? 1 : 0,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease-in-out',
                                    background: 'white'
                                }}>
                                    <p style={{
                                        padding: '0 30px 25px 30px',
                                        color: '#475569',
                                        lineHeight: '1.6',
                                        margin: 0,
                                        fontSize: '15px'
                                    }}>
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SEOFAQSection;
