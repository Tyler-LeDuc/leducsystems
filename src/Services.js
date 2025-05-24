import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCode, FiSmartphone, FiCpu, FiCloud, FiArrowRight, FiCheck, FiZap, FiTrendingUp } from 'react-icons/fi';
import { services as serviceData } from './data/services';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getSubtitleStyles, getDescriptionStyles, getCardStyles, getButtonStyles, getResponsiveValue } from './theme/unifiedTheme';

const Services = () => {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);
  const [visibleServices, setVisibleServices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardRefs = useRef({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleServices(prev => [...new Set([...prev, 'intro'])]);
            }, 50);
            setTimeout(() => {
              setVisibleServices(prev => [...new Set([...prev, 'services'])]);
            }, 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Map service data to include icons
  const getIconComponent = (serviceId) => {
    const size = isMobile ? 24 : 28;
    switch (serviceId) {
      case 1: return <FiCpu size={size} />;
      case 2: return <FiCode size={size} />;
      case 3: return <FiZap size={size} />;
      case 4: return <FiSmartphone size={size} />;
      case 5: return <FiTrendingUp size={size} />;
      case 6: return <FiCloud size={size} />;
      default: return <FiCpu size={size} />;
    }
  };

  const coreServices = serviceData.map(service => ({
    ...service,
    icon: getIconComponent(service.id),
    color: service.gradient.match(/#[0-9A-F]{6}/i)[0] || '#3B82F6'
  }));

  const styles = {
    section: {
      ...getSectionStyles(isMobile, 'primary'),
      background: `linear-gradient(135deg, #0A0F1C 0%, #1A1F2E 100%)`,
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: 'radial-gradient(rgba(255, 201, 5, 0.3) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
      animation: 'float 20s ease-in-out infinite'
    },
    container: getContainerStyles(isMobile),
    header: {
      ...getHeaderStyles(isMobile),
      color: 'white'
    },
    subtitle: {
      ...getSubtitleStyles(),
      color: '#FFC905',
      letterSpacing: '3px'
    },
    title: {
      ...getTitleStyles(isMobile, 'xlarge'),
      color: 'white',
      textShadow: '0 4px 20px rgba(0,0,0,0.3)'
    },
    description: {
      ...getDescriptionStyles(isMobile),
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '600px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '60px' : '80px',
      marginBottom: isMobile ? '80px' : '100px',
      padding: isMobile ? '20px 0' : '40px 0',
      width: '100%',
      justifyItems: 'center',
      alignItems: 'start'
    },
    card: {
      position: 'relative',
      width: '100%',
      maxWidth: isMobile ? '320px' : '360px',
      height: isMobile ? '320px' : '360px',
      perspective: '1000px',
      cursor: 'pointer',
      margin: '0 auto',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    cardInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.6s ease-in-out',
      transformStyle: 'preserve-3d',
      transformOrigin: 'center center'
    },
    cardInnerFlipped: {
      transform: 'rotateY(180deg)'
    },
    cardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      background: '#1A1F2E',
      backdropFilter: 'blur(20px)',
      borderRadius: unifiedTheme.borderRadius['2xl'],
      padding: getResponsiveValue('16px 16px', '20px 20px', isMobile),
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      border: `1px solid rgba(255, 255, 255, 0.1)`,
      transition: `all ${unifiedTheme.animation.duration.slow} ${unifiedTheme.animation.easing.default}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer'
    },
    cardBack: {
      transform: 'rotateY(180deg)'
    },
    cardHover: {
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
      borderColor: '#FFC905',
      transform: 'translateY(-4px)'
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '24px',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      background: 'linear-gradient(135deg, rgba(255,201,5,0.15) 0%, rgba(255,201,5,0.05) 100%)',
      zIndex: 1
    },
    cardGlowActive: {
      opacity: 1
    },
    cardContent: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    iconContainer: {
      width: isMobile ? '44px' : '52px',
      height: isMobile ? '44px' : '52px',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 8px',
      position: 'relative',
      transition: 'all 0.4s ease'
    },
    iconContainerHover: {
      transform: 'scale(1.02)'
    },
    icon: {
      color: 'white',
      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
      position: 'relative',
      zIndex: 2
    },
    serviceTitle: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes.base, unifiedTheme.typography.fontSizes.lg, isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.extrabold,
      color: 'white',
      marginBottom: '2px',
      lineHeight: unifiedTheme.typography.lineHeights.snug
    },
    serviceSubtitle: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes.xs, unifiedTheme.typography.fontSizes.sm, isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      marginBottom: '8px',
      color: '#FFC905',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    serviceDescription: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes.xs, unifiedTheme.typography.fontSizes.sm, isMobile),
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: unifiedTheme.typography.lineHeights.tight,
      marginBottom: '10px',
      flex: '0 0 auto'
    },
    featuresContainer: {
      marginBottom: '10px',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: '40px'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      fontSize: isMobile ? '0.65rem' : '0.7rem',
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: unifiedTheme.typography.fontWeights.medium,
      marginBottom: '4px',
      lineHeight: 1.2
    },
    featureIcon: {
      width: '14px',
      height: '14px',
      color: '#FFC905',
      marginRight: '8px',
      flexShrink: 0
    },
    keyMetric: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 12px',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      marginBottom: '10px',
      color: '#0A0F1C',
      background: '#FFC905',
      textShadow: 'none',
      flex: '0 0 auto'
    },
    learnMore: {
      padding: '6px 12px',
      width: 'auto',
      maxWidth: 'calc(100% - 32px)',
      flex: '0 0 auto',
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: getResponsiveValue('0.7rem', '0.75rem', isMobile),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: unifiedTheme.borderRadius.lg,
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: unifiedTheme.typography.fontWeights.medium,
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    learnMoreHover: {
      background: 'rgba(255, 201, 5, 0.1)',
      borderColor: '#FFC905',
      color: '#FFC905',
      transform: 'translateY(-2px)'
    },
    learnMoreIcon: {
      marginLeft: '8px',
      transition: 'transform 0.3s ease'
    },
    cta: {
      textAlign: 'center',
      padding: isMobile ? '40px 24px' : '60px 40px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      borderRadius: unifiedTheme.borderRadius['2xl'],
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '40px'
    },
    ctaTitle: {
      fontSize: isMobile ? '1.8rem' : '2.25rem',
      fontWeight: 800,
      color: 'white',
      marginBottom: '16px',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    ctaDescription: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '32px',
      maxWidth: '500px',
      margin: '0 auto 32px'
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '16px 32px',
      background: '#FFC905',
      color: '#0A0F1C',
      fontSize: '1.125rem',
      fontWeight: 700,
      borderRadius: '16px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 32px rgba(255, 201, 5, 0.3)'
    },
    ctaButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(255, 201, 5, 0.4)',
      background: '#FFD93D'
    },
    backContent: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      textAlign: 'left'
    },
    backTitle: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes.lg, unifiedTheme.typography.fontSizes.xl, isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.extrabold,
      color: 'white',
      marginBottom: '8px'
    },
    backDescription: {
      fontSize: getResponsiveValue('0.75rem', '0.875rem', isMobile),
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '12px',
      lineHeight: 1.4
    },
    backSection: {
      marginBottom: '12px'
    },
    backSectionTitle: {
      fontSize: getResponsiveValue('0.65rem', '0.75rem', isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFC905',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    backList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    },
    backListItem: {
      background: 'rgba(255, 201, 5, 0.1)',
      color: '#FFC905',
      padding: '2px 6px',
      borderRadius: unifiedTheme.borderRadius.base,
      fontSize: getResponsiveValue('0.65rem', '0.7rem', isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.medium,
      border: '1px solid rgba(255, 201, 5, 0.3)'
    },
    backPricing: {
      marginTop: 'auto',
      padding: '8px',
      background: 'rgba(255, 201, 5, 0.1)',
      borderRadius: unifiedTheme.borderRadius.lg,
      border: `1px solid rgba(255, 201, 5, 0.3)`,
      textAlign: 'center'
    },
    backPrice: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes.base, unifiedTheme.typography.fontSizes.lg, isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFC905',
      marginBottom: '2px'
    },
    backTimeline: {
      fontSize: getResponsiveValue('0.65rem', '0.75rem', isMobile),
      color: 'rgba(255, 255, 255, 0.6)'
    }
  };

  const handleServiceClick = (service) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(service.id)) {
        newSet.delete(service.id);
      } else {
        newSet.add(service.id);
      }
      return newSet;
    });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <section style={styles.section} ref={sectionRef} id="services">
      <div style={styles.backgroundPattern}></div>

      <div style={styles.container}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={visibleServices.includes('intro') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={visibleServices.includes('intro') ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            ELITE SOLUTIONS
          </motion.div>
          
          <motion.h2 
            style={styles.title}
            initial={{ opacity: 0 }}
            animate={visibleServices.includes('intro') ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Technology Solutions That Drive Results
          </motion.h2>
          
          <motion.p 
            style={styles.description}
            initial={{ opacity: 0 }}
            animate={visibleServices.includes('intro') ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Transform your business with intelligent solutions designed for measurable ROI and enterprise reliability.
          </motion.p>
        </motion.div>

        <div style={styles.grid}>
          {coreServices.map((service, index) => (
            <motion.div
              key={service.id}
              style={styles.card}
              initial={{ opacity: 0, y: 60 }}
              animate={visibleServices.includes('services') ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              ref={el => cardRefs.current[service.id] = el}
              onClick={(e) => {
                e.stopPropagation();
                handleServiceClick(service);
              }}
            >
              <div 
                style={{
                  ...styles.cardInner,
                  ...(flippedCards.has(service.id) ? styles.cardInnerFlipped : {})
                }}
              >
                {/* Front of card */}
                <div 
                  style={{
                    ...styles.cardFace,
                    ...(hoveredService === service.id && !flippedCards.has(service.id) ? styles.cardHover : {})
                  }}
                  onMouseEnter={() => !flippedCards.has(service.id) && setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div 
                    style={{
                      ...styles.cardGlow,
                      ...(hoveredService === service.id ? styles.cardGlowActive : {})
                    }}
                  />
                  
                  <div style={styles.cardContent}>
                    {/* Header */}
                    <div style={{ flex: '0 0 auto' }}>
                      <div style={{
                        ...styles.iconContainer,
                        background: service.gradient,
                        ...(hoveredService === service.id && !flippedCards.has(service.id) ? styles.iconContainerHover : {})
                      }}>
                        <div style={styles.icon}>
                          {service.icon}
                        </div>
                      </div>

                      <h3 style={styles.serviceTitle}>{service.title}</h3>
                      <div style={styles.serviceSubtitle}>
                        {service.subtitle}
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                      <p style={styles.serviceDescription}>{service.description}</p>

                      {/* Key Metric */}
                      <div style={styles.keyMetric}>
                        <span style={{ fontSize: '1.1rem', marginRight: '8px' }}>{service.keyMetric.number}</span>
                        {service.keyMetric.label}
                      </div>

                      {/* Features */}
                      <div style={styles.featuresContainer}>
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} style={styles.feature}>
                            <FiCheck style={styles.featureIcon} />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Learn More Button */}
                      <div 
                        style={{
                          ...styles.learnMore,
                          ...(hoveredService === service.id && !flippedCards.has(service.id) ? styles.learnMoreHover : {})
                        }}
                      >
                        <span>View Details</span>
                        <FiArrowRight style={{
                          ...styles.learnMoreIcon,
                          ...(hoveredService === service.id && !flippedCards.has(service.id) ? { transform: 'translateX(4px)' } : {})
                        }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  style={{...styles.cardFace, ...styles.cardBack}}
                >
                  <div style={styles.backContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ ...styles.backTitle, marginBottom: 0 }}>{service.title}</h3>
                      <span style={{ fontSize: '0.75rem', color: '#FFC905', cursor: 'pointer' }}>← Back</span>
                    </div>
                    <p style={styles.backDescription}>{service.detailedDescription.substring(0, 120)}...</p>
                    
                    <div style={styles.backSection}>
                      <div style={styles.backSectionTitle}>Key Technologies</div>
                      <div style={styles.backList}>
                        {service.technologies.slice(0, 2).map((tech, idx) => (
                          <span key={idx} style={styles.backListItem}>{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ ...styles.backPricing, marginTop: 'auto' }}>
                      <div style={styles.backPrice}>{service.startingPrice}</div>
                      <div style={styles.backTimeline}>Timeline: {service.timeline}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          style={styles.cta}
          initial={{ opacity: 0, y: 40 }}
          animate={visibleServices.includes('services') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 style={styles.ctaTitle}>Ready to Transform Your Business?</h3>
          <p style={styles.ctaDescription}>
            Let's create your competitive advantage with cutting-edge technology solutions.
          </p>
          <motion.a
            href="#contact"
            style={styles.ctaButton}
            whileHover={styles.ctaButtonHover}
            onClick={handleContactClick}
          >
            Start Your Project
            <FiArrowRight style={{ marginLeft: '8px' }} />
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Services;