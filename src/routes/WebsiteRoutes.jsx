import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WebsiteApp from '../website/WebsiteApp';
import Home from '../website/pages/Home';
import About from '../website/pages/About';
import Services from '../website/pages/Services';
import ServiceDetail from '../website/pages/ServiceDetail';
import Blog from '../website/pages/Blog';
import BlogDetail from '../website/pages/BlogDetail';
import Contact from '../website/pages/Contact';
import Careers from '../website/pages/Careers';
import NotFound from '../website/pages/NotFound';


import PrivacyPolicy from '../website/pages/PrivacyPolicy';
import TermsOfUse from '../website/pages/TermsOfUse';
import CookiePreferences from '../website/pages/CookiePreferences';

const WebsiteRoutes = () => {
    return (
        <Routes>
            <Route element={<WebsiteApp />}>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />

                <Route path="services/:slug" element={<ServiceDetail />} />

                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogDetail />} />
                <Route path="contact" element={<Contact />} />
                <Route path="careers" element={<Careers />} />

                {/* Legal Pages */}
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfUse />} />
                <Route path="cookies" element={<CookiePreferences />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default WebsiteRoutes;
