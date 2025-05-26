import React, { useState } from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme, getSectionStyles, getContainerStyles, getHeaderStyles, getTitleStyles, getDescriptionStyles, getCardStyles, getResponsiveValue } from '../theme/unifiedTheme';

const FAQ = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Frequently asked questions
  const faqItems = [
    {
      id: 1,
      question: "How do you price your services?",
      answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and value-based arrangements. We work with your budget constraints to find a solution that delivers value without compromising quality. Our initial consultation is always free, where we discuss your needs and provide a detailed estimate."
    },
    {
      id: 2,
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A simple web application might take 6-8 weeks, while a more complex software solution could take 3-4 months. During our consultation, we'll provide a realistic timeline based on your specific requirements and keep you updated throughout the process."
    },
    {
      id: 3,
      question: "Do you offer support after project completion?",
      answer: "Yes, all projects include post-launch support. The duration varies by package: starter projects include 30 days, standard implementations include 3 months, and enterprise solutions include 6 months of priority support. We also offer flexible maintenance packages for ongoing needs."
    },
    {
      id: 4,
      question: "How experienced is your team?",
      answer: "Our team brings diverse expertise from backgrounds in software development, AI implementation, and business consulting. Since our founding in 2024, we've successfully delivered dozens of projects across various technologies and business domains for clients of all sizes."
    },
    {
      id: 5,
      question: "Can you work with my existing systems?",
      answer: "Absolutely. We specialize in integrating new solutions with existing systems. During our assessment phase, we'll evaluate your current infrastructure and recommend the most efficient approach to enhance your capabilities without disrupting your operations."
    },
    {
      id: 6,
      question: "Do you offer AI solutions for small businesses?",
      answer: "Yes! Making AI accessible to businesses of all sizes is central to our mission. We offer scaled AI solutions that fit small business budgets while delivering meaningful impact. Our approach focuses on practical applications that provide immediate value rather than overly complex systems."
    },
    {
      id: 7,
      question: "Where are you located?",
      answer: "We're located in Chandler, AZ at 3133 W Frye Rd. We work with clients both locally and remotely across the United States. Our established collaboration tools and processes ensure smooth communication and project management regardless of location."
    },
    {
      id: 8,
      question: "How do you handle client data security?",
      answer: "We take data security extremely seriously. We implement industry-standard security practices, including encrypted communications, secure development environments, and strict access controls. We're happy to sign NDAs before discussing sensitive project details and comply with relevant regulations like GDPR and CCPA."
    }
  ];

  const handleToggle = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  const styles = {
    section: {
      ...getSectionStyles(isMobile, 'dark'),
      backgroundColor: '#0A0F1C',
      color: '#FFFFFF'
    },
    container: {
      ...getContainerStyles(isMobile),
      maxWidth: '900px'
    },
    header: getHeaderStyles(isMobile),
    title: {
      ...getTitleStyles(isMobile, 'small'),
      color: '#FFFFFF'
    },
    description: {
      ...getDescriptionStyles(isMobile),
      color: '#B8BCC8'
    },
    faqContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    faqItem: {
      borderRadius: unifiedTheme.borderRadius.base,
      overflow: 'hidden',
      border: '1px solid #2A2F3E',
      backgroundColor: '#1A1F2E',
      transition: `all ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    faqItemExpanded: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      borderColor: '#FFC905'
    },
    faqQuestion: {
      padding: '20px',
      backgroundColor: '#252A3A',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      transition: `background-color ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`
    },
    faqQuestionHover: {
      backgroundColor: '#2A2F3E'
    },
    faqQuestionText: {
      fontSize: unifiedTheme.typography.fontSizes.lg,
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      color: '#FFFFFF'
    },
    faqQuestionIcon: {
      width: '24px',
      height: '24px',
      borderRadius: unifiedTheme.borderRadius.full,
      backgroundColor: '#FFC905',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0A0F1C',
      fontSize: unifiedTheme.typography.fontSizes.xl,
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      transition: `all ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`
    },
    faqQuestionIconExpanded: {
      transform: 'rotate(45deg)',
      backgroundColor: '#FFC905',
      color: '#0A0F1C'
    },
    faqAnswer: {
      padding: '20px',
      fontSize: unifiedTheme.typography.fontSizes.base,
      lineHeight: unifiedTheme.typography.lineHeights.loose,
      color: '#B8BCC8',
      backgroundColor: '#1A1F2E',
      borderTop: '1px solid #2A2F3E',
      maxHeight: 0,
      overflow: 'hidden',
      transition: `all ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`,
      opacity: 0
    },
    faqAnswerExpanded: {
      maxHeight: '1000px',
      opacity: 1
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Frequently Asked Questions</h2>
          <p style={styles.description}>
            Have questions? We've got answers. If you don't see what you're looking for, feel free to contact us directly.
          </p>
        </div>

        <div style={styles.faqContainer}>
          {faqItems.map(item => (
            <div 
              key={item.id} 
              style={{
                ...styles.faqItem,
                ...(expandedItem === item.id ? styles.faqItemExpanded : {})
              }}
            >
              <div 
                style={{
                  ...styles.faqQuestion,
                  ...(hoveredItem === item.id ? styles.faqQuestionHover : {})
                }}
                onClick={() => handleToggle(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={styles.faqQuestionText}>{item.question}</div>
                <div 
                  style={{
                    ...styles.faqQuestionIcon,
                    ...(expandedItem === item.id ? styles.faqQuestionIconExpanded : {})
                  }}
                >
                  +
                </div>
              </div>
              <div 
                style={{
                  ...styles.faqAnswer,
                  ...(expandedItem === item.id ? styles.faqAnswerExpanded : {})
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;