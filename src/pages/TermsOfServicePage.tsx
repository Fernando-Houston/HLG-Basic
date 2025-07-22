import { FileText, Scale, Users, Shield, AlertTriangle, Ban, Clock, Mail } from 'lucide-react';
import { usePageSEO, pageSEO } from '../utils/seo';

export function TermsOfServicePage() {
  usePageSEO(pageSEO.termsOfService);
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Houston Land Guy's website and services, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our services.",
        "We reserve the right to update these terms at any time, and your continued use constitutes acceptance of any changes."
      ]
    },
    {
      icon: Users,
      title: "Use of Services",
      content: [
        "Our services are available to individuals who are at least 18 years old and can form legally binding contracts.",
        "You agree to provide accurate, current, and complete information during any registration or inquiry process.",
        "You are responsible for maintaining the confidentiality of any account credentials and for all activities under your account.",
        "You agree not to use our services for any unlawful purpose or in any way that could damage our reputation or business."
      ]
    },
    {
      icon: Scale,
      title: "Property Transactions",
      content: [
        "All property valuations and offers are estimates and subject to change based on due diligence and market conditions.",
        "Houston Land Guy acts as an intermediary and does not guarantee any specific transaction outcomes.",
        "All transactions are subject to applicable local, state, and federal laws and regulations.",
        "Final terms of any transaction will be detailed in separate purchase agreements or contracts."
      ]
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      content: [
        "All content on this website, including text, graphics, logos, and software, is the property of Houston Land Guy or its licensors.",
        "You may not reproduce, distribute, or create derivative works without our express written permission.",
        "You retain ownership of any information you submit to us, but grant us a license to use it for providing our services.",
        "Any feedback or suggestions you provide may be used by us without compensation to you."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Disclaimers",
      content: [
        "Our services are provided 'as is' without warranties of any kind, either express or implied.",
        "We do not guarantee the accuracy, completeness, or timeliness of information on our website.",
        "Investment returns and property values are subject to market risks and past performance does not guarantee future results.",
        "We are not responsible for any decisions you make based on information provided through our services."
      ]
    },
    {
      icon: Ban,
      title: "Limitation of Liability",
      content: [
        "Houston Land Guy shall not be liable for any indirect, incidental, special, or consequential damages.",
        "Our total liability for any claim shall not exceed the amount you paid for the specific service in question.",
        "We are not liable for any loss or damage resulting from unauthorized access to your personal information.",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you."
      ]
    }
  ];

  const prohibitedUses = [
    "Violating any applicable laws or regulations",
    "Impersonating another person or entity",
    "Interfering with or disrupting our services or servers",
    "Attempting to gain unauthorized access to our systems",
    "Using automated systems or software to extract data (scraping)",
    "Transmitting viruses or malicious code",
    "Harassing, threatening, or intimidating other users or our staff",
    "Using our services for spam or unsolicited communications"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-gray-600">Last updated: January 2025</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              These Terms of Service ("Terms") govern your use of Houston Land Guy's website 
              and services. Please read these Terms carefully before using our services.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Prohibited Uses */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <Ban className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Prohibited Uses</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You agree not to use our services for any of the following purposes:
            </p>
            <ul className="space-y-2">
              {prohibitedUses.map((use, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span className="text-gray-600">{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Indemnification */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Indemnification</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Houston Land Guy, its officers, 
              directors, employees, agents, and affiliates from any claims, damages, losses, 
              liabilities, and expenses (including reasonable attorney's fees) arising from your 
              use of our services, violation of these Terms, or infringement of any third-party rights.
            </p>
          </div>

          {/* Termination */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                We reserve the right to terminate or suspend your access to our services at any time, 
                without notice, for any reason, including violation of these Terms.
              </p>
              <p>
                Upon termination, your right to use our services will immediately cease, and we may 
                delete any information associated with your account.
              </p>
              <p>
                Provisions of these Terms that by their nature should survive termination will remain 
                in effect after termination.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the 
                State of Texas, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of our services shall be resolved 
                through binding arbitration in Houston, Texas, in accordance with the rules of the 
                American Arbitration Association.
              </p>
              <p>
                You waive any right to a jury trial or to participate in a class action lawsuit 
                related to these Terms or our services.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Questions About Terms</h2>
            </div>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:legal@houstonlandguy.com" className="underline">
                  legal@houstonlandguy.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+17138283701" className="underline">
                  (713) 828-3701
                </a>
              </p>
              <p>
                <strong>Address:</strong> 1234 Main Street, Suite 500, Houston, TX 77002
              </p>
            </div>
          </div>

          {/* Agreement Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 text-sm">
              <strong>Important:</strong> By using Houston Land Guy's services, you acknowledge 
              that you have read, understood, and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, you must not use our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}