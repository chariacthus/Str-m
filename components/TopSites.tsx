
import React from 'react';
import { TopSite } from '../types';
import { PlusIcon } from './Icons';

const SITES: TopSite[] = [
  { title: "GitHub", url: "https://github.com" },
  { title: "YouTube", url: "https://youtube.com" },
  { title: "Reddit", url: "https://reddit.com" },
  { title: "X", url: "https://x.com" },
  { title: "Vercel", url: "https://vercel.com" },
  { title: "Tailwind", url: "https://tailwindcss.com" },
];

const TopSites: React.FC = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-6 mt-12 w-full max-w-2xl px-4">
      {SITES.map((site) => (
        <a 
          key={site.title} 
          href={site.url}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center group-hover:bg-neutral-700 transition-colors border border-neutral-700/50">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${new URL(site.url).hostname}&sz=64`} 
              alt={site.title}
              className="w-6 h-6 rounded-sm opacity-80 group-hover:opacity-100"
            />
          </div>
          <span className="text-[11px] font-medium text-neutral-400 group-hover:text-neutral-200 truncate w-full text-center">
            {site.title}
          </span>
        </a>
      ))}
      <button className="flex flex-col items-center gap-2 group">
        <div className="w-12 h-12 bg-neutral-900/50 rounded-xl flex items-center justify-center border border-dashed border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition-all">
          <PlusIcon className="w-5 h-5 text-neutral-500 group-hover:text-neutral-300" />
        </div>
        <span className="text-[11px] font-medium text-neutral-500 group-hover:text-neutral-300">
          Add
        </span>
      </button>
    </div>
  );
};

export default TopSites;
