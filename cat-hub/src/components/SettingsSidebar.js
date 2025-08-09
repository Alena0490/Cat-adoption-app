import './SettingsSidebar.css';
import { IoClose } from "react-icons/io5";

const SettingsSidebar = ({ onClose }) => {
        return (
            <aside className="settings-sidebar">
                <button onClick={onClose}><IoClose /></button>
                <h2>Settings</h2>
                {/* obsah nastavení */}
            </aside>
            )
        }

export default SettingsSidebar;