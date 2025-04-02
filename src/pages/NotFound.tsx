
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center container mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-6xl font-bold mb-4 text-versionBlue">404</h1>
          <p className="text-2xl text-white mb-8">Oops! We couldn't find that page.</p>
          <p className="text-gray-300 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link to="/" className="gradient-btn inline-block">
            Return to Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
