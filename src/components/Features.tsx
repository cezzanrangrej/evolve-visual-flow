
import { FileText, Zap, FileCheck, Clock } from 'lucide-react';

const features = [
  {
    icon: <FileText size={32} />,
    title: "Version Detection",
    description: "Our advanced algorithms automatically detect the version of your uploaded document.",
  },
  {
    icon: <Zap size={32} />,
    title: "Instant Transformation",
    description: "Transform your document to another version instantly with our powerful processing engine.",
  },
  {
    icon: <FileCheck size={32} />,
    title: "Multiple File Types",
    description: "Support for various document formats including Word, PDF, Markdown, and more.",
  },
  {
    icon: <Clock size={32} />,
    title: "Fast Report Generation",
    description: "Get detailed reports on changes needed for version transformation within seconds.",
  }
];

const Features = () => {
  return (
    <div className="py-20 bg-versionBgDark bg-opacity-60">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            VersionEvolve provides a comprehensive solution for all your document transformation needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-feature group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4 text-versionBlue group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
