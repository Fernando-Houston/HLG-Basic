import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: DollarSign,
      value: "$483M+",
      label: "Transaction Volume",
      description: "Successfully completed deals"
    },
    {
      icon: Clock,
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
      icon: TrendingUp,
      value: "18%+",
      label: "Average ROI",
      description: "For our investors"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHighlight = index === 0 || index === 3; // Highlight transaction volume and ROI
            return (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 ${isHighlight ? 'bg-gradient-to-br from-accent-400 to-accent-500' : 'bg-gradient-to-br from-green-600 to-green-700'} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <IconComponent className={`h-8 w-8 ${isHighlight ? 'text-gray-900' : 'text-white'}`} />
                </div>
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${isHighlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-700' : 'text-gray-900'}`}>{stat.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}