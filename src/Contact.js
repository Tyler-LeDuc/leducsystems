import React, { useState, useEffect } from 'react';
import { commonStyles } from './utils/styles';
import ContactForm from './ContactForm';

const Contact = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Toggle contact form modal
  const toggleContactForm = () => {
    setContactFormOpen(!contactFormOpen);
  };

  const styles = {
    contact: {
      backgroundColor: '#FFFFFF',
    },
    contactContainer: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    contactImageContainer: {
      position: 'relative',
      marginBottom: '2rem',
    },
    contactImage: {
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    contactContent: {
      textAlign: 'center',
    },
    contactHeading: {
      fontSize: '2rem',
      marginBottom: '1.5rem',
      color: '#1A365D',
      fontWeight: 700,
      position: 'relative',
      display: 'inline-block',
    },
    headingUnderline: {
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      width: '60px',
      height: '3px',
      background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      borderRadius: '2px',
    },
    contactText: {
      marginBottom: '2rem',
      color: '#2D3748',
      lineHeight: 1.8,
      fontSize: '1.1rem',
      maxWidth: '700px',
      margin: '0 auto 2rem',
    },
    ctaButton: {
      backgroundColor: '#1A365D',
      color: '#FFFFFF',
      padding: '1rem 2.5rem',
      borderRadius: '6px',
      fontSize: '1.2rem',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'inline-block',
      margin: '0 auto',
    },
  };

  return (
    <>
      <section id="contact" style={{...styles.contact, ...commonStyles.section}}>
        <div style={commonStyles.container}>
          <h2 style={commonStyles.sectionTitle}>
            Get In <span style={commonStyles.sectionHighlight}>Touch</span>
          </h2>
          <div style={commonStyles.sectionTitleLine}></div>
          <p style={commonStyles.sectionIntro}>Ready to transform your business with technology? Reach out today.</p>
          
          <div style={styles.contactContainer}>
            <div style={styles.contactImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Le Duc Systems Office" 
                style={styles.contactImage} 
              />
            </div>
            <div style={styles.contactContent}>
              <h3 style={styles.contactHeading}>
                Let's Build Something Amazing Together
                <div style={styles.headingUnderline}></div>
              </h3>
              <p style={styles.contactText}>
                Whether you're looking to develop a new product, optimize an existing system, or need guidance on your technology strategy, we're here to help. We approach every partnership with a fresh perspective, taking the time to understand your unique challenges and goals before recommending any solutions.
              </p>
              <button 
                style={styles.ctaButton}
                onClick={toggleContactForm}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2B4E86';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1A365D';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                Contact Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EmailJS Contact Form */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={toggleContactForm}
        recipientEmail="Tyler.a.leduc@gmail.com"
      />
    </>
  );
};

export default Contact;