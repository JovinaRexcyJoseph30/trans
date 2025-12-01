import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Transport from './components/Transport';
import Hero from './components/Hero';
import Contact from './components/Contact';
import About from './components/About';
import WelcomeSlideshowModal from './components/WelcomeSlideshowModal';

export type Page = 'Home' | 'Route' | 'About' | 'Contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <Home />
            </div>
          </>
        );
      case 'Route':
        return (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Transport />
          </div>
        );
      case 'About':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <About />
          </div>
        );
      case 'Contact':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Contact />
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Coming Soon</h2>
            <p className="text-slate-600 mt-2">This page is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col font-sans">
      <WelcomeSlideshowModal />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
