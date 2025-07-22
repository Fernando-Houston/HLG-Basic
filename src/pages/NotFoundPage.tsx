import { ArrowLeft, Home, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageSEO, pageSEO } from '../utils/seo';

export function NotFoundPage() {
  usePageSEO(pageSEO.notFound);
  const suggestions = [
    {
      title: "Sell Your Land",
      description: "Get a cash offer for your property",
      link: "/sell-your-land",
      icon: MapPin
    },
    {
      title: "ROI Calculator",
      description: "Calculate potential returns on land investments",
      link: "/tools/roi-calculator",
      icon: Search
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team",
      link: "/contact",
      icon: Home
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Error Display */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Looks like this property isn't in our portfolio. Let's help you find what you're looking for.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Suggested Pages */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <Link
                    key={index}
                    to={suggestion.link}
                    className="group p-6 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {suggestion.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-gray-600">
            <p className="mb-2">
              Need immediate assistance?
            </p>
            <p className="font-semibold text-gray-900">
              Call us at{' '}
              <a href="tel:+17135551234" className="text-green-600 hover:underline">
                (713) 555-1234
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}