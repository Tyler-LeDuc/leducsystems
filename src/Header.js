import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { commonStyles } from './utils/styles';
import ContactForm from './ContactForm';

const Header = ({ scrolled: propScrolled }) => {
  // State for menu, form, scroll position
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(propScrolled || false);
  const [activeLink, setActiveLink] = useState('home');
  const [hoverLink, setHoverLink] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);
  
  const location = useLocation();

  // Set active link based on current path
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveLink('home');
    } else {
      const path = location.pathname.substring(1).split('/')[0];
      setActiveLink(path);
    }
  }, [location]);

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
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsNarrowScreen(window.innerWidth <= 600); // For full-width mobile menu
      
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [menuOpen]);

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
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      padding: isMobile ? '0 1rem' : '0 3rem',
      boxSizing: 'border-box',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      position: 'relative',
      zIndex: menuOpen && isNarrowScreen ? 96 : 101, // Lower z-index when menu is open on narrow screens
    },
    logoWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: 0.95,
      position: 'relative',
      zIndex: 2,
    },
    logoGlow: {
      position: 'absolute',
      top: '50%',
      left: '30px', // Center the glow on the duck icon
      transform: 'translate(-50%, -50%)',
      width: scrolled ? '80px' : '100px',
      height: scrolled ? '80px' : '100px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, rgba(59, 130, 246, 0) 70%)',
      filter: 'blur(20px)',
      opacity: scrolled ? 0.5 : 0.8,
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none',
    },
    nav: {
      display: isMobile ? 'none' : 'flex',
      gap: '2rem',
      marginRight: '2rem',
    },
    navLink: {
      color: '#334155', // Darker slate for better contrast
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.5px',
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      padding: '0.5rem 0.75rem',
      opacity: 0.85,
    },
    navLinkHover: {
      opacity: 1,
      color: '#3B82F6', // Primary blue accent
      transform: 'translateY(-2px)', // Subtle lift effect
    },
    navLinkIndicator: {
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, #3B82F6 0%, #0EA5E9 100%)',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      borderRadius: '1px',
      boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
    },
    activeNavLink: {
      color: '#3B82F6', // Primary blue accent
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
      zIndex: 103, // Always higher than mobile menu
      position: 'relative',
    },
    hamburgerLine: {
      height: '2px',
      width: '100%',
      backgroundColor: '#334155', // Slate for hamburger lines
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
      right: 0,
      transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
      width: '280px',
      maxWidth: '85%',
      height: '100vh',
      background: '#FFFFFF',
      borderLeft: '1px solid rgba(14, 165, 233, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      padding: '4rem 1.5rem 2rem',
      zIndex: 102, // Higher z-index to cover header logo when needed
      transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
      overflowY: 'auto',
      overflowX: 'hidden',
      visibility: menuOpen ? 'visible' : 'hidden',
    },
    mobileNavLink: {
      display: 'block',
      margin: '0.6rem 0',
      fontSize: '1.1rem',
      color: '#334155',
      textDecoration: 'none',
      opacity: 0.85,
      transition: 'all 0.25s ease',
      position: 'relative',
      textAlign: 'left',
      padding: '0.4rem 0',
    },
    mobileActiveLinkIndicator: {
      position: 'absolute',
      left: '-10px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '3px',
      height: '18px',
      background: 'linear-gradient(180deg, #3B82F6 0%, #0EA5E9 100%)',
      borderRadius: '2px',
      boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
    },
    mobileActiveLinkText: {
      color: '#3B82F6',
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
      backgroundColor: menuOpen ? '#3B82F6' : '#334155',
    },
    transformedBurger2: {
      opacity: menuOpen ? 0 : 1,
      transform: menuOpen ? 'translateX(-10px)' : 'none',
    },
    transformedBurger3: {
      transform: menuOpen ? 'rotate(-45deg) translate(4px, -8px)' : 'none',
      backgroundColor: menuOpen ? '#3B82F6' : '#334155',
    },
    ctaButton: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem 2rem',
      background: buttonHover 
        ? 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' 
        : 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '1rem',
      marginLeft: '1rem',
      border: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: buttonHover 
        ? '0 8px 20px rgba(59, 130, 246, 0.4), 0 0 10px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
        : '0 4px 15px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
      padding: '0.8rem',
      margin: '1.5rem 0 0',
      background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '0.95rem',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 6px 15px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    },
    mobileLogoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '1.5rem',
      borderBottom: '1px solid rgba(14, 165, 233, 0.1)',
      paddingBottom: '1rem',
      width: '100%',
    }
  };

  // Apply mobile styles
  if (isMobile) {
    styles.nav.display = 'none';
    styles.hamburger.display = 'flex';
  }

  // Navigation links definition
  const navLinks = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'services', path: '/services', label: 'Services' },
    { id: 'pricing', path: '/pricing', label: 'Pricing' },
    { id: 'careers', path: '/careers', label: 'Careers' },
    { id: 'about', path: '/about', label: 'About' },
    { id: 'contact', path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        width: '100%',
      }}>
        {/* Phone bar */}
        <div style={{
          background: '#1A1F2E',
          color: '#FFFFFF',
          padding: '0.25rem 0',
          fontSize: '0.75rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <a 
            href="tel:+14804149516" 
            style={{
              color: '#FBBF24',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call: (480) 414-9516
          </a>
        </div>
        
        {/* Main header */}
        <header style={styles.header}>
          <div style={styles.headerContainer}>
          <Link to="/" style={styles.logoContainer} onClick={() => handleLinkClick('home')}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoGlow}></div>
              <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                <img 
                  src="/duck-icon.png" 
                  alt="Le Duc Systems Duck Icon" 
                  style={{
                    ...styles.logoImage,
                    height: scrolled ? '60px' : '80px', 
                    width: 'auto', 
                    marginRight: '12px',
                    filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3))'
                  }} 
                />
                <div style={{
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: scrolled ? '1.5rem' : '1.8rem',
                  letterSpacing: '0.5px',
                  lineHeight: 1.2,
                  textShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '2px'
                }}>
                  <div>Le Duc</div>
                  <div>Systems</div>
                </div>
              </div>
            </div>
          </Link>
          
          <div style={{display: 'flex', alignItems: 'center'}}>
            <nav style={styles.nav}>
              {navLinks.map(link => (
                <Link 
                  key={link.id}
                  to={link.path}
                  style={{
                    ...styles.navLink,
                    ...(activeLink === link.id ? styles.activeNavLink : {}),
                    ...(hoverLink === link.id ? styles.navLinkHover : {})
                  }}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => setHoverLink(link.id)}
                  onMouseLeave={() => setHoverLink(null)}
                >
                  {link.label}
                  <div 
                    style={{
                      ...styles.navLinkIndicator,
                      ...(activeLink === link.id || hoverLink === link.id ? styles.activeIndicator : {})
                    }}
                  ></div>
                </Link>
              ))}
            </nav>
            
            
            <button 
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
            </button>
            
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
            
            <div style={styles.mobileLogoContainer}>
              <img 
                src="/duck-icon.png" 
                alt="Le Duc Systems Duck Icon" 
                style={{height: '50px', width: 'auto', marginRight: '8px'}} 
              />
              <div style={{
                fontWeight: 700, 
                color: '#1A365D',
                fontSize: '1.2rem',
                letterSpacing: '0.3px',
                lineHeight: 1.2,
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '2px'
              }}>
                <div>Le Duc</div>
                <div>Systems</div>
              </div>
            </div>
            
            {navLinks.map(link => (
              <Link 
                key={link.id}
                to={link.path}
                style={{
                  ...styles.mobileNavLink,
                  ...(activeLink === link.id ? styles.mobileActiveLinkText : {})
                }}
                onClick={() => handleLinkClick(link.id)}
              >
                {activeLink === link.id && <div style={styles.mobileActiveLinkIndicator}></div>}
                {link.label}
              </Link>
            ))}
            
            <button 
              style={styles.mobileCta} 
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                toggleContactForm();
              }}
            >
              Get Started
            </button>
          </div>
          </div>
        </header>
      </div>

      {/* Integrated ContactForm Component */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
      />
    </>
  );
};

export default Header;