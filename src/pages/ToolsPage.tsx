import { Link } from 'react-router-dom';
import { Calculator, Clock, MapPin, Brain, ArrowRight, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { usePageSEO, pageSEO } from '../utils/seo';

export function ToolsPage() {
  usePageSEO(pageSEO.tools);
  const tools = [
    {
      icon: Calculator,
      title: "ROI Calculator",
      description: "Calculate potential returns on land development projects with Houston-specific assumptions and costs.",
      features: ["Construction cost analysis", "Market value projections", "Profit margin calculations", "Break-even analysis"],
      link: "/tools/roi-calculator",
      image: "/images/calculator-tools.png",
      badge: "Most Popular"
    },
    {
      icon: Clock,
      title: "Development Timeline Tool",
      description: "Plan your project phases with realistic timelines based on Houston regulations and processes.",
      features: ["Phase-by-phase guidance", "Houston-specific timelines", "Parallel process optimization", "Downloadable checklist"],
      link: "/tools/timeline",
      image: "/images/land-development.jpg",
      badge: "Essential"
    },
    {
      icon: MapPin,
      title: "Chapter 42 Planning Tool",
      description: "Navigate Houston's Chapter 42 zoning regulations with automated compliance checking and optimization.",
      features: ["Density analysis", "Lot size optimization", "Setback calculations", "Compliance verification"],
      link: "/tools/chapter-42",
      image: "/images/residential-development.jpg",
      badge: "Houston Specific"
    },
    {
      icon: Brain,
      title: "AI-Powered Smart Land Finder",
      description: "Advanced AI tool to identify optimal development opportunities based on your specific criteria.",
      features: ["AI market analysis", "ROI projections", "Competition analysis", "Market demand scoring"],
      link: "/tools/smart-finder",
      image: "/images/professional-team.png",
      badge: "AI-Powered"
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Save Money",
      description: "Avoid costly mistakes with accurate projections and compliance checking"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Streamline your analysis process from weeks to hours"
    },
    {
      icon: TrendingUp,
      title: "Maximize Returns",
      description: "Optimize your projects for maximum profitability"
    },
    {
      icon: FileText,
      title: "Professional Reports",
      description: "Generate detailed reports for investors and stakeholders"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/10 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: 'url(/images/calculator-tools.png)' }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Professional
              <span className="block text-green-200">Development Tools</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Free access to professional-grade tools designed specifically for Houston land development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools/roi-calculator"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
              >
                Try ROI Calculator <Calculator className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/tools/smart-finder"
                className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
              >
                Use AI Land Finder <Brain className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Tool Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to analyze, plan, and execute successful land development projects in Houston.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={tool.image} 
                      alt={tool.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="640"
                      height="360"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {tool.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                    <p className="text-gray-600 mb-6">{tool.description}</p>
                    
                    <ul className="space-y-2 mb-8">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to={tool.link}
                      className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold text-center hover:from-green-700 hover:to-green-800 transition-all group-hover:shadow-lg group-hover:shadow-green-600/30 transform group-hover:-translate-y-0.5"
                    >
                      <span className="flex items-center justify-center">
                        Launch Tool <ArrowRight className="inline ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Use Our Tools?
            </h2>
            <p className="text-xl text-gray-600">
              Built by Houston land experts for Houston developers and investors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:shadow-green-600/10 transition-all group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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

      {/* Houston-Specific Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Built for Houston Market
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our tools incorporate Houston-specific data, regulations, and market conditions 
                  to provide the most accurate analysis possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MapPin className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Chapter 42 Compliance</h4>
                      <p className="text-gray-600">Automated checking against Houston's development regulations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <DollarSign className="h-4 w-4 text-accent-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Local Cost Data</h4>
                      <p className="text-gray-600">Real construction costs and market values from Houston projects</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Clock className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Realistic Timelines</h4>
                      <p className="text-gray-600">Based on actual Houston permitting and development processes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/houston-skyline.jpg" 
                  alt="Houston Skyline"
                  className="rounded-2xl shadow-lg"
                  loading="lazy"
                  width="640"
                  height="360"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm opacity-90">Serving Greater Houston Area</p>
                  <p className="text-xl font-bold">Harris • Fort Bend • Montgomery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Optimize Your Development Project?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get started with our free professional tools and see why Houston developers 
            trust our analysis for their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/roi-calculator"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Start with ROI Calculator <Calculator className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-all flex items-center justify-center"
            >
              Get Expert Help <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}