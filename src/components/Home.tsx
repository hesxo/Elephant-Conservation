import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight, Shield, Users, BookOpen, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface HomeProps {
  onNavigate: (page: 'elephants' | 'about' | 'contact') => void;
}

export function Home({ onNavigate }: HomeProps) {
  const heroImages = [
    'https://images.unsplash.com/photo-1719807633728-7ff13f7f2b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGVsZXBoYW50JTIwc3JpJTIwbGFua2F8ZW58MXx8fHwxNzYzNTMzMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1671185049471-b3066c993f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwaGVyZHxlbnwxfHx8fDE3NjM1MzMzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1731124655660-d79408df23af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwaGFiaXRhdHxlbnwxfHx8fDE3NjM1MzM0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1700745325266-4499ce4f71cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwc2FmYXJpfGVufDF8fHx8MTc2MzUzMzMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[700px] overflow-hidden">
        {/* Animated Background Images */}
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1.05 : 1,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={image}
              alt="Sri Lankan Elephant"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        
        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImageIndex === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              className="max-w-2xl text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Sri Lankan Elephants
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Discover and learn about the majestic Asian elephants of Sri Lanka. 
                Explore our comprehensive database of elephants across national parks and sanctuaries.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  size="lg"
                  onClick={() => onNavigate('elephants')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Explore Elephants <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('about')}
                  className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-around items-center gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl mb-2">7,500+</div>
              <p className="text-sm md:text-base">Elephants in Sri Lanka</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl mb-2">20+</div>
              <p className="text-sm md:text-base">National Parks</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl mb-2">10%</div>
              <p className="text-sm md:text-base">Of World's Asian Elephants</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl mb-2">50+</div>
              <p className="text-sm md:text-base">Years of Conservation</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dedicated to the conservation, protection, and study of Sri Lanka's elephant population
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600" size={36} />
              </div>
              <h3 className="mb-4">Protection</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Safeguarding elephants and their natural habitats across Sri Lanka
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-green-600" size={36} />
              </div>
              <h3 className="mb-4">Research</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Studying elephant behavior, health, and migration patterns
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-purple-600" size={36} />
              </div>
              <h3 className="mb-4">Community</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Working with local communities for peaceful coexistence
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-red-600" size={36} />
              </div>
              <h3 className="mb-4">Care</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Providing medical care and rehabilitation for injured elephants
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Why Sri Lankan Elephants Matter</h2>
              <p className="text-gray-700 mb-4">
                Sri Lanka is home to one of the largest populations of Asian elephants in the world. 
                These magnificent creatures are not just a national treasure, but play a vital role 
                in maintaining the ecological balance of our forests and grasslands.
              </p>
              <p className="text-gray-700 mb-4">
                Asian elephants are classified as endangered, with their populations declining due to 
                habitat loss and human-elephant conflict. Sri Lanka's elephants represent approximately 
                10% of the world's remaining Asian elephant population, making their conservation 
                critically important.
              </p>
              <p className="text-gray-700 mb-6">
                Through our database, you can explore individual elephants, learn about their unique 
                personalities, track their locations, and understand the conservation efforts being 
                made to protect them.
              </p>
              <Button
                onClick={() => onNavigate('elephants')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Elephant Database <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="rounded-lg overflow-hidden h-64"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1705936981588-a4192f66fcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzYzNDY4MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sri Lankan elephant in wildlife"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="rounded-lg overflow-hidden h-64 mt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1671185049471-b3066c993f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwaGVyZHxlbnwxfHx8fDE3NjM1MzMzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sri Lankan elephant herd"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Get Involved</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Want to support elephant conservation in Sri Lanka? Learn how you can make a difference.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('about')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              About Our Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}