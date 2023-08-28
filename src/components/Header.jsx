import React from "react";
import logo from "../images/camera.png";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className="header">
        <div className="headerLeft">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h1>
            <Link to="/">Photos by Simone & Neil</Link>
          </h1>
        </div>
        <div className="headerRight">
          <ul>
            <li>
              <Link to="/">Photo Galleries</Link>
            </li>
            <li>
              <Link
                to="https://www.youtube.com/@sn1316videos"
                target="_blank"
                rel="noreferrer"
              >
                Videos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
