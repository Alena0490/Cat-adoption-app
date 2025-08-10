import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {  
    return (
        <footer className="footer">
            <div className="socials">
                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF aria-hidden="true" focusable="false"/>
                </a>
                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaInstagram aria-hidden="true" focusable="false"/>
                </a>
                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter aria-hidden="true" focusable="false"/>
                </a>
            </div>
            <p>Copyright Alena Pumprová 2025</p>
        </footer>
        )
    }

export default Footer;