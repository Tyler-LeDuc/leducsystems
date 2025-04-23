// src/theme/index.js
const theme = {
    colors: {
      primary: '#1A365D',      // Dark blue
      secondary: '#4299E1',    // Blue accent
      background: '#FFFFFF',
      backgroundAlt: '#F7FAFC',
      text: '#2D3748',
      textLight: '#4A5568',
      white: '#FFFFFF',
      gray: {
        100: '#F7FAFC',
        200: '#EDF2F7',
        300: '#E2E8F0',
        400: '#CBD5E0',
        500: '#A0AEC0',
      }
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    space: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      '4xl': '4rem',
      '5xl': '6rem',
    },
    shadows: {
      sm: '0 2px 4px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.05)',
      xl: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.05)',
    },
    radii: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    transitions: {
      fast: '0.2s ease',
      normal: '0.3s ease',
      slow: '0.5s ease',
    },
    container: {
      maxWidth: '1200px',
      padding: '0 2rem',
    },
    gradients: {
      primary: 'linear-gradient(90deg, #4299E1 0%, #1A365D 100%)',
      secondary: 'linear-gradient(135deg, #4299E1 0%, #1A365D 100%)',
    }
  };
  
  export default theme;