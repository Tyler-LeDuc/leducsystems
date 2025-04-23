import React, { useState, useEffect, useRef } from 'react';
import { commonStyles } from './utils/styles';
import { projects } from './data/projects';

const About = () => {
  const [activeProject, setActiveProject] = useState(1);
  const [visibleSection, setVisibleSection] = useState('');
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
    clients: 20,
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
          if (entry.target.id === 'stats' && counters.clients === 0) {
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
      const progress = Math.easeOutQuad(step / steps);
      
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
  
  // Easing function for smoother animation
  Math.easeOutQuad = (t) => t * (2 - t);
  
  // Project showcase navigation
  const handleProjectChange = (id) => {
    setActiveProject(id);
  };

  const styles = {
    about: {
      backgroundColor: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
    },
    aboutPattern: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle at center, #EBF8FF 0%, transparent 70%)',
      opacity: 0.6,
      borderRadius: '50%',
      zIndex: 0,
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '4rem',
      position: 'relative',
      zIndex: 1,
      marginBottom: '4rem',
    },
    aboutContent: {
      textAlign: 'left',
    },
    aboutImageContainer: {
        position: 'relative',
        height: '110%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    aboutImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transform: 'perspective(1000px) rotateY(-5deg)',
        transition: 'all 0.5s ease',
        position: 'relative',     // Add position relative to work with the pattern
        zIndex: 1,                // Ensure image is above the pattern
        },      
    aboutImagePattern: {
        position: 'absolute',
        width: '100%',            // Match the image width
        height: '100%',           // Match the image height
        top: '15px',              // Offset to create the frame effect
        left: '15px',             // Offset to create the frame effect
        background: 'linear-gradient(135deg, #4299E1 0%, #1A365D 100%)',
        borderRadius: '12px',     // Match the image border radius
        zIndex: -1,
        transform: 'perspective(1000px) rotateY(-5deg)',
        transition: 'all 0.5s ease',
      },      
    aboutTitle: {
      fontSize: '2.25rem',
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
      width: '60px',
      height: '3px',
      background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      borderRadius: '2px',
    },
    aboutText: {
      marginBottom: '1.5rem',
      color: '#2D3748',
      lineHeight: 1.8,
      fontSize: '1.1rem',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
      marginTop: '3rem',
      marginBottom: '4rem',
    },
    valueCard: {
      backgroundColor: '#F7FAFC',
      padding: '1.75rem',
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
      width: '70px',
      height: '70px',
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
      fontSize: '2.25rem',
      fontWeight: 700,
    },
    valueTitle: {
      fontSize: '1.35rem',
      marginBottom: '0.75rem',
      color: '#1A365D',
      fontWeight: 700,
    },
    
    // Stats Section
    statsSection: {
      marginTop: '2rem',
      marginBottom: '5rem',
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E6F6FF 100%)',
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden',
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
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      position: 'relative',
      zIndex: 1,
    },
    statItem: {
      textAlign: 'center',
      padding: '1.5rem',
    },
    statNumber: {
      fontSize: '3.5rem',
      fontWeight: 800,
      color: '#1A365D',
      marginBottom: '0.75rem',
      background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    },
    statTitle: {
      fontSize: '1.25rem',
      color: '#2D3748',
      fontWeight: 600,
    },
    statDescription: {
      fontSize: '1rem',
      color: '#4A5568',
      marginTop: '0.5rem',
    },
    
    // History Timeline Section
    historySection: {
      marginBottom: '5rem',
      position: 'relative',
    },
    timelineContainer: {
      position: 'relative',
      marginTop: '3rem',
      paddingLeft: '2rem',
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
      marginBottom: '3rem',
      paddingLeft: '2rem',
    },
    timelineDot: {
      position: 'absolute',
      left: '-10px',
      top: '6px',
      width: '20px',
      height: '20px',
      backgroundColor: '#4299E1',
      borderRadius: '50%',
      border: '3px solid white',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.3)',
    },
    timelineYear: {
      display: 'inline-block',
      padding: '0.4rem 1rem',
      backgroundColor: '#4299E1',
      color: 'white',
      borderRadius: '20px',
      fontWeight: 600,
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    timelineTitle: {
      fontSize: '1.5rem',
      color: '#1A365D',
      fontWeight: 700,
      marginBottom: '0.75rem',
    },
    timelineDescription: {
      fontSize: '1.1rem',
      color: '#2D3748',
      lineHeight: 1.7,
    },
    
    // Team Section
    teamSection: {
      marginBottom: '5rem',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2.5rem',
      marginTop: '3rem',
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
      height: '280px',
      objectFit: 'cover',
    },
    teamMemberInfo: {
      padding: '1.5rem',
    },
    teamMemberName: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '0.5rem',
    },
    teamMemberRole: {
      fontSize: '1rem',
      color: '#4299E1',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    teamMemberBio: {
      fontSize: '1rem',
      color: '#2D3748',
      lineHeight: 1.6,
      marginBottom: '1.25rem',
    },
    teamSocialLinks: {
      display: 'flex',
      gap: '0.75rem',
    },
    socialLink: {
      width: '36px',
      height: '36px',
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
      marginBottom: '5rem',
      position: 'relative',
      zIndex: 1,
    },
    projectShowcaseTitle: {
      fontSize: '2.25rem',
      marginBottom: '2.5rem',
      color: '#1A365D',
      fontWeight: 700,
      textAlign: 'center',
    },
    projectTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
      flexWrap: 'wrap',
    },
    projectTab: {
      padding: '0.85rem 1.75rem',
      backgroundColor: '#F7FAFC',
      color: '#2D3748',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 600,
      border: '1px solid #EDF2F7',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
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
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '3rem',
      alignItems: 'center',
      backgroundColor: '#F7FAFC',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    },
    projectPattern: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '150px',
      height: '150px',
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
      transform: 'rotate(-2deg)',
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
      fontSize: '2rem',
      marginBottom: '1.25rem',
      color: '#1A365D',
      fontWeight: 700,
    },
    projectDescription: {
      fontSize: '1.1rem',
      color: '#2D3748',
      lineHeight: 1.8,
      marginBottom: '1.75rem',
    },
    projectStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1.75rem',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: '1.25rem',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    },
    projectStat: {
      textAlign: 'center',
      flex: 1,
    },
    projectStatNumber: {
      fontSize: '1.75rem',
      fontWeight: 800,
      color: '#4299E1',
      marginBottom: '0.5rem',
    },
    projectStatLabel: {
      color: '#2D3748',
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    projectTech: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '1.75rem',
    },
    techTag: {
      backgroundColor: 'rgba(66, 153, 225, 0.1)',
      color: '#4299E1',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.95rem',
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
      padding: '0.85rem 1.75rem',
      borderRadius: '8px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    projectCtaHover: {
      backgroundColor: '#2B6CB0',
      transform: 'translateY(-3px)',
      boxShadow: '0 7px 14px rgba(66, 153, 225, 0.4)',
    },
    
    // Testimonials Section
    testimonialsSection: {
      marginBottom: '5rem',
      position: 'relative',
    },
    testimonialGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2.5rem',
      marginTop: '3rem',
    },
    testimonialCard: {
      backgroundColor: '#FFFFFF',
      padding: '2.5rem',
      borderRadius: '16px',
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
      fontSize: '3rem',
      color: '#4299E1',
      opacity: 0.2,
      position: 'absolute',
      top: '20px',
      right: '25px',
      fontFamily: 'Georgia, serif',
    },
    testimonialText: {
      fontSize: '1.15rem',
      color: '#2D3748',
      lineHeight: 1.8,
      marginBottom: '2rem',
      fontStyle: 'italic',
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
    },
    testimonialImage: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '1rem',
      border: '3px solid #EBF8FF',
    },
    testimonialInfo: {
      flex: 1,
    },
    testimonialName: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '0.25rem',
    },
    testimonialRole: {
      fontSize: '0.95rem',
      color: '#4A5568',
    },
    testimonialCompany: {
      fontSize: '0.95rem',
      color: '#4299E1',
      fontWeight: 600,
    },
  };

  // Define hover state handling functions
  const [hoveredElement, setHoveredElement] = useState(null);
  
  const handleMouseEnter = (element) => {
    setHoveredElement(element);
  };
  
  const handleMouseLeave = () => {
    setHoveredElement(null);
  };
  
  // Media query styles
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.aboutGrid.gridTemplateColumns = '1fr';
    styles.valuesGrid.gridTemplateColumns = '1fr';
    styles.projectContent.gridTemplateColumns = '1fr';
    styles.teamGrid.gridTemplateColumns = '1fr';
    styles.statsGrid.gridTemplateColumns = 'repeat(2, 1fr)';
    styles.testimonialGrid.gridTemplateColumns = '1fr';
  }

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
      text: "Le Duc Systems transformed our outdated infrastructure into a modern, scalable platform that reduced our operational costs by 40% while increasing system reliability. Their team's expertise and dedication to our success was evident throughout the entire engagement.",
      name: "Jennifer Hale",
      role: "CIO",
      company: "NexGen Retail",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      text: "Working with Le Duc Systems allowed us to accelerate our digital transformation by at least 18 months. Their CloudScale platform integrated perfectly with our existing systems while providing the advanced capabilities we needed to stay competitive in our market.",
      name: "Robert Chen",
      role: "VP of Technology",
      company: "Meridian Financial",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      text: "The security expertise at Le Duc Systems is unmatched. They identified vulnerabilities in our infrastructure that other consultants missed and implemented a comprehensive security strategy that has kept us protected against emerging threats.",
      name: "Sarah Johnson",
      role: "CISO",
      company: "HealthTech Innovations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      text: "As a rapidly growing startup, we needed a technology partner who could scale with us. Le Duc Systems not only built a robust foundation for our infrastructure but continues to provide strategic guidance as we expand into new markets.",
      name: "Michael Thompson",
      role: "Founder & CEO",
      company: "Elevate Logistics",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="about" style={{...styles.about, ...commonStyles.section}}>
      <div style={styles.aboutPattern}></div>
      <div style={commonStyles.container}>
        <h2 style={commonStyles.sectionTitle}>
          About <span style={commonStyles.sectionHighlight}>Le Duc Systems</span>
        </h2>
        <div style={commonStyles.sectionTitleLine}></div>
        <p style={commonStyles.sectionIntro}>
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
                ...(hoveredElement === 'aboutImage' ? styles.aboutImagePattern['&:hover'] : {})
              }}
            ></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Le Duc Systems Team" 
              style={{
                ...styles.aboutImage, 
                ...(hoveredElement === 'aboutImage' ? styles.aboutImage['&:hover'] : {})
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
        {/* <div style={styles.testimonialsSection} ref={sectionRefs.testimonials} id="testimonials">
          <h3 style={{...styles.aboutTitle, textAlign: 'center', display: 'block', marginBottom: '2.5rem'}}>
            What Our Clients Say
            <div style={{...styles.aboutTitleUnderline, left: '50%', transform: 'translateX(-50%)'}}></div>
          </h3>
          
          <div style={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                style={{
                  ...styles.testimonialCard
                }}
                onMouseEnter={() => handleMouseEnter(`testimonial${testimonial.id}`)}
                onMouseLeave={handleMouseLeave}
              >
                <div style={styles.testimonialQuote}>"</div>
                <p style={styles.testimonialText}>{testimonial.text}</p>
                <div style={styles.testimonialAuthor}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    style={styles.testimonialImage} 
                  />
                  <div style={styles.testimonialInfo}>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialRole}>{testimonial.role}</div>
                    <div style={styles.testimonialCompany}>{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default About;