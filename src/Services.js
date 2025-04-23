import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiSmartphone, FiCloud, FiDatabase, FiLayers, FiSettings, FiPlus, FiX, FiChevronRight, FiUsers, FiBarChart2, FiZap, FiCheck, FiArrowRight, FiClock, FiShield, FiTarget } from 'react-icons/fi';

// Top services (displayed as flippable cards)
const topServices = [
  {
    id: 1,
    title: 'Custom Software',
    description: 'Enterprise solutions tailored to your business challenges using cutting-edge technologies.',
    icon: <FiCode size={24} />,
    gradient: 'linear-gradient(90deg, #3B82F6 0%, #4F46E5 100%)',
    color: '#3B82F6',
    features: [
      'Scalable full-stack applications',
      'High-performance architecture',
      'Legacy system modernization'
    ],
    backContent: {
      title: 'Our Development Process',
      metrics: [
        { label: 'Time to Market', value: '4 mo' },
        { label: 'Client Rating', value: '4.9/5' }
      ],
      phases: [
        { icon: <FiUsers size={20} />, name: 'Discovery', description: 'Requirements gathering' },
        { icon: <FiCode size={20} />, name: 'Development', description: 'Agile implementation' },
        { icon: <FiZap size={20} />, name: 'Deployment', description: 'Production transition' }
      ]
    }
  },
  {
    id: 2,
    title: 'Web & Mobile Apps',
    description: 'Engaging, responsive applications that deliver exceptional user experiences across all devices.',
    icon: <FiSmartphone size={24} />,
    gradient: 'linear-gradient(90deg, #14B8A6 0%, #2563EB 100%)',
    color: '#14B8A6',
    features: [
      'Progressive Web Apps (PWA)',
      'Native iOS and Android apps',
      'Cross-platform solutions'
    ],
    backContent: {
      title: 'App Development Expertise',
      stats: [
        { value: '250+', label: 'Apps' },
        { value: '99.8%', label: 'Uptime' }
      ],
      technologies: [
        'React Native', 'Swift', 'Flutter'
      ],
      testimonial: {
        quote: "They delivered a beautiful app that exceeded our expectations.",
        author: "Sarah J."
      }
    }
  },
  {
    id: 3,
    title: 'Data Integration',
    description: 'Seamless connectivity between systems with custom data pipelines that unlock your business data.',
    icon: <FiDatabase size={24} />,
    gradient: 'linear-gradient(90deg, #A855F7 0%, #4F46E5 100%)',
    color: '#A855F7',
    features: [
      'ETL pipeline development',
      'API design and integration',
      'Real-time data processing'
    ],
    backContent: {
      title: 'Data Flow Architecture',
      caseStudy: {
        industry: 'Healthcare',
        challenge: 'Fragmented data systems',
        results: [
          '68% faster retrieval',
          '99.9% accuracy'
        ]
      },
      dataVolumes: [
        { label: 'Daily Volume', value: '1.8 TB' },
        { label: 'Avg. Latency', value: '<50ms' }
      ]
    }
  }
];

// Bottom services (displayed in a different format)
const bottomServices = [
  {
    id: 4,
    title: 'Cloud & DevOps',
    description: 'Robust cloud infrastructure ensuring scalability, security, and continuous delivery.',
    icon: <FiCloud size={24} />,
    gradient: 'linear-gradient(90deg, #60A5FA 0%, #1D4ED8 100%)',
    color: '#2563EB',
    features: [
      'Multi-cloud architecture',
      'CI/CD pipeline implementation',
      'Containerization (Docker/K8s)'
    ]
  },
  {
    id: 5,
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation that connects systems and reduces manual work.',
    icon: <FiSettings size={24} />,
    gradient: 'linear-gradient(90deg, #10B981 0%, #0D9488 100%)',
    color: '#059669',
    features: [
      'Workflow automation',
      'Business logic implementation',
      'Custom API integration'
    ]
  },
  {
    id: 6,
    title: 'Enterprise Solutions',
    description: 'End-to-end software ecosystems addressing complex challenges through strategic implementation.',
    icon: <FiLayers size={24} />,
    gradient: 'linear-gradient(90deg, #6366F1 0%, #7E22CE 100%)',
    color: '#4F46E5',
    features: [
      'ERP & CRM systems',
      'Business Intelligence',
      'Digital transformation'
    ]
  }
];

