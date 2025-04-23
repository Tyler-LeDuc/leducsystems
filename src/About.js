import React, { useState, useEffect, useRef } from 'react';
import { commonStyles } from './utils/styles';
import { projects } from './data/projects';

const About = () => {
  const [activeProject, setActiveProject] = useState(1);
  const [visibleSection, setVisibleSection] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sectionRefs = {
    mission: useRef(null),
    values: useRef(null),
    history: useRef(null),
    team: useRef(null),
    projects: useRef(null),
    testimonials: useRef(null)
  };
  
  // Counter animation for statistics
  const [counters, setCounters] = useState({
    clients: 25,
    projects: 100,
    awards: 3,
    years: 7
  });
  
  const statsTarget = {
    clients: 85,
    projects: 240,
    awards: 17,
    years: 6
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
          if (entry.target.id === 'stats' && counters.clients === 25) {
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
        clients: Math.floor(progress * statsTarget.clients),
        projects: Math.floor(progress * statsTarget.projects),
        awards: Math.floor(progress * statsTarget.awards),
        years: Math.floor(progress * statsTarget.years)
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setCounters(statsTarget);
      }
    }, interval);
  };
  
  // Project showcase navigation
  const handleProjectChange = (id) => {
    setActiveProject(id);
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

  // Get the active project
  const currentProject = projects.find(project => project.id === activeProject);
  
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sophie Le Duc",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "Former Google engineer with 15+ years of experience building scalable enterprise systems. Sophie founded Le Duc Systems with a vision to democratize access to enterprise-grade technology.",
      social: ["linkedin", "twitter", "github"]
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "AI and machine learning specialist with a PhD from MIT. Marcus leads our technical strategy and ensures our solutions leverage cutting-edge technology that delivers real business impact.",
      social: ["linkedin", "github"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Lead Solutions Architect",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "Cloud architecture expert with experience scaling systems for Fortune 500 companies. Elena ensures our solutions are robust, secure, and built for scale from day one.",
      social: ["linkedin", "github", "medium"]
    }
  ];
  
  // Company history timeline
  const historyTimeline = [
    {
      year: "2018",
      title: "Founded in San Francisco",
      description: "Le Duc Systems was founded by Sophie Le Duc with a small team of three engineers focused on building custom enterprise software solutions for local businesses."
    },
    {
      year: "2019",
      title: "First Major Client & Series A Funding",
      description: "Secured our first Fortune 500 client and closed a $5M Series A funding round led by Accel Partners, allowing us to expand our team and service offerings."
    },
    {
      year: "2020",
      title: "Launch of CloudScale™ Platform",
      description: "Developed our proprietary CloudScale™ platform, enabling mid-sized businesses to leverage enterprise-grade infrastructure at a fraction of the traditional cost."
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Opened offices in London and Singapore, expanding our global presence and bringing our solutions to international markets with a team of 50+ talented professionals."
    },
    {
      year: "2023",
      title: "AI Integration & Series B Funding",
      description: "Integrated advanced AI capabilities into our core offerings and secured $25M in Series B funding to accelerate product development and market expansion."
    },
    {
      year: "2024",
      title: "Launch of SecureEdge™ Solutions",
      description: "Introduced our SecureEdge™ suite of products focused on edge computing security, establishing Le Duc Systems as a leader in the secure IoT infrastructure space."
    }
  ];
  
  // Client testimonials
  const testimonials = [
    {
      id: 1,
      text: "We initially hired Le Duc Systems to fix our customer portal issues. Despite some initial timeline challenges, they delivered a solution that cut our server costs by 32% and reduced page load times from 6 seconds to under 1.5.",
      name: "Home Builder Client",
      role: "IT Director",
      company: "Fulton Homes",
      image: null
    },
    {
      id: 2,
      text: "After recurring security breaches, we implemented their SecureEdge system. The onboarding took longer than planned but the results speak for themselves - zero incidents in 14 months and our compliance audits are finally passing.",
      name: "Financial Services Client",
      role: "",
      company: "",
      image: null
    },
    {
      id: 3,
      text: "I was skeptical about moving our legacy healthcare systems to CloudScale. The transition had some disruptions, but our processing time dropped from 4 hours to 20 minutes, transforming our business.",
      name: "Healthcare Technology Client",
      role: "",
      company: "",
      image: null
    },
    {
      id: 4,
      text: "As a small construction firm, Le Duc's modular approach let us implement just what we needed within budget. Their project management tool eliminated double-bookings and material shortages that were costing us thousands monthly.",
      name: "Small Business Client",
      role: "",
      company: "",
      image: null
    }
  ];

  return (
    <section id="about" style={{...styles.about, ...commonStyles.section}}>
      <div style={styles.aboutPattern}></div>
      <div style={{
        ...commonStyles.container,
        maxWidth: isMobile ? '100%' : '1200px',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        <h2 style={{
          ...commonStyles.sectionTitle,
          fontSize: isMobile ? '2rem' : '2.5rem',
          marginBottom: isMobile ? '1rem' : '1.5rem'
        }}>
          About <span style={commonStyles.sectionHighlight}>Le Duc Systems</span>
        </h2>
        <div style={{
          ...commonStyles.sectionTitleLine,
          width: isMobile ? '60px' : '80px'
        }}></div>
        <p style={{
          ...commonStyles.sectionIntro,
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          marginBottom: isMobile ? '2rem' : '3rem'
        }}>
          Delivering transformative technology solutions that drive measurable business outcomes since 2018
        </p>
        
        {/* Mission & Approach Section */}
        <div style={styles.aboutGrid} ref={sectionRefs.mission} id="mission">
          <div style={styles.aboutContent}>
            <h3 style={styles.aboutTitle}>
              Our Mission
              <div style={styles.aboutTitleUnderline}></div>
            </h3>
            <p style={styles.aboutText}>
              At Le Duc Systems, we're on a mission to democratize access to enterprise-grade technology. We believe every business deserves robust, scalable software solutions that can compete with industry giants—without the enterprise price tag or complexity.
            </p>
            <p style={styles.aboutText}>
              Through our innovative platforms and dedicated expertise, we empower organizations to accelerate their digital transformation journey, optimize operations, and drive sustainable growth in an increasingly competitive landscape.
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
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Le Duc Systems Team" 
              style={{
                ...styles.aboutImage, 
                ...(hoveredElement === 'aboutImage' ? {
                  transform: isMobile ? 'translateY(-5px)' : 'perspective(1000px) rotateY(-2deg) translateY(-5px)'
                } : {})
              }}
              onMouseEnter={() => handleMouseEnter('aboutImage')}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
        
        {/* Stats Section */}
        <div style={styles.statsSection} ref={sectionRefs.stats} id="stats">
          <div style={styles.statsPattern}></div>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.clients}+</div>
              <div style={styles.statTitle}>Global Clients</div>
              <div style={styles.statDescription}>Across 12 industries</div>
            </div>
            
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.projects}+</div>
              <div style={styles.statTitle}>Projects Delivered</div>
              <div style={styles.statDescription}>With 98% client satisfaction</div>
            </div>
            
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.awards}</div>
              <div style={styles.statTitle}>Industry Awards</div>
              <div style={styles.statDescription}>For innovation & excellence</div>
            </div>
            
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{counters.years}</div>
              <div style={styles.statTitle}>Years of Growth</div>
              <div style={styles.statDescription}>And continuous innovation</div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div style={styles.testimonialsSection} ref={sectionRefs.testimonials} id="testimonials">
          <h3 style={{
            ...styles.aboutTitle, 
            textAlign: 'center', 
            display: 'block', 
            marginBottom: isMobile ? '1.5rem' : '2.5rem'
          }}>
            Client Feedback
            <div style={{
              ...styles.aboutTitleUnderline, 
              left: '50%', 
              transform: 'translateX(-50%)'
            }}></div>
          </h3>
          
          <div style={styles.testimonialGrid}>
            {testimonials.slice(0, isMobile ? 2 : 4).map((testimonial) => (
              <div 
                key={testimonial.id} 
                style={{
                  ...styles.testimonialCard,
                  ...(hoveredElement === `testimonial${testimonial.id}` ? styles.testimonialCardHover : {})
                }}
                onMouseEnter={() => handleMouseEnter(`testimonial${testimonial.id}`)}
                onMouseLeave={handleMouseLeave}
              >
                <div style={styles.testimonialQuote}>"</div>
                <p style={styles.testimonialText}>{testimonial.text}</p>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'rgba(66, 153, 225, 0.1)',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: 600,
                    color: '#2B6CB0'
                  }}>
                    {testimonial.name}
                    {testimonial.role && ` • ${testimonial.role}`}
                    {testimonial.company && ` • ${testimonial.company}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;