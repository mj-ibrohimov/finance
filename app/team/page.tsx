import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Financial Analyst',
    team: 'equity',
    expertise: ['Equity Research', 'Technology Sector', 'Growth Stocks'],
    bio: 'CFA charterholder with over 10 years of experience in equity analysis. Specialized in technology and growth companies with a focus on fundamental analysis and valuation models.',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'SJ',
    email: 'sarah.johnson@financehub.com',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    articles: 45,
    experience: '10+ years',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Portfolio Manager',
    team: 'portfolio',
    expertise: ['Risk Management', 'Quantitative Analysis', 'Asset Allocation'],
    bio: 'Expert in quantitative analysis and risk assessment with a strong background in mathematical modeling and portfolio optimization strategies.',
    avatar: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'MC',
    email: 'michael.chen@financehub.com',
    linkedin: 'https://linkedin.com/in/michaelchen',
    articles: 32,
    experience: '8+ years',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Market Strategist',
    team: 'strategy',
    expertise: ['Macro Analysis', 'Market Forecasting', 'Economic Trends'],
    bio: 'Macroeconomic specialist with expertise in market trends and economic forecasting. Provides strategic market insights and investment recommendations.',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'ER',
    email: 'emily.rodriguez@financehub.com',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    articles: 38,
    experience: '12+ years',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Fixed Income Analyst',
    team: 'fixed-income',
    expertise: ['Bond Analysis', 'Credit Research', 'Interest Rate Strategy'],
    bio: 'Specialized in fixed income securities and credit analysis with extensive experience in bond markets and interest rate strategies.',
    avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'DK',
    email: 'david.kim@financehub.com',
    linkedin: 'https://linkedin.com/in/davidkim',
    articles: 28,
    experience: '7+ years',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'ESG Research Director',
    team: 'esg',
    expertise: ['ESG Analysis', 'Sustainable Investing', 'Impact Measurement'],
    bio: 'Leading expert in ESG (Environmental, Social, Governance) research and sustainable investing strategies with a focus on impact measurement.',
    avatar: 'https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'LW',
    email: 'lisa.wang@financehub.com',
    linkedin: 'https://linkedin.com/in/lisawang',
    articles: 52,
    experience: '9+ years',
  },
  {
    id: 6,
    name: 'Robert Martinez',
    role: 'Alternative Investments Specialist',
    team: 'alternatives',
    expertise: ['Private Equity', 'Hedge Funds', 'Real Estate'],
    bio: 'Specialist in alternative investments including private equity, hedge funds, and real estate with a track record of identifying unique investment opportunities.',
    avatar: 'https://images.pexels.com/photos/3777932/pexels-photo-3777932.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'RM',
    email: 'robert.martinez@financehub.com',
    linkedin: 'https://linkedin.com/in/robertmartinez',
    articles: 24,
    experience: '11+ years',
  },
];

const teams = [
  { id: 'all', name: 'All Team Members', count: teamMembers.length },
  { id: 'equity', name: 'Equity Research', count: teamMembers.filter(m => m.team === 'equity').length },
  { id: 'portfolio', name: 'Portfolio Management', count: teamMembers.filter(m => m.team === 'portfolio').length },
  { id: 'strategy', name: 'Market Strategy', count: teamMembers.filter(m => m.team === 'strategy').length },
  { id: 'fixed-income', name: 'Fixed Income', count: teamMembers.filter(m => m.team === 'fixed-income').length },
  { id: 'esg', name: 'ESG Research', count: teamMembers.filter(m => m.team === 'esg').length },
  { id: 'alternatives', name: 'Alternative Investments', count: teamMembers.filter(m => m.team === 'alternatives').length },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Team</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Meet our team of certified financial analysts, portfolio managers, and market strategists. 
          With decades of combined experience, they provide the insights and expertise that drive our platform forward.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
          {teams.map((team) => (
            <TabsTrigger key={team.id} value={team.id} className="text-xs sm:text-sm">
              {team.name.split(' ')[0]} ({team.count})
            </TabsTrigger>
          ))}
        </TabsList>
        
        {teams.map((team) => (
          <TabsContent key={team.id} value={team.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(team.id === 'all' 
                ? teamMembers 
                : teamMembers.filter(member => member.team === team.id)
              ).map((member) => (
                <Card key={member.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-lg font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm mb-2">
                          {member.role}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{member.articles} articles</span>
                          <span>{member.experience}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Linkedin className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        View Profile →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}