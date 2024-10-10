import AboutHero from "@/components/about/AboutHero";
import AboutTitle from "@/components/about/AboutTitle";
import Breadcrumb from "@/components/about/Breadcrumb";
import OurTeam from "@/components/about/OurTeam";
import WhyUs from "@/components/about/WhyUs";
import Container from "@/components/container/Container";
import React from "react";

const About = () => {
  return (
    <Container>
      <Breadcrumb />
      <AboutTitle />
      <AboutHero />
      <WhyUs />
      <OurTeam />
    </Container>
  );
};

export default About;
