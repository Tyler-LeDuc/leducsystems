import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { unifiedTheme } from './theme/unifiedTheme';

// Helper functions for formatting
const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const formatCompanyName = (value) => {
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Validation helpers
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const cleaned = phone.replace(/[^\d]/g, '');
  return cleaned.length >= 10;
};

// Contact Form Component that can be imported and used anywhere
const ContactForm = ({ 
  isOpen, 
  onClose, 
  recipientEmail, 
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
    position: isJobApplication ? 'General Application' : '',
    timeline: '',
    budget: '',
    projectType: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fileAttachment, setFileAttachment] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update body overflow when form is opened/closed (only in modal mode)
  useEffect(() => {
    if (!embedded) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, embedded]);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData && !formSubmitted) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
  }, [formSubmitted]);
  
  // Save form data on change
  useEffect(() => {
    if (!formSubmitted && Object.values(formData).some(val => val !== '' && val.length > 0)) {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
    }
  }, [formData, formSubmitted]);
  
  // Validation on field blur
  const validateField = useCallback((name, value) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'email':
        if (!validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      
      case 'phone':
        if (value && !validatePhone(value)) {
          errors.phone = 'Phone number should be at least 10 digits';
        } else {
          delete errors.phone;
        }
        break;
      
      case 'name':
        if (!value || value.trim().length < 2) {
          errors.name = 'Name should be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      
      case 'company':
        if (!isJobApplication && (!value || value.trim().length < 2)) {
          errors.company = 'Company name is required';
        } else {
          delete errors.company;
        }
        break;
      
      default:
        break;
    }
    
    setValidationErrors(errors);
  }, [validationErrors, isJobApplication]);
  
  // Handle field blur
  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    validateField(name, value);
  };
  
  // Handle form input changes with formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Apply formatting based on field
    switch (name) {
      case 'phone':
        formattedValue = formatPhoneNumber(value);
        break;
      case 'company':
        if (value.length > 0 && !touchedFields[name]) {
          formattedValue = formatCompanyName(value);
        }
        break;
      default:
        break;
    }
    
    setFormData({ ...formData, [name]: formattedValue });
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
            Email: ${formData.email}
            
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
      
      // Clear saved data
      localStorage.removeItem('contactFormData');
      
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
          position: isJobApplication ? 'General Application' : '',
          timeline: '',
          budget: '',
          projectType: ''
        });
        setFileAttachment(null);
        setTouchedFields({});
        setValidationErrors({});
        setCurrentStep(1);
      }, 3000);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced form styling with two-column layout
  const styles = {
    contactFormOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: isMobile ? 'flex-start' : 'center',
      padding: isMobile ? '0' : '1rem',
      overflowY: isMobile ? 'auto' : 'hidden',
    },
    formWrapper: {
      width: '100%',
      maxWidth: embedded ? '100%' : '1200px',
      height: embedded ? 'auto' : (isMobile ? '100%' : '85vh'),
      maxHeight: embedded ? 'none' : (isMobile ? '100%' : '800px'),
      backgroundColor: '#FFFFFF',
      borderRadius: embedded ? '16px' : '20px',
      boxShadow: embedded ? unifiedTheme.shadows.xl : '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: isMobile ? 'visible' : 'hidden',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
    },
    leftColumn: {
      flex: isMobile ? '0 0 auto' : '0 0 45%',
      background: unifiedTheme.gradients.ocean,
      padding: isMobile ? '1.5rem' : '4rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: isMobile ? '120px' : 'auto',
      maxHeight: isMobile ? '150px' : 'none',
    },
    rightColumn: {
      flex: 1,
      padding: isMobile ? '1.5rem 1rem' : '3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: isMobile ? 'flex-start' : 'center',
      overflowY: isMobile ? 'visible' : 'auto',
      background: '#FFFFFF',
    },
    waterPattern: {
      position: 'absolute',
      inset: 0,
      background: unifiedTheme.patterns.waves,
      opacity: 0.1,
      animation: 'drift 20s linear infinite',
    },
    floatingDuck: {
      position: 'absolute',
      top: '10%',
      right: '-5%',
      width: '150px',
      height: '150px',
      opacity: 0.1,
      animation: 'float 6s ease-in-out infinite',
      display: isMobile ? 'none' : 'block',
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      color: '#FFFFFF',
    },
    heroTitle: {
      fontSize: isMobile ? '1.25rem' : '2.5rem',
      fontWeight: unifiedTheme.typography.fontWeights.extrabold,
      lineHeight: unifiedTheme.typography.lineHeights.tight,
      marginBottom: isMobile ? '0' : '1.5rem',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heroSubtitle: {
      fontSize: isMobile ? '0.9rem' : '1.25rem',
      lineHeight: unifiedTheme.typography.lineHeights.normal,
      marginBottom: isMobile ? '1rem' : '2rem',
      opacity: 0.95,
    },
    trustBadges: {
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '2rem',
    },
    trustBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: unifiedTheme.borderRadius.lg,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: `all ${unifiedTheme.animation.duration.normal}`,
    },
    trustIcon: {
      fontSize: '2rem',
      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
    },
    trustText: {
      flex: 1,
    },
    trustTitle: {
      fontSize: '1rem',
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      marginBottom: '0.25rem',
    },
    trustDescription: {
      fontSize: '0.875rem',
      opacity: 0.9,
    },
    formTitle: {
      fontSize: isMobile ? '1.5rem' : '1.875rem',
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: unifiedTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    formSubtitle: {
      fontSize: '1rem',
      color: unifiedTheme.colors.neutral[600],
      marginBottom: '2rem',
      lineHeight: unifiedTheme.typography.lineHeights.relaxed,
    },
    formGroup: {
      marginBottom: isMobile ? '0.875rem' : '1.25rem',
      position: 'relative',
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: unifiedTheme.typography.fontWeights.medium,
      color: unifiedTheme.colors.neutral[700],
      transition: `all ${unifiedTheme.animation.duration.fast}`,
    },
    formInput: {
      display: 'block',
      width: '100%',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      borderRadius: unifiedTheme.borderRadius.md,
      border: `2px solid ${unifiedTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      transition: `all ${unifiedTheme.animation.duration.normal}`,
      outline: 'none',
      color: unifiedTheme.colors.neutral[900],
      boxSizing: 'border-box',
    },
    formInputFocus: {
      borderColor: unifiedTheme.colors.primary[500],
      boxShadow: `0 0 0 4px ${unifiedTheme.colors.primary[100]}`,
    },
    formInputError: {
      borderColor: '#EF4444',
      background: '#FEF2F2',
    },
    formInputSuccess: {
      borderColor: unifiedTheme.colors.secondary[500],
      background: '#F0FDF4',
    },
    formTextarea: {
      height: '120px',
      resize: 'vertical',
      minHeight: '120px',
      maxHeight: '250px',
    },
    selectWrapper: {
      position: 'relative',
    },
    selectIcon: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: unifiedTheme.colors.neutral[500],
      pointerEvents: 'none',
      fontSize: '0.875rem',
    },
    formSelect: {
      appearance: 'none',
      paddingRight: '2.5rem',
      cursor: 'pointer',
    },
    formSubmitButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      width: '100%',
      padding: '1rem 2rem',
      background: unifiedTheme.gradients.blue,
      color: '#FFFFFF',
      borderRadius: unifiedTheme.borderRadius.md,
      fontWeight: unifiedTheme.typography.fontWeights.semibold,
      fontSize: '1.125rem',
      border: 'none',
      cursor: 'pointer',
      transition: `all ${unifiedTheme.animation.duration.normal}`,
      boxShadow: unifiedTheme.shadows.glowHover,
      position: 'relative',
      overflow: 'hidden',
    },
    formClose: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: `all ${unifiedTheme.animation.duration.normal}`,
      zIndex: 10,
      boxShadow: unifiedTheme.shadows.md,
    },
    formPattern: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100%',
      height: '100%',
      background: unifiedTheme.patterns.waterDrops,
      opacity: 0.03,
      zIndex: 1,
      pointerEvents: 'none',
    },
    formContent: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
    },
    formScrollArea: {
      overflowY: isMobile ? 'visible' : 'auto',
      overflowX: 'hidden',
      paddingRight: isMobile ? '0' : '0.5rem',
      marginRight: isMobile ? '0' : '-0.5rem',
      scrollbarWidth: 'thin',
      scrollbarColor: `${unifiedTheme.colors.neutral[300]} transparent`,
      maxHeight: isMobile ? 'none' : '70vh',
    },
    formSuccessMessage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: unifiedTheme.gradients.light,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: formSubmitted ? 1 : 0,
      visibility: formSubmitted ? 'visible' : 'hidden',
      transition: `all ${unifiedTheme.animation.duration.normal}`,
      zIndex: 5,
      borderRadius: embedded ? '16px' : '20px',
    },
    formSuccessIcon: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: unifiedTheme.gradients.blue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      boxShadow: unifiedTheme.shadows.xl,
      position: 'relative',
    },
    formSuccessIconCheck: {
      width: '35px',
      height: '50px',
      borderBottom: '6px solid white',
      borderRight: '6px solid white',
      transform: 'rotate(45deg)',
      marginLeft: '-5px',
      marginTop: '-10px',
    },
    formSuccessTitle: {
      fontSize: '2rem',
      fontWeight: unifiedTheme.typography.fontWeights.bold,
      color: unifiedTheme.colors.neutral[900],
      marginBottom: '1rem',
      textAlign: 'center',
    },
    formSuccessText: {
      fontSize: '1.125rem',
      color: unifiedTheme.colors.neutral[600],
      textAlign: 'center',
      maxWidth: '85%',
      lineHeight: unifiedTheme.typography.lineHeights.relaxed,
      marginBottom: '0.5rem',
    },
    formRow: {
      display: 'flex',
      gap: '1rem',
      width: '100%',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
    },
    formCol50: {
      flex: isMobile ? '0 0 100%' : '0 0 calc(50% - 0.5rem)',
      maxWidth: isMobile ? '100%' : 'calc(50% - 0.5rem)',
      width: isMobile ? '100%' : 'calc(50% - 0.5rem)',
    },
    errorMessage: {
      color: '#EF4444',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
      textAlign: 'center',
      padding: '0.5rem',
      background: '#FEF2F2',
      borderRadius: unifiedTheme.borderRadius.sm,
    },
    validationError: {
      fontSize: '0.8rem',
      color: '#EF4444',
      marginTop: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    formProgress: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      justifyContent: 'center',
    },
    progressDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: unifiedTheme.colors.neutral[300],
      transition: `all ${unifiedTheme.animation.duration.normal}`,
    },
    progressDotActive: {
      width: '24px',
      background: unifiedTheme.colors.primary[500],
      borderRadius: '4px',
    },
  };

  // Employee options for dropdown
  const employeeOptions = [
    'Select company size',
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  // Trust badges data
  const trustBadges = [
    {
      icon: '🚀',
      title: '50+ AI Solutions',
      description: 'Deployed & optimized'
    },
    {
      icon: '⏱️',
      title: '24hr Response',
      description: 'Guaranteed reply time'
    },
    {
      icon: '🛡️',
      title: 'SOC2 Compliant',
      description: 'Enterprise-grade security'
    }
  ];

  // If modal mode and form is not open, don't render anything
  if (!isOpen && !embedded) return null;

  // Determine if we're in modal mode or embedded mode
  const isModalMode = !embedded && styles.contactFormOverlay !== undefined;

  // Main form content (used in both modal and embedded modes)
  const formContent = (
    <>
      {/* Left Column - Hero Content */}
      <div style={styles.leftColumn}>
        <div style={styles.waterPattern} />
        
        {/* Floating duck silhouette */}
        <svg style={styles.floatingDuck} viewBox="0 0 200 200">
          <path 
            d="M100 50 C70 50, 50 70, 50 100 C50 130, 70 150, 100 150 C130 150, 150 130, 150 100 C150 90, 145 80, 138 72 L145 65 L140 70 C132 62, 118 55, 100 55 L100 50"
            fill="white"
            opacity="0.2"
          />
        </svg>
        
        <div style={styles.heroContent}>
          <motion.h2 
            style={styles.heroTitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Let's Navigate Your Digital Transformation Together
          </motion.h2>
          
          {!isMobile && (
            <motion.p 
              style={styles.heroSubtitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join the flock of successful companies who've streamlined their operations with our AI-powered solutions. 
              We'll help you paddle through complexity to smoother waters.
            </motion.p>
          )}
          
          <motion.div 
            style={styles.trustBadges}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {trustBadges.map((badge, index) => (
              <motion.div 
                key={badge.title}
                style={styles.trustBadge}
                whileHover={{ 
                  x: 10,
                  background: 'rgba(255, 255, 255, 0.15)',
                }}
                transition={{ duration: 0.2 }}
              >
                <span style={styles.trustIcon}>{badge.icon}</span>
                <div style={styles.trustText}>
                  <div style={styles.trustTitle}>{badge.title}</div>
                  <div style={styles.trustDescription}>{badge.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div style={styles.rightColumn}>
        <div style={styles.formPattern}></div>
        
        <div style={styles.formContent}>
          
          <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={styles.formScrollArea}>
              {/* Form fields */}
              <div style={styles.formRow}>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      style={{
                        ...styles.formInput,
                        ...(validationErrors.name && touchedFields.name ? styles.formInputError : {}),
                        ...(touchedFields.name && formData.name && !validationErrors.name ? styles.formInputSuccess : {})
                      }}
                      onFocus={(e) => {
                        Object.assign(e.target.style, styles.formInputFocus);
                      }}
                      onBlur={(e) => {
                        handleFieldBlur(e);
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {validationErrors.name && touchedFields.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={styles.validationError}
                      >
                        {validationErrors.name}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>{isJobApplication ? 'Position *' : 'Company Name *'}</label>
                    <input
                      type="text"
                      name={isJobApplication ? 'position' : 'company'}
                      placeholder={isJobApplication ? 'Senior Developer' : 'Acme Inc.'}
                      required
                      value={isJobApplication ? formData.position : formData.company}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      style={{
                        ...styles.formInput,
                        ...(validationErrors.company && touchedFields.company ? styles.formInputError : {}),
                        ...(touchedFields.company && formData.company && !validationErrors.company ? styles.formInputSuccess : {})
                      }}
                      onFocus={(e) => {
                        Object.assign(e.target.style, styles.formInputFocus);
                      }}
                      onBlur={(e) => {
                        handleFieldBlur(e);
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      style={{
                        ...styles.formInput,
                        ...(validationErrors.email && touchedFields.email ? styles.formInputError : {}),
                        ...(touchedFields.email && validateEmail(formData.email) ? styles.formInputSuccess : {})
                      }}
                      onFocus={(e) => {
                        Object.assign(e.target.style, styles.formInputFocus);
                      }}
                      onBlur={(e) => {
                        handleFieldBlur(e);
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {validationErrors.email && touchedFields.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={styles.validationError}
                      >
                        {validationErrors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div style={styles.formCol50}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      style={{
                        ...styles.formInput,
                        ...(validationErrors.phone && touchedFields.phone ? styles.formInputError : {}),
                        ...(touchedFields.phone && validatePhone(formData.phone) ? styles.formInputSuccess : {})
                      }}
                      onFocus={(e) => {
                        Object.assign(e.target.style, styles.formInputFocus);
                      }}
                      onBlur={(e) => {
                        handleFieldBlur(e);
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {!isJobApplication && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Company Size</label>
                    <div style={styles.selectWrapper}>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        style={{
                          ...styles.formInput, 
                          ...styles.formSelect,
                          ...(formData.employees ? styles.formInputSuccess : {})
                        }}
                        onFocus={(e) => {
                          Object.assign(e.target.style, styles.formInputFocus);
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = 'none';
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
                </>
              )}

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{isJobApplication ? 'Cover Letter / Additional Info *' : 'Project Details *'}</label>
                <textarea
                  name="requirements"
                  placeholder={isJobApplication ? "Tell us about yourself and why you're interested in this position..." : "Describe your project goals, timeline, and any specific requirements..."}
                  required
                  value={formData.requirements}
                  onChange={handleInputChange}
                  style={{
                    ...styles.formInput, 
                    ...styles.formTextarea,
                    ...(formData.requirements.length > 50 ? styles.formInputSuccess : {})
                  }}
                  onFocus={(e) => {
                    Object.assign(e.target.style, styles.formInputFocus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                ></textarea>
              </div>
              
              {isJobApplication && (
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Resume/CV (PDF, DOC, DOCX) *</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required={isJobApplication}
                    onChange={handleFileChange}
                    style={{...styles.formInput, padding: '0.5rem 1rem'}}
                    onFocus={(e) => {
                      Object.assign(e.target.style, styles.formInputFocus);
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div style={{
                    fontSize: '0.8rem',
                    color: unifiedTheme.colors.neutral[500],
                    marginTop: '5px',
                    fontStyle: 'italic'
                  }}>
                    File must be under 5MB. For larger files, please include a link in your message.
                  </div>
                </div>
              )}

              {error && <div style={styles.errorMessage}>{error}</div>}
            </div>

            <div style={{ flexShrink: 0, marginTop: isMobile ? '0.75rem' : '1.5rem' }}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                style={styles.formSubmitButton}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = unifiedTheme.gradients.blueLight;
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = unifiedTheme.gradients.blue;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid #FFFFFF',
                        borderTopColor: 'transparent',
                        borderRadius: '50%'
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    {isJobApplication ? 'Submit Application' : 'Launch Your Project'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Success message */}
        <AnimatePresence>
          {formSubmitted && (
            <motion.div 
              style={styles.formSuccessMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                style={styles.formSuccessIcon}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1
                }}
              >
                <motion.div 
                  style={styles.formSuccessIconCheck}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                />
              </motion.div>
              <motion.h3 
                style={styles.formSuccessTitle}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Message Sent Successfully!
              </motion.h3>
              <motion.p 
                style={styles.formSuccessText}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Thank you for choosing Le Duc Systems. Our team will navigate your request and respond within 24 hours.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '1rem' : '2rem',
                  marginTop: '2rem',
                  padding: isMobile ? '1rem' : '1.5rem',
                  background: unifiedTheme.gradients.blueLight,
                  borderRadius: unifiedTheme.borderRadius.lg,
                  border: `1px solid ${unifiedTheme.colors.primary[200]}`,
                  maxWidth: '90%',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <div style={{ 
                  fontSize: '2.5rem',
                  lineHeight: 1,
                }}>🦆</div>
                <div>
                  <p style={{
                    fontSize: '1.1rem',
                    fontWeight: unifiedTheme.typography.fontWeights.semibold,
                    color: unifiedTheme.colors.neutral[900],
                    marginBottom: '0.25rem'
                  }}>
                    Swimming Your Way: Within 24 Hours
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    color: unifiedTheme.colors.neutral[600],
                    margin: 0
                  }}>
                    {isJobApplication 
                      ? "We'll carefully review your application and get back to you soon!"
                      : "We'll paddle through your requirements and chart the best course forward."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  // Add animation styles
  const animationStyles = `
    @keyframes drift {
      0% { transform: translateX(0) translateY(0); }
      50% { transform: translateX(-20px) translateY(10px); }
      100% { transform: translateX(0) translateY(0); }
    }
    
    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
  `;

  // Modal mode
  if (isModalMode && isOpen && !embedded) {
    return (
      <>
        <style>{animationStyles}</style>
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
                  e.currentTarget.style.backgroundColor = unifiedTheme.colors.neutral[100];
                  e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}
              >
                <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '100%',
                    height: '2px',
                    backgroundColor: unifiedTheme.colors.neutral[600],
                    transform: 'translateY(-50%) rotate(45deg)',
                    borderRadius: '1px',
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '100%',
                    height: '2px',
                    backgroundColor: unifiedTheme.colors.neutral[600],
                    transform: 'translateY(-50%) rotate(-45deg)',
                    borderRadius: '1px',
                  }}></div>
                </div>
              </div>

              {formContent}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </>
    );
  }
  
  // Embedded mode (non-modal) or when embedded prop is true
  if (embedded || !isModalMode || (isModalMode === false && isOpen)) {
    return (
      <>
        <style>{animationStyles}</style>
        <div style={{
          ...styles.formWrapper,
          boxShadow: unifiedTheme.shadows.xl,
          height: 'auto',
          maxHeight: 'none',
        }}>
          {formContent}
        </div>
      </>
    );
  }
  
  return null;
};

export default ContactForm;