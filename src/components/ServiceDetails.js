import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../utils/styles';

const ServiceDetails = () => {
  const navigate = useNavigate();
  
  // Add click outside handler to close modal
  const handleOutsideClick = (event) => {
    if (event.target.closest('[data-service-details="content"]') === null) {
      // Redirect to services page without the hash using React Router
      navigate('/services');
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const [activeService, setActiveService] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Check for hash in URL and set active service accordingly
  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#cloud-devops') {
        // Find the index of the Cloud & DevOps service
        const cloudDevOpsIndex = services.findIndex(service => 
          service.title === "Cloud Infrastructure & DevOps");
        if (cloudDevOpsIndex !== -1) {
          setActiveService(cloudDevOpsIndex);
        }
      } else if (window.location.hash === '#process-automation') {
        // Find the appropriate service for Process Automation
        // Using the AI Solution Integration service as the closest match
        const automationIndex = services.findIndex(service => 
          service.title === "AI Solution Integration");
        if (automationIndex !== -1) {
          setActiveService(automationIndex);
        }
      } else if (window.location.hash === '#enterprise-solutions') {
        // Find the appropriate service for Enterprise Solutions
        // Using Custom Software Development service as the closest match
        const enterpriseIndex = services.findIndex(service => 
          service.title === "Custom Software Development");
        if (enterpriseIndex !== -1) {
          setActiveService(enterpriseIndex);
        }
      }
    };
    
    // Check hash on component mount
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Detailed services for dedicated page
  const services = [
    {
      id: 1,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to address your specific business challenges and objectives.",
      longDescription: "Transform your operational challenges into competitive advantages with our custom software development. Our solutions have helped clients reduce operational costs by 35% and increase team productivity by 50%. We follow a rigorous agile methodology focused on delivering tangible business value at every sprint. Whether you're modernizing legacy systems or building innovative new applications, our expert developers deliver solutions that are not just reliable and scalable, but strategically aligned with your growth objectives. Clients particularly value our ability to integrate complex systems seamlessly while providing intuitive interfaces that require minimal training.",
      process: [
        "Business Process Analysis & Opportunity Mapping",
        "Architecture Design & Technology Selection",
        "Agile Development with 2-Week Delivery Cycles",
        "Comprehensive Testing (98.5% Test Coverage)",
        "CI/CD Implementation & Performance Optimization",
        "Ongoing Support with 99.9% SLA"
      ],
      technologies: ["JavaScript/TypeScript", "React", "Node.js", "Python", "Java", "AWS/Azure/GCP", "MongoDB/PostgreSQL", "GraphQL", "Redis", "Elasticsearch"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "AI Solution Integration",
      description: "Incorporating artificial intelligence capabilities into your existing systems to enhance functionality and efficiency.",
      longDescription: "Unlock the full potential of your business data with our AI integration services. Our implementations have reduced manual processing time by 67% and increased decision accuracy by 45% for our clients. We specialize in creating practical AI solutions that deliver immediate ROI while setting the foundation for advanced capabilities. Our approach focuses on seamlessly embedding AI into your existing workflows—whether it's automating document processing with 98% accuracy, implementing predictive maintenance that reduces downtime by 73%, or creating natural language interfaces that make complex systems accessible to all employees. We emphasize explainable AI design so your team always understands and trusts the systems supporting their decisions.",
      process: [
        "Data Landscape & Opportunity Assessment",
        "Use Case Prioritization Based on ROI Potential",
        "Data Preparation & Model Architecture Design",
        "Custom Model Development & API Integration",
        "A/B Testing Against Current Processes",
        "Continuous Learning Implementation & Monitoring"
      ],
      technologies: ["TensorFlow", "PyTorch", "OpenAI APIs", "Anthropic Claude", "Hugging Face", "LangChain", "MLflow", "Vector Databases", "LlamaIndex", "ONNX Runtime"],
      image: "https://images.unsplash.com/photo-1670081135519-ee6570994235?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Web & Mobile Applications",
      description: "User-friendly applications designed to provide seamless experiences across all devices.",
      longDescription: "Capture and retain more customers with digital experiences that convert at every touchpoint. Our clients typically see 40% higher engagement rates and 25% better conversion rates after implementing our solutions. We create applications that not only look stunning but deliver exceptional performance—with page load times under 1.5 seconds and a 99.9% crash-free rate. Our development process prioritizes user experience through extensive research and testing, ensuring interfaces that are intuitive for your specific audience. We place special emphasis on performance optimization, accessibility compliance, and cross-platform consistency to maximize your market reach while minimizing development and maintenance costs.",
      process: [
        "User Research & Competitive Analysis",
        "Interactive Prototyping & User Testing",
        "Performance-First Development Architecture",
        "Cross-Platform Testing (20+ Device Configurations)",
        "Accessibility Compliance Implementation (WCAG 2.1 AA)",
        "Analytics Integration & Optimization Framework"
      ],
      technologies: ["React/React Native", "Next.js", "Flutter", "Vue.js", "Swift/Kotlin", "PWA", "GraphQL", "Tailwind CSS", "Storybook", "Cypress"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Cloud Infrastructure & DevOps",
      description: "Robust, scalable cloud infrastructure setup with automated deployment pipelines for continuous delivery.",
      longDescription: "Cut infrastructure costs by up to 40% while achieving enterprise-grade reliability with our cloud and DevOps expertise. We've helped companies reduce deployment times from days to minutes while maintaining 99.99% uptime. Our approach combines cloud-native architecture with comprehensive automation to create infrastructure that scales precisely with your needs—eliminating overprovisioning while ensuring capacity during peak demands. Security is built into every layer with automated compliance checks and least-privilege access controls. For organizations transitioning to the cloud, our migration strategies minimize disruption with zero-downtime cutover approaches that have successfully moved mission-critical workloads for healthcare, financial services, and e-commerce clients.",
      process: [
        "Infrastructure Audit & Cost-Optimization Analysis",
        "Security & Compliance Requirements Mapping",
        "Infrastructure as Code Template Development",
        "Automated Pipeline Implementation & Testing",
        "Proactive Monitoring & Alert Configuration",
        "Disaster Recovery Testing & Documentation"
      ],
      technologies: ["AWS/Azure/GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus/Grafana", "ELK Stack", "Istio", "Vault"],
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const styles = {
    section: {
      padding: '40px 0 60px',
      backgroundColor: '#FFFFFF',
      position: 'relative'
    },
    container: {
      ...commonStyles.container,
      position: 'relative'
    },
    tabsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '40px',
      justifyContent: 'center',
      gap: '10px'
    },
    tab: {
      padding: '12px 20px',
      backgroundColor: '#F7FAFC',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#4A5568',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0'
    },
    activeTab: {
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)'
    },
    contentContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '30px',
      backgroundColor: '#F7FAFC',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      maxHeight: '80vh',
      overflow: 'auto',
      position: 'relative'
    },
    serviceImage: {
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      objectFit: 'cover',
      height: isMobile ? '250px' : '100%'
    },
    serviceContent: {
      display: 'flex',
      flexDirection: 'column'
    },
    serviceTitle: {
      fontSize: '1.6rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '10px'
    },
    serviceDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#2D3748',
      marginBottom: '15px',
      maxHeight: '250px',
      overflow: 'auto'
    },
    serviceHeading: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#1A365D',
      marginBottom: '15px',
      marginTop: '20px'
    },
    processList: {
      margin: '0 0 15px 0',
      padding: '0 0 0 20px'
    },
    processItem: {
      fontSize: '1rem',
      color: '#4A5568',
      marginBottom: '8px',
      position: 'relative'
    },
    techContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '10px'
    },
    techTag: {
      padding: '6px 12px',
      backgroundColor: 'rgba(66, 153, 225, 0.1)',
      color: '#4299E1',
      borderRadius: '4px',
      fontSize: '0.9rem',
      fontWeight: '500'
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.tabsContainer}>
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveService(index)}
              style={{
                ...styles.tab,
                ...(index === activeService ? styles.activeTab : {})
              }}
            >
              {service.title}
            </div>
          ))}
        </div>

        <div style={styles.contentContainer} data-service-details="content">
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }} onClick={() => navigate('/services')}>✕</div>
          <img
            src={services[activeService].image}
            alt={services[activeService].title}
            style={styles.serviceImage}
          />
          <div style={styles.serviceContent}>
            <h2 style={styles.serviceTitle}>{services[activeService].title}</h2>
            <p style={styles.serviceDescription}>
              {services[activeService].longDescription}
            </p>

            <h3 style={styles.serviceHeading}>Our Process</h3>
            <ul style={styles.processList}>
              {services[activeService].process.map((step, index) => (
                <li key={index} style={styles.processItem}>
                  {step}
                </li>
              ))}
            </ul>

            <h3 style={styles.serviceHeading}>Technologies</h3>
            <div style={styles.techContainer}>
              {services[activeService].technologies.map((tech, index) => (
                <span key={index} style={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;