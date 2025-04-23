import React, { useState, useEffect, useRef } from 'react';
import { commonStyles } from './utils/styles';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Hero = () => {
  // State for animations and responsive design
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // State for contact form
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    employees: '',
    requirements: '',
    email: '',
    phone: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  // Features for automatic rotation
  const features = [
    { icon: "⚡", label: "Custom Software", color: "#38BDF8" },
    { icon: "📱", label: "Mobile Apps", color: "#818CF8" },
    { icon: "🏢", label: "Enterprise Solutions", color: "#6366F1" },
    { icon: "🔄", label: "Digital Transformation", color: "#8B5CF6" }
  ];

  // Handle responsive design and animations
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial states
    handleResize();
    setIsLoaded(true);
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    // Feature rotation interval
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [features.length]);

  // Toggle contact form modal
  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
    document.body.style.overflow = !contactFormOpen ? 'hidden' : 'auto';
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

  const styles = {
    hero: {
      marginTop: '110px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      position: 'relative',
      overflow: 'hidden',
      color: '#F8FAFC',
    },
    heroContent: {
      width: isMobile ? '100%' : '50%',
      paddingRight: isMobile ? '0' : '2rem',
      position: 'relative',
      zIndex: 10,
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    heroVisual: {
      width: isMobile ? '100%' : '50%',
      marginTop: isMobile ? '3rem' : 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
    },
    glowOrb: {
      position: 'absolute',
      right: '-10%',
      top: '-15%',
      width: '70%',
      height: '70%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0) 70%)',
      filter: 'blur(60px)',
      zIndex: 1,
    },
    secondaryGlowOrb: {
      position: 'absolute',
      left: '-10%',
      bottom: '-10%',
      width: '50%',
      height: '50%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)',
      filter: 'blur(60px)',
      zIndex: 1,
    },
    heroBgPattern: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: 0.04,
      backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.8) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      zIndex: 1,
    },
    codeLines: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(to bottom, transparent 49%, rgba(56, 189, 248, 0.05) 50%, transparent 51%)`,
      backgroundSize: '100% 8px',
      opacity: 0.1,
      zIndex: 1,
    },
    heroTitle: {
      fontSize: isMobile ? '2.75rem' : '4.5rem',
      marginBottom: '1.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      position: 'relative',
      textShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
    },
    heroHighlight: {
      background: 'linear-gradient(90deg, #38BDF8, #818CF8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative',
      display: 'inline-block',
    },
    gradientText: {
      background: 'linear-gradient(90deg, #38BDF8, #818CF8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    highlightUnderline: {
      position: 'absolute',
      bottom: '0px',
      left: '0',
      width: '100%',
      height: '8px',
      background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.7) 0%, rgba(129, 140, 248, 0.7) 100%)',
      borderRadius: '4px',
      zIndex: -1,
    },
    heroTagline: {
      fontSize: '1.4rem',
      marginBottom: '2.5rem',
      color: '#94A3B8',
      lineHeight: 1.6,
      maxWidth: '600px',
      position: 'relative',
    },
    ctaButton: {
      ...commonStyles.ctaButton,
      background: 'linear-gradient(90deg, #38BDF8 0%, #818CF8 100%)',
      padding: '1.2rem 2.5rem',
      fontSize: '1.2rem',
      fontWeight: 600,
      borderRadius: '12px',
      color: '#0F172A',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
      boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.3)',
    },
    ctaButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 20px 35px -10px rgba(14, 165, 233, 0.5)',
    },
    secondaryCta: {
      background: 'transparent',
      border: '2px solid rgba(56, 189, 248, 0.5)',
      color: '#F8FAFC',
      marginLeft: '1rem',
      padding: '1.15rem 2rem',
      borderRadius: '12px',
      fontSize: '1.2rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    ctaWrapper: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    buttonGlow: {
      position: 'absolute',
      width: '200%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      transform: 'translateX(-100%)',
    },
    featuresRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '2.5rem',
    },
    featureBadge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.6rem 1.2rem',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '500',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      color: '#E2E8F0',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
    },
    activeFeature: {
      backgroundColor: 'rgba(56, 189, 248, 0.15)',
      transform: 'translateY(-3px)',
      border: '1px solid rgba(56, 189, 248, 0.7)',
      boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)',
    },
    featureIcon: {
      marginRight: '0.5rem',
      opacity: 0.8,
    },
    stats: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '3rem',
      gap: '2rem',
    },
    statItem: {
      flex: '1',
      minWidth: '100px',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '0.5rem',
      background: 'linear-gradient(90deg, #38BDF8, #818CF8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    statLabel: {
      fontSize: '1rem',
      color: '#94A3B8',
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#E2E8F0',
      zIndex: 10,
    },
    scrollText: {
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
      opacity: 0.7,
    },
    scrollArrows: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    svgContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      maxWidth: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      <section id="home" style={styles.hero} ref={heroRef}>
        {/* Background elements */}
        <div style={styles.heroBgPattern}></div>
        <div style={styles.codeLines}></div>
        <div style={styles.glowOrb}></div>
        <div style={styles.secondaryGlowOrb}></div>
        
        <div style={commonStyles.container}>
          <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <motion.div 
              style={styles.heroContent}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 style={styles.heroTitle}>
                  Elevate Your
                  <br />
                  <span style={styles.heroHighlight}>
                    Software Solutions
                    <motion.div 
                      style={styles.highlightUnderline}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: 1 }}
                    ></motion.div>
                  </span>
                </h1>
              </motion.div>
              
              <motion.p 
                style={styles.heroTagline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Transforming ideas into powerful software solutions that drive growth, streamline operations, and create exceptional user experiences.
              </motion.p>
              
              <motion.div 
                style={styles.ctaWrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button 
                  style={styles.ctaButton}
                  whileHover={{
                    y: -3,
                    boxShadow: '0 20px 35px -10px rgba(14, 165, 233, 0.5)'
                  }}
                  onClick={toggleContactForm}
                >
                  <motion.div 
                    style={styles.buttonGlow}
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: 'loop',
                      ease: 'linear',
                      repeatDelay: 1
                    }}
                  ></motion.div>
                  Start Your Project
                </motion.button>
              </motion.div>
              
              <motion.div 
                style={styles.featuresRow}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {features.map((feature, index) => (
                  <motion.div 
                    key={feature.label}
                    style={{
                      ...styles.featureBadge,
                      ...(index === activeFeature ? styles.activeFeature : {}),
                      borderColor: index === activeFeature ? feature.color : 'rgba(56, 189, 248, 0.3)'
                    }}
                    animate={index === activeFeature ? {
                      y: -5,
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      transition: { duration: 0.3 }
                    } : {
                      y: 0,
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <span style={styles.featureIcon}>{feature.icon}</span>
                    {feature.label}
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                style={styles.stats}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div style={styles.statItem}>
                  <motion.div 
                    style={styles.statNumber}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  >
                    250+
                  </motion.div>
                  <div style={styles.statLabel}>Projects Completed</div>
                </div>
                <div style={styles.statItem}>
                  <motion.div 
                    style={styles.statNumber}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  >
                    98%
                  </motion.div>
                  <div style={styles.statLabel}>Client Satisfaction</div>
                </div>
                <div style={styles.statItem}>
                  <motion.div 
                    style={styles.statNumber}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                  >
                    12+
                  </motion.div>
                  <div style={styles.statLabel}>Years Experience</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              style={styles.heroVisual}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                style={styles.svgContainer}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: 'loop', 
                  ease: 'easeInOut' 
                }}
              >
                {/* SVG Animation for Custom Software Development */}
                <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Code grid background */}
                  <motion.rect 
                    x="0" y="0" width="600" height="500" 
                    fill="url(#codeGridPattern)" 
                    opacity="0.06"
                    initial={{ opacity: 0.02 }}
                    animate={{ opacity: 0.06 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  
                  {/* Main application frame */}
                  <motion.rect 
                    x="150" y="80" width="300" height="340"
                    rx="10" ry="10"
                    stroke="url(#blueGradient)" 
                    strokeWidth="2" 
                    fill="rgba(15, 23, 42, 0.5)"
                    initial={{ y: 80 }}
                    animate={{ y: 75 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  />
                  
                  {/* App header bar */}
                  <rect x="150" y="80" width="300" height="40" rx="10" ry="10" fill="url(#darkBlueGradient)" />
                  <circle cx="170" cy="100" r="5" fill="#FF5F57" />
                  <circle cx="190" cy="100" r="5" fill="#FEBC2E" />
                  <circle cx="210" cy="100" r="5" fill="#28C840" />
                  
                  {/* App title */}
                  <text x="245" y="105" fontFamily="monospace" fontSize="12" fill="#E2E8F0">Custom App</text>
                  
                  {/* Function component */}
                  <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: -8 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
                  >
                    <rect x="170" y="140" width="260" height="80" rx="5" fill="rgba(99, 102, 241, 0.1)" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="2,2" />
                    <text x="180" y="160" fontFamily="monospace" fontSize="12" fill="#818CF8">function Component() &#123;</text>
                    <text x="190" y="180" fontFamily="monospace" fontSize="12" fill="#E2E8F0">return (</text>
                    <text x="210" y="200" fontFamily="monospace" fontSize="12" fill="#38BDF8">&lt;CustomModule /&gt;</text>
                    <text x="180" y="215" fontFamily="monospace" fontSize="12" fill="#E2E8F0">)&#123;</text>
                  </motion.g>
                  
                  {/* API connection */}
                  <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: 8 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.8 }}
                  >
                    <rect x="170" y="240" width="260" height="60" rx="5" fill="rgba(56, 189, 248, 0.1)" stroke="#38BDF8" strokeWidth="1.5" />
                    <text x="180" y="260" fontFamily="monospace" fontSize="12" fill="#38BDF8">async function getData() &#123;</text>
                    <text x="190" y="280" fontFamily="monospace" fontSize="12" fill="#94A3B8">const response = await API.get();</text>
                    <text x="180" y="295" fontFamily="monospace" fontSize="12" fill="#38BDF8">&#123;</text>
                  </motion.g>
                  
                  {/* Database */}
                  <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: 6 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
                  >
                    <rect x="170" y="320" width="260" height="40" rx="5" fill="rgba(139, 92, 246, 0.1)" stroke="#8B5CF6" strokeWidth="1.5" />
                    <text x="180" y="345" fontFamily="monospace" fontSize="12" fill="#8B5CF6">Database.connect()</text>
                  </motion.g>
                  
                  {/* Server node */}
                  <motion.circle 
                    cx="100" cy="250" r="40" 
                    fill="rgba(15, 23, 42, 0.7)"
                    stroke="url(#indigoGradient)" 
                    strokeWidth="2"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  />
                  <text x="79" y="255" fontFamily="monospace" fontSize="12" fill="#E2E8F0">Server</text>
                  
                  {/* Client node */}
                  <motion.circle 
                    cx="500" cy="250" r="40" 
                    fill="rgba(15, 23, 42, 0.7)"
                    stroke="url(#blueGradient)" 
                    strokeWidth="2"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.3 }}
                  />
                  <text x="483" y="255" fontFamily="monospace" fontSize="12" fill="#E2E8F0">Client</text>
                  
                  {/* Cloud services node */}
                  <motion.circle 
                    cx="300" cy="50" r="30" 
                    fill="rgba(15, 23, 42, 0.7)"
                    stroke="url(#purpleGradient)" 
                    strokeWidth="2"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.6 }}
                  />
                  <text x="277" y="53" fontFamily="monospace" fontSize="10" fill="#E2E8F0">Cloud</text>
                  
                  {/* Database node */}
                  <motion.circle 
                    cx="300" cy="450" r="30" 
                    fill="rgba(15, 23, 42, 0.7)"
                    stroke="#38BDF8" 
                    strokeWidth="2"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.9 }}
                  />
                  <text x="278" y="453" fontFamily="monospace" fontSize="10" fill="#E2E8F0">Data</text>
                  
                  {/* Connection lines with animated data packets */}
                  <line x1="100" y1="250" x2="150" y2="250" stroke="#6366F1" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="450" y1="250" x2="500" y2="250" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="300" y1="80" x2="300" y2="50" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="300" y1="420" x2="300" y2="450" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4,4" />
                  
                  {/* Animated data packets */}
                  <motion.circle 
                    cx="125" cy="250" r="4" 
                    fill="#6366F1"
                    initial={{ x: 0 }}
                    animate={{ x: 25 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  
                  <motion.circle 
                    cx="475" cy="250" r="4" 
                    fill="#38BDF8"
                    initial={{ x: 0 }}
                    animate={{ x: -25 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  />
                  
                  <motion.circle 
                    cx="300" cy="65" r="4" 
                    fill="#8B5CF6"
                    initial={{ y: 0 }}
                    animate={{ y: 15 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  />
                  
                  <motion.circle 
                    cx="300" cy="435" r="4" 
                    fill="#38BDF8"
                    initial={{ y: 0 }}
                    animate={{ y: -15 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  />
                  
                  {/* Code symbols flowing around */}
                  <motion.text 
                    x="230" y="190" 
                    fill="#38BDF8" 
                    fontFamily="monospace" 
                    fontSize="14"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    &lt;/&gt;
                  </motion.text>
                  
                  <motion.text 
                    x="370" y="280" 
                    fill="#8B5CF6" 
                    fontFamily="monospace" 
                    fontSize="14"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                  >
                    { }
                  </motion.text>
                  
                  <motion.text 
                    x="180" y="330" 
                    fill="#38BDF8" 
                    fontFamily="monospace" 
                    fontSize="14"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
                  >
                    ()=&gt;
                  </motion.text>
                  
                  {/* Gear icons representing software processes */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '80px 180px' }}
                  >
                    <path d="M80 165 L85 165 L87 155 L95 158 L100 150 L92 145 L95 137 L105 140 L110 130 L100 128 L100 118 L110 115 L105 105 L95 110 L90 102 L98 95 L90 90 L80 95 L75 87 L82 80 L73 75 L65 85 L57 80 L60 70 L50 65 L45 75 L35 72 L40 62 L30 60 L25 70 L15 68 L20 78 L10 85 L18 90 L15 100 L5 97 L10 107 L2 115 L12 120 L12 130 L2 132 L7 142 L17 137 L22 147 L12 150 L20 160 L30 153 L38 160 L35 170 L45 172 L50 162 L60 165 L57 175 L68 177 L75 168 L80 165" fill="url(#indigoGradient)" opacity="0.7"/>
                    <circle cx="80" cy="180" r="10" fill="#0F172A" />
                  </motion.g>
                  
                  <motion.g
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '520px 180px' }}
                  >
                    <path d="M520 165 L525 165 L527 155 L535 158 L540 150 L532 145 L535 137 L545 140 L550 130 L540 128 L540 118 L550 115 L545 105 L535 110 L530 102 L538 95 L530 90 L520 95 L515 87 L522 80 L513 75 L505 85 L497 80 L500 70 L490 65 L485 75 L475 72 L480 62 L470 60 L465 70 L455 68 L460 78 L450 85 L458 90 L455 100 L445 97 L450 107 L442 115 L452 120 L452 130 L442 132 L447 142 L457 137 L462 147 L452 150 L460 160 L470 153 L478 160 L475 170 L485 172 L490 162 L500 165 L497 175 L508 177 L515 168 L520 165" fill="url(#blueGradient)" opacity="0.7"/>
                    <circle cx="520" cy="180" r="10" fill="#0F172A" />
                  </motion.g>
                  
                  {/* Radial pulses */}
                  <motion.circle 
                    cx="300" cy="250" r="100" 
                    stroke="url(#blueGradient)" 
                    strokeWidth="1" 
                    fill="none"
                    initial={{ r: 100, opacity: 1 }}
                    animate={{ r: 200, opacity: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
                  />
                  
                  <motion.circle 
                    cx="300" cy="250" r="100" 
                    stroke="url(#indigoGradient)" 
                    strokeWidth="1" 
                    fill="none"
                    initial={{ r: 100, opacity: 1 }}
                    animate={{ r: 200, opacity: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                  />
                  
                  {/* Definitions for gradients and patterns */}
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                    
                    <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                    
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                    
                    <linearGradient id="darkBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    
                    <pattern id="codeGridPattern" patternUnits="userSpaceOnUse" width="50" height="50">
                      <rect width="50" height="50" fill="none" />
                      <text x="5" y="20" fontFamily="monospace" fontSize="8" fill="#38BDF8">import</text>
                      <text x="15" y="40" fontFamily="monospace" fontSize="8" fill="#8B5CF6">export</text>
                      <text x="30" y="10" fontFamily="monospace" fontSize="8" fill="#6366F1">const</text>
                      <text x="0" y="50" fontFamily="monospace" fontSize="8" fill="#38BDF8">{`{}`}</text>
                      <text x="40" y="30" fontFamily="monospace" fontSize="8" fill="#8B5CF6">( )</text>
                    </pattern>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          style={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={styles.scrollText}>Scroll to Explore</div>
          <div style={styles.scrollArrows}>
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
            >
              <path d="M7 13L12 18L17 13" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
        </motion.div>
      </section>

      {/* Contact Form Overlay */}
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

export default Hero;