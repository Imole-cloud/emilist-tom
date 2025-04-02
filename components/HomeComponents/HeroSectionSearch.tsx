"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

import { CiLocationOn, CiSearch } from "react-icons/ci";
import { MdMic } from "react-icons/md";
import EnhancedVoiceSearch from "../VoiceSearch/EnhancedVoiceSearch";
import EmiCommandHandler from "../VoiceSearch/EmiCommandHandler";
import JobAcceptance from "../VoiceSearch/JobAcceptance";
import PaymentProcessor from "../VoiceSearch/PaymentProcessor";
import ProjectTracking from "../VoiceSearch/ProjectTracking";
import VoiceSearchButton from "../VoiceSearchButton/VoiceSearchButton";

interface HeroSectionSearchProps {
  currentLink: number;
}

const HeroSectionSearch = ({ currentLink }: HeroSectionSearchProps) => {
  const [location, setLocation] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>("");
  const [showEmiHandler, setShowEmiHandler] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [showJobAcceptance, setShowJobAcceptance] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [currentJobId, setCurrentJobId] = useState("");
  const [showTracking, setShowTracking] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [processingEmiCommand, setProcessingEmiCommand] = useState(false);
  
  useEffect(() => {
    const handleEmiCommandEvent = (event: any) => {
      console.log("Received emiCommand event:", event.detail);
      const { command, serviceType } = event.detail;
      handleEmiCommand(command, serviceType);
    };
    
    document.addEventListener('emiCommand', handleEmiCommandEvent);
    
    return () => {
      document.removeEventListener('emiCommand', handleEmiCommandEvent);
    };
  }, []);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted with:", serviceName);
    
    if (processingEmiCommand || showEmiHandler) {
      console.log("Emi command is being processed, preventing form submission");
      return;
    }
    
    // Validation: Ensure at least one input is provided
    if (!location.trim() && !serviceName.trim()) {
      return;
    }
    
    const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
    const matches = serviceName.match(emiCommandRegex);
    console.log("Emi command regex matches:", matches);
    
    if (matches) {
      const serviceTypeText = matches[1].trim();
      console.log("Service type extracted:", serviceTypeText);
      
      setProcessingEmiCommand(true);
      
      try {
        console.log("Sending to enhance-search API");
        const response = await fetch("/api/enhance-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: serviceTypeText,
            isEmiCommand: true
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("API response:", data);
          if (data.isEmiCommand && data.detectedCategory) {
            console.log("Handling Emi command for category:", data.detectedCategory);
            handleEmiCommand(serviceTypeText, data.detectedCategory);
            return;
          }
        } else {
          console.error("API response not OK:", response.status);
        }
      } catch (error) {
        console.error("Error processing Emi command:", error);
      } finally {
        setProcessingEmiCommand(false);
      }
      
      return;
    }

    console.log("Proceeding with regular search");
    const query = new URLSearchParams({
      ...(serviceName && { q: serviceName.trim() }),
      ...(location && { location: location.trim() }),
    }).toString();

    // Navigate to the search page with the query
    if (currentLink === 3) {
      router.push(`/catalog/materials?${query}`);
    } else {
      router.push(`/catalog/services?${query}`);
    }
  };
  
  const handleVoiceSearchResult = async (result: string) => {
    console.log("Voice search result:", result);
    setServiceName(result);
    if (!result.trim()) return;
    
    const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
    const matches = result.match(emiCommandRegex);
    console.log("Emi command regex matches:", matches);
    
    if (matches) {
      const serviceTypeText = matches[1].trim();
      console.log("Service type extracted:", serviceTypeText);
      setProcessingEmiCommand(true);
      
      try {
        console.log("Sending to enhance-search API");
        const response = await fetch("/api/enhance-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: serviceTypeText,
            isEmiCommand: true
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("API response:", data);
          if (data.isEmiCommand && data.detectedCategory) {
            console.log("Handling Emi command for category:", data.detectedCategory);
            handleEmiCommand(serviceTypeText, data.detectedCategory);
            setProcessingEmiCommand(false);
            return;
          }
        } else {
          console.error("API response not OK:", response.status);
        }
      } catch (error) {
        console.error("Error processing Emi command:", error);
      } finally {
        setProcessingEmiCommand(false);
      }
      
      return;
    }
    
    console.log("Proceeding with regular search");
    const query = new URLSearchParams({
      q: result.trim(),
      ...(location && { location: location.trim() }),
    }).toString();

    if (currentLink === 3) {
      router.push(`/catalog/materials?${query}`);
    } else {
      router.push(`/catalog/services?${query}`);
    }
  };
  
  const handleEmiCommand = (command: string, detectedServiceType: string) => {
    console.log("handleEmiCommand called with:", command, detectedServiceType);
    setServiceType(detectedServiceType);
    setShowEmiHandler(true);
    
    setTimeout(() => {
      console.log("EmiHandler should be visible now");
      if (!showEmiHandler) {
        console.log("Forcing EmiHandler visibility");
        setShowEmiHandler(true);
      }
    }, 100);
    
    return true;
  };
  
  const handleJobAccepted = (expertId: string) => {
    setSelectedExpertId(expertId);
    setShowEmiHandler(false);
    setShowJobAcceptance(true);
  };
  
  const handlePaymentInitiated = (jobId: string) => {
    setCurrentJobId(jobId);
    setShowJobAcceptance(false);
    setShowPayment(true);
  };
  
  const handlePaymentComplete = (trackingData: any) => {
    setTrackingInfo(trackingData);
    setShowPayment(false);
    setShowTracking(true);
  };
  
  const handleCloseEmiHandler = () => {
    setShowEmiHandler(false);
  };
  
  const handleCloseJobAcceptance = () => {
    setShowJobAcceptance(false);
  };
  
  const handleClosePayment = () => {
    setShowPayment(false);
  };
  
  const handleCloseTracking = () => {
    setShowTracking(false);
  };
  
  return (
    <>
      <div className="w-full max-w-full flex-c-b mb-10 shadow-lg max-lg:max-w-[770px] h-12 relative">
        <div className="gap-2 flex-1 flex-c px-2 rounded-l-lg  border-light-gray border-1 focus-within:border-primary-green h-full  max-lg:h-12 relative">
          <input
            ref={searchInputRef}
            style={{ fontSize: "16px" }}
            type="text"
            placeholder="Ask AI anything"
            className="focus:outline-none max-sm:text-sm flex-1 bg-white"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (searchInputRef.current) {
                searchInputRef.current.focus();
                const button = document.querySelector('.voice-search-button');
                if (button) {
                  (button as HTMLButtonElement).click();
                }
              }
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#4caf50] flex items-center justify-center w-10 h-10 rounded-full"
            style={{ 
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            <MdMic style={{ color: 'white', fontSize: '20px' }} />
          </button>
        </div>
        <div className=" sm:flex-c-b w-full h-full max-lg:h-12 flex-1 hidden">
          <div className="flex-c gap-2 flex-1 px-2 border-y-1 border-light-gray focus-within:border-primary-green focus-within:border-1 w-full h-full">
            <span className="text-xl">
              <CiLocationOn />
            </span>
            <input
              style={{ fontSize: "16px" }}
              type="text"
              placeholder="Enter Location"
              className="focus:outline-none max-sm:text-sm flex-1 bg-white h-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        


        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (searchInputRef.current) {
                searchInputRef.current.focus();
                const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                if (SpeechRecognition) {
                  const recognition = new SpeechRecognition();
                  recognition.lang = 'en-US';
                  recognition.continuous = false;
                  recognition.interimResults = false;
                  
                  recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    console.log("Voice recognition result:", transcript);
                    setServiceName(transcript);
                    
                    setTimeout(() => {
                      handleVoiceSearchResult(transcript);
                    }, 500);
                  };
                  
                  recognition.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                  };
                  
                  recognition.start();
                } else {
                  console.error("Speech Recognition not supported in this browser");
                }
              }
            }}
            className="bg-[#4caf50] flex items-center justify-center w-12 h-full border-[#4caf50] border-1 text-white"
            style={{ borderRight: '1px solid #fff' }}
          >
            <MdMic style={{ color: 'white', fontSize: '24px' }} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!processingEmiCommand && !showEmiHandler) {
                handleSearch(e);
              } else {
                console.log("Preventing search while Emi command is active");
              }
            }}
            className="bg-primary-green w-full h-full border-primary-green border-1 rounded-r-lg text-white max-sm:text-sm"
          >
            Search
          </button>
        </div>
      </div>
      
      {showEmiHandler && (
        <EmiCommandHandler
          serviceType={serviceType}
          onJobAccepted={handleJobAccepted}
          onClose={handleCloseEmiHandler}
        />
      )}
      
      {showJobAcceptance && (
        <JobAcceptance
          expertId={selectedExpertId}
          onPaymentInitiated={handlePaymentInitiated}
          onClose={handleCloseJobAcceptance}
        />
      )}
      
      {showPayment && (
        <PaymentProcessor
          jobId={currentJobId}
          onComplete={handlePaymentComplete}
          onClose={handleClosePayment}
        />
      )}
      
      {showTracking && trackingInfo && (
        <ProjectTracking
          trackingInfo={trackingInfo}
          onClose={handleCloseTracking}
        />
      )}
    </>
  );
};

export default HeroSectionSearch;
