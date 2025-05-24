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
      backgroundColor: '#1E293B',
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
    footerColumn: {
      flex: '1 1 200px',
      marginBottom: '1.5rem',
    },
    logoColumn: {
      flex: '1 1 300px',
      marginBottom: '1.5rem',
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
      color: '#38BDF8',
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
        color: '#38BDF8',
      },
    },
    contactButton: {
      display: 'inline-block',
      marginTop: '1rem',
      padding: '0.6rem 1.2rem',
      backgroundColor: '#38BDF8',
      color: '#1E293B',
      borderRadius: '4px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s ease-in-out',
      border: 'none',
      cursor: 'pointer',
    },
    contactButtonHover: {
      backgroundColor: '#0EA5E9',
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
        color: '#38BDF8',
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
              <div style={styles.logoColumn}>
                <div style={styles.footerLogo}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <img 
                      src="/duck-icon.png" 
                      alt="Le Duc Systems Duck Icon" 
                      style={{height: '140px', width: 'auto', marginRight: '-20px'}} 
                    />
                    <div style={{
                      fontWeight: 700, 
                      color: '#FFFFFF',
                      fontSize: '2.4rem',
                      letterSpacing: '0.5px',
                      lineHeight: 1.1
                    }}>
                      <div>Le Duc</div>
                      <div>Systems</div>
                    </div>
                  </div>
                </div>
                <p style={{color: '#B2C5E3', marginTop: '15px'}}>
                  Providing innovative AI solutions for businesses of all sizes. Our expertise helps you transform your operations with cutting-edge technology.
                </p>
              </div>

              <div style={styles.footerColumn}>
                <h3 style={styles.sectionTitle}>Contact Us</h3>
                <div style={styles.contactItem}>
                  <svg style={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                  </svg>
                  <a href="mailto:leducsystems@gmail.com" style={{...styles.link, display: 'block'}}>
                    leducsystems@gmail.com
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
                    e.currentTarget.style.backgroundColor = '#0EA5E9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#38BDF8';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Send us a message
                </button>
              </div>

              <div style={styles.footerColumn}>
                <h3 style={styles.sectionTitle}>Site Navigation</h3>
                <div style={styles.navLinks}>
                  <a href="/" style={styles.link}>Home</a>
                  <a href="/about" style={styles.link}>About Us</a>
                  <a href="/services" style={styles.link}>Services</a>
                  <a href="/contact" style={styles.link}>Contact</a>
                </div>
              </div>
              
              <div style={styles.footerColumn}>
                <h3 style={styles.sectionTitle}>Resources</h3>
                <div style={styles.navLinks}>
                  <a href="/blog" style={styles.link}>Blog</a>
                  <a href="/pricing" style={styles.link}>Pricing</a>
                  <a href="/team" style={styles.link}>Our Team</a>
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
        recipientEmail="leducsystems@gmail.com"
      />
    </>
  );
};

export default Footer;