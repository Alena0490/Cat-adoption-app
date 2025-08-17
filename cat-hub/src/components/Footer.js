import './Footer.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <nav className="socials" aria-label="Social media">
        {/* TODO: nahraď # skutečnými URL profilů */}
        <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF aria-hidden="true" focusable="false" />
        </a>
        <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram aria-hidden="true" focusable="false" />
        </a>
        <a href="#" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
          <FaXTwitter aria-hidden="true" focusable="false" />
        </a>
      </nav>

      <p>© {year} Alena Pumprová</p>
    </footer>
  );
};

export default Footer;
