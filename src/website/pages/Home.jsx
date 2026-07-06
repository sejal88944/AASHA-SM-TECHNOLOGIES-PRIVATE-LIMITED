import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import SolutionsGrid from '../components/SolutionsGrid';
import AboutSection from '../components/AboutSection';
import FAQContactSection from '../components/FAQContactSection';
import ProcessSection from '../components/ProcessSection';

import PageTransition from '../components/PageTransition';

import './Home.css';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <div className="home-page-wrapper">
                <Hero />
                <SolutionsGrid />
                <AboutSection />
                <ProcessSection />
                <FAQContactSection />
            </div>
        </PageTransition>
    );
};

export default Home;
