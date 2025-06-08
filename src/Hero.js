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
      paddingTop: isMobile ? '120px' : '100px', // Reduced padding for larger screens
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
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      minWidth: '200px',
      textAlign: 'center',
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

  // Sexy animated duck styles
  const duckStyles = {
    container: {
      position: 'absolute',
      top: isMobile ? '15%' : '10%',
      right: isMobile ? '5%' : '15%',
      width: isMobile ? '150px' : '250px',
      height: isMobile ? '150px' : '250px',
      zIndex: 5,
    },
    svg: {
      width: '100%',
      height: '100%',
      filter: 'drop-shadow(0 30px 60px rgba(251, 191, 36, 0.4)) drop-shadow(0 15px 30px rgba(59, 130, 246, 0.3))',
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
        
        {/* Sexy Flying Duck Animation */}
        <motion.div 
          style={duckStyles.container}
          animate={{
            x: [0, 40, 20, -40, 0],
            y: [0, -20, -10, -25, 0],
            rotate: [0, 5, -5, 8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 200 200" style={duckStyles.svg}>
            <defs>
              {/* Enhanced gradients for sexy appeal */}
              <linearGradient id="duckBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="duckWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <linearGradient id="duckBillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <radialGradient id="duckGlow">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </radialGradient>
              {/* Shimmer effect */}
              <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                <motion.stop 
                  offset="0%" 
                  stopColor="#FFFFFF" 
                  stopOpacity="0"
                  animate={{ stopOpacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.stop 
                  offset="50%" 
                  stopColor="#FFFFFF" 
                  stopOpacity="0.2"
                  animate={{ stopOpacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.stop 
                  offset="100%" 
                  stopColor="#FFFFFF" 
                  stopOpacity="0"
                  animate={{ stopOpacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </linearGradient>
              {/* Feather texture filter */}
              <filter id="featherTexture">
                <feTurbulence baseFrequency="0.02" numOctaves="4" seed="5" />
                <feComposite operator="over" in2="SourceGraphic" />
              </filter>
            </defs>
            
            {/* Glow effect behind duck */}
            <motion.circle 
              cx="100" 
              cy="100" 
              r="60" 
              fill="url(#duckGlow)"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Sexy duck silhouette in flight */}
            <g transform="translate(100, 100)">
              {/* Body with shimmer */}
              <motion.path 
                d="M -25 0 
                   C -25 -20, 25 -20, 35 0
                   C 35 20, -25 20, -25 0"
                fill="url(#duckBodyGradient)"
                animate={{
                  d: [
                    "M -25 0 C -25 -20, 25 -20, 35 0 C 35 20, -25 20, -25 0",
                    "M -25 0 C -25 -22, 25 -22, 35 0 C 35 22, -25 22, -25 0",
                    "M -25 0 C -25 -20, 25 -20, 35 0 C 35 20, -25 20, -25 0",
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <path 
                d="M -25 0 
                   C -25 -20, 25 -20, 35 0
                   C 35 20, -25 20, -25 0"
                fill="url(#shimmer)"
                opacity="0.3"
              />
              
              {/* Elegant neck and head */}
              <motion.path 
                d="M -25 -8
                   C -40 -8, -45 -18, -40 -25
                   C -35 -30, -22 -27, -18 -20"
                fill="url(#duckBodyGradient)"
                animate={{
                  d: [
                    "M -25 -8 C -40 -8, -45 -18, -40 -25 C -35 -30, -22 -27, -18 -20",
                    "M -25 -8 C -42 -8, -47 -20, -42 -27 C -37 -32, -22 -29, -18 -22",
                    "M -25 -8 C -40 -8, -45 -18, -40 -25 C -35 -30, -22 -27, -18 -20",
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Sleek bill */}
              <motion.path 
                d="M -40 -25 L -52 -25 L -40 -22 Z" 
                fill="url(#duckBillGradient)"
                animate={{
                  d: [
                    "M -40 -25 L -52 -25 L -40 -22 Z",
                    "M -42 -27 L -54 -27 L -42 -24 Z",
                    "M -40 -25 L -52 -25 L -40 -22 Z",
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Expressive eye */}
              <motion.circle 
                cx="-32" 
                cy="-25" 
                r="3" 
                fill="#1F2937"
                animate={{ 
                  r: [3, 2.5, 3],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <circle cx="-31" cy="-26" r="1" fill="#FFFFFF" opacity="0.8" />
              
              {/* Dynamic wing with feather details */}
              <motion.path
                d="M -8 -8
                   C -15 -35, 20 -35, 28 -8
                   C 20 -15, -8 -15, -8 -8"
                fill="url(#duckWingGradient)"
                animate={{ 
                  d: [
                    "M -8 -8 C -15 -35, 20 -35, 28 -8 C 20 -15, -8 -15, -8 -8",
                    "M -8 -8 C -20 -40, 25 -40, 33 -8 C 25 -15, -8 -15, -8 -8",
                    "M -8 -8 C -12 -32, 18 -32, 25 -8 C 18 -15, -8 -15, -8 -8",
                    "M -8 -8 C -15 -35, 20 -35, 28 -8 C 20 -15, -8 -15, -8 -8"
                  ]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Wing feather details */}
              <motion.path
                d="M -5 -20 L 0 -25 M 5 -22 L 10 -27 M 15 -20 L 20 -25"
                stroke="rgba(30, 64, 175, 0.3)"
                strokeWidth="1"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Sexy tail feathers */}
              <motion.g
                animate={{ 
                  rotate: [-5, 5, -5],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <path 
                  d="M 35 0 L 48 -8 L 42 0 L 48 8 Z" 
                  fill="url(#duckWingGradient)"
                />
                <path 
                  d="M 35 -3 L 45 -10 L 40 -3 Z" 
                  fill="url(#duckBodyGradient)"
                  opacity="0.7"
                />
                <path 
                  d="M 35 3 L 45 10 L 40 3 Z" 
                  fill="url(#duckBodyGradient)"
                  opacity="0.7"
                />
              </motion.g>
              
              {/* Speed lines for motion effect */}
              <motion.g
                animate={{ 
                  opacity: [0, 0.3, 0],
                  x: [0, -50, -100],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeOut" 
                }}
              >
                <line x1="40" y1="-10" x2="60" y2="-10" stroke="#60A5FA" strokeWidth="2" />
                <line x1="40" y1="0" x2="65" y2="0" stroke="#3B82F6" strokeWidth="3" />
                <line x1="40" y1="10" x2="60" y2="10" stroke="#60A5FA" strokeWidth="2" />
              </motion.g>
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
      />
    </>
  );
};

export default Hero;