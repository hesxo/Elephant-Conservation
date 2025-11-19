import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Plus, LogOut, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { Elephant } from './Elephants';
import { AddElephantDialog } from './AddElephantDialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [elephants, setElephants] = useState<Elephant[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingElephant, setEditingElephant] = useState<Elephant | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load elephants from localStorage or use default data
  useEffect(() => {
    const stored = localStorage.getItem('elephants');
    if (stored) {
      setElephants(JSON.parse(stored));
    } else {
      // Initialize with default data
      const defaultElephants = getDefaultElephants();
      setElephants(defaultElephants);
      localStorage.setItem('elephants', JSON.stringify(defaultElephants));
    }
  }, []);

  const handleAddElephant = (elephant: Elephant) => {
    const newElephants = [...elephants, elephant];
    setElephants(newElephants);
    localStorage.setItem('elephants', JSON.stringify(newElephants));
    setIsAddDialogOpen(false);
  };

  const handleEditElephant = (elephant: Elephant) => {
    const updatedElephants = elephants.map(e => e.id === elephant.id ? elephant : e);
    setElephants(updatedElephants);
    localStorage.setItem('elephants', JSON.stringify(updatedElephants));
    setEditingElephant(null);
  };

  const handleDeleteElephant = (id: string) => {
    const filteredElephants = elephants.filter(e => e.id !== id);
    setElephants(filteredElephants);
    localStorage.setItem('elephants', JSON.stringify(filteredElephants));
    setDeleteConfirm(null);
  };

  const statusColors = {
    'Healthy': 'bg-green-100 text-green-800',
    'Under Care': 'bg-yellow-100 text-yellow-800',
    'Protected': 'bg-blue-100 text-blue-800',
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-2">Admin Dashboard</h1>
              <p className="text-xl text-blue-100">Manage elephant database</p>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Total Elephants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{elephants.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Male</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{elephants.filter(e => e.gender === 'Male').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Female</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{elephants.filter(e => e.gender === 'Female').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Tuskers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{elephants.filter(e => e.gender === 'Tusker').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Under Care</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">{elephants.filter(e => e.status === 'Under Care').length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2" size={18} />
            Add New Elephant
          </Button>
        </div>

        {/* Elephants Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Age</th>
                  <th className="px-6 py-3 text-left">Gender</th>
                  <th className="px-6 py-3 text-left">Location</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {elephants.map((elephant) => (
                  <tr key={elephant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded overflow-hidden">
                        <ImageWithFallback
                          src={elephant.imageUrl}
                          alt={elephant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{elephant.name}</td>
                    <td className="px-6 py-4">{elephant.age} years</td>
                    <td className="px-6 py-4">{elephant.gender}</td>
                    <td className="px-6 py-4">{elephant.location}</td>
                    <td className="px-6 py-4">
                      <Badge className={statusColors[elephant.status]}>
                        {elephant.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingElephant(elephant)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteConfirm(elephant.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AddElephantDialog
        open={isAddDialogOpen || !!editingElephant}
        onClose={() => {
          setIsAddDialogOpen(false);
          setEditingElephant(null);
        }}
        onSave={editingElephant ? handleEditElephant : handleAddElephant}
        elephant={editingElephant}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the elephant from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteElephant(deleteConfirm)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Default elephants data
function getDefaultElephants(): Elephant[] {
  return [
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
    // Add more default elephants as needed...
  ];
}