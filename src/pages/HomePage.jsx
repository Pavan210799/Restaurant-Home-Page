import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Categories from '../components/Categories';
import HowWeWork from '../components/HowWeWork';
import FastFoodMenus from '../components/FastFoodMenus';
import Services from '../components/Services';
import Packages from '../components/Packages';
import Cocktail from '../components/Cocktail';
import WeeklySpecial from '../components/WeeklySpecial';
import Instagram from '../components/Instagram';
import Footer from '../components/Footer';
import RevealOnScroll from '../components/RevealOnScroll';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <RevealOnScroll delay={0}>
        <About />
      </RevealOnScroll>
      <RevealOnScroll delay={80}>
        <Categories />
      </RevealOnScroll>
      <RevealOnScroll delay={0}>
        <HowWeWork />
      </RevealOnScroll>
      <RevealOnScroll delay={60}>
        <FastFoodMenus />
      </RevealOnScroll>
      <RevealOnScroll delay={120}>
        <Services />
      </RevealOnScroll>
      <RevealOnScroll delay={0}>
        <Packages />
      </RevealOnScroll>
      <RevealOnScroll delay={80}>
        <Cocktail />
      </RevealOnScroll>
      <RevealOnScroll delay={40}>
        <WeeklySpecial />
      </RevealOnScroll>
      <RevealOnScroll delay={0}>
        <Instagram />
      </RevealOnScroll>
      <RevealOnScroll delay={0}>
        <Footer />
      </RevealOnScroll>
    </div>
  );
}

export default HomePage;
