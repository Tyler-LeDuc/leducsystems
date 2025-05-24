import React, { useState, useEffect } from 'react';
import { commonStyles } from './utils/styles';
import ContactForm from './ContactForm';

const Contact = () => {
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
      marginBottom: '3rem',
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
    formContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      padding: '30px',
      margin: '0 auto 40px',
    },
  };

  return (
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
          </div>
          
          {/* Embedded Contact Form */}
          <div style={styles.formContainer}>
            <ContactForm 
              isOpen={true} 
              onClose={() => {}} // Empty function since we always want it open
              recipientEmail="leducsystems@gmail.com"
              embedded={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;