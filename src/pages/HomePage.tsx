import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Clock, Users, TrendingUp, Calculator, MapPin, CheckCircle } from 'lucide-react';
import { StatsSection } from '../components/StatsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ProcessSection } from '../components/ProcessSection';
import { usePageSEO, pageSEO } from '../utils/seo';

export function HomePage() {
  usePageSEO(pageSEO.home);
  const services = [
    {
      title: "Sell Your Land",
      description: "Get a cash offer in 48 hours with 7-day closing. No commissions, no hassle.",
      image: "/images/vacant-land.jpg",
      benefits: ["48-hour cash offers", "7-day closing", "No commissions", "All cash transactions"],
      link: "/sell-your-land",
      cta: "Get Cash Offer"
    },
    {
      title: "Find Development Sites",
      description: "Access exclusive off-market listings with complete due diligence packages.",
      image: "/images/land-development.jpg",
      benefits: ["Off-market listings", "Complete due diligence", "Development analysis", "Market intelligence"],
      link: "/find-development-sites",
      cta: "Find Sites"
    },
    {
      title: "Invest in Land",
      description: "Join our investment opportunities with 18%+ average ROI and expert guidance.",
      image: "/images/investment-handshake.jpg",
      benefits: ["18%+ average ROI", "Joint venture partnerships", "Proven track record", "Expert guidance"],
      link: "/invest-in-land",
      cta: "Start Investing"
    }
  ];

  const tools = [
    {
      title: "ROI Calculator",
      description: "Calculate potential returns on land development projects",
      icon: Calculator,
      link: "/tools/roi-calculator"
    },
    {
      title: "Development Timeline",
      description: "Plan your project phases with Houston-specific timelines",
      icon: Clock,
      link: "/tools/timeline"
    },
    {
      title: "Chapter 42 Planning",
      description: "Navigate Houston's zoning and development regulations",
      icon: MapPin,
      link: "/tools/chapter-42"
    },
    {
      title: "Smart Land Finder",
      description: "AI-powered tool to find perfect development opportunities",
      icon: TrendingUp,
      link: "/tools/smart-finder"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-70"
          style={{ backgroundImage: 'url(/images/houston-skyline.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 to-green-800/60"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Houston's Premier
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-accent-500">
                Land Development Experts
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200">
              $483M+ in transactions • 15+ years experience • 523+ satisfied sellers
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto">
              Whether you're selling land, finding development sites, or investing in Houston's growing market, 
              we provide the expertise and tools to maximize your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-accent-400/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center border-2 border-accent-400/30 hover:border-accent-400/50"
              >
                Get Your Cash Offer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/tools/roi-calculator"
                className="bg-white/10 backdrop-blur-sm border-2 border-accent-400/40 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-500/20 hover:border-accent-400 hover:shadow-accent-400/20 hover:shadow-lg transition-all flex items-center justify-center"
              >
                Try ROI Calculator <Calculator className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Land Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From selling your land to finding investment opportunities, we provide end-to-end solutions 
              for the Greater Houston land market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-green-600/10 transition-all group">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={`${service.title} - Houston Land Guy Services`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        FAST CASH
                      </span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        18%+ ROI
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.link}
                    className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold text-center hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:shadow-green-600/30 transform hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="flex items-center justify-center">
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Development Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our suite of professional tools designed specifically for Houston land development and investment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={index}
                  to={tool.link}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:shadow-green-600/10 transition-all hover:-translate-y-1 group border border-gray-100 hover:border-green-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                  <div className="mt-4 text-green-600 font-medium group-hover:text-green-700 transition-colors flex items-center">
                    Try Now <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Maximize Your Land's Potential?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join 500+ developers and investors who trust Houston Land Guy for their land transactions. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-50 hover:text-green-700 hover:shadow-lg hover:shadow-accent-400/20 transition-all flex items-center justify-center border-2 border-transparent hover:border-accent-300"
            >
              Schedule Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/sell-your-land"
              className="bg-gradient-to-r from-green-800 to-green-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-900 hover:to-green-950 hover:shadow-lg hover:shadow-green-900/30 transition-all flex items-center justify-center border-2 border-green-600/30"
            >
              Get Cash Offer Now <DollarSign className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}