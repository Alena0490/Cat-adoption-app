import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Form from "../components/Form";
import './Contacts.css';
import qrCode from "../images/QR-code2.webp";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { ReactComponent as PawIcon } from '../images/pet-14-svgrepo-com.svg';

const Contacts = () => {
  const { hash } = useLocation();
  const center = { lat: 50.42318038260375, lng: 15.587433376821572 }; 

  // stav mapy (light/dark) – sledujeme class na <html>
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light-theme")
  );

  useEffect(() => {
    // observer sleduje změny class na <html>
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light-theme"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
        <p className="section-lead">
          Get in&nbsp;touch with&nbsp;us for any questions about adoption, volunteering, or&nbsp;donations.
        </p>

        <article className="contact-wrapper">
          <div className="contact-details card" role="list">
            <div role="listitem">
              <strong><FaPhoneAlt className="icon" /> Phone: </strong>{' '}
              <a href="tel:+420123456789">+420 123 456 789</a>
            </div>
            <div role="listitem">
              <strong><FaEnvelope className="icon" /> Email: </strong>{' '}
              <a href="mailto:alenapumprova@seznam.cz">alenapumprova@seznam.cz</a>
            </div>
            <div role="listitem">
              <FaMapMarkerAlt className="icon" />
              <strong>Address:</strong>{' '}
              <address>Cat Hub, 123 Cat Street, Cat City, CZ</address>
            </div>
          </div>

          <div className="address-map card">
            <div className="map-viewport">
              <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <Map
                  key={isLight ? "light" : "dark"} // vynutí re-render při změně tématu
                  mapId={isLight 
                    ? "952b4b02b47e01bbfac7915e"  // 👉 sem dej ID pro světlý styl
                    : "952b4b02b47e01bbbd7fc9f3"   // 👉 sem dej ID pro tmavý styl
                  }
                  defaultCenter={center}
                  defaultZoom={12}
                  gestureHandling="greedy"
                  className="map-box"
                >
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
            </div>
          </div>
        </article>
      </section>

      {/* zbytek kódu (donate, volunteer, form) nechávám beze změny */}
    </div>
  );
};

export default Contacts;
