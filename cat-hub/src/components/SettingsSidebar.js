import './SettingsSidebar.css';
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";
import SettingsContent from "./SettingsContent"; 

const SettingsSidebar = ({ onClose }) => {
  const panelRef = useRef(null);

  // Esc zavře
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} aria-hidden="true">
      <aside
        className="settings-sidebar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()} // klik uvnitř nezavře
        ref={panelRef}
        tabIndex={-1}
      >
        <button className="settings-close" onClick={onClose} aria-label="Close settings">
          <IoClose />
        </button>
        <h2 id="settings-title">Settings</h2>
        <SettingsContent />
      </aside>
    </div>
  );
};

export default SettingsSidebar;
