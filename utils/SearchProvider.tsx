"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

// Create a context for search functionality
export const SearchContext = createContext<any>(null);

// Custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Provider component for search functionality
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  
  // Function to trigger a search and navigate to the appropriate page
  const triggerSearch = (term: string, location?: string) => {
    console.log("Search triggered with:", term, location);
    
    // Build the query string
    const query = new URLSearchParams({
      ...(term && { q: term.trim() }),
      ...(location && { location: location.trim() }),
    }).toString();
    
    // Navigate to the search page with the query
    router.push(`/catalog/services?${query}`);
  };
  
  // Function to handle voice command search
  const handleVoiceSearch = (searchTerm: string) => {
    console.log("Voice search triggered for:", searchTerm);
    setSearchTerm(searchTerm);
    triggerSearch(searchTerm, searchLocation);
  };
  
  const value = {
    searchTerm,
    setSearchTerm,
    searchLocation,
    setSearchLocation,
    triggerSearch,
    handleVoiceSearch
  };
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
