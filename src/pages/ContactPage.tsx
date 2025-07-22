import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar, Send } from 'lucide-react';
import { submitContactForm, ContactFormData } from '../utils/api';
import { usePageSEO, pageSEO } from '../utils/seo';
import { useToast } from '../contexts/ToastContext';
import { LoadingButton } from '../components/LoadingSpinner';
import { FormField } from '../components/FormField';

export function ContactPage() {
  usePageSEO(pageSEO.contact);
  const { showToast } = useToast();
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
      showToast('Please fix the errors in the form', 'error');
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
        showToast('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
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
        showToast(response.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An unexpected error occurred. Please try again later.', 'error');
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
      value: "(713) 555-LAND",
      description: "Speak directly with a land specialist",
      action: "tel:7135550000",
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
      phone: "(713) 555-LAND",
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
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: 'url(/images/houston-skyline.jpg)' }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Contact
              <span className="block text-green-200">Houston Land Guy</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Ready to discuss your land opportunity? We're here to help with expert guidance and fast responses.
            </p>
          </div>
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name *"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Your full name"
                    required
                  />
                  
                  <FormField
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                      placeholder="(713) 555-0123"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    >
                      <option value="">Select preference</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Subject *"
                    name="subject"
                    type="select"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                  >
                    <option value="">Select subject</option>
                    <option value="sell-land">Sell My Land</option>
                    <option value="find-sites">Find Development Sites</option>
                    <option value="investment">Investment Opportunities</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="other">Other</option>
                  </FormField>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeframe
                    </label>
                    <select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
                    >
                      <option value="">Select timeframe</option>
                      <option value="immediate">Immediate (ASAP)</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                </div>
                
                <FormField
                  label="Message *"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  rows={6}
                  placeholder="Tell us about your land, project, or questions..."
                  required
                />
                
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon={Send}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all"
                >
                  Send Message
                </LoadingButton>
                
                <div className="text-center text-sm text-gray-600">
                  <p>We'll respond within 24 hours. For urgent matters, please call us directly.</p>
                </div>
              </form>
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
              href="tel:7135550000"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Call Now <Phone className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/sell-your-land"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
            >
              Get Cash Offer <Send className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}