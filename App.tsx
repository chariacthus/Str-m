import React, { useState, useEffect } from 'react';
import { AppView, AppViewType } from './types';
import { BraveLogo, GearIcon } from './components/Icons';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import PromotionalCard from './components/PromotionalCard';
import TopSites from './components/TopSites';

const App: React.FC = () => {
  const [view, setView] = useState<AppViewType>(AppView.HOME);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleLocationChange = () => {
      try {
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
      } catch (e) {
        console.error("Navigation error:", e);
        setView(AppView.HOME);
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
    <div className="min-h-screen bg-[#191919] text-white flex flex-col selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <div className="flex-1 flex flex-col relative bg-[#191919]">
        {view === AppView.HOME ? (
          <div className="min-h-full flex flex-col items-center bg-wave-pattern animate-in fade-in duration-500">
            <header className="w-full flex justify-end p-6 z-10">
              <div className="flex items-center gap-4">
                <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                  <GearIcon className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-300 border border-neutral-700 hover:border-neutral-500 cursor-pointer transition-colors">
                  B
                </div>
              </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-4xl -mt-16">
              <div className="mb-14 transition-transform hover:scale-105 duration-300 cursor-pointer active:scale-95" onClick={navigateToHome}>
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
          <div className="flex flex-col min-h-full animate-in slide-in-from-top-4 duration-300">
            {/* Sticky Search Header */}
            <header className="sticky top-0 z-20 bg-[#191919]/90 backdrop-blur-xl border-b border-neutral-800 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="cursor-pointer shrink-0 hover:opacity-80 transition-opacity" onClick={navigateToHome}>
                <BraveLogo className="scale-75 origin-left" />
              </div>
              <div className="flex-1 w-full max-w-3xl">
                <SearchBar onSearch={navigateToSearch} initialValue={query} autoFocus={false} />
              </div>
              <div className="hidden lg:flex items-center gap-5 text-neutral-400">
                <button className="text-sm font-semibold hover:text-white transition-colors">Sign in</button>
                <GearIcon className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
              </div>
            </header>

            {/* Results Body */}
            <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full px-4 md:px-8 py-6 gap-8">
              {/* Navigation Sidebar */}
              <aside className="hidden md:flex w-44 shrink-0 flex-col gap-1">
                {['All', 'Images', 'News', 'Videos', 'Maps'].map((item) => (
                  <button 
                    key={item} 
                    className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      item === 'All' 
                        ? 'bg-orange-500/10 text-orange-500' 
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </aside>

              {/* Main Content */}
              <main className="flex-1 min-w-0">
                <div className="mb-6 flex items-center justify-between px-2">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-black">
                    Results for <span className="text-orange-500">"{query}"</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-neutral-500 font-bold">CHROMIUM ENGINE v1.2</span>
                  </div>
                </div>
                
                {/* Embedded Search Results */}
                <div className="w-full rounded-3xl border border-neutral-800 overflow-hidden bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] h-[calc(100vh-180px)] min-h-[500px]">
                  <iframe 
                    src={`https://www.bing.com/search?q=${encodeURIComponent(query)}&PC=U316&FORM=CHROMN&setlang=en-US`} 
                    className="w-full h-full border-none"
                    title="Search Results"
                    loading="lazy"
                  />
                </div>
                
                <div className="mt-8 text-center py-10 text-neutral-600 border-t border-neutral-800/30">
                  <p className="text-xs font-medium">Safe browsing powered by Chromium Standards.</p>
                </div>
              </main>

              {/* Info Sidebar */}
              <aside className="hidden xl:block w-80 shrink-0">
                <div className="p-8 bg-neutral-900/40 border border-neutral-800/50 rounded-[2.5rem] backdrop-blur-sm">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/></svg>
                  </div>
                  <h4 className="text-lg font-black text-white mb-4 tracking-tight">Private & Fast</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                    This search interface is optimized for privacy. 
                    We leverage Chromium standards to deliver high-relevance 
                    results without tracking your personal browsing habits.
                  </p>
                  <button className="mt-8 w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl text-xs font-bold transition-all border border-neutral-700">
                    Learn about Chromium Search
                  </button>
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