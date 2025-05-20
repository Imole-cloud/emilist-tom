"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VoiceSearch from "../VoiceSearch/VoiceSearch";

const MainSearch = () => {
  const [serviceName, setServiceName] = useState<string>("");
  const router = useRouter();
  
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!serviceName.trim()) {
      return;
    }
    // Build the query string dynamically
    const query = new URLSearchParams({
      ...(serviceName && { q: serviceName.trim() }),
    }).toString();
    // Navigate to the search page with the query
    router.push(`/catalog/services?${query}`);
  };
  
  const handleVoiceSearch = (searchTerm: string) => {
    setServiceName(searchTerm);
    
    // Build the query string
    const query = new URLSearchParams({
      q: searchTerm.trim(),
    }).toString();
    
    // Navigate to the search page with the query
    router.push(`/catalog/services?${query}`);
  };
  
  return (
    <div className="max-w-96 w-full flex px-3 h-12 border-1 border-gray-400 rounded-lg focus-within:border-primary-green">
      <VoiceSearch 
        onSearch={handleVoiceSearch} 
        placeholder="Search for services (e.g., carpenter)"
      />
    </div>
  );
};

export default MainSearch;
