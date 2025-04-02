
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, GitHub, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-versionBgDarker py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-poppins font-bold text-white flex items-center">
              <span className="text-versionBlue">Version</span>Evolve
            </Link>
            <p className="mt-4 text-gray-400">
              Seamless document transformation for all your versioning needs.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-versionBlue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-versionBlue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-versionBlue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-versionBlue transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-versionBlue transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-versionBlue transition-colors">Our Services</Link></li>
              <li><Link to="/files" className="text-gray-400 hover:text-versionBlue transition-colors">Your Files</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-versionBlue transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-400 hover:text-versionBlue transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-versionBlue transition-colors">Blog</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-versionBlue transition-colors">Documentation</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-versionBlue transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="mr-2" size={18} />
                contact@versionevolve.com
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="mr-2" size={18} />
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2023 VersionEvolve. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-versionBlue transition-colors mr-4">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-versionBlue transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
