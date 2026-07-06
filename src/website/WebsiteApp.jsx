import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import SmoothScroll from './components/SmoothScroll';
import HiringPopup from './components/HiringPopup';
import SparkleEffect from './components/SparkleEffect';
import CookieConsent from './components/CookieConsent';

const WebsiteApp = () => {
    return (
        <div style={{
            fontFamily: "'Merriweather', serif",
            color: '#333',
            width: '100%',
        }}>
            <Navbar />
            <main style={{
                minHeight: '80vh',
                width: '100%',
                maxWidth: '100vw'
            }}>
                <Outlet />
            </main>
            <Footer />
            <WhatsAppWidget />
            <SmoothScroll />
            <HiringPopup />
            <SparkleEffect />
            <CookieConsent />
        </div>
    );
};

export default WebsiteApp;
