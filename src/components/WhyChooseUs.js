import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiZap, FiShield, FiUsers, FiTrendingUp, FiClock, FiHeart, FiTarget, FiStar } from 'react-icons/fi';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getSubtitleStyles, getDescriptionStyles, getCardStyles, getResponsiveValue } from '../theme/unifiedTheme';

const WhyChooseUs = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reasons = [
    {
      id: 1,
      icon: <FiZap size={32} />,
      title: 'Rapid Development',
      description: 'Fast, efficient delivery without compromising quality. Our streamlined processes ensure 40% faster project completion.',
      metric: '40% Faster Delivery',
      gradient: 'linear-gradient(135deg, #FFC905 0%, #FFB000 100%)',
      color: '#FFC905'
    },
    {
      id: 2,
      icon: <FiAward size={32} />,
      title: 'Proven Excellence',
      description: 'Consistent 98% client satisfaction rate through quality-focused development and exceptional customer service.',
      metric: '98% Satisfaction',
      gradient: 'linear-gradient(135deg, #FFB000 0%, #FF9500 100%)',
      color: '#FFB000'
    },
    {
      id: 3,
      icon: <FiShield size={32} />,
      title: 'Enterprise Security',
      description: 'Military-grade security protocols and compliance standards protect your data and ensure business continuity.',
      metric: 'SOC 2 Compliant',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFC905 100%)',
      color: '#FFD700'
    },
    {
      id: 4,
      icon: <FiUsers size={32} />,
      title: 'Expert Team',
      description: 'Expert developers with deep experience in modern technologies and industry best practices.',
      metric: 'Expert Team',
      gradient: 'linear-gradient(135deg, #FFC905 0%, #FFB000 100%)',
      color: '#FFC905'
    },
    {
      id: 5,
      icon: <FiTrendingUp size={32} />,
      title: 'Scalable Solutions',
      description: 'Future-proof architecture designed to grow with your business from startup to enterprise scale.',
      metric: '99.9% Uptime',
      gradient: 'linear-gradient(135deg, #FFB000 0%, #FF9500 100%)',
      color: '#FFB000'
    },
    {
      id: 6,
      icon: <FiClock size={32} />,
      title: '24/7 Support',
      description: 'Round-the-clock monitoring and support ensures your systems run smoothly with minimal downtime.',
      metric: '24/7 Availability',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFC905 100%)',
      color: '#FFD700'
    }
  ];

  const stats = [
    { value: '25+', label: 'Projects Delivered', icon: <FiTarget size={24} /> },
    { value: '98%', label: 'Client Satisfaction', icon: <FiHeart size={24} /> },
    { value: '25+', label: 'Happy Clients', icon: <FiHeart size={24} /> },
    { value: '24/7', label: 'Support Coverage', icon: <FiClock size={24} /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -15,
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const styles = {
    section: {
      ...getSectionStyles(isMobile, 'default'),
      backgroundColor: '#0A0F1C',
      position: 'relative'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.02,
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
      color: '#94A3B8'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '60px'
    },
    statItem: {
      ...getCardStyles(),
      backgroundColor: '#1A1F2E',
      border: '1px solid rgba(255, 201, 5, 0.1)',
      textAlign: 'center',
      padding: '30px 20px'
    },
    statIcon: {
      marginBottom: '15px',
      color: '#FFC905'
    },
    statValue: {
      fontSize: unifiedTheme.typography.fontSizes['4xl'],
      fontWeight: unifiedTheme.typography.fontWeights.extrabold,
      marginBottom: '8px',
      color: '#FFFFFF'
    },
    statLabel: {
      fontSize: unifiedTheme.typography.fontSizes.base,
      color: '#94A3B8',
      fontWeight: unifiedTheme.typography.fontWeights.medium
    },
    reasonsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '30px'
    },
    reasonCard: {
      ...getCardStyles(),
      backgroundColor: '#1A1F2E',
      border: '1px solid rgba(255, 201, 5, 0.1)',
      padding: '40px 32px',
      textAlign: 'center',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    iconContainer: {
      width: '80px',
      height: '80px',
      borderRadius: '20px',
      margin: '0 auto 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0A0F1C',
      transition: 'all 0.3s ease'
    },
    reasonTitle: {
      fontSize: unifiedTheme.typography.fontSizes.xl,
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFFFFF',
      marginBottom: '16px'
    },
    reasonDescription: {
      fontSize: unifiedTheme.typography.fontSizes.base,
      color: '#94A3B8',
      lineHeight: unifiedTheme.typography.lineHeights.relaxed,
      marginBottom: '24px'
    },
    metric: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: 'rgba(255, 201, 5, 0.1)',
      color: '#FFC905',
      borderRadius: unifiedTheme.borderRadius.md,
      fontSize: unifiedTheme.typography.fontSizes.sm,
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      border: '1px solid rgba(255, 201, 5, 0.3)'
    },
    decorativeElement: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      width: '40px',
      height: '40px',
      borderRadius: unifiedTheme.borderRadius.full,
      background: 'linear-gradient(135deg, #FFC905 0%, #FFB000 100%)',
      opacity: 0.1
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
          <div style={styles.subtitle}>Why Choose Us</div>
          <h2 style={styles.title}>Proven Results & Expertise</h2>
          <p style={styles.description}>
            We combine cutting-edge technology with proven methodologies to deliver exceptional results for our clients
          </p>
        </motion.div>

        <motion.div 
          style={styles.statsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              style={styles.statItem}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={styles.reasonsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              style={styles.reasonCard}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: '0 12px 30px rgba(255, 201, 5, 0.2)',
                borderColor: '#FFC905'
              }}
            >
              <div style={styles.decorativeElement}></div>
              <div style={{...styles.iconContainer, background: reason.gradient}}>
                {reason.icon}
              </div>
              <h3 style={styles.reasonTitle}>{reason.title}</h3>
              <p style={styles.reasonDescription}>{reason.description}</p>
              <div style={styles.metric}>{reason.metric}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;