import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Share2, Bookmark, ArrowLeft, Calendar, Clock, Eye } from 'lucide-react';
import Link from 'next/link';

// Mock article data - in a real app, this would come from an API
const getArticle = (id: string) => {
  const articles = {
    '1': {
      id: '1',
      title: 'Federal Reserve Signals Potential Rate Cuts in Q2 2024',
      content: `
        <p>The Federal Reserve's latest meeting minutes have revealed a significant shift in monetary policy stance, with officials signaling potential interest rate cuts in the second quarter of 2024. This development has sent ripples through financial markets, with investors reassessing their portfolios and strategies.</p>
        
        <h2>Key Takeaways from the FOMC Meeting</h2>
        <p>During the Federal Open Market Committee (FOMC) meeting, several key points emerged that suggest a more dovish approach to monetary policy:</p>
        
        <ul>
          <li>Inflation has shown consistent decline toward the 2% target</li>
          <li>Labor market conditions remain stable but show signs of cooling</li>
          <li>Economic growth projections have been revised downward</li>
          <li>Global economic uncertainties continue to pose risks</li>
        </ul>
        
        <h2>Market Implications</h2>
        <p>The potential for rate cuts has immediate implications for various asset classes. Bond yields have already begun to decline in anticipation, while equity markets have shown mixed reactions depending on sector exposure to interest rate sensitivity.</p>
        
        <p>Technology stocks, which are particularly sensitive to interest rate changes, have seen renewed investor interest. Meanwhile, financial sector stocks have experienced some pressure as lower rates typically compress net interest margins for banks.</p>
        
        <h2>Investment Strategy Considerations</h2>
        <p>For investors, this shift in monetary policy outlook presents both opportunities and challenges. Portfolio rebalancing may be necessary to account for the changing interest rate environment.</p>
        
        <p>Key considerations include:</p>
        <ul>
          <li>Duration risk in fixed income portfolios</li>
          <li>Sector rotation opportunities in equity markets</li>
          <li>Currency implications for international investments</li>
          <li>Real estate investment trust (REIT) performance potential</li>
        </ul>
        
        <h2>Looking Ahead</h2>
        <p>While the Fed has signaled potential rate cuts, the timing and magnitude remain data-dependent. Investors should continue to monitor key economic indicators including employment data, inflation metrics, and GDP growth figures.</p>
        
        <p>The central bank's commitment to data-driven decision making means that any significant changes in economic conditions could alter the current trajectory. As always, maintaining a diversified portfolio and staying informed about policy developments remains crucial for long-term investment success.</p>
      `,
      author: {
        name: 'Sarah Johnson',
        role: 'Senior Financial Analyst',
        avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
        initials: 'SJ',
      },
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: '8 min read',
      category: 'Monetary Policy',
      tags: ['Federal Reserve', 'Interest Rates', 'FOMC', 'Market Analysis'],
      stats: {
        views: 2847,
        likes: 156,
        comments: 23,
      },
    },
    '2': {
      id: '2',
      title: 'Tech Stocks Rally as AI Investment Surge Continues',
      content: `
        <p>The technology sector has experienced a remarkable rally in recent weeks, driven primarily by continued investment in artificial intelligence infrastructure and applications. Major technology companies have reported significant gains as investors bet on the transformative potential of AI technologies.</p>
        
        <h2>AI Investment Landscape</h2>
        <p>The current AI investment surge represents one of the most significant technological shifts since the advent of the internet. Companies across various sectors are allocating substantial resources to AI research, development, and implementation.</p>
        
        <p>Key areas of investment include:</p>
        <ul>
          <li>Machine learning infrastructure and cloud computing</li>
          <li>Natural language processing and generative AI</li>
          <li>Computer vision and autonomous systems</li>
          <li>AI-powered analytics and decision-making tools</li>
        </ul>
        
        <h2>Market Performance Analysis</h2>
        <p>Leading technology stocks have shown impressive performance metrics over the past quarter. Companies with significant AI exposure have outperformed broader market indices by substantial margins.</p>
        
        <p>Notable performers include semiconductor companies that produce AI chips, cloud service providers offering AI platforms, and software companies integrating AI capabilities into their products.</p>
        
        <h2>Valuation Considerations</h2>
        <p>While the enthusiasm for AI investments is understandable, investors must carefully consider valuation metrics and long-term sustainability of current growth rates. Historical technology cycles suggest that periods of rapid growth are often followed by consolidation phases.</p>
        
        <p>Key valuation factors to monitor:</p>
        <ul>
          <li>Revenue growth sustainability</li>
          <li>Profit margin expansion potential</li>
          <li>Competitive moat development</li>
          <li>Regulatory environment changes</li>
        </ul>
        
        <h2>Risk Assessment</h2>
        <p>Despite the positive momentum, several risks could impact the continued rally in tech stocks. These include potential regulatory scrutiny of AI technologies, increased competition, and the possibility of technological disruption from unexpected sources.</p>
        
        <p>Investors should maintain a balanced perspective and consider diversification strategies that account for both the opportunities and risks associated with AI-focused investments.</p>
        
        <h2>Future Outlook</h2>
        <p>The long-term outlook for AI-related investments remains positive, with analysts projecting continued growth in AI adoption across industries. However, the pace of growth may moderate as the technology matures and market dynamics evolve.</p>
        
        <p>Successful investors will likely be those who can identify companies with sustainable competitive advantages in AI technologies while avoiding speculative investments that lack fundamental business merit.</p>
      `,
      author: {
        name: 'Michael Chen',
        role: 'Portfolio Manager',
        avatar: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=100',
        initials: 'MC',
      },
      publishedAt: '2024-01-14T14:15:00Z',
      readTime: '6 min read',
      category: 'Technology',
      tags: ['AI', 'Technology Stocks', 'Investment Analysis', 'Market Trends'],
      stats: {
        views: 1923,
        likes: 89,
        comments: 15,
      },
    },
    '3': {
      id: '3',
      title: 'Energy Sector Outlook: Renewable vs Traditional',
      content: `
        <p>The energy sector continues to undergo a fundamental transformation as renewable energy sources gain market share and traditional energy companies adapt their business models. This comprehensive analysis examines the current state of both renewable and traditional energy investments.</p>
        
        <h2>Renewable Energy Growth</h2>
        <p>Renewable energy has experienced unprecedented growth over the past decade, driven by technological improvements, cost reductions, and supportive government policies. Solar and wind power have become cost-competitive with traditional energy sources in many markets.</p>
        
        <p>Key growth drivers include:</p>
        <ul>
          <li>Declining technology costs</li>
          <li>Government incentives and mandates</li>
          <li>Corporate sustainability commitments</li>
          <li>Improved energy storage solutions</li>
        </ul>
        
        <h2>Traditional Energy Adaptation</h2>
        <p>Traditional energy companies are not standing still in the face of renewable energy growth. Many have begun significant investments in clean energy technologies while maintaining their core operations.</p>
        
        <p>Adaptation strategies include:</p>
        <ul>
          <li>Diversification into renewable energy projects</li>
          <li>Investment in carbon capture technologies</li>
          <li>Natural gas as a transition fuel</li>
          <li>Efficiency improvements in existing operations</li>
        </ul>
        
        <h2>Investment Implications</h2>
        <p>The energy transition presents both opportunities and challenges for investors. While renewable energy offers growth potential, traditional energy companies may provide value opportunities and dividend income.</p>
        
        <p>Portfolio considerations should include:</p>
        <ul>
          <li>Geographic exposure to different energy markets</li>
          <li>Technology risk in emerging renewable sectors</li>
          <li>Regulatory and policy risk factors</li>
          <li>Commodity price volatility impacts</li>
        </ul>
        
        <h2>Market Dynamics</h2>
        <p>Energy markets are influenced by complex factors including geopolitical events, weather patterns, economic growth, and technological developments. Understanding these dynamics is crucial for successful energy sector investing.</p>
        
        <p>Recent market trends show increased volatility in energy prices, driven by supply chain disruptions, geopolitical tensions, and changing demand patterns following global economic shifts.</p>
        
        <h2>Long-term Outlook</h2>
        <p>The long-term outlook for the energy sector points toward continued growth in renewable energy adoption, but traditional energy sources will likely remain important for decades to come. The transition will be gradual and regionally varied.</p>
        
        <p>Successful energy investors will need to balance exposure to both traditional and renewable energy sources while carefully managing the risks associated with this transitional period.</p>
      `,
      author: {
        name: 'Emily Rodriguez',
        role: 'Market Strategist',
        avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100',
        initials: 'ER',
      },
      publishedAt: '2024-01-13T09:45:00Z',
      readTime: '10 min read',
      category: 'Energy',
      tags: ['Energy Transition', 'Renewable Energy', 'Investment Strategy', 'Market Analysis'],
      stats: {
        views: 1654,
        likes: 72,
        comments: 18,
      },
    },
  };
  
  return articles[id as keyof typeof articles] || null;
};

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.id);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/articles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
          
          {/* Article Header */}
          <Card className="mb-8">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{article.stats.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-3xl font-bold text-gray-900 leading-tight mb-6">
                {article.title}
              </CardTitle>
              
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{article.author.name}</p>
                    <p className="text-sm text-gray-600">{article.author.role}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    {article.stats.likes}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {article.stats.comments}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>
          
          {/* Tags */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Comments ({article.stats.comments})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Comment Form */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Leave a comment</h4>
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Share your thoughts..."
                    />
                    <div className="flex justify-end">
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </div>
                
                {/* Sample Comments */}
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">John Doe</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Great analysis! The insights on Fed policy implications are particularly valuable for portfolio planning.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">Alice Smith</span>
                        <span className="text-xs text-gray-500">4 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        I appreciate the balanced perspective on both opportunities and risks. This helps with strategic decision making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}