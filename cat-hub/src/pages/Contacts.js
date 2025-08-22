import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from "../components/Form";
import './Contacts.css';
import qrCode from "../images/QR-code2.webp";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,  FaPaw } from "react-icons/fa";
import {APIProvider, Map, Marker, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { ReactComponent as PawIcon } from '../images/pet-14-svgrepo-com.svg';

const Contacts = () => {
    
const { hash } = useLocation();
const center = { lat: 50.42318038260375, lng: 15.587433376821572 }; 

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
                    <div className="contact-details card" role="list">
                        <div role="listitem">
                            <strong>
                                <span className="icon" aria-hidden="true"><FaPhoneAlt /></span>
                                Phone: 
                            </strong>{' '}
                            <a href="tel:+420123456789" aria-label="Call Cat Hub">
                                +420 123 456 789 
                            </a>
                        </div>

                        <div role="listitem">
                            <strong>
                                <span className="icon" aria-hidden="true"><FaEnvelope /></span>
                                Email: 
                            </strong>{' '}
                            <a href="mailto:alenapumprova@seznam.cz" aria-label="Send email to Cat Hub">
                                alenapumprova@seznam.cz 
                            </a>
                        </div>

                        <div role="listitem">
                            <span className="icon"><FaMapMarkerAlt /></span>
                            <strong>Address:</strong>{' '}
                            <address>Cat Hub, 123 Cat Street, Cat City, CZ</address>
                            </div>
                    </div>
                    <div className="address-map card">                        
                        {/* <p>Find us on the map:</p> */}
                        <div className="map-viewport">
                            <APIProvider 
                            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                            libraries={['places','routes', 'marker']}
                            >
                                <Map
                                    mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
                                    defaultCenter={center} 
                                    defaultZoom={12} 
                                    gestureHandling="greedy" 
                                    className="map-box">
                                    <AdvancedMarker 
                                        position={center} 
                                        className="marker"
                                        anchor={{ x: 0.5, y: 1 }} >
                                            <Pin 
                                        className="pin"
                                        background="var(--icon-secondary)" 
                                        borderColor="var(--icon-secondary-dark)"
                                        glyphColor="#fff"
                                        scale={1.5}
                                        >
                                            <PawIcon 
                                                className="pin-glyph" 
                                                aria-hidden="true" 
                                                focusable="false" 
                                                style={{ width: "1.5rem", height: "1.5rem" }}/>
                                        </Pin>
                                    </AdvancedMarker>
                                </Map>
                            </APIProvider> 
                        </div> 
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