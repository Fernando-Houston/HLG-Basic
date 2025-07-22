import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/big-logo-2.png"
                alt="Houston Land Guy Logo"
                className="h-12 w-auto mb-2 brightness-0 invert"
                loading="lazy"
                width="120"
                height="48"
              />
              <p className="text-sm text-gray-400">Land Development Experts</p>
            </div>
            <p className="text-gray-400 mb-4">
              Serving the Greater Houston area with $483M+ in transaction volume and 15+ years of experience.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>3302 Canal St, Houston, TX 77003</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sell-your-land" className="text-gray-400 hover:text-white transition-colors">
                  Sell Your Land
                </Link>
              </li>
              <li>
                <Link to="/find-development-sites" className="text-gray-400 hover:text-white transition-colors">
                  Find Development Sites
                </Link>
              </li>
              <li>
                <Link to="/invest-in-land" className="text-gray-400 hover:text-white transition-colors">
                  Invest in Land
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-400 hover:text-white transition-colors">
                  Development Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Harris County</li>
              <li className="text-gray-400">Fort Bend County</li>
              <li className="text-gray-400">Montgomery County</li>
              <li className="text-green-400 font-medium">Houston Metro Area</li>
              <li>
                <Link to="/locations/houston" className="text-gray-400 hover:text-white transition-colors">
                  View All Cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact & Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">(713) 828-3701</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">info@houstonlandguy.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-green-400 mt-1" />
                <div className="text-sm text-gray-400">
                  <p>Mon-Fri: 8AM-6PM</p>
                  <p>Sat: 9AM-3PM</p>
                  <p>Sun: By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-4 md:mb-0">
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            © {currentYear} Houston Land Guy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}