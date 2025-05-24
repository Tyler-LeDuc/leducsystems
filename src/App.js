import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import Footer from './Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/pricing/PricingPage';
import CareersPage from './pages/CareersPage';
import { initEmailService } from './emailService';
import emailjs from '@emailjs/browser';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  initEmailService('HIVHympEPP7sMQ_Pl');
  emailjs.init("HIVHympEPP7sMQ_Pl");
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header scrolled={scrolled} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
        <Footer />

        {/* CSS for animations */}
        <style>
          {`
            @keyframes morph {
              0% {
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
              }
              25% {
                border-radius: 50% 50% 70% 30% / 50% 50% 30% 70%;
              }
              50% {
                border-radius: 70% 30% 50% 50% / 40% 40% 60% 60%;
              }
              75% {
                border-radius: 30% 70% 60% 40% / 60% 30% 70% 40%;
              }
              100% {
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
              }
            }
            
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
              100% {
                transform: translateY(0px);
              }
            }
            
            .float {
              animation: float 6s ease-in-out infinite;
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .fade-in {
              animation: fadeIn 1s ease-out forwards;
            }
            
            @keyframes gradientBg {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            
            .gradient-animation {
              background-size: 200% 200%;
              animation: gradientBg 10s ease infinite;
            }
          `}
        </style>
      </div>
    </Router>
  );
}

export default App;