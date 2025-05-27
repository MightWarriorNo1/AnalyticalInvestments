import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-purple-500/10 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                AnalyticalInvestments
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-purple-500 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-foreground hover:text-purple-500 transition-colors">
                About
              </Link>
              <Link to="/services" className="text-foreground hover:text-purple-500 transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-foreground hover:text-purple-500 transition-colors">
                Contact
              </Link>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-purple-500 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-purple-500/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-foreground hover:text-purple-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-foreground hover:text-purple-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-foreground hover:text-purple-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-foreground hover:text-purple-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 btn-primary w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 