import React from 'react';
import { commonStyles } from '../utils/styles';

const CompanyTimeline = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  // Company timeline events
  const timelineEvents = [
    {
      id: 1,
      year: "2024",
      title: "Company Founded",
      description: "Le Duc Systems was founded with a vision to provide honest, high-quality AI and software solutions to businesses. We believe in building real value through transparent partnerships and practical technology applications."
    },
    {
      id: 2,
      year: "Early 2024",
      title: "First Client Partnerships",
      description: "Began working with our first clients, focusing on understanding their unique challenges and delivering tailored solutions that actually solve real business problems."
    },
    {
      id: 3,
      year: "Current",
      title: "Building Our Foundation",
      description: "Currently establishing our core service offerings, refining our processes, and building lasting relationships with clients who value quality and transparency over hype."
    }
  ];

  // Strategic initiatives
  const futureMilestones = [
    {
      id: 1,
      target: "2025",
      title: "Expand Service Offerings",
      description: "Plan to broaden our AI integration and custom software capabilities based on real client feedback and market needs."
    },
    {
      id: 2,
      target: "2025-2026",
      title: "Team Growth",
      description: "Thoughtfully grow our team with skilled professionals who share our values of honesty, quality, and client success."
    },
    {
      id: 3,
      target: "Long-term Vision",
      title: "Trusted Technology Partner",
      description: "Become known as the go-to partner for businesses seeking honest advice and practical technology solutions that deliver real ROI."
    }
  ];

  const styles = {
    section: {
      padding: '80px 0',
      backgroundColor: '#F7FAFC',
      position: 'relative',
      overflow: 'hidden'
    },
    container: {
      ...commonStyles.container,
      position: 'relative',
      zIndex: 2
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px'
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '15px'
    },
    description: {
      fontSize: '1.1rem',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: 1.7
    },
    timelineContainer: {
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto'
    },
    timelineLine: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: isMobile ? '20px' : '50%',
      width: '4px',
      backgroundColor: '#4299E1',
      transform: isMobile ? 'none' : 'translateX(-2px)'
    },
    timelineEvent: {
      position: 'relative',
      marginBottom: '50px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between'
    },
    eventLeft: {
      width: isMobile ? '100%' : '45%',
      padding: isMobile ? '0 0 0 50px' : '0',
      textAlign: isMobile ? 'left' : 'right',
      position: 'relative'
    },
    eventRight: {
      width: isMobile ? '100%' : '45%',
      padding: isMobile ? '0 0 0 50px' : '0',
      textAlign: 'left',
      position: 'relative'
    },
    eventDot: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      backgroundColor: '#4299E1',
      borderRadius: '50%',
      border: '4px solid #EBF8FF',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.3)',
      left: isMobile ? '11px' : 'auto',
      right: isMobile ? 'auto' : '-10px',
      top: isMobile ? '0' : '10px',
      zIndex: 2
    },
    rightEventDot: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      backgroundColor: '#4299E1',
      borderRadius: '50%',
      border: '4px solid #EBF8FF',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.3)',
      left: isMobile ? '11px' : '-10px',
      top: isMobile ? '0' : '10px',
      zIndex: 2
    },
    eventYear: {
      display: 'inline-block',
      padding: '6px 12px',
      backgroundColor: '#EBF8FF',
      color: '#4299E1',
      fontSize: '0.95rem',
      fontWeight: 600,
      borderRadius: '4px',
      marginBottom: '10px'
    },
    eventTitle: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '10px'
    },
    eventDescription: {
      fontSize: '1rem',
      color: '#4A5568',
      lineHeight: 1.7
    },
    futureSection: {
      marginTop: '80px'
    },
    futureTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1A365D',
      textAlign: 'center',
      marginBottom: '40px'
    },
    milestonesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '30px'
    },
    milestoneCard: {
      backgroundColor: '#FFFFFF',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease'
    },
    milestoneTarget: {
      display: 'inline-block',
      padding: '6px 12px',
      backgroundColor: '#E6FFFA',
      color: '#319795',
      fontSize: '0.95rem',
      fontWeight: 600,
      borderRadius: '4px',
      marginBottom: '15px'
    },
    milestoneTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#1A365D',
      marginBottom: '10px'
    },
    milestoneDescription: {
      fontSize: '1rem',
      color: '#4A5568',
      lineHeight: 1.7
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Our Journey</h2>
          <p style={styles.description}>
            We're a new company with big ambitions. Here's our honest timeline - where we started, where we are now, and where we're going.
          </p>
        </div>

        <div style={styles.timelineContainer}>
          <div style={styles.timelineLine}></div>
          
          {timelineEvents.map((event, index) => (
            <div key={event.id} style={styles.timelineEvent}>
              {!isMobile && index % 2 === 0 ? (
                // Left side for even indices in desktop view
                <div style={styles.eventLeft}>
                  <div style={styles.eventDot}></div>
                  <div style={styles.eventYear}>{event.year}</div>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>
                </div>
              ) : !isMobile && index % 2 !== 0 ? (
                // Empty left side for odd indices in desktop view
                <div style={styles.eventLeft}></div>
              ) : null}
              
              {!isMobile && index % 2 !== 0 ? (
                // Right side for odd indices in desktop view
                <div style={styles.eventRight}>
                  <div style={styles.rightEventDot}></div>
                  <div style={styles.eventYear}>{event.year}</div>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>
                </div>
              ) : !isMobile && index % 2 === 0 ? (
                // Empty right side for even indices in desktop view
                <div style={styles.eventRight}></div>
              ) : (
                // Mobile view - all events on the right
                <div style={styles.eventRight}>
                  <div style={styles.rightEventDot}></div>
                  <div style={styles.eventYear}>{event.year}</div>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.futureSection}>
          <h2 style={styles.futureTitle}>Our Vision</h2>
          <div style={styles.milestonesGrid}>
            {futureMilestones.map(milestone => (
              <div 
                key={milestone.id} 
                style={styles.milestoneCard}
              >
                <div style={styles.milestoneTarget}>{milestone.target}</div>
                <h3 style={styles.milestoneTitle}>{milestone.title}</h3>
                <p style={styles.milestoneDescription}>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;