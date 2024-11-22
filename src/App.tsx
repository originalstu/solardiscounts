import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Calculator />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}