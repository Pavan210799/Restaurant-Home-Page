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
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <About />
      <Categories />
      <HowWeWork />
      <FastFoodMenus />
      <Services />
      <Packages />
      <Cocktail />
      <WeeklySpecial />
      <Instagram />
      <Footer />
    </div>
  );
}

export default HomePage;
