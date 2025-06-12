import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';

const analysts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Analyst',
    rating: 4.9,
    specialization: 'Tech Stocks',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
    initials: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Portfolio Manager',
    rating: 4.8,
    specialization: 'Value Investing',
    avatar: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=100',
    initials: 'MC',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Market Strategist',
    rating: 4.9,
    specialization: 'Macro Analysis',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100',
    initials: 'ER',
  },
];

export function TopAnalysts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Analysts</CardTitle>
        <CardDescription>Highest rated financial analysts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {analysts.map((analyst) => (
          <div key={analyst.id} className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={analyst.avatar} alt={analyst.name} />
              <AvatarFallback>{analyst.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{analyst.name}</p>
              <p className="text-xs text-gray-600">{analyst.role}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{analyst.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs py-0 px-1">
                  {analyst.specialization}
                </Badge>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/analysts">View All Analysts</Link>
        </Button>
      </CardContent>
    </Card>
  );
}