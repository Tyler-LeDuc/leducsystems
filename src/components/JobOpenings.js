import React, { useState } from 'react';
import { commonStyles } from '../utils/styles';
import ContactForm from '../ContactForm';

const JobOpenings = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredOpening, setHoveredOpening] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  // Job opening data 
  const openPositions = [
    {
      id: 1,
      title: "Full Stack Developer",
      type: "Contract",
      location: "Remote",
      description: "Join our team to build modern web applications using React, Node.js, and cloud technologies for our clients."
    },
    {
      id: 2,
      title: "AI Implementation Specialist",
      type: "Project-based",
      location: "Remote",
      description: "Help businesses integrate AI solutions into their workflows and develop custom AI-powered applications."
    }
  ];
  
  const styles = {
    section: {
      paddingTop: '60px',
      paddingBottom: '80px',
      backgroundColor: '#F7FAFC',
    },
    container: {
      ...commonStyles.container,
      maxWidth: '1200px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: '800',
      color: '#1A365D',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1.2rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto',
    },
    openingsList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '20px',
      marginTop: '30px',
    },
    openingCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease',
    },
    openingCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    openingTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '5px',
    },
    openingMeta: {
      display: 'flex',
      gap: '15px',
      marginBottom: '15px',
    },
    openingType: {
      fontSize: '0.85rem',
      color: '#4299E1',
      fontWeight: '600',
    },
    openingLocation: {
      fontSize: '0.85rem',
      color: '#4A5568',
    },
    openingDescription: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: '#4A5568',
      marginBottom: '15px',
    },
    applyButton: {
      display: 'inline-block',
      padding: '8px 15px',
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
      borderRadius: '4px',
      fontWeight: '600',
      fontSize: '0.9rem',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer',
    },
    applyButtonHover: {
      backgroundColor: '#3182CE',
    },
    contactCTA: {
      textAlign: 'center',
      marginTop: '40px',
    },
    contactLink: {
      color: '#4299E1',
      fontWeight: '600',
      fontSize: '1.1rem',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    formContainer: {
      marginTop: '30px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    formTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '20px',
      textAlign: 'center',
    },
  };
  
  // Handle apply button click
  const handleApply = (position) => {
    setSelectedPosition(position);
    setShowApplicationForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Work With Us</h2>
          <p style={styles.subtitle}>
            We collaborate with talented professionals on client projects. 
            If you're passionate about building great software and solving business challenges, 
            we'd love to connect.
          </p>
        </div>
        
        {openPositions.length > 0 ? (
          <>
            <h3 style={{fontWeight: '700', color: '#2D3748', fontSize: '1.5rem', marginBottom: '15px'}}>Current Openings</h3>
            <div style={styles.openingsList}>
              {openPositions.map(position => (
                <div
                  key={position.id}
                  style={{
                    ...styles.openingCard,
                    ...(hoveredOpening === position.id ? styles.openingCardHover : {})
                  }}
                  onMouseEnter={() => setHoveredOpening(position.id)}
                  onMouseLeave={() => setHoveredOpening(null)}
                >
                  <h4 style={styles.openingTitle}>{position.title}</h4>
                  <div style={styles.openingMeta}>
                    <span style={styles.openingType}>{position.type}</span>
                    <span style={styles.openingLocation}>{position.location}</span>
                  </div>
                  <p style={styles.openingDescription}>{position.description}</p>
                  <button
                    style={{
                      ...styles.applyButton,
                      ...(hoveredOpening === position.id ? styles.applyButtonHover : {})
                    }}
                    onClick={() => handleApply(position.title)}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{textAlign: 'center', color: '#4A5568', fontSize: '1.1rem'}}>We don't have any active projects at the moment, but we're always interested in connecting with talented professionals.</p>
        )}
        
        <div style={styles.contactCTA}>
          <p>Don't see the right fit but interested in working with us?</p>
          <a 
            style={styles.contactLink}
            onClick={() => {
              setSelectedPosition("General Application");
              setShowApplicationForm(true);
              setTimeout(() => {
                document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Send us your resume
          </a>
        </div>
        
        {showApplicationForm && (
          <div id="application-form" style={styles.formContainer}>
            <h3 style={styles.formTitle}>Apply for: {selectedPosition}</h3>
            <ContactForm 
              embedded={true}
              isJobApplication={true}
              recipientEmail="leducsystems@gmail.com"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default JobOpenings;