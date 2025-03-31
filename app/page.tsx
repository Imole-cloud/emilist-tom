'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <div className="navbar">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>emilist</span>
        </div>
        
        <div className="nav-actions">
          <a href="#" className="btn btn-primary btn-round">Join as an Expert</a>
          <a href="#" className="btn-outline">List New Job</a>
          <div className="dropdown">
            <a href="#" className="btn-outline">Explore Emilist <span>▼</span></a>
          </div>
          <a href="#" className="btn-outline">Log in</a>
          <a href="#" className="btn-outline">Sign up</a>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#" className="mobile-menu-item">Join as an Expert</a>
          <a href="#" className="mobile-menu-item">List New Job</a>
          <a href="#" className="mobile-menu-item">Explore Emilist</a>
          <a href="#" className="mobile-menu-item">Log in</a>
          <a href="#" className="mobile-menu-item">Sign up</a>
        </div>
      )}
      
      <div className="hero">
        <div className="hero-content">
          <div className="hero-images">
            <div className="left-images">
              <div className="image-container main-image">
                <Image 
                  src="/images/construction-workers.jpg" 
                  alt="Construction workers checking inventory" 
                  width={500} 
                  height={400}
                  className="featured-image"
                />
              </div>
              <div className="image-container secondary-image">
                <Image 
                  src="/images/black-engineer.jpg" 
                  alt="Professional engineer at construction site" 
                  width={500} 
                  height={300}
                  className="featured-image"
                />
              </div>
            </div>
            
            <div className="hero-text">
              <h1 className="hero-title">Discover Your Project Dream Team Here.</h1>
              <p className="hero-description">
                This platform connects homeowners, contractors, businesses, and
                customers with skilled artisans, handymen, and project experts for
                renovations, custom-builds, and repairs.
              </p>
              <div className="search-bar">
                <input type="text" className="search-input" placeholder="Ask AI anything" />
                <button className="search-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="categories">
        <div className="category-card" onClick={() => router.push('/service-provider')}>
          <div className="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M6.5 14a1 1 0 0 1-1-1V5h-2a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2h-2v8a1 1 0 0 1-1 1h-2z"/>
            </svg>
          </div>
          <h3 className="category-title">Service Provider</h3>
          <p className="category-description">Connect with skilled professionals for your project needs</p>
          <span className="category-link">Learn More →</span>
        </div>
        
        <div className="category-card" onClick={() => router.push('/job-opportunities')}>
          <div className="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <h3 className="category-title">Job Opportunities</h3>
          <p className="category-description">Find your next project or career opportunity</p>
          <span className="category-link">Browse Jobs →</span>
        </div>
        
        <div className="category-card" onClick={() => router.push('/materials')}>
          <div className="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 1 .372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
            </svg>
          </div>
          <h3 className="category-title">Materials</h3>
          <p className="category-description">Source quality materials for your projects</p>
          <span className="category-link">Shop Now →</span>
        </div>
        
        <div className="category-card" onClick={() => router.push('/service-request')}>
          <div className="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
            </svg>
          </div>
          <h3 className="category-title">Customized Service Request</h3>
          <p className="category-description">Get personalized service quotes for your needs</p>
          <span className="category-link">Request Now →</span>
        </div>
        
        <div className="category-card" onClick={() => router.push('/maintenance')}>
          <div className="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
          </div>
          <h3 className="category-title">Planned Maintenance</h3>
          <p className="category-description">Schedule regular maintenance services</p>
          <span className="category-link">Plan Now →</span>
        </div>
      </div>
    </div>
  );
}
