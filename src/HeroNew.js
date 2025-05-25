import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

const HeroNew = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const heroRef = useRef(null);
  const duckRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms
  const duckY = useTransform(scrollY, [0, 300], [0, -50]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  
  const typingPhrases = [
    "AI-Powered Solutions",
    "Enterprise Software",
    "Digital Transformation",
    "Machine Learning Magic"
  ];

  const projectHighlights = [
    {
      metric: "2-4 Weeks",
      description: "Average project delivery time",
      detail: "From kickoff to production"
    },
    {
      metric: "24/7",
      description: "AI-powered monitoring",
      detail: "Real-time system optimization"
    },
    {
      metric: "100%",
      description: "Custom solutions",
      detail: "No templates, pure innovation"
    }
  ];

  const techCapabilities = [
    "GPT-4 Integration",
    "Custom Software",
    "Mobile Apps",
    "Web Applications",
    "API Development",
    "Cloud Architecture"
  ];

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Typing effect
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentPhrase = typingPhrases[phraseIndex];
      
      if (!isDeleting) {
        setTypingText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
        } else {
          timeout = setTimeout(type, 100);
        }
      } else {
        setTypingText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % typingPhrases.length;
          timeout = setTimeout(type, 500);
        } else {
          timeout = setTimeout(type, 50);
        }
      }
    };

    timeout = setTimeout(type, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Project highlight rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % projectHighlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projectHighlights.length]);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    setIsLoaded(true);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
      paddingBottom: '40px'
    },
    backgroundCanvas: {
      position: 'absolute',
      inset: 0,
      background: `
        radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)
      `,
    },
    particleField: {
      position: 'absolute',
      inset: 0,
      opacity: 0.3,
    },
    floatingDuck: {
      position: 'relative',
      display: 'inline-block',
      width: isMobile ? '80px' : '100px',
      height: isMobile ? '80px' : '100px',
      marginLeft: '1rem',
      verticalAlign: 'middle',
    },
    duckSvg: {
      width: '100%',
      height: '100%',
      filter: 'drop-shadow(0 20px 40px rgba(251, 191, 36, 0.5))',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '1400px',
      padding: '0 2rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
    },
    leftColumn: {
      textAlign: isMobile ? 'center' : 'left',
    },
    trustBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(251, 191, 36, 0.1)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      borderRadius: '100px',
      padding: '0.5rem 1.5rem',
      marginBottom: '2rem',
      fontSize: '0.875rem',
      color: '#FBBF24',
      fontWeight: '600',
    },
    mainHeadline: {
      fontSize: isMobile ? '3rem' : '4.5rem',
      fontWeight: '900',
      lineHeight: '1.05',
      marginBottom: '1.5rem',
      letterSpacing: '-0.03em',
    },
    headlineGradient: {
      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #DC2626 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    typingContainer: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: '2rem',
      minHeight: isMobile ? '3rem' : '4rem',
    },
    cursor: {
      display: 'inline-block',
      width: '4px',
      height: '1em',
      background: '#FBBF24',
      marginLeft: '2px',
      animation: 'blink 1s infinite',
    },
    subheadline: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      color: '#94A3B8',
      lineHeight: '1.6',
      marginBottom: '3rem',
      maxWidth: '600px',
    },
    ctaGroup: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      marginBottom: '3rem',
    },
    primaryCta: {
      position: 'relative',
      padding: '1.25rem 3rem',
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#000000',
      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(251, 191, 36, 0.4)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    ctaPulse: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
      borderRadius: '12px',
      opacity: 0.5,
      animation: 'pulse 2s infinite',
    },
    secondaryCta: {
      padding: '1.25rem 3rem',
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#FFFFFF',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      textDecoration: 'none',
      display: 'inline-block',
    },
    techCapabilities: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },
    capabilitiesGrid: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    capabilityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '100px',
      fontSize: '0.875rem',
      color: '#60A5FA',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    capabilityIcon: {
      color: '#3B82F6',
      fontWeight: '700',
    },
    rightColumn: {
      position: 'relative',
      display: isMobile ? 'none' : 'block',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      marginBottom: '2rem',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem',
    },
    statLabel: {
      fontSize: '1rem',
      color: '#94A3B8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    highlightCard: {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
      border: '1px solid rgba(251, 191, 36, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      backdropFilter: 'blur(20px)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    highlightHeader: {
      marginBottom: '1.5rem',
    },
    highlightBadge: {
      display: 'inline-block',
      padding: '0.25rem 1rem',
      background: 'rgba(251, 191, 36, 0.1)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      borderRadius: '100px',
      fontSize: '0.75rem',
      color: '#FBBF24',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    highlightMetric: {
      fontSize: '3.5rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem',
      lineHeight: '1',
    },
    highlightDescription: {
      fontSize: '1.25rem',
      color: '#F8FAFC',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    highlightDetail: {
      fontSize: '1rem',
      color: '#94A3B8',
      marginBottom: '1.5rem',
    },
    highlightCta: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#FBBF24',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <>
      <motion.section 
        ref={heroRef}
        style={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background */}
        <motion.div 
          style={styles.backgroundCanvas}
          animate={{
            background: [
              `radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 40%),
               radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
               radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)`,
              `radial-gradient(circle at 70% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 40%),
               radial-gradient(circle at 30% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
               radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)`,
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Particle effect */}
        <div style={styles.particleField}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: '#FBBF24',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>


        {/* Main content */}
        <div style={styles.content}>
          {/* Left column */}
          <motion.div 
            style={styles.leftColumn}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            {/* Main headline */}
            <h1 style={styles.mainHeadline}>
              <span style={styles.headlineGradient}>Stop Watching Competitors</span>
              <br />
              <span style={{ color: '#FFFFFF' }}>Fly Past You</span>
            </h1>

            {/* Typing effect */}
            <div style={styles.typingContainer}>
              <span>{typingText}</span>
              <span style={styles.cursor} />
            </div>

            {/* Subheadline */}
            <p style={styles.subheadline}>
              We build AI-powered software that transforms your business in weeks, not years. 
            </p>

            {/* CTA buttons */}
            <div style={styles.ctaGroup}>
              <motion.button
                style={styles.primaryCta}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(251, 191, 36, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setContactFormOpen(true)}
              >
                <span style={styles.ctaPulse} />
                <span style={{ position: 'relative' }}>Get Your Free AI Roadmap</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              {/* Geometric Animated Duck */}
              <motion.div 
                ref={duckRef}
                style={{
                  ...styles.floatingDuck,
                  x: smoothMouseX,
                  y: smoothMouseY,
                }}
                animate={{
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <svg viewBox="0 0 200 200" style={styles.duckSvg}>
                  <defs>
                    <linearGradient id="duckYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="duckOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FB923C" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <g transform="translate(100, 100)">
                    {/* Shadow */}
                    <motion.ellipse
                      cx="0"
                      cy="60"
                      rx="40"
                      ry="10"
                      fill="rgba(0,0,0,0.1)"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.05, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Duck Body - Clean geometric shape */}
                    <motion.path
                      d="M -30 10
                         C -30 -20, -10 -35, 15 -35
                         C 40 -35, 45 -20, 45 0
                         C 45 30, 30 40, 0 40
                         C -30 40, -40 30, -30 10"
                      fill="url(#duckYellow)"
                      strokeWidth="2"
                      stroke="#F59E0B"
                      animate={{ 
                        d: [
                          "M -30 10 C -30 -20, -10 -35, 15 -35 C 40 -35, 45 -20, 45 0 C 45 30, 30 40, 0 40 C -30 40, -40 30, -30 10",
                          "M -30 10 C -30 -22, -10 -37, 15 -37 C 40 -37, 45 -22, 45 0 C 45 32, 30 42, 0 42 C -30 42, -40 32, -30 10",
                          "M -30 10 C -30 -20, -10 -35, 15 -35 C 40 -35, 45 -20, 45 0 C 45 30, 30 40, 0 40 C -30 40, -40 30, -30 10"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Wing - Simple geometric */}
                    <motion.path
                      d="M -5 5
                         C -5 -10, 5 -15, 15 -10
                         C 25 -5, 25 10, 15 20
                         C 5 25, -5 20, -5 5"
                      fill="#F59E0B"
                      opacity="0.8"
                      animate={{ 
                        rotate: [0, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                      style={{ transformOrigin: "5px 5px" }}
                    />
                    
                    {/* Beak - Distinctive triangular shape */}
                    <motion.path
                      d="M 40 -10 L 55 -8 L 40 -6 Z"
                      fill="url(#duckOrange)"
                      animate={{ 
                        scaleX: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                      style={{ transformOrigin: "40px -8px" }}
                    />
                    
                    {/* Eye - Minimalist design */}
                    <g>
                      <circle cx="25" cy="-15" r="8" fill="#FFFFFF" />
                      <motion.circle 
                        cx="25" 
                        cy="-15" 
                        r="5" 
                        fill="#1F2937"
                        animate={{ 
                          scale: [1, 0.8, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }}
                      />
                      <circle cx="27" cy="-17" r="2" fill="#FFFFFF" />
                    </g>
                    
                    {/* Tail feathers - Geometric accent */}
                    <motion.g
                      animate={{ rotate: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "-30px 30px" }}
                    >
                      <path d="M -30 25 L -40 30 L -30 30 Z" fill="#F59E0B" opacity="0.7" />
                      <path d="M -30 30 L -40 35 L -30 35 Z" fill="#F97316" opacity="0.7" />
                    </motion.g>
                    
                    {/* Tech circuit patterns on body */}
                    <g opacity="0.3">
                      <motion.line 
                        x1="0" y1="0" x2="20" y2="0" 
                        stroke="#FFFFFF" 
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        animate={{ pathLength: [0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.line 
                        x1="5" y1="10" x2="25" y2="10" 
                        stroke="#FFFFFF" 
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        animate={{ pathLength: [0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <circle cx="20" cy="0" r="2" fill="#FFFFFF" />
                      <circle cx="25" cy="10" r="2" fill="#FFFFFF" />
                    </g>
                    
                    {/* Ripple effect */}
                    <motion.circle
                      cx="0"
                      cy="40"
                      r="50"
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.3)"
                      strokeWidth="2"
                      initial={{ r: 50, opacity: 0 }}
                      animate={{ 
                        r: [50, 80, 50],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </g>
                </svg>
              </motion.div>

            </div>

            {/* Tech capabilities */}
            <motion.div 
              style={styles.techCapabilities}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div style={styles.capabilitiesGrid}>
                {techCapabilities.map((tech, i) => (
                  <motion.div
                    key={tech}
                    style={styles.capabilityBadge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span style={styles.capabilityIcon}>✓</span>
                    <span>{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Stats & Testimonial */}
          {!isMobile && (
            <motion.div 
              style={styles.rightColumn}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Stats grid */}
              <div style={styles.statsGrid}>
                {[
                  { number: '3X', label: 'Faster Delivery' },
                  { number: '50+', label: 'AI Projects' },
                  { number: '98%', label: 'Success Rate' },
                  { number: '$10M+', label: 'Client Savings' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    style={styles.statCard}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ 
                      y: -5,
                      borderColor: 'rgba(251, 191, 36, 0.3)',
                      background: 'rgba(251, 191, 36, 0.02)',
                    }}
                  >
                    <div style={styles.statNumber}>{stat.number}</div>
                    <div style={styles.statLabel}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Project highlight card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  style={styles.highlightCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div style={styles.highlightHeader}>
                    <span style={styles.highlightBadge}>Why Choose Us</span>
                  </div>
                  <div style={styles.highlightMetric}>
                    {projectHighlights[currentTestimonial].metric}
                  </div>
                  <div style={styles.highlightDescription}>
                    {projectHighlights[currentTestimonial].description}
                  </div>
                  <div style={styles.highlightDetail}>
                    {projectHighlights[currentTestimonial].detail}
                  </div>
                  <motion.div 
                    style={styles.highlightCta}
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn how we deliver fast →</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Contact form modal */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={() => setContactFormOpen(false)}
        recipientEmail="leducsystems@gmail.com"
      />

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default HeroNew;