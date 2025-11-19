import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Calendar, Ruler, Weight } from 'lucide-react';
import type { Elephant } from './Elephants';

interface ElephantCardProps {
  elephant: Elephant;
  onClick?: () => void;
}

export function ElephantCard({ elephant, onClick }: ElephantCardProps) {
  const statusColors = {
    'Healthy': 'bg-green-100 text-green-800',
    'Under Care': 'bg-yellow-100 text-yellow-800',
    'Protected': 'bg-blue-100 text-blue-800',
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={elephant.imageUrl}
          alt={elephant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={statusColors[elephant.status]}>
            {elephant.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{elephant.name}</CardTitle>
            <CardDescription>{elephant.gender}</CardDescription>
          </div>
          <Badge variant="outline">{elephant.age} years</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4">{elephant.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-blue-600" />
            <span className="text-sm">{elephant.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} className="text-blue-600" />
            <span className="text-sm">{elephant.region}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Ruler size={16} className="text-blue-600" />
              <span className="text-sm">{elephant.height}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Weight size={16} className="text-blue-600" />
              <span className="text-sm">{elephant.weight}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}