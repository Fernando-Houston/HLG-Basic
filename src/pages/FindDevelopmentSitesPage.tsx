import React, { useState } from 'react';
import { Search, MapPin, FileText, TrendingUp, Eye, Clock, DollarSign, Phone, Loader2, X, Users, Building, Home, CheckCircle, User, Mail, Calendar, Settings, Target, Layers, Star, Sparkles } from 'lucide-react';
import { submitDevelopmentSiteInquiry, DevelopmentSiteFormData } from '../utils/api';
import { usePageSEO, pageSEO } from '../utils/seo';

export function FindDevelopmentSitesPage() {
  usePageSEO(pageSEO.findDevelopmentSites);
  const [searchForm, setSearchForm] = useState({
    projectType: '',
    minAcreage: '',
    maxAcreage: '',
    budget: '',
    location: '',
    timeline: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalRequirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedDevelopmentType, setSelectedDevelopmentType] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const developmentData: DevelopmentSiteFormData = {
        projectType: searchForm.projectType as 'residential' | 'commercial' | 'mixed-use' | 'master-planned' | 'industrial' | 'other',
        minAcreage: searchForm.minAcreage ? parseInt(searchForm.minAcreage) : undefined,
        maxAcreage: searchForm.maxAcreage ? parseInt(searchForm.maxAcreage) : undefined,
        budgetRange: searchForm.budget as '500k-1m' | '1m-5m' | '5m-10m' | '10m-25m' | '25m+' | undefined,
        location: searchForm.location,
        timeline: searchForm.timeline as 'immediate' | 'short-term' | 'medium-term' | 'long-term' | 'exploring' | undefined,
        contactName: searchForm.contactName,
        contactEmail: searchForm.contactEmail,
        contactPhone: searchForm.contactPhone,
        additionalRequirements: searchForm.additionalRequirements
      };
      
      const response = await submitDevelopmentSiteInquiry(developmentData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll send you matching development opportunities within 24 hours.'
        });
        setSearchForm({
          projectType: '',
          minAcreage: '',
          maxAcreage: '',
          budget: '',
          location: '',
          timeline: '',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          additionalRequirements: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.error || 'Failed to submit your inquiry. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    {
      icon: Eye,
      title: "Off-Market Listings",
      description: "Access exclusive properties not available on public market"
    },
    {
      icon: FileText,
      title: "Complete Due Diligence",
      description: "Full property analysis including zoning, utilities, and permits"
    },
    {
      icon: TrendingUp,
      title: "Development Analysis",
      description: "ROI projections and market demand analysis for your project"
    },
    {
      icon: MapPin,
      title: "Market Intelligence",
      description: "Real-time data on Houston area development opportunities"
    }
  ];

  const developmentTypes = [
    {
      type: "Residential",
      minSize: "5 acres+",
      sweetSpot: "10-50 acres",
      description: "Single-family communities, townhomes, and residential developments",
      image: "/images/residential-development.jpg",
      icon: Home,
      detailDescription: "Residential developments range from single-family subdivisions to large master-planned communities. These projects typically require strategic planning for utilities, road access, and community amenities.",
      keyConsiderations: [
        "Zoning compliance and deed restrictions",
        "Utility availability and capacity",
        "School district quality and proximity",
        "Market demand and pricing analysis",
        "Environmental and flood plain considerations"
      ],
      typicalTimeline: "18-36 months from acquisition to first home sales",
      profitPotential: "15-25% IRR depending on location and market conditions"
    },
    {
      type: "Master Planned Communities",
      minSize: "100+ acres",
      sweetSpot: "200-500 acres",
      description: "Large-scale mixed-use communities with amenities",
      image: "/images/land-development.jpg",
      icon: Users,
      detailDescription: "Master planned communities are comprehensive developments that combine residential, commercial, and recreational elements to create complete living environments with long-term value appreciation.",
      keyConsiderations: [
        "Municipal utility district (MUD) formation",
        "Comprehensive master planning and phasing",
        "Amenity planning (pools, parks, trails)",
        "Mixed-use zoning and commercial integration",
        "Long-term community governance structure"
      ],
      typicalTimeline: "5-15 years for full build-out across multiple phases",
      profitPotential: "20-35% IRR with higher returns in later phases"
    },
    {
      type: "Commercial", 
      minSize: "2 acres+",
      sweetSpot: "5-25 acres",
      description: "Retail centers, office buildings, and mixed-use developments",
      image: "/images/commercial-development.jpg",
      icon: Building,
      detailDescription: "Commercial developments include retail centers, office complexes, and mixed-use projects that serve growing communities and business districts throughout the Houston area.",
      keyConsiderations: [
        "Traffic counts and visibility from major roads",
        "Demographic analysis and trade area study",
        "Anchor tenant requirements and leasing",
        "Parking ratios and site circulation",
        "Commercial zoning and use restrictions"
      ],
      typicalTimeline: "12-24 months from site preparation to tenant occupancy",
      profitPotential: "12-22% IRR with stable long-term cash flow"
    }
  ];

  const locations = [
    "Houston", "Katy", "Sugar Land", "The Woodlands", "Cypress", 
    "Pearland", "Spring", "Tomball", "Richmond", "Humble", "Kingwood", "Missouri City"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-70"
          style={{ backgroundImage: 'url(/images/land-development.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-green-800/50"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Find Premium
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-500">Development Sites</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Access 500+ exclusive off-market listings • Complete due diligence • $500K to $25M+ deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#search-form"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-50 hover:text-green-700 hover:shadow-lg hover:shadow-accent-400/20 transition-all flex items-center justify-center border-2 border-transparent hover:border-accent-300"
              >
                Find Development Sites <Search className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:7138283701"
                className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
              >
                Speak with Expert <Clock className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-16 w-12 h-12 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-8 w-10 h-10 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Development Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to identify, analyze, and acquire the perfect development site 
              for your project in the Greater Houston area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Development Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Types of Development
            </h2>
            <p className="text-xl text-gray-600">
              Learn about different development opportunities and what makes each type successful in the Houston market
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {developmentTypes.map((dev, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={dev.image} 
                    alt={dev.type}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{dev.type}</h3>
                    <p className="text-sm opacity-90">Sweet spot: {dev.sweetSpot}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-600">Minimum Size</span>
                    <span className="text-lg font-bold text-green-600">{dev.minSize}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{dev.description}</p>
                  <button 
                    onClick={() => setSelectedDevelopmentType(dev)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center"
                  >
                    Learn More Details <FileText className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Type Modal */}
      {selectedDevelopmentType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                <img 
                  src={selectedDevelopmentType.image} 
                  alt={selectedDevelopmentType.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-2">
                    {React.createElement(selectedDevelopmentType.icon, { className: "h-8 w-8 mr-3" })}
                    <h3 className="text-3xl font-bold">{selectedDevelopmentType.type}</h3>
                  </div>
                  <p className="text-lg opacity-90">Sweet spot: {selectedDevelopmentType.sweetSpot}</p>
                </div>
                <button
                  onClick={() => setSelectedDevelopmentType(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Overview</h4>
                    <p className="text-gray-700 mb-6">{selectedDevelopmentType.detailDescription}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Minimum Size</div>
                        <div className="text-lg font-bold text-green-600">{selectedDevelopmentType.minSize}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Sweet Spot</div>
                        <div className="text-lg font-bold text-green-600">{selectedDevelopmentType.sweetSpot}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Key Considerations</h4>
                    <ul className="space-y-3 mb-6">
                      {selectedDevelopmentType.keyConsiderations.map((consideration: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-green-600" />
                      Typical Timeline
                    </h5>
                    <p className="text-gray-700">{selectedDevelopmentType.typicalTimeline}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Profit Potential
                    </h5>
                    <p className="text-gray-700">{selectedDevelopmentType.profitPotential}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#search-form"
                    onClick={() => setSelectedDevelopmentType(null)}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold text-center hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center"
                  >
                    Find Sites for This Type <Search className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="tel:7138283701"
                    className="bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold text-center hover:bg-green-50 transition-all flex items-center justify-center"
                  >
                    Discuss This Project <Phone className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Form */}
      <section id="search-form" className="py-20 bg-gradient-to-br from-amber-50 via-white to-green-50 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-amber-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-16 w-24 h-24 bg-gradient-to-br from-green-400/10 to-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-8 w-16 h-16 bg-gradient-to-br from-amber-300/10 to-amber-400/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/10 to-green-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
          
          {/* Decorative geometric shapes */}
          <div className="absolute top-40 right-20 w-4 h-4 bg-amber-400/20 rotate-45 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-400/20 rotate-12 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-6 shadow-lg shadow-amber-400/25">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Development Site</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tell us about your project and we'll send you matching opportunities from our exclusive inventory within 24 hours.
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">1</div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Project Details</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded-full">
                  <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">2</div>
                  <span className="ml-2 text-sm font-medium text-gray-500">Contact Info</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">3</div>
                  <span className="ml-2 text-sm font-medium text-gray-500">Get Results</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl shadow-gray-900/10 border border-white/50 relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-green-500/5 rounded-3xl"></div>
              
              <div className="relative">
                {/* Project Details Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Building className="h-4 w-4 mr-2 text-amber-500" />
                        Project Type *
                      </label>
                      <div className="relative">
                        <select
                          name="projectType"
                          value={searchForm.projectType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select project type</option>
                          <option value="residential">Residential Development</option>
                          <option value="commercial">Commercial Development</option>
                          <option value="mixed-use">Mixed-Use Development</option>
                          <option value="master-planned">Master Planned Community</option>
                          <option value="industrial">Industrial/Warehouse</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <MapPin className="h-4 w-4 mr-2 text-green-500" />
                        Preferred Location
                      </label>
                      <div className="relative">
                        <select
                          name="location"
                          value={searchForm.location}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Any location</option>
                          {locations.map(location => (
                            <option key={location} value={location.toLowerCase()}>{location}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Target className="h-4 w-4 mr-2 text-blue-500" />
                        Minimum Acreage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="minAcreage"
                          value={searchForm.minAcreage}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                          placeholder="5"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                          acres
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Layers className="h-4 w-4 mr-2 text-purple-500" />
                        Maximum Acreage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="maxAcreage"
                          value={searchForm.maxAcreage}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                          placeholder="50"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                          acres
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        Budget Range
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={searchForm.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select budget range</option>
                          <option value="500k-1m">$500K - $1M</option>
                          <option value="1m-5m">$1M - $5M</option>
                          <option value="5m-10m">$5M - $10M</option>
                          <option value="10m-25m">$10M - $25M</option>
                          <option value="25m+">$25M+</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                        Timeline
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={searchForm.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Ready to purchase (0-3 months)</option>
                          <option value="short-term">Short term (3-6 months)</option>
                          <option value="medium-term">Medium term (6-12 months)</option>
                          <option value="long-term">Long term (12+ months)</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Section */}
                <div className="mt-10 pt-8 border-t border-gradient-to-r from-amber-200 via-gray-200 to-green-200">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={searchForm.contactName}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Mail className="h-4 w-4 mr-2 text-red-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={searchForm.contactEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={searchForm.contactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="(713) 828-3701"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <FileText className="h-4 w-4 mr-2 text-purple-500" />
                        Additional Requirements
                      </label>
                      <textarea
                        name="additionalRequirements"
                        value={searchForm.additionalRequirements}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md resize-none"
                        placeholder="Any specific requirements or preferences..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Status Messages */}
                {submitStatus && (
                  <div className={`mt-8 p-6 rounded-2xl shadow-lg ${submitStatus.type === 'success' ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-2 border-green-200' : 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-2 border-red-200'}`}>
                    <div className="flex items-center">
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 mr-2 text-red-600" />
                      )}
                      {submitStatus.message}
                    </div>
                  </div>
                )}
                
                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:via-amber-700 hover:to-orange-600 text-white py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-2xl shadow-amber-500/25 hover:shadow-3xl hover:shadow-amber-500/40 hover:scale-[1.02] transform group relative overflow-hidden"
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-6 w-6 mr-3" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                        <span>Find Matching Development Sites</span>
                        <Search className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl border border-amber-200/50">
                    <Clock className="h-5 w-5 mr-2 text-amber-600" />
                    <p className="text-sm font-medium text-gray-700">
                      We'll send you exclusive opportunities matching your criteria within 
                      <span className="text-amber-600 font-bold"> 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Stats & Trust Indicators */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by 500+ Developers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-700">Developer Network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24hr</div>
              <div className="text-gray-700">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$483M+</div>
              <div className="text-gray-700">Deals Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Next Development Site?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get access to our exclusive inventory of off-market development opportunities. 
            Our team of experts will help you find and analyze the perfect site for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7138283701"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Call (713) 828-3701 <Phone className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#search-form"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
            >
              Start Your Search <DollarSign className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}