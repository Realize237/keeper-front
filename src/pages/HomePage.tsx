import { Contact } from '../components/HomePage/Contact';
import { CTA } from '../components/HomePage/CTA';
import { FAQ } from '../components/HomePage/FAQ';
import { Features } from '../components/HomePage/Features';
import { Footer } from '../components/HomePage/Footer';
import Hero from '../components/HomePage/Hero';
import { HowItWorks } from '../components/HomePage/HowItWorks';
import { Testimonials } from '../components/HomePage/Testimonials';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </>
  );
};

export default HomePage;
