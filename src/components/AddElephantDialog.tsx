import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Plus } from 'lucide-react';
import type { Elephant } from './Elephants';

interface AddElephantDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (elephant: Elephant) => void;
  elephant?: Elephant | null;
}

export function AddElephantDialog({ open, onClose, onSave, elephant }: AddElephantDialogProps) {
  const [formData, setFormData] = useState<Partial<Elephant>>({
    name: '',
    age: 0,
    gender: 'Tusker',
    location: '',
    region: '',
    height: '',
    weight: '',
    status: 'Healthy',
    description: '',
    imageUrl: '',
    additionalImages: [],
    diet: '',
    habitat: '',
    behavior: '',
    healthNotes: '',
    identifyingFeatures: '',
    lastSeen: '',
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (elephant) {
      setFormData(elephant);
    } else {
      setFormData({
        name: '',
        age: 0,
        gender: 'Tusker',
        location: '',
        region: '',
        height: '',
        weight: '',
        status: 'Healthy',
        description: '',
        imageUrl: '',
        additionalImages: [],
        diet: '',
        habitat: '',
        behavior: '',
        healthNotes: '',
        identifyingFeatures: '',
        lastSeen: '',
      });
    }
    setNewImageUrl('');
  }, [elephant, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const elephantData: Elephant = {
      id: elephant?.id || Date.now().toString(),
      name: formData.name || '',
      age: formData.age || 0,
      gender: formData.gender as 'Male' | 'Female' | 'Tusker' || 'Tusker',
      location: formData.location || '',
      region: formData.region || '',
      height: formData.height || '',
      weight: formData.weight || '',
      status: formData.status as 'Healthy' | 'Under Care' | 'Protected' || 'Healthy',
      description: formData.description || '',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1719807633728-7ff13f7f2b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50fGVufDF8fHx8MTc2MzQ1MzE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      additionalImages: formData.additionalImages,
      diet: formData.diet,
      habitat: formData.habitat,
      behavior: formData.behavior,
      healthNotes: formData.healthNotes,
      identifyingFeatures: formData.identifyingFeatures,
      lastSeen: formData.lastSeen,
    };
    onSave(elephantData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = formData.additionalImages || [];
      setFormData(prev => ({ 
        ...prev, 
        additionalImages: [...currentImages, newImageUrl.trim()] 
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = formData.additionalImages || [];
    setFormData(prev => ({ 
      ...prev, 
      additionalImages: currentImages.filter((_, i) => i !== index) 
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{elephant ? 'Edit Elephant' : 'Add New Elephant'}</DialogTitle>
          <DialogDescription>
            {elephant ? 'Update elephant information' : 'Enter the details of the new elephant'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="border-b pb-2">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="age">Age (years) *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Tusker">Tusker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthy">Healthy</SelectItem>
                    <SelectItem value="Under Care">Under Care</SelectItem>
                    <SelectItem value="Protected">Protected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="height">Height *</Label>
                <Input
                  id="height"
                  placeholder="e.g., 2.8m"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight *</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 3,800kg"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="border-b pb-2">Location Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Udawalawe National Park"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="region">Region *</Label>
                <Input
                  id="region"
                  placeholder="e.g., Sabaragamuwa Province"
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="lastSeen">Last Seen</Label>
                <Input
                  id="lastSeen"
                  placeholder="e.g., November 19, 2025"
                  value={formData.lastSeen}
                  onChange={(e) => handleChange('lastSeen', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="border-b pb-2">Description</h3>
            
            <div>
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Main Image URL *</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Additional Images */}
            <div>
              <Label>Additional Images (Optional)</Label>
              <div className="mt-2 space-y-2">
                {/* Existing additional images */}
                {formData.additionalImages && formData.additionalImages.length > 0 && (
                  <div className="space-y-2">
                    {formData.additionalImages.map((imgUrl, index) => (
                      <div key={index} className="flex gap-2 items-center p-2 bg-gray-50 rounded">
                        <Input
                          value={imgUrl}
                          readOnly
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-600"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add new image */}
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Enter image URL and click Add"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddImage();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddImage}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Added {formData.additionalImages?.length || 0} additional image(s)
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-4">
            <h3 className="border-b pb-2">Detailed Information (Optional)</h3>
            
            <div>
              <Label htmlFor="diet">Diet</Label>
              <Textarea
                id="diet"
                value={formData.diet}
                onChange={(e) => handleChange('diet', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="habitat">Habitat</Label>
              <Textarea
                id="habitat"
                value={formData.habitat}
                onChange={(e) => handleChange('habitat', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="behavior">Behavior</Label>
              <Textarea
                id="behavior"
                value={formData.behavior}
                onChange={(e) => handleChange('behavior', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="healthNotes">Health Notes</Label>
              <Textarea
                id="healthNotes"
                value={formData.healthNotes}
                onChange={(e) => handleChange('healthNotes', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="identifyingFeatures">Identifying Features</Label>
              <Textarea
                id="identifyingFeatures"
                value={formData.identifyingFeatures}
                onChange={(e) => handleChange('identifyingFeatures', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {elephant ? 'Update' : 'Add'} Elephant
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}