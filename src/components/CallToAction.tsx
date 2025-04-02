
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="py-16 relative">
      <div className="absolute inset-0 bg-version-gradient opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of satisfied users who have streamlined their document transformation process with VersionEvolve.
          </p>
          <Link 
            to="/get-started" 
            className="gradient-btn inline-flex items-center"
          >
            Get Started Now <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
