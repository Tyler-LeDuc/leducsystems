import React, { useState } from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme } from '../theme/unifiedTheme';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at 20% 50%, ${unifiedTheme.colors.accent.cyan}15 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, ${unifiedTheme.colors.accent.blue}10 0%, transparent 50%)`,
      animation: 'float 20s ease-in-out infinite',
    },
    contentWrapper: {
      paddingTop: '120px',
      paddingBottom: '80px',
      position: 'relative',
      zIndex: 1,
    },
    header: {
      textAlign: 'center',
      marginBottom: '80px',
    },
    title: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      fontWeight: '800',
      background: `linear-gradient(135deg, ${unifiedTheme.colors.accent.cyan} 0%, ${unifiedTheme.colors.accent.blue} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      letterSpacing: '-1px',
    },
    subtitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: '#888',
      fontWeight: '300',
      marginBottom: '10px',
      padding: isMobile ? '0 20px' : '0',
    },
    lastUpdated: {
      display: 'inline-block',
      padding: '8px 20px',
      background: 'rgba(0, 255, 255, 0.1)',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      borderRadius: '30px',
      color: unifiedTheme.colors.accent.cyan,
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    policyContainer: {
      ...commonStyles.container,
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 20px',
    },
    section: {
      marginBottom: isMobile ? '40px' : '60px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '20px',
      padding: isMobile ? '25px' : '40px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    sectionHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 40px rgba(0, 255, 255, 0.1)',
      border: '1px solid rgba(0, 255, 255, 0.2)',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '15px' : '20px',
      marginBottom: '25px',
      flexDirection: isMobile ? 'row' : 'row',
    },
    iconWrapper: {
      width: isMobile ? '50px' : '60px',
      height: isMobile ? '50px' : '60px',
      background: `linear-gradient(135deg, ${unifiedTheme.colors.accent.cyan}20 0%, ${unifiedTheme.colors.accent.blue}20 100%)`,
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '24px' : '28px',
      flexShrink: 0,
    },
    sectionTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: '700',
      color: '#fff',
      margin: 0,
      letterSpacing: '-0.5px',
    },
    content: {
      paddingLeft: isMobile ? '0' : '80px',
      marginTop: isMobile ? '20px' : '0',
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#c0c0c0',
      marginBottom: '20px',
    },
    list: {
      margin: '20px 0',
      paddingLeft: '0',
      listStyleType: 'none',
    },
    listItem: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      color: '#c0c0c0',
      marginBottom: '15px',
      paddingLeft: '30px',
      position: 'relative',
    },
    listItemBullet: {
      position: 'absolute',
      left: 0,
      top: '8px',
      width: '8px',
      height: '8px',
      backgroundColor: unifiedTheme.colors.accent.cyan,
      borderRadius: '50%',
    },
    highlight: {
      color: unifiedTheme.colors.accent.cyan,
      fontWeight: '600',
    },
    contactCard: {
      background: `linear-gradient(135deg, ${unifiedTheme.colors.accent.cyan}10 0%, ${unifiedTheme.colors.accent.blue}10 100%)`,
      borderRadius: '15px',
      padding: '30px',
      border: '1px solid rgba(0, 255, 255, 0.2)',
      marginTop: '20px',
    },
    contactRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '15px',
      fontSize: '1.1rem',
      color: '#e0e0e0',
    },
    contactIcon: {
      color: unifiedTheme.colors.accent.cyan,
      fontSize: '20px',
    },
    decorativeOrb: {
      position: 'absolute',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${unifiedTheme.colors.accent.cyan}30 0%, transparent 70%)`,
      filter: 'blur(40px)',
      top: '-50px',
      right: '-50px',
      opacity: 0.5,
    }
  };

  const sections = [
    {
      icon: '🛡️',
      title: 'Introduction',
      content: (
        <p style={styles.paragraph}>
          At <span style={styles.highlight}>Le Duc Systems</span>, your privacy isn't just a policy—it's a promise. 
          We're committed to protecting your data with the same innovation and care we bring to every project. 
          This document outlines how we handle your information with transparency and respect.
        </p>
      )
    },
    {
      icon: '📊',
      title: 'Information We Collect',
      content: (
        <>
          <p style={styles.paragraph}>We gather only what's necessary to serve you better:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Contact Details</span> - Your name, email, and phone number when you reach out
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Usage Analytics</span> - How you navigate our site to improve your experience
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Technical Data</span> - Browser type and IP address for security and optimization
            </li>
          </ul>
        </>
      )
    },
    {
      icon: '🎯',
      title: 'How We Use Your Data',
      content: (
        <>
          <p style={styles.paragraph}>Every piece of information serves a purpose:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              Crafting personalized responses to your inquiries
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              Enhancing our services based on user feedback
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              Keeping you informed about exciting updates (only with your permission!)
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              Maintaining the security and performance of our platform
            </li>
          </ul>
        </>
      )
    },
    {
      icon: '🔒',
      title: 'Fort Knox-Level Security',
      content: (
        <p style={styles.paragraph}>
          We employ <span style={styles.highlight}>state-of-the-art encryption</span> and security protocols 
          that would make a cybersecurity expert smile. Your data is stored in secure, access-controlled 
          environments, and we regularly audit our security measures to stay ahead of potential threats. 
          While no system is 100% impenetrable, we're committed to maintaining the highest standards of protection.
        </p>
      )
    },
    {
      icon: '🤝',
      title: 'Third-Party Partners',
      content: (
        <>
          <p style={styles.paragraph}>
            We carefully select partners who share our commitment to privacy. Any third-party services we use 
            for analytics or communication are thoroughly vetted and bound by strict data protection agreements. 
            We never sell your data—<span style={styles.highlight}>period</span>.
          </p>
          <p style={styles.paragraph}>Our trusted partners include:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Google Analytics</span> - For understanding website usage patterns
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>EmailJS</span> - For secure contact form submissions
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Cloud Hosting Providers</span> - For reliable website delivery
            </li>
          </ul>
        </>
      )
    },
    {
      icon: '🍪',
      title: 'Cookie Policy',
      content: (
        <>
          <p style={styles.paragraph}>
            We use cookies to enhance your experience on our website. These small text files help us:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Remember your preferences</span> - So you don't have to set them every visit
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Analyze site traffic</span> - To improve our services and user experience
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Ensure security</span> - Protecting against fraudulent activities
            </li>
          </ul>
          <p style={styles.paragraph}>
            You can control cookie settings through your browser preferences. Disabling cookies may affect some site functionality.
          </p>
        </>
      )
    },
    {
      icon: '⏱️',
      title: 'Data Retention',
      content: (
        <>
          <p style={styles.paragraph}>
            We believe in keeping data only as long as necessary:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Contact inquiries</span> - Retained for 2 years for follow-up and service improvement
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Project data</span> - Kept for the duration of our engagement plus 1 year
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Analytics data</span> - Anonymized after 26 months per Google Analytics standards
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Marketing communications</span> - Until you opt-out or request deletion
            </li>
          </ul>
          <p style={styles.paragraph}>
            You can request data deletion at any time, and we'll process it within 30 days.
          </p>
        </>
      )
    },
    {
      icon: '✨',
      title: 'Your Rights & Control',
      content: (
        <>
          <p style={styles.paragraph}>You're in the driver's seat when it comes to your data:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Access</span> - Request a copy of your data anytime
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Correct</span> - Update any inaccurate information
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Delete</span> - Request removal of your personal data
            </li>
            <li style={styles.listItem}>
              <span style={styles.listItemBullet}></span>
              <span style={styles.highlight}>Opt-out</span> - Unsubscribe from communications instantly
            </li>
          </ul>
        </>
      )
    },
    {
      icon: '📞',
      title: 'Get in Touch',
      content: (
        <>
          <p style={styles.paragraph}>
            Questions? Concerns? Just want to chat about data privacy? We're here for you:
          </p>
          <div style={styles.contactCard}>
            <div style={styles.contactRow}>
              <span style={styles.contactIcon}>💬</span>
              <span>Use our contact form to reach us</span>
            </div>
            <div style={styles.contactRow}>
              <span style={styles.contactIcon}>🌐</span>
              <span>www.leducsystems.com</span>
            </div>
            <div style={styles.contactRow}>
              <span style={styles.contactIcon}>📍</span>
              <span>Phoenix, Arizona</span>
            </div>
          </div>
        </>
      )
    },
    {
      icon: '🔄',
      title: 'Policy Updates',
      content: (
        <p style={styles.paragraph}>
          As technology evolves, so might this policy. We'll always notify you of significant changes 
          and give you time to review them. Your continued use of our services after updates means 
          you're cool with the changes. We promise to keep things <span style={styles.highlight}>clear and fair</span>.
        </p>
      )
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.subtitle}>Your data, your rules. Our commitment, your peace of mind.</p>
          <span style={styles.lastUpdated}>Last updated: January 2025</span>
        </div>

        <div style={styles.policyContainer}>
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                ...styles.section,
                ...(activeSection === index ? styles.sectionHover : {}),
              }}
              onMouseEnter={() => setActiveSection(index)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div style={styles.decorativeOrb} />
              <div style={styles.sectionHeader}>
                <div style={styles.iconWrapper}>{section.icon}</div>
                <h2 style={styles.sectionTitle}>{section.title}</h2>
              </div>
              <div style={styles.content}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;