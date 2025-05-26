import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import ContactForm from '../ContactForm';
import { unifiedTheme, getSectionStyles, getContainerStyles, getButtonStyles, getCardStyles, getResponsiveValue } from '../theme/unifiedTheme';

const CallToAction = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
  };

  const contactMethods = [
    {
      icon: <FiMail size={24} />,
      title: 'Send a Message',
      description: 'Get in touch with our team',
      action: 'Contact Us',
      onClick: toggleContactForm,
      color: '#FFC905'
    },
    {
      icon: <FiPhone size={24} />,
      title: 'Call Directly',
      description: 'Speak with us right away',
      action: 'Call Now',
      onClick: () => window.open('tel:+1234567890'),
      color: '#FFB000'
    }
  ];

  const benefits = [
    '✓ Free initial consultation',
    '✓ Custom solution roadmap',
    '✓ No-obligation project quote',
    '✓ Expert technical guidance'
  ];

  const styles = {
    section: {
      position: 'relative',
      padding: getResponsiveValue('80px 0', '120px 0', isMobile),
      background: 'linear-gradient(135deg, #0F1419 0%, #1A1F2E 50%, #0F1419 100%)',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.05,
      backgroundImage: 'radial-gradient(rgba(255, 201, 5, 0.1) 2px, transparent 2px)',
      backgroundSize: '40px 40px'
    },
    decorativeShape1: {
      position: 'absolute',
      top: '-100px',
      left: '-100px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255, 201, 5, 0.3) 0%, rgba(255, 176, 0, 0.1) 100%)',
      filter: 'blur(40px)'
    },
    decorativeShape2: {
      position: 'absolute',
      bottom: '-150px',
      right: '-150px',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255, 176, 0, 0.2) 0%, rgba(255, 201, 5, 0.1) 100%)',
      filter: 'blur(60px)'
    },
    container: getContainerStyles(isMobile),
    content: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '60px',
      alignItems: 'center'
    },
    textContent: {
      color: '#FFFFFF'
    },
    subtitle: {
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '15px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      opacity: 0.9
    },
    title: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['4xl'], unifiedTheme.typography.fontSizes['6xl'], isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.extrabold,
      marginBottom: '25px',
      lineHeight: unifiedTheme.typography.lineHeights.tight
    },
    titleHighlight: {
      color: '#FFC905'
    },
    description: {
      fontSize: unifiedTheme.typography.fontSizes.xl,
      lineHeight: unifiedTheme.typography.lineHeights.relaxed,
      marginBottom: '35px',
      opacity: 0.95
    },
    benefitsList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '15px',
      marginBottom: '40px'
    },
    benefitItem: {
      fontSize: '1.1rem',
      color: '#E5E7EB',
      fontWeight: 500
    },
    mainCta: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '18px 36px',
      fontSize: unifiedTheme.typography.fontSizes.xl,
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      background: 'linear-gradient(135deg, #FFC905 0%, #FFB000 100%)',
      color: '#0F1419',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 6px 20px rgba(255, 201, 5, 0.3)'
    },
    mainCtaHover: {
      background: 'linear-gradient(135deg, #FFB000 0%, #FF9500 100%)',
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 30px rgba(255, 201, 5, 0.5)'
    },
    contactOptions: {
      backgroundColor: '#1A1F2E',
      borderRadius: '20px',
      padding: '40px',
      border: '1px solid rgba(255, 201, 5, 0.1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    optionsTitle: {
      fontSize: unifiedTheme.typography.fontSizes['2xl'],
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFFFFF',
      marginBottom: '30px',
      textAlign: 'center'
    },
    methodsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    methodCard: {
      backgroundColor: '#0F1419',
      padding: '25px',
      borderRadius: '12px',
      border: '2px solid #2A2F3E',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    methodCardHover: {
      borderColor: '#FFC905',
      backgroundColor: '#1A1F2E',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(255, 201, 5, 0.2)'
    },
    methodHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '12px'
    },
    methodIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF'
    },
    methodTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#FFFFFF',
      marginBottom: '5px'
    },
    methodDescription: {
      fontSize: '0.95rem',
      color: '#9CA3AF'
    },
    methodAction: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '15px',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#FFFFFF',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    urgencyBadge: {
      display: 'inline-block',
      padding: '8px 16px',
      background: 'linear-gradient(135deg, rgba(255, 201, 5, 0.1) 0%, rgba(255, 176, 0, 0.1) 100%)',
      color: '#FFC905',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 600,
      marginBottom: '20px',
      border: '1px solid rgba(255, 201, 5, 0.3)'
    }
  };

  return (
    <>
      <section style={styles.section}>
        <div style={styles.backgroundPattern}></div>
        <div style={styles.decorativeShape1}></div>
        <div style={styles.decorativeShape2}></div>
        
        <div style={styles.container}>
          <motion.div 
            style={styles.content}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              style={styles.textContent}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={styles.subtitle}>Ready to Transform?</div>
              <h2 style={styles.title}>
                Let's Build Something <span style={styles.titleHighlight}>Amazing</span> Together
              </h2>
              <p style={styles.description}>
                Turn your ideas into reality with our expert team. From concept to deployment, 
                we'll guide you through every step of your digital transformation journey.
              </p>
              
              <div style={styles.benefitsList}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    style={styles.benefitItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {benefit}
                  </motion.div>
                ))}
              </div>

              <motion.button
                style={styles.mainCta}
                onClick={toggleContactForm}
                whileHover={{
                  background: 'linear-gradient(135deg, #FFB000 0%, #FF9500 100%)',
                  y: -3,
                  boxShadow: '0 12px 30px rgba(255, 201, 5, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
                <FiArrowRight />
              </motion.button>
            </motion.div>

            <motion.div 
              style={styles.contactOptions}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div style={styles.urgencyBadge}>
                🔥 Responding to inquiries within 2 hours
              </div>
              
              <h3 style={styles.optionsTitle}>Get in Touch</h3>
              
              <div style={styles.methodsGrid}>
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    style={styles.methodCard}
                    onClick={method.onClick}
                    whileHover={{
                      borderColor: method.color,
                      backgroundColor: '#1A1F2E',
                      y: -3,
                      boxShadow: `0 8px 20px ${method.color}33`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div style={styles.methodHeader}>
                      <div style={{...styles.methodIcon, backgroundColor: method.color}}>
                        {method.icon}
                      </div>
                      <div>
                        <div style={styles.methodTitle}>{method.title}</div>
                        <div style={styles.methodDescription}>{method.description}</div>
                      </div>
                    </div>
                    <button
                      style={{
                        ...styles.methodAction,
                        backgroundColor: method.color
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {method.action}
                      <FiArrowRight size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
      />
    </>
  );
};

export default CallToAction;