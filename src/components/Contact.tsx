import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Get in touch with us to learn more about our conservation efforts or to get involved
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg">
                <p className="mb-2">Thank you for your message!</p>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2" size={18} />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="mb-6">Get In Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Email</h3>
                  <p className="text-gray-700">info@srilankaelephants.org</p>
                  <p className="text-gray-700">conservation@srilankaelephants.org</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Phone</h3>
                  <p className="text-gray-700">+94 11 234 5678</p>
                  <p className="text-gray-700">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Address</h3>
                  <p className="text-gray-700">
                    123 Conservation Road<br />
                    Colombo 07<br />
                    Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1568918223182-5ab2f1d87ec5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMG5hdHVyZXxlbnwxfHx8fDE3NjM0NTMxODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sri Lanka nature"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
