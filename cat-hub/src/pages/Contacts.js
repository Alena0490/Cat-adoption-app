import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from "../components/Form";
import './Contacts.css';
import qrCode from "../images/QR-code2.webp";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";

const Contacts = () => {
    
const { hash } = useLocation();

  useEffect(() => {
    // Po načtení či změně hashe sroluj na odpovídající <section id="...">
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [hash]);

    return (
        <div className="contacts page">
            <h1>Contact Us</h1>
            <section id="contact-info">
                <h2>Contacts</h2>
                <p className="section-lead">Get in&nbsp;touch with&nbsp;us for any questions about adoption, volunteering, or&nbsp;donations. We’d love to&nbsp;hear from you.</p>
                <article className="contact-wrapper">
                    <div className="contact-details card">
                        <p><strong className="one-contact">
                            <a className="icon" href="tel:+420123456789" aria-label="Call Cat Hub">
                                <FaPhoneAlt />
                            </a>
                            Phone: </strong> 
                            <a href="tel:+420123456789" aria-label="Call Cat Hub">
                                +420 123 456 789
                            </a>
                        </p>
                        <p>
                            <strong className="one-contact">
                            <a className="icon" href="mailto:alenapumprova@seznam.cz" aria-label="Send email to Cat Hub">
                                <FaEnvelope />
                            </a>Email: </strong> 
                            <a href="mailto:alenapumprova@seznam.cz" aria-label="Send email to Cat Hub">
                                alenapumprova@seznam.cz
                            </a>
                        </p>
                        <p>
                            <strong>Address:</strong>
                             Cat Hub, 123 Cat Street, Cat City, CZ</p>
                        </div>
                        <div className="address-map card">                        
                            {/* <p>Find us on the map:</p> */}
                            <iframe 
                                title="Cat Hub Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.123456789!2d14.123456789!3d50.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b123456789abc%3A0x123456789abcdefg!2sCat%20Hub%20CZ!5e0!3m2!1sen!2scz!4v1612345678901"
                                width="500" 
                                height="400" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            >
                            </iframe>  
                    </div>        
                </article>
            </section>

            <section id="donate">
                <h2>Donate</h2>
                <p className="section-lead">
                    Your donations help&nbsp;us provide food, medical care, and&nbsp;shelter for cats in&nbsp;need. Because every cat deserves a&nbsp;safe and&nbsp;loving home
                </p>
                
                <div className="donate-options">
                    <div className="payment-info">
                        <h3>Bank Transfer</h3>
                        <dl className="payment-list">
                            <div><dt>Account number:</dt><dd className="value">123456789/0100</dd></div>
                            <div><dt>Variable symbol:</dt><dd className="value">2025</dd></div>
                            <div><dt>Message:</dt><dd>Cat Hub</dd></div>
                        </dl>
                        <p className="info">or you can just scan the QR code with your phone</p>
                    </div>

                    <div className="qr-code">
                        <img src={qrCode} alt="QR code for donation" loading="lazy" decoding="async" />
                        <p className="qr-caption">Scan with your banking app</p>
                    </div>
                </div>
            </section>

            <section id="volunteer">
                <h2>Volunteer</h2>
                <p className="section-lead">
                    Join our team and help with cat care, events, or adoption days.                
                </p>
                <p>
                    Volunteering with Cat Hub is a hands-on way to make a direct impact. Whether you can spare a few hours a week or just help during events, your time matters and saves lives. We’ll provide guidance, basic training, and all the support you need — no prior experience required, only kindness and reliability.
                </p>
                <h3>What you can do:</h3>
                <ul className="volunteer-list">
                    <li><FaPaw className="icon" />Help with daily cat care (feeding, cleaning, socializing)</li>
                    <li><FaPaw className="icon" />Assist at adoption events and open days</li>
                    <li><FaPaw className="icon" />Foster cats in need of temporary homes</li>
                    <li><FaPaw className="icon" />Promote our mission on social media</li>
                    <li><FaPaw className="icon" />Organize or help with fundraising events</li>
                </ul>
                <p>
                    If you’re interested, please fill out the <a href="#contact-form" aria-label="scroll to contact form">form</a> below and we’ll get back to you with more details.
                </p>
            </section>

            <section id="contact-form">
                <Form />
            </section>
        </div>
    )
}

export default Contacts;