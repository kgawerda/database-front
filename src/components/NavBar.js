import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className="nav-link top-left" to="/more">
              Sides winrate
            </Link>
          </li>
          <li>
            <Link className="nav-link top-right" to="/search">
              Match stats
            </Link>
          </li>
          <li>
            <Link className="nav-link top-center" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link bottom-left" to="/champstat">
              Champion stats
            </Link>
          </li>
          <li>
            <Link className="nav-link bottom-right" to="/teamstat">
              Team stats
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