const Services = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeTab, setActiveTab] = useState(4); // Default to first bottom service
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const toggleFlip = (id, event) => {
    // Prevent the card click from triggering modal open
    event.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const openModal = (service) => {
    setModalContent(service);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Styles object with all inline styles
  const styles = {
    section: {
      position: 'relative',
      padding: '96px 0',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom right, #F9FAFB, #F3F4F6)'
    },
    decorCircle1: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '384px',
      height: '384px',
      transform: 'translateX(-50%)',
      backgroundColor: '#3B82F6',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(48px)',
      opacity: 0.1,
      zIndex: 1
    },
    decorCircle2: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '384px',
      height: '384px',
      transform: 'translateX(50%)',
      backgroundColor: '#4F46E5',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(48px)',
      opacity: 0.1,
      zIndex: 1
    },
    container: {
      position: 'relative',
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '0 16px',
      zIndex: 10
    },
    header: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    spanLabel: {
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#2563EB'
    },
    title: {
      marginTop: '8px',
      fontSize: isMobile ? '32px' : '48px',
      fontWeight: 700,
      color: '#111827',
      lineHeight: 1.2
    },
    titleSpan: {
      color: '#2563EB'
    },
    divider: {
      height: '4px',
      width: '96px',
      margin: '16px auto',
      backgroundColor: '#2563EB',
      borderRadius: '2px'
    },
    description: {
      marginTop: '24px',
      maxWidth: '672px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '18px',
      color: '#4B5563'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '80px'
    },
    // Flip card styles
          cardContainer: {
      perspective: '1000px',
      height: '400px',
      cursor: 'pointer'
    },
    cardInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px'
    },
    cardInnerFlipped: {
      transform: 'rotateY(180deg)'
    },
    cardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '12px',
      overflow: 'hidden'
    },
    cardFront: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #F3F4F6',
      display: 'flex',
      flexDirection: 'column'
    },
    cardBack: {
      backgroundColor: '#FFFFFF',
      transform: 'rotateY(180deg)',
      border: '1px solid #F3F4F6',
      display: 'flex',
      flexDirection: 'column'
    },
    cardTopBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px'
    },
    cardContent: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      marginBottom: '16px',
      borderRadius: '8px',
      color: '#FFFFFF',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    cardTitle: {
      marginBottom: '8px',
      fontSize: '20px',
      fontWeight: 700,
      color: '#111827'
    },
    cardDescription: {
      fontSize: '14px',
      lineHeight: 1.5,
      color: '#4B5563',
      marginBottom: '16px'
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: '16px 0 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: '14px'
    },
    featureIcon: {
      width: '20px',
      height: '20px',
      marginRight: '8px',
      marginTop: '2px',
      flexShrink: 0,
      color: '#2563EB'
    },
    featureText: {
      color: '#4B5563'
    },
    learnMoreBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      marginTop: 'auto',
      fontSize: '14px',
      fontWeight: 500,
      color: '#2563EB',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '8px 0',
      transition: 'color 0.2s ease'
    },
    learnMoreBtnHover: {
      color: '#1D4ED8'
    },
    learnMoreIcon: {
      marginLeft: '4px'
    },
    // Card back styles - new enhanced designs
    backContent: {
      padding: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    backTitle: {
      fontSize: '22px',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '20px',
      textAlign: 'center'
    },
    // Software Development card back styles
    metricsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '24px',
      padding: '12px 0',
      borderTop: '1px solid #E5E7EB',
      borderBottom: '1px solid #E5E7EB'
    },
    metricItem: {
      textAlign: 'center',
      flex: '1 1 auto'
    },
    metricValue: {
      fontSize: '20px',
      fontWeight: 700,
      marginBottom: '4px',
      color: '#111827'
    },
    metricLabel: {
      fontSize: '12px',
      color: '#6B7280',
      textTransform: 'uppercase',
      letterSpacing: '0.025em'
    },
    phasesTitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '16px'
    },
    phasesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    phaseItem: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    phaseIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      marginRight: '12px',
      flexShrink: 0
    },
    phaseContent: {
      flex: 1
    },
    phaseName: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '2px'
    },
    phaseDescription: {
      fontSize: '12px',
      color: '#6B7280'
    },
    // App Development card back styles
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px'
    },
    statItem: {
      textAlign: 'center',
      padding: '0 8px'
    },
    statValue: {
      fontSize: '22px',
      fontWeight: 700,
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6B7280'
    },
    technologiesContainer: {
      marginBottom: '20px'
    },
    technologiesTitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '12px'
    },
    technologiesList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    technologyTag: {
      fontSize: '12px',
      fontWeight: 500,
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: '#F3F4F6',
      color: '#4B5563'
    },
    platformsContainer: {
      marginBottom: '20px'
    },
    platformItem: {
      marginBottom: '8px'
    },
    platformHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      fontWeight: 500,
      marginBottom: '4px'
    },
    platformName: {
      color: '#111827'
    },
    platformPercentage: {
      color: '#6B7280'
    },
    progressBar: {
      height: '6px',
      backgroundColor: '#E5E7EB',
      borderRadius: '3px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      borderRadius: '3px'
    },
    testimonialContainer: {
      marginTop: 'auto',
      backgroundColor: '#F9FAFB',
      padding: '12px',
      borderRadius: '8px',
      position: 'relative'
    },
    testimonialQuote: {
      fontSize: '13px',
      fontStyle: 'italic',
      color: '#4B5563',
      marginBottom: '8px',
      position: 'relative',
      paddingLeft: '16px'
    },
    testimonialQuotemark: {
      position: 'absolute',
      top: '0',
      left: '0',
      fontSize: '24px',
      color: '#D1D5DB',
      lineHeight: '0.5'
    },
    testimonialAuthor: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#111827',
      textAlign: 'right'
    },
    // Data Integration card back styles
    caseStudyContainer: {
      backgroundColor: 'rgba(168, 85, 247, 0.05)',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    caseStudyLabel: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#A855F7',
      textTransform: 'uppercase',
      marginBottom: '8px'
    },
    caseStudyGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    caseStudyItem: {
      marginBottom: '12px'
    },
    caseStudyHeading: {
      fontSize: '13px',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '4px'
    },
    caseStudyText: {
      fontSize: '12px',
      color: '#6B7280'
    },
    resultsList: {
      padding: 0,
      margin: '12px 0 0 0',
      listStyle: 'none'
    },
    resultItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: '#6B7280',
      marginBottom: '6px'
    },
    resultIcon: {
      color: '#A855F7',
      marginRight: '6px',
      flexShrink: 0
    },
    dataVolumeContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      gap: '8px'
    },
    dataVolumeItem: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'center'
    },
    dataVolumeValue: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '4px'
    },
    dataVolumeLabel: {
      fontSize: '11px',
      color: '#6B7280'
    },
    integrationContainer: {
      marginTop: 'auto'
    },
    integrationTypes: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      margin: '0'
    },
    integrationType: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      backgroundColor: '#F3F4F6',
      borderRadius: '6px',
      fontSize: '12px',
      color: '#4B5563',
      fontWeight: 500
    },
    integrationIcon: {
      marginRight: '6px',
      color: '#A855F7'
    },
    
    // Bottom services styles
    bottomSection: {
      marginTop: '80px',
      position: 'relative',
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '400px'
    },
    imageContainer: {
      flex: isMobile ? '0 0 240px' : '0 0 45%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#F9FAFB',
      backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.8) 0%, rgba(59, 130, 246, 0.5) 100%)',
      mixBlendMode: 'multiply',
      zIndex: 1
    },
    imageContent: {
      position: 'relative',
      zIndex: 2,
      padding: '40px',
      color: '#FFFFFF',
      textAlign: 'center'
    },
    imageTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '16px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    imageDescription: {
      fontSize: '16px',
      lineHeight: 1.5,
      marginBottom: '24px',
      maxWidth: '400px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    contentContainer: {
      flex: isMobile ? '1' : '0 0 55%',
      padding: '0',
      display: 'flex',
      flexDirection: 'column'
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: '1px solid #E5E7EB'
    },
    tab: {
      padding: '16px 24px',
      fontSize: '15px',
      fontWeight: 500,
      color: '#6B7280',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    tabActive: {
      color: '#111827',
      borderBottomColor: '#2563EB',
      fontWeight: 600
    },
    tabContent: {
      padding: '32px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    tabContentTitle: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    tabContentIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      color: '#FFFFFF'
    },
    tabContentDescription: {
      color: '#4B5563',
      marginBottom: '24px',
      lineHeight: 1.6
    },
    tabFeaturesList: {
      listStyle: 'none',
      padding: 0,
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    tabFeatureItem: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    tabFeatureIcon: {
      width: '20px',
      height: '20px',
      marginRight: '12px',
      marginTop: '2px',
      flexShrink: 0
    },
    tabFeatureText: {
      color: '#4B5563'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
      position: 'relative',
      width: '100%',
      maxWidth: '500px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    modalTopBorder: {
      height: '8px',
      width: '100%'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      color: '#9CA3AF',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      transition: 'color 0.2s ease'
    },
    closeButtonHover: {
      color: '#6B7280'
    },
    modalBody: {
      padding: '24px'
    },
    modalIconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      margin: '0 auto 24px',
      borderRadius: '8px',
      color: '#FFFFFF'
    },
    modalTitle: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '16px'
    },
    modalDescription: {
      color: '#4B5563',
      marginBottom: '24px'
    },
    modalSubtitle: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#111827',
      marginBottom: '12px'
    },
    modalFeaturesList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 24px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    modalFeatureItem: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    modalFeatureIcon: {
      width: '20px',
      height: '20px',
      marginRight: '12px',
      marginTop: '2px',
      flexShrink: 0,
      color: '#2563EB'
    },
    modalFeatureText: {
      color: '#4B5563'
    },
  };

  // Find the currently active bottom service
  const activeService = bottomServices.find(service => service.id === activeTab);

  // Custom card backs for each service
  const renderCardBack = (service) => {
    switch(service.id) {
      case 1: // Custom Software
        return (
          <div style={styles.backContent}>
            <h3 style={{...styles.backTitle, color: service.color}}>
              {service.backContent.title}
            </h3>
            
            <div style={styles.metricsContainer}>
              {service.backContent.metrics.map((metric, index) => (
                <div key={index} style={styles.metricItem}>
                  <div style={{...styles.metricValue, color: service.color}}>{metric.value}</div>
                  <div style={styles.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>
            
            <div style={styles.phasesList}>
              {service.backContent.phases.map((phase, index) => (
                <div key={index} style={styles.phaseItem}>
                  <div 
                    style={{
                      ...styles.phaseIcon,
                      backgroundColor: `${service.color}20`, // 20% opacity
                      color: service.color
                    }}
                  >
                    {phase.icon}
                  </div>
                  <div style={styles.phaseContent}>
                    <div style={styles.phaseName}>{phase.name}</div>
                    <div style={styles.phaseDescription}>{phase.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 2: // Web & Mobile Apps
        return (
          <div style={styles.backContent}>
            <h3 style={{...styles.backTitle, color: service.color}}>
              {service.backContent.title}
            </h3>
            
            <div style={styles.statsContainer}>
              {service.backContent.stats.map((stat, index) => (
                <div key={index} style={styles.statItem}>
                  <div style={{...styles.statValue, color: service.color}}>
                    {stat.value}
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div style={styles.technologiesContainer}>
              <h4 style={styles.technologiesTitle}>Core Technologies</h4>
              <div style={styles.technologiesList}>
                {service.backContent.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    style={{
                      ...styles.technologyTag,
                      backgroundColor: `${service.color}15`, // 15% opacity
                      color: service.color
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{...styles.testimonialContainer, marginTop: '30px'}}>
              <div style={styles.testimonialQuote}>
                <span style={styles.testimonialQuotemark}>&ldquo;</span>
                {service.backContent.testimonial.quote}
              </div>
              <div style={styles.testimonialAuthor}>
                — {service.backContent.testimonial.author}
              </div>
            </div>
          </div>
        );
        
      case 3: // Data Integration
        return (
          <div style={styles.backContent}>
            <h3 style={{...styles.backTitle, color: service.color}}>
              {service.backContent.title}
            </h3>
            
            <div style={styles.caseStudyContainer}>
              <div style={styles.caseStudyLabel}>Case Study</div>
              <div style={styles.caseStudyGrid}>
                <div style={styles.caseStudyItem}>
                  <div style={styles.caseStudyHeading}>Industry</div>
                  <div style={styles.caseStudyText}>{service.backContent.caseStudy.industry}</div>
                </div>
                <div style={styles.caseStudyItem}>
                  <div style={styles.caseStudyHeading}>Challenge</div>
                  <div style={styles.caseStudyText}>{service.backContent.caseStudy.challenge}</div>
                </div>
              </div>
              <div style={styles.caseStudyItem}>
                <div style={styles.caseStudyHeading}>Results</div>
                <ul style={styles.resultsList}>
                  {service.backContent.caseStudy.results.map((result, index) => (
                    <li key={index} style={styles.resultItem}>
                      <FiCheck size={14} style={styles.resultIcon} />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div style={{...styles.dataVolumeContainer, marginTop: '30px'}}>
              {service.backContent.dataVolumes.map((volume, index) => (
                <div key={index} style={styles.dataVolumeItem}>
                  <div style={{...styles.dataVolumeValue, color: service.color}}>
                    {volume.value}
                  </div>
                  <div style={styles.dataVolumeLabel}>
                    {volume.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section id="services" style={styles.section}>
      {/* Decorative Elements */}
      <div style={styles.decorCircle1}></div>
      <div style={styles.decorCircle2}></div>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <motion.span 
            style={styles.spanLabel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What We Do
          </motion.span>
          
          <motion.h2 
            style={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our <span style={styles.titleSpan}>Services</span>
          </motion.h2>
          
          <motion.div 
            style={styles.divider}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          
          <motion.p 
            style={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Technology solutions tailored to transform your business
          </motion.p>
        </div>
        
        {/* Top 3 service cards - now flippable */}
        <motion.div 
          style={styles.grid}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {topServices.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              style={styles.cardContainer}
              onClick={(e) => toggleFlip(service.id, e)}
            >
              <div 
                style={{
                  ...styles.cardInner,
                  ...(flippedCards[service.id] ? styles.cardInnerFlipped : {})
                }}
              >
                {/* Card Front */}
                <div style={{...styles.cardFace, ...styles.cardFront}}>
                  <div 
                    style={{
                      ...styles.cardTopBorder,
                      background: service.gradient
                    }}
                  ></div>
                  
                  <div style={styles.cardContent}>
                    <div 
                      style={{
                        ...styles.iconContainer,
                        background: service.gradient
                      }}
                    >
                      {service.icon}
                    </div>
                    
                    <h3 style={styles.cardTitle}>{service.title}</h3>
                    <p style={styles.cardDescription}>{service.description}</p>
                    
                    <ul style={styles.featuresList}>
                      {service.features.map((feature, index) => (
                        <li key={index} style={styles.featureItem}>
                          <svg 
                            style={{...styles.featureIcon, color: service.color}}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span style={styles.featureText}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card flip when clicking this button
                        openModal(service);
                      }}
                      style={{
                        ...styles.learnMoreBtn,
                        color: service.color
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = styles.learnMoreBtnHover.color;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = service.color;
                      }}
                    >
                      Learn more
                      <FiPlus style={styles.learnMoreIcon} />
                    </button>
                  </div>
                </div>
                
                {/* Card Back - Customized for each service */}
                <div style={{...styles.cardFace, ...styles.cardBack}}>
                  <div 
                    style={{
                      ...styles.cardTopBorder,
                      background: service.gradient
                    }}
                  ></div>
                  
                  {renderCardBack(service)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom services section with image and tabs */}
        <motion.div 
          style={styles.bottomSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Left side image */}
          <div style={styles.imageContainer}>
            <div style={styles.imageOverlay}></div>
            <div style={styles.imageContent}>
              <h3 style={styles.imageTitle}>Enterprise-grade Solutions</h3>
              <p style={styles.imageDescription}>
                Comprehensive technology services designed to elevate your business and drive digital transformation.
              </p>
            </div>
          </div>
          
          {/* Right side tabbed content */}
          <div style={styles.contentContainer}>
            <div style={styles.tabsContainer}>
              {bottomServices.map(service => (
                <button
                  key={service.id}
                  style={{
                    ...styles.tab,
                    ...(activeTab === service.id ? styles.tabActive : {}),
                    borderBottomColor: activeTab === service.id ? service.color : 'transparent'
                  }}
                  onClick={() => setActiveTab(service.id)}
                >
                  {service.icon}
                  {!isMobile && service.title}
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                style={styles.tabContent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={styles.tabContentTitle}>
                  <div 
                    style={{
                      ...styles.tabContentIcon,
                      background: activeService.gradient
                    }}
                  >
                    {activeService.icon}
                  </div>
                  {activeService.title}
                </h3>
                
                <p style={styles.tabContentDescription}>
                  {activeService.description}
                </p>
                
                <ul style={styles.tabFeaturesList}>
                  {activeService.features.map((feature, index) => (
                    <li key={index} style={styles.tabFeatureItem}>
                      <svg 
                        style={{
                          ...styles.tabFeatureIcon,
                          color: activeService.color
                        }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span style={styles.tabFeatureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  onClick={() => openModal(activeService)}
                  style={{
                    ...styles.learnMoreBtn,
                    color: activeService.color,
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    padding: '8px 0',
                    marginTop: '24px'
                  }}
                  whileHover={{ x: 5 }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = activeService.color;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = activeService.color;
                  }}
                >
                  Explore {activeService.title}
                  <FiChevronRight style={{ marginLeft: '4px' }} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      {/* Service Details Modal */}
      <AnimatePresence>
        {modalOpen && modalContent && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <div 
                style={{
                  ...styles.modalTopBorder,
                  background: modalContent.gradient
                }}
              ></div>
              
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = styles.closeButtonHover.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = styles.closeButton.color;
                }}
              >
                <FiX size={24} />
              </button>
              
              <div style={styles.modalBody}>
                <div 
                  style={{
                    ...styles.modalIconContainer,
                    background: modalContent.gradient
                  }}
                >
                  {modalContent.icon}
                </div>
                
                <h3 style={styles.modalTitle}>{modalContent.title}</h3>
                <p style={styles.modalDescription}>{modalContent.description}</p>
                
                <h4 style={styles.modalSubtitle}>Key Features:</h4>
                <ul style={styles.modalFeaturesList}>
                  {modalContent.features.map((feature, index) => (
                    <li key={index} style={styles.modalFeatureItem}>
                      <svg 
                        style={{...styles.modalFeatureIcon, color: modalContent.color}}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span style={styles.modalFeatureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;