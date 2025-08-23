import './Footer.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <nav className="socials" aria-label="Social media">
        {/* TODO: nahraď # skutečnými URL profilů */}
        <a href="https://www.facebook.com/alena.pumprova/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF aria-hidden="true" focusable="false" />
        </a>
        <a href="https://www.instagram.com/alena.pumprova/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram aria-hidden="true" focusable="false" />
        </a>
        <a href="https://www.linkedin.com/in/alena-pumprova/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn aria-hidden="true" focusable="false" />
        </a>
      </nav>

      <p>© {year} Alena Pumprová</p>
    </footer>
  );
};

export default Footer;
