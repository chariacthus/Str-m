
import React from 'react';
import { BraveLogo, GearIcon } from './components/Icons';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import PromotionalCard from './components/PromotionalCard';
import TopSites from './components/TopSites';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    // Standard browser behavior: redirect to the chosen search engine
    const searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
  };

  return (
    <div className="min-h-screen bg-[#191919] bg-wave-pattern flex flex-col items-center selection:bg-orange-500 selection:text-white">
      {/* Header / Top Nav */}
      <header className="w-full flex justify-between items-center p-6 fixed top-0 left-0 z-10">
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Images</button>
          <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">News</button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <GearIcon className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-700">
            B
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center w-full max-w-4xl transform -translate-y-8">
          {/* Logo */}
          <div className="mb-12">
            <BraveLogo />
          </div>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Top Sites Shortcuts */}
          <TopSites />
          
          {/* Promotional Card */}
          <div className="mt-16 w-full flex justify-center">
            <PromotionalCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
