import React, { useState, useEffect } from 'react';
import { commonStyles } from './utils/styles';
import ContactForm from './ContactForm'; // Import the ContactForm component

const Header = ({ scrolled: propScrolled }) => {
  // State for menu, form, scroll position
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(propScrolled || false);
  const [activeLink, setActiveLink] = useState('home');
  const [hoverLink, setHoverLink] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu with animation
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
  };

  // Toggle contact form modal
  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
  };

  // Handle link clicks to set active state
  const handleLinkClick = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Check viewport width
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Inline styles with modern design
  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      padding: scrolled ? '0.6rem 0' : '1rem 0',
      borderBottom: scrolled ? '1px solid rgba(56, 189, 248, 0.2)' : 'none',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      position: 'relative',
      zIndex: 101,
    },
    logoWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      height: scrolled ? '60px' : '80px',
      width: scrolled ? '120px' : '160px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: 0.95,
    },
    logoGlow: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(14, 165, 233, 0) 70%)',
      filter: 'blur(12px)',
      opacity: scrolled ? 0 : 0.7,
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    nav: {
      display: 'flex',
      gap: '2.8rem',
    },
    navLink: {
      color: '#1E293B', // Darker blue-gray for better contrast
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.95rem',
      letterSpacing: '0.5px',
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      padding: '0.5rem 0',
      opacity: 0.85,
    },
    navLinkHover: {
      opacity: 1,
      color: '#0EA5E9', // Bright blue accent
      transform: 'translateY(-2px)', // Subtle lift effect
    },
    navLinkIndicator: {
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, #0EA5E9 0%, #38BDF8 100%)',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      borderRadius: '1px',
      boxShadow: '0 0 8px rgba(14, 165, 233, 0.5)',
    },
    activeNavLink: {
      color: '#0EA5E9', // Bright blue accent
      opacity: 1,
    },
    activeIndicator: {
      transform: 'scaleX(1)',
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '30px',
      height: '20px',
      cursor: 'pointer',
      zIndex: 101,
      position: 'relative',
    },
    hamburgerLine: {
      height: '2px',
      width: '100%',
      backgroundColor: '#1E293B', // Dark blue for hamburger lines
      borderRadius: '2px',
      transition: 'all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    },
    overlay: {
      display: menuOpen ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      zIndex: 90,
      opacity: menuOpen ? 1 : 0,
      transition: 'opacity 0.3s ease',
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      right: menuOpen ? '0%' : '-100%',
      width: '80%',
      height: '100vh',
      background: '#FFFFFF',
      borderLeft: '1px solid rgba(14, 165, 233, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      padding: '5rem 2rem 2rem',
      zIndex: 95,
      transition: 'right 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
    },
    mobileNavLink: {
      display: 'block',
      margin: '0.9rem 0',
      fontSize: '1.4rem',
      color: '#1E293B',
      textDecoration: 'none',
      opacity: 0.85,
      transition: 'all 0.25s ease',
      position: 'relative',
      paddingLeft: '15px',
    },
    mobileActiveLinkIndicator: {
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '22px',
      background: 'linear-gradient(180deg, #0EA5E9 0%, #38BDF8 100%)',
      borderRadius: '2px',
      boxShadow: '0 0 8px rgba(14, 165, 233, 0.5)',
    },
    mobileActiveLinkText: {
      color: '#0EA5E9',
      opacity: 1,
    },
    mobilePattern: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      backgroundSize: '20px 20px',
      opacity: 0.05,
      zIndex: -1,
    },
    hamburgerVisible: {
      display: 'flex',
    },
    transformedBurger1: {
      transform: menuOpen ? 'rotate(45deg) translate(4px, 8px)' : 'none',
      backgroundColor: menuOpen ? '#0EA5E9' : '#1E293B',
    },
    transformedBurger2: {
      opacity: menuOpen ? 0 : 1,
      transform: menuOpen ? 'translateX(-10px)' : 'none',
    },
    transformedBurger3: {
      transform: menuOpen ? 'rotate(-45deg) translate(4px, -8px)' : 'none',
      backgroundColor: menuOpen ? '#0EA5E9' : '#1E293B',
    },
    ctaButton: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.65rem 1.5rem',
      background: buttonHover 
        ? 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)' 
        : 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '0.95rem',
      marginLeft: '1.8rem',
      border: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: buttonHover 
        ? '0 8px 20px rgba(14, 165, 233, 0.4), 0 0 10px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
        : '0 4px 15px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      transform: buttonHover ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      letterSpacing: '0.3px',
    },
    ctaButtonShimmer: {
      position: 'absolute',
      top: '-100%',
      left: '-150%',
      width: '100%',
      height: '300%',
      background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
      transform: 'rotate(25deg)',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: buttonHover ? 1 : 0,
      animation: buttonHover ? 'shimmer 2s infinite' : 'none',
    },
    mobileCta: {
      display: 'block',
      textAlign: 'center',
      padding: '1.1rem',
      margin: '2rem 0 0',
      background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '1.1rem',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 6px 15px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    }
  };

  // Apply mobile styles
  if (isMobile) {
    styles.nav.display = 'none';
    styles.hamburger.display = 'flex';
  }

  return (
    <>
      <header style={styles.header}>
        <div style={{...commonStyles.container, ...styles.headerContainer}}>
          <a href="#home" style={styles.logoContainer} onClick={() => handleLinkClick('home')}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoGlow}></div>
              <img 
                src="/duck-logo.png" 
                alt="Le Duc Systems Logo" 
                style={styles.logoImage} 
              />
            </div>
          </a>
          
          <div style={{display: 'flex', alignItems: 'center'}}>
            <nav style={styles.nav}>
              {['home', 'services', 'about', 'contact'].map(section => (
                <a 
                  key={section}
                  href={`#${section}`} 
                  style={{
                    ...styles.navLink,
                    ...(activeLink === section ? styles.activeNavLink : {}),
                    ...(hoverLink === section ? styles.navLinkHover : {})
                  }}
                  onClick={() => handleLinkClick(section)}
                  onMouseEnter={() => setHoverLink(section)}
                  onMouseLeave={() => setHoverLink(null)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <div 
                    style={{
                      ...styles.navLinkIndicator,
                      ...(activeLink === section || hoverLink === section ? styles.activeIndicator : {})
                    }}
                  ></div>
                </a>
              ))}
            </nav>
            
            <a 
              href="#" 
              style={styles.ctaButton}
              onClick={(e) => {
                e.preventDefault();
                toggleContactForm();
              }}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              <div style={styles.ctaButtonShimmer}></div>
              Get Started
            </a>
            
            <div 
              style={{...styles.hamburger, ...(isMobile ? styles.hamburgerVisible : {})}} 
              onClick={toggleMenu}
            >
              <div style={{...styles.hamburgerLine, ...styles.transformedBurger1}}></div>
              <div style={{...styles.hamburgerLine, ...styles.transformedBurger2}}></div>
              <div style={{...styles.hamburgerLine, ...styles.transformedBurger3}}></div>
            </div>
          </div>
          
          <div style={styles.overlay} onClick={toggleMenu}></div>
          
          <div style={styles.mobileMenu}>
            <div style={styles.mobilePattern}></div>
            
            {['home', 'about', 'services', 'contact'].map(section => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{
                  ...styles.mobileNavLink,
                  ...(activeLink === section ? styles.mobileActiveLinkText : {})
                }}
                onClick={() => handleLinkClick(section)}
              >
                {activeLink === section && <div style={styles.mobileActiveLinkIndicator}></div>}
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            
            <a 
              href="#" 
              style={styles.mobileCta} 
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                toggleContactForm();
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Integrated ContactForm Component */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
        recipientEmail="Tyler.a.leduc@gmail.com"
      />
    </>
  );
};

export default Header;