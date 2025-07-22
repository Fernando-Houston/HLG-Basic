import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Thompson",
      title: "Land Developer",
      location: "Katy, TX",
      rating: 5,
      text: "Houston Land Guy found us the perfect 25-acre development site in Katy. Their market analysis was spot-on, and we closed in just 30 days. The ROI has exceeded our projections by 15%.",
      project: "Katy Residential Development"
    },
    {
      name: "Sarah Rodriguez",
      title: "Property Investor",
      location: "Sugar Land, TX",
      rating: 5,
      text: "I inherited 15 acres and needed to sell quickly. Houston Land Guy's cash offer process was incredible - 48 hours to offer, 7 days to close. No hassle, no commissions, just results.",
      project: "Family Land Sale"
    },
    {
      name: "David Chen",
      title: "Commercial Developer",
      location: "The Woodlands, TX",
      rating: 5,
      text: "Their Chapter 42 planning tool saved us months of research. The development timeline was accurate, and their network of professionals made the entire process seamless.",
      project: "Commercial Complex Development"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of satisfied landowners, developers, and investors who've achieved their goals with Houston Land Guy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="absolute top-6 right-6 bg-accent-500/10 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Quote className="h-6 w-6 text-accent-600" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent-500 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Client Info */}
              <div className="border-t border-green-100 pt-4">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
                <p className="text-sm text-green-700 font-medium">{testimonial.location}</p>
                <p className="text-xs text-accent-600 mt-2 font-medium bg-accent-50 inline-block px-2 py-1 rounded">{testimonial.project}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-accent-50 via-white to-accent-50 px-8 py-4 rounded-full border border-accent-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-accent-500 p-1 rounded-full mr-2">
                <Star className="h-4 w-4 text-gray-900 fill-current" />
              </div>
              <span className="font-semibold text-gray-800">4.9/5 Client Rating</span>
            </div>
            <div className="h-6 w-px bg-accent-300"></div>
            <div>
              <span className="font-semibold text-gray-800">500+ Developer Network</span>
            </div>
            <div className="h-6 w-px bg-accent-300"></div>
            <div>
              <span className="font-semibold text-gray-800">BBB A+ Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}