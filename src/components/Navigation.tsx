import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: 'home' | 'elephants' | 'about' | 'contact' | 'admin';
  onNavigate: (page: 'home' | 'elephants' | 'about' | 'contact' | 'admin') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'elephants' as const, label: 'Elephants' },
    { id: 'about' as const, label: 'About Us' },
    { id: 'contact' as const, label: 'Contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <span className="text-gray-900">Sri Lanka Elephants</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'admin'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Shield size={16} />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 transition-colors ${
                currentPage === 'admin'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Shield size={16} />
              <span>Admin</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}