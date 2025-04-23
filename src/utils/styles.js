export const commonStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
    },
    section: {
      padding: '2rem 0',
    },
    sectionTitle: {
      fontSize: '3rem',
      marginBottom: '1rem',
      textAlign: 'center',
      color: '#1A365D',
      position: 'relative',
      fontWeight: 800,
    },
    sectionTitleLine: {
      content: '""',
      display: 'block',
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      margin: '0.8rem auto 2rem',
      borderRadius: '2px',
    },
    sectionHighlight: {
      color: '#4299E1',
      position: 'relative',
    },
    sectionIntro: {
      fontSize: '1.2rem',
      maxWidth: '700px',
      margin: '0 auto 4rem',
      textAlign: 'center',
      color: '#2D3748',
      lineHeight: 1.8,
    },
    ctaButton: {
      backgroundColor: '#1A365D',
      color: '#ffffff',
      padding: '1rem 2rem',
      borderRadius: '4px',
      fontSize: '1.1rem',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    },
    ctaButtonHover: {
      '&:hover': {
        backgroundColor: '#2B4E86',
        transform: 'translateY(-3px)',
        boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1)',
      },
    },
  };
  