import  {BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Cats from './pages/Cats';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Error from './pages/Error';
import Menu from './components/Menu';
import Footer from './components/Footer';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <BrowserRouter>
      <header className="header">
          <Menu onOpenSettings={() => setIsSettingsOpen(true)} />
      </header>
      <main className="main-content">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cats" element={<Cats />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={ <Error /> }/>
        </Routes>
      </main>       
      <Footer className="footer"/>
    </BrowserRouter>
  )
 }

export default App;
