import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import ExploreCarousel from '../components/ExploreCarousel';
import ResearchTrust from '../components/ResearchTrust';
import TargetAudience from '../components/TargetAudience';
import SDGImpact from '../components/SDGImpact';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <ExploreCarousel />
            <ResearchTrust />
            <TargetAudience />
            <SDGImpact />
            <FinalCTA />
            <Footer />
        </>
    );
};

export default Home;
