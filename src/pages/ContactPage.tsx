import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar, Send, User, FileText, Sparkles, Star, Loader2 } from 'lucide-react';
import { submitContactForm, ContactFormData } from '../utils/api';
import { usePageSEO, pageSEO } from '../utils/seo';
import { useToast } from '../contexts/ToastContext';
import { LoadingButton } from '../components/LoadingSpinner';
import { FormField } from '../components/FormField';

export function ContactPage() {
  usePageSEO(pageSEO.contact);
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: '',
    timeframe: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const contactData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
        preferredContact: formData.preferredContact as 'email' | 'phone' | 'text' | undefined,
        timeframe: formData.timeframe as 'immediate' | '1-3 months' | '3-6 months' | '6+ months' | 'exploring' | undefined
      };
      
      const response = await submitContactForm(contactData);
      
      if (response.success) {
        success('Thank you for your message! We\'ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          preferredContact: '',
          timeframe: ''
        });
        setErrors({});
      } else {
        error(response.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      error('An unexpected error occurred. Please try again later.');
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

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "(713) 828-3701",
      description: "Speak directly with a land specialist",
      action: "tel:7138283701",
      available: "Mon-Fri 8AM-6PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@houstonlandguy.com",
      description: "Send us your questions anytime",
      action: "mailto:info@houstonlandguy.com",
      available: "24/7 Response"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      value: "Start Conversation",
      description: "Chat with our team right now",
      action: "#",
      available: "Mon-Fri 9AM-5PM"
    },
    {
      icon: Calendar,
      title: "Schedule Call",
      value: "Book Meeting",
      description: "Schedule a consultation call",
      action: "#",
      available: "30-min slots"
    }
  ];

  const offices = [
    {
      name: "Houston Headquarters",
      address: "3302 Canal St",
      city: "Houston, TX 77003",
      phone: "(713) 828-3701",
      email: "houston@houstonlandguy.com",
      hours: {
        weekdays: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "By Appointment"
      },
      coordinates: { lat: 29.7604, lng: -95.3698 }
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get a cash offer for my land?",
      answer: "We provide cash offers within 48 hours of initial contact. Our team reviews your property details and market conditions to ensure a fair, competitive offer."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve the Greater Houston area including Harris, Fort Bend, and Montgomery counties. Our focus areas include Houston, Katy, Sugar Land, The Woodlands, Cypress, Pearland, Spring, Tomball, Richmond, Humble, Kingwood, and Missouri City."
    },
    {
      question: "Do you charge any fees or commissions?",
      answer: "No, we don't charge any fees or commissions to landowners. We cover all closing costs, title insurance, and legal fees. What we offer is what you receive."
    },
    {
      question: "What types of land do you purchase?",
      answer: "We purchase all types of land including vacant land, development sites, commercial property, agricultural land, distressed properties, estate sales, and problem properties."
    },
    {
      question: "How do you determine the value of my land?",
      answer: "We use comprehensive market analysis including recent comparable sales, development potential, zoning regulations, utility availability, and current market conditions to determine fair market value."
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
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Contact</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] font-black">
                Houston Land Guy
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Ready to discuss your land opportunity? We're here to help with expert guidance and fast responses.
            </p>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Choose the contact method that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-green-600 font-medium mb-2">{method.value}</p>
                  <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                  <p className="text-green-600 text-xs font-medium">{method.available}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-green-50 relative overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-gray-900/10 border border-white/50 p-8 lg:p-10 relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-green-500/5 rounded-3xl"></div>
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4 shadow-lg shadow-amber-400/25">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Send us a Message
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 text-xl">Get Expert Guidance</span>
                  </h2>
                </div>
                
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-8 mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">1</div>
                      <span className="ml-2 text-sm font-medium text-gray-700">Contact Info</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-200 rounded-full">
                      <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">2</div>
                      <span className="ml-2 text-sm font-medium text-gray-500">Your Message</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">3</div>
                      <span className="ml-2 text-sm font-medium text-gray-500">Get Response</span>
                    </div>
                  </div>
                </div>
              
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md ${
                          errors.name ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md ${
                          errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                      <Phone className="h-4 w-4 mr-2 text-green-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                      placeholder="(713) 828-3701"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                      Preferred Contact Method
                    </label>
                    <div className="relative">
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                      >
                        <option value="">Select preference</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="text">Text Message</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Message Details Section */}
                <div className="mt-10 pt-8 border-t border-gradient-to-r from-amber-200 via-gray-200 to-green-200">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        Subject *
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md ${
                            errors.subject ? 'border-red-300' : 'border-gray-200'
                          }`}
                        >
                          <option value="">Select subject</option>
                          <option value="sell-land">Sell My Land</option>
                          <option value="find-sites">Find Development Sites</option>
                          <option value="investment">Investment Opportunities</option>
                          <option value="consultation">Free Consultation</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                        Timeframe
                      </label>
                      <div className="relative">
                        <select
                          name="timeframe"
                          value={formData.timeframe}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md"
                        >
                          <option value="">Select timeframe</option>
                          <option value="immediate">Immediate (ASAP)</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/90 hover:border-amber-300 group-hover:shadow-md resize-none ${
                      errors.message ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Tell us about your land, project, or questions..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
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
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                        <span>Send Message</span>
                        <Send className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl border border-amber-200/50">
                    <Clock className="h-5 w-5 mr-2 text-amber-600" />
                    <p className="text-sm font-medium text-gray-700">
                      We'll respond within <span className="text-amber-600 font-bold">24 hours</span>. For urgent matters, please call us directly.
                    </p>
                  </div>
                </div>
                </form>
              </div>
            </div>
            
            {/* Office Information */}
            <div className="space-y-8">
              {/* Office Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h2>
                
                {offices.map((office, index) => (
                  <div key={index} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{office.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-700">{office.address}</p>
                            <p className="text-gray-700">{office.city}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-green-600">
                            {office.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-green-600">
                            {office.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Clock className="h-5 w-5 text-green-600 mr-2" />
                        Business Hours
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monday - Friday:</span>
                          <span className="font-medium">{office.hours.weekdays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saturday:</span>
                          <span className="font-medium">{office.hours.saturday}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sunday:</span>
                          <span className="font-medium">{office.hours.sunday}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <button className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Service Areas */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Areas</h2>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Counties Served</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Harris County', 'Fort Bend County', 'Montgomery County'].map((county) => (
                        <span key={county} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {county}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Major Cities</h4>
                    <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                      {[
                        'Houston', 'Katy', 'Sugar Land', 'The Woodlands',
                        'Cypress', 'Pearland', 'Spring', 'Tomball',
                        'Richmond', 'Humble', 'Kingwood', 'Missouri City'
                      ].map((city) => (
                        <span key={city}>• {city}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg p-6 group">
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex items-center justify-between">
                  {faq.question}
                  <span className="ml-2 transform group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't wait - land opportunities move fast in Houston's growing market. 
            Contact us today for your free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7138283701"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Call Now <Phone className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/sell-your-land"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
            >
              <span className="text-green-700">Get Cash</span> Offer <Send className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}