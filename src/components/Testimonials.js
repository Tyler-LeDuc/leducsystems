import React, { useState } from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getSubtitleStyles, getDescriptionStyles, getCardStyles, getResponsiveValue } from '../theme/unifiedTheme';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Client testimonials
  const testimonials = [
    {
      id: 1,
      text: "Their inventory management system reduced our warehouse processing time by 37% and decreased errors by over 80%. The custom dashboards give us real-time visibility into our supply chain that we never had before. The ROI exceeded our expectations within the first quarter of implementation.",
      name: "J.K.",
      role: "Supply Chain",
      company: "Fortune 500 Logistics Company",
      initials: "JK",
      bgColor: "linear-gradient(135deg, #FFC905, #FF8C05)"
    },
    {
      id: 2,
      text: "We implemented their e-commerce platform last year and saw a 42% increase in online conversions. The AI-powered recommendation engine has driven a 28% increase in average order value. What impressed us most was how they seamlessly integrated with our existing inventory and accounting systems.",
      name: "D.R.",
      role: "Retail Technology",
      company: "National Retail Chain",
      initials: "DR",
      bgColor: "linear-gradient(135deg, #FFB800, #FFC905)"
    },
    {
      id: 3,
      text: "After struggling with outdated systems for years, their team modernized our entire infrastructure in just 5 months. The new platform handles 3x our previous transaction volume with better stability. Our team now spends 60% less time on manual data processing, allowing us to focus on strategic initiatives.",
      name: "M.L.",
      role: "Enterprise Solutions",
      company: "Professional Services Firm",
      initials: "ML",
      bgColor: "linear-gradient(135deg, #FF9500, #FFB800)"
    },
    {
      id: 4,
      text: "Their data analytics solution consolidated information from 14 different systems into one comprehensive platform. Now our marketing team can create campaigns based on actual customer behavior rather than assumptions. We've cut campaign creation time by 65% while improving performance metrics across all channels.",
      name: "R.T.",
      role: "Digital Strategy",
      company: "Technology Services Provider",
      initials: "RT",
      bgColor: "linear-gradient(135deg, #FFC905, #FFD700)"
    },
    {
      id: 5,
      text: "Le Duc Systems transformed our property management processes with their custom software solution. Our agents now list properties 75% faster and our clients can track their real estate investments through an intuitive dashboard. This technology has been a major differentiator for us in a competitive market.",
      name: "B.F.",
      role: "CTO",
      company: "Fulton Homes Real Estate",
      initials: "BF",
      bgColor: "linear-gradient(135deg, #FF8C05, #FF9500)"
    },
    {
      id: 6,
      text: "We hired Le Duc Systems to build our customer portal, and it reduced support tickets by 43% while improving satisfaction scores by 28%. Their dev team was highly communicative and delivered ahead of schedule. The documentation they provided made it easy for our team to maintain the system.",
      name: "T.C.",
      role: "VP Product",
      company: "Evercrest Software",
      initials: "TC",
      bgColor: "linear-gradient(135deg, #FFB800, #FFD700)"
    },
    {
      id: 7,
      text: "The AI analytics platform Le Duc Systems built gives us market insights that were previously impossible to obtain. We can now identify emerging trends 3-4 weeks before our competitors and adjust our strategy accordingly. The ROI has been remarkable - the system paid for itself within the first quarter.",
      name: "A.M.",
      role: "Director of Analytics",
      company: "Meridian Consumer Brands",
      initials: "AM",
      bgColor: "linear-gradient(135deg, #FFC905, #FFAB00)"
    }
  ];

  const handleDotClick = (index) => {
    setActiveTestimonial(index);
  };

  const styles = {
    section: {
      ...getSectionStyles(isMobile, 'dark'),
      background: '#0A0F1C',
      position: 'relative'
    },
    patternBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.03,
      backgroundImage: unifiedTheme.patterns.backgroundDots,
      backgroundSize: '20px 20px'
    },
    container: {
      ...getContainerStyles(isMobile),
      maxWidth: '1200px'
    },
    header: getHeaderStyles(isMobile),
    subtitle: {
      ...getSubtitleStyles(),
      color: '#FFC905'
    },
    title: {
      ...getTitleStyles(isMobile, 'small'),
      color: '#FFFFFF'
    },
    description: {
      ...getDescriptionStyles(isMobile),
      color: '#CBD5E0',
      fontSize: unifiedTheme.typography.fontSizes.lg
    },
    testimonialGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px',
      margin: '0 auto',
      width: '100%'
    },
    testimonialCard: {
      background: '#1A1F2E',
      borderRadius: '8px',
      padding: getResponsiveValue('20px', '25px', isMobile),
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      border: '1px solid rgba(255, 201, 5, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    testimonialCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(255, 201, 5, 0.15)',
      borderColor: 'rgba(255, 201, 5, 0.3)'
    },
    quoteIcon: {
      fontSize: '2.5rem',
      color: '#FFC905',
      marginBottom: '15px',
      fontFamily: 'Georgia, serif'
    },
    testimonialText: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
      color: '#E2E8F0',
      marginBottom: '20px',
      flex: 1
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 'auto'
    },
    testimonialImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginRight: '12px',
      objectFit: 'cover',
      border: '2px solid #FFC905'
    },
    authorInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    authorName: {
      fontSize: unifiedTheme.typography.fontSizes.base,
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: '#FFC905',
      marginBottom: '3px'
    },
    authorRole: {
      fontSize: unifiedTheme.typography.fontSizes.sm,
      color: '#CBD5E0',
      marginBottom: '2px'
    },
    authorCompany: {
      fontSize: unifiedTheme.typography.fontSizes.sm,
      color: '#FFC905',
      fontWeight: unifiedTheme.typography.fontWeights.semibold
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.patternBackground}></div>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.subtitle}>Client Experiences</div>
          <h2 style={styles.title}>What Our Clients Say</h2>
          <p style={styles.description}>
            We've delivered impactful solutions for clients across various industries. 
            Here's what they have to say about working with our team.
          </p>
        </div>

        <div style={styles.testimonialGrid}>
          {/* Display first three testimonials for the desktop view */}
          {testimonials.slice(4, 7).map((testimonial) => (
            <div 
              key={testimonial.id}
              style={styles.testimonialCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 201, 5, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 201, 5, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 201, 5, 0.1)';
              }}
            >
              <div style={styles.quoteIcon}>"</div>
              <div style={styles.testimonialText}>
                {testimonial.text}
              </div>
              <div style={styles.testimonialAuthor}>
                <div 
                  style={{
                    ...styles.testimonialImage,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: testimonial.bgColor,
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}
                >
                  {testimonial.initials}
                </div>
                <div style={styles.authorInfo}>
                  <div style={styles.authorName}>{testimonial.name}</div>
                  <div style={styles.authorRole}>{testimonial.role}</div>
                  <div style={styles.authorCompany}>{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;