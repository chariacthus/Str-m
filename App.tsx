
import React from 'react';
import { BraveLogo, GearIcon } from './components/Icons';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import PromotionalCard from './components/PromotionalCard';
import TopSites from './components/TopSites';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(query.trim())}`;
    window.location.href = searchUrl;
  };

  return (
    <div className="min-h-screen bg-[#191919] bg-wave-pattern flex flex-col items-center selection:bg-orange-500 selection:text-white relative">
      {/* Header / Top Nav */}
      <header className="w-full flex justify-between items-center p-4 md:p-6 z-10 absolute top-0">
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block">Images</button>
          <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block">News</button>
          <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Bookmarks</button>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <GearIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-700 cursor-pointer hover:bg-neutral-700 transition-colors">
            B
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-20 md:py-0">
        <div className="flex flex-col items-center w-full max-w-4xl">
          {/* Logo with slight animation */}
          <div className="mb-8 md:mb-12 transition-transform hover:scale-105 duration-300">
            <BraveLogo />
          </div>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Top Sites Shortcuts */}
          <TopSites />
          
          {/* Promotional Card - hidden on very small screens to avoid clutter, visible on most */}
          <div className="mt-12 md:mt-16 w-full flex justify-center px-2">
            <PromotionalCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
