
import { useEffect, useState } from 'react';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white">3D Document Processing Visualization</h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Interactive visualization of our document transformation pipeline
              </p>
              
              <div className="space-y-2">
                <h3 className="text-xl text-white font-semibold">Scene Components:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="text-versionBlue font-medium">Input Stage</span>
                    <p className="text-sm text-gray-400">3D document entering from left with subtle glow</p>
                  </li>
                  <li>
                    <span className="text-versionBlue font-medium">Processing Hub</span>
                    <p className="text-sm text-gray-400">Transparent chamber with rotating gears and data streams</p>
                  </li>
                  <li>
                    <span className="text-versionBlue font-medium">Versioning Lanes</span>
                    <p className="text-sm text-gray-400">Neon pathways for different output versions</p>
                  </li>
                  <li>
                    <span className="text-versionBlue font-medium">Output Stage</span>
                    <p className="text-sm text-gray-400">3D platforms displaying output files with preview thumbnails</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl text-white font-semibold">Interactions:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="text-green-500">✓</span> Hover over version lanes to highlight pathways
                  </li>
                  <li>
                    <span className="text-green-500">✓</span> Camera motion with parallax effect
                  </li>
                  <li>
                    <span className="text-green-500">✓</span> Futuristic lighting & reflections
                  </li>
                  <li>
                    <span className="text-green-500">✓</span> GSAP integration for smooth transitions
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Interactive 3D Visualization Placeholder */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="glassmorphism rounded-xl aspect-[4/3] p-4 relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 px-2 py-1 rounded text-xs text-white">
                Interactive 3D
              </div>
              
              {/* Simulated 3D Scene - Will be replaced by actual Three.js */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#0F172A] to-[#0F1F3D] rounded-lg overflow-hidden">
                {/* Input Document */}
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-12 h-16 bg-white rounded animate-pulse-slow flex items-center justify-center">
                  <div className="w-8 h-10 border-t-2 border-gray-400"></div>
                </div>
                
                {/* Processing Cube */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-versionBlue rounded-lg rotate-45 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-purple-500 rounded-md animate-spin-slow"></div>
                </div>
                
                {/* Output Paths */}
                <div className="absolute top-1/4 right-10 w-16 h-4 bg-gradient-to-r from-versionBlue to-transparent rounded-full animate-pulse-fast"></div>
                <div className="absolute top-1/2 right-10 w-16 h-4 bg-gradient-to-r from-green-500 to-transparent rounded-full animate-pulse-fast"></div>
                <div className="absolute bottom-1/4 right-10 w-16 h-4 bg-gradient-to-r from-purple-500 to-transparent rounded-full animate-pulse-fast"></div>
                
                {/* Labels */}
                <div className="absolute top-1/4 right-5 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                  PDF v1.0
                </div>
                <div className="absolute top-1/2 right-5 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                  DOCX 2007
                </div>
                <div className="absolute bottom-1/4 right-5 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                  Markdown v2.1
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 text-xs text-gray-300">
                Powered by Three.js & GSAP
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              This visualization demonstrates how our system processes and transforms documents into different versioned outputs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
