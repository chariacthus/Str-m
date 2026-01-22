
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
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      onSearch(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-[#262626] rounded-full flex items-center px-4 md:px-6 py-2 border border-neutral-800 hover:border-neutral-700 focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-neutral-700 transition-all search-container-shadow"
    >
      <div className="p-1 text-neutral-400 hidden sm:block">
        <SearchIcon className="w-5 h-5" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web privately..."
        className="flex-1 bg-transparent border-none focus:outline-none px-2 md:px-4 text-white text-base md:text-lg placeholder-neutral-500 min-w-0"
      />
      
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          type="button" 
          onClick={handleVoiceSearch}
          className={`p-2 rounded-full transition-colors ${isListening ? 'text-red-500 bg-red-500/10' : 'text-neutral-400 hover:text-white'}`}
          title="Voice Search"
        >
          <MicIcon className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
        </button>
        
        <button 
          type="submit"
          className="bg-neutral-700 hover:bg-neutral-600 text-white rounded-full px-4 md:px-6 py-2 flex items-center gap-2 transition-colors font-semibold text-sm whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
