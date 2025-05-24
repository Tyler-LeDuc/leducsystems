import React from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme } from '../theme/unifiedTheme';
import ContactForm from '../ContactForm';
import FAQ from '../components/FAQ';

const ContactPage = () => {
  // Contact page styling
  const contactStyles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto 80px',
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
      padding: '40px',
      background: `linear-gradient(to bottom, #FFFFFF, ${unifiedTheme.colors.primary[50]})`,
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
      position: 'relative',
      overflow: 'hidden'
    },
    formWrapper: {
      width: '100%',
      height: 'auto',
      paddingTop: '20px',
    },
    contactImage: {
      width: '100%',
      borderRadius: '8px',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    contactInfo: {
      marginTop: '30px',
      padding: '25px',
      background: unifiedTheme.gradients.blueLight,
      backgroundImage: `${unifiedTheme.gradients.blueLight}, ${unifiedTheme.patterns.waterDrops}`,
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.08)',
      border: `1px solid ${unifiedTheme.colors.primary[200]}`,
    },
    contactInfoTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '15px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    contactLabel: {
      fontWeight: '500',
      marginRight: '10px',
      color: '#4A5568',
      width: '100px',
    },
    contactValue: {
      color: '#2D3748',
    },
    officeHours: {
      marginTop: '20px',
      fontSize: '0.95rem',
      color: '#4A5568',
      fontStyle: 'italic',
    }
  };

  return (
    <div className="contact-page">
      <div style={{ paddingTop: '100px' }}></div>
      
      {/* Page Intro with Water Theme */}
      <div style={{ 
        padding: '20px 0 60px 0', 
        background: unifiedTheme.gradients.pond,
        backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.foam}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle ripple effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%',
          background: unifiedTheme.patterns.rippleEffect,
          opacity: 0.3,
          animation: 'pulse 15s ease-in-out infinite',
        }} />
        
        <div style={{
          ...commonStyles.container,
          textAlign: 'center',
          maxWidth: '800px',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: unifiedTheme.colors.primary[800], 
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)'
          }}>
            Let's Make a Connection
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.7', 
            color: unifiedTheme.colors.primary[700],
            marginBottom: '20px' 
          }}>
            Like streams converging into a river, great partnerships begin with a simple conversation.
            Drop us a line and let's explore how we can navigate your digital journey together.
          </p>
        </div>
      </div>
      
      {/* Contact Section */}
      <div style={{...commonStyles.container}}>
        <div style={contactStyles.container}>
          <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '8px',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.9967247016747!2d-111.90898492393851!3d33.37115845478491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0bbdbed13a73%3A0x68fe4e4a9e3a3c5c!2s3133%20W%20Frye%20Rd%20Suite%20101%2C%20Chandler%2C%20AZ%2085226!5e0!3m2!1sen!2sus!4v1708123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Le Duc Systems Office Location"
            ></iframe>
          </div>
          
          {/* Contact Information */}
          <div style={contactStyles.contactInfo}>
            <h3 style={contactStyles.contactInfoTitle}>Contact Information</h3>
            <div style={contactStyles.contactItem}>
              <span style={contactStyles.contactLabel}>Email:</span>
              <span style={contactStyles.contactValue}>info@leducsystems.com</span>
            </div>
            <div style={contactStyles.contactItem}>
              <span style={contactStyles.contactLabel}>Phone:</span>
              <span style={contactStyles.contactValue}>(480) 414-9516</span>
            </div>
            <div style={contactStyles.contactItem}>
              <span style={contactStyles.contactLabel}>Address:</span>
              <span style={contactStyles.contactValue}>3133 W Frye Rd Suite 101, Chandler, AZ 85226</span>
            </div>
            <p style={contactStyles.officeHours}>
              Office hours: Monday - Friday, 9:00 AM - 5:00 PM MST
            </p>
          </div>
          
          {/* Embedded Contact Form */}
          <div style={contactStyles.formWrapper}>
            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: unifiedTheme.colors.primary[800], marginBottom: '20px'}}>
              Send a Message in a Bottle
            </h3>
            <div id="contact-form-container">
              <ContactForm 
                isOpen={true} 
                onClose={() => {}}
                recipientEmail="leducsystems@gmail.com"
                embedded={true}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <FAQ />
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;