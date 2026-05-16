import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import Footer from './components/Footer';

import { ReactLenis } from 'lenis/react';

export default function App() {
  return (
    <BrowserRouter basename="/Brijesh-Portfolio/">
      <ReactLenis root>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ReactLenis>
    </BrowserRouter>
  );
}
