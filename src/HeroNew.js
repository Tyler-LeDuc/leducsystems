import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

const HeroNew = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
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
    "Custom Software Solutions",
    "AI Implementation Experts",
    "Claude-Powered Development",
    "Enterprise Applications"
  ];

  const projectHighlights = [
    {
      metric: "$2.5M+",
      description: "Average client revenue increase",
      detail: "Within first 12 months"
    },
    {
      metric: "3 Hours",
      description: "From idea to working prototype",
      detail: "AI-accelerated development"
    },
    {
      metric: "Zero",
      description: "Production downtime incidents",
      detail: "99.99% uptime guarantee"
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
          timeout = setTimeout(type, 3000); // Increased pause time at end of word
        } else {
          timeout = setTimeout(type, 100);
        }
      } else {
        setTypingText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % typingPhrases.length;
          timeout = setTimeout(type, 800); // Increased pause before next word
        } else {
          timeout = setTimeout(type, 50);
        }
      }
    };

    timeout = setTimeout(type, 1000);
    
    return () => clearTimeout(timeout);
  }, []);


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
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: isMobile ? '140px' : '160px', // Adjusted for phone bar + header height
      paddingBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
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
      width: isMobile ? '120px' : '160px',
      height: isMobile ? '120px' : '160px',
      marginLeft: '1rem',
      verticalAlign: 'middle',
    },
    duckSvg: {
      width: '100%',
      height: '100%',
      filter: 'drop-shadow(0 30px 60px rgba(251, 191, 36, 0.6)) drop-shadow(0 15px 30px rgba(245, 158, 11, 0.4))',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    leftColumn: {
      textAlign: 'center',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      minHeight: isMobile ? '3.5rem' : '5rem',
      display: 'flex',
      alignItems: 'center',
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
      maxWidth: '700px',
      margin: '0 auto 3rem',
    },
    ctaGroup: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
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
      justifyContent: 'center',
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
              Custom software development powered by Claude and cutting-edge AI. We transform your ideas into production-ready solutions.
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
                <span style={{ position: 'relative' }}>Schedule a Consultation</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              {/* Ultra Cool Animated Duck */}
              <motion.div 
                ref={duckRef}
                style={{
                  ...styles.floatingDuck,
                  x: smoothMouseX,
                  y: smoothMouseY,
                }}
                animate={{
                  y: [0, -15, -8, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <svg viewBox="0 0 200 250" style={styles.duckSvg}>
                  <defs>
                    {/* Enhanced gradients */}
                    <linearGradient id="duckGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient id="duckOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FB923C" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <radialGradient id="duckGlow">
                      <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </radialGradient>
                    {/* Metallic shimmer */}
                    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                      <motion.stop 
                        offset="0%" 
                        stopColor="#FFFFFF" 
                        stopOpacity="0"
                        animate={{ stopOpacity: [0, 0.4, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.stop 
                        offset="50%" 
                        stopColor="#FFFFFF" 
                        stopOpacity="0.3"
                        animate={{ stopOpacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.stop 
                        offset="100%" 
                        stopColor="#FFFFFF" 
                        stopOpacity="0"
                        animate={{ stopOpacity: [0, 0.4, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </linearGradient>
                    {/* Glow filter */}
                    <filter id="glow" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feColorMatrix in="coloredBlur" mode="matrix" 
                        values="1 0 0 0 0.95
                                0 1 0 0 0.75  
                                0 0 1 0 0.04
                                0 0 0 1 0"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    {/* Motion blur filter */}
                    <filter id="motionBlur">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="1,0" />
                    </filter>
                  </defs>
                  
                  <g transform="translate(100, 100)">
                    {/* Dynamic glow aura - properly centered */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="65"
                      fill="url(#duckGlow)"
                      filter="url(#glow)"
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
                    
                    {/* Bird body group - centered */}
                    <g transform="translate(0, 0)">
                    
                    {/* Shadow with motion */}
                    <motion.ellipse
                      cx="0"
                      cy="60"
                      rx="45"
                      ry="12"
                      fill="rgba(0,0,0,0.2)"
                      animate={{ 
                        scale: [1, 1.3, 1], 
                        opacity: [0.2, 0.1, 0.2] 
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Duck Body - Sleek and modern */}
                    <motion.path
                      d="M -35 15
                         C -35 -25, -15 -40, 20 -40
                         C 50 -40, 55 -25, 55 0
                         C 55 35, 40 45, 5 45
                         C -35 45, -45 35, -35 15"
                      fill="url(#duckGold)"
                      strokeWidth="3"
                      stroke="#F59E0B"
                      filter="url(#glow)"
                      animate={{ 
                        d: [
                          "M -35 15 C -35 -25, -15 -40, 20 -40 C 50 -40, 55 -25, 55 0 C 55 35, 40 45, 5 45 C -35 45, -45 35, -35 15",
                          "M -35 15 C -35 -28, -15 -43, 20 -43 C 50 -43, 55 -28, 55 0 C 55 38, 40 48, 5 48 C -35 48, -45 38, -35 15",
                          "M -35 15 C -35 -25, -15 -40, 20 -40 C 50 -40, 55 -25, 55 0 C 55 35, 40 45, 5 45 C -35 45, -45 35, -35 15"
                        ]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Body shimmer overlay */}
                    <motion.path
                      d="M -35 15
                         C -35 -25, -15 -40, 20 -40
                         C 50 -40, 55 -25, 55 0
                         C 55 35, 40 45, 5 45
                         C -35 45, -45 35, -35 15"
                      fill="url(#shimmer)"
                      opacity="0.4"
                    />
                    
                    {/* Dynamic Wing with feather details */}
                    <motion.g
                      animate={{ 
                        rotate: [-10, 10, -10],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                      style={{ transformOrigin: "0px 0px" }}
                    >
                      <motion.path
                        d="M -10 5
                           C -10 -20, 10 -25, 25 -15
                           C 40 -5, 40 15, 25 30
                           C 10 40, -10 30, -10 5"
                        fill="#F59E0B"
                        opacity="0.9"
                        filter="url(#motionBlur)"
                        animate={{ 
                          d: [
                            "M -10 5 C -10 -20, 10 -25, 25 -15 C 40 -5, 40 15, 25 30 C 10 40, -10 30, -10 5",
                            "M -10 5 C -15 -25, 15 -30, 30 -15 C 45 -5, 45 15, 30 35 C 15 45, -10 35, -10 5",
                            "M -10 5 C -10 -20, 10 -25, 25 -15 C 40 -5, 40 15, 25 30 C 10 40, -10 30, -10 5"
                          ]
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          ease: "easeInOut"
                        }}
                      />
                      {/* Wing feather lines */}
                      <line x1="5" y1="-5" x2="20" y2="-15" stroke="#EA580C" strokeWidth="2" opacity="0.6" />
                      <line x1="10" y1="5" x2="25" y2="-5" stroke="#EA580C" strokeWidth="2" opacity="0.6" />
                      <line x1="15" y1="15" x2="30" y2="5" stroke="#EA580C" strokeWidth="2" opacity="0.6" />
                    </motion.g>
                    
                    {/* Sleek Beak with gradient */}
                    <motion.path
                      d="M 50 -12 L 68 -10 L 50 -8 Z"
                      fill="url(#duckOrange)"
                      filter="url(#glow)"
                      animate={{ 
                        scaleX: [1, 1.15, 1],
                        x: [0, 2, 0]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                      style={{ transformOrigin: "50px -10px" }}
                    />
                    
                    {/* Expressive Eye with tech details */}
                    <g filter="url(#glow)">
                      {/* Eye socket */}
                      <ellipse cx="30" cy="-18" rx="12" ry="10" fill="#FFFFFF" />
                      {/* Iris with animation */}
                      <motion.ellipse 
                        cx="30" 
                        cy="-18" 
                        rx="7" 
                        ry="7"
                        fill="#1F2937"
                        animate={{ 
                          rx: [7, 5, 7],
                          ry: [7, 5, 7],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                        }}
                      />
                      {/* Pupil */}
                      <circle cx="30" cy="-18" r="3" fill="#000000" />
                      {/* Eye highlights */}
                      <circle cx="33" cy="-21" r="3" fill="#FFFFFF" opacity="0.9" />
                      <circle cx="28" cy="-16" r="1.5" fill="#FFFFFF" opacity="0.7" />
                    </g>
                    
                    {/* Stylized tail feathers */}
                    <motion.g
                      animate={{ 
                        rotate: [-5, 8, -5],
                        x: [0, -3, 0]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      style={{ transformOrigin: "-35px 35px" }}
                    >
                      <path d="M -35 30 L -48 35 L -35 35 Z" fill="#F59E0B" opacity="0.8" />
                      <path d="M -35 35 L -50 42 L -35 40 Z" fill="#F97316" opacity="0.8" />
                      <path d="M -35 40 L -48 48 L -35 45 Z" fill="#EA580C" opacity="0.8" />
                    </motion.g>
                    
                    {/* Tech circuit patterns - enhanced */}
                    <g opacity="0.5">
                      <motion.path
                        d="M 0 0 L 25 0 L 25 10 L 35 10"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        animate={{ 
                          pathLength: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.circle 
                        cx="25" 
                        cy="0" 
                        r="3" 
                        fill="#FFFFFF"
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: 0.5
                        }}
                      />
                      <motion.circle 
                        cx="35" 
                        cy="10" 
                        r="3" 
                        fill="#FFFFFF"
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: 1
                        }}
                      />
                    </g>
                    
                    {/* Energy particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.circle
                        key={i}
                        r="2"
                        fill="#FBBF24"
                        initial={{ 
                          x: 0, 
                          y: 0,
                          opacity: 0 
                        }}
                        animate={{ 
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2 + Math.random() * 2, 
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                    
                    </g> {/* End of bird body group */}
                    
                    {/* Ripple effects - centered */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="60"
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.4)"
                      strokeWidth="3"
                      initial={{ r: 60, opacity: 0 }}
                      animate={{ 
                        r: [60, 100, 60],
                        opacity: [0, 0.4, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="60"
                      fill="none"
                      stroke="rgba(245, 158, 11, 0.3)"
                      strokeWidth="2"
                      initial={{ r: 60, opacity: 0 }}
                      animate={{ 
                        r: [60, 90, 60],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5
                      }}
                    />
                    
                    {/* Additional halo effect - centered */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="80"
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.2)"
                      strokeWidth="1"
                      strokeDasharray="5 10"
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ transformOrigin: "0px 0px" }}
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

            {/* Stats section - centered */}
            <motion.div 
              style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '3rem',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { number: '87%', label: 'Revenue Growth' },
                { number: '5-10X', label: 'ROI Average' },
                { number: '60%', label: 'Cost Reduction' },
                { number: '2-4 Wks', label: 'Time to Market' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  style={{
                    textAlign: 'center',
                    minWidth: '120px',
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                >
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.5rem',
                  }}>{stat.number}</div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#94A3B8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.section>

      {/* Contact form modal */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={() => setContactFormOpen(false)}
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