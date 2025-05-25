import React, { useState, useEffect, useRef } from 'react';
import { commonStyles } from './utils/styles';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

const Hero = () => {
  // State for animations and responsive design
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // State for contact form
  const [contactFormOpen, setContactFormOpen] = useState(false);

  const rotatingWords = ['Innovation', 'Excellence', 'Solutions', 'Growth'];

  // Rotate through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    setIsLoaded(true);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle contact form modal
  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
  };

  const styles = {
    hero: {
      paddingTop: '150px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      color: '#FFFFFF',
    },
    animatedBackground: {
      position: 'absolute',
      inset: 0,
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 128, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 60% 60%, rgba(34, 211, 238, 0.1) 0%, transparent 40%)
      `,
    },
    gridOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
    },
    glowOrb1: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
      borderRadius: '50%',
      filter: 'blur(80px)',
      animation: 'float1 20s ease-in-out infinite',
    },
    glowOrb2: {
      position: 'absolute',
      bottom: '10%',
      right: '10%',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 60%)',
      borderRadius: '50%',
      filter: 'blur(100px)',
      animation: 'float2 25s ease-in-out infinite',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '1200px',
      width: '100%',
      padding: '0 2rem',
    },
    eyebrow: {
      fontSize: '1rem',
      fontWeight: '500',
      color: '#3B82F6',
      marginBottom: '1rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    mainTitle: {
      fontSize: isMobile ? '2.5rem' : '4.5rem',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '2rem',
      letterSpacing: '-0.02em',
    },
    titleGradient: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    rotatingWord: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #8B5CF6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      position: 'relative',
    },
    subtitle: {
      fontSize: isMobile ? '1.125rem' : '1.375rem',
      color: '#94A3B8',
      maxWidth: '700px',
      margin: '0 auto 3rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    ctaContainer: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '5rem',
    },
    primaryCta: {
      position: 'relative',
      padding: '1rem 2.5rem',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#000000',
      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 10px 25px rgba(251, 191, 36, 0.3)',
    },
    secondaryCta: {
      padding: '1rem 2.5rem',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#FFFFFF',
      background: 'transparent',
      border: '2px solid #334155',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
    },
    featuresContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    featureCard: {
      background: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '2rem',
      textAlign: 'left',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      background: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#3B82F6',
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#F8FAFC',
    },
    featureDescription: {
      fontSize: '0.875rem',
      color: '#94A3B8',
      lineHeight: '1.6',
    },
    statsRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '4rem',
      marginTop: '4rem',
      flexWrap: 'wrap',
    },
    stat: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#3B82F6',
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#64748B',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  };

  const features = [
    {
      icon: '⚡',
      title: 'Swift as a Duck',
      description: 'From concept to deployment in weeks, not months. We glide through development with agile precision.',
    },
    {
      icon: '🧠',
      title: 'Smart Navigation',
      description: 'Leverage cutting-edge AI to chart new courses and streamline your digital journey.',
    },
    {
      icon: '🔒',
      title: 'Watertight Security',
      description: 'Bank-level protection with SOC2 compliance keeps your data safe above and below the surface.',
    },
  ];

  // Cute duck styles
  const duckStyles = {
    container: {
      position: 'absolute',
      top: isMobile ? '15%' : '10%',
      right: isMobile ? '5%' : '15%',
      width: isMobile ? '120px' : '200px',
      height: isMobile ? '120px' : '200px',
      zIndex: 5,
    },
    svg: {
      width: '100%',
      height: '100%',
      filter: 'drop-shadow(0 20px 40px rgba(251, 191, 36, 0.3))',
    }
  };

  return (
    <>
      <motion.section 
        id="home" 
        style={styles.hero} 
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated gradient background */}
        <div style={styles.animatedBackground} />
        
        {/* Grid overlay */}
        <div style={styles.gridOverlay} />
        
        {/* Floating orbs */}
        <motion.div 
          style={styles.glowOrb1}
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          style={styles.glowOrb2}
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Clean Flying Duck Animation */}
        <motion.div 
          style={duckStyles.container}
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -15, -5, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 200 200" style={duckStyles.svg}>
            <defs>
              <linearGradient id="duckMainBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="duckDarkBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            
            {/* Clean duck silhouette in flight */}
            <g transform="translate(100, 100)">
              {/* Body */}
              <path 
                d="M -20 0 
                   C -20 -15, 20 -15, 30 0
                   C 30 15, -20 15, -20 0"
                fill="url(#duckMainBlue)"
              />
              
              {/* Head and neck */}
              <path 
                d="M -20 -5
                   C -35 -5, -40 -15, -35 -20
                   C -30 -25, -20 -22, -15 -15"
                fill="url(#duckMainBlue)"
              />
              
              {/* Bill */}
              <path 
                d="M -35 -20 L -45 -20 L -35 -18 Z" 
                fill="#F59E0B"
              />
              
              {/* Eye */}
              <circle cx="-28" cy="-20" r="2" fill="#1F2937" />
              
              {/* Wing */}
              <motion.path
                d="M -5 -5
                   C -10 -25, 10 -25, 15 -5
                   C 10 -10, -5 -10, -5 -5"
                fill="url(#duckDarkBlue)"
                animate={{ 
                  d: [
                    "M -5 -5 C -10 -25, 10 -25, 15 -5 C 10 -10, -5 -10, -5 -5",
                    "M -5 -5 C -15 -30, 15 -30, 20 -5 C 15 -10, -5 -10, -5 -5",
                    "M -5 -5 C -10 -25, 10 -25, 15 -5 C 10 -10, -5 -10, -5 -5"
                  ]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Tail */}
              <path 
                d="M 30 0 L 40 -5 L 35 0 L 40 5 Z" 
                fill="url(#duckDarkBlue)"
              />
            </g>
          </svg>
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          style={styles.content}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Eyebrow text */}
          <motion.p 
            style={styles.eyebrow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Leading the Flock in Custom Software
          </motion.p>
          
          {/* Main title */}
          <motion.h1 
            style={styles.mainTitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span style={styles.titleGradient}>Navigate Your Way to</span>
            <br />
            <span>Digital </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                style={styles.rotatingWord}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {rotatingWords[currentWord]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            style={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            We help ambitious companies paddle forward with custom software solutions 
            that transform businesses and guide teams to smoother waters.
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div 
            style={styles.ctaContainer}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button 
              style={styles.primaryCta}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(251, 191, 36, 0.4)',
                background: 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleContactForm}
            >
              Take Flight Today
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
          
          {/* Feature cards */}
          <motion.div 
            style={styles.featuresContainer}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                style={styles.featureCard}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  borderColor: '#3B82F6',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div 
            style={styles.statsRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div style={styles.stat}>
              <div style={styles.statNumber}>15+</div>
              <div style={styles.statLabel}>Years Experience</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>50+</div>
              <div style={styles.statLabel}>AI Solutions Deployed</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Client Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Integrated ContactForm Component */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
        recipientEmail="leducsystems@gmail.com"
      />
    </>
  );
};

export default Hero;