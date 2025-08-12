import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "../styles/Navbar.css";
import { AppRoutes } from "../constants/app-routes";

const DesktopNavbar = (): JSX.Element => {
  return (
    <nav className="navbar">
      <Link to={AppRoutes.SearchParks} className="logo-container">
        <img
          src={"/GameSetBookLogo.png"}
          alt="GameSetBook Logo"
          className="logo-icon"
        />
        <div className="logo-text">GameSetBook</div>
      </Link>
      <div className="nav-button-container">
        {/* <Link to={AppRoutes.SearchParks}>
          <div className="desktop-nav-button">Login</div>
        </Link> */}

        <Link to={AppRoutes.CreatePark}>
          <div className="desktop-nav-button">Create Park</div>
        </Link>
      </div>
    </nav>
  );
};

const MobileNavbar = (): JSX.Element => {
  const [menuDisplay, setMenuDisplay] = useState(false);

  const toggleMenu = () => {
    setMenuDisplay(!menuDisplay);
  };

  return (
    <div className="navbar">
      <Link to={AppRoutes.SearchParks} className="logo-container">
        <img
          src={"/GameSetBookLogo.png"}
          alt="GameSetBook Logo"
          className="logo-icon"
        />
        <div className="logo-text">GameSetBook</div>
      </Link>

      <div className="app-bar" onClick={toggleMenu}>
        <MenuIcon fontSize="large" />
      </div>

      {menuDisplay && (
        <div className="app-bar-menu" onClick={toggleMenu}>
          <div className="app-bar-header"></div>

          <CloseRoundedIcon className="close-feedback-icon" fontSize="large" />
          <Link to={AppRoutes.SearchParks}>
            <div className="app-bar-menu-item">Home</div>
          </Link>

          <Link to={AppRoutes.CreatePark}>
            <div className="app-bar-menu-item">Create Park</div>
          </Link>
          {/* 
          <Link to={AppRoutes.SearchParks}>
            <div className="app-bar-menu-item">Log Out</div>
          </Link> */}
        </div>
      )}

      {menuDisplay && <div className="blur-bg" onClick={toggleMenu} />}
    </div>
  );
};

export const Navbar = (): JSX.Element => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  if (matches) {
    return <DesktopNavbar />;
  }

  return <MobileNavbar />;
};
