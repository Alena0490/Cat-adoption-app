import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Cats from './pages/Cats';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Error from './pages/Error';
import Menu from './components/Menu';
import Footer from './components/Footer';
import SettingsSidebar from "./components/SettingsSidebar";

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSettingsOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isSettingsOpen]);

  return (
    <>
      <header className="header">
        <Menu onOpenSettings={() => setIsSettingsOpen(true)} />
      </header>

      {isSettingsOpen && (
        <SettingsSidebar onClose={() => setIsSettingsOpen(false)} />
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer className="footer" />
    </>
  );
};

export default App;

