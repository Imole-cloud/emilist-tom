"use client";

import { useState } from 'react';
import VoiceRecognition from '../../utils/voice/VoiceRecognition';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

interface VoiceSearchProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const VoiceSearch = ({ onSearch, placeholder = "Search..." }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const handleTranscript = (text: string) => {
    setTranscript(text);
  };
  
  const handleCommand = (command: string, searchTerm: string) => {
    // Set the transcript and trigger search
    setTranscript(searchTerm);
    
    // Ensure the search is triggered immediately
    console.log("Command received, triggering search with:", searchTerm);
    onSearch(searchTerm);
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      // If turning off, clear transcript
      setTranscript('');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranscript(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      onSearch(transcript.trim());
    }
  };
  
  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <input
          type="text"
          value={transcript}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-r-lg ${
            isListening 
              ? 'bg-red-500 text-white' 
              : 'bg-primary-green text-white'
          }`}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
        </button>
      </form>
      
      {/* Voice recognition component (no UI) */}
      <VoiceRecognition
        onTranscript={handleTranscript}
        onCommand={handleCommand}
        isListening={isListening}
        setIsListening={setIsListening}
      />
      
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
          Listening... Say "Emi, look for a [service]" to search
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
