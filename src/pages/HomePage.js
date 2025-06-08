import React from 'react';
import HeroNew from '../HeroNew';
import Services from '../Services';
import ProjectShowcase from '../ProjectShowcase';
import CompanyTimeline from '../components/CompanyTimeline';
import FAQ from '../components/FAQ';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  return (
    <div>
      <HeroNew />
      <Services />
      <ProjectShowcase />
      <WhyChooseUs />
      <TechStack />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default HomePage;