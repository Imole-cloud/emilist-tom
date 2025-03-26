'use client';

import { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function AISearchTest() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setError('Voice input error: ' + event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setError('');
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, location }),
      });

      const data = await res.json();
      
      if (data.success) {
        setResponse(data.response);
      } else {
        setError(data.error || 'Failed to get AI response');
      }
    } catch (err) {
      setError('Failed to connect to AI service');
      console.error('AI Search Error:', err);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Search Test</h1>
      
      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div className="relative">
          <label className="block mb-2">Query:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your question or click microphone to speak..."
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded ${isListening ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-100`}
            >
              {isListening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
            </button>
          </div>
          {isListening && (
            <div className="absolute right-12 top-10 text-sm text-green-500">
              Listening...
            </div>
          )}
        </div>
        
        <div>
          <label className="block mb-2">Location (optional):</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter location..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={`px-4 py-2 rounded ${
            loading || !query.trim()
              ? 'bg-gray-400'
              : 'bg-primary-green text-white hover:bg-green-600'
          }`}
        >
          {loading ? 'Processing...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {response && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-bold mb-2">AI Response:</h2>
          <div className="whitespace-pre-wrap">{response}</div>
        </div>
      )}
    </div>
  );
} 