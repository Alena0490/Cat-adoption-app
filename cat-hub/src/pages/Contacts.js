import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Form from "../components/Form";
import "./Contacts.css";
import qrCode from "../images/QR-code2.webp";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { ReactComponent as PawIcon } from "../images/pet-14-svgrepo-com.svg";

const LIGHT_MAP_ID = "952b4b02b47e01bbfac7915e";
const DARK_MAP_ID  = "952b4b02b47e01bbbd7fc9f3";

// Pomocná komponenta – přepíná mapId na již existující mapě
function MapThemeSync({ isLight }) {
  const map = useMap();                // instance google.maps.Map (až po mountu <Map>)
  useEffect(() => {
    if (!map) return;
    map.setOptions({ mapId: isLight ? LIGHT_MAP_ID : DARK_MAP_ID });
  }, [isLight, map]);
  return null;
}

const Contacts = () => {
  const { hash } = useLocation();
  const center = { lat: 50.42318038260375, lng: 15.587433376821572 };

  // light/dark mapa podle class na <html>
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light-theme")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light-theme"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // scroll na hash / top
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [hash]);

  // klíč – podporujeme oba názvy (lokálně i v GH Actions)
  const mapsKey =
    process.env.REACT_APP_MAPS_API_KEY ||
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div className="contacts page">
      <h1>Contact Us</h1>

      <section id="contact-info">
        <h2>Contacts</h2>
        <p className="section-lead">
          Get in&nbsp;touch with&nbsp;us for any questions about adoption,
          volunteering, or&nbsp;donations.
        </p>

        <article className="contact-wrapper">
          <div className="contact-details card" role="list">
            <div role="listitem">
              <strong><FaPhoneAlt className="icon" /> Phone:</strong>{" "}
              <a href="tel:+420123456789">+420 123 456 789</a>
            </div>
            <div role="listitem">
              <strong><FaEnvelope className="icon" /> Email:</strong>{" "}
              <a href="mailto:alenapumprova@seznam.cz">alenapumprova@seznam.cz</a>
            </div>
            <div role="listitem">
              <FaMapMarkerAlt className="icon" />
              <strong>Address:</strong>{" "}
              <address>Cat Hub, 123 Cat Street, Cat City, CZ</address>
            </div>
          </div>

          <div className="address-map card">
            <div className="map-viewport">
              {mapsKey ? (
                <APIProvider apiKey={mapsKey}>
                  <Map
                    // žádné `key` → už se to nebude rozbíjet
                    mapId={isLight ? LIGHT_MAP_ID : DARK_MAP_ID} // počáteční styl
                    defaultCenter={center}
                    defaultZoom={12}
                    gestureHandling="greedy"
                    className="map-box"
                  >
                    {/* živé přepínání stylu bez remountu */}
                    <MapThemeSync isLight={isLight} />

                    <AdvancedMarker position={center} anchor={{ x: 0.5, y: 1 }}>
                      <Pin
                        background="var(--icon-secondary)"
                        borderColor="var(--icon-secondary-dark)"
                        glyphColor="#fff"
                        scale={1.3}
                      >
                        <PawIcon style={{ width: "1.3rem", height: "1.3rem" }} />
                      </Pin>
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              ) : (
                <p className="map-fallback">Mapa dočasně nedostupná.</p>
              )}
            </div>
          </div>
        </article>
      </section>

      <section id="donate">
        <h2>Donate</h2>
        <p className="section-lead">
          Your donations help&nbsp;us provide food, medical care, and&nbsp;shelter
          for cats in&nbsp;need. Because every cat deserves a&nbsp;safe and&nbsp;loving home
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
          Volunteering with Cat Hub is a hands-on way to make a direct impact…
        </p>
        <h3>What you can do:</h3>
        <ul className="volunteer-list">
          <li><FaPaw className="icon" />Help with daily cat care…</li>
          <li><FaPaw className="icon" />Assist at adoption events…</li>
          <li><FaPaw className="icon" />Foster cats…</li>
          <li><FaPaw className="icon" />Promote our mission…</li>
          <li><FaPaw className="icon" />Fundraising events…</li>
        </ul>
        <p>
          If you’re interested, please fill out the{" "}
          <a href="#contact-form" aria-label="scroll to contact form">form</a>.
        </p>
      </section>

      <section id="contact-form">
        <Form />
      </section>
    </div>
  );
};

export default Contacts;
