import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { commonStyles } from '../../utils/styles';
import { unifiedTheme } from '../../theme/unifiedTheme';
import ContactForm from '../../ContactForm';

const PricingPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  
  const toggleContactForm = (service = null) => {
    setSelectedService(service);
    setContactFormOpen(!contactFormOpen);
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Strategic pricing structure designed to convert
  const pricingPlans = [
    {
      id: 1,
      name: "Discovery & Strategy Session",
      price: "FREE",
      priceNote: "$2,500 value",
      description: "Let's explore how AI and custom software can transform your business operations.",
      features: [
        "60-minute strategic consultation",
        "Business process analysis",
        "AI opportunity identification",
        "Custom roadmap outline",
        "ROI projections",
        "No-obligation quote"
      ],
      testimonial: "LeDucSystems helped us identify $200K in annual savings through AI automation.",
      testimonialAuthor: "- Tech Startup CEO",
      cta: "Claim Your Free Session",
      ctaUrgency: "Only 3 spots left this month",
      popular: false,
      savings: null
    },
    {
      id: 2,
      name: "AI Implementation Package",
      price: "$15,000",
      priceNote: "Starting at",
      description: "Transform your business with custom AI solutions that deliver immediate ROI.",
      features: [
        "Custom AI model development",
        "Integration with existing systems",
        "Process automation setup",
        "Team training & documentation",
        "30-day performance guarantee",
        "3 months of support included",
        "Unlimited revisions during development"
      ],
      testimonial: "Our AI implementation paid for itself in 2 months. Game changer!",
      testimonialAuthor: "- Manufacturing Director",
      cta: "Start Your AI Transformation",
      ctaUrgency: "Average ROI: 300% in first year",
      popular: true,
      savings: "Save $100K+ annually vs. hiring AI developers"
    },
    {
      id: 3,
      name: "Full Custom Development",
      price: "$35,000",
      priceNote: "Starting at",
      description: "End-to-end custom software solutions with AI at the core.",
      features: [
        "Complete software architecture",
        "Advanced AI integration",
        "Cloud infrastructure setup",
        "Mobile app development",
        "Enterprise security features",
        "6 months of priority support",
        "Dedicated project manager",
        "Weekly progress updates"
      ],
      testimonial: "They built our entire platform in half the time of other quotes.",
      testimonialAuthor: "- SaaS Founder",
      cta: "Schedule Executive Briefing",
      ctaUrgency: "For serious growth-focused businesses",
      popular: false,
      savings: "Save $250K+ vs. in-house team"
    }
  ];
  
  // Ongoing partnership option
  const partnershipPlan = {
    name: "Ongoing Development Partnership",
    price: "$8,000/month",
    priceNote: "Flexible monthly retainer",
    description: "Your dedicated AI and development team, ready when you need us.",
    features: [
      "40 hours of development monthly",
      "Priority response (same day)",
      "Continuous AI optimization",
      "Monthly strategy sessions",
      "Rollover unused hours (up to 20)",
      "Cancel anytime with 30 days notice"
    ],
    testimonial: "Having LeDucSystems on retainer is like having a CTO on speed dial.",
    testimonialAuthor: "- E-commerce CEO",
    cta: "Become a Partner",
    savings: "Save 30% vs. project pricing"
  };
  
  // Value propositions
  const valueProps = [
    {
      icon: "🚀",
      title: "10X Faster Than Hiring",
      description: "Start your project next week, not next quarter"
    },
    {
      icon: "💰",
      title: "70% Less Than In-House",
      description: "No salaries, benefits, or training costs"
    },
    {
      icon: "🎯",
      title: "Proven Track Record",
      description: "Every project delivered on time and budget"
    },
    {
      icon: "🦆",
      title: "The Duck Difference",
      description: "Agile, adaptable, and always paddling forward"
    }
  ];
  
  // Success metrics
  const successMetrics = [
    { number: "25+", label: "AI Projects Delivered" },
    { number: "$2M+", label: "Client Value Generated" },
    { number: "100%", label: "On-Time Delivery*" },
    { number: "4.9★", label: "Client Satisfaction" }
  ];
  
  // Testimonials for rotation
  const testimonials = [
    {
      quote: "LeDucSystems transformed our manual processes into an AI-powered system that saves us 30 hours per week.",
      author: "Sarah Chen",
      role: "Operations Director",
      company: "TechFlow Inc."
    },
    {
      quote: "Their AI solution increased our customer satisfaction by 40% while reducing support costs by half.",
      author: "Marcus Rodriguez",
      role: "VP of Customer Success",
      company: "CloudScale"
    },
    {
      quote: "We went from idea to launched product in 8 weeks. The team's expertise in AI is unmatched.",
      author: "Jennifer Park",
      role: "Founder & CEO",
      company: "DataDrive AI"
    }
  ];
  
  // FAQ data with conversion-focused answers
  const faqData = [
    {
      question: "How do I know if AI will work for my business?",
      answer: "That's exactly what our free Discovery Session is for. We'll analyze your specific processes and show you exactly where AI can save time and money. No technical knowledge required - we speak business, not buzzwords."
    },
    {
      question: "Why choose custom development over off-the-shelf solutions?",
      answer: "Off-the-shelf solutions force you to change your business to fit the software. We build software that fits your business perfectly. Plus, you own it completely - no monthly fees, no vendor lock-in, no limits on growth."
    },
    {
      question: "What if I'm not happy with the results?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not seeing the value we promised, we'll work for free until you do or refund your investment. That's how confident we are in our work."
    },
    {
      question: "How quickly can we start seeing ROI?",
      answer: "Most clients see measurable improvements within 30-60 days of implementation. Our AI solutions typically pay for themselves within 3-6 months through efficiency gains and cost savings."
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
      padding: isMobile ? '0 15px' : '0 40px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: isMobile ? '2.25rem' : '3rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[900],
      marginBottom: '20px',
      textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
      lineHeight: '1.2',
    },
    subtitle: {
      fontSize: isMobile ? '1.1rem' : '1.4rem',
      lineHeight: '1.6',
      color: '#2D3748',
      maxWidth: '800px',
      margin: '0 auto 30px',
      fontWeight: '500',
    },
    urgencyBanner: {
      background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      padding: '12px 24px',
      borderRadius: '8px',
      display: 'inline-block',
      marginBottom: '40px',
      boxShadow: '0 2px 8px rgba(251, 191, 36, 0.2)',
    },
    urgencyText: {
      color: '#92400E',
      fontWeight: '600',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    metricsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '20px' : '60px',
      marginBottom: '60px',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
    },
    metricItem: {
      textAlign: 'center',
      flex: isMobile ? '0 0 45%' : '1',
    },
    metricNumber: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[600],
      marginBottom: '5px',
      display: 'block',
    },
    metricLabel: {
      fontSize: '0.9rem',
      color: '#4A5568',
      fontWeight: '500',
    },
    valuePropContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '15px' : '20px',
      marginBottom: '60px',
      padding: isMobile ? '20px 15px' : '30px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.08)',
    },
    valuePropItem: {
      textAlign: 'center',
      padding: '20px 10px',
    },
    valuePropIcon: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      marginBottom: '10px',
    },
    valuePropTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '8px',
    },
    valuePropDesc: {
      fontSize: '0.9rem',
      color: '#4A5568',
      lineHeight: '1.5',
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '20px' : '24px',
      marginBottom: '60px',
      alignItems: 'stretch',
      marginTop: '40px',
      padding: isMobile ? '0 5px' : '0'
    },
    pricingCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: `2px solid transparent`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    pricingCardPopular: {
      border: `2px solid ${unifiedTheme.colors.primary[500]}`,
      transform: isMobile ? 'scale(1.02)' : 'scale(1.05)',
      boxShadow: isMobile ? '0 10px 20px rgba(59, 130, 246, 0.15)' : '0 20px 40px rgba(59, 130, 246, 0.2)',
    },
    pricingCardHover: {
      transform: isMobile ? 'none' : 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      borderColor: unifiedTheme.colors.primary[400],
    },
    popularBadge: {
      position: 'absolute',
      top: '-1px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '8px 24px',
      background: unifiedTheme.gradients.ocean,
      color: '#FFFFFF',
      borderRadius: '0 0 20px 20px',
      fontSize: '0.85rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    },
    planHeader: {
      padding: isMobile ? '30px 20px 20px' : '35px 30px 25px',
      textAlign: 'center',
    },
    planName: {
      fontSize: isMobile ? '1.4rem' : '1.6rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '20px',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    planPrice: {
      fontSize: isMobile ? '2.2rem' : '2.8rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[700],
      marginBottom: '5px',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: '8px',
    },
    priceNote: {
      fontSize: '0.9rem',
      color: '#718096',
      fontWeight: '500',
      marginBottom: '10px',
    },
    planDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#2D3748',
      marginTop: '15px',
      marginBottom: '20px',
      minHeight: '50px',
      fontWeight: '500',
    },
    savingsTag: {
      display: 'inline-block',
      padding: '6px 12px',
      backgroundColor: '#C6F6D5',
      color: '#22543D',
      borderRadius: '6px',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginBottom: '20px',
    },
    planFeatures: {
      padding: isMobile ? '0 20px 20px' : '0 30px 30px',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
    },
    featuresList: {
      listStyle: 'none',
      padding: '0',
      margin: '0 0 20px 0',
      flex: '1',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '14px',
      fontSize: '0.95rem',
      color: '#2D3748',
      lineHeight: '1.5',
    },
    featureCheck: {
      color: '#48BB78',
      marginRight: '12px',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginTop: '-2px',
    },
    testimonialBox: {
      backgroundColor: unifiedTheme.colors.primary[50],
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px',
      borderLeft: `3px solid ${unifiedTheme.colors.primary[400]}`,
    },
    testimonialQuote: {
      fontSize: '0.9rem',
      color: '#2D3748',
      fontStyle: 'italic',
      marginBottom: '8px',
      lineHeight: '1.5',
    },
    testimonialAuthor: {
      fontSize: '0.85rem',
      color: '#718096',
      fontWeight: '600',
      textAlign: 'right',
    },
    planButton: {
      display: 'block',
      width: '100%',
      padding: isMobile ? '18px' : '16px',
      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      color: '#FFFFFF',
      textAlign: 'center',
      border: 'none',
      borderRadius: '10px',
      fontWeight: '600',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      marginTop: 'auto',
      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '48px',
      WebkitTapHighlightColor: 'transparent',
    },
    planButtonPopular: {
      background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
      fontSize: '1.15rem',
      padding: isMobile ? '20px' : '18px',
      fontWeight: '700',
    },
    planButtonHover: {
      transform: isMobile ? 'scale(0.98)' : 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    },
    ctaUrgency: {
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.9)',
      marginTop: '8px',
      fontWeight: '500',
    },
    partnershipSection: {
      marginTop: '80px',
      marginBottom: '80px',
    },
    partnershipCard: {
      background: 'linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%)',
      borderRadius: '20px',
      padding: isMobile ? '30px 20px' : '40px',
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)',
      border: `2px solid ${unifiedTheme.colors.primary[300]}`,
      position: 'relative',
      overflow: 'hidden',
      margin: isMobile ? '0 -5px' : '0',
    },
    partnershipHeader: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    partnershipTitle: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '10px',
    },
    partnershipSubtitle: {
      fontSize: '1.1rem',
      color: '#2D3748',
      marginBottom: '20px',
    },
    partnershipGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '30px',
      alignItems: 'center',
    },
    partnershipFeatures: {
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '25px',
      borderRadius: '12px',
    },
    partnershipCTA: {
      textAlign: 'center',
      padding: '25px',
    },
    duckIcon: {
      position: 'absolute',
      bottom: '-20px',
      right: isMobile ? '-50px' : '-20px',
      opacity: isMobile ? 0.05 : 0.1,
      fontSize: isMobile ? '120px' : '150px',
      transform: 'rotate(-15deg)',
    },
    testimonialSection: {
      marginTop: '80px',
      marginBottom: '80px',
      textAlign: 'center',
    },
    testimonialContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      minHeight: '200px',
    },
    testimonialCard: {
      background: '#FFFFFF',
      padding: isMobile ? '30px 20px' : '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    testimonialQuoteMark: {
      position: 'absolute',
      top: '10px',
      left: '20px',
      fontSize: '60px',
      color: unifiedTheme.colors.primary[200],
      fontFamily: 'Georgia, serif',
      lineHeight: '1',
    },
    testimonialText: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      lineHeight: '1.6',
      color: '#2D3748',
      marginBottom: '20px',
      fontStyle: 'italic',
    },
    testimonialAuthorInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
    },
    testimonialAuthorName: {
      fontWeight: '700',
      color: unifiedTheme.colors.primary[700],
      fontSize: '1.1rem',
    },
    testimonialAuthorRole: {
      color: '#718096',
      fontSize: '0.95rem',
    },
    testimonialDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '20px',
    },
    testimonialDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#CBD5E0',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    testimonialDotActive: {
      backgroundColor: unifiedTheme.colors.primary[500],
      width: '24px',
      borderRadius: '4px',
    },
    faqSection: {
      marginTop: '80px',
      marginBottom: '80px',
    },
    faqTitle: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: '800',
      color: '#1A365D',
      marginBottom: '40px',
      textAlign: 'center',
    },
    faqGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '24px',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    faqItem: {
      backgroundColor: '#FFFFFF',
      padding: isMobile ? '20px' : '30px',
      borderRadius: '12px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease',
      WebkitTapHighlightColor: 'transparent',
    },
    faqItemHover: {
      transform: isMobile ? 'none' : 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      borderColor: unifiedTheme.colors.primary[300],
    },
    faqQuestion: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    faqIcon: {
      color: unifiedTheme.colors.primary[500],
      fontSize: '1.3rem',
      marginTop: '2px',
    },
    faqAnswer: {
      fontSize: '1rem',
      lineHeight: '1.7',
      color: '#2D3748',
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '100px',
      background: unifiedTheme.gradients.ocean,
      backgroundImage: `${unifiedTheme.gradients.ocean}, ${unifiedTheme.patterns.foam}`,
      padding: isMobile ? '40px 20px' : '60px 40px',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
    },
    ctaTitle: {
      fontSize: isMobile ? '2rem' : '2.8rem',
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: '20px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      lineHeight: '1.2',
    },
    ctaDescription: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.95)',
      maxWidth: '700px',
      margin: '0 auto 35px',
      fontWeight: '500',
    },
    ctaButton: {
      display: 'inline-block',
      padding: isMobile ? '20px 35px' : '20px 45px',
      background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
      color: '#FFFFFF',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: isMobile ? '1.15rem' : '1.25rem',
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)',
      minHeight: '56px',
      WebkitTapHighlightColor: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      border: '2px solid transparent',
    },
    ctaButtonHover: {
      transform: isMobile ? 'scale(0.98)' : 'translateY(-3px)',
      boxShadow: '0 12px 32px rgba(37, 99, 235, 0.4)',
      background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    ctaUrgencyText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem',
      marginTop: '20px',
      fontWeight: '600',
    },
  };
  
  // Handle hover states
  const [hoveredCta, setHoveredCta] = useState(null);
  const [hoveredFaq, setHoveredFaq] = useState(null);
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        

        
        {/* Pricing Plans */}
        <div style={styles.plansGrid}>
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              style={{
                ...styles.pricingCard,
                ...(plan.popular ? styles.pricingCardPopular : {}),
                ...(hoveredPlan === plan.id && !plan.popular ? styles.pricingCardHover : {})
              }}
              onMouseEnter={() => !isMobile && setHoveredPlan(plan.id)}
              onMouseLeave={() => !isMobile && setHoveredPlan(null)}
            >
              {plan.popular && <div style={styles.popularBadge}>Most Popular 🔥</div>}
              <div style={styles.planHeader}>
                <h2 style={styles.planName}>{plan.name}</h2>
                <div style={styles.planPrice}>
                  {plan.price}
                </div>
                {plan.priceNote && (
                  <div style={styles.priceNote}>{plan.priceNote}</div>
                )}
                <p style={styles.planDescription}>{plan.description}</p>
                {plan.savings && (
                  <div style={styles.savingsTag}>{plan.savings}</div>
                )}
              </div>
              <div style={styles.planFeatures}>
                <ul style={styles.featuresList}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={styles.featureItem}>
                      <span style={styles.featureCheck}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.testimonial && (
                  <div style={styles.testimonialBox}>
                    <p style={styles.testimonialQuote}>"{plan.testimonial}"</p>
                    <p style={styles.testimonialAuthor}>{plan.testimonialAuthor}</p>
                  </div>
                )}
                
                <button 
                  style={{
                    ...styles.planButton,
                    ...(plan.popular ? styles.planButtonPopular : {}),
                    ...(hoveredCta === plan.id ? styles.planButtonHover : {})
                  }}
                  onMouseEnter={() => !isMobile && setHoveredCta(plan.id)}
                  onMouseLeave={() => !isMobile && setHoveredCta(null)}
                  onClick={() => toggleContactForm(plan.name)}
                >
                  {plan.cta}
                  {plan.ctaUrgency && (
                    <div style={styles.ctaUrgency}>{plan.ctaUrgency}</div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Partnership Plan */}
        <div style={styles.partnershipSection}>
          <div style={styles.partnershipCard}>
            <div style={styles.duckIcon}>🦆</div>
            <div style={styles.partnershipHeader}>
              <h2 style={styles.partnershipTitle}>{partnershipPlan.name}</h2>
              <p style={styles.partnershipSubtitle}>
                <span style={{fontSize: '2rem', fontWeight: '800', color: unifiedTheme.colors.primary[700]}}>
                  {partnershipPlan.price}
                </span>
                <span style={{display: 'block', marginTop: '5px', fontSize: '1rem', color: '#718096'}}>
                  {partnershipPlan.priceNote}
                </span>
              </p>
            </div>
            <div style={styles.partnershipGrid}>
              <div style={styles.partnershipFeatures}>
                <ul style={styles.featuresList}>
                  {partnershipPlan.features.map((feature, index) => (
                    <li key={index} style={styles.featureItem}>
                      <span style={styles.featureCheck}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                {partnershipPlan.savings && (
                  <div style={styles.savingsTag}>{partnershipPlan.savings}</div>
                )}
              </div>
              <div style={styles.partnershipCTA}>
                <div style={styles.testimonialBox}>
                  <p style={styles.testimonialQuote}>"{partnershipPlan.testimonial}"</p>
                  <p style={styles.testimonialAuthor}>{partnershipPlan.testimonialAuthor}</p>
                </div>
                <button 
                  style={{
                    ...styles.planButton,
                    ...styles.planButtonPopular,
                    ...(hoveredCta === 'partnership' ? styles.planButtonHover : {})
                  }}
                  onMouseEnter={() => !isMobile && setHoveredCta('partnership')}
                  onMouseLeave={() => !isMobile && setHoveredCta(null)}
                  onClick={() => toggleContactForm(partnershipPlan.name)}
                >
                  {partnershipPlan.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div style={styles.faqSection}>
          <h2 style={styles.faqTitle}>Got Questions? We've Got Answers</h2>
          <div style={styles.faqGrid}>
            {faqData.map((faq, index) => (
              <div
                key={index}
                style={{
                  ...styles.faqItem,
                  ...(hoveredFaq === index ? styles.faqItemHover : {})
                }}
                onMouseEnter={() => !isMobile && setHoveredFaq(index)}
                onMouseLeave={() => !isMobile && setHoveredFaq(null)}
              >
                <h3 style={styles.faqQuestion}>
                  <span style={styles.faqIcon}>💡</span>
                  {faq.question}
                </h3>
                <p style={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Your Competition Is Already Using AI</h2>
          <p style={styles.ctaDescription}>
            Every day you wait is money left on the table. Join the leaders who are already transforming their business with our AI solutions.
          </p>
          <button
            style={{
              ...styles.ctaButton,
              ...((hoveredCta === 'main') ? styles.ctaButtonHover : {})
            }}
            onMouseEnter={() => !isMobile && setHoveredCta('main')}
            onMouseLeave={() => !isMobile && setHoveredCta(null)}
            onClick={() => toggleContactForm('Free Discovery Session')}
          >
            Claim Your Free Strategy Session Now
          </button>
          <p style={styles.ctaUrgencyText}>
            🔒 Completely Confidential • No Obligation • Immediate Value
          </p>
        </div>
      </div>
      
      {/* Integrated Contact Form */}
      <ContactForm
        isOpen={contactFormOpen}
        onClose={toggleContactForm}
        selectedService={selectedService}
      />
    </section>
  );
};

export default PricingPage;