import React, { useState } from 'react';
import { commonStyles } from './utils/styles';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will contact you soon!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const styles = {
    contact: {
      backgroundColor: '#FFFFFF',
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
    },
    contactInfo: {
      textAlign: 'left',
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
    contactForm: {
      maxWidth: '500px',
      padding: '2.5rem',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#2D3748',
      fontWeight: 500,
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #CBD5E0',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: '#4299E1',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
      },
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #CBD5E0',
      borderRadius: '4px',
      minHeight: '150px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: '#4299E1',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
      },
    },
    submitButton: {
      backgroundColor: '#1A365D',
      color: '#FFFFFF',
      padding: '0.75rem 1.5rem',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      '&:hover': {
        backgroundColor: '#2B4E86',
        transform: 'translateY(-2px)',
      },
    },
  };

  // Media query styles
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.contactGrid.gridTemplateColumns = '1fr';
  }

  return (
    <section id="contact" style={{...styles.contact, ...commonStyles.section}}>
      <div style={commonStyles.container}>
        <h2 style={commonStyles.sectionTitle}>
          Get In <span style={commonStyles.sectionHighlight}>Touch</span>
        </h2>
        <div style={commonStyles.sectionTitleLine}></div>
        <p style={commonStyles.sectionIntro}>Ready to transform your business with technology? Reach out today.</p>
        
        <div style={styles.contactGrid}>
          <div style={styles.contactInfo}>
            <div style={styles.contactImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Le Duc Systems Office" 
                style={styles.contactImage} 
              />
            </div>
            <h3 style={{
              fontSize: '2rem',
              marginBottom: '1.5rem',
              color: '#1A365D',
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
            }}>
              Let's Build Something Amazing Together
              <div style={{
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                left: '0',
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
                borderRadius: '2px',
              }}></div>
            </h3>
            <p style={{
              marginBottom: '1.5rem',
              color: '#2D3748',
              lineHeight: 1.8,
              fontSize: '1.1rem',
            }}>
              Whether you're looking to develop a new product, optimize an existing system, or need guidance on your technology strategy, we're here to help. Fill out the form, and one of our senior consultants will get back to you within 24 hours.
            </p>
            <p style={{
              marginBottom: '1.5rem',
              color: '#2D3748',
              lineHeight: 1.8,
              fontSize: '1.1rem',
            }}>
              We approach every partnership with a fresh perspective, taking the time to understand your unique challenges and goals before recommending any solutions.
            </p>
          </div>
          
          <div style={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{...styles.input, '&:focus': styles.input['&:focus']}}
                  placeholder="Your name"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{...styles.input, '&:focus': styles.input['&:focus']}}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  style={{...styles.textarea, '&:focus': styles.textarea['&:focus']}}
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
              
              <button type="submit" style={{...styles.submitButton, '&:hover': styles.submitButton['&:hover']}}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;