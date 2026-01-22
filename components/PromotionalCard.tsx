
import React from 'react';
import { DownloadIcon } from './Icons';

const PromotionalCard: React.FC = () => {
  return (
    <div className="mt-12 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between max-w-lg w-full group hover:border-neutral-700 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#ff4b1f] rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M12 2L2 12h3v8h14v-8h3L12 2z"/>
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Brave Browser</h4>
          <p className="text-xs text-neutral-400">Enjoying private search? Try the browser that puts you first.</p>
        </div>
      </div>
      <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        Download <DownloadIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PromotionalCard;
