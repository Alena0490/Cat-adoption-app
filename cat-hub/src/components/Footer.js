import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {  
    return (
        <footer className="footer">
            <div className="socials">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaXTwitter /></a>
            </div>
            <p>Copyright Alena Pumprová 2025</p>
        </footer>
        )
    }

export default Footer;