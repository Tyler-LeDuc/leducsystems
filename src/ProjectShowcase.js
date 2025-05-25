import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from './data/projects';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiTrendingUp, FiZap, FiTarget } from 'react-icons/fi';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getSubtitleStyles, getDescriptionStyles, getCardStyles, getButtonStyles, getResponsiveValue } from './theme/unifiedTheme';

const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToProject = (index) => {
    setCurrentProject(index);
    setIsAutoPlaying(false);
  };

  const project = projects[currentProject];

  const styles = {
    section: {
      ...getSectionStyles(isMobile, 'dark'),
      background: '#0A0F1C'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.03,
      backgroundImage: unifiedTheme.patterns.backgroundDots,
      backgroundSize: '50px 50px'
    },
    container: getContainerStyles(isMobile),
    header: getHeaderStyles(isMobile),
    subtitle: {
      ...getSubtitleStyles(),
      color: '#FFC905'
    },
    title: {
      ...getTitleStyles(isMobile, 'medium'),
      color: '#FFFFFF'
    },
    description: {
      ...getDescriptionStyles(isMobile),
      color: '#B8BCC8'
    },
    showcase: {
      maxWidth: '900px',
      margin: '0 auto',
      marginBottom: getResponsiveValue('40px', '60px', isMobile)
    },
    projectCard: {
      backgroundColor: '#1A1F2E',
      borderRadius: unifiedTheme.borderRadius.xl,
      padding: getResponsiveValue('40px', '60px', isMobile),
      border: '2px solid rgba(255, 201, 5, 0.2)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    projectCardBg: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(255, 201, 5, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      transform: 'translate(100px, -100px)'
    },
    projectContent: {
      position: 'relative',
      zIndex: 1
    },
    projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      gap: '20px'
    },
    projectBadge: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: 'rgba(255, 201, 5, 0.1)',
      color: '#FFC905',
      borderRadius: unifiedTheme.borderRadius.full,
      fontSize: unifiedTheme.typography.fontSizes.sm,
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      border: '1px solid rgba(255, 201, 5, 0.3)'
    },
    projectTitle: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['3xl'], unifiedTheme.typography.fontSizes['4xl'], isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFFFFF',
      marginBottom: '20px',
      lineHeight: unifiedTheme.typography.lineHeights.snug
    },
    projectDescription: {
      fontSize: unifiedTheme.typography.fontSizes.lg,
      color: '#B8BCC8',
      lineHeight: unifiedTheme.typography.lineHeights.loose,
      marginBottom: '40px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '40px'
    },
    statItem: {
      backgroundColor: 'rgba(10, 15, 28, 0.6)',
      textAlign: 'center',
      padding: '25px',
      borderRadius: unifiedTheme.borderRadius.lg,
      border: '1px solid rgba(255, 201, 5, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    statIcon: {
      fontSize: '2rem',
      color: '#FFC905',
      marginBottom: '12px'
    },
    statValue: {
      fontSize: unifiedTheme.typography.fontSizes['3xl'],
      fontWeight: unifiedTheme.typography.fontWeights.extrabold,
      color: '#FFC905',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: unifiedTheme.typography.fontSizes.sm,
      color: '#B8BCC8',
      fontWeight: unifiedTheme.typography.fontWeights.medium
    },
    techStack: {
      marginBottom: '30px'
    },
    techTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#FFFFFF',
      marginBottom: '12px'
    },
    techTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    techTag: {
      padding: '8px 16px',
      backgroundColor: 'rgba(255, 201, 5, 0.1)',
      color: '#FFC905',
      borderRadius: unifiedTheme.borderRadius.sm,
      fontSize: unifiedTheme.typography.fontSizes.sm,
      fontWeight: unifiedTheme.typography.fontWeights.medium,
      border: '1px solid rgba(255, 201, 5, 0.3)',
      transition: 'all 0.3s ease'
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px'
    },
    navButton: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#1A1F2E',
      border: '2px solid #FFC905',
      color: '#FFC905',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.2rem'
    },
    navButtonHover: {
      backgroundColor: '#FFC905',
      color: '#0A0F1C',
      transform: 'scale(1.1)'
    },
    dots: {
      display: 'flex',
      gap: '8px'
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#1A1F2E',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    dotActive: {
      backgroundColor: '#FFC905',
      transform: 'scale(1.2)',
      border: '1px solid #FFC905'
    },
    cta: {
      textAlign: 'center'
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '16px 32px',
      fontSize: unifiedTheme.typography.fontSizes.lg,
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      borderRadius: unifiedTheme.borderRadius.lg,
      background: 'linear-gradient(135deg, #FFC905 0%, #FFB700 100%)',
      color: '#0A0F1C',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      gap: '10px',
      boxShadow: '0 4px 20px rgba(255, 201, 5, 0.3)'
    },
    ctaButtonHover: {
      background: 'linear-gradient(135deg, #FFB700 0%, #FF9500 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(255, 201, 5, 0.5)'
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.container}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={styles.subtitle}>Our Work</div>
          <h2 style={styles.title}>Featured Projects</h2>
          <p style={styles.description}>
            Discover how we've helped businesses transform through AI and custom software solutions
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject}
            style={styles.showcase}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div style={styles.projectCard}>
              <div style={styles.projectCardBg}></div>
              <div style={styles.projectContent}>
                <div style={styles.projectHeader}>
                  <div style={styles.projectBadge}>
                    Case Study #{currentProject + 1}
                  </div>
                </div>
                
                <h3 style={styles.projectTitle}>{project.name}</h3>
                <p style={styles.projectDescription}>{project.description}</p>
                
                <div style={styles.statsGrid}>
                  {Object.entries(project.stats).map(([key, value], index) => {
                    const icons = [FiTrendingUp, FiZap, FiTarget];
                    const Icon = icons[index % icons.length];
                    return (
                      <motion.div
                        key={key}
                        style={styles.statItem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div style={styles.statIcon}>
                          <Icon />
                        </div>
                        <div style={styles.statValue}>{value}</div>
                        <div style={styles.statLabel}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div style={styles.techStack}>
                  <div style={styles.techTitle}>Technologies Used:</div>
                  <div style={styles.techTags}>
                    {project.technologies.map((tech, index) => (
                      <motion.span 
                        key={index} 
                        style={styles.techTag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(255, 201, 5, 0.2)',
                          borderColor: 'rgba(255, 201, 5, 0.5)'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={styles.controls}>
          <button 
            style={styles.navButton}
            onClick={prevProject}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFC905';
              e.currentTarget.style.color = '#0A0F1C';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1A1F2E';
              e.currentTarget.style.color = '#FFC905';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiChevronLeft />
          </button>

          <div style={styles.dots}>
            {projects.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentProject ? styles.dotActive : {})
                }}
                onClick={() => goToProject(index)}
              />
            ))}
          </div>

          <button 
            style={styles.navButton}
            onClick={nextProject}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFC905';
              e.currentTarget.style.color = '#0A0F1C';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1A1F2E';
              e.currentTarget.style.color = '#FFC905';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;