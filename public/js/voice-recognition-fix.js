document.addEventListener('DOMContentLoaded', function() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error('Speech Recognition API not supported in this browser');
    return;
  }
  
  const searchInput = document.querySelector('input[type="search"]');
  const voiceButton = document.querySelector('button[aria-label="Start voice search"], button[aria-label="Stop voice search"]');
  
  if (!searchInput || !voiceButton) {
    console.error('Could not find search input or voice button');
    return;
  }
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.lang = 'en-US';
  
  const hasEmiTrigger = (transcript) => {
    const lowerTranscript = transcript.toLowerCase().trim();
    const triggerPhrases = ['emi', 'emmy', 'amy', 'emily', 'emma'];
    
    for (const trigger of triggerPhrases) {
      if (lowerTranscript.startsWith(trigger)) {
        return true;
      }
    }
    
    return false;
  };
  
  const extractQueryAfterTrigger = (transcript) => {
    const lowerTranscript = transcript.toLowerCase().trim();
    let result = lowerTranscript;
    
    const triggerPhrases = ['emi', 'emmy', 'amy', 'emily', 'emma'];
    
    for (const trigger of triggerPhrases) {
      if (lowerTranscript.startsWith(trigger)) {
        result = lowerTranscript.substring(trigger.length).replace(/^[,\\s]+/, '');
        
        const lookForPhrases = ['look for', 'find', 'search for', 'find me', 'get me', 'i need', 'looking for'];
        for (const phrase of lookForPhrases) {
          if (result.startsWith(phrase)) {
            result = result.substring(phrase.length).trim();
            break;
          }
        }
        
        result = result.replace(/^(a|an|the|some)\\s+/i, '');
        
        break;
      }
    }
    
    return result;
  };
  
  const findMatchingCategory = (transcript) => {
    if (!transcript) return null;
    
    const query = extractQueryAfterTrigger(transcript).toLowerCase();
    if (!query) return null;
    
    const categories = [
      {
        name: 'Carpenter',
        keywords: ['carpenter', 'woodwork', 'furniture', 'cabinet', 'wood', 'carpentry'],
        route: '/vendors/carpenter'
      },
      {
        name: 'Plumber',
        keywords: ['plumber', 'plumbing', 'pipe', 'water', 'leak', 'tap', 'faucet'],
        route: '/vendors/plumber'
      },
      {
        name: 'Electrician',
        keywords: ['electrician', 'electrical', 'wiring', 'light', 'power', 'electric'],
        route: '/vendors/electrician'
      },
      {
        name: 'Painter',
        keywords: ['painter', 'painting', 'paint', 'wall', 'color', 'decorate'],
        route: '/vendors/painter'
      },
      {
        name: 'Gardener',
        keywords: ['gardener', 'garden', 'plant', 'lawn', 'landscape', 'yard'],
        route: '/vendors/gardener'
      },
      {
        name: 'Cleaner',
        keywords: ['cleaner', 'cleaning', 'clean', 'maid', 'janitor', 'housekeeping'],
        route: '/vendors/cleaner'
      },
      {
        name: 'Mechanic',
        keywords: ['mechanic', 'car', 'auto', 'vehicle', 'repair', 'engine'],
        route: '/vendors/mechanic'
      },
      {
        name: 'Cook',
        keywords: ['cook', 'chef', 'food', 'meal', 'catering', 'kitchen'],
        route: '/vendors/cook'
      },
      {
        name: 'Developer',
        keywords: ['developer', 'programmer', 'coding', 'software', 'web', 'app'],
        route: '/vendors/developer'
      },
      {
        name: 'Driver',
        keywords: ['driver', 'driving', 'transport', 'taxi', 'ride', 'chauffeur'],
        route: '/vendors/driver'
      },
      {
        name: 'Event Planner',
        keywords: ['event planner', 'event', 'party', 'wedding', 'celebration', 'organize'],
        route: '/vendors/event-planner'
      },
      {
        name: 'Fitness Trainer',
        keywords: ['fitness', 'trainer', 'gym', 'exercise', 'workout', 'personal trainer'],
        route: '/vendors/fitness-trainer'
      },
      {
        name: 'Interior Designer',
        keywords: ['interior', 'designer', 'decor', 'home', 'design', 'decoration'],
        route: '/vendors/interior-designer'
      },
      {
        name: 'Photographer',
        keywords: ['photographer', 'photo', 'picture', 'camera', 'portrait', 'photography'],
        route: '/vendors/photographer'
      },
      {
        name: 'Security',
        keywords: ['security', 'guard', 'protection', 'secure', 'safety', 'surveillance'],
        route: '/vendors/security'
      },
      {
        name: 'Tailor',
        keywords: ['tailor', 'sewing', 'clothes', 'garment', 'alteration', 'fabric'],
        route: '/vendors/tailor'
      },
      {
        name: 'Tutor',
        keywords: ['tutor', 'teacher', 'education', 'lesson', 'learning', 'teaching'],
        route: '/vendors/tutor'
      },
      {
        name: 'Welder',
        keywords: ['welder', 'welding', 'metal', 'fabrication', 'steel', 'iron'],
        route: '/vendors/welder'
      }
    ];
    
    for (const category of categories) {
      for (const keyword of category.keywords) {
        if (query.includes(keyword)) {
          return category;
        }
      }
    }
    
    return null;
  };
  
  voiceButton.addEventListener('click', function() {
    if (voiceButton.classList.contains('active')) {
      recognition.stop();
      voiceButton.classList.remove('active');
    } else {
      recognition.start();
      voiceButton.classList.add('active');
      searchInput.placeholder = 'Listening...';
    }
  });
  
  recognition.onresult = function(event) {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    
    if (searchInput) {
      searchInput.value = transcript;
      
      const inputEvent = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(inputEvent);
      
      if (hasEmiTrigger(transcript)) {
        const extractedQuery = extractQueryAfterTrigger(transcript);
        searchInput.value = extractedQuery;
        searchInput.dispatchEvent(inputEvent);
        
        const category = findMatchingCategory(transcript);
        
        setTimeout(() => {
          const searchButton = document.querySelector('button[type="submit"]');
          if (searchButton) {
            searchButton.click();
          } else {
            const event = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true
            });
            searchInput.dispatchEvent(event);
          }
          
          if (category) {
            setTimeout(() => {
              window.location.href = category.route;
            }, 300);
          }
        }, 500);
      }
    }
  };
  
  recognition.onend = function() {
    voiceButton.classList.remove('active');
    searchInput.placeholder = 'Say \'Emi, look for...\'';
  };
  
  recognition.onerror = function(event) {
    console.error('Speech recognition error', event.error);
    voiceButton.classList.remove('active');
  };
});
