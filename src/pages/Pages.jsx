import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "../components/Home";
import Gallery from "../components/Gallery";

function Pages() {
  const location = useLocation();
  return (
    <div className="content">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default Pages;
