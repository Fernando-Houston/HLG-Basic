import { useState } from 'react';
import { TrendingUp, Shield, Users, Target, DollarSign, FileText, Phone, Loader2 } from 'lucide-react';
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
      benefits: ["Shared risk and reward", "Active project involvement", "Higher return potential", "Development expertise included"]
    },
    {
      type: "Preferred Equity",
      minimum: "$250K+",
      description: "Priority returns with lower risk profile for passive investors",
      benefits: ["Priority distributions", "Passive investment", "Predictable returns", "Lower risk profile"]
    },
    {
      type: "Syndications",
      minimum: "$100K+",
      description: "Pool investments with other investors for diversified land portfolios",
      benefits: ["Portfolio diversification", "Professional management", "Lower minimum investment", "Quarterly distributions"]
    },
    {
      type: "Debt Investments",
      minimum: "$100K+",
      description: "Secure lending opportunities backed by Houston area land assets",
      benefits: ["Fixed returns", "Asset-backed security", "Short-term options", "Regular interest payments"]
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
                      <h3 className="text-2xl font-bold text-gray-900">{level.type}</h3>
                      {index < 2 && (
                        <span className="inline-block bg-accent-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold mt-1 shadow-sm">
                          {index === 0 ? 'HIGHEST ROI' : 'LOWER RISK'}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Minimum Investment</div>
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">{level.minimum}</div>
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
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:shadow-green-600/30 transform hover:-translate-y-0.5 transition-all group">
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

      {/* Why Invest With Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Invest With Houston Land Guy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise, market knowledge, and proven systems provide investors with 
              exceptional opportunities in the Houston land market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Investment Process
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Consultation</h3>
                <p className="text-gray-600 text-sm">Discuss your investment goals and risk tolerance</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Diligence</h3>
                <p className="text-gray-600 text-sm">Review investment materials and property details</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Commitment</h3>
                <p className="text-gray-600 text-sm">Complete documentation and fund your investment</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Updates</h3>
                <p className="text-gray-600 text-sm">Regular progress reports and distribution payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Form */}
      <section id="investment-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Start Your Investment Journey
              </h2>
              <p className="text-xl text-gray-600">
                Connect with our investment team to explore opportunities that match your goals.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={investorForm.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={investorForm.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={investorForm.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="(713) 828-3701"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Level *
                  </label>
                  <select
                    name="investmentLevel"
                    value={investorForm.investmentLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select investment level</option>
                    <option value="100k-250k">$100K - $250K</option>
                    <option value="250k-500k">$250K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Experience
                  </label>
                  <select
                    name="experience"
                    value={investorForm.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">New to real estate investing</option>
                    <option value="some">Some real estate experience</option>
                    <option value="experienced">Experienced investor</option>
                    <option value="professional">Professional/Institutional</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Timeline
                  </label>
                  <select
                    name="timeline"
                    value={investorForm.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready to invest now</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Interests
                  </label>
                  <textarea
                    name="interests"
                    value={investorForm.interests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us about your investment goals and interests..."
                  ></textarea>
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
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Submitting Request...
                    </>
                  ) : (
                    'Connect with Investment Team'
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Accredited investors only. All investments subject to risk and due diligence review.</p>
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