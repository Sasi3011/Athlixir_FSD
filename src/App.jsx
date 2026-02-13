import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import ExploreCarousel from './components/ExploreCarousel';
import ResearchTrust from './components/ResearchTrust';
import TargetAudience from './components/TargetAudience';
import SDGImpact from './components/SDGImpact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <ExploreCarousel />
      <ResearchTrust />
      <TargetAudience />
      <SDGImpact />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
