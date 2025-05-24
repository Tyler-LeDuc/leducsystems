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
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: getResponsiveValue('30px', '50px', isMobile),
      alignItems: 'center',
      marginBottom: getResponsiveValue('40px', '60px', isMobile)
    },
    projectInfo: {
      order: isMobile ? 2 : 1
    },
    projectBadge: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: 'rgba(255, 201, 5, 0.1)',
      color: '#FFC905',
      borderRadius: unifiedTheme.borderRadius.full,
      fontSize: unifiedTheme.typography.fontSizes.sm,
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      marginBottom: '20px',
      border: '1px solid rgba(255, 201, 5, 0.3)'
    },
    projectTitle: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['2xl'], unifiedTheme.typography.fontSizes['3xl'], isMobile),
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFFFFF',
      marginBottom: '20px',
      lineHeight: unifiedTheme.typography.lineHeights.snug
    },
    projectDescription: {
      fontSize: unifiedTheme.typography.fontSizes.lg,
      color: '#B8BCC8',
      lineHeight: unifiedTheme.typography.lineHeights.loose,
      marginBottom: '30px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    statItem: {
      backgroundColor: '#1A1F2E',
      textAlign: 'center',
      padding: '20px',
      borderRadius: unifiedTheme.borderRadius.lg,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    statValue: {
      fontSize: unifiedTheme.typography.fontSizes['2xl'],
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
      padding: '6px 12px',
      backgroundColor: '#1A1F2E',
      color: '#FFC905',
      borderRadius: unifiedTheme.borderRadius.sm,
      fontSize: unifiedTheme.typography.fontSizes.sm,
      fontWeight: unifiedTheme.typography.fontWeights.medium,
      border: '1px solid rgba(255, 201, 5, 0.3)'
    },
    projectVisual: {
      order: isMobile ? 1 : 2,
      position: 'relative'
    },
    projectImage: {
      width: '100%',
      height: '350px',
      borderRadius: unifiedTheme.borderRadius.lg,
      objectFit: 'cover',
      boxShadow: unifiedTheme.shadows.xl,
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255, 201, 5, 0.1) 0%, rgba(255, 201, 5, 0.2) 100%)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'opacity 0.3s ease'
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div style={styles.projectInfo}>
              <div style={styles.projectBadge}>
                Case Study #{currentProject + 1}
              </div>
              <h3 style={styles.projectTitle}>{project.name}</h3>
              <p style={styles.projectDescription}>{project.description}</p>
              
              <div style={styles.statsGrid}>
                {Object.entries(project.stats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    style={styles.statItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div style={styles.statValue}>{value}</div>
                    <div style={styles.statLabel}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={styles.techStack}>
                <div style={styles.techTitle}>Technologies Used:</div>
                <div style={styles.techTags}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} style={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.projectVisual}>
              <img 
                src={project.image} 
                alt={project.name}
                style={styles.projectImage}
              />
              <div style={styles.imageOverlay}>
                <FiZap size={48} color="#FFC905" />
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