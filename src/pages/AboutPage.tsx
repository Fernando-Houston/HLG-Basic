import { Users, Award, TrendingUp, MapPin, Calendar, Shield } from 'lucide-react';
import { usePageSEO, pageSEO } from '../utils/seo';

export function AboutPage() {
  usePageSEO(pageSEO.about);
  const stats = [
    {
      icon: TrendingUp,
      value: "$483M+",
      label: "Transaction Volume",
      description: "In successful land transactions"
    },
    {
      icon: Calendar,
      value: "15+",
      label: "Years Experience",
      description: "In Houston land market"
    },
    {
      icon: Users,
      value: "523+",
      label: "Satisfied Sellers",
      description: "Happy landowners served"
    },
    {
      icon: Award,
      value: "500+",
      label: "Developer Network",
      description: "Active partnerships"
    }
  ];

  const team = [
    {
      name: "Stephen Garza",
      title: "Founder & CEO",
      experience: "20+ years in Houston real estate",
      image: "/images/stephen-garza.jpg",
      bio: "Stephen founded Houston Land Guy with a vision to streamline land transactions in the Greater Houston area. His deep market knowledge and developer relationships have facilitated over $483M in transactions."
    },
    {
      name: "Stephen Garza",
      title: "Chief Technology Officer",
      experience: "15+ years in real estate technology",
      image: "/images/stephen-garza.jpg",
      bio: "Stephen leads our technology innovation team, developing cutting-edge tools for land analysis and transaction management. His expertise in PropTech has revolutionized how we evaluate opportunities."
    },
    {
      name: "Stephen Garza",
      title: "Chief Financial Officer",
      experience: "18+ years in real estate finance",
      image: "/images/stephen-garza.jpg",
      bio: "Stephen oversees all financial operations and investment strategies at Houston Land Guy. His analytical approach to market valuation has helped investors achieve consistent returns exceeding industry standards."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We conduct business with complete transparency and honesty in every transaction."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build long-term relationships based on mutual success and shared goals."
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service and delivery."
    },
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Deep knowledge of Houston market dynamics and regulatory requirements."
    }
  ];

  const timeline = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Houston Land Guy established with focus on transparent land transactions"
    },
    {
      year: "2012",
      title: "First $50M Milestone",
      description: "Reached $50M in total transaction volume"
    },
    {
      year: "2015",
      title: "Investment Division",
      description: "Launched investment opportunities for accredited investors"
    },
    {
      year: "2018",
      title: "Technology Innovation",
      description: "Introduced proprietary ROI calculators and analysis tools"
    },
    {
      year: "2021",
      title: "$250M Milestone",
      description: "Crossed $250M in total transactions and expanded team"
    },
    {
      year: "2024",
      title: "AI-Powered Platform",
      description: "Launched Smart Land Finder with AI market analysis"
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
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">About</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] font-black">
                Houston Land Guy
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              15+ years of expertise • $483M+ in transactions • Your trusted Houston land partner
            </p>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-green-400/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-accent-400/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Houston Land Guy exists to simplify and optimize land transactions in the Greater Houston area. 
                  We bridge the gap between landowners seeking fair value and developers looking for prime opportunities.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Our comprehensive approach combines deep market knowledge, cutting-edge analysis tools, 
                  and a vast network of industry professionals to deliver exceptional results for every client.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">For Landowners</h4>
                    <p className="text-gray-600 text-sm">Fast, fair cash offers with transparent processes and no hidden fees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">For Developers</h4>
                    <p className="text-gray-600 text-sm">Exclusive opportunities with complete due diligence and market analysis</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">For Investors</h4>
                    <p className="text-gray-600 text-sm">High-yield opportunities with expert guidance and proven track record</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">For Community</h4>
                    <p className="text-gray-600 text-sm">Responsible development that enhances Houston's growth and prosperity</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/land-development.jpg" 
                  alt="Houston Development"
                  className="rounded-2xl shadow-lg"
                  loading="lazy"
                  width="640"
                  height="360"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm opacity-90">Serving the Greater Houston Area</p>
                  <p className="text-xl font-bold">Building Tomorrow's Communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision and interaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{member.title}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.experience}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              15+ years of growth and innovation in Houston land development
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.year.slice(-2)}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 bg-gray-50 rounded-lg p-6 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span className="text-sm font-medium text-green-600">{item.year}</span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work with Houston's Land Experts?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join the 500+ developers, investors, and landowners who trust Houston Land Guy 
            for their most important transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Get Started Today
            </a>
            <a
              href="/tools"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all"
            >
              Try Our Tools
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}