import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

import Menu from './components/Menu';
import Footer from './components/Footer';

import Home from './pages/Home';

const Cats = lazy(() => import("./pages/Cats"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Error = lazy(() => import("./pages/Error"));

const SettingsSidebar = lazy(() => import("./components/SettingsSidebar"));

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
        <Suspense fallback={<div>Loading settings…</div>}>
          <SettingsSidebar onClose={() => setIsSettingsOpen(false)} />
        </Suspense>
      )}

      <main className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
      </main>

      <Footer className="footer" />
    </>
  );
};

export default App;

