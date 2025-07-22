import { MessageSquare, FileSearch, DollarSign, Calendar, HandHeart } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Contact Us",
      description: "Call, email, or fill out our form. Tell us about your land and goals.",
      time: "5 minutes"
    },
    {
      icon: FileSearch,
      title: "Property Review",
      description: "Our team analyzes your property using market data and development potential.",
      time: "24-48 hours"
    },
    {
      icon: DollarSign,
      title: "Cash Offer",
      description: "Receive a fair, no-obligation cash offer based on current market conditions.",
      time: "48 hours"
    },
    {
      icon: Calendar,
      title: "Accept & Schedule",
      description: "Accept our offer and schedule your closing date - as fast as 7 days.",
      time: "Same day"
    },
    {
      icon: HandHeart,
      title: "Get Paid",
      description: "Close on your timeline and receive your cash payment. No surprises.",
      time: "7 days"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple 5-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selling your land has never been easier. Our streamlined process gets you from inquiry to cash in just days.
          </p>
        </div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-green-500 mx-24"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {/* Step Number & Icon */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-green-700 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-green-700 rounded-full flex items-center justify-center text-green-700 font-bold text-sm z-20">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {step.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Get your free, no-obligation cash offer today. No fees, no commissions, no hassle.
            </p>
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all">
              Start Your Cash Offer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}