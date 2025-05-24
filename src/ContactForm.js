import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Contact Form Component that can be imported and used anywhere
const ContactForm = ({ 
  isOpen, 
  onClose, 
  recipientEmail = 'leducsystems@gmail.com', 
  embedded = false, 
  isJobApplication = false 
}) => {
  // Form ref for handling file uploads
  const formRef = useRef(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    employees: '',
    requirements: '',
    email: '',
    phone: '',
    position: isJobApplication ? 'General Application' : ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fileAttachment, setFileAttachment] = useState(null);

  // Update body overflow when form is opened/closed (only in modal mode)
  useEffect(() => {
    if (!embedded) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, embedded]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file size is more than 5MB (safely under common 10MB email limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB. Please choose a smaller file or send a link to your resume in the message.");
        e.target.value = '';
        return;
      }
      setFileAttachment(file);
      setError(null);
    }
  };

  // Convert file to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
        subject: isJobApplication 
          ? `Job Application: ${formData.position}` 
          : `New inquiry from ${formData.company}`,
        message: isJobApplication
          ? `
            Name: ${formData.name}
            Position: ${formData.position}
            Phone: ${formData.phone}
            Email: ${formData.email}
            
            Cover Letter / Additional Info:
            ${formData.requirements}
          `
          : `
            Name: ${formData.name}
            Company: ${formData.company}
            Company Size: ${formData.employees}
            Phone: ${formData.phone}
            
            Requirements:
            ${formData.requirements}
          `
      };
      
      // Add file attachment if provided
      if (fileAttachment) {
        try {
          const fileBase64 = await toBase64(fileAttachment);
          templateParams.attachment = fileBase64;
          templateParams.attachment_name = fileAttachment.name;
        } catch (fileErr) {
          console.error('Error encoding file:', fileErr);
          setError('Error processing file attachment. Please try again with a smaller file.');
          setIsSubmitting(false);
          return;
        }
      }

      // EmailJS is already initialized in App.js
      if (fileAttachment) {
        // Use sendForm for attachments
        await emailjs.sendForm(
          "service_zeogjbm", // Your EmailJS service ID
          "template_mfizbds", // Your EmailJS template ID
          formRef.current
        );
      } else {
        // Use regular send for no attachments
        await emailjs.send(
          "service_zeogjbm", // Your EmailJS service ID
          "template_mfizbds", // Your EmailJS template ID
          templateParams
        );
      }
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setFormSubmitted(false);
        onClose && onClose();
        setFormData({
          name: '',
          company: '',
          employees: '',
          requirements: '',
          email: '',
          phone: '',
          position: isJobApplication ? 'General Application' : ''
        });
        setFileAttachment(null);
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
      color: '#1E293B',
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

  // If modal mode and form is not open, don't render anything
  if (!isOpen && !embedded) return null;

  // Determine if we're in modal mode or embedded mode
  const isModalMode = !embedded && styles.contactFormOverlay !== undefined;

  // Main form content (used in both modal and embedded modes)
  const formContent = (
    <>
      {!embedded && <div style={styles.formPattern}></div>}
      
      <div style={styles.formContent}>
        <h2 style={styles.formTitle}>Get Started with Le Duc Systems</h2>
        <p style={styles.formSubtitle}>Tell us about your project, and we'll get back to you within 24 hours.</p>
        
        <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Form fields here */}
          <div style={styles.formRow}>
            <div style={styles.formCol50}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Your Name*</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Smith"
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
                <label style={styles.formLabel}>{isJobApplication ? 'Position*' : 'Company Name*'}</label>
                <input
                  type="text"
                  name={isJobApplication ? 'position' : 'company'}
                  placeholder={isJobApplication ? 'Position you\'re applying for' : 'Acme Inc.'}
                  required
                  value={isJobApplication ? formData.position : formData.company}
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

          {!isJobApplication && (
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Company Size*</label>
              <div style={styles.selectWrapper}>
                <select
                  name="employees"
                  required={!isJobApplication}
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
          )}

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>{isJobApplication ? 'Cover Letter / Additional Info*' : 'What are you looking for?*'}</label>
            <textarea
              name="requirements"
              placeholder={isJobApplication ? "Tell us about yourself and why you're interested in this position..." : "Tell us about your project and requirements..."}
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
          
          {isJobApplication && (
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Resume/CV (PDF, DOC, DOCX)*</label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                required={isJobApplication}
                onChange={handleFileChange}
                style={{...styles.formInput, padding: '0.5rem 1rem'}}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #38BDF8';
                  e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(203, 213, 225, 0.8)';
                  e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                }}
              />
              <div style={{
                fontSize: '0.8rem',
                color: '#718096',
                marginTop: '5px',
                fontStyle: 'italic'
              }}>
                File must be under 5MB. For larger files, please include a link to your resume in the message or on Google Drive, Dropbox, etc.
              </div>
            </div>
          )}

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
            {isSubmitting ? 'Sending...' : isJobApplication ? 'Submit Application' : 'Submit Request'}
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
    </>
  );

  // Modal mode
  if (isModalMode && isOpen && !embedded) {
    return (
      <AnimatePresence>
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
            {/* Close button - only in modal mode */}
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

            {formContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
  
  // Embedded mode (non-modal) or when embedded prop is true
  if (embedded || !isModalMode || (isModalMode === false && isOpen)) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: 'none',
        padding: '0',
        width: '100%',
        position: 'relative'
      }}>
        {formContent}
      </div>
    );
  }
  
  return null;
};

export default ContactForm;