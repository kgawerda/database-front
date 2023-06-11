import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import More from "./pages/More";
import Search from "./pages/Search";
import Champions from "./pages/Champions";
import Teams from "./pages/Teams";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<More />} />
        <Route path="/search" element={<Search />} />
        <Route path="/champstat" element={<Champions />} />
        <Route path="/teamstat" element={<Teams />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
