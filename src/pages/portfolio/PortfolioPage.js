import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { commonStyles } from '../../utils/styles';
import { unifiedTheme } from '../../theme/unifiedTheme';
import { projects } from '../../data/projects';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Create project categories based on existing projects
  const categories = [
    { id: 'all', label: 'All Voyages' },
    { id: 'ai', label: 'AI Currents' },
    { id: 'software', label: 'Software Streams' },
    { id: 'web', label: 'Web Waves' }
  ];
  
  // Map projects to categories
  const projectCategories = {
    1: ['ai'],               // Customer Service Platform
    2: ['ai'],               // Predictive Maintenance
    3: ['ai', 'software'],   // Supply Chain
    4: ['ai'],               // Computer Vision
    5: ['software', 'web'],  // Knowledge Management
    6: ['ai', 'software']    // Generative Design
  };
  
  // Filter projects by selected category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => projectCategories[project.id].includes(activeCategory));

  const styles = {
    section: {
      paddingTop: '120px',
      paddingBottom: '80px',
      background: unifiedTheme.gradients.pond,
      backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.waterDrops}`,
      position: 'relative',
    },
    container: {
      ...commonStyles.container,
      maxWidth: '1200px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '15px',
      textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
    },
    description: {
      fontSize: '1.2rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto',
    },
    filterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '40px',
      justifyContent: 'center',
    },
    filterButton: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #E2E8F0',
      backgroundColor: '#F7FAFC',
      color: '#4A5568',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    activeFilter: {
      background: unifiedTheme.gradients.ocean,
      color: '#FFFFFF',
      borderColor: unifiedTheme.colors.primary[600],
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      transform: 'scale(1.05)',
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '30px',
    },
    projectCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(59, 130, 246, 0.08)',
      transition: 'all 0.3s ease',
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
      position: 'relative',
      background: `linear-gradient(to bottom, #FFFFFF, ${unifiedTheme.colors.primary[50]})`,
    },
    projectCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 40px rgba(59, 130, 246, 0.15)',
      borderColor: unifiedTheme.colors.primary[300],
    },
    projectImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
    },
    projectContent: {
      padding: '25px',
    },
    projectTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '15px',
    },
    projectDescription: {
      fontSize: '1rem',
      color: '#4A5568',
      lineHeight: '1.7',
      marginBottom: '20px',
    },
    projectStats: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '20px',
    },
    statItem: {
      padding: '6px 12px',
      background: unifiedTheme.gradients.blueLight,
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: unifiedTheme.colors.primary[700],
      border: `1px solid ${unifiedTheme.colors.primary[200]}`,
    },
    projectTech: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '20px',
    },
    techTag: {
      padding: '4px 10px',
      borderRadius: '4px',
      backgroundColor: '#F7FAFC',
      border: '1px solid #E2E8F0',
      color: '#4A5568',
      fontSize: '0.85rem',
    },
    viewDetailButton: {
      display: 'inline-block',
      padding: '10px 20px',
      background: unifiedTheme.gradients.wave,
      color: '#FFFFFF',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '0.95rem',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
    },
    viewDetailButtonHover: {
      background: unifiedTheme.gradients.ocean,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    },
  };
  
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Navigating Our Project Waters</h1>
          <p style={styles.description}>
            Dive into our portfolio where each project represents a successful voyage through the seas of technology, 
            showcasing how we've helped businesses ride the waves of digital transformation.
          </p>
        </div>
        
        {/* Category Filters */}
        <div style={styles.filterContainer}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                ...styles.filterButton,
                ...(activeCategory === category.id ? styles.activeFilter : {})
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div style={styles.projectsGrid}>
          {filteredProjects.map(project => (
            <div
              key={project.id}
              style={{
                ...styles.projectCard,
                ...(hoveredProject === project.id ? styles.projectCardHover : {})
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div 
                style={{
                  ...styles.projectImage,
                  background: project.gradient
                }}
              />
              <div style={styles.projectContent}>
                <h2 style={styles.projectTitle}>{project.name}</h2>
                <p style={styles.projectDescription}>{project.description}</p>
                
                <div style={styles.projectStats}>
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} style={styles.statItem}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                    </div>
                  ))}
                </div>
                
                <div style={styles.projectTech}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} style={styles.techTag}>{tech}</span>
                  ))}
                </div>
                
                <Link
                  to={`/portfolio/${project.id}`}
                  style={{
                    ...styles.viewDetailButton,
                    ...(hoveredButton === project.id ? styles.viewDetailButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredButton(project.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  View Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;