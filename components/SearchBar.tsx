
import React, { useState, useRef, useEffect } from 'react';
import { MicIcon, SearchIcon } from './Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '', autoFocus = true }) => {
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

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

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.start();
    setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full bg-[#262626] rounded-full flex items-center px-4 md:px-6 py-2 border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-neutral-700 transition-all search-container-shadow group"
    >
      <div className="p-1 text-neutral-500 group-hover:text-orange-500 transition-colors">
        <SearchIcon className="w-5 h-5" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search with Chromium..."
        className="flex-1 bg-transparent border-none focus:outline-none px-3 text-white text-base md:text-lg placeholder-neutral-600 min-w-0"
      />
      
      <div className="flex items-center gap-2">
        <button 
          type="button" 
          onClick={handleVoiceSearch}
          className={`p-2 rounded-full transition-colors ${isListening ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}
        >
          <MicIcon className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
        </button>
        
        <button 
          type="submit"
          className="bg-neutral-700 hover:bg-neutral-600 text-white rounded-full px-4 py-1.5 md:py-2 font-bold text-xs md:text-sm whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
