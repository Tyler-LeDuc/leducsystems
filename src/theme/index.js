// src/theme/index.js
const theme = {
    colors: {
      // Primary color palette - unified blue gradient
      primary: '#1E40AF',        // Primary blue
      primaryLight: '#3B82F6',   // Light blue
      primaryDark: '#1E3A8A',    // Dark blue
      
      // Secondary colors
      secondary: '#0EA5E9',      // Cyan blue accent
      secondaryLight: '#38BDF8', // Light cyan
      
      // Backgrounds
      background: '#FFFFFF',
      backgroundAlt: '#F8FAFC',  // Slight blue tint
      backgroundDark: '#0F172A', // Dark background
      
      // Text
      text: '#1E293B',           // Slate text
      textLight: '#475569',      // Lighter slate
      textMuted: '#64748B',      // Muted slate
      white: '#FFFFFF',
      
      // Grays with blue undertones
      gray: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E0',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
      },
      
      // Accent colors for variety
      accent: {
        blue: '#2563EB',
        cyan: '#06B6D4',
        emerald: '#10B981',
        orange: '#F59E0B',
        red: '#EF4444',
        purple: '#8B5CF6',
        pink: '#EC4899',
      }
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    fontWeights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    spacing: {
      0: '0',
      1: '0.25rem',   // 4px
      2: '0.5rem',    // 8px
      3: '0.75rem',   // 12px
      4: '1rem',      // 16px
      5: '1.25rem',   // 20px
      6: '1.5rem',    // 24px
      8: '2rem',      // 32px
      10: '2.5rem',   // 40px
      12: '3rem',     // 48px
      16: '4rem',     // 64px
      20: '5rem',     // 80px
      24: '6rem',     // 96px
      32: '8rem',     // 128px
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      glow: '0 0 20px rgba(59, 130, 246, 0.3)',
      glowLg: '0 0 40px rgba(59, 130, 246, 0.4)',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',   // 2px
      base: '0.25rem',  // 4px
      md: '0.375rem',   // 6px
      lg: '0.5rem',     // 8px
      xl: '0.75rem',    // 12px
      '2xl': '1rem',    // 16px
      '3xl': '1.5rem',  // 24px
      full: '9999px',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    transitions: {
      fast: '0.15s ease-out',
      base: '0.3s ease-out',
      slow: '0.5s ease-out',
      bounce: '0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    container: {
      maxWidth: '1200px',
      padding: '0 1.5rem',
      paddingMobile: '0 1rem',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
      secondary: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
      hero: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      accent: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
      warm: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      cool: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
    },
    // Section styling patterns
    sections: {
      padding: {
        mobile: '4rem 0',   // 64px
        desktop: '5rem 0',  // 80px
        large: '6rem 0',    // 96px
      },
      spacing: {
        tight: '3rem 0',    // 48px
        normal: '4rem 0',   // 64px
        relaxed: '6rem 0',  // 96px
      }
    }
  };
  
  export default theme;