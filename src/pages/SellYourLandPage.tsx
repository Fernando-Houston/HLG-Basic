import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Clock, CheckCircle, ArrowRight, Calculator, Phone, Mail, Loader2, User, MapPin, Home, FileText, Sparkles, Star, Calendar, X } from 'lucide-react';
import { submitSellLandForm, SellLandFormData } from '../utils/api';
import { usePageSEO, pageSEO } from '../utils/seo';

export function SellYourLandPage() {
  usePageSEO(pageSEO.sellYourLand);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    acreage: '',
    propertyType: '',
    timeline: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const sellLandData: SellLandFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        propertyAddress: formData.propertyAddress,
        propertyType: formData.propertyType,
        acreage: formData.acreage,
        timeline: formData.timeline as 'ASAP' | '1-3 months' | '3-6 months' | '6+ months' | 'Just exploring',
        additionalInfo: formData.additionalInfo
      };
      
      const response = await submitSellLandForm(sellLandData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll contact you within 48 hours with your cash offer.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyAddress: '',
          acreage: '',
          propertyType: '',
          timeline: '',
          additionalInfo: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.error || 'Failed to submit your request. Please try again.'
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: Clock,
      title: "48-Hour Cash Offers",
      description: "Get your fair market cash offer within 48 hours of contact"
    },
    {
      icon: DollarSign,
      title: "7-Day Closing",
      description: "Close as fast as 7 days with all-cash transactions"
    },
    {
      icon: CheckCircle,
      title: "No Commissions",
      description: "Keep 100% of your sale price - no realtor fees or commissions"
    },
    {
      icon: CheckCircle,
      title: "No Closing Costs",
      description: "We cover all closing costs, title insurance, and legal fees"
    },
    {
      icon: CheckCircle,
      title: "No Repairs Needed",
      description: "Sell your land as-is - no need for improvements or cleanup"
    },
    {
      icon: CheckCircle,
      title: "All Cash Payment",
      description: "Guaranteed cash payment - no financing contingencies"
    }
  ];

  const propertyTypes = [
    "Vacant Land",
    "Development Sites", 
    "Commercial Property",
    "Agricultural Land",
    "Distressed Properties",
    "Estate Sales",
    "Problem Properties",
    "Other"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-70"
          style={{ backgroundImage: 'url(/images/vacant-land.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/40 to-green-900/60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-accent-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-lg">
                FAST CASH OFFERS
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Sell Your Land
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-500">Fast & Fair</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Get a cash offer in 48 hours • Close in 7 days • No commissions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cash-offer-form"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-50 hover:text-green-700 hover:shadow-lg hover:shadow-accent-400/20 transition-all flex items-center justify-center border-2 border-transparent hover:border-accent-300"
              >
                Get Your Cash Offer <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                to="/tools/roi-calculator"
                className="bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-800 hover:to-green-900 hover:shadow-lg hover:shadow-green-800/30 transition-all flex items-center justify-center border-2 border-green-600/30"
              >
                Calculate Value <Calculator className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-16 w-12 h-12 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-8 w-10 h-10 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Sell to Houston Land Guy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip the traditional real estate hassles. We buy land directly with cash, 
              closing faster and saving you thousands in fees.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Traditional Sale vs. Cash Sale
            </h2>
            <p className="text-xl text-gray-600">
              See the difference selling directly to Houston Land Guy makes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Sale */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-6 text-center">Traditional Sale</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Sale Price</span>
                    <span className="font-semibold">$300,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-red-600">
                    <span>Realtor Commission (6%)</span>
                    <span className="font-semibold">-$18,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-red-600">
                    <span>Closing Costs</span>
                    <span className="font-semibold">-$5,400</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-red-600">
                    <span>Marketing/Staging</span>
                    <span className="font-semibold">-$3,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-red-600">
                    <span>Property Improvements</span>
                    <span className="font-semibold">-$15,000</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 font-bold text-lg">
                    <span>Net to You</span>
                    <span className="text-red-600">$258,600</span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-4">
                    Average time: 6-12 months
                  </div>
                </div>
              </div>

              {/* Cash Sale */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-600 mb-6 text-center">Cash Sale with Us</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">Cash Offer</span>
                    <span className="font-semibold">$255,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-green-600">
                    <span>Realtor Commission</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-green-600">
                    <span>Closing Costs (We Pay)</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-green-600">
                    <span>Marketing/Staging</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-green-600">
                    <span>Property Improvements</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 font-bold text-lg">
                    <span>Net to You</span>
                    <span className="text-green-600">$255,000</span>
                  </div>
                  <div className="text-center text-sm text-green-600 mt-4 font-medium">
                    Closing time: 7 days
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 inline-block">
                <p className="text-yellow-800">
                  <strong>Net Difference:</strong> Only $3,600 less for cash sale, but zero hassle and guaranteed closing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cash Offer Form */}
      <section id="cash-offer-form" className="py-20 bg-gradient-to-br from-amber-50 via-white to-green-50 relative overflow-hidden">
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
                Get Your Cash Offer
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Today</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and receive your no-obligation cash offer within 48 hours.
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">1</div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Property Details</span>
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
                  <span className="ml-2 text-sm font-medium text-gray-500">Get Offer</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl shadow-gray-900/10 border border-white/50 relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-green-500/5 rounded-3xl"></div>
              
              <div className="relative">
                {/* Property Details Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <Home className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Property Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Home className="h-4 w-4 mr-2 text-amber-500" />
                        Property Type *
                      </label>
                      <div className="relative">
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select property type</option>
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        Property Address *
                      </label>
                      <input
                        type="text"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="123 Main St, Houston, TX 77001"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                        Acreage/Size
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="acreage"
                          value={formData.acreage}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                          placeholder="5 acres"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                          acres
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                        Desired Timeline
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select timeline</option>
                          <option value="ASAP">ASAP (within 30 days)</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="Just exploring">Just exploring options</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
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
                        <User className="h-4 w-4 mr-2 text-amber-500" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        value={formData.email}
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        placeholder="(713) 828-3701"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                        Additional Information
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md resize-none"
                        placeholder="Tell us anything else about your property or situation..."
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
                        <span>Get My Cash Offer Now</span>
                        <DollarSign className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl border border-amber-200/50">
                    <Clock className="h-5 w-5 mr-2 text-amber-600" />
                    <p className="text-sm font-medium text-gray-700">
                      By submitting this form, you agree to our privacy policy. We'll never share your information and you'll receive your cash offer within 
                      <span className="text-amber-600 font-bold"> 48 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Prefer to Talk? Call Us Now
            </h2>
            <p className="text-xl text-gray-600">
              Speak directly with a land specialist for immediate assistance
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <a
              href="tel:7138283701"
              className="flex items-center justify-center space-x-3 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <Phone className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-lg font-semibold text-gray-900">(713) 828-3701</div>
                <div className="text-sm text-gray-600">Call for immediate assistance</div>
              </div>
            </a>
            
            <a
              href="mailto:info@houstonlandguy.com"
              className="flex items-center justify-center space-x-3 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <Mail className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-lg font-semibold text-gray-900">info@houstonlandguy.com</div>
                <div className="text-sm text-gray-600">Email us your questions</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}