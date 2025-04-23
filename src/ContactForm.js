import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Contact Form Component that can be imported and used anywhere
const ContactForm = ({ isOpen, onClose, recipientEmail = 'Tyler.a.leduc@gmail.com' }) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    employees: '',
    requirements: '',
    email: '',
    phone: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Update body overflow when form is opened/closed
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Configure EmailJS parameters
      const templateParams = {
        to_email: recipientEmail,
        from_name: formData.name,
        from_email: formData.email,
        subject: `New inquiry from ${formData.company}`,
        message: `
          Name: ${formData.name}
          Company: ${formData.company}
          Company Size: ${formData.employees}
          Phone: ${formData.phone}
          
          Requirements:
          ${formData.requirements}
        `
      };

      // EmailJS is already initialized in App.js
      await emailjs.send(
        "service_zeogjbm", // Your EmailJS service ID
        "template_mfizbds", // Your EmailJS template ID
        templateParams
      );
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setFormSubmitted(false);
        onClose();
        setFormData({
          name: '',
          company: '',
          employees: '',
          requirements: '',
          email: '',
          phone: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form styling
  const styles = {
    contactFormOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.97)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formWrapper: {
      width: '90%',
      maxWidth: '650px',
      padding: '2.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.97)',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(14, 165, 233, 0.2)',
      position: 'relative',
      overflow: 'hidden',
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1E293B',
      marginBottom: '0.8rem',
      textAlign: 'center',
      position: 'relative',
    },
    formSubtitle: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#64748B',
      marginBottom: '2rem',
      textAlign: 'center',
      maxWidth: '80%',
      margin: '0 auto 2.5rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
      position: 'relative',
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#334155',
      transition: 'all 0.3s ease',
    },
    formInput: {
      display: 'block',
      width: '100%',
      padding: '0.8rem 1rem',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid rgba(203, 213, 225, 0.8)',
      background: '#FFFFFF',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      outline: 'none',
    },
    formInputFocus: {
      border: '1px solid #38BDF8',
      boxShadow: '0 0 0 4px rgba(56, 189, 248, 0.15)',
    },
    formTextarea: {
      height: '120px',
      resize: 'vertical',
    },
    selectWrapper: {
      position: 'relative',
    },
    selectIcon: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748B',
      pointerEvents: 'none',
    },
    formSelect: {
      appearance: 'none',
      paddingRight: '2.5rem',
    },
    formSubmitButton: {
      display: 'block',
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '1.05rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      marginTop: '1rem',
      position: 'relative',
      overflow: 'hidden',
    },
    formClose: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: 'rgba(241, 245, 249, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 10,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    formPattern: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100%',
      height: '100%',
      opacity: 0.05,
      zIndex: 1,
      pointerEvents: 'none',
    },
    formContent: {
      position: 'relative',
      zIndex: 2,
    },
    formSuccessMessage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: formSubmitted ? 1 : 0,
      visibility: formSubmitted ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
      zIndex: 5,
    },
    formSuccessIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)',
      position: 'relative',
    },
    formSuccessIconCheck: {
      width: '32px',
      height: '22px',
      borderBottom: '4px solid white',
      borderRight: '4px solid white',
      transform: 'rotate(45deg) translate(-2px, -2px)',
    },
    formSuccessTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1E293B',
      marginBottom: '0.8rem',
    },
    formSuccessText: {
      fontSize: '1rem',
      color: '#64748B',
      textAlign: 'center',
      maxWidth: '80%',
    },
    formRow: {
      display: 'flex',
      gap: '1rem',
      width: '100%',
    },
    formCol50: {
      flex: '0 0 calc(50% - 0.5rem)',
    },
    errorMessage: {
      color: '#EF4444',
      fontSize: '0.9rem',
      marginTop: '0.5rem',
      textAlign: 'center',
    }
  };

  // Employee options for dropdown
  const employeeOptions = [
    'Select number of employees',
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  // If the form is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          style={styles.contactFormOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            style={styles.formWrapper}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Close button */}
            <div 
              style={styles.formClose} 
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F1F5F9';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.8)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <div style={{ position: 'relative', width: '18px', height: '18px' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#64748B',
                  transform: 'translateY(-50%) rotate(45deg)',
                  borderRadius: '1px',
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#64748B',
                  transform: 'translateY(-50%) rotate(-45deg)',
                  borderRadius: '1px',
                }}></div>
              </div>
            </div>

            <div style={styles.formPattern}></div>
            
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>Get Started with Le Duc Systems</h2>
              <p style={styles.formSubtitle}>Tell us about your project, and we'll get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formCol50}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Your Name*</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Jane Doe"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid #38BDF8';
                          e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                          e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                    </div>
                  </div>
                  <div style={styles.formCol50}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Company Name*</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Acme Inc."
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid #38BDF8';
                          e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                          e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formCol50}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid #38BDF8';
                          e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                          e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                    </div>
                  </div>
                  <div style={styles.formCol50}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid #38BDF8';
                          e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                          e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Company Size*</label>
                  <div style={styles.selectWrapper}>
                    <select
                      name="employees"
                      required
                      value={formData.employees}
                      onChange={handleInputChange}
                      style={{...styles.formInput, ...styles.formSelect}}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid #38BDF8';
                        e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                      }}
                    >
                      {employeeOptions.map((option, index) => (
                        <option key={index} value={index === 0 ? '' : option} disabled={index === 0}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div style={styles.selectIcon}>▼</div>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>What are you looking for?*</label>
                  <textarea
                    name="requirements"
                    placeholder="Tell us about your project and requirements..."
                    required
                    value={formData.requirements}
                    onChange={handleInputChange}
                    style={{...styles.formInput, ...styles.formTextarea}}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid #38BDF8';
                      e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                      e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                    }}
                  ></textarea>
                </div>

                {error && <div style={styles.errorMessage}>{error}</div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.formSubmitButton,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)';
                      e.target.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4), 0 0 10px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)';
                    e.target.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </button>
              </form>
            </div>

            {/* Success message */}
            <div style={styles.formSuccessMessage}>
              <div style={styles.formSuccessIcon}>
                <div style={styles.formSuccessIconCheck}></div>
              </div>
              <h3 style={styles.formSuccessTitle}>Thank You!</h3>
              <p style={styles.formSuccessText}>Your request has been submitted successfully. We'll get back to you within 24 hours.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;