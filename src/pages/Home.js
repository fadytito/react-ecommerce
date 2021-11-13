import React from "react";
import { Contact, Featuredproducts, Hero, Services } from "../components/home";

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
