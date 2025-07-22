import { useState } from 'react';
import { Search, MapPin, FileText, TrendingUp, Eye, Clock, DollarSign, Phone, Loader2 } from 'lucide-react';
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
      image: "/images/residential-development.jpg"
    },
    {
      type: "Master Planned Communities",
      minSize: "100+ acres",
      sweetSpot: "200-500 acres",
      description: "Large-scale mixed-use communities with amenities",
      image: "/images/land-development.jpg"
    },
    {
      type: "Commercial", 
      minSize: "2 acres+",
      sweetSpot: "5-25 acres",
      description: "Retail centers, office buildings, and mixed-use developments",
      image: "/images/commercial-development.jpg"
    }
  ];

  const locations = [
    "Houston", "Katy", "Sugar Land", "The Woodlands", "Cypress", 
    "Pearland", "Spring", "Tomball", "Richmond", "Humble", "Kingwood", "Missouri City"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: 'url(/images/land-development.jpg)' }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Find Premium
              <span className="block text-green-200">Development Sites</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Access 500+ exclusive off-market listings • Complete due diligence • $500K to $25M+ deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#search-form"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
              >
                Find Development Sites <Search className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:7135550000"
                className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
              >
                Speak with Expert <Clock className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
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
              Development Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              From residential communities to commercial centers, we have sites for every development type
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
                  <p className="text-gray-700">{dev.description}</p>
                  <button className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all">
                    View Available Sites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section id="search-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Perfect Development Site
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your project and we'll send you matching opportunities from our exclusive inventory.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={searchForm.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential Development</option>
                    <option value="commercial">Commercial Development</option>
                    <option value="mixed-use">Mixed-Use Development</option>
                    <option value="master-planned">Master Planned Community</option>
                    <option value="industrial">Industrial/Warehouse</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <select
                    name="location"
                    value={searchForm.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                  >
                    <option value="">Any location</option>
                    {locations.map(location => (
                      <option key={location} value={location.toLowerCase()}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Acreage
                  </label>
                  <input
                    type="number"
                    name="minAcreage"
                    value={searchForm.minAcreage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Acreage
                  </label>
                  <input
                    type="number"
                    name="maxAcreage"
                    value={searchForm.maxAcreage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    placeholder="50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={searchForm.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                  >
                    <option value="">Select budget range</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m-10m">$5M - $10M</option>
                    <option value="10m-25m">$10M - $25M</option>
                    <option value="25m+">$25M+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={searchForm.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready to purchase (0-3 months)</option>
                    <option value="short-term">Short term (3-6 months)</option>
                    <option value="medium-term">Medium term (6-12 months)</option>
                    <option value="long-term">Long term (12+ months)</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={searchForm.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={searchForm.contactEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={searchForm.contactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="(713) 555-0123"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      name="additionalRequirements"
                      value={searchForm.additionalRequirements}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="Any specific requirements or preferences..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Status Messages */}
              {submitStatus && (
                <div className={`mt-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Submitting Request...
                    </>
                  ) : (
                    'Find Matching Development Sites'
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>We'll send you exclusive opportunities matching your criteria within 24 hours.</p>
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
              href="tel:7135550000"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Call (713) 555-LAND <Phone className="ml-2 h-5 w-5" />
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