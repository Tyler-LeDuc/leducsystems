import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';

function App() {
  const [scrolled, setScrolled] = useState(false);
  
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
    <div className="App">
      <Header scrolled={scrolled} />
      <Hero />
      <Services />
      <About />
      <Contact />
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
  );
}

export default App;