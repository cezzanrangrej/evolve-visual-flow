
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 flex items-center overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 z-[-2]">
        <div className="absolute inset-0 bg-gradient-to-br from-versionBgDark to-versionBgDarker opacity-90"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-versionBlue via-transparent to-transparent animate-pulse-light"></div>
      </div>
      
      {/* Floating particles - will be replaced by Three.js animation */}
      <div className="absolute inset-0 z-[-1]">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full bg-versionBlue bg-opacity-${10 + i * 5} animate-float`}
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className={`w-full lg:w-1/2 space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Seamless Document <span className="text-transparent bg-clip-text bg-version-gradient">Transformation.</span>
            </h1>
            <p className="text-xl text-gray-300">
              Upload, Select Versions, and Get Your Report Instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started" className="gradient-btn flex items-center justify-center">
                Get Started <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/services" className="px-8 py-3 rounded-md text-white border border-white border-opacity-20 hover:border-opacity-50 transition-all duration-300 text-center">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Upload and Transform Section */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="glassmorphism rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">
                Transform Your Documents
              </h3>
              
              <div className="space-y-6">
                {/* Software Selection */}
                <div>
                  <label className="block text-gray-300 mb-2">Select Software Type</label>
                  <select className="form-input">
                    <option value="">Choose Software</option>
                    <option value="word">Microsoft Word</option>
                    <option value="pdf">PDF Document</option>
                    <option value="markdown">Markdown</option>
                    <option value="excel">Microsoft Excel</option>
                  </select>
                </div>
                
                {/* File Upload */}
                <div>
                  <label className="block text-gray-300 mb-2">Upload Your Document</label>
                  <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center cursor-pointer hover:border-versionBlue transition-colors">
                    <p className="text-gray-300">Drag & Drop or Click to Upload</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 md:items-end">
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-2">
                      Current Version 
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Detected: v2.1
                      </span>
                    </label>
                    <input type="text" className="form-input" readOnly value="Version 2.1" />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-2">Target Version</label>
                    <select className="form-input">
                      <option value="3.0">Version 3.0</option>
                      <option value="2.5">Version 2.5</option>
                      <option value="2.0">Version 2.0 (Downgrade)</option>
                    </select>
                  </div>
                </div>
                
                <button className="w-full py-3 rounded-md bg-versionBlue text-white font-semibold hover:bg-opacity-90 transition-colors">
                  Get Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
