import React, { useState, useEffect } from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme } from '../theme/unifiedTheme';

const CareersPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [activeTab, setActiveTab] = useState('openings');
  
  // Check for mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Career opportunity data
  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      type: "Project-based / Contract",
      location: "Remote (US/Canada)",
      department: "Engineering",
      description: "We're seeking experienced full-stack developers for client projects involving modern web applications, API development, and cloud-based solutions.",
      responsibilities: [
        "Develop and maintain full-stack web applications using React and Node.js",
        "Build RESTful APIs and integrate with third-party services",
        "Implement responsive designs and ensure cross-browser compatibility",
        "Collaborate with clients and team members on project requirements",
        "Write clean, maintainable code and conduct code reviews",
        "Deploy applications to cloud platforms and maintain CI/CD pipelines"
      ],
      requirements: [
        "4+ years of full-stack development experience",
        "Proficiency in JavaScript/TypeScript, React, and Node.js",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Knowledge of SQL and NoSQL databases",
        "Familiarity with Git and version control workflows",
        "Strong problem-solving and communication skills"
      ],
      preferred: [
        "Experience with GraphQL or modern API technologies",
        "Knowledge of Docker and containerization",
        "Background in agile development methodologies",
        "Previous consulting or client-facing experience"
      ]
    },
    {
      id: 2,
      title: "AI Implementation Specialist",
      type: "Project-based",
      location: "Remote",
      department: "AI Solutions",
      description: "Join our team to help businesses integrate AI technologies into their existing workflows and develop custom AI-powered solutions.",
      responsibilities: [
        "Implement AI solutions using existing models and APIs",
        "Integrate AI capabilities into web applications and business systems",
        "Develop proof-of-concepts and prototypes for client projects",
        "Work with clients to understand requirements and translate them into technical solutions",
        "Create documentation and provide training on AI implementations",
        "Stay current with AI tools and recommend appropriate solutions"
      ],
      requirements: [
        "2+ years of experience with AI/ML technologies",
        "Proficiency in Python and experience with AI APIs (OpenAI, Anthropic, etc.)",
        "Understanding of prompt engineering and AI integration patterns",
        "Experience with web development frameworks",
        "Strong analytical and problem-solving skills",
        "Ability to communicate technical concepts to business stakeholders"
      ],
      preferred: [
        "Experience with vector databases and RAG systems",
        "Knowledge of fine-tuning and model customization",
        "Background in business process automation",
        "Previous consulting experience"
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      type: "Project-based",
      location: "Remote",
      department: "Design",
      description: "We're looking for talented designers to create user-friendly interfaces and experiences for our client projects across web and mobile platforms.",
      responsibilities: [
        "Design intuitive user interfaces for web applications",
        "Create wireframes, mockups, and interactive prototypes",
        "Collaborate with developers to ensure design implementation",
        "Conduct user research and incorporate feedback into designs",
        "Maintain design consistency across projects",
        "Present design concepts to clients and stakeholders"
      ],
      requirements: [
        "3+ years of UI/UX design experience",
        "Portfolio showcasing web and mobile design work",
        "Proficiency in Figma or similar design tools",
        "Understanding of responsive design principles",
        "Basic knowledge of HTML/CSS",
        "Strong communication and presentation skills"
      ],
      preferred: [
        "Experience with design systems",
        "Knowledge of user research methodologies",
        "Background in SaaS or business application design",
        "Familiarity with accessibility standards"
      ]
    },
    {
      id: 4,
      title: "Cloud DevOps Engineer",
      type: "Project-based",
      location: "Remote",
      department: "Infrastructure",
      description: "Help our clients build reliable, scalable cloud infrastructure and streamline their deployment processes.",
      responsibilities: [
        "Set up and maintain CI/CD pipelines",
        "Deploy and manage cloud infrastructure on AWS, Azure, or GCP",
        "Configure monitoring and alerting systems",
        "Implement security best practices",
        "Troubleshoot deployment and infrastructure issues",
        "Document processes and provide knowledge transfer"
      ],
      requirements: [
        "2+ years of DevOps or cloud infrastructure experience",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Knowledge of containerization with Docker",
        "Familiarity with CI/CD tools (GitHub Actions, GitLab CI, etc.)",
        "Basic scripting skills (Bash, Python)",
        "Understanding of networking and security concepts"
      ],
      preferred: [
        "Experience with Infrastructure as Code (Terraform, CloudFormation)",
        "Knowledge of Kubernetes",
        "Background in monitoring tools (CloudWatch, Datadog, etc.)",
        "Previous consulting or client-facing experience"
      ]
    }
  ];
  
  // Company values and culture
  const companyValues = [
    {
      title: "Client-Focused Solutions",
      description: "Like water finding its level, we adapt our approach to solve real business problems with technology that flows naturally into existing systems."
    },
    {
      title: "Quality Craftsmanship",
      description: "We build solutions as enduring as lighthouses—well-designed, maintainable, and capable of weathering any storm."
    },
    {
      title: "Continuous Learning",
      description: "Like an ever-flowing stream, we stay current with technology trends and continuously expand our depth of knowledge."
    },
    {
      title: "Collaborative Partnership",
      description: "Teams flow together like converging streams, creating a powerful current that carries projects to successful completion."
    },
    {
      title: "Flexible Work Environment",
      description: "Our work style is fluid and adaptable, supporting remote collaboration that helps our team navigate their best path to success."
    }
  ];
  
  // Team benefits
  const benefits = [
    {
      icon: "💻",
      title: "Remote Work",
      description: "Work from anywhere with flexible hours that fit your schedule."
    },
    {
      icon: "🧠",
      title: "Skill Development",
      description: "Opportunities to learn new technologies and work on diverse projects."
    },
    {
      icon: "🤝",
      title: "Expert Team",
      description: "Collaborate with experienced professionals on challenging projects."
    },
    {
      icon: "💰",
      title: "Fair Compensation",
      description: "Competitive project-based rates and timely payments."
    },
    {
      icon: "🚀",
      title: "Meaningful Work",
      description: "Build solutions that make a real difference for businesses."
    },
    {
      icon: "🔄",
      title: "Ongoing Projects",
      description: "Potential for long-term collaborations with returning clients."
    }
  ];
  
  // FAQs about working with us
  const faqs = [
    {
      question: "Are you hiring full-time employees?",
      answer: "We primarily work with contractors on a project basis, though successful collaborations may lead to longer-term partnerships."
    },
    {
      question: "What's the application process?",
      answer: "We start with an initial conversation, followed by a technical discussion and a small practical assessment relevant to the role."
    },
    {
      question: "How often do new projects come up?",
      answer: "Project availability varies. We maintain a network of professionals and reach out when opportunities that match your skills arise."
    },
    {
      question: "Do you provide equipment?",
      answer: "Contractors typically use their own equipment. We'll provide access to any specific tools or systems required for client projects."
    },
    {
      question: "What types of projects do you work on?",
      answer: "We focus on web applications, AI integration, and business software solutions for clients across various industries."
    },
    {
      question: "How do payments work?",
      answer: "We establish clear payment terms upfront, typically with milestone-based payments or regular invoicing based on the project structure."
    }
  ];
  
  const styles = {
    section: {
      paddingTop: '80px',
      paddingBottom: '80px',
    },
    container: {
      ...commonStyles.container,
      maxWidth: '1200px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
      background: unifiedTheme.gradients.ocean,
      backgroundImage: `${unifiedTheme.gradients.ocean}, ${unifiedTheme.patterns.waterDrops}`,
      padding: '60px 20px',
      borderRadius: '16px',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
    },
    title: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '800',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      lineHeight: '1.7',
      maxWidth: '800px',
      margin: '0 auto',
      opacity: '0.9',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '40px',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
    },
    tab: {
      padding: '12px 24px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '600',
      color: '#4A5568',
      backgroundColor: '#F7FAFC',
      border: '1px solid #E2E8F0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: isMobile ? '5px' : '0',
    },
    activeTab: {
      backgroundColor: unifiedTheme.colors.primary[50],
      color: unifiedTheme.colors.primary[600],
      borderColor: unifiedTheme.colors.primary[200],
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
    },
    tabFirst: {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    tabLast: {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '30px',
      textAlign: 'center',
    },
    subSectionTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '20px',
      marginTop: '40px',
    },
    jobList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(500px, 1fr))',
      gap: '30px',
      margin: '30px 0',
    },
    jobCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      transition: 'all 0.3s ease',
    },
    jobCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    jobTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '10px',
    },
    jobMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px',
    },
    jobTag: {
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: '600',
    },
    jobType: {
      backgroundColor: unifiedTheme.colors.primary[50],
      color: unifiedTheme.colors.primary[600],
    },
    jobLocation: {
      backgroundColor: '#F0FFF4',
      color: '#38A169',
    },
    jobDepartment: {
      backgroundColor: '#FEFCBF',
      color: '#975A16',
    },
    jobDescription: {
      fontSize: '1.05rem',
      lineHeight: '1.7',
      color: '#4A5568',
      marginBottom: '25px',
    },
    listTitle: {
      fontSize: '1.15rem',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '15px',
      marginTop: '25px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      marginBottom: '25px',
    },
    listItem: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#4A5568',
      marginBottom: '10px',
      paddingLeft: '25px',
      position: 'relative',
    },
    bullet: {
      position: 'absolute',
      left: '0',
      top: '8px',
      width: '7px',
      height: '7px',
      backgroundColor: '#3182CE',
      borderRadius: '50%',
    },
    applyButton: {
      display: 'inline-block',
      marginTop: '15px',
      padding: '12px 25px',
      backgroundColor: '#3182CE',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '1rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
    },
    applyButtonHover: {
      backgroundColor: '#2C5282',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
      margin: '30px 0 50px',
    },
    valueCard: {
      backgroundColor: '#F7FAFC',
      borderRadius: '8px',
      padding: '25px',
      border: '1px solid #E2E8F0',
    },
    valueTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '15px',
    },
    valueDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#4A5568',
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px',
      margin: '30px 0 50px',
    },
    benefitCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    benefitIcon: {
      fontSize: '2rem',
      marginBottom: '15px',
    },
    benefitTitle: {
      fontSize: '1.15rem',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '10px',
    },
    benefitDescription: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: '#4A5568',
      flexGrow: 1,
    },
    faqContainer: {
      marginTop: '40px',
    },
    faqItem: {
      borderBottom: '1px solid #E2E8F0',
      padding: '20px 0',
    },
    faqQuestion: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '10px',
    },
    faqAnswer: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#4A5568',
    },
    contactSection: {
      textAlign: 'center',
      padding: '40px',
      background: unifiedTheme.gradients.pond,
      backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.current}`,
      borderRadius: '16px',
      marginTop: '60px',
      border: `1px solid ${unifiedTheme.colors.primary[200]}`,
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
    },
    contactTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#1A365D',
      marginBottom: '15px',
    },
    contactText: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: '#4A5568',
      marginBottom: '25px',
      maxWidth: '700px',
      margin: '0 auto 25px',
    },
    emailLink: {
      display: 'inline-block',
      padding: '12px 30px',
      backgroundColor: '#3182CE',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '1rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    emailLinkHover: {
      backgroundColor: '#2C5282',
      transform: 'translateY(-2px)',
    },
    emailText: {
      display: 'block',
      marginTop: '15px',
      color: '#4A5568',
      fontWeight: '500',
    }
  };
  
  // Set initial position
  useEffect(() => {
    if (openPositions.length > 0) {
      setSelectedPosition(openPositions[0]);
    }
  }, []);
  
  // Handle tab switching
  const renderTabContent = () => {
    switch(activeTab) {
      case 'openings':
        return (
          <div>
            <h2 style={styles.sectionTitle}>Navigate Your Next Opportunity</h2>
            <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px', fontSize: '1.1rem', lineHeight: '1.7', color: '#4A5568'}}>
              Like skilled navigators charting new waters, we seek talented professionals to join our crew. These opportunities represent the expertise we need to sail through client projects successfully.
            </p>
            
            <div style={styles.jobList}>
              {openPositions.map(job => (
                <div 
                  key={job.id} 
                  style={styles.jobCard}
                >
                  <h2 style={styles.jobTitle}>{job.title}</h2>
                  <div style={styles.jobMeta}>
                    <span style={{...styles.jobTag, ...styles.jobType}}>{job.type}</span>
                    <span style={{...styles.jobTag, ...styles.jobLocation}}>{job.location}</span>
                    <span style={{...styles.jobTag, ...styles.jobDepartment}}>{job.department}</span>
                  </div>
                  <p style={styles.jobDescription}>{job.description}</p>
                  
                  {job.responsibilities && (
                    <>
                      <h3 style={styles.listTitle}>What You'll Do</h3>
                      <ul style={styles.list}>
                        {job.responsibilities.map((item, index) => (
                          <li key={index} style={styles.listItem}>
                            <div style={styles.bullet}></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {job.requirements && (
                    <>
                      <h3 style={styles.listTitle}>What We're Looking For</h3>
                      <ul style={styles.list}>
                        {job.requirements.map((item, index) => (
                          <li key={index} style={styles.listItem}>
                            <div style={styles.bullet}></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {job.preferred && (
                    <>
                      <h3 style={styles.listTitle}>Nice to Have</h3>
                      <ul style={styles.list}>
                        {job.preferred.map((item, index) => (
                          <li key={index} style={styles.listItem}>
                            <div style={styles.bullet}></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <a
                    href={`mailto:leducsystems@gmail.com?subject=Interest in ${job.title} Opportunity`}
                    style={styles.applyButton}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.applyButtonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.applyButton.backgroundColor}
                  >
                    Express Interest
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      case 'culture':
        return (
          <div>
            <h2 style={styles.sectionTitle}>Our Values and Culture</h2>
            <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px', fontSize: '1.1rem', lineHeight: '1.7', color: '#4A5568'}}>
              At LeDuc Systems, our culture flows from deep wells of excellence, collaboration, and continuous improvement. These core values are the currents that guide how we navigate client relationships and team dynamics.
            </p>
            
            <div style={styles.valuesGrid}>
              {companyValues.map((value, index) => (
                <div key={index} style={styles.valueCard}>
                  <h3 style={styles.valueTitle}>{value.title}</h3>
                  <p style={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
            
            <h3 style={styles.subSectionTitle}>Benefits of Working With Us</h3>
            <div style={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <div key={index} style={styles.benefitCard}>
                  <div style={styles.benefitIcon}>{benefit.icon}</div>
                  <h4 style={styles.benefitTitle}>{benefit.title}</h4>
                  <p style={styles.benefitDescription}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'faq':
        return (
          <div>
            <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div style={styles.faqContainer}>
              {faqs.map((item, index) => (
                <div key={index} style={styles.faqItem}>
                  <h3 style={styles.faqQuestion}>{item.question}</h3>
                  <p style={styles.faqAnswer}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          {/* Animated wave overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: unifiedTheme.patterns.waves,
            opacity: 0.1,
            animation: 'drift 30s linear infinite',
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={styles.title}>Dive Into Our Talent Pool</h1>
            <p style={styles.subtitle}>
              Like tributaries feeding into a mighty river, talented professionals join our flow to create powerful currents of innovation.
              Whether you're ready to ride the next wave of opportunity or want to be part of our talent ecosystem for future projects, 
              we're looking for passionate individuals who can navigate the waters of modern technology.
            </p>
          </div>
        </div>
        
        <div style={styles.tabs}>
          <button 
            style={{
              ...styles.tab, 
              ...(activeTab === 'openings' ? styles.activeTab : {}),
              ...styles.tabFirst
            }}
            onClick={() => setActiveTab('openings')}
          >
            Opportunities
          </button>
          <button 
            style={{
              ...styles.tab, 
              ...(activeTab === 'culture' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('culture')}
          >
            Values & Benefits
          </button>
          <button 
            style={{
              ...styles.tab, 
              ...(activeTab === 'faq' ? styles.activeTab : {}),
              ...styles.tabLast
            }}
            onClick={() => setActiveTab('faq')}
          >
            FAQs
          </button>
        </div>
        
        {renderTabContent()}
        
        <div style={styles.contactSection}>
          <h2 style={styles.contactTitle}>Cast Your Line</h2>
          <p style={styles.contactText}>
            Even if the current doesn't seem to flow in your direction, we'd love to explore how your skills might create new ripples in our talent pool.
            Send us your resume and let's see how our professional streams might converge.
          </p>
          <a 
            href="mailto:leducsystems@gmail.com?subject=Professional Introduction - [Your Name]" 
            style={styles.emailLink}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.emailLinkHover.backgroundColor;
              e.currentTarget.style.transform = styles.emailLinkHover.transform;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.emailLink.backgroundColor;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get In Touch
          </a>
          <span style={styles.emailText}>leducsystems@gmail.com</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CareersPage;