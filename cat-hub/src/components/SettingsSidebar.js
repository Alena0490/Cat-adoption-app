import './SettingsSidebar.css';
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import SettingsContent from "./SettingsContent";

const SettingsSidebar = ({ onClose }) => {
  const panelRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    // fallback kdyby se nespustil animationend
    closeTimer.current = window.setTimeout(() => {
      onClose?.();
    }, 350); // drž to v sync s CSS délkou animace
  };

  // ESC => zavřít
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") requestClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  // po mountu zaostři panel + úklid timeoutu
  useEffect(() => {
    panelRef.current?.focus();
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  const handleAnimEnd = (e) => {
    // zavolej onClose po dokončení slide-out na panelu
    if (closing && e.target === panelRef.current) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      onClose?.();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <aside
        className={`settings-sidebar${closing ? ' is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        ref={panelRef}
        tabIndex={-1}
        onAnimationEnd={handleAnimEnd}
      >
        <button
          className="settings-close"
          type="button"
          onClick={requestClose}
          aria-label="Close settings"
        >
          <IoClose />
        </button>

        <h2 id="settings-title">Settings</h2>
        <SettingsContent />
      </aside>
    </div>
  );
};

export default SettingsSidebar;
