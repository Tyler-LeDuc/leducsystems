import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiSmartphone, FiDatabase, FiCloud, FiCpu, FiLayers } from 'react-icons/fi';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getSubtitleStyles, getDescriptionStyles, getCardStyles, getResponsiveValue } from '../theme/unifiedTheme';

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const techCategories = [
    {
      id: 'frontend',
      name: 'Web & UI',
      icon: <FiCode size={24} />,
      color: '#2563EB',
      description: 'Modern web technologies that drive user engagement and conversions',
      technologies: [
        { name: 'React & Next.js', benefit: 'Faster Load Times', description: 'Lightning-fast web applications that convert visitors into customers' },
        { name: 'TypeScript', benefit: 'Fewer Bugs', description: 'Type-safe development reduces production errors by 80%' },
        { name: 'Vue.js & Angular', benefit: 'Enterprise Ready', description: 'Scalable frameworks trusted by Fortune 500 companies' },
        { name: 'Modern CSS', benefit: 'Mobile-First', description: 'Responsive designs that work perfectly on any device' }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile Solutions',
      icon: <FiSmartphone size={24} />,
      color: '#059669',
      description: 'Cross-platform mobile development that maximizes market reach',
      technologies: [
        { name: 'React Native', benefit: '70% Cost Savings', description: 'One codebase for iOS and Android - halves development time' },
        { name: 'Flutter', benefit: 'Native Performance', description: 'Google\'s framework delivers 60fps on all devices' },
        { name: 'Progressive Web Apps', benefit: 'App Store Free', description: 'Web apps that install like native apps, no app store needed' },
        { name: 'Native Development', benefit: 'Platform Optimized', description: 'Platform-specific features when maximum performance is critical' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend & APIs',
      icon: <FiDatabase size={24} />,
      color: '#7C3AED',
      description: 'Robust server architecture that scales with your business growth',
      technologies: [
        { name: 'Node.js & Python', benefit: 'Rapid Development', description: 'Get to market 40% faster with modern backend technologies' },
        { name: 'PostgreSQL & MongoDB', benefit: 'Data Security', description: 'Enterprise-grade databases with built-in encryption' },
        { name: 'GraphQL & REST APIs', benefit: 'Seamless Integration', description: 'APIs that connect all your systems and third-party services' },
        { name: 'Microservices', benefit: 'Future-Proof', description: 'Modular architecture that grows and adapts with your needs' }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud & Infrastructure',
      icon: <FiCloud size={24} />,
      color: '#DC2626',
      description: 'Enterprise cloud solutions that ensure 99.9% uptime and unlimited scale',
      technologies: [
        { name: 'AWS & Azure', benefit: '99.9% Uptime', description: 'Enterprise cloud hosting with global redundancy' },
        { name: 'Auto-Scaling', benefit: 'Handle Any Traffic', description: 'Automatically scales from 10 to 10 million users' },
        { name: 'DevOps & CI/CD', benefit: 'Zero Downtime', description: 'Deploy updates instantly without interrupting service' },
        { name: 'Infrastructure as Code', benefit: 'Disaster Recovery', description: 'Rebuild entire infrastructure in minutes, not days' }
      ]
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      icon: <FiCpu size={24} />,
      color: '#B45309',
      description: 'AI-powered solutions that automate processes and unlock business insights',
      technologies: [
        { name: 'Custom AI Models', benefit: 'Competitive Advantage', description: 'Proprietary AI solutions tailored to your specific business needs' },
        { name: 'OpenAI & LangChain', benefit: 'Smart Automation', description: 'Automate customer service, content creation, and data analysis' },
        { name: 'Computer Vision', benefit: 'Process Automation', description: 'Automate quality control, inventory, and document processing' },
        { name: 'Predictive Analytics', benefit: 'Data-Driven Decisions', description: 'ML models that predict trends and optimize operations' }
      ]
    },
    {
      id: 'integration',
      name: 'Integration & Security',
      icon: <FiLayers size={24} />,
      color: '#7C2D12',
      description: 'Secure integrations that connect your existing systems seamlessly',
      technologies: [
        { name: 'API Integration', benefit: 'System Unification', description: 'Connect CRM, ERP, payments, and all your business tools' },
        { name: 'Enterprise Security', benefit: 'SOC 2 Compliant', description: 'Bank-level security with encryption and audit trails' },
        { name: 'Real-time Analytics', benefit: 'Business Intelligence', description: 'Live dashboards and reporting for data-driven decisions' },
        { name: 'Legacy Modernization', benefit: 'Protect Investment', description: 'Upgrade old systems without losing existing functionality' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const styles = {
    section: {
      ...getSectionStyles(isMobile, 'white'),
      backgroundColor: '#FFFFFF'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.03,
      backgroundImage: unifiedTheme.patterns.backgroundGrid,
      backgroundSize: '20px 20px'
    },
    container: getContainerStyles(isMobile),
    header: getHeaderStyles(isMobile),
    subtitle: getSubtitleStyles(),
    title: {
      ...getTitleStyles(isMobile, 'medium'),
      color: unifiedTheme.colors.primary[800]
    },
    description: {
      ...getDescriptionStyles(isMobile),
      color: unifiedTheme.colors.neutral[600]
    },
    content: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
      gap: '40px',
      alignItems: 'flex-start'
    },
    categoryNav: {
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      gap: '10px',
      overflowX: isMobile ? 'auto' : 'visible',
      paddingBottom: isMobile ? '10px' : '0'
    },
    categoryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '15px 20px',
      backgroundColor: '#FFFFFF',
      border: '2px solid #E5E7EB',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#4B5563',
      minWidth: isMobile ? '150px' : 'auto',
      textAlign: 'left'
    },
    categoryButtonActive: {
      backgroundColor: '#EBF8FF',
      borderColor: '#2563EB',
      color: '#2563EB',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.15)'
    },
    techContent: {
      ...getCardStyles(),
      padding: '40px'
    },
    techHeader: {
      marginBottom: '30px'
    },
    techTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1E40AF',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    techDescription: {
      fontSize: '1.1rem',
      color: '#6B7280',
      lineHeight: 1.6
    },
    techGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '25px'
    },
    techItem: {
      padding: '20px',
      backgroundColor: unifiedTheme.colors.neutral[50],
      borderRadius: unifiedTheme.borderRadius.md,
      border: `1px solid ${unifiedTheme.colors.neutral[200]}`,
      transition: `all ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`
    },
    techItemHover: {
      backgroundColor: '#EBF8FF',
      borderColor: '#3B82F6',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.15)'
    },
    techItemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    techName: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: '#1F2937'
    },
    proficiencyBadge: {
      padding: '4px 12px',
      backgroundColor: unifiedTheme.colors.primary[50],
      color: unifiedTheme.colors.primary[600],
      borderRadius: unifiedTheme.borderRadius.md,
      fontSize: unifiedTheme.typography.fontSizes.sm,
      fontWeight: unifiedTheme.typography.fontWeights.semibold
    },
    techDesc: {
      fontSize: '0.95rem',
      color: '#6B7280',
      marginBottom: '15px',
      lineHeight: 1.5
    },
    progressBar: {
      width: '100%',
      height: '6px',
      backgroundColor: '#E5E7EB',
      borderRadius: '3px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: unifiedTheme.colors.primary[600],
      borderRadius: unifiedTheme.borderRadius.sm,
      transition: 'width 1s ease-in-out'
    }
  };

  const activeCategoryData = techCategories[activeCategory] || techCategories[0];

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
          <div style={styles.subtitle}>Technology Stack</div>
          <h2 style={styles.title}>Enterprise-Grade Technology Solutions</h2>
          <p style={styles.description}>
            Battle-tested technologies that deliver measurable business results, reduce operational costs, and scale with your growth
          </p>
        </motion.div>

        <div style={styles.content}>
          <motion.div 
            style={styles.categoryNav}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {techCategories.map((category, index) => (
              <button
                key={category.id}
                style={{
                  ...styles.categoryButton,
                  ...(index === activeCategory ? styles.categoryButtonActive : {}),
                  color: index === activeCategory ? category.color : '#4B5563'
                }}
                onClick={() => setActiveCategory(index)}
              >
                <span style={{ color: index === activeCategory ? category.color : '#6B7280' }}>
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </motion.div>

          <motion.div 
            style={styles.techContent}
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={styles.techHeader}>
              <div style={{...styles.techTitle, color: activeCategoryData.color}}>
                <span>{activeCategoryData.icon}</span>
                {activeCategoryData.name}
              </div>
              <div style={styles.techDescription}>
                {activeCategoryData.description}
              </div>
            </div>

            <motion.div 
              style={styles.techGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {activeCategoryData.technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  style={styles.techItem}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: '#EBF8FF',
                    borderColor: '#3B82F6',
                    y: -3,
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.15)'
                  }}
                >
                  <div style={styles.techItemHeader}>
                    <div style={styles.techName}>{tech.name}</div>
                    <div style={{...styles.proficiencyBadge, backgroundColor: activeCategoryData.color + '20', color: activeCategoryData.color}}>{tech.benefit}</div>
                  </div>
                  <div style={styles.techDesc}>{tech.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;