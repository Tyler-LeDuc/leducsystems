import React, { useState, useEffect, useRef } from 'react';
import { commonStyles } from './utils/styles';

const About = () => {
  const [visibleSection, setVisibleSection] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sectionRefs = {
    mission: useRef(null),
    values: useRef(null),
    history: useRef(null),
    team: useRef(null),
    testimonials: useRef(null)
  };
  
  // Counter animation for statistics
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 50,
    uptime: 80
  });
  
  const statsTarget = {
    projects: 50,
    clients: 15,
    satisfaction: 98,
    uptime: 99
  };
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id);
          
          // Start counter animation when stats section is visible
          if (entry.target.id === 'stats' && counters.projects === 0) {
            animateCounters();
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [counters]);
  
  // Animate statistic counters
  const animateCounters = () => {
    const duration = 2000; // Animation duration in ms
    const steps = 60; // Number of steps in the animation
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      // Using the easeOutQuad function
      const progress = step / steps * (2 - step / steps);
      
      setCounters({
        projects: Math.floor(progress * statsTarget.projects),
        clients: Math.floor(progress * statsTarget.clients),
        satisfaction: Math.floor(progress * statsTarget.satisfaction),
        uptime: Math.floor(progress * statsTarget.uptime)
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setCounters(statsTarget);
      }
    }, interval);
  };
  

  // Define hover state handling functions
  const [hoveredElement, setHoveredElement] = useState(null);
  
  const handleMouseEnter = (element) => {
    setHoveredElement(element);
  };
  
  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  // Responsive styles
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  
  const styles = {
    about: {
      backgroundColor: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '3rem 0' : '5rem 0',
    },
    aboutPattern: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: isMobile ? '150px' : '300px',
      height: isMobile ? '150px' : '300px',
      background: 'radial-gradient(circle at center, #EBF8FF 0%, transparent 70%)',
      opacity: 0.6,
      borderRadius: '50%',
      zIndex: 0,
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '2rem' : '4rem',
      position: 'relative',
      zIndex: 1,
      marginBottom: isMobile ? '2rem' : '4rem',
    },
    aboutContent: {
      textAlign: 'left',
      padding: isMobile ? '0 1rem' : '0',
    },
    aboutImageContainer: {
      position: 'relative',
      height: isMobile ? 'auto' : '110%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: isMobile ? '0 1rem' : '0',
    },
    aboutImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transform: isMobile ? 'none' : 'perspective(1000px) rotateY(-5deg)',
      transition: 'all 0.5s ease',
      position: 'relative',
      zIndex: 1,
    },      
    aboutImagePattern: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '15px',
      left: '15px',
      background: 'linear-gradient(135deg, #4299E1 0%, #1A365D 100%)',
      borderRadius: '12px',
      zIndex: -1,
      transform: isMobile ? 'none' : 'perspective(1000px) rotateY(-5deg)',
      transition: 'all 0.5s ease',
    },      
    aboutTitle: {
      fontSize: isMobile ? '1.75rem' : '2.25rem',
      marginBottom: '1.5rem',
      color: '#1A365D',
      fontWeight: 700,
      position: 'relative',
      display: 'inline-block',
    },
    aboutTitleUnderline: {
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      width: isMobile ? '40px' : '60px',
      height: '3px',
      background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      borderRadius: '2px',
    },
    aboutText: {
      marginBottom: '1.5rem',
      color: '#2D3748',
      lineHeight: 1.8,
      fontSize: isMobile ? '1rem' : '1.1rem',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
      marginTop: isMobile ? '2rem' : '3rem',
      marginBottom: isMobile ? '2rem' : '4rem',
      padding: isMobile ? '0 1rem' : '0',
    },
    valueCard: {
      backgroundColor: '#F7FAFC',
      padding: isMobile ? '1.25rem' : '1.75rem',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #EDF2F7',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    valueCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    valueCardActive: {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
      background: 'linear-gradient(135deg, #F7FAFC 0%, #EBF8FF 100%)',
    },
    valueIconContainer: {
      width: isMobile ? '50px' : '70px',
      height: isMobile ? '50px' : '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #4299E1 0%, #1A365D 100%)',
      marginBottom: '1.25rem',
      position: 'relative',
      zIndex: 1,
      boxShadow: '0 8px 15px rgba(66, 153, 225, 0.3)',
    },
    valueIcon: {
      color: '#FFFFFF',
      fontSize: isMobile ? '1.75rem' : '2.25rem',
      fontWeight: 700,
    },
    valueTitle: {
      fontSize: isMobile ? '1.2rem' : '1.35rem',
      marginBottom: '0.75rem',
      color: '#1A365D',
      fontWeight: 700,
    },
    
    // Stats Section
    statsSection: {
      marginTop: isMobile ? '1rem' : '2rem',
      marginBottom: isMobile ? '3rem' : '5rem',
      padding: isMobile ? '2rem 1rem' : '4rem 0',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E6F6FF 100%)',
      borderRadius: isMobile ? '12px' : '16px',
      position: 'relative',
      overflow: 'hidden',
      margin: isMobile ? '1rem' : '2rem 0 5rem 0',
    },
    statsPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'radial-gradient(#4299E1 1px, transparent 1px), radial-gradient(#4299E1 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px',
      opacity: 0.1,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      position: 'relative',
      zIndex: 1,
    },
    statItem: {
      textAlign: 'center',
      padding: isMobile ? '0.75rem' : '1.5rem',
    },
    statNumber: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      fontWeight: 800,
      color: '#1A365D',
      marginBottom: '0.75rem',
      background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    },
    statTitle: {
      fontSize: isMobile ? '1rem' : '1.25rem',
      color: '#2D3748',
      fontWeight: 600,
    },
    statDescription: {
      fontSize: isMobile ? '0.85rem' : '1rem',
      color: '#4A5568',
      marginTop: '0.5rem',
    },
    
    // History Timeline Section
    historySection: {
      marginBottom: isMobile ? '3rem' : '5rem',
      position: 'relative',
      padding: isMobile ? '0 1rem' : '0',
    },
    timelineContainer: {
      position: 'relative',
      marginTop: isMobile ? '2rem' : '3rem',
      paddingLeft: isMobile ? '1.5rem' : '2rem',
    },
    timelineLine: {
      position: 'absolute',
      left: 0,
      top: '10px',
      bottom: '10px',
      width: '3px',
      background: 'linear-gradient(to bottom, #4299E1 0%, #1A365D 100%)',
      borderRadius: '3px',
    },
    timelineItem: {
      position: 'relative',
      marginBottom: isMobile ? '2rem' : '3rem',
      paddingLeft: isMobile ? '1.5rem' : '2rem',
    },
    timelineDot: {
      position: 'absolute',
      left: '-10px',
      top: '6px',
      width: isMobile ? '16px' : '20px',
      height: isMobile ? '16px' : '20px',
      backgroundColor: '#4299E1',
      borderRadius: '50%',
      border: '3px solid white',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.3)',
    },
    timelineYear: {
      display: 'inline-block',
      padding: isMobile ? '0.3rem 0.8rem' : '0.4rem 1rem',
      backgroundColor: '#4299E1',
      color: 'white',
      borderRadius: '20px',
      fontWeight: 600,
      fontSize: isMobile ? '0.9rem' : '1rem',
      marginBottom: '1rem',
    },
    timelineTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      color: '#1A365D',
      fontWeight: 700,
      marginBottom: '0.75rem',
    },
    timelineDescription: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#2D3748',
      lineHeight: 1.7,
    },
    
    // Team Section
    teamSection: {
      marginBottom: isMobile ? '3rem' : '5rem',
      padding: isMobile ? '0 1rem' : '0',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2.5rem',
      marginTop: isMobile ? '2rem' : '3rem',
    },
    teamMember: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid #EDF2F7',
    },
    teamMemberHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 35px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    teamMemberImage: {
      width: '100%',
      height: isMobile ? '220px' : '280px',
      objectFit: 'cover',
    },
    teamMemberInfo: {
      padding: isMobile ? '1.25rem' : '1.5rem',
    },
    teamMemberName: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '0.5rem',
    },
    teamMemberRole: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#4299E1',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    teamMemberBio: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#2D3748',
      lineHeight: 1.6,
      marginBottom: '1.25rem',
    },
    teamSocialLinks: {
      display: 'flex',
      gap: '0.75rem',
    },
    socialLink: {
      width: isMobile ? '32px' : '36px',
      height: isMobile ? '32px' : '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EBF8FF',
      color: '#4299E1',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    socialLinkHover: {
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
    },
    
    // Project Showcase styles
    projectShowcase: {
      marginBottom: isMobile ? '3rem' : '5rem',
      position: 'relative',
      zIndex: 1,
      padding: isMobile ? '0 1rem' : '0',
    },
    projectShowcaseTitle: {
      fontSize: isMobile ? '1.75rem' : '2.25rem',
      marginBottom: isMobile ? '1.5rem' : '2.5rem',
      color: '#1A365D',
      fontWeight: 700,
      textAlign: 'center',
    },
    projectTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '0.5rem' : '1rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      flexWrap: 'wrap',
      padding: isMobile ? '0 0.5rem' : '0',
    },
    projectTab: {
      padding: isMobile ? '0.6rem 1rem' : '0.85rem 1.75rem',
      backgroundColor: '#F7FAFC',
      color: '#2D3748',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 600,
      border: '1px solid #EDF2F7',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      fontSize: isMobile ? '0.85rem' : '1rem',
      marginBottom: isMobile ? '0.5rem' : '0',
    },
    projectTabActive: {
      backgroundColor: '#1A365D',
      color: '#FFFFFF',
      boxShadow: '0 8px 15px rgba(26, 54, 93, 0.15)',
      transform: 'translateY(-3px)',
    },
    projectTabHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    projectContent: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
      gap: isMobile ? '2rem' : '3rem',
      alignItems: 'center',
      backgroundColor: '#F7FAFC',
      padding: isMobile ? '1.5rem' : '3rem',
      borderRadius: '16px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    },
    projectPattern: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: isMobile ? '80px' : '150px',
      height: isMobile ? '80px' : '150px',
      background: 'radial-gradient(circle at center, rgba(66, 153, 225, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      zIndex: 0,
    },
    projectImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.4s ease',
      transform: isMobile ? 'none' : 'rotate(-2deg)',
      zIndex: 1,
      position: 'relative',
    },
    projectImageHover: {
      transform: 'rotate(0deg) scale(1.03)',
    },
    projectDetails: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 1,
    },
    projectTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      marginBottom: isMobile ? '1rem' : '1.25rem',
      color: '#1A365D',
      fontWeight: 700,
    },
    projectDescription: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#2D3748',
      lineHeight: 1.8,
      marginBottom: isMobile ? '1.25rem' : '1.75rem',
    },
    projectStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: isMobile ? '1.25rem' : '1.75rem',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: isMobile ? '1rem' : '1.25rem',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      gap: isMobile ? '0.5rem' : '0',
    },
    projectStat: {
      textAlign: 'center',
      flex: 1,
      minWidth: isMobile ? '45%' : 'auto',
      marginBottom: isMobile ? '0.5rem' : '0',
    },
    projectStatNumber: {
      fontSize: isMobile ? '1.5rem' : '1.75rem',
      fontWeight: 800,
      color: '#4299E1',
      marginBottom: '0.5rem',
    },
    projectStatLabel: {
      color: '#2D3748',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      fontWeight: 500,
    },
    projectTech: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? '0.5rem' : '0.75rem',
      marginBottom: isMobile ? '1.25rem' : '1.75rem',
    },
    techTag: {
      backgroundColor: 'rgba(66, 153, 225, 0.1)',
      color: '#4299E1',
      padding: isMobile ? '0.4rem 0.75rem' : '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      fontWeight: 600,
      border: '1px solid rgba(66, 153, 225, 0.2)',
      transition: 'all 0.2s ease',
    },
    techTagHover: {
      backgroundColor: 'rgba(66, 153, 225, 0.2)',
      transform: 'translateY(-2px)',
    },
    projectCta: {
      display: 'inline-block',
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
      padding: isMobile ? '0.75rem 1.5rem' : '0.85rem 1.75rem',
      borderRadius: '8px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    projectCtaHover: {
      backgroundColor: '#2B6CB0',
      transform: 'translateY(-3px)',
      boxShadow: '0 7px 14px rgba(66, 153, 225, 0.4)',
    },
    
    // Testimonials Section
    testimonialsSection: {
      marginBottom: isMobile ? '3rem' : '5rem',
      position: 'relative',
      padding: isMobile ? '0 1rem' : '0',
    },
    testimonialGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
      gap: isMobile ? '1.5rem' : '2.5rem',
      marginTop: isMobile ? '2rem' : '3rem',
    },
    testimonialCard: {
      backgroundColor: '#FFFFFF',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: isMobile ? '12px' : '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      border: '1px solid #EDF2F7',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    testimonialCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 35px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    testimonialQuote: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      color: '#4299E1',
      opacity: 0.2,
      position: 'absolute',
      top: isMobile ? '15px' : '20px',
      right: isMobile ? '15px' : '25px',
      fontFamily: 'Georgia, serif',
    },
    testimonialText: {
      fontSize: isMobile ? '1rem' : '1.15rem',
      color: '#2D3748',
      lineHeight: 1.8,
      marginBottom: isMobile ? '1.5rem' : '2rem',
      fontStyle: 'italic',
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
    },
    testimonialImage: {
      width: isMobile ? '50px' : '60px',
      height: isMobile ? '50px' : '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '1rem',
      border: '3px solid #EBF8FF',
    },
    testimonialInfo: {
      flex: 1,
    },
    testimonialName: {
      fontSize: isMobile ? '1.1rem' : '1.25rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '0.25rem',
    },
    testimonialRole: {
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      color: '#4A5568',
    },
    testimonialCompany: {
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      color: '#4299E1',
      fontWeight: 600,
    },
  };

  
  // Team members data - keeping it general for now as a small team
  const teamMembers = [];
  
  // Technology milestones
  const historyTimeline = [
    {
      year: "AI & ML",
      title: "Advanced Intelligence Solutions",
      description: "Leveraging state-of-the-art machine learning models including GPT-4, Claude, and custom-trained models to deliver intelligent automation, predictive analytics, and natural language understanding capabilities."
    },
    {
      year: "Cloud",
      title: "Enterprise-Grade Infrastructure",
      description: "Building on AWS, Azure, and Google Cloud platforms with expertise in serverless architectures, containerization with Kubernetes, and auto-scaling solutions for optimal performance and cost efficiency."
    },
    {
      year: "Innovation",
      title: "Continuous Technology Evolution",
      description: "Staying at the forefront of technological advancement with expertise in emerging technologies like edge computing, blockchain integration, and quantum-ready algorithms for future-proof solutions."
    }
  ];
  
  // Client testimonials - removed for now as we're a new business
  const testimonials = [];

  return (
    <section id="about" style={{...styles.about, ...commonStyles.section}}>
      <div style={styles.aboutPattern}></div>
      <div style={{
        ...commonStyles.container,
        maxWidth: isMobile ? '100%' : '1200px',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        
        {/* Mission & Approach Section */}
        <div style={styles.aboutGrid} ref={sectionRefs.mission} id="mission">
          <div style={styles.aboutContent}>
            <h3 style={styles.aboutTitle}>
              Technology-First Vision
              <div style={styles.aboutTitleUnderline}></div>
            </h3>
            <p style={styles.aboutText}>
              Le Duc Systems harnesses cutting-edge AI and cloud technologies to transform how businesses operate. Our expertise spans from advanced machine learning models to scalable enterprise architectures, enabling organizations to leverage the full potential of modern technology.
            </p>
            <p style={styles.aboutText}>
              We specialize in building intelligent systems that adapt and evolve with your business needs. By combining deep technical expertise with practical implementation experience, we deliver solutions that not only meet today's challenges but position you for tomorrow's opportunities.
            </p>
          </div>
          
          <div style={styles.aboutImageContainer}>
            <div 
              style={{
                ...styles.aboutImagePattern, 
                ...(hoveredElement === 'aboutImage' ? {
                  transform: isMobile ? 'translateY(-5px)' : 'perspective(1000px) rotateY(-2deg) translateY(-5px)'
                } : {})
              }}
            ></div>
            <div 
              style={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                ...styles.aboutImage, 
                ...(hoveredElement === 'aboutImage' ? {
                  transform: isMobile ? 'translateY(-5px)' : 'perspective(1000px) rotateY(-2deg) translateY(-5px)'
                } : {})
              }}
              onMouseEnter={() => handleMouseEnter('aboutImage')}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src="/duck-icon.png" 
                alt="Le Duc Systems Duck Logo" 
                style={{height: '220px', width: 'auto', marginBottom: '15px'}} 
              />
              <div style={{
                fontWeight: 700, 
                color: '#1A365D',
                fontSize: '2.2rem',
                letterSpacing: '0.5px',
                lineHeight: 1.1,
                textAlign: 'center'
              }}>
                <div>Le Duc</div>
                <div>Systems</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div style={styles.valuesGrid} ref={sectionRefs.values} id="values">
          <div 
            style={{
              ...styles.valueCard,
              ...(hoveredElement === 'value1' ? styles.valueCardHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('value1')}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.valueIconContainer}>
              <div style={styles.valueIcon}>🎯</div>
            </div>
            <h4 style={styles.valueTitle}>AI Expertise</h4>
            <p style={{...styles.aboutText, marginBottom: 0, fontSize: isMobile ? '0.95rem' : '1rem'}}>
              Deep expertise in machine learning, natural language processing, and computer vision to build intelligent solutions that drive real business value.
            </p>
          </div>
          
          <div 
            style={{
              ...styles.valueCard,
              ...(hoveredElement === 'value2' ? styles.valueCardHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('value2')}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.valueIconContainer}>
              <div style={styles.valueIcon}>🚀</div>
            </div>
            <h4 style={styles.valueTitle}>Cloud Architecture</h4>
            <p style={{...styles.aboutText, marginBottom: 0, fontSize: isMobile ? '0.95rem' : '1rem'}}>
              Scalable cloud-native architectures using AWS, Azure, and GCP to ensure your applications perform reliably at any scale.
            </p>
          </div>
          
          <div 
            style={{
              ...styles.valueCard,
              ...(hoveredElement === 'value3' ? styles.valueCardHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('value3')}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.valueIconContainer}>
              <div style={styles.valueIcon}>💡</div>
            </div>
            <h4 style={styles.valueTitle}>Full-Stack Development</h4>
            <p style={{...styles.aboutText, marginBottom: 0, fontSize: isMobile ? '0.95rem' : '1rem'}}>
              End-to-end development capabilities from responsive front-ends to robust APIs and microservices architectures.
            </p>
          </div>
          
          <div 
            style={{
              ...styles.valueCard,
              ...(hoveredElement === 'value4' ? styles.valueCardHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('value4')}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.valueIconContainer}>
              <div style={styles.valueIcon}>🤝</div>
            </div>
            <h4 style={styles.valueTitle}>Data Engineering</h4>
            <p style={{...styles.aboutText, marginBottom: 0, fontSize: isMobile ? '0.95rem' : '1rem'}}>
              Advanced data pipelines and analytics platforms that transform raw data into actionable insights for informed decision-making.
            </p>
          </div>
        </div>
        
        {/* Stats Section */}
        <div style={styles.statsSection} ref={sectionRefs.stats} id="stats">
          <div style={styles.statsPattern}></div>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.projects}+</div>
              <div style={styles.statTitle}>Projects Delivered</div>
              <div style={styles.statDescription}>Across industries</div>
            </div>
            
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.clients}+</div>
              <div style={styles.statTitle}>Happy Clients</div>
              <div style={styles.statDescription}>And counting</div>
            </div>
            
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.satisfaction}%</div>
              <div style={styles.statTitle}>Client Satisfaction</div>
              <div style={styles.statDescription}>Average rating</div>
            </div>
            
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.uptime}.9%</div>
              <div style={styles.statTitle}>System Uptime</div>
              <div style={styles.statDescription}>Reliability guaranteed</div>
            </div>
          </div>
        </div>
        
        {/* Our Journey Section */}
        <div style={styles.historySection} ref={sectionRefs.history} id="history">
          <h3 style={{
            ...styles.aboutTitle, 
            textAlign: 'center', 
            display: 'block', 
            marginBottom: isMobile ? '1.5rem' : '2.5rem'
          }}>
            Our Technology Stack
            <div style={{
              ...styles.aboutTitleUnderline, 
              left: '50%', 
              transform: 'translateX(-50%)'
            }}></div>
          </h3>
          
          <div style={styles.timelineContainer}>
            <div style={styles.timelineLine}></div>
            {historyTimeline.map((item, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineDot}></div>
                <div style={styles.timelineYear}>{item.year}</div>
                <h4 style={styles.timelineTitle}>{item.title}</h4>
                <p style={styles.timelineDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;