import { useParams } from 'react-router-dom';
import { MapPin, TrendingUp, Home, Building, Users, DollarSign } from 'lucide-react';
import { usePageSEO, pageSEO } from '../utils/seo';

export function LocationPage() {
  usePageSEO(pageSEO.location);
  const { city } = useParams<{ city: string }>();
  
  // Convert URL parameter back to display name
  const cityName = city?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Houston';

  // Mock data for different cities - in a real app, this would come from an API
  const locationData = {
    'Houston': {
      population: '2.3M',
      medianHome: '$285K',
      growthRate: '2.8%',
      marketType: 'Urban Core',
      description: 'The heart of Texas business and culture, Houston offers diverse development opportunities from urban infill to suburban expansion.',
      highlights: [
        'Largest city in Texas with diverse economy',
        'Major employment centers and business districts',
        'Extensive transportation infrastructure',
        'Growing downtown and midtown markets'
      ],
      developmentOpportunities: [
        'Urban infill projects',
        'Mixed-use developments',
        'Commercial redevelopment',
        'Transit-oriented development'
      ],
      marketStats: {
        averageLandPrice: '$125,000',
        developmentCosts: '$95/sqft',
        expectedROI: '16-22%',
        timeToMarket: '18-24 months'
      }
    },
    'Katy': {
      population: '21,000',
      medianHome: '$425K',
      growthRate: '4.2%',
      marketType: 'Suburban Growth',
      description: 'Fast-growing suburban community known for excellent schools and family-friendly developments.',
      highlights: [
        'Top-rated school districts',
        'Family-oriented community',
        'Strong residential demand',
        'Excellent highway access'
      ],
      developmentOpportunities: [
        'Single-family subdivisions',
        'Luxury home communities',
        'Retail and commercial',
        'Mixed-use village centers'
      ],
      marketStats: {
        averageLandPrice: '$185,000',
        developmentCosts: '$115/sqft',
        expectedROI: '18-25%',
        timeToMarket: '15-20 months'
      }
    },
    'The Woodlands': {
      population: '115,000',
      medianHome: '$485K',
      growthRate: '3.1%',
      marketType: 'Master Planned',
      description: 'Premier master-planned community with high-end residential and commercial opportunities.',
      highlights: [
        'Master-planned community excellence',
        'High-income demographics',
        'Corporate headquarters location',
        'Luxury market positioning'
      ],
      developmentOpportunities: [
        'Luxury residential',
        'Executive office parks',
        'Upscale retail centers',
        'Premium mixed-use'
      ],
      marketStats: {
        averageLandPrice: '$275,000',
        developmentCosts: '$135/sqft',
        expectedROI: '15-20%',
        timeToMarket: '20-30 months'
      }
    }
  };

  const currentLocation = locationData[cityName as keyof typeof locationData] || locationData['Houston'];

  const nearbyOpportunities = [
    {
      title: `${cityName} Residential Development`,
      size: '25 acres',
      price: '$3.2M',
      type: 'Single Family',
      status: 'Available',
      roi: '22%'
    },
    {
      title: `${cityName} Commercial Site`,
      size: '8.5 acres',
      price: '$1.8M',
      type: 'Retail/Office',
      status: 'Under Contract',
      roi: '18%'
    },
    {
      title: `${cityName} Mixed-Use Opportunity`,
      size: '15 acres',
      price: '$4.5M',
      type: 'Mixed-Use',
      status: 'Available',
      roi: '20%'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-60"
          style={{ backgroundImage: 'url(/images/houston-skyline.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/50 to-green-800/70"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-12 w-12 mr-4 drop-shadow-lg" />
              <h1 className="text-4xl lg:text-6xl font-bold drop-shadow-2xl">
                <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">{cityName}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] font-black text-2xl lg:text-3xl mt-2">
                  Land Development Opportunities
                </span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Discover prime development opportunities in {cityName}'s growing market
            </p>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {cityName} Market Overview
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {currentLocation.description}
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Market Highlights</h3>
                  <ul className="space-y-2">
                    {currentLocation.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <Users className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-1">{currentLocation.population}</div>
                  <div className="text-sm text-blue-800">Population</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <Home className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-1">{currentLocation.medianHome}</div>
                  <div className="text-sm text-green-800">Median Home Price</div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">{currentLocation.growthRate}</div>
                  <div className="text-sm text-purple-800">Annual Growth</div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <Building className="h-8 w-8 text-yellow-600 mb-3" />
                  <div className="text-xl font-bold text-yellow-600 mb-1">{currentLocation.marketType}</div>
                  <div className="text-sm text-yellow-800">Market Type</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Development Opportunities in {cityName}
              </h2>
              <p className="text-xl text-gray-600">
                Prime development types suited for the {cityName} market
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {currentLocation.developmentOpportunities.map((opportunity, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity}</h3>
                  <p className="text-gray-600 text-sm">High demand development type in {cityName}</p>
                </div>
              ))}
            </div>
            
            {/* Market Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {cityName} Development Metrics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{currentLocation.marketStats.averageLandPrice}</div>
                  <div className="text-sm text-gray-600">Avg Land Price/Acre</div>
                </div>
                
                <div className="text-center">
                  <Building className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{currentLocation.marketStats.developmentCosts}</div>
                  <div className="text-sm text-gray-600">Development Cost/SqFt</div>
                </div>
                
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{currentLocation.marketStats.expectedROI}</div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                </div>
                
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{currentLocation.marketStats.timeToMarket}</div>
                  <div className="text-sm text-gray-600">Time to Market</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Opportunities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Current Opportunities in {cityName}
              </h2>
              <p className="text-xl text-gray-600">
                Exclusive development sites available now
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {nearbyOpportunities.map((opportunity, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-green-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Building className="h-16 w-16 opacity-50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        opportunity.status === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {opportunity.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{opportunity.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">{opportunity.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{opportunity.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projected ROI:</span>
                        <span className="font-medium text-green-600">{opportunity.roi}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all">
                      Get More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Invest in {cityName}?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't miss out on {cityName}'s growing development opportunities. 
            Contact our local experts for exclusive access to off-market deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Contact Local Expert
            </a>
            <a
              href="/find-development-sites"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all"
            >
              View All Opportunities
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}