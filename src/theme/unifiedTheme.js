// Unified Theme for Homepage Components
export const unifiedTheme = {
  // Color Palette
  colors: {
    primary: {
      50: '#EBF8FF',
      100: '#DBEAFE', 
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A'
    },
    secondary: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D'
    },
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A'
    },
    accent: {
      purple: '#8B5CF6',
      pink: '#EC4899',
      cyan: '#06B6D4',
      orange: '#F59E0B'
    }
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
    primaryReverse: 'linear-gradient(135deg, #334155 0%, #1E293B 50%, #0F172A 100%)',
    light: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    blue: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    blueLight: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)',
    section: 'linear-gradient(135deg, #F8FAFC 0%, #EBF8FF 25%, #F8FAFC 75%, #F0FDF4 100%)',
    // Water-inspired gradients
    ocean: 'linear-gradient(180deg, #1E40AF 0%, #2563EB 25%, #3B82F6 50%, #60A5FA 100%)',
    wave: 'linear-gradient(135deg, #DBEAFE 0%, #93C5FD 25%, #60A5FA 50%, #3B82F6 100%)',
    ripple: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
    pond: 'linear-gradient(180deg, #EBF8FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
    stream: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 25%, #3B82F6 50%, #60A5FA 75%, #3B82F6 100%)',
    mist: 'linear-gradient(135deg, rgba(219, 234, 254, 0.5) 0%, rgba(147, 197, 253, 0.3) 100%)',
    deepWater: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)'
  },

  // Typography
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem'
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8
    }
  },

  // Spacing
  spacing: {
    section: {
      mobile: '60px 0',
      desktop: '100px 0'
    },
    container: {
      maxWidth: '1200px',
      padding: {
        mobile: '0 20px',
        desktop: '0 40px'
      }
    },
    component: {
      small: '20px',
      medium: '40px',
      large: '60px',
      xlarge: '80px'
    }
  },

  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    base: '0 4px 6px rgba(0, 0, 0, 0.07)',
    md: '0 6px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    glowHover: '0 0 30px rgba(59, 130, 246, 0.4)'
  },

  // Border Radius
  borderRadius: {
    sm: '6px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '50%'
  },

  // Animation & Transitions
  animation: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
      slower: '0.8s'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },

  // Component Patterns
  patterns: {
    backgroundDots: 'radial-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
    backgroundGrid: 'linear-gradient(45deg, rgba(59, 130, 246, 0.03) 25%, transparent 25%), linear-gradient(-45deg, rgba(59, 130, 246, 0.03) 25%, transparent 25%)',
    backgroundLines: 'linear-gradient(to bottom, transparent 49%, rgba(59, 130, 246, 0.05) 50%, transparent 51%)',
    // Water-inspired patterns
    waterDrops: 'radial-gradient(circle at 20% 40%, rgba(96, 165, 250, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 45% 85%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)',
    waves: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.03) 10px, rgba(59, 130, 246, 0.03) 20px)',
    rippleEffect: 'radial-gradient(ellipse at center top, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
    current: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
    foam: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 30%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)',
    underwater: 'linear-gradient(180deg, rgba(30, 58, 138, 0.05) 0%, rgba(30, 64, 175, 0.08) 50%, rgba(37, 99, 235, 0.1) 100%)'
  }
};

// Helper functions for responsive design
export const getResponsiveValue = (mobile, desktop, isMobile) => {
  return isMobile ? mobile : desktop;
};

export const getSectionStyles = (isMobile, variant = 'default') => {
  const baseStyles = {
    padding: getResponsiveValue(unifiedTheme.spacing.section.mobile, unifiedTheme.spacing.section.desktop, isMobile),
    position: 'relative',
    overflow: 'hidden'
  };

  const variants = {
    default: {
      ...baseStyles,
      background: unifiedTheme.colors.neutral[50]
    },
    primary: {
      ...baseStyles,
      background: unifiedTheme.gradients.primary,
      color: unifiedTheme.colors.neutral[50]
    },
    light: {
      ...baseStyles,
      background: unifiedTheme.gradients.section
    },
    white: {
      ...baseStyles,
      background: '#FFFFFF'
    }
  };

  return variants[variant] || variants.default;
};

