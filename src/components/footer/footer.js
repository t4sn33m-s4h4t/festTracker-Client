import "./footer.css";
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-social-icons">
            
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          
        </div>
        <p className="text-center ">
          Copyright &copy; {new Date().getFullYear()} Check Fest BD
        </p>
        <p className="text-center">
          Designed by <a href="https://github.com/tasneemsahat">Tasneem Sahat</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
