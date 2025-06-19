import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';

export function LatestNews() {
  const news = [
    {
      id: 1,
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      description: "Markets rally as Fed officials hint at more accommodative monetary policy amid cooling inflation data.",
      category: "Federal Reserve",
      time: "2 hours ago",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Tech Stocks Surge on AI Breakthrough Announcements",
      description: "Major technology companies report significant advances in artificial intelligence capabilities, driving sector gains.",
      category: "Technology",
      time: "4 hours ago",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Energy Sector Volatility Continues Amid Geopolitical Tensions",
      description: "Oil prices fluctuate as global supply chain concerns persist in key producing regions.",
      category: "Energy",
      time: "6 hours ago",
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Market News
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest financial news and market-moving events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.time}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {article.description}
                </CardDescription>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
                  Read more
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}