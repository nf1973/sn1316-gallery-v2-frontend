import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <p className="small">
        Photos by Simone & Neil &copy; 2007-{new Date().getFullYear()}
      </p>
      <p className="smalldark">
        Photo Gallery built in{" "}
        <Link to="https://react.dev/" target="_blank" rel="noreferrer">
          React.js
        </Link>{" "}
        by Neil
      </p>
    </div>
  );
}

export default Footer;
