import React, { useState } from 'react';
import { commonStyles } from '../../utils/styles';
import { unifiedTheme } from '../../theme/unifiedTheme';

const TeamPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredMember, setHoveredMember] = useState(null);
  
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Leadership Team",
      role: "Executive Leadership",
      bio: "Our leadership team brings decades of software development experience with expertise in AI integration, web development, and cloud architecture. They work to help businesses leverage cutting-edge technology without enterprise-level complexity or cost.",
      image: "/duck-logo.png",
      skills: ["Full-stack Development", "AI Integration", "Cloud Architecture", "System Design"],
      socialLinks: {
        linkedin: "https://linkedin.com/"
      }
    },
    {
      id: 2,
      name: "Development Team",
      role: "Senior Developers",
      bio: "Our development team has extensive experience with both front-end and back-end technologies. Their specialties include React, Node.js, and database architecture. They're passionate about creating clean, efficient code and building seamless user experiences.",
      image: "/duck-logo.png",
      skills: ["React/React Native", "Node.js", "Database Design", "UI/UX Implementation"],
      socialLinks: {
        linkedin: "https://linkedin.com/"
      }
    },
    {
      id: 3,
      name: "AI Team",
      role: "AI Implementation Specialists",
      bio: "Our AI team specializes in implementing practical AI solutions for real-world business problems. With experience in machine learning models and natural language processing, they excel at translating complex AI concepts into tangible business benefits for clients.",
      image: "/duck-logo.png",
      skills: ["Machine Learning", "NLP Implementation", "AI Integration", "Python"],
      socialLinks: {
        linkedin: "https://linkedin.com/"
      }
    },
    {
      id: 4,
      name: "Design Team",
      role: "UX/UI Designers",
      bio: "Our design team brings creativity and user-centered design principles to every project. They work closely with clients to understand their brand and users, creating intuitive interfaces and engaging visual experiences that drive user satisfaction and business results.",
      image: "/duck-logo.png",
      skills: ["User Experience Design", "Interface Design", "Wireframing", "Prototyping"],
      socialLinks: {
        linkedin: "https://linkedin.com/"
      }
    }
  ];
  
  // Values that represent company culture
  const companyValues = [
    {
      id: 1,
      title: "Client Success Focus",
      description: "Like a lighthouse guiding ships to safe harbor, we measure our success by helping clients navigate to their business goals. Every decision flows toward their success.",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Innovation with Purpose",
      description: "We ride the waves of technological advancement with clear direction. Innovation isn't just about making ripples—it's about creating currents that move businesses forward.",
      icon: "💡"
    },
    {
      id: 3,
      title: "Transparency & Integrity",
      description: "Clear as crystal waters, our communication flows honestly and openly. We'd rather swim against the tide than make promises we can't keep.",
      icon: "🤝"
    },
    {
      id: 4,
      title: "Continuous Learning",
      description: "Like a river that never stops flowing, we're committed to continuous growth. In the ever-changing currents of technology, we dive deep to expand our knowledge.",
      icon: "📚"
    }
  ];

  // Join the team data  
  const openPositions = [
    {
      id: 1,
      title: "Full Stack Developer",
      type: "Full-time",
      location: "Remote (US)",
      description: "We're looking for a full stack developer experienced with React, Node.js, and cloud technologies to join our growing team."
    },
    {
      id: 2,
      title: "AI Engineer (Part-time)",
      type: "Contract",
      location: "Remote",
      description: "Seeking an AI implementation specialist to work on specific client projects that require expertise in machine learning and system integration."
    }
  ];
  
  const styles = {
    section: {
      paddingTop: '120px',
      paddingBottom: '80px',
      background: unifiedTheme.gradients.pond,
      backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.waterDrops}`,
      position: 'relative',
    },
    container: {
      ...commonStyles.container,
      maxWidth: '1200px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: unifiedTheme.colors.primary[800],
      marginBottom: '15px',
      textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
    },
    subtitle: {
      fontSize: '1.2rem',
      lineHeight: '1.7',
      color: '#4A5568',
      maxWidth: '700px',
      margin: '0 auto',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '30px',
      marginBottom: '80px',
    },
    teamCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(59, 130, 246, 0.08)',
      transition: 'all 0.3s ease',
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
      background: `linear-gradient(to bottom, #FFFFFF, ${unifiedTheme.colors.primary[50]})`,
    },
    teamCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 40px rgba(59, 130, 246, 0.15)',
      borderColor: unifiedTheme.colors.primary[300],
    },
    memberImage: {
      width: '100%',
      height: '320px',
      objectFit: 'cover',
    },
    memberContent: {
      padding: '25px',
    },
    memberName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '5px',
    },
    memberRole: {
      fontSize: '1rem',
      color: '#4299E1',
      fontWeight: '600',
      marginBottom: '15px',
    },
    memberBio: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: '#4A5568',
      marginBottom: '15px',
    },
    skillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '15px',
    },
    skill: {
      fontSize: '0.8rem',
      padding: '4px 8px',
      background: unifiedTheme.gradients.pond,
      color: unifiedTheme.colors.primary[700],
      borderRadius: '6px',
      border: `1px solid ${unifiedTheme.colors.primary[200]}`,
    },
    socialLinks: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px',
    },
    socialLink: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#EBF8FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4299E1',
      transition: 'all 0.2s ease',
    },
    socialLinkHover: {
      backgroundColor: '#4299E1',
      color: '#FFFFFF',
    },
    valuesSection: {
      marginTop: '80px',
      marginBottom: '80px',
    },
    valuesTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '40px',
      textAlign: 'center',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '30px',
    },
    valueCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '30px 25px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease',
    },
    valueCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      borderColor: '#4299E1',
    },
    valueIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px',
    },
    valueTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '10px',
    },
    valueDescription: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: '#4A5568',
    },
    joinSection: {
      background: unifiedTheme.gradients.blueLight,
      backgroundImage: `${unifiedTheme.gradients.blueLight}, ${unifiedTheme.patterns.foam}`,
      borderRadius: '16px',
      padding: isMobile ? '30px 20px' : '50px',
      marginTop: '50px',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
      border: `1px solid ${unifiedTheme.colors.primary[100]}`,
    },
    joinTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '20px',
    },
    joinDescription: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: '#4A5568',
      marginBottom: '30px',
      maxWidth: '800px',
    },
    openingsList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '20px',
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
    }
  };
  
  // Handling hover states
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredOpening, setHoveredOpening] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Meet Our Crew</h1>
          <p style={styles.subtitle}>
            Like skilled navigators charting digital waters, our team of technology experts guides businesses 
            through the currents of innovation, helping them harness the power of modern software and AI.
          </p>
        </div>
        
        {/* Team Members Grid */}
        <div style={styles.teamGrid}>
          {teamMembers.map(member => (
            <div
              key={member.id}
              style={{
                ...styles.teamCard,
                ...(hoveredMember === member.id ? styles.teamCardHover : {})
              }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <img src={member.image} alt={member.name} style={styles.memberImage} />
              <div style={styles.memberContent}>
                <h2 style={styles.memberName}>{member.name}</h2>
                <div style={styles.memberRole}>{member.role}</div>
                <p style={styles.memberBio}>{member.bio}</p>
                
                <div style={styles.skillsList}>
                  {member.skills.map((skill, index) => (
                    <span key={index} style={styles.skill}>{skill}</span>
                  ))}
                </div>
                
                <div style={styles.socialLinks}>
                  {Object.entries(member.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...styles.socialLink,
                        ...(hoveredSocial === `${member.id}-${platform}` ? styles.socialLinkHover : {})
                      }}
                      onMouseEnter={() => setHoveredSocial(`${member.id}-${platform}`)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {platform === 'linkedin' && 'in'}
                      {platform === 'github' && 'GH'}
                      {platform === 'twitter' && 'X'}
                      {platform === 'dribbble' && 'Dr'}
                      {platform === 'behance' && 'Be'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Company Values Section */}
        <div style={styles.valuesSection}>
          <h2 style={styles.valuesTitle}>Our Values</h2>
          <div style={styles.valuesGrid}>
            {companyValues.map(value => (
              <div
                key={value.id}
                style={{
                  ...styles.valueCard,
                  ...(hoveredValue === value.id ? styles.valueCardHover : {})
                }}
                onMouseEnter={() => setHoveredValue(value.id)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div style={styles.valueIcon}>{value.icon}</div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Join Our Team Section */}
        <div style={styles.joinSection}>
          <h2 style={styles.joinTitle}>Join Our Voyage</h2>
          <p style={styles.joinDescription}>
            We're charting new waters and seeking talented navigators to join our crew. 
            If you're ready to dive into technology challenges and thrive in collaborative waters, 
            we'd love to welcome you aboard.
          </p>
          
          {openPositions.length > 0 ? (
            <>
              <h3 style={{...styles.valueTitle, marginBottom: '20px'}}>Current Openings</h3>
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
                      onClick={() => window.location.href = '/contact'}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>We don't have any open positions at the moment, but we're always interested in connecting with talented professionals.</p>
          )}
          
          <div style={styles.contactCTA}>
            <p>Don't see the right fit but interested in working with us?</p>
            <a href="/contact" style={styles.contactLink}>Send us your resume</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;