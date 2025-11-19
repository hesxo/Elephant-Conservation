import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, Ruler, Weight, Utensils, Trees, Heart, Eye, MapPinned, Clock, Images } from 'lucide-react';
import type { Elephant } from './Elephants';
import { useState } from 'react';

interface ElephantDetailProps {
  elephant: Elephant;
  open: boolean;
  onClose: () => void;
}

export function ElephantDetail({ elephant, open, onClose }: ElephantDetailProps) {
  const [selectedImage, setSelectedImage] = useState(elephant.imageUrl);
  
  const statusColors = {
    'Healthy': 'bg-green-100 text-green-800',
    'Under Care': 'bg-yellow-100 text-yellow-800',
    'Protected': 'bg-blue-100 text-blue-800',
  };

  // All images including main image and additional images
  const allImages = [elephant.imageUrl, ...(elephant.additionalImages || [])];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-3xl">{elephant.name}</span>
            <Badge className={statusColors[elephant.status]}>
              {elephant.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {elephant.gender} elephant, {elephant.age} years old, located at {elephant.location}
          </DialogDescription>
        </DialogHeader>

        {/* Main Image */}
        <div className="rounded-lg overflow-hidden">
          <ImageWithFallback
            src={selectedImage}
            alt={elephant.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Image Gallery Thumbnails */}
        {allImages.length > 1 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Images className="text-blue-600" size={18} />
              <h4>Photo Gallery ({allImages.length})</h4>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {allImages.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === imgUrl 
                      ? 'border-blue-600 shadow-md' 
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
                >
                  <ImageWithFallback
                    src={imgUrl}
                    alt={`${elephant.name} - Photo ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Basic Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            <div>
              <div className="text-gray-600">Age</div>
              <div>{elephant.age} years</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-blue-600 text-xl">⚥</div>
            <div>
              <div className="text-gray-600">Gender</div>
              <div>{elephant.gender}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Ruler className="text-blue-600" size={20} />
            <div>
              <div className="text-gray-600">Height</div>
              <div>{elephant.height}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Weight className="text-blue-600" size={20} />
            <div>
              <div className="text-gray-600">Weight</div>
              <div>{elephant.weight}</div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <div className="text-gray-600">Location</div>
              <div>{elephant.location}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPinned className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <div className="text-gray-600">Region</div>
              <div>{elephant.region}</div>
            </div>
          </div>

          {elephant.lastSeen && (
            <div className="flex items-start gap-3">
              <Clock className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="text-gray-600">Last Seen</div>
                <div>{elephant.lastSeen}</div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-2">About {elephant.name}</h3>
          <p className="text-gray-700">{elephant.description}</p>
        </div>

        {/* Detailed Information */}
        <div className="space-y-4">
          {elephant.diet && (
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="text-blue-600" size={20} />
                <h4>Diet</h4>
              </div>
              <p className="text-gray-700">{elephant.diet}</p>
            </div>
          )}

          {elephant.habitat && (
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Trees className="text-green-600" size={20} />
                <h4>Habitat</h4>
              </div>
              <p className="text-gray-700">{elephant.habitat}</p>
            </div>
          )}

          {elephant.behavior && (
            <div className="border-l-4 border-purple-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="text-purple-600" size={20} />
                <h4>Behavior</h4>
              </div>
              <p className="text-gray-700">{elephant.behavior}</p>
            </div>
          )}

          {elephant.healthNotes && (
            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-red-600">❤️‍🩹</div>
                <h4>Health Notes</h4>
              </div>
              <p className="text-gray-700">{elephant.healthNotes}</p>
            </div>
          )}

          {elephant.identifyingFeatures && (
            <div className="border-l-4 border-orange-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="text-orange-600" size={20} />
                <h4>Identifying Features</h4>
              </div>
              <p className="text-gray-700">{elephant.identifyingFeatures}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}