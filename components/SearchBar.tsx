
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, MicIcon, SearchIcon } from './Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '', autoFocus = true }) => {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-[#262626] rounded-full flex items-center px-6 py-2 border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-neutral-700 transition-all search-container-shadow"
    >
      <div className="p-1 text-neutral-400">
        <SearchIcon className="w-5 h-5" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web privately..."
        className="flex-1 bg-transparent border-none focus:outline-none px-4 text-white text-lg placeholder-neutral-500"
      />
      
      <div className="flex items-center gap-4">
        <button type="button" className="p-1 text-neutral-400 hover:text-white transition-colors">
          <MicIcon className="w-5 h-5" />
        </button>
        
        <button 
          type="submit"
          className="bg-neutral-700 hover:bg-neutral-600 text-white rounded-full px-5 py-2 flex items-center gap-2 transition-colors font-medium text-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
