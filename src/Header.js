import React, { useState, useEffect } from 'react';
import { commonStyles } from './utils/styles';

const Header = ({ scrolled: propScrolled }) => {
  // State for menu, form, scroll position
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(propScrolled || false);
  const [activeLink, setActiveLink] = useState('home');
  const [hoverLink, setHoverLink] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    employees: '',
    requirements: '',
    email: '',
    phone: ''
  });
  const [buttonHover, setButtonHover] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    document.body.style.overflow = !contactFormOpen ? 'hidden' : 'auto';
  };

  // Handle link clicks to set active state
  const handleLinkClick = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setFormSubmitted(false);
      setContactFormOpen(false);
      document.body.style.overflow = 'auto';
      setFormData({
        name: '',
        company: '',
        employees: '',
        requirements: '',
        email: '',
        phone: ''
      });
    }, 3000);
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
    },
    // Contact form overlay styles
    contactFormOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.97)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: contactFormOpen ? 1 : 0,
      transform: contactFormOpen ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      visibility: contactFormOpen ? 'visible' : 'hidden',
    },
    formWrapper: {
      width: '90%',
      maxWidth: '650px',
      padding: '2.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.97)',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(14, 165, 233, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      transform: contactFormOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: contactFormOpen ? '0.1s' : '0s',
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1E293B',
      marginBottom: '0.8rem',
      textAlign: 'center',
      position: 'relative',
    },
    formSubtitle: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#64748B',
      marginBottom: '2rem',
      textAlign: 'center',
      maxWidth: '80%',
      margin: '0 auto 2.5rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
      position: 'relative',
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#334155',
      transition: 'all 0.3s ease',
    },
    formInput: {
      display: 'block',
      width: '100%',
      padding: '0.8rem 1rem',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid rgba(203, 213, 225, 0.8)',
      background: '#FFFFFF',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      outline: 'none',
    },
    formInputFocus: {
      border: '1px solid #38BDF8',
      boxShadow: '0 0 0 4px rgba(56, 189, 248, 0.15)',
    },
    formTextarea: {
      height: '120px',
      resize: 'vertical',
    },
    selectWrapper: {
      position: 'relative',
    },
    selectIcon: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748B',
      pointerEvents: 'none',
    },
    formSelect: {
      appearance: 'none',
      paddingRight: '2.5rem',
    },
    formSubmitButton: {
      display: 'block',
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '1.05rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      marginTop: '1rem',
      position: 'relative',
      overflow: 'hidden',
    },
    formSubmitButtonHover: {
      background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
      boxShadow: '0 6px 20px rgba(14, 165, 233, 0.4), 0 0 10px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-2px)',
    },
    formClose: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: 'rgba(241, 245, 249, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 10,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    formCloseHover: {
      backgroundColor: '#F1F5F9',
      transform: 'rotate(90deg)',
    },
    formCloseIcon: {
      width: '18px',
      height: '18px',
      position: 'relative',
    },
    formCloseIconLine1: {
      position: 'absolute',
      top: '50%',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: '#64748B',
      transform: 'translateY(-50%) rotate(45deg)',
      borderRadius: '1px',
    },
    formCloseIconLine2: {
      position: 'absolute',
      top: '50%',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: '#64748B',
      transform: 'translateY(-50%) rotate(-45deg)',
      borderRadius: '1px',
    },
    formPattern: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100%',
      height: '100%',
      opacity: 0.05,
      zIndex: 1,
      pointerEvents: 'none',
    },
    formContent: {
      position: 'relative',
      zIndex: 2,
    },
    formSuccessMessage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: formSubmitted ? 1 : 0,
      visibility: formSubmitted ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
      zIndex: 5,
    },
    formSuccessIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)',
      position: 'relative',
    },
    formSuccessIconCheck: {
      width: '32px',
      height: '22px',
      borderBottom: '4px solid white',
      borderRight: '4px solid white',
      transform: 'rotate(45deg) translate(-2px, -2px)',
    },
    formSuccessTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1E293B',
      marginBottom: '0.8rem',
    },
    formSuccessText: {
      fontSize: '1rem',
      color: '#64748B',
      textAlign: 'center',
      maxWidth: '80%',
    },
    formRow: {
      display: 'flex',
      gap: '1rem',
      width: '100%',
    },
    formCol50: {
      flex: '0 0 calc(50% - 0.5rem)',
    }
  };

  // Apply mobile styles
  if (isMobile) {
    styles.nav.display = 'none';
    styles.hamburger.display = 'flex';
  }

  // Create an array for the employees dropdown options
  const employeeOptions = [
    'Select number of employees',
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

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

      {/* Full-page Contact Form Overlay */}
      <div style={styles.contactFormOverlay}>
        <div style={styles.formWrapper}>
          {/* Close button */}
          <div 
            style={styles.formClose} 
            onClick={toggleContactForm}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.8)';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            <div style={styles.formCloseIcon}>
              <div style={styles.formCloseIconLine1}></div>
              <div style={styles.formCloseIconLine2}></div>
            </div>
          </div>

          <div style={styles.formPattern}></div>
          
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>Get Started with Le Duc Systems</h2>
            <p style={styles.formSubtitle}>Tell us about your project, and we'll get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Your Name*</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid #38BDF8';
                        e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                  </div>
                </div>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Company Name*</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Acme Inc."
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid #38BDF8';
                        e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid #38BDF8';
                        e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                  </div>
                </div>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid #38BDF8';
                        e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Company Size*</label>
                <div style={styles.selectWrapper}>
                  <select
                    name="employees"
                    required
                    value={formData.employees}
                    onChange={handleInputChange}
                    style={{...styles.formInput, ...styles.formSelect}}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid #38BDF8';
                      e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                      e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    {employeeOptions.map((option, index) => (
                      <option key={index} value={index === 0 ? '' : option} disabled={index === 0}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div style={styles.selectIcon}>▼</div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>What are you looking for?*</label>
                <textarea
                  name="requirements"
                  placeholder="Tell us about your project and requirements..."
                  required
                  value={formData.requirements}
                  onChange={handleInputChange}
                  style={{...styles.formInput, ...styles.formTextarea}}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #38BDF8';
                    e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                    e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={styles.formSubmitButton}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)';
                  e.target.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4), 0 0 10px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)';
                  e.target.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Success message */}
          <div style={styles.formSuccessMessage}>
            <div style={styles.formSuccessIcon}>
              <div style={styles.formSuccessIconCheck}></div>
            </div>
            <h3 style={styles.formSuccessTitle}>Thank You!</h3>
            <p style={styles.formSuccessText}>Your request has been submitted successfully. We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;