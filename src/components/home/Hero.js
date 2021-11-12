import React from "react";
import { Link } from "react-router-dom";
import heroBcg2 from "../../assets/hero-bcg-2.jpeg";
import heroBcg from "../../assets/hero-bcg.jpeg";

const Hero = () => {
  return (
    <section className="hero section-center">
      <article className="content">
        <h1>
          design your <br />
          comfort zone
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </p>
        <Link to="/products" className="btn hero-btn">
          shop now
        </Link>
      </article>
      <article className="img-container">
        <img src={heroBcg} alt="nice table" className="main-img" />
        <img src={heroBcg2} alt="person working" className="accent-img" />
      </article>
    </section>
  );
};

export default Hero;
