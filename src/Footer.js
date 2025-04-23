import React, { useState } from 'react';
import { commonStyles } from './utils/styles';
import ContactForm from './ContactForm';

const Footer = () => {
  // State for contact form
  const [contactFormOpen, setContactFormOpen] = useState(false);

  // Toggle contact form
  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
  };

  const styles = {
    footer: {
      backgroundColor: '#1A365D',
      color: '#FFFFFF',
      padding: '4rem 0 3rem',
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '2rem',
    },
    footerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    footerLogoText: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#4FD1C5',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
    },
    contactIcon: {
      width: '18px',
      height: '18px',
    },
    navLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    link: {
      color: '#FFFFFF',
      textDecoration: 'none',
      transition: 'color 0.2s ease-in-out',
      ':hover': {
        color: '#4FD1C5',
      },
    },
    contactButton: {
      display: 'inline-block',
      marginTop: '1rem',
      padding: '0.6rem 1.2rem',
      backgroundColor: '#4FD1C5',
      color: '#1A365D',
      borderRadius: '4px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s ease-in-out',
      border: 'none',
      cursor: 'pointer',
    },
    contactButtonHover: {
      backgroundColor: '#38B2AC',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    socialIcon: {
      width: '24px',
      height: '24px',
      color: '#FFFFFF',
      transition: 'color 0.2s ease-in-out',
      cursor: 'pointer',
      ':hover': {
        color: '#4FD1C5',
      },
    },
    bottomSection: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    copyright: {
      fontSize: '0.9rem',
    },
    termsLinks: {
      display: 'flex',
      gap: '1.5rem',
    },
    termLink: {
      color: '#FFFFFF',
      opacity: 0.8,
      fontSize: '0.9rem',
      textDecoration: 'none',
      transition: 'opacity 0.2s ease-in-out',
      ':hover': {
        opacity: 1,
      },
    },
  };

  return (
    <>
      <footer style={styles.footer}>
        <div style={commonStyles.container}>
          <div style={styles.footerContent}>
            <div style={styles.topSection}>
              <div>
                <div style={styles.footerLogo}>
                  <img 
                    src="/duck-logo.png" 
                    alt="Le Duc Logo" 
                    style={{height: '130px', width: 'auto'}} 
                  />
                </div>
              </div>

              <div>
                <h3 style={styles.sectionTitle}>Contact Us</h3>
                <div style={styles.contactItem}>
                  <svg style={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                  </svg>
                  <a href="mailto:tyler.a.leduc@gmail.com" style={{...styles.link, display: 'block'}}>
                    tyler.a.leduc@gmail.com
                  </a>
                </div>
                <div style={styles.contactItem}>
                  <svg style={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.445 17.827c-3.684 1.684-9.401-9.43-5.8-11.308l1.053-.519 1.746 3.409-1.042.513c-1.095.587 1.185 5.04 2.305 4.497l1.032-.505 1.76 3.397-1.054.516z" />
                  </svg>
                  <a href="tel:+1-480-414-9516" style={{...styles.link, display: 'block'}}>
                    +1-480-414-9516
                  </a>
                </div>
                
                <button 
                  style={styles.contactButton}
                  onClick={toggleContactForm}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#38B2AC';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4FD1C5';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Send us a message
                </button>
              </div>

              <div>
                <h3 style={styles.sectionTitle}>Quick Links</h3>
                <div style={styles.navLinks}>
                  <a href="#about" style={styles.link}>About Us</a>
                  <a href="#services" style={styles.link}>Services</a>
                </div>
              </div>
            </div>

            <div style={styles.bottomSection}>
              <p style={styles.copyright}>
                © {new Date().getFullYear()} Le Duc Systems. All rights reserved.
              </p>
              {/* <div style={styles.termsLinks}>
                <a href="/privacy" style={styles.termLink}>Privacy Policy</a>
                <a href="/terms" style={styles.termLink}>Terms of Service</a>
                <a href="/cookies" style={styles.termLink}>Cookie Policy</a>
              </div> */}
            </div>
          </div>
        </div>
      </footer>

      {/* Integrated ContactForm Component */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
        recipientEmail="Tyler.a.leduc@gmail.com"
      />
    </>
  );
};

export default Footer;