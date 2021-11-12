import React from "react";
import Contact from "../components/home/Contact";
import Featuredproducts from "../components/home/FeaturedProducts";
import Services from "../components/home/Services";
import Hero from "./../components/home/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featuredproducts />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
