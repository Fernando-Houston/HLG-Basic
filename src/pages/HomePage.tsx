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
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-60"
          style={{ backgroundImage: 'url(/images/houston-skyline.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/50 to-green-800/70"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Houston's Premier</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] font-black">
                Land Development Experts
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              $483M+ in transactions • 15+ years experience • 523+ satisfied sellers
            </p>
            <p className="text-lg mb-12 text-white/95 max-w-3xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Whether you're selling land, finding development sites, or investing in Houston's growing market, 
              we provide the expertise and tools to maximize your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-accent-500 to-accent-600 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-accent-400/40 transform hover:-translate-y-1 transition-all flex items-center justify-center border-2 border-accent-400/50 hover:border-accent-300 drop-shadow-xl"
              >
                <span className="text-green-700">Get Your Cash</span> Offer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/tools/roi-calculator"
                className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/25 hover:border-white/60 hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center drop-shadow-xl"
              >
                Try ROI Calculator <Calculator className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
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
              <span className="text-green-700">Get Cash</span> Offer Now <DollarSign className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}