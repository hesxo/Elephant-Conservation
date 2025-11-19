import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">About Us</h1>
          <p className="text-xl max-w-3xl">
            Dedicated to the conservation and protection of Sri Lanka's elephant population
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Sri Lanka is home to one of the largest populations of Asian elephants in the world. Our mission is to ensure the survival and well-being of these magnificent creatures through conservation, education, and community engagement.
            </p>
            <p className="text-gray-700 mb-4">
              We work tirelessly to protect elephant habitats, minimize human-elephant conflict, and promote sustainable coexistence between elephants and local communities.
            </p>
            <p className="text-gray-700">
              With approximately 7,500 elephants in Sri Lanka, representing about 10% of the world's Asian elephant population, our work is more critical than ever.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1584791097907-9b56344fa632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYSUyMGVsZXBoYW50JTIwY29uc2VydmF0aW9ufGVufDF8fHx8MTc2MzUzMzQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sri Lankan elephant conservation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="mb-3">Habitat Protection</h3>
              <p className="text-gray-700">
                Preserving and restoring natural elephant habitats across Sri Lanka
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="mb-3">Research</h3>
              <p className="text-gray-700">
                Conducting vital research on elephant behavior, health, and migration patterns
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="mb-3">Community Programs</h3>
              <p className="text-gray-700">
                Supporting communities affected by human-elephant conflict
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="mb-3">Education</h3>
              <p className="text-gray-700">
                Teaching the next generation about elephant conservation
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-50 rounded-lg p-8 md:p-12">
          <h2 className="mb-8 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl text-blue-600 mb-2">7,500+</div>
              <p className="text-gray-700">Elephants in Sri Lanka</p>
            </div>
            <div>
              <div className="text-4xl text-blue-600 mb-2">20+</div>
              <p className="text-gray-700">Protected Areas</p>
            </div>
            <div>
              <div className="text-4xl text-blue-600 mb-2">50+</div>
              <p className="text-gray-700">Community Partners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}