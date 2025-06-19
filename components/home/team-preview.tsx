import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Twitter } from 'lucide-react';

export function TeamPreview() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Chief Investment Officer",
      expertise: "Portfolio Management",
      experience: "15+ years",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Former Goldman Sachs VP with expertise in quantitative analysis and risk management."
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Market Analyst",
      expertise: "Technical Analysis",
      experience: "12+ years",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Specialized in emerging markets and cryptocurrency analysis with a track record of accurate predictions."
    },
    {
      name: "Emily Watson",
      role: "Research Director",
      expertise: "Fundamental Analysis",
      experience: "18+ years",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "PhD in Economics from MIT, former Federal Reserve researcher with deep macroeconomic insights."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our team of seasoned professionals brings decades of Wall Street experience to help guide your investment decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium mb-2">
                  {member.role}
                </CardDescription>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge variant="outline">{member.expertise}</Badge>
                  <Badge variant="outline">{member.experience}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}