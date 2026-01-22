
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import { BraveLogo, GearIcon, SearchIcon } from './components/Icons';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import PromotionalCard from './components/PromotionalCard';
import TopSites from './components/TopSites';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [query, setQuery] = useState('');

  // Handle routing for / and /search
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');

      if (path.startsWith('/search') && q) {
        setQuery(q);
        setView(AppView.SEARCH);
      } else {
        setView(AppView.HOME);
        setQuery('');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateToSearch = (newQuery: string) => {
    if (!newQuery.trim()) return;
    const url = `/search?q=${encodeURIComponent(newQuery.trim())}`;
    window.history.pushState({}, '', url);
    setQuery(newQuery);
    setView(AppView.SEARCH);
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setView(AppView.HOME);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-[#191919] text-white flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-[#191919]">
        {view === AppView.HOME ? (
          <div className="min-h-full flex flex-col items-center bg-wave-pattern">
            {/* Top Navigation for Home Page */}
            <header className="w-full flex justify-end p-4 z-10">
              <div className="flex items-center gap-3">
                <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                  <GearIcon className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-700">
                  B
                </div>
              </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-4xl -mt-12">
              <div className="mb-12 transition-transform hover:scale-105 duration-300 cursor-pointer" onClick={navigateToHome}>
                <BraveLogo />
              </div>
              <SearchBar onSearch={navigateToSearch} />
              <TopSites />
              <div className="mt-16 w-full flex justify-center">
                <PromotionalCard />
              </div>
            </main>
            <Footer />
          </div>
        ) : (
          <div className="flex flex-col min-h-full">
            {/* Results Page Header - Sticky */}
            <header className="sticky top-0 z-20 bg-[#191919]/90 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="cursor-pointer shrink-0" onClick={navigateToHome}>
                <BraveLogo className="scale-75 origin-left" />
              </div>
              <div className="flex-1 w-full max-w-3xl">
                <SearchBar onSearch={navigateToSearch} initialValue={query} autoFocus={false} />
              </div>
              <div className="hidden lg:flex items-center gap-4 text-neutral-400">
                <button className="text-sm font-medium hover:text-white transition-colors">Sign in</button>
                <GearIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </header>

            {/* Results Content */}
            <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-4 md:px-8 py-6 gap-8">
              {/* Vertical Navigation / Filters */}
              <aside className="hidden md:flex w-48 shrink-0 flex-col gap-1">
                {['All', 'Images', 'News', 'Videos', 'Maps'].map((item) => (
                  <button 
                    key={item} 
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      item === 'All' ? 'bg-orange-500/10 text-orange-500' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </aside>

              {/* Main Search Results Display */}
              <main className="flex-1 min-w-0">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Search Results for <span className="text-neutral-300">"{query}"</span>
                  </p>
                  <span className="text-[10px] text-neutral-600 font-mono">Chromium Search v1.0</span>
                </div>
                
                {/* Search Engine Result Integration */}
                <div className="w-full rounded-2xl border border-neutral-800 overflow-hidden bg-white shadow-2xl h-[calc(100vh-200px)] min-h-[600px]">
                  <iframe 
                    src={`https://www.bing.com/search?q=${encodeURIComponent(query)}&PC=U316&FORM=CHROMN&setlang=en-US`} 
                    className="w-full h-full border-none"
                    title="Search Results Content"
                    loading="lazy"
                  />
                </div>
                
                <div className="mt-8 text-center py-8 text-neutral-600 border-t border-neutral-800/50">
                  <p className="text-xs">Securely searching the web via Chromium Engine integration.</p>
                </div>
              </main>

              {/* Knowledge Graph / Sidebar Space */}
              <aside className="hidden xl:block w-80 shrink-0">
                <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
                  <h4 className="text-sm font-bold text-neutral-300 mb-4">About this search</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    You are using the Chromium-based search interface on strom-nine.vercel.app. 
                    This view provides high-performance access to global web information with enhanced privacy.
                  </p>
                </div>
              </aside>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
