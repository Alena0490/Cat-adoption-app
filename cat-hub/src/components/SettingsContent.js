import "./SettingsContent.css";
import { useState, useEffect } from "react";

// --- Reset buttn component---
function ResetSettings({ onReset }) {
  
  return (
    <button type="button" className="btn btn-secondary" onClick={onReset}>
      Reset to defaults
    </button>
  );
}

const SettingsContent = () => {
  // ----- Theme (default dark) -----
  const [isLight, setIsLight] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  const toggleTheme = (e) => setIsLight(e.target.checked);

  // ----- Font scale -----
  const FONT_SCALE_KEY = "fontScale";
  const [fontScale, setFontScale] = useState(() => {
    const v = Number(localStorage.getItem(FONT_SCALE_KEY));
    return Number.isFinite(v) && v > 0 ? v : 1;
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
    localStorage.setItem(FONT_SCALE_KEY, String(fontScale));
  }, [fontScale]);

//   Reset handler
  const handleReset = () => {
  ["theme","fontScale","density","reduced"].forEach(k => localStorage.removeItem(k));
  document.documentElement.classList.remove("light-theme");   // zpět na dark
  document.documentElement.style.setProperty("--font-scale", "1"); // text 100%
  setIsLight(false);
  setFontScale(1);
};

  return (
    <article className="settings-content">
      <div className="settings-section">
        <h3>Color theme</h3>
        <label htmlFor="theme-toggle" className="theme-label">
          <input
            id="theme-toggle"
            className="theme-toggle"
            type="checkbox"
            checked={isLight}
            onChange={toggleTheme}
            aria-label="Color theme toggle"
            role="switch"
            aria-checked={isLight}
          />
          <span className="slider" aria-hidden="true" />
        </label>
      </div>

      <div className="settings-section" aria-labelledby="text-size">
        <h3 id="text-size">Text size</h3>
        <label htmlFor="text-size-range">Scale</label>
            <input
            id="text-size-range"
            type="range"
            min="0.9"
            max="1.25"
            step="0.05"
            list="text-size-marks"
            value={fontScale}
            onChange={(e) => setFontScale(parseFloat(e.target.value))}
            />
            <datalist id="text-size-marks">
            <option value="0.9" />
            <option value="1.0" />
            <option value="1.1" />
            <option value="1.15" />
            <option value="1.2" />
            <option value="1.25" />
            </datalist>
            <output htmlFor="text-size-range" aria-live="polite">
            {Math.round(fontScale * 100)}%
            </output>
      </div>

      <div className="settings-section">
        <h3>Reset</h3>
        <p>Resets theme to dark and text size to 100%.</p>
        <ResetSettings onReset={handleReset} />
      </div>
    </article>
  );
};

export default SettingsContent;
