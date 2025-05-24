import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { commonStyles } from '../../utils/styles';
import { unifiedTheme } from '../../theme/unifiedTheme';
import ContactForm from '../../ContactForm';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const toggleContactForm = (service = null) => {
    setSelectedService(service);
    setContactFormOpen(!contactFormOpen);
  };
  
  // More realistic pricing for a consulting/service business
  const pricingPlans = [
    {
      id: 1,
      name: "Initial Consultation",
      price: "Free",
      description: "A no-obligation discovery call to discuss your needs and how we might help.",
      features: [
        "30-minute consultation",
        "Preliminary assessment of your needs",
        "High-level recommendations",
        "Pricing estimate for custom solutions"
      ],
      cta: "Schedule Consultation",
      popular: false
    },
    {
      id: 2,
      name: "AI Readiness Audit",
      price: "$1,500",
      description: "A comprehensive assessment of your current systems and AI opportunities.",
      features: [
        "Technical infrastructure evaluation",
        "Data quality assessment",
        "Identification of AI use cases",
        "Priority recommendations",
        "Detailed implementation roadmap"
      ],
      cta: "Request Audit",
      popular: true
    },
    {
      id: 3,
      name: "Custom Development",
      price: "Custom",
      description: "Tailored software and AI solutions designed for your specific business needs.",
      features: [
        "Full-cycle development services",
        "Custom AI integration",
        "Solution architecture",
        "Quality assurance",
        "Deployment and training",
        "Ongoing support options"
      ],
      cta: "Get Custom Quote",
      popular: false
    }
  ];
  
  // Common engagement models
  const engagementModels = [
    {
      id: 1,
      title: "Fixed-Price Projects",
      description: "For well-defined projects with clear requirements, we offer fixed-price engagements with clear deliverables and milestones.",
      bestFor: ["Defined requirements", "Clear scope", "Budget certainty", "Smaller projects"]
    },
    {
      id: 2,
      title: "Time & Materials",
      description: "Flexible engagement model based on actual time spent and resources used. Ideal for projects where requirements may evolve.",
      bestFor: ["Evolving requirements", "Agile development", "Projects requiring exploration", "Ongoing development needs"]
    },
    {
      id: 3,
      title: "Retainer Services",
      description: "Ongoing support with guaranteed hours each month. Perfect for continuous development needs or regular maintenance.",
      bestFor: ["Continuous improvement", "Regular updates", "Predictable resource allocation", "Priority support access"]
    }
  ];
  
  // Development services
  const services = [
    {
      id: 1,
      name: "Custom Software Development",
      description: "End-to-end development of custom applications tailored to your business requirements.",
      priceRange: "$15,000 - $100,000+",
      timeframe: "2-6+ months",
      icon: "💻"
    },
    {
      id: 2,
      name: "AI Integration",
      description: "Implementing AI capabilities into your existing systems and workflows.",
      priceRange: "$10,000 - $50,000+",
      timeframe: "1-4+ months",
      icon: "🤖"
    },
    {
      id: 3,
      name: "Web & Mobile Development",
      description: "Creating responsive web applications and mobile apps with modern user experiences.",
      priceRange: "$8,000 - $60,000+",
      timeframe: "1-5+ months",
      icon: "📱"
    },
    {
      id: 4,
      name: "Data Analytics Solutions",
      description: "Building data pipelines, dashboards, and analytics tools to derive insights from your data.",
      priceRange: "$12,000 - $45,000+",
      timeframe: "1-3+ months",
      icon: "📊"
    }
  ];
  
  const styles = {
    section: {
      paddingTop: '120px',
      paddingBottom: '80px',
      background: unifiedTheme.gradients.pond,
      backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.current}`,
      position: 'relative',
    },
    container: {
      ...commonStyles.container,
      maxWidth: '1200px',
      padding: isMobile ? '0 20px' : '0 40px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '15px',
      textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
    },
    subtitle: {
      fontSize: '1.2rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto',
    },
    toggleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '50px',
      gap: '15px',
    },
    toggleLabel: {
      fontSize: '1rem',
      color: '#4A5568',
      fontWeight: isAnnual ? '400' : '600',
    },
    toggleLabelAnnual: {
      fontWeight: isAnnual ? '600' : '400',
      color: isAnnual ? '#2C5282' : '#4A5568',
    },
    toggle: {
      position: 'relative',
      width: '56px',
      height: '28px',
      borderRadius: '14px',
      backgroundColor: '#4299E1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    toggleSwitch: {
      position: 'absolute',
      top: '3px',
      left: isAnnual ? '3px' : '29px',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.3s ease',
    },
    savingTag: {
      padding: '4px 8px',
      backgroundColor: '#C6F6D5',
      color: '#2F855A',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: '600',
      marginLeft: '10px',
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '40px' : '30px',
      marginBottom: '80px',
    },
    pricingCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(59, 130, 246, 0.08)',
      transition: 'all 0.3s ease',
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
      position: 'relative',
      marginBottom: isMobile ? '40px' : '0',
      background: `linear-gradient(to bottom, #FFFFFF, ${unifiedTheme.colors.primary[50]})`,
    },
    pricingCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 40px rgba(59, 130, 246, 0.15)',
      borderColor: unifiedTheme.colors.primary[300],
    },
    popularBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      padding: '5px 12px',
      background: unifiedTheme.gradients.ocean,
      color: '#FFFFFF',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
    },
    planHeader: {
      padding: '30px 25px 20px',
      borderBottom: `1px solid ${unifiedTheme.colors.primary[100]}`,
      background: unifiedTheme.gradients.blueLight,
      backgroundImage: `${unifiedTheme.gradients.blueLight}, ${unifiedTheme.patterns.rippleEffect}`,
    },
    planName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '10px',
    },
    planPrice: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#2C5282',
      marginBottom: '5px',
    },
    planPeriod: {
      fontSize: '1rem',
      color: '#4A5568',
    },
    planDescription: {
      fontSize: '0.95rem',
      lineHeight: '1.5',
      color: '#4A5568',
      marginTop: '15px',
    },
    planFeatures: {
      padding: '25px',
    },
    featuresTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#2D3748',
      marginBottom: '15px',
    },
    featuresList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      fontSize: '0.95rem',
      color: '#4A5568',
      lineHeight: '1.5',
    },
    featureCheck: {
      color: '#4299E1',
      marginRight: '10px',
      fontWeight: 'bold',
    },
    planButton: {
      display: 'block',
      width: '100%',
      padding: '12px',
      background: unifiedTheme.gradients.wave,
      color: '#FFFFFF',
      textAlign: 'center',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '20px',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
    },
    planButtonHover: {
      backgroundColor: '#3182CE',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '30px',
      marginTop: '60px',
    },
    engagementGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '60px',
    },
    engagementCard: {
      backgroundColor: '#FFFFFF',
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease',
    },
    engagementCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    engagementTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '15px',
    },
    engagementDescription: {
      fontSize: '0.95rem',
      color: '#4A5568',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    bestForTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#2D3748',
      marginBottom: '10px',
    },
    bestForList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    bestForItem: {
      padding: '5px 10px',
      backgroundColor: '#EBF8FF',
      color: '#4299E1',
      borderRadius: '4px',
      fontSize: '0.85rem',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(270px, 1fr))',
      gap: isMobile ? '30px' : '20px',
      marginBottom: '60px',
    },
    serviceCard: {
      backgroundColor: '#FFFFFF',
      padding: isMobile ? '20px' : '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: isMobile ? '320px' : 'auto',
      marginBottom: isMobile ? '30px' : '0',
    },
    serviceCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    serviceIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px',
    },
    serviceName: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '10px',
    },
    serviceDescription: {
      fontSize: '0.95rem',
      color: '#4A5568',
      lineHeight: '1.6',
      marginBottom: '15px',
      flex: 1,
    },
    serviceMeta: {
      marginTop: 'auto',
    },
    priceLabel: {
      fontSize: '0.9rem',
      color: '#4A5568',
      marginBottom: '5px',
    },
    priceRange: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#2D3748',
      marginBottom: '10px',
    },
    timeframeLabel: {
      fontSize: '0.9rem',
      color: '#4A5568',
      marginBottom: '5px',
    },
    timeframe: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#2D3748',
      marginBottom: '15px',
    },
    inquireButton: {
      padding: '8px 15px',
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '4px',
      fontWeight: '600',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    inquireButtonHover: {
      backgroundColor: '#3182CE',
    },
    faqSection: {
      marginTop: '80px',
    },
    faqTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '30px',
      textAlign: 'center',
    },
    faqGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '20px',
    },
    faqItem: {
      backgroundColor: '#FFFFFF',
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
    },
    faqQuestion: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '10px',
    },
    faqAnswer: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: '#4A5568',
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '80px',
      background: unifiedTheme.gradients.ocean,
      backgroundImage: `${unifiedTheme.gradients.ocean}, ${unifiedTheme.patterns.foam}`,
      padding: '40px',
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
    },
    ctaTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '15px',
    },
    ctaDescription: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto 25px',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '12px 25px',
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '1rem',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    ctaButtonHover: {
      backgroundColor: '#3182CE',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
    },
  };
  
  // Handle hover states
  const [hoveredCta, setHoveredCta] = useState(null);
  const [hoveredEngage, setHoveredEngage] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredInquire, setHoveredInquire] = useState(null);
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Navigate Our Pricing Waters</h1>
          <p style={styles.subtitle}>
            Like a clear mountain stream, our pricing flows transparently. We tailor our approach to your needs,
            ensuring you only pay for the value that flows into your business.
          </p>
        </div>
        
        {/* Pricing Plans */}
        <div style={styles.plansGrid}>
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              style={{
                ...styles.pricingCard,
                ...(hoveredPlan === plan.id ? styles.pricingCardHover : {})
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && <div style={styles.popularBadge}>Most Popular</div>}
              <div style={styles.planHeader}>
                <h2 style={styles.planName}>{plan.name}</h2>
                <div style={styles.planPrice}>{plan.price}</div>
                {plan.price !== "Free" && plan.price !== "Custom" && (
                  <div style={styles.planPeriod}>{isAnnual ? 'per project' : 'per hour'}</div>
                )}
                <p style={styles.planDescription}>{plan.description}</p>
              </div>
              <div style={styles.planFeatures}>
                <h3 style={styles.featuresTitle}>What's included:</h3>
                <ul style={styles.featuresList}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={styles.featureItem}>
                      <span style={styles.featureCheck}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  style={{
                    ...styles.planButton,
                    ...(hoveredCta === plan.id ? styles.planButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredCta(plan.id)}
                  onMouseLeave={() => setHoveredCta(null)}
                  onClick={() => toggleContactForm(plan.name)}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Engagement Models */}
        <h2 style={styles.sectionTitle}>Engagement Models</h2>
        <div style={styles.engagementGrid}>
          {engagementModels.map(model => (
            <div
              key={model.id}
              style={{
                ...styles.engagementCard,
                ...(hoveredEngage === model.id ? styles.engagementCardHover : {})
              }}
              onMouseEnter={() => setHoveredEngage(model.id)}
              onMouseLeave={() => setHoveredEngage(null)}
            >
              <h3 style={styles.engagementTitle}>{model.title}</h3>
              <p style={styles.engagementDescription}>{model.description}</p>
              <div style={styles.bestForTitle}>Best for:</div>
              <div style={styles.bestForList}>
                {model.bestFor.map((item, index) => (
                  <span key={index} style={styles.bestForItem}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Services and Pricing Ranges */}
        <h2 style={styles.sectionTitle}>Services & Price Ranges</h2>
        <div style={styles.servicesGrid}>
          {services.map(service => (
            <div
              key={service.id}
              style={{
                ...styles.serviceCard,
                ...(hoveredService === service.id ? styles.serviceCardHover : {})
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div style={styles.serviceIcon}>{service.icon}</div>
              <h3 style={styles.serviceName}>{service.name}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
              
              <div style={styles.serviceMeta}>
                <div style={styles.priceLabel}>Starting from:</div>
                <div style={styles.priceRange}>{service.priceRange}</div>
                
                <div style={styles.timeframeLabel}>Typical timeframe:</div>
                <div style={styles.timeframe}>{service.timeframe}</div>
                
                <button
                  style={{
                    ...styles.inquireButton,
                    ...(hoveredInquire === service.id ? styles.inquireButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredInquire(service.id)}
                  onMouseLeave={() => setHoveredInquire(null)}
                  onClick={() => toggleContactForm(service.name)}
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div style={styles.faqSection}>
          <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqGrid}>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>How do you determine pricing for custom projects?</h3>
              <p style={styles.faqAnswer}>
                We evaluate project complexity, scope, timeline, and resource requirements. After an initial consultation, 
                we provide a detailed proposal with transparent pricing based on these factors. We offer both fixed-price 
                and time-and-materials options depending on project characteristics.
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>Do you require long-term contracts?</h3>
              <p style={styles.faqAnswer}>
                It depends on the engagement type. For project-based work, the contract covers the project duration. 
                For ongoing services, we typically start with a 3-month commitment to ensure we can deliver value, 
                then offer month-to-month options.
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>What payment methods do you accept?</h3>
              <p style={styles.faqAnswer}>
                We accept credit cards, ACH bank transfers, and wire transfers. For larger projects, we typically 
                work on a milestone-based payment schedule to align payments with project progress and deliverables.
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQuestion}>Is there a minimum project size you work with?</h3>
              <p style={styles.faqAnswer}>
                We typically work with projects starting at $5,000 to ensure we can deliver meaningful value. 
                For smaller needs, we can recommend trusted partners or alternative solutions that might be 
                more cost-effective.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <h2 style={{...styles.ctaTitle, color: '#FFFFFF'}}>Ready to Set Sail?</h2>
          <p style={{...styles.ctaDescription, color: 'rgba(255, 255, 255, 0.9)'}}>
            Let's chart a course for your project. Schedule a free consultation to explore how we can navigate your unique challenges together.
          </p>
          <a 
            href="/contact"
            style={{
              ...styles.ctaButton,
              ...((hoveredCta === 'main') ? styles.ctaButtonHover : {})
            }}
            onMouseEnter={() => setHoveredCta('main')}
            onMouseLeave={() => setHoveredCta(null)}
          >
            Contact Us Today
          </a>
        </div>
      </div>
      
      {/* Integrated Contact Form */}
      <ContactForm
        isOpen={contactFormOpen}
        onClose={toggleContactForm}
        recipientEmail="leducsystems@gmail.com"
        selectedService={selectedService}
      />
    </section>
  );
};

export default PricingPage;