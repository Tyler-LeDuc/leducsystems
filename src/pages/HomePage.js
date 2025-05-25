import React from 'react';
import HeroNew from '../HeroNew';
import Services from '../Services';
import ProjectShowcase from '../ProjectShowcase';
import Testimonials from '../components/Testimonials';
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
      <Testimonials />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default HomePage;