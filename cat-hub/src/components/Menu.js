import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import SettingsSidebar from "./SettingsSidebar";
import './Menu.css';
import { FaAnglesRight, FaShieldCat, FaGear } from "react-icons/fa6";
import {FaCat, FaPaw, FaEnvelope } from "react-icons/fa"


const Menu = ({ onOpenSettings }) => {
  const handleSettingsClick = () => {
    if (onOpenSettings) onOpenSettings();
  };

  return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <li className="navbar-li logo">
                    <Link to="/" className="nav-link">
                        <FaAnglesRight className="icon-img" />
                        <span className="link-text">Kitty Web</span>
                    </Link>
                </li>

                <li className="navbar-li">
                    <NavLink to="/" aria-label="Home" end className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
                        <FaCat className="icon-img" />
                        <span className="link-text">Home</span>
                    </NavLink>
                </li>

                <li className="navbar-li">
                     <NavLink to="/cats" aria-label="Cats" className="nav-link">
                        <FaPaw className="icon-img" />
                        <span className="link-text">Cats</span>
                    </NavLink>
                </li>

                <li className="navbar-li">
                    <NavLink to="/about" aria-label="About" className="nav-link">
                        <FaShieldCat className="icon-img" />
                        <span className="link-text">About</span>
                    </NavLink>
                </li>

                 <li className="navbar-li">
                    <NavLink to="/contacts" aria-label="Contacts" className="nav-link">
                        <FaEnvelope className="icon-img" />
                        <span className="link-text">Contacts</span>
                    </NavLink>
                </li>

                <li className="navbar-li">
                    <button type="button" className="nav-link settings-button" onClick={handleSettingsClick}>
                        <FaGear className="icon-img"/>
                        <span className="link-text">Settings</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;
        