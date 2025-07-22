import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Clock, CheckCircle, ArrowRight, Calculator, Phone, Mail, Loader2 } from 'lucide-react';
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
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: 'url(/images/vacant-land.jpg)' }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Sell Your Land
              <span className="block text-green-200">Fast & Fair</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Get a cash offer in 48 hours • Close in 7 days • No commissions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cash-offer-form"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
              >
                Get Your Cash Offer <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                to="/tools/roi-calculator"
                className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
              >
                Calculate Value <Calculator className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
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
                <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">Traditional Sale</h3>
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
                <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">Cash Sale with Us</h3>
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
      <section id="cash-offer-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Cash Offer Today
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and receive your no-obligation cash offer within 48 hours.
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
                    value={formData.name}
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
                    value={formData.email}
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
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="(713) 828-3701"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="123 Main St, Houston, TX 77001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acreage/Size
                  </label>
                  <input
                    type="text"
                    name="acreage"
                    value={formData.acreage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="5 acres"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP (within 30 days)</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="Just exploring">Just exploring options</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us anything else about your property or situation..."
                  ></textarea>
                </div>
              </div>
              
              {/* Status Messages */}
              {submitStatus && (
                <div className={`p-4 rounded-lg mb-6 ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
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
                    'Get My Cash Offer Now'
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>By submitting this form, you agree to our privacy policy. We'll never share your information.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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