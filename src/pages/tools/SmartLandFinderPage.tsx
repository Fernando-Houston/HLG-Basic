import { useState } from 'react';
import { Brain, Search, TrendingUp, MapPin, DollarSign, Users, Target, Zap, Loader2 } from 'lucide-react';
import { searchLandOpportunities, SmartFinderCriteria, SmartFinderResults } from '../../utils/api';
import { usePageSEO, pageSEO } from '../../utils/seo';

export function SmartLandFinderPage() {
  usePageSEO(pageSEO.smartLandFinder);
  const [criteria, setCriteria] = useState({
    projectType: '',
    budget: '',
    minAcreage: '',
    maxAcreage: '',
    timeline: '',
    preferredLocation: '',
    riskTolerance: '',
    targetROI: ''
  });

  const [results, setResults] = useState<SmartFinderResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCriteria({
      ...criteria,
      [e.target.name]: e.target.value
    });
  };

  const analyzeOpportunities = async () => {
    if (!criteria.projectType || !criteria.budget) {
      alert('Please fill in project type and budget');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const searchCriteria: SmartFinderCriteria = {
        projectType: criteria.projectType as 'residential' | 'commercial' | 'mixed-use' | 'master-planned',
        budget: criteria.budget as '1m-3m' | '3m-5m' | '5m-10m' | '10m+',
        minAcreage: criteria.minAcreage ? parseInt(criteria.minAcreage) : undefined,
        maxAcreage: criteria.maxAcreage ? parseInt(criteria.maxAcreage) : undefined,
        timeline: criteria.timeline as 'immediate' | 'short-term' | 'medium-term' | 'long-term' | 'exploring' | undefined,
        preferredLocation: criteria.preferredLocation as 'northwest' | 'southwest' | 'northeast' | 'southeast' | 'suburban' | undefined,
        riskTolerance: criteria.riskTolerance as 'low' | 'medium' | 'high' | undefined,
        targetROI: criteria.targetROI ? parseFloat(criteria.targetROI) : undefined
      };
      
      const response = await searchLandOpportunities(searchCriteria);
      
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        alert(response.error || 'Failed to analyze opportunities. Please try again.');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">AI-Powered Smart Land Finder</h1>
            </div>
            <p className="text-xl mb-8">
              Advanced AI analysis to identify optimal development opportunities in the Houston market
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                <span>AI Market Analysis</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span>ROI Projections</span>
              </div>
              <div className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                <span>Competition Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Criteria Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Criteria</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={criteria.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential Development</option>
                    <option value="commercial">Commercial Development</option>
                    <option value="mixed-use">Mixed-Use Development</option>
                    <option value="master-planned">Master Planned Community</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    value={criteria.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select budget range</option>
                    <option value="1m-3m">$1M - $3M</option>
                    <option value="3m-5m">$3M - $5M</option>
                    <option value="5m-10m">$5M - $10M</option>
                    <option value="10m+">$10M+</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Acres
                    </label>
                    <input
                      type="number"
                      name="minAcreage"
                      value={criteria.minAcreage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Acres
                    </label>
                    <input
                      type="number"
                      name="maxAcreage"
                      value={criteria.maxAcreage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={criteria.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Any timeline</option>
                    <option value="immediate">Ready to purchase (0-3 months)</option>
                    <option value="short-term">Short term (3-6 months)</option>
                    <option value="medium-term">Medium term (6-12 months)</option>
                    <option value="long-term">Long term (12+ months)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <select
                    name="preferredLocation"
                    value={criteria.preferredLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Any location</option>
                    <option value="northwest">Northwest Houston</option>
                    <option value="southwest">Southwest Houston</option>
                    <option value="northeast">Northeast Houston</option>
                    <option value="southeast">Southeast Houston</option>
                    <option value="suburban">Suburban Communities</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Tolerance
                  </label>
                  <select
                    name="riskTolerance"
                    value={criteria.riskTolerance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select risk level</option>
                    <option value="low">Low Risk (Established areas)</option>
                    <option value="medium">Medium Risk (Growing areas)</option>
                    <option value="high">High Risk (Emerging areas)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target ROI (%)
                  </label>
                  <input
                    type="number"
                    name="targetROI"
                    value={criteria.targetROI}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="18"
                  />
                </div>
                
                <button
                  onClick={analyzeOpportunities}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-green-800 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Analyzing Market Data...
                    </>
                  ) : (
                    <>
                      Find Opportunities <Search className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2">
            {!results ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Land Analysis</h3>
                <p className="text-gray-500 mb-6">Enter your criteria to discover optimal development opportunities using our advanced AI analysis</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <span>Market Analysis</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <span>ROI Scoring</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <span>Competition Level</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                    </div>
                    <span>Location Scoring</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Market Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">AI Analysis Results</h2>
                    <div className="text-sm text-gray-500">
                      Analysis Date: {new Date(results.generatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{results.opportunities.length}</div>
                      <div className="text-sm text-purple-800">Opportunities Found</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">{Math.round(results.opportunities.reduce((sum, opp) => sum + parseInt(opp.projectedROI), 0) / results.opportunities.length)}%</div>
                      <div className="text-sm text-green-800">Average ROI</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">{results.marketAnalysis.overallTrend}</div>
                      <div className="text-sm text-blue-800">Market Trend</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">Favorable</div>
                      <div className="text-sm text-yellow-800">Buying Conditions</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">AI Recommendations</h3>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-blue-800">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Top Opportunities */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Top Opportunities</h2>
                  
                  {results.opportunities.map((opportunity, index: number) => (
                    <div key={opportunity.id} className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-bold text-gray-900 mr-4">
                              #{index + 1} - {opportunity.location}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              getRiskColor(opportunity.riskLevel)
                            }`}>
                              {opportunity.riskLevel} Risk
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span>{opportunity.acreage} acres</span>
                            <span>{formatCurrency(opportunity.totalPrice)}</span>
                            <span>{opportunity.timeline}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600 mb-1">
                            {opportunity.projectedROI}
                          </div>
                          <div className="text-sm text-gray-600">Projected ROI</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                          <ul className="space-y-2">
                            {opportunity.advantages.map((advantage: string, i: number) => (
                              <li key={i} className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-700">{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Market Metrics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Market Score:</span>
                              <span className="font-medium">{opportunity.marketScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Price per Acre:</span>
                              <span className="font-medium">{formatCurrency(opportunity.pricePerAcre)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Zoning:</span>
                              <span className="font-medium">{opportunity.zoning}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Level:</span>
                              <span className="font-medium">{opportunity.riskLevel}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6 pt-6 border-t">
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            getRiskColor(opportunity.riskLevel)
                          }`}>
                            {opportunity.riskLevel} Risk
                          </span>
                          <span className="text-sm text-gray-600">
                            Market Score: {opportunity.marketScore}/100
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            View Details
                          </button>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-green-700 text-white rounded-lg hover:from-purple-700 hover:to-green-800 transition-all">
                            Get More Info
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}