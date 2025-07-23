import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const cities = [
    'Houston', 'Katy', 'Sugar Land', 'The Woodlands', 'Cypress', 
    'Pearland', 'Spring', 'Tomball', 'Richmond', 'Humble', 'Kingwood', 'Missouri City'
  ];

  // Close mobile menu when route changes
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsMobileToolsOpen(false);
    setIsMobileLocationsOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/big-logo-2.png"
              alt="Houston Land Guy Logo"
              className="h-12 sm:h-14 md:h-16 w-auto"
              loading="eager"
              fetchPriority="high"
              width="160"
              height="64"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/sell-your-land"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/sell-your-land') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Sell Your Land
            </Link>
            <Link
              to="/find-development-sites"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/find-development-sites') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Find Development Sites
            </Link>
            <Link
              to="/invest-in-land"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/invest-in-land') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Invest in Land
            </Link>
            
            {/* Tools Dropdown */}
            <div className="relative" onMouseLeave={() => setIsToolsOpen(false)}>
              <button
                onMouseEnter={() => setIsToolsOpen(true)}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-green-600 transition-colors"
              >
                Tools <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isToolsOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 border mt-1">
                  <Link to="/tools/roi-calculator" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    ROI Calculator
                  </Link>
                  <Link to="/tools/timeline" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Development Timeline
                  </Link>
                  <Link to="/tools/chapter-42" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Chapter 42 Planning Tool
                  </Link>
                  <Link to="/tools/smart-finder" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                    Smart Land Finder
                  </Link>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div className="relative" onMouseLeave={() => setIsLocationsOpen(false)}>
              <button
                onMouseEnter={() => setIsLocationsOpen(true)}
                onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-green-600 transition-colors"
              >
                Locations <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isLocationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLocationsOpen && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 border max-h-96 overflow-y-auto mt-1">
                  {cities.map((city) => (
                    <Link
                      key={city}
                      to={`/locations/${city.toLowerCase().replace(' ', '-')}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/about') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/contact') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-accent-600 to-accent-700 text-white px-4 xl:px-6 py-2 rounded-lg font-semibold hover:from-accent-700 hover:to-accent-800 hover:shadow-lg hover:shadow-accent-600/30 transition-all"
            >
              <span className="text-white font-bold bg-green-600 px-2 py-1 rounded mr-1">Get Cash</span> Offer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex flex-col">
              <Link 
                to="/" 
                onClick={handleMobileLinkClick}
                className={`px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors ${
                  isActive('/') ? 'bg-green-50 text-green-600 font-medium' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/sell-your-land" 
                onClick={handleMobileLinkClick}
                className={`px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors ${
                  isActive('/sell-your-land') ? 'bg-green-50 text-green-600 font-medium' : ''
                }`}
              >
                Sell Your Land
              </Link>
              <Link 
                to="/find-development-sites" 
                onClick={handleMobileLinkClick}
                className={`px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors ${
                  isActive('/find-development-sites') ? 'bg-green-50 text-green-600 font-medium' : ''
                }`}
              >
                Find Development Sites
              </Link>
              <Link 
                to="/invest-in-land" 
                onClick={handleMobileLinkClick}
                className={`px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors ${
                  isActive('/invest-in-land') ? 'bg-green-50 text-green-600 font-medium' : ''
                }`}
              >
                Invest in Land
              </Link>
              
              {/* Mobile Tools Dropdown */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  <span className="font-medium">Tools</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileToolsOpen && (
                  <div className="bg-gray-50">
                    <Link 
                      to="/tools/roi-calculator" 
                      onClick={handleMobileLinkClick}
                      className="block px-8 py-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      ROI Calculator
                    </Link>
                    <Link 
                      to="/tools/timeline" 
                      onClick={handleMobileLinkClick}
                      className="block px-8 py-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      Development Timeline
                    </Link>
                    <Link 
                      to="/tools/chapter-42" 
                      onClick={handleMobileLinkClick}
                      className="block px-8 py-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      Chapter 42 Planning Tool
                    </Link>
                    <Link 
                      to="/tools/smart-finder" 
                      onClick={handleMobileLinkClick}
                      className="block px-8 py-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      Smart Land Finder
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Locations Dropdown */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() => setIsMobileLocationsOpen(!isMobileLocationsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  <span className="font-medium">Locations</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isMobileLocationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileLocationsOpen && (
                  <div className="bg-gray-50 max-h-64 overflow-y-auto">
                    {cities.map((city) => (
                      <Link
                        key={city}
                        to={`/locations/${city.toLowerCase().replace(' ', '-')}`}
                        onClick={handleMobileLinkClick}
                        className="block px-8 py-3 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/about" 
                onClick={handleMobileLinkClick}
                className={`px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors border-t border-gray-100 ${
                  isActive('/about') ? 'bg-green-50 text-green-600 font-medium' : ''
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={handleMobileLinkClick}
                className={`px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors ${
                  isActive('/contact') ? 'bg-green-50 text-green-600 font-medium' : ''
                }`}
              >
                Contact
              </Link>
              
              <div className="px-4 pt-4 pb-2 border-t border-gray-100 mt-2">
                <Link
                  to="/contact"
                  onClick={handleMobileLinkClick}
                  className="block w-full bg-gradient-to-r from-accent-600 to-accent-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-accent-700 hover:to-accent-800 transition-all"
                >
                  <span className="text-white font-bold bg-green-600 px-2 py-1 rounded mr-1">Get Cash</span> Offer
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}