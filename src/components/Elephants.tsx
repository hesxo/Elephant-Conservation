import { useState, useEffect } from 'react';
import { ElephantCard } from './ElephantCard';
import { ElephantDetail } from './ElephantDetail';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search } from 'lucide-react';

export interface Elephant {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Tusker';
  location: string;
  region: string;
  height: string;
  weight: string;
  status: 'Healthy' | 'Under Care' | 'Protected';
  description: string;
  imageUrl: string;
  additionalImages?: string[]; // Additional images for gallery
  // Additional details
  diet?: string;
  habitat?: string;
  behavior?: string;
  healthNotes?: string;
  identifyingFeatures?: string;
  lastSeen?: string;
}

// Sample elephant data
const elephantsData: Elephant[] = [
  {
    id: '1',
    name: 'Raja',
    age: 45,
    gender: 'Tusker',
    location: 'Pinnawala Elephant Orphanage',
    region: 'Sabaragamuwa Province',
    height: '3.2m',
    weight: '5,200kg',
    status: 'Healthy',
    description: 'Raja is a majestic tusker and one of the oldest elephants at Pinnawala. Known for his calm temperament and gentle nature.',
    imageUrl: 'https://images.unsplash.com/photo-1701665841827-26dce299b312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzUyMzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    diet: 'Grass, leaves, bark, and fruits. Consumes approximately 150kg of food daily.',
    habitat: 'Prefers open grasslands near water sources. Frequently seen near the Ma Oya River.',
    behavior: 'Very social and gentle. Often interacts with younger elephants in a protective manner. Shows remarkable memory and recognition of handlers.',
    healthNotes: 'Regular health checkups show excellent cardiovascular condition. Recent dental examination shows healthy molars.',
    identifyingFeatures: 'Large curved tusks with a distinctive chip on the left tusk. Small notch on right ear.',
    lastSeen: 'November 18, 2025',
  },
  {
    id: '2',
    name: 'Lakshmi',
    age: 28,
    gender: 'Female',
    location: 'Udawalawe National Park',
    region: 'Sabaragamuwa Province',
    height: '2.8m',
    weight: '3,800kg',
    status: 'Healthy',
    description: 'Lakshmi is a protective mother elephant often seen with her calf. She leads a small herd in the northern section of the park.',
    imageUrl: 'https://images.unsplash.com/photo-1719807633728-7ff13f7f2b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50fGVufDF8fHx8MTc2MzQ1MzE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    additionalImages: [
      'https://images.unsplash.com/photo-1696243530667-74fd70449367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGJhYnklMjBtb3RoZXJ8ZW58MXx8fHwxNzYzNTMyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1607571183710-82fbb3b57f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGhlcmR8ZW58MXx8fHwxNzYzNTMyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    diet: 'Diverse diet including bamboo shoots, wild grasses, and seasonal fruits. Feeds primarily during early morning and late afternoon.',
    habitat: 'Northern grasslands of Udawalawe. Migrates seasonally between water sources.',
    behavior: 'Highly protective matriarch. Demonstrates excellent leadership skills and strong family bonds. Known to help other mothers with calves.',
    healthNotes: 'In excellent health. Successfully raised three calves. Currently nursing a 2-year-old calf.',
    identifyingFeatures: 'Distinctive V-shaped tear in left ear. Lighter skin pigmentation on trunk.',
    lastSeen: 'November 17, 2025',
  },
  {
    id: '3',
    name: 'Nimal',
    age: 15,
    gender: 'Male',
    location: 'Yala National Park',
    region: 'Southern Province',
    height: '2.9m',
    weight: '4,100kg',
    status: 'Healthy',
    description: 'A young bull elephant known for his playful behavior. Nimal is frequently spotted near the waterholes during dry season.',
    imageUrl: 'https://images.unsplash.com/photo-1714281346649-3594296cc13f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGVsZXBoYW50fGVufDF8fHx8MTc2MzUyMzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    diet: 'Prefers tender shoots and aquatic plants. Often seen feeding on water lilies in the park lagoons.',
    habitat: 'Block 1 area of Yala, near permanent water sources. Stays close to Menik River during dry months.',
    behavior: 'Energetic and curious. Often engages in mock fights with other young bulls. Shows strong swimming abilities.',
    healthNotes: 'Excellent physical condition. Active and energetic. No health concerns noted.',
    identifyingFeatures: 'Short tusks just beginning to develop. Distinctive white patch on forehead.',
    lastSeen: 'November 19, 2025',
  },
  {
    id: '4',
    name: 'Sita',
    age: 5,
    gender: 'Female',
    location: 'Pinnawala Elephant Orphanage',
    region: 'Sabaragamuwa Province',
    height: '2.0m',
    weight: '1,800kg',
    status: 'Under Care',
    description: 'Sita was rescued as an orphaned calf and is now thriving at the orphanage. She is learning from the older elephants.',
    imageUrl: 'https://images.unsplash.com/photo-1554137283-52aa8e9f4bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwZWxlcGhhbnR8ZW58MXx8fHwxNzYzNTIzNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    diet: 'Special diet including milk supplements, soft grasses, and vitamin-enriched foods. Gradually transitioning to adult diet.',
    habitat: 'Orphanage grounds with access to river bathing area. Protected environment with constant supervision.',
    behavior: 'Playful and affectionate. Has formed strong bonds with caretakers and other young elephants. Shows rapid learning abilities.',
    healthNotes: 'Under regular veterinary care. Recovering well from early malnutrition. Weight gain is progressing as expected.',
    identifyingFeatures: 'Small scar on left hind leg from rescue. Very light skin tone for her age.',
    lastSeen: 'November 19, 2025',
  },
  {
    id: '5',
    name: 'Kumara',
    age: 52,
    gender: 'Tusker',
    location: 'Minneriya National Park',
    region: 'North Central Province',
    height: '3.3m',
    weight: '5,500kg',
    status: 'Protected',
    description: 'One of the largest elephants in Sri Lanka. Kumara is known for his impressive tusks and is a popular sight during The Gathering.',
    imageUrl: 'https://images.unsplash.com/photo-1634646297235-008cc35cb8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGNvbnNlcnZhdGlvbnxlbnwxfHx8fDE3NjM1MjMzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    additionalImages: [
      'https://images.unsplash.com/photo-1552235898-913736ab3398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGRyaW5raW5nJTIwd2F0ZXJ8ZW58MXx8fHwxNzYzNTMyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1701665841827-26dce299b312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzUyMzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1607571183710-82fbb3b57f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGhlcmR8ZW58MXx8fHwxNzYzNTMyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    diet: 'Mature bull diet consisting of bark, roots, and mature grasses. Requires 200kg+ of food daily.',
    habitat: 'Minneriya Tank area. Famous for participating in The Gathering, where hundreds of elephants congregate during dry season.',
    behavior: 'Dominant male with established territory. Generally solitary but tolerates other males. Demonstrates complex social interactions during The Gathering.',
    healthNotes: 'Monitored closely due to age. Shows signs of arthritis in front left leg but manages well. Strong appetite and good mobility.',
    identifyingFeatures: 'Massive curved tusks measuring over 1.5m each. Distinctive wrinkled trunk. One of the most photographed elephants in Sri Lanka.',
    lastSeen: 'November 15, 2025',
  },
  {
    id: '6',
    name: 'Chamari',
    age: 22,
    gender: 'Female',
    location: 'Kaudulla National Park',
    region: 'North Central Province',
    height: '2.7m',
    weight: '3,600kg',
    status: 'Healthy',
    description: 'Chamari is part of a large matriarchal herd. She is known for her intelligence and strong maternal instincts.',
    imageUrl: 'https://images.unsplash.com/photo-1719807633728-7ff13f7f2b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50fGVufDF8fHx8MTc2MzQ1MzE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    diet: 'Selective feeder preferring high-quality grasses and leaves. Often leads herd to best feeding grounds.',
    habitat: 'Kaudulla Tank surroundings. Migrates between Kaudulla and Minneriya based on water availability.',
    behavior: 'Intelligent and cautious. Acts as secondary matriarch in her herd. Excellent problem-solving abilities observed.',
    healthNotes: 'Perfect health. Successfully raised two calves. Excellent body condition maintained year-round.',
    identifyingFeatures: 'Smooth tusks of equal length. Distinctive triangular-shaped head.',
    lastSeen: 'November 16, 2025',
  },
  {
    id: '7',
    name: 'Bandula',
    age: 38,
    gender: 'Male',
    location: 'Wilpattu National Park',
    region: 'North Western Province',
    height: '3.1m',
    weight: '4,900kg',
    status: 'Healthy',
    description: 'Bandula is a solitary bull often found in the dense forests of Wilpattu. He has adapted well to the park ecosystem.',
    imageUrl: 'https://images.unsplash.com/photo-1701665841827-26dce299b312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzUyMzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    diet: 'Forest diet including bark from specific tree species, roots, and forest floor vegetation.',
    habitat: 'Dense forest areas around Wilpattu villus (natural lakes). Prefers secluded areas away from tourist zones.',
    behavior: 'Solitary and elusive. Avoids human contact. Most active during dawn and dusk. Shows territorial behavior.',
    healthNotes: 'Healthy and strong. Adapted well to forest environment. Occasional monitoring through camera traps.',
    identifyingFeatures: 'Asymmetrical tusks - right tusk noticeably longer. Dark skin pigmentation.',
    lastSeen: 'November 12, 2025',
  },
  {
    id: '8',
    name: 'Malini',
    age: 31,
    gender: 'Female',
    location: 'Udawalawe National Park',
    region: 'Sabaragamuwa Province',
    height: '2.9m',
    weight: '4,000kg',
    status: 'Protected',
    description: 'Malini is the matriarch of a large family group. She leads her herd with wisdom and protects the younger members.',
    imageUrl: 'https://images.unsplash.com/photo-1714281346649-3594296cc13f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGVsZXBoYW50fGVufDF8fHx8MTc2MzUyMzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    diet: 'Leads herd to nutritious feeding areas. Balanced diet of grasses, leaves, and seasonal fruits.',
    habitat: 'Central Udawalawe area. Maintains consistent home range of approximately 50 square kilometers.',
    behavior: 'Wise and experienced matriarch. Makes strategic decisions for herd safety and welfare. Commands respect from all herd members.',
    healthNotes: 'Excellent health for age. Successfully led herd through multiple dry seasons. Strong leadership ensures herd health.',
    identifyingFeatures: 'Distinctive fold pattern on trunk. Missing tip of tail from old injury. Commands presence.',
    lastSeen: 'November 18, 2025',
  },
];

