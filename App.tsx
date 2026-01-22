
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import { BraveLogo, GearIcon, PlusIcon, SearchIcon } from './components/Icons';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import PromotionalCard from './components/PromotionalCard';
import TopSites from './components/TopSites';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [query, setQuery] = useState('');

  // Synchronize state with URL
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');

      if (path === '/search' && q) {
        setQuery(q);
        setView(AppView.SEARCH);
      } else {
        setView(AppView.HOME);
        setQuery('');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Initial check

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
    <div className="min-h-screen bg-[#191919] text-white flex flex-col selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Chromium Tab Bar */}
      <div className="bg-[#0e0e0e] flex items-end px-2 pt-2 border-b border-neutral-800 h-10 select-none">
        <div 
          onClick={navigateToHome}
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer transition-all ${
            view === AppView.HOME ? 'bg-[#191919] text-white' : 'text-neutral-500 hover:bg-neutral-800/50'
          }`}
          style={{ width: '200px' }}
        >
          <div className="w-4 h-4 brave-gradient rounded-sm flex items-center justify-center shrink-0">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-[11px] font-medium truncate">New Tab</span>
          {view === AppView.HOME && <div className="absolute right-2 text-neutral-600">×</div>}
        </div>
        
        {view === AppView.SEARCH && (
          <div 
            className="group relative flex items-center gap-2 px-4 py-2 rounded-t-lg bg-[#191919] text-white cursor-default"
            style={{ width: '200px', marginLeft: '-1px' }}
          >
             <SearchIcon className="w-3 h-3 text-orange-500 shrink-0" />
             <span className="text-[11px] font-medium truncate">{query} - Search</span>
             <div onClick={(e) => { e.stopPropagation(); navigateToHome(); }} className="absolute right-2 text-neutral-500 hover:text-white cursor-pointer">×</div>
          </div>
        )}

        <button className="mb-2 ml-2 p-1 rounded-full hover:bg-neutral-800 text-neutral-400 transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Browser Window Content */}
      <div className="flex-1 overflow-y-auto relative bg-[#191919]">
        {view === AppView.HOME ? (
          <div className="min-h-full flex flex-col items-center bg-wave-pattern">
             {/* Header icons for Home */}
             <header className="w-full flex justify-end p-4 z-10">
                <div className="flex items-center gap-3">
                  <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                    <GearIcon className="w-5 h-5" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-700">B</div>
                </div>
              </header>

              <main className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-4xl -mt-12">
                <div className="mb-12 transition-transform hover:scale-105 duration-300">
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
            {/* Search Results Header */}
            <div className="sticky top-0 z-20 bg-[#191919] border-b border-neutral-800 px-6 py-4 flex items-center gap-6">
               <div className="cursor-pointer" onClick={navigateToHome}>
                 <BraveLogo className="scale-75 origin-left" />
               </div>
               <div className="flex-1 max-w-2xl">
                 <SearchBar onSearch={navigateToSearch} initialValue={query} autoFocus={false} />
               </div>
               <div className="flex items-center gap-4 text-neutral-400">
                  <button className="text-sm hover:text-white transition-colors">Sign in</button>
                  <GearIcon className="w-5 h-5 cursor-pointer" />
               </div>
            </div>

            {/* Simulated Chromium Browser Search Content */}
            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-8 gap-8">
              <aside className="w-full md:w-48 shrink-0 flex flex-col gap-1">
                {['All', 'Images', 'News', 'Videos', 'Maps'].map((item) => (
                  <button 
                    key={item} 
                    className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item === 'All' ? 'bg-orange-500/10 text-orange-500' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </aside>

              <main className="flex-1 max-w-3xl">
                <p className="text-xs text-neutral-500 mb-6 uppercase tracking-widest font-bold">Results for "{query}"</p>
                
                {/* Embedded actual browser search frame for a "Fully Working" experience */}
                <div className="w-full rounded-2xl border border-neutral-800 overflow-hidden bg-white h-[800px] shadow-2xl">
                  <iframe 
                    src={`https://www.bing.com/search?q=${encodeURIComponent(query)}&PC=U316&FORM=CHROMN`} 
                    className="w-full h-full border-none"
                    title="Search Results"
                  />
                </div>
                
                <div className="mt-8 text-center py-12 text-neutral-500 border-t border-neutral-800">
                  <p className="text-sm italic">You are viewing the Chromium Browser search engine view.</p>
                </div>
              </main>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
