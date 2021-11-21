import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Komfort </span>
      </h5>
      <h5> All rights reserved</h5>
    </footer>
  );
};

export default Footer;