export function Elephants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [selectedElephant, setSelectedElephant] = useState<Elephant | null>(null);
  const [elephants, setElephants] = useState<Elephant[]>([]);

  // Load elephants from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('elephants');
    if (stored) {
      setElephants(JSON.parse(stored));
    } else {
      // Use default data if nothing in localStorage
      setElephants(elephantsData);
    }
  }, []);

  const filteredElephants = elephants.filter((elephant) => {
    const matchesSearch = elephant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         elephant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || elephant.region === filterRegion;
    const matchesGender = filterGender === 'all' || elephant.gender === filterGender;
    
    return matchesSearch && matchesRegion && matchesGender;
  });

  const regions = Array.from(new Set(elephants.map(e => e.region)));

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Sri Lankan Elephants</h1>
          <p className="text-xl max-w-3xl">
            Explore our database of elephants across Sri Lanka's national parks and sanctuaries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Tusker">Tusker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 text-gray-600">
            Showing {filteredElephants.length} of {elephantsData.length} elephants
          </div>
        </div>
      </div>

      {/* Elephant Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredElephants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No elephants found matching your criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElephants.map((elephant) => (
              <ElephantCard 
                key={elephant.id} 
                elephant={elephant}
                onClick={() => setSelectedElephant(elephant)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Elephant Detail Modal */}
      {selectedElephant && (
        <ElephantDetail
          elephant={selectedElephant}
          open={!!selectedElephant}
          onClose={() => setSelectedElephant(null)}
        />
      )}
    </div>
  );
}