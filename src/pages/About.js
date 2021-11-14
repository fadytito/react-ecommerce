import React from "react";
import aboutImg from "../assets/hero-bcg.jpeg";
import { Breadcrumb } from "../layout";

const About = () => {
  return (
    <React.Fragment>
      <Breadcrumb title="About" />
      <section className="about-page page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            quaerat, modi doloremque necessitatibus eum dolor nesciunt delectus,
            voluptate blanditiis, obcaecati beatae ab aut ipsa consequuntur
            tempora cumque. Ut quo enim vero odio minus nostrum eveniet,
            doloribus veritatis dolorem unde ipsum, voluptatibus totam.
            Explicabo, quas libero! Laborum incidunt minima consequatur ratione?
          </p>
        </article>
      </section>
    </React.Fragment>
  );
};

export default About;
