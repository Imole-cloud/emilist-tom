"use client";

import { useEffect, useState, useCallback } from 'react';

interface VoiceRecognitionProps {
  onTranscript: (text: string) => void;
  onCommand: (command: string, searchTerm: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

const VoiceRecognition = ({
  onTranscript,
  onCommand,
  isListening,
  setIsListening
}: VoiceRecognitionProps) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [finalTranscript, setFinalTranscript] = useState<string>('');
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check browser support for SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.error("Speech recognition is not supported in this browser");
        return;
      }
      
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      setRecognition(recognitionInstance);
      
      return () => {
        if (recognitionInstance) {
          recognitionInstance.abort();
        }
      };
    }
  }, []);
  
  // Parse command from transcript
  const parseCommand = useCallback((transcript: string) => {
    // Convert to lowercase for case-insensitive matching
    const lowerTranscript = transcript.toLowerCase().trim();
    
    // Check if the transcript starts with "Emi, look for" or similar patterns
    const emiCommandRegex = /^emi,?\s+(look|search|find)\s+for\s+(?:a|an)?\s*(.+)$/i;
    const match = lowerTranscript.match(emiCommandRegex);
    
    if (match) {
      const searchTerm = match[2].trim();
      return { isCommand: true, command: match[1], searchTerm };
    }
    
    return { isCommand: false, command: '', searchTerm: '' };
  }, []);
  
  // Start/stop listening based on isListening prop
  useEffect(() => {
    if (!recognition) return;
    
    if (isListening) {
      try {
        recognition.start();
        setFinalTranscript('');
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    } else {
      try {
        recognition.stop();
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      }
    }
    
    // Event handlers
    recognition.onstart = () => {
      console.log("Voice recognition started");
    };
    
    recognition.onend = () => {
      console.log("Voice recognition ended");
      
      // Process final transcript for commands if we have one
      if (finalTranscript) {
        const { isCommand, command, searchTerm } = parseCommand(finalTranscript);
        if (isCommand && searchTerm) {
          console.log("Command detected:", command, "Search term:", searchTerm);
          onCommand(command, searchTerm);
          setIsListening(false); // Stop listening after command is recognized
          return;
        }
      }
      
      // If still supposed to be listening, restart
      if (isListening) {
        try {
          recognition.start();
        } catch (error) {
          console.error("Error restarting speech recognition:", error);
          setIsListening(false);
        }
      }
    };
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      // Send transcript to parent component
      onTranscript(transcript);
      
      // Store the final transcript when speech recognition is complete
      if (event.results[0].isFinal) {
        setFinalTranscript(transcript);
        
        // Check if it's a command
        const { isCommand, command, searchTerm } = parseCommand(transcript);
        
        if (isCommand && searchTerm) {
          console.log("Command detected:", command, "Search term:", searchTerm);
          // Ensure we call onCommand with a slight delay to allow the UI to update
          setTimeout(() => {
            onCommand(command, searchTerm);
            setIsListening(false); // Stop listening after command is recognized
          }, 100);
        }
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
    };
  }, [isListening, recognition, onTranscript, onCommand, parseCommand, setIsListening, finalTranscript]);
  
  // No UI rendering needed for this component
  return null;
};

export default VoiceRecognition;