export const getContainerStyles = (isMobile) => ({
  maxWidth: unifiedTheme.spacing.container.maxWidth,
  margin: '0 auto',
  padding: getResponsiveValue(
    unifiedTheme.spacing.container.padding.mobile, 
    unifiedTheme.spacing.container.padding.desktop, 
    isMobile
  ),
  position: 'relative',
  zIndex: 2
});

export const getHeaderStyles = (isMobile, textAlign = 'center') => ({
  textAlign,
  marginBottom: getResponsiveValue('50px', '70px', isMobile),
  color: 'inherit'
});

export const getTitleStyles = (isMobile, size = 'large') => {
  const sizes = {
    small: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['2xl'], unifiedTheme.typography.fontSizes['3xl'], isMobile),
    },
    medium: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['3xl'], unifiedTheme.typography.fontSizes['4xl'], isMobile),
    },
    large: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['4xl'], unifiedTheme.typography.fontSizes['5xl'], isMobile),
    },
    xlarge: {
      fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes['5xl'], unifiedTheme.typography.fontSizes['6xl'], isMobile),
    }
  };

  return {
    ...sizes[size],
    fontWeight: unifiedTheme.typography.fontWeights.extrabold,
    lineHeight: unifiedTheme.typography.lineHeights.tight,
    marginBottom: '20px',
    color: 'inherit'
  };
};

export const getSubtitleStyles = () => ({
  fontSize: unifiedTheme.typography.fontSizes.base,
  fontWeight: unifiedTheme.typography.fontWeights.semibold,
  color: unifiedTheme.colors.primary[600],
  marginBottom: '12px',
  textTransform: 'uppercase',
  letterSpacing: '1px'
});

export const getDescriptionStyles = (isMobile) => ({
  fontSize: getResponsiveValue(unifiedTheme.typography.fontSizes.lg, unifiedTheme.typography.fontSizes.xl, isMobile),
  lineHeight: unifiedTheme.typography.lineHeights.relaxed,
  maxWidth: '700px',
  margin: '0 auto',
  opacity: 0.9
});

export const getCardStyles = (variant = 'default') => {
  const baseStyles = {
    backgroundColor: '#FFFFFF',
    borderRadius: unifiedTheme.borderRadius.xl,
    padding: '32px',
    boxShadow: unifiedTheme.shadows.lg,
    border: `1px solid ${unifiedTheme.colors.neutral[200]}`,
    transition: `all ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`
  };

  const variants = {
    default: baseStyles,
    hover: {
      ...baseStyles,
      transform: 'translateY(-8px)',
      boxShadow: unifiedTheme.shadows.xl,
      borderColor: unifiedTheme.colors.primary[300]
    },
    glass: {
      ...baseStyles,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: `1px solid ${unifiedTheme.colors.neutral[200]}`
    }
  };

  return variants[variant] || variants.default;
};

export const getButtonStyles = (variant = 'primary', size = 'medium') => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: unifiedTheme.typography.fontWeights.semibold,
    borderRadius: unifiedTheme.borderRadius.md,
    transition: `all ${unifiedTheme.animation.duration.normal} ${unifiedTheme.animation.easing.default}`,
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none'
  };

  const sizes = {
    small: {
      padding: '8px 16px',
      fontSize: unifiedTheme.typography.fontSizes.sm
    },
    medium: {
      padding: '12px 24px',
      fontSize: unifiedTheme.typography.fontSizes.base
    },
    large: {
      padding: '16px 32px',
      fontSize: unifiedTheme.typography.fontSizes.lg
    }
  };

  const variants = {
    primary: {
      background: unifiedTheme.gradients.blue,
      color: '#FFFFFF',
      boxShadow: unifiedTheme.shadows.glow
    },
    secondary: {
      background: 'transparent',
      color: unifiedTheme.colors.primary[600],
      border: `2px solid ${unifiedTheme.colors.primary[300]}`
    },
    ghost: {
      background: 'transparent',
      color: unifiedTheme.colors.primary[600],
      border: 'none'
    }
  };

  return {
    ...baseStyles,
    ...sizes[size],
    ...variants[variant]
  };
};

export default unifiedTheme;