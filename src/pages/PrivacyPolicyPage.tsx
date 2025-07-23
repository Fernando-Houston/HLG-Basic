import { Shield, Mail, Lock, Eye, Server, Clock, FileText, AlertCircle } from 'lucide-react';
import { usePageSEO, pageSEO } from '../utils/seo';

export function PrivacyPolicyPage() {
  usePageSEO(pageSEO.privacyPolicy);
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our services, we may collect personal information such as your name, email address, phone number, property address, and financial information related to land transactions."
        },
        {
          subtitle: "Property Information",
          text: "We collect details about properties including location, size, zoning information, development potential, and market value assessments."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our website, including IP addresses, browser type, pages visited, and time spent on our platform."
        }
      ]
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide land valuation services, connect you with developers, process transactions, and deliver our professional tools."
        },
        {
          subtitle: "Communication",
          text: "We may contact you about your inquiries, provide market updates, send transaction confirmations, and share relevant opportunities."
        },
        {
          subtitle: "Improvement",
          text: "We analyze usage patterns to improve our services, develop new features, and enhance user experience."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data."
        },
        {
          subtitle: "Access Control",
          text: "Access to personal information is restricted to authorized personnel only, and we maintain strict confidentiality agreements."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your information only as long as necessary to provide our services and comply with legal obligations."
        }
      ]
    },
    {
      icon: Server,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Business Partners",
          text: "We may share information with trusted partners including developers, investors, and service providers who assist in delivering our services."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or to protect our rights and the safety of our users."
        },
        {
          subtitle: "No Sale of Data",
          text: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes."
        }
      ]
    }
  ];

  const rights = [
    "Access your personal information",
    "Request corrections to inaccurate data",
    "Delete your personal information (subject to legal requirements)",
    "Opt-out of marketing communications",
    "Request a copy of your data in a portable format"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600">Last updated: January 2025</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              Houston Land Guy ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our website and services.
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
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.subtitle}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Your Rights */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="space-y-2">
              {rights.map((right, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-600">{right}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Cookies and Tracking</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              These help us:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Remember your preferences and settings</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Analyze site traffic and usage patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Improve our services and user experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Provide personalized content and recommendations</span>
              </li>
            </ul>
            <p className="text-gray-600 text-sm">
              You can control cookies through your browser settings. Note that disabling cookies may 
              limit some features of our website.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold">Contact Us</h2>
            </div>
            <p className="mb-4">
              If you have questions about this Privacy Policy or how we handle your information, 
              please contact us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@houstonlandguy.com" className="underline">
                  privacy@houstonlandguy.com
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

          {/* Updates Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> We may update this Privacy Policy from time to time. 
              We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}