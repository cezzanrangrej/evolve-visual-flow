
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-black bg-opacity-60 backdrop-blur-md shadow-md' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-poppins font-bold text-white flex items-center">
          <span className="text-versionBlue">Version</span>Evolve
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/services" className="nav-item">Our Services</Link>
          <Link to="/files" className="nav-item">Your Uploaded Files</Link>
          <Link to="/contact" className="nav-item">Contact Us</Link>
          <Link to="/get-started" className="ml-4 px-6 py-2 rounded-md bg-versionBlue hover:bg-opacity-90 transition-colors text-white font-medium">
            Get Started
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-versionBgDarker bg-opacity-95 backdrop-blur-md absolute w-full animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white py-2 hover:text-versionBlue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-white py-2 hover:text-versionBlue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Services
            </Link>
            <Link 
              to="/files" 
              className="text-white py-2 hover:text-versionBlue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Your Uploaded Files
            </Link>
            <Link 
              to="/contact" 
              className="text-white py-2 hover:text-versionBlue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link 
              to="/get-started" 
              className="px-6 py-2 bg-versionBlue text-white rounded-md text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
