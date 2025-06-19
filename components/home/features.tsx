import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Users, Bell } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Market Data",
      description: "Get live stock prices, market trends, and financial data updated in real-time."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Powerful charting tools and technical analysis to make informed investment decisions."
    },
    {
      icon: Users,
      title: "Expert Insights",
      description: "Access research and analysis from top financial experts and analysts."
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Customizable notifications for price movements, news, and market events."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to succeed in the markets
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and insights you need to make smart investment decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}