import React, { useState } from 'react';
import { TrendingUp, Shield, Users, Target, DollarSign, FileText, Phone, Loader2, X, CheckCircle, Clock, BarChart3, Handshake, Building2, User, Mail, Sparkles, Star } from 'lucide-react';
import { submitInvestmentInquiry, InvestmentInquiryFormData } from '../utils/api';
import { usePageSEO, pageSEO } from '../utils/seo';

export function InvestInLandPage() {
  usePageSEO(pageSEO.investInLand);
  const [investorForm, setInvestorForm] = useState({
    name: '',
    email: '',
    phone: '',
    investmentLevel: '',
    experience: '',
    timeline: '',
    interests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const investmentData: InvestmentInquiryFormData = {
        name: investorForm.name,
        email: investorForm.email,
        phone: investorForm.phone,
        investmentLevel: investorForm.investmentLevel as '100k-250k' | '250k-500k' | '500k-1m' | '1m+',
        experience: investorForm.experience as 'beginner' | 'some' | 'experienced' | 'professional' | undefined,
        timeline: investorForm.timeline as 'immediate' | '1-3 months' | '3-6 months' | '6+ months' | 'exploring' | undefined,
        interests: investorForm.interests
      };
      
      const response = await submitInvestmentInquiry(investmentData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! An investment specialist will contact you within 24 hours to discuss opportunities.'
        });
        setInvestorForm({
          name: '',
          email: '',
          phone: '',
          investmentLevel: '',
          experience: '',
          timeline: '',
          interests: ''
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
    setInvestorForm({
      ...investorForm,
      [e.target.name]: e.target.value
    });
  };

  const investmentLevels = [
    {
      type: "Joint Ventures",
      minimum: "$500K+",
      description: "Partner with us on large development projects with shared equity and returns",
      benefits: ["Shared risk and reward", "Active project involvement", "Higher return potential", "Development expertise included"],
      icon: Handshake,
      detailDescription: "Joint ventures represent the highest level of partnership where you work directly with our development team as an equity partner. You'll have active involvement in major project decisions and share in both the risks and substantial rewards of large-scale Houston area developments.",
      keyFeatures: [
        "Direct equity participation in development projects",
        "Active involvement in project decisions and strategy",
        "Access to our development pipeline and expertise",
        "Shared profits based on project performance",
        "Typically 24-48 month investment horizons"
      ],
      riskProfile: "High risk, high reward - suitable for experienced investors",
      expectedReturns: "25-40% IRR depending on project success",
      investmentProcess: "Due diligence period, partnership agreement, project milestones, profit distributions",
      idealFor: "Experienced investors seeking active involvement and maximum returns"
    },
    {
      type: "Preferred Equity",
      minimum: "$250K+",
      description: "Priority returns with lower risk profile for passive investors",
      benefits: ["Priority distributions", "Passive investment", "Predictable returns", "Lower risk profile"],
      icon: Shield,
      detailDescription: "Preferred equity positions offer priority returns ahead of common equity holders, providing a more stable investment with predictable cash flows. This passive investment structure is ideal for investors seeking steady returns without active involvement.",
      keyFeatures: [
        "Priority distributions before common equity",
        "Fixed preferred return rate (typically 8-12%)",
        "Passive investment requiring no active management",
        "Quarterly or annual distribution schedules",
        "Downside protection through priority position"
      ],
      riskProfile: "Moderate risk with downside protection",
      expectedReturns: "12-18% IRR with preferred return guarantees",
      investmentProcess: "Investment commitment, preferred equity documentation, regular distributions",
      idealFor: "Investors seeking steady returns with lower risk tolerance"
    },
    {
      type: "Syndications",
      minimum: "$100K+",
      description: "Pool investments with other investors for diversified land portfolios",
      benefits: ["Portfolio diversification", "Professional management", "Lower minimum investment", "Quarterly distributions"],
      icon: Users,
      detailDescription: "Syndicated investments allow you to pool resources with other investors to access larger, more diversified development opportunities. Our professional management team handles all aspects while you receive regular distributions from a portfolio of properties.",
      keyFeatures: [
        "Diversified portfolio across multiple properties",
        "Professional asset management included",
        "Lower minimum investment thresholds",
        "Regular quarterly distribution payments",
        "Detailed performance reporting and updates"
      ],
      riskProfile: "Moderate risk through diversification",
      expectedReturns: "15-22% IRR across diversified portfolio",
      investmentProcess: "Syndication offering, investment commitment, ongoing management, distributions",
      idealFor: "Investors wanting diversification with professional management"
    },
    {
      type: "Debt Investments",
      minimum: "$100K+",
      description: "Secure lending opportunities backed by Houston area land assets",
      benefits: ["Fixed returns", "Asset-backed security", "Short-term options", "Regular interest payments"],
      icon: Building2,
      detailDescription: "Debt investments provide fixed-income opportunities secured by Houston area land assets. These investments offer predictable returns with asset-backed security, making them ideal for conservative investors seeking steady income with lower risk exposure.",
      keyFeatures: [
        "Fixed interest rates with predictable returns",
        "Asset-backed security with land collateral",
        "Shorter investment terms (12-36 months typically)",
        "Monthly or quarterly interest payments",
        "First lien position on valuable land assets"
      ],
      riskProfile: "Lower risk with asset-backed security",
      expectedReturns: "8-14% annual returns with regular interest payments",
      investmentProcess: "Loan documentation, asset evaluation, funding, regular interest payments",
      idealFor: "Conservative investors seeking fixed income with asset security"
    }
  ];

  const performanceMetrics = [
    {
      metric: "Average IRR",
      value: "18%+",
      description: "Internal Rate of Return across all projects"
    },
    {
      metric: "Project Success Rate",
      value: "96%",
      description: "Projects completed on time and budget"
    },
    {
      metric: "Average Hold Period",
      value: "18-24 months",
      description: "Typical investment timeline"
    },
    {
      metric: "Total Returns",
      value: "$85M+",
      description: "Distributed to investors since inception"
    }
  ];

  const advantages = [
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "15+ years and $483M+ in successful land transactions with consistent investor returns."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive due diligence and market analysis to minimize investment risks."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals handling every aspect from acquisition to exit."
    },
    {
      icon: Target,
      title: "Market Focus",
      description: "Deep expertise in Greater Houston market with exclusive deal flow."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-70"
          style={{ backgroundImage: 'url(/images/investment-handshake.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/40 to-green-900/60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Invest in Houston
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-500">Land Opportunities</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              18%+ average IRR • Proven track record • Expert guidance • Multiple investment levels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#investment-form"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-50 hover:text-green-700 hover:shadow-lg hover:shadow-accent-400/20 transition-all flex items-center justify-center border-2 border-transparent hover:border-accent-300"
              >
                Start Investing <TrendingUp className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:7138283701"
                className="bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-800 hover:to-green-900 hover:shadow-lg hover:shadow-green-800/30 transition-all flex items-center justify-center border-2 border-green-600/30"
              >
                Speak with Advisor <Phone className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-16 w-12 h-12 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-8 w-10 h-10 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Performance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven track record speaks for itself. See why investors trust Houston Land Guy 
              for their land investment portfolios.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, index) => {
              const isHighlight = index === 0 || index === 3; // Highlight IRR and Total Returns
              return (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-lg hover:shadow-green-600/10 transition-all group">
                  <div className={`text-4xl font-bold mb-2 ${isHighlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-700' : 'text-green-600'}`}>
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{metric.metric}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Levels */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Choose the investment level that matches your goals and risk tolerance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentLevels.map((level, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-green-600/10 transition-all group border border-gray-100">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{level.type}</h3>
                      {index < 2 && (
                        <span className="inline-block bg-accent-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold mt-1 shadow-sm">
                          {index === 0 ? 'HIGHEST ROI' : 'LOWER RISK'}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Minimum Investment</div>
                      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">{level.minimum}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{level.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {level.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setSelectedInvestmentType(level)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:shadow-green-600/30 transform hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="flex items-center justify-center">
                      Learn More
                      <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Type Modal */}
      {selectedInvestmentType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-t-2xl text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    {React.createElement(selectedInvestmentType.icon, { className: "h-10 w-10 mr-4" })}
                    <div>
                      <h3 className="text-xl font-bold">{selectedInvestmentType.type}</h3>
                      <p className="text-green-100 text-lg">Minimum Investment: {selectedInvestmentType.minimum}</p>
                    </div>
                  </div>
                  <p className="text-xl text-green-100">{selectedInvestmentType.description}</p>
                </div>
                <button
                  onClick={() => setSelectedInvestmentType(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Overview</h4>
                    <p className="text-gray-700 mb-6">{selectedInvestmentType.detailDescription}</p>
                    
                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-green-600" />
                        Ideal For
                      </h5>
                      <p className="text-gray-700">{selectedInvestmentType.idealFor}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-3 mb-6">
                      {selectedInvestmentType.keyFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                      Expected Returns
                    </h5>
                    <p className="text-gray-700">{selectedInvestmentType.expectedReturns}</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-600" />
                      Risk Profile
                    </h5>
                    <p className="text-gray-700">{selectedInvestmentType.riskProfile}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-green-600" />
                    Investment Process
                  </h5>
                  <p className="text-gray-700">{selectedInvestmentType.investmentProcess}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#investment-form"
                    onClick={() => setSelectedInvestmentType(null)}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold text-center hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center"
                  >
                    Get Started with This Investment <TrendingUp className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="tel:7138283701"
                    className="bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold text-center hover:bg-green-50 transition-all flex items-center justify-center"
                  >
                    Discuss This Investment <Phone className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment Form */}
      <section id="investment-form" className="py-20 bg-gradient-to-br from-amber-50 via-white to-green-50 relative overflow-hidden">
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
                Start Your 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Investment Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with our investment team to explore opportunities that match your goals and build wealth through strategic land investments.
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">1</div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Investment Profile</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded-full">
                  <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">2</div>
                  <span className="ml-2 text-sm font-medium text-gray-500">Contact Details</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">3</div>
                  <span className="ml-2 text-sm font-medium text-gray-500">Get Connected</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl shadow-gray-900/10 border border-white/50 relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-green-500/5 rounded-3xl"></div>
              
              <div className="relative">
                {/* Contact Information Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <User className="h-4 w-4 mr-2 text-amber-500" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={investorForm.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Mail className="h-4 w-4 mr-2 text-red-500" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={investorForm.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={investorForm.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="(713) 828-3701"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        Investment Level *
                      </label>
                      <div className="relative">
                        <select
                          name="investmentLevel"
                          value={investorForm.investmentLevel}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select investment level</option>
                          <option value="100k-250k">$100K - $250K</option>
                          <option value="250k-500k">$250K - $500K</option>
                          <option value="500k-1m">$500K - $1M</option>
                          <option value="1m+">$1M+</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
                        Investment Experience
                      </label>
                      <div className="relative">
                        <select
                          name="experience"
                          value={investorForm.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select experience level</option>
                          <option value="beginner">New to real estate investing</option>
                          <option value="some">Some real estate experience</option>
                          <option value="experienced">Experienced investor</option>
                          <option value="professional">Professional/Institutional</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                        Investment Timeline
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={investorForm.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Ready to invest now</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                        Investment Interests
                      </label>
                      <textarea
                        name="interests"
                        value={investorForm.interests}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md resize-none"
                        placeholder="Tell us about your investment goals and interests..."
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
                        <span>Connect with Investment Team</span>
                      </>
                    )}
                  </button>
                </div>
              
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>Accredited investors only. All investments subject to risk and due diligence review.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Wealth Through Land?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our exclusive group of investors earning 18%+ returns on Houston area land developments. 
            Limited opportunities available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7138283701"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Schedule Call <Phone className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#investment-form"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
            >
              View Opportunities <DollarSign className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}