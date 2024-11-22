import { Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-yellow-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Solar Discounts
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#solutions" className="text-gray-700 hover:text-yellow-500">Solutions</a>
            <a href="#savings" className="text-gray-700 hover:text-yellow-500">Savings</a>
            <a href="#calculator" className="text-gray-700 hover:text-yellow-500">Calculator</a>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#solutions" className="block px-3 py-2 text-gray-700">Solutions</a>
            <a href="#savings" className="block px-3 py-2 text-gray-700">Savings</a>
            <a href="#calculator" className="block px-3 py-2 text-gray-700">Calculator</a>
            <button className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}