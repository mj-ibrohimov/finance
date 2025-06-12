import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Financial Analyst',
    expertise: 'Equity Research',
    bio: 'CFA charterholder with 10+ years experience in equity analysis',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'Portfolio Manager',
    expertise: 'Risk Management',
    bio: 'Specialized in quantitative analysis and risk assessment',
    avatar: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Market Strategist',
    expertise: 'Macro Analysis',
    bio: 'Expert in macroeconomic trends and market forecasting',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    initials: 'ER',
  },
];

export function TeamPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet Our Expert Team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team of certified financial analysts and market experts brings decades of combined experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <Card key={member.name} className="group hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-lg font-semibold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <Badge variant="secondary" className="mb-3">
                  {member.expertise}
                </Badge>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/team">View Full Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}