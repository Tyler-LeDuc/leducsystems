import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCpu, FiZap, FiEye, FiTrendingUp, FiCloud, FiArrowRight, FiCheck, FiStar, FiTarget, FiTool, FiShield, FiUsers, FiClock, FiAward, FiLock, FiDatabase, FiSettings, FiCode, FiActivity, FiLayers } from 'react-icons/fi';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getSubtitleStyles, getDescriptionStyles, getCardStyles, getButtonStyles, getResponsiveValue } from '../theme/unifiedTheme';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const sectionRef = useRef(null);

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
            const section = entry.target.getAttribute('data-section');
            setVisibleSections(prev => [...new Set([...prev, section])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // AI-First Service Structure with images
  const aiServices = [
    {
      id: 'ai-agents',
      title: 'Intelligent AI Agents',
      subtitle: 'Autonomous Digital Solutions',
      description: 'Deploy smart AI agents that automate complex workflows, make intelligent decisions, and seamlessly integrate with your existing systems.',
      longDescription: 'Our AI agents are sophisticated digital assistants that understand context, learn from interactions, and execute complex workflows with minimal oversight.',
      icon: <FiActivity size={isMobile ? 28 : 32} />,
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
      color: '#7C3AED',
      keyBenefit: '80% Automation Rate',
      image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop',
      capabilities: [
        'Multi-step reasoning and planning',
        'Real-time decision making',
        'Natural language processing',
        'Cross-system integration',
        'Continuous learning and adaptation'
      ],
      useCases: [
        'Customer service automation',
        'Document processing and analysis',
        'Compliance monitoring',
        'Sales lead qualification',
        'Technical support triage'
      ],
      roi: '300% ROI in 6 months',
      implementation: '2-4 weeks'
    },
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      subtitle: 'Tailored Digital Solutions',
      description: 'Full-stack software development with integrated AI capabilities. We build scalable, modern applications designed specifically for your business needs.',
      longDescription: 'From concept to deployment, we create custom software solutions that leverage cutting-edge technologies and AI to give you a competitive edge.',
      icon: <FiCode size={isMobile ? 28 : 32} />,
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: '#059669',
      keyBenefit: '50% Faster Development',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      capabilities: [
        'Modern web applications',
        'Mobile app development',
        'API design and integration',
        'Cloud-native architecture',
        'Legacy system modernization'
      ],
      useCases: [
        'Enterprise resource planning',
        'Customer relationship management',
        'E-commerce platforms',
        'Data analytics dashboards',
        'Process automation tools'
      ],
      roi: '250% productivity increase',
      implementation: '4-12 weeks'
    },
    {
      id: 'ai-implementation',
      title: 'AI Implementation & Integration',
      subtitle: 'Transform Your Business',
      description: 'Strategic AI implementation that transforms your operations. We help you identify opportunities and deploy AI solutions that deliver measurable results.',
      longDescription: 'Our proven methodology ensures successful AI adoption, from initial assessment through deployment and optimization, with full training and support.',
      icon: <FiLayers size={isMobile ? 28 : 32} />,
      gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      color: '#DC2626',
      keyBenefit: '10x Efficiency Gains',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
      capabilities: [
        'AI strategy development',
        'Model selection and training',
        'System integration',
        'Performance optimization',
        'Change management'
      ],
      useCases: [
        'Predictive analytics',
        'Process automation',
        'Quality control systems',
        'Customer insights',
        'Risk assessment'
      ],
      roi: '400% average ROI',
      implementation: '3-8 weeks'
    }
  ];

  const supportingServices = [
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      description: 'Advanced image and video analysis for quality control, security, and automation.',
      icon: <FiEye size={24} />,
      color: '#2563EB',
      benefit: '99.7% accuracy',
      image: 'https://images.unsplash.com/photo-1655635949384-f737c5133dfe?w=400&h=300&fit=crop'
    },
    {
      id: 'nlp-solutions',
      title: 'Natural Language Processing',
      description: 'Extract insights from text, automate document processing, and enable natural conversations.',
      icon: <FiDatabase size={24} />,
      color: '#7C3AED',
      benefit: '95% automation rate',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Infrastructure',
      description: 'Scalable, secure cloud solutions optimized for AI workloads and modern applications.',
      icon: <FiCloud size={24} />,
      color: '#059669',
      benefit: '99.99% uptime',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop'
    }
  ];

  const processSteps = [
    {
      id: 1,
      title: 'Discovery & Assessment',
      description: 'We analyze your current processes, identify automation opportunities, and design a custom AI strategy.',
      details: [
        'Comprehensive workflow analysis',
        'ROI potential assessment',
        'Technical feasibility study',
        'Custom strategy development'
      ],
      duration: '1-2 weeks',
      icon: <FiTarget size={24} />
    },
    {
      id: 2,
      title: 'Proof of Concept',
      description: 'Build and test a working prototype to validate the approach and demonstrate immediate value.',
      details: [
        'Rapid prototype development',
        'Real-world testing',
        'Performance validation',
        'Stakeholder feedback integration'
      ],
      duration: '2-3 weeks',
      icon: <FiSettings size={24} />
    },
    {
      id: 3,
      title: 'Development & Training',
      description: 'Create the full solution with custom AI models trained specifically for your business needs.',
      details: [
        'Custom model development',
        'Data pipeline creation',
        'Security implementation',
        'Integration development'
      ],
      duration: '4-8 weeks',
      icon: <FiCpu size={24} />
    },
    {
      id: 4,
      title: 'Deployment & Optimization',
      description: 'Launch your AI solution with full monitoring, optimization, and ongoing support.',
      details: [
        'Production deployment',
        'Performance monitoring',
        'Continuous optimization',
        'Team training & support'
      ],
      duration: 'Ongoing',
      icon: <FiZap size={24} />
    }
  ];

  const caseStudies = [
    {
      id: 1,
      company: 'Manufacturing Leader',
      industry: 'Industrial Manufacturing',
      challenge: 'Manual quality control was missing 15% of defects, costing $2.3M annually',
      solution: 'Deployed computer vision AI for real-time defect detection',
      results: [
        '99.8% defect detection accuracy',
        '$2.1M annual savings',
        '40% reduction in quality issues',
        'ROI achieved in 4 months'
      ],
      timeline: '8 weeks implementation'
    },
    {
      id: 2,
      company: 'Financial Services Firm',
      industry: 'Financial Services',
      challenge: 'Customer service team overwhelmed with 10,000+ daily inquiries',
      solution: 'Implemented intelligent AI agents for customer support automation',
      results: [
        '75% of inquiries automated',
        '3-minute average response time',
        '92% customer satisfaction',
        '60% cost reduction'
      ],
      timeline: '6 weeks implementation'
    },
    {
      id: 3,
      company: 'Healthcare Organization',
      industry: 'Healthcare',
      challenge: 'Document processing taking 40+ hours weekly, prone to errors',
      solution: 'AI-powered document intelligence and processing system',
      results: [
        '95% processing time reduction',
        '99.5% accuracy improvement',
        '$180K annual savings',
        'Compliance risk eliminated'
      ],
      timeline: '5 weeks implementation'
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Le Duc Systems transformed our operations with AI that actually works. We've eliminated 80% of manual processing and our team can focus on strategic work.",
      author: "S. Chen",
      title: "Technology Executive",
      company: "Manufacturing Industry Leader"
    },
    {
      id: 2,
      quote: "The AI agents they built for us are like having 20 additional team members who never sleep. Our customer response times went from hours to minutes.",
      author: "M. Rodriguez",
      title: "Operations Director",
      company: "Financial Services Company"
    },
    {
      id: 3,
      quote: "ROI in 3 months, not 3 years. Their computer vision system caught defects we didn't even know we had. Game-changing technology.",
      author: "J. Park",
      title: "Quality Assurance Lead",
      company: "Industrial Manufacturing"
    }
  ];

  const faqs = [
    {
      question: "How quickly can we see results from AI implementation?",
      answer: "Most clients see initial results within 2-4 weeks of deployment. Full ROI is typically achieved within 3-6 months, with some implementations paying for themselves in as little as 8 weeks."
    },
    {
      question: "Is our data secure with AI systems?",
      answer: "Absolutely. We implement enterprise-grade security including end-to-end encryption, SOC 2 compliance, and can deploy on-premise or in your private cloud. Your data never leaves your control."
    },
    {
      question: "What if our team doesn't have AI expertise?",
      answer: "That's exactly why we exist. We handle everything from strategy to implementation to training. Your team gets the benefits without needing to become AI experts."
    },
    {
      question: "Can AI integrate with our existing systems?",
      answer: "Yes. Our AI solutions are designed to work with your current tech stack. We integrate with ERPs, CRMs, databases, and custom applications through APIs and direct connections."
    },
    {
      question: "What happens if the AI makes mistakes?",
      answer: "Our systems include human oversight, confidence scoring, and fallback procedures. Critical decisions can require human approval, and we provide full audit trails for compliance."
    },
    {
      question: "How much does AI implementation cost?",
      answer: "Projects typically range from $18K-$50K depending on complexity. We provide detailed ROI projections and most implementations pay for themselves within 6 months through efficiency gains."
    }
  ];

  const trustIndicators = [
    {
      icon: <FiShield size={24} />,
      title: 'SOC 2 Compliant',
      description: 'Enterprise security standards'
    },
    {
      icon: <FiAward size={24} />,
      title: 'ISO 27001 Certified',
      description: 'Information security management'
    },
    {
      icon: <FiUsers size={24} />,
      title: '50+ Implementations',
      description: 'Proven track record'
    },
    {
      icon: <FiClock size={24} />,
      title: '24/7 Support',
      description: 'Always available when you need us'
    }
  ];

  const styles = {
    page: {
      background: '#0A0F1C',
      backgroundImage: 'linear-gradient(to bottom, #0A0F1C 0%, #1A1F2E 100%)',
      minHeight: '100vh',
      paddingTop: '120px',
      position: 'relative'
    },
    hero: {
      padding: isMobile ? '40px 20px 60px' : '80px 40px 100px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=800&fit=crop')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(10, 15, 28, 0.9), rgba(26, 31, 46, 0.95))',
      zIndex: 0
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '900px',
      margin: '0 auto'
    },
    heroTitle: {
      fontSize: isMobile ? '2.5rem' : '4rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '24px',
      lineHeight: '1.1',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    heroSubtitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: 'rgba(255, 255, 255, 0.85)',
      marginBottom: '32px',
      lineHeight: '1.6',
      maxWidth: '700px',
      margin: '0 auto 32px'
    },
    heroStats: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '20px' : '40px',
      marginTop: '60px',
      maxWidth: '600px',
      margin: '60px auto 0'
    },
    stat: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: '800',
      color: '#FFC905',
      display: 'block',
      textShadow: '0 2px 10px rgba(255, 201, 5, 0.3)'
    },
    statLabel: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: '8px'
    },
    section: {
      padding: isMobile ? '20px 10px' : '30px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionAlt: {
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(10px)',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '800',
      color: 'white',
      textAlign: 'center',
      marginBottom: '20px'
    },
    sectionSubtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px'
    },
    aiGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '30px' : '40px',
      marginBottom: '60px'
    },
    aiCard: {
      background: '#1A1F2E',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    aiCardHover: {
      transform: 'translateY(-8px)',
      borderColor: 'rgba(255, 201, 5, 0.3)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
    },
    aiCardImage: {
      width: '100%',
      height: isMobile ? '180px' : '200px',
      objectFit: 'cover',
      marginBottom: '30px',
      borderRadius: '16px',
      opacity: 0.9
    },
    aiCardContent: {
      padding: isMobile ? '0 20px 30px' : '0 30px 40px'
    },
    aiCardIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      color: 'white'
    },
    aiCardTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '8px'
    },
    aiCardSubtitle: {
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    aiCardDescription: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    aiCardBenefit: {
      background: 'rgba(255, 201, 5, 0.1)',
      color: '#FFC905',
      padding: '8px 16px',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '600',
      textAlign: 'center',
      border: '1px solid rgba(255, 201, 5, 0.2)'
    },
    supportingGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '24px' : '30px',
      marginBottom: '60px'
    },
    supportingCard: {
      background: '#1A1F2E',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    },
    supportingCardHover: {
      borderColor: 'rgba(255, 201, 5, 0.3)',
      transform: 'translateY(-4px)'
    },
    supportingCardImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      opacity: 0.85
    },
    supportingCardContent: {
      padding: '24px'
    },
    processSection: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)'
    },
    processGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '30px' : '40px',
      marginBottom: '60px'
    },
    processCard: {
      background: '#1A1F2E',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    processCardActive: {
      borderColor: 'rgba(255, 201, 5, 0.3)',
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    caseStudyCard: {
      background: '#1A1F2E',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '30px'
    },
    testimonialCard: {
      background: '#1A1F2E',
      borderRadius: '20px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    },
    faqItem: {
      background: '#1A1F2E',
      borderRadius: '12px',
      marginBottom: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden'
    },
    faqQuestion: {
      padding: '20px',
      cursor: 'pointer',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '600',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },
    faqAnswer: {
      padding: '0 20px 20px',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.6'
    },
    trustGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '30px',
      marginBottom: '60px'
    },
    trustCard: {
      background: '#1A1F2E',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    cta: {
      padding: isMobile ? '40px 20px' : '60px 40px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, rgba(255, 201, 5, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)'
    },
    ctaTitle: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '20px'
    },
    ctaDescription: {
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px'
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #FFC905 0%, #FFB000 100%)',
      color: '#0A0F1C',
      fontSize: '1.1rem',
      fontWeight: '700',
      borderRadius: '16px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 8px 32px rgba(255, 201, 5, 0.3)'
    },
    ctaButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(255, 201, 5, 0.4)'
    }
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero} data-section="hero">
        <div style={styles.heroBackground}></div>
        <motion.div 
          style={styles.heroContent}
          initial={{ opacity: 0, y: 60 }}
          animate={visibleSections.includes('hero') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 style={styles.heroTitle}>
            AI Solutions & Custom Software Development
          </h1>
          <p style={styles.heroSubtitle}>
            Transform your business with intelligent automation and custom software solutions. 
            We leverage cutting-edge AI and modern development practices to deliver systems 
            that drive efficiency, innovation, and measurable growth.
          </p>
          
          <div style={styles.heroStats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>85%</span>
              <span style={styles.statLabel}>Work Automation</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>10x</span>
              <span style={styles.statLabel}>Faster Processing</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>300%</span>
              <span style={styles.statLabel}>ROI Average</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* AI Services Section */}
      <section style={{...styles.section, ...styles.sectionAlt}} data-section="ai-services">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visibleSections.includes('ai-services') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>Our Core Services</h2>
          <p style={styles.sectionSubtitle}>
            Comprehensive solutions designed to accelerate your digital transformation
          </p>
          
          <div style={styles.aiGrid}>
            {aiServices.map((service, index) => (
              <motion.div
                key={service.id}
                style={{
                  ...styles.aiCard,
                  ...(hoveredService === service.id ? styles.aiCardHover : {})
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                initial={{ opacity: 0, y: 60 }}
                animate={visibleSections.includes('ai-services') ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {service.image && (
                  <img 
                    src={service.image} 
                    alt={service.title}
                    style={styles.aiCardImage}
                  />
                )}
                <div style={styles.aiCardContent}>
                  <div style={{
                    ...styles.aiCardIcon,
                    background: service.gradient
                  }}>
                    {service.icon}
                  </div>
                  
                  <h3 style={styles.aiCardTitle}>{service.title}</h3>
                  <div style={{
                    ...styles.aiCardSubtitle,
                    color: service.color
                  }}>
                    {service.subtitle}
                  </div>
                  
                  <p style={styles.aiCardDescription}>
                    {service.description}
                  </p>
                  
                  <div style={styles.aiCardBenefit}>
                    {service.keyBenefit}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting Services */}
          <h3 style={{...styles.sectionTitle, fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '40px'}}>
            Supporting Technologies
          </h3>
          <div style={styles.supportingGrid}>
            {supportingServices.map((service, index) => (
              <motion.div
                key={service.id}
                style={{
                  ...styles.supportingCard,
                  ...(hoveredService === service.id ? styles.supportingCardHover : {})
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                initial={{ opacity: 0, y: 40 }}
                animate={visibleSections.includes('ai-services') ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {service.image && (
                  <img 
                    src={service.image} 
                    alt={service.title}
                    style={styles.supportingCardImage}
                  />
                )}
                <div style={styles.supportingCardContent}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${service.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px'
                    }}>
                      <div style={{ color: service.color }}>
                        {service.icon}
                      </div>
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'white',
                      margin: 0
                    }}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.5',
                    marginBottom: '12px'
                  }}>
                    {service.description}
                  </p>
                  
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: service.color
                  }}>
                    {service.benefit}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Implementation Process */}
      <section style={{...styles.section, ...styles.processSection}} data-section="process">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visibleSections.includes('process') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>Our Implementation Process</h2>
          <p style={styles.sectionSubtitle}>
            A proven methodology that ensures successful project delivery
          </p>
          
          <div style={styles.processGrid}>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                style={{
                  ...styles.processCard,
                  ...(selectedProcess === index ? styles.processCardActive : {})
                }}
                onClick={() => setSelectedProcess(index)}
                initial={{ opacity: 0, y: 40 }}
                animate={visibleSections.includes('process') ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                    color: '#8B5CF6'
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'white',
                      margin: 0
                    }}>
                      {step.title}
                    </h3>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#8B5CF6',
                      fontWeight: '600'
                    }}>
                      {step.duration}
                    </div>
                  </div>
                </div>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {step.description}
                </p>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {step.details.map((detail, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <FiCheck style={{
                        color: '#10B981',
                        marginRight: '8px',
                        flexShrink: 0
                      }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Testimonials */}
      <section style={{...styles.section, ...styles.sectionAlt}} data-section="testimonials">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visibleSections.includes('testimonials') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>Client Success Stories</h2>
          <p style={styles.sectionSubtitle}>
            What our clients say about their AI transformation journey
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              style={styles.testimonialCard}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <FiStar style={{
                fontSize: '2rem',
                color: '#F59E0B',
                marginBottom: '20px'
              }} />
              
              <blockquote style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                color: 'white',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '30px',
                fontWeight: '400'
              }}>
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              <div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '4px'
                }}>
                  {testimonials[activeTestimonial].author}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#8B5CF6',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  {testimonials[activeTestimonial].title}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {testimonials[activeTestimonial].company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            gap: '12px'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === activeTestimonial ? '#8B5CF6' : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section style={styles.section} data-section="trust">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visibleSections.includes('trust') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>Enterprise-Grade Security & Compliance</h2>
          <p style={styles.sectionSubtitle}>
            Your trust is our foundation. We maintain the highest standards of security and compliance.
          </p>
          
          <div style={styles.trustGrid}>
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                style={styles.trustCard}
                initial={{ opacity: 0, y: 40 }}
                animate={visibleSections.includes('trust') ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div style={{
                  color: '#FFC905',
                  marginBottom: '12px'
                }}>
                  {indicator.icon}
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {indicator.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0
                }}>
                  {indicator.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section style={{...styles.section, ...styles.sectionAlt}} data-section="faq">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visibleSections.includes('faq') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p style={styles.sectionSubtitle}>
            Get answers to common questions about AI implementation and our services
          </p>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                style={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections.includes('faq') ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  style={{
                    ...styles.faqQuestion,
                    background: activeFAQ === index ? 'rgba(255, 201, 5, 0.05)' : 'transparent'
                  }}
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <FiArrowRight style={{
                    transform: activeFAQ === index ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }} />
                </div>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={styles.faqAnswer}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta} data-section="cta">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visibleSections.includes('cta') ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.ctaTitle}>Ready to Transform Your Business?</h2>
          <p style={styles.ctaDescription}>
            Let's discuss how our AI solutions and custom software can accelerate your growth and drive measurable results.
          </p>
          <motion.button
            style={styles.ctaButton}
            whileHover={styles.ctaButtonHover}
            onClick={handleContactClick}
          >
            Start Your AI Transformation
            <FiArrowRight style={{ marginLeft: '8px' }} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;