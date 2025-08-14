import "./SettingsContent.css";
import { useState } from "react";

const SettingsContent = () => {   

    const saved = localStorage.getItem('theme');
    document.documentElement.classList.toggle('light-theme', saved === 'light');

    const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light-theme")
);
function toggleTheme(e) {
    const light = e.target.checked;
    setIsLight(light);
    document.documentElement.classList.toggle("light-theme", light);
    localStorage.setItem("theme", light ? "light" : "dark");
}

    return (  
        <article className="settings-content">
                <div className="settings-section">
                    <h3>Color theme</h3>
                    <label for="theme-toggle" className="theme-label">
                        <input
                            type="checkbox"
                            checked={isLight}
                            onChange={toggleTheme}
                            aria-label="Color theme toggle"
                            className="theme-toggle"
                            id="theme-toggle"
                            />
                            <span class="slider"></span>
                        </label>
                </div>

                <div className="settings-section">
                    <h3>General Settings</h3>
                    <p>Here you can adjust general settings for the application.</p>
                </div>

                <div className="settings-section">
                    <h3>General Settings</h3>
                    <p>Here you can adjust general settings for the application.</p>
                </div>
        </article>
    )
}

export default SettingsContent;