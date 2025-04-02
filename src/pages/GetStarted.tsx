
import { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [fileSelected, setFileSelected] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
      toast.success("File uploaded successfully!");
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => Math.min(prev + 1, 3));
    if (step === 2) {
      toast.success("Transformation completed!");
    }
  };
  
  const steps = [
    { number: 1, title: 'Upload Document' },
    { number: 2, title: 'Configure Transformation' },
    { number: 3, title: 'Get Report' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Started with VersionEvolve
            </h1>
            <p className="text-gray-300">Transform your documents in three simple steps</p>
          </div>
          
          {/* Step Progress */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.number} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step > s.number 
                      ? 'bg-green-500' 
                      : step === s.number 
                        ? 'bg-versionBlue' 
                        : 'bg-gray-700'
                  }`}>
                    {step > s.number ? (
                      <Check className="text-white" size={20} />
                    ) : (
                      <span className="text-white">{s.number}</span>
                    )}
                  </div>
                  <p className="text-sm text-center text-gray-300">{s.title}</p>
                  
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute left-0">
                      <div className={`h-0.5 w-full ${
                        step > s.number + 1 
                          ? 'bg-green-500' 
                          : 'bg-gray-700'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            <div className="glassmorphism rounded-xl p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">Upload Your Document</h2>
                  <p className="text-gray-300">
                    Select the document you want to transform. We support various formats including Word, PDF, Markdown, and more.
                  </p>
                  
                  <div 
                    className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                      fileSelected ? 'border-green-500 bg-green-500 bg-opacity-10' : 'border-gray-500 hover:border-versionBlue'
                    }`}
                    onClick={() => document.getElementById('fileUpload')?.click()}
                  >
                    {fileSelected ? (
                      <div className="flex flex-col items-center">
                        <Check size={48} className="text-green-500 mb-3" />
                        <p className="text-white">File ready for transformation</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload size={48} className="text-gray-400 mb-3" />
                        <p className="text-gray-300">Drag & Drop or Click to Upload</p>
                        <p className="text-gray-400 text-sm mt-2">
                          Supports .docx, .pdf, .md, .xlsx and more
                        </p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      id="fileUpload" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  {fileSelected && (
                    <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
                      <FileText className="text-versionBlue mr-3" />
                      <div className="flex-1">
                        <p className="text-white">document_v2.1.docx</p>
                        <p className="text-gray-400 text-sm">524 KB</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button 
                      className={`w-full py-3 rounded-md font-semibold transition-colors ${
                        fileSelected 
                          ? 'bg-versionBlue text-white hover:bg-opacity-90' 
                          : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                      }`}
                      onClick={fileSelected ? handleSubmit : undefined}
                      disabled={!fileSelected}
                    >
                      Continue to Configuration
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">Configure Transformation</h2>
                  <p className="text-gray-300">
                    We've detected your document's version. Now select the target version you want to transform to.
                  </p>
                  
                  <div className="bg-white bg-opacity-10 p-4 rounded-lg border border-versionBlue border-opacity-30">
                    <div className="flex items-center">
                      <AlertCircle className="text-versionBlue mr-2" size={20} />
                      <p className="text-white">
                        Detected Version: <span className="font-semibold">2.1</span>
                      </p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Select Target Version</label>
                      <select className="form-input">
                        <option value="3.0">Version 3.0</option>
                        <option value="2.5">Version 2.5</option>
                        <option value="2.0">Version 2.0 (Downgrade)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Transformation Options</label>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" id="preserveFormatting" className="rounded bg-transparent border-gray-500" />
                          <label htmlFor="preserveFormatting" className="ml-2 text-white">Preserve formatting</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="includeComments" className="rounded bg-transparent border-gray-500" />
                          <label htmlFor="includeComments" className="ml-2 text-white">Include transformation comments</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="highlightChanges" className="rounded bg-transparent border-gray-500" checked />
                          <label htmlFor="highlightChanges" className="ml-2 text-white">Highlight changes in output</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full py-3 rounded-md bg-versionBlue text-white font-semibold hover:bg-opacity-90 transition-colors"
                      >
                        Transform Document
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-block p-4 rounded-full bg-green-500 bg-opacity-20 mb-4">
                      <Check size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Transformation Complete!</h2>
                    <p className="text-gray-300 mt-2">
                      Your document has been successfully transformed from Version 2.1 to Version 3.0
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Transformation Report</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-300">Changes Made:</p>
                        <p className="text-white">42 elements updated, 7 added, 3 removed</p>
                      </div>
                      <div>
                        <p className="text-gray-300">Processing Time:</p>
                        <p className="text-white">2.3 seconds</p>
                      </div>
                      <div>
                        <p className="text-gray-300">Compatibility:</p>
                        <p className="text-white">100% compatible with Version 3.0</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 py-3 rounded-md bg-versionBlue text-white font-semibold hover:bg-opacity-90 transition-colors">
                      Download Transformed Document
                    </button>
                    <button className="flex-1 py-3 rounded-md border border-white border-opacity-20 text-white hover:border-opacity-50 transition-colors">
                      View Detailed Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
