import React from 'react';
import { commonStyles } from '../utils/styles';
import { unifiedTheme } from '../theme/unifiedTheme';
import About from '../About';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div style={{ paddingTop: '160px' }}></div> {/* Adjusted for phone bar + header height */}
      
      {/* Page Intro with Water Theme */}
      <div style={{ 
        padding: '20px 0 60px 0', 
        background: unifiedTheme.gradients.pond,
        backgroundImage: `${unifiedTheme.gradients.pond}, ${unifiedTheme.patterns.waterDrops}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle wave animation overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: unifiedTheme.patterns.waves,
          opacity: 0.3,
          animation: 'flow 20s linear infinite',
        }} />
        
        <div style={{
          ...commonStyles.container,
          textAlign: 'center',
          maxWidth: '800px',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: unifiedTheme.colors.primary[800], 
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(59, 130, 246, 0.1)'
          }}>
            Leading the Flock in Digital Innovation
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.7', 
            color: unifiedTheme.colors.primary[700],
            marginBottom: '20px' 
          }}>
            Based in Chandler, Arizona, Le Duc Systems guides businesses through their digital transformation 
            with precision and expertise. Like ducks gliding effortlessly across water while paddling purposefully beneath, 
            we handle the complex technical work so your business appears to run smoothly and efficiently.
          </p>
        </div>
      </div>
      
      {/* Main About Section */}
      <About />
      
      <style jsx>{`
        @keyframes flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;