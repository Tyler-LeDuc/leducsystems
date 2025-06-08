import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { commonStyles } from '../../utils/styles';
import { unifiedTheme } from '../../theme/unifiedTheme';
import { projects } from '../../data/projects';
import ContactForm from '../../ContactForm';

const CaseStudyPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  
  useEffect(() => {
    // Find the matching project
    const projectId = parseInt(id, 10);
    const projectData = projects.find(p => p.id === projectId);
    setProject(projectData);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!project) return (
    <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
      <h2>Project not found</h2>
      <p>Sorry, we couldn't find that case study.</p>
      <Link to="/portfolio" style={{ color: '#4299E1', textDecoration: 'none' }}>Back to Portfolio</Link>
    </div>
  );
  
  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
  };

  // More detailed info for case studies - this would normally come from a database
  const caseStudyDetails = {
    1: {
      challenge: "The client, a multi-channel retail business, was facing increasing customer service costs while satisfaction scores were declining. Their legacy ticketing system couldn't handle the volume or complexity of queries, and agents were spending too much time on repetitive tasks.",
      approach: "We implemented a phased approach, first analyzing the existing customer service data to identify patterns. Then we developed a custom AI solution that combined LLMs for natural language understanding with a sophisticated routing system that prioritized tickets based on urgency and sentiment analysis.",
      solution: "Our AI-powered platform features automated response suggestions, intelligent ticket routing, and sentiment analysis that flags high-priority issues. The system integrates seamlessly with the client's existing CRM and provides comprehensive analytics on customer satisfaction and agent performance.",
      results: [
        "67% decrease in average response time from 3.8 hours to 1.25 hours",
        "42% improvement in customer satisfaction ratings",
        "78% of common queries now handled without agent intervention",
        "Annual cost savings of approximately $420,000 from improved efficiency"
      ],
    },
    2: {
      challenge: "A manufacturing client was experiencing significant unplanned downtime across their production facilities, leading to missed deadlines and increased costs. Traditional maintenance schedules were ineffective at preventing critical equipment failures.",
      approach: "We designed and implemented an IoT sensor network that collected real-time data from manufacturing equipment. This data was fed into our AI models that learned to recognize patterns indicating potential failures before they occurred.",
      solution: "Our predictive maintenance system uses advanced machine learning algorithms trained on historical failure data combined with real-time sensor monitoring. The solution includes user-friendly dashboards for maintenance teams and integrates with existing maintenance management systems.",
      results: [
        "83% reduction in unplanned downtime across facilities",
        "35% decrease in overall maintenance costs",
        "94.7% accuracy in predicting equipment failures up to 72 hours in advance",
        "ROI achieved within 7 months of implementation"
      ],
    },
    3: {
      challenge: "The client, a growing wholesale distributor, was struggling with inventory management issues including frequent stockouts of popular items and excess inventory of slower-moving products. Their manual forecasting methods couldn't keep pace with their growth or market fluctuations.",
      approach: "We developed a comprehensive supply chain intelligence platform that incorporated multiple data streams including historical sales, seasonal trends, market indicators, and supplier lead times. Our machine learning models were trained to identify patterns and make increasingly accurate predictions.",
      solution: "The AI-driven supply chain platform provides automated demand forecasting, dynamic inventory optimization, and procurement recommendations. The system continuously learns from new data, improving accuracy over time and adapting to changing market conditions.",
      results: [
        "47% increase in inventory turnover ratio",
        "62% reduction in stockout incidents",
        "92.3% forecast accuracy (up from 65% with previous methods)",
        "28% decrease in working capital tied up in inventory"
      ],
    },
    4: {
      challenge: "A precision manufacturing client was relying on manual quality control inspections that were time-consuming, inconsistent, and unable to catch all defects. This was resulting in customer complaints, returns, and damage to their reputation for quality.",
      approach: "We developed a computer vision quality control system using deep learning models trained on thousands of images of both defective and non-defective products. The system was deployed on edge computing devices integrated directly with the production line.",
      solution: "Our computer vision solution uses high-resolution cameras to capture images of products as they move through the production line. The AI analysis happens in real-time, automatically flagging defects and sorting products without slowing production. The system includes a feedback loop that continuously improves detection accuracy.",
      results: [
        "99.2% accuracy in defect detection (compared to 91% with manual inspection)",
        "20x increase in inspection speed with no additional labor",
        "94% reduction in defective products reaching customers",
        "ROI achieved within the first quarter through reduced returns and quality costs"
      ],
    },
    5: {
      challenge: "A medium-sized professional services firm was struggling with knowledge management. Critical information was scattered across emails, documents, and employees' personal knowledge. This was causing inefficiencies, knowledge gaps when employees left, and inconsistent customer service.",
      approach: "We developed a knowledge management platform powered by custom-trained language models designed specifically for the client's domain. The system was built to extract, organize, and make accessible all the unstructured information across the organization.",
      solution: "The platform uses natural language processing to automatically categorize and tag content, making it easily searchable. It includes semantic search capabilities, automated report generation, and a continuous learning system that improves as it's used. The interface was designed for ease of use by non-technical staff.",
      results: [
        "32% increase in employee productivity based on time saved searching for information",
        "96.8% accuracy in retrieving relevant documents (compared to 61% with previous methods)",
        "78% reduction in time required to onboard new employees",
        "41% improvement in consistent application of policies and procedures"
      ],
    },
    6: {
      challenge: "An engineering firm was facing increasingly complex design challenges with traditional CAD approaches. They needed to explore innovative design solutions that could optimize for multiple conflicting requirements while reducing material usage and development time.",
      approach: "We created a generative design platform that leverages AI to automatically create optimized design variations based on specified parameters and constraints. The system was trained on thousands of previous designs and engineering principles.",
      solution: "Our generative design tool allows engineers to input functional requirements and constraints, then uses AI to generate numerous design alternatives optimized for performance, manufacturing methods, and material efficiency. The platform includes visualization tools and simulation capabilities to evaluate designs before production.",
      results: [
        "86% reduction in design iteration time",
        "23% average decrease in material costs for new designs",
        "31% improvement in product performance metrics",
        "Enabled creation of novel designs that wouldn't have been conceived with traditional methods"
      ],
    }
  };
  
  // Get additional details for this project
  const details = caseStudyDetails[project.id];

  const styles = {
    section: {
      paddingTop: '160px', // Adjusted for phone bar + header height
      paddingBottom: '80px',
      background: `linear-gradient(to bottom, #FFFFFF, ${unifiedTheme.colors.primary[50]})`,
      backgroundImage: `linear-gradient(to bottom, #FFFFFF, ${unifiedTheme.colors.primary[50]}), ${unifiedTheme.patterns.underwater}`,
      position: 'relative',
    },
    container: {
      ...commonStyles.container,
      maxWidth: '1000px',
    },
    breadcrumbs: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      color: '#718096',
      fontSize: '0.9rem',
    },
    breadcrumbSeparator: {
      margin: '0 10px',
    },
    breadcrumbLink: {
      color: '#4299E1',
      textDecoration: 'none',
    },
    header: {
      marginBottom: '50px',
      textAlign: 'center',
    },
    title: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '20px',
      lineHeight: '1.2',
      textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
    },
    intro: {
      fontSize: '1.25rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '800px',
      margin: '0 auto',
    },
    heroImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      marginBottom: '50px',
    },
    statsSection: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '20px',
      background: unifiedTheme.gradients.pond,
      backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.waterDrops}`,
      padding: '30px',
      borderRadius: '16px',
      marginBottom: '50px',
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
    },
    statItem: {
      flex: '1',
      minWidth: isMobile ? '45%' : '22%',
      textAlign: 'center',
      padding: '20px 10px',
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[600],
      marginBottom: '10px',
      textShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
    },
    statLabel: {
      fontSize: '0.95rem',
      color: '#4A5568',
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '20px',
      marginTop: '40px',
    },
    content: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#2D3748',
    },
    paragraph: {
      marginBottom: '20px',
    },
    resultsList: {
      padding: '0 0 0 20px',
      margin: '20px 0',
    },
    resultItem: {
      marginBottom: '15px',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#2D3748',
    },
    quoteIcon: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      fontSize: '4rem',
      color: 'rgba(66, 153, 225, 0.2)',
      fontFamily: 'Georgia, serif',
    },
    techSection: {
      marginTop: '40px',
    },
    techTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '20px',
    },
    techGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
    },
    techItem: {
      padding: '10px 20px',
      backgroundColor: '#F7FAFC',
      borderRadius: '6px',
      fontSize: '1rem',
      color: '#2D3748',
      border: '1px solid #E2E8F0',
      fontWeight: '500',
    },
    ctaSection: {
      marginTop: '70px',
      textAlign: 'center',
      padding: '40px',
      background: unifiedTheme.gradients.blueLight,
      backgroundImage: `${unifiedTheme.gradients.blueLight}, ${unifiedTheme.patterns.foam}`,
      borderRadius: '16px',
      boxShadow: '0 5px 20px rgba(59, 130, 246, 0.1)',
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
    },
    ctaTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '15px',
    },
    ctaText: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto 25px',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '15px 30px',
      background: unifiedTheme.gradients.wave,
      color: '#FFFFFF',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s ease',
    },
    ctaButtonHover: {
      backgroundColor: '#3182CE',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 10px rgba(66, 153, 225, 0.4)',
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Breadcrumbs */}
        <div style={styles.breadcrumbs}>
          <Link to="/" style={styles.breadcrumbLink}>Home</Link>
          <span style={styles.breadcrumbSeparator}>/</span>
          <Link to="/portfolio" style={styles.breadcrumbLink}>Portfolio</Link>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span>{project.name}</span>
        </div>
        
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>{project.name}</h1>
          <p style={styles.intro}>{project.description}</p>
        </div>
        
        {/* Hero Section */}
        <div 
          style={{
            ...styles.heroImage,
            background: project.gradient,
            height: '300px'
          }}
        />
        
        {/* Stats Section */}
        <div style={styles.statsSection}>
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} style={styles.statItem}>
              <div style={styles.statValue}>{value}</div>
              <div style={styles.statLabel}>
                {key.replace(/([A-Z])/g, ' $1')
                  .trim()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </div>
            </div>
          ))}
        </div>
        
        {/* Challenge Section */}
        <h2 style={styles.sectionTitle}>The Challenge</h2>
        <div style={styles.content}>
          <p style={styles.paragraph}>{details.challenge}</p>
        </div>
        
        {/* Approach Section */}
        <h2 style={styles.sectionTitle}>Our Approach</h2>
        <div style={styles.content}>
          <p style={styles.paragraph}>{details.approach}</p>
        </div>
        
        {/* Solution Section */}
        <h2 style={styles.sectionTitle}>The Solution</h2>
        <div style={styles.content}>
          <p style={styles.paragraph}>{details.solution}</p>
        </div>
        
        {/* Results Section */}
        <h2 style={styles.sectionTitle}>Results & Impact</h2>
        <div style={styles.content}>
          <ul style={styles.resultsList}>
            {details.results.map((result, index) => (
              <li key={index} style={styles.resultItem}>{result}</li>
            ))}
          </ul>
        </div>
        
        
        {/* Technologies Used */}
        <div style={styles.techSection}>
          <h2 style={styles.techTitle}>Technologies Used</h2>
          <div style={styles.techGrid}>
            {project.technologies.map((tech, index) => (
              <div key={index} style={styles.techItem}>{tech}</div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Ready to Navigate Your Own Success Story?</h2>
          <p style={styles.ctaText}>
            Let's chart a course for your digital transformation. Our solutions create waves of innovation
            that carry your business to new shores of success.
          </p>
          <button 
            style={{
              ...styles.ctaButton,
              ...(hoveredButton ? styles.ctaButtonHover : {})
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
            onClick={toggleContactForm}
          >
            Request a Consultation
          </button>
        </div>
      </div>
      
      {/* Integrated Contact Form */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
      />
    </section>
  );
};

export default CaseStudyPage;