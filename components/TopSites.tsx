
import React from 'react';
import { TopSite } from '../types';
import { PlusIcon } from './Icons';

const SITES: TopSite[] = [
  { title: "GitHub", url: "https://github.com" },
  { title: "YouTube", url: "https://youtube.com" },
  { title: "Reddit", url: "https://reddit.com" },
  { title: "X", url: "https://x.com" },
  { title: "Vercel", url: "https://vercel.com" },
  { title: "Stack Overflow", url: "https://stackoverflow.com" },
];

const TopSites: React.FC = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-6 mt-10 md:mt-12 w-full max-w-2xl px-2">
      {SITES.map((site) => (
        <a 
          key={site.title} 
          href={site.url}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-800/80 rounded-2xl flex items-center justify-center group-hover:bg-neutral-700 transition-all border border-neutral-700/50 group-hover:border-neutral-600 group-hover:-translate-y-1 shadow-sm">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${new URL(site.url).hostname}&sz=64`} 
              alt={site.title}
              className="w-6 h-6 md:w-7 md:h-7 rounded-sm opacity-90 group-hover:opacity-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${site.title}&background=333&color=fff&size=64`;
              }}
            />
          </div>
          <span className="text-[10px] md:text-[11px] font-medium text-neutral-400 group-hover:text-neutral-200 truncate w-full text-center px-1">
            {site.title}
          </span>
        </a>
      ))}
      <button className="flex flex-col items-center gap-2 group">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-900/40 rounded-2xl flex items-center justify-center border border-dashed border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition-all group-hover:-translate-y-1">
          <PlusIcon className="w-5 h-5 text-neutral-500 group-hover:text-neutral-300" />
        </div>
        <span className="text-[10px] md:text-[11px] font-medium text-neutral-500 group-hover:text-neutral-300">
          Add
        </span>
      </button>
    </div>
  );
};

export default TopSites;
