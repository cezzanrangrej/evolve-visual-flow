
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ThreeScene from '@/components/ThreeScene';
import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <ThreeScene />
      </div>
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
