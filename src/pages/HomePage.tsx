import { Contact } from '../components/homepage/Contact';
import { CTA } from '../components/homepage/CTA';
import { FAQ } from '../components/homepage/FAQ';
import { Features } from '../components/homepage/Features';
import { Footer } from '../components/homepage/Footer';
import Hero from '../components/homepage/Hero';
import { HowItWorks } from '../components/homepage/HowItWorks';
import { Testimonials } from '../components/homepage/Testimonials';

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
