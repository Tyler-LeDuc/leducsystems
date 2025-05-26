import React from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme } from '../theme/unifiedTheme';
import ContactForm from '../ContactForm';
import FAQ from '../components/FAQ';

const ContactPage = () => {
  // Professional contact page styling
  const contactStyles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto 80px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      padding: window.innerWidth <= 768 ? '24px' : '48px',
      position: 'relative',
      overflow: 'hidden'
    },
    formWrapper: {
      width: '100%',
      height: 'auto',
      paddingTop: '32px',
      paddingBottom: '24px',
    },
    mapContainer: {
      width: '100%',
      height: '450px',
      borderRadius: '8px',
      marginBottom: '3rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: '1px solid #E5E7EB',
    },
    contactInfo: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '48px',
    },
    contactCard: {
      padding: '32px 24px',
      background: '#F9FAFB',
      borderRadius: '8px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: '1px solid #E5E7EB',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }
    },
    contactIcon: {
      width: '48px',
      height: '48px',
      margin: '0 auto 16px',
      background: unifiedTheme.colors.primary[500],
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'white',
    },
    contactCardTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '8px',
    },
    contactCardValue: {
      fontSize: '0.95rem',
      color: '#6B7280',
      lineHeight: '1.6',
    },
    contactLink: {
      color: unifiedTheme.colors.primary[600],
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.2s ease',
      '&:hover': {
        color: unifiedTheme.colors.primary[700],
        textDecoration: 'underline',
      }
    },
    trustBadges: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'center',
      marginTop: '48px',
      paddingTop: '48px',
      borderTop: '1px solid #E5E7EB',
    },
    trustBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: '#F3F4F6',
      borderRadius: '100px',
      fontSize: '0.9rem',
      color: '#4B5563',
      fontWeight: '500',
    },
    ctaSection: {
      textAlign: 'center',
      marginBottom: '48px',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 32px',
      background: unifiedTheme.colors.primary[600],
      color: 'white',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1.1rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.25)',
      '&:hover': {
        background: unifiedTheme.colors.primary[700],
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.35)',
      }
    }
  };

  return (
    <div className="contact-page">
      <div style={{ paddingTop: '100px' }}></div>
      
      {/* Professional Hero Section */}
      <div style={{ 
        padding: '60px 0 80px 0', 
        background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle geometric pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-20%',
          width: '40%',
          height: '100%',
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }} />
        
        <div style={{
          ...commonStyles.container,
          textAlign: 'center',
          maxWidth: '900px',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{ 
            fontSize: window.innerWidth <= 768 ? '2.2rem' : '3rem', 
            fontWeight: '800', 
            color: '#1F2937', 
            marginBottom: '24px',
            lineHeight: '1.2',
          }}>
            Let's Build Your Next Success Story
          </h1>
          <p style={{ 
            fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem', 
            lineHeight: '1.8', 
            color: '#4B5563',
            marginBottom: '32px',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Transform your vision into reality with Arizona's most innovative development team. 
            We respond within 24 hours and deliver results that exceed expectations.
          </p>
          
          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🚀</span>
              <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>50+ Projects Delivered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>⏱️</span>
              <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>24hr Response Time</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>⭐</span>
              <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>5-Star Client Reviews</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div style={{...commonStyles.container, marginTop: '-60px'}}>
        <div style={contactStyles.container}>
          {/* Contact Methods */}
          <div style={contactStyles.contactInfo}>
            {/* Phone Card */}
            <div style={contactStyles.contactCard}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-4px)';
                   e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div style={contactStyles.contactIcon}>📱</div>
              <h3 style={contactStyles.contactCardTitle}>Call Us</h3>
              <p style={contactStyles.contactCardValue}>
                <a href="tel:+14804149516" 
                   style={contactStyles.contactLink}
                   onMouseEnter={(e) => e.target.style.color = unifiedTheme.colors.primary[700]}
                   onMouseLeave={(e) => e.target.style.color = unifiedTheme.colors.primary[600]}>
                  (480) 414-9516
                </a>
              </p>
              <p style={{ ...contactStyles.contactCardValue, fontSize: '0.85rem', marginTop: '8px' }}>
                Mon-Fri 9AM-5PM MST
              </p>
            </div>
            
            {/* Office Card */}
            <div style={contactStyles.contactCard}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-4px)';
                   e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div style={contactStyles.contactIcon}>📍</div>
              <h3 style={contactStyles.contactCardTitle}>Visit Us</h3>
              <p style={contactStyles.contactCardValue}>
                3133 W Frye Rd<br />
                Chandler, AZ 85226
              </p>
              <p style={{ ...contactStyles.contactCardValue, fontSize: '0.85rem', marginTop: '8px' }}>
                By appointment only
              </p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div style={contactStyles.ctaSection}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '700', 
              color: '#1F2937', 
              marginBottom: '16px' 
            }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#6B7280', 
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px',
            }}>
              Schedule a free consultation to discuss your needs and discover how we can help you achieve your goals.
            </p>
          </div>
          
          
          {/* Embedded Contact Form */}
          <div style={contactStyles.formWrapper}>
            <div id="contact-form-container">
              <ContactForm 
                isOpen={true} 
                onClose={() => {}}
                embedded={true}
              />
            </div>
          </div>
          
          {/* Map Section */}
          <div style={{
            marginTop: '48px',
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: '#1F2937', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Find Us in Chandler, Arizona
            </h3>
            <div style={contactStyles.mapContainer}>
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.9967247016747!2d-111.90898492393851!3d33.37115845478491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0bbdbed13a73%3A0x68fe4e4a9e3a3c5c!2s3133%20W%20Frye%20Rd%20Chandler%2C%20AZ%2085226!5e0!3m2!1sen!2sus!4v1708123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Le Duc Systems Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section with Professional Intro */}
      <div style={{
        background: '#F9FAFB',
        padding: '80px 0',
        marginTop: '80px',
      }}>
        <div style={commonStyles.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '700', 
              color: '#1F2937', 
              marginBottom: '16px' 
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#6B7280', 
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Get answers to common questions about our services and process
            </p>
          </div>
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;