
import { useState } from 'react';
import { Upload, FileText, Check, AlertCircle, Database, Code, FileJson } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState('documentTransformation');
  const [file, setFile] = useState<File | null>(null);
  const [secondaryFile, setSecondaryFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
      setFile(e.target.files[0]);
      toast.success("File uploaded successfully!");
    }
  };

  const handleSecondaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSecondaryFile(e.target.files[0]);
      toast.success("Secondary file uploaded successfully!");
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => Math.min(prev + 1, 3));
    if (step === 2) {
      toast.success("Process completed successfully!");
    }
  };
  
  const steps = [
    { number: 1, title: 'Upload Document' },
    { number: 2, title: 'Configure Process' },
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
            <p className="text-gray-300">Select your preferred document processing option</p>
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
                  <h2 className="text-2xl font-semibold text-white">Select Process Type</h2>
                  <p className="text-gray-300">
                    Choose the type of document processing you need
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div 
                      className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        selectedOption === 'documentTransformation' 
                          ? 'border-versionBlue bg-versionBlue bg-opacity-10' 
                          : 'border-gray-500 hover:border-versionBlue'
                      }`}
                      onClick={() => setSelectedOption('documentTransformation')}
                    >
                      <FileText size={48} className="mb-3 mx-auto text-versionBlue" />
                      <h3 className="text-white font-semibold mb-1">Document Transformation</h3>
                      <p className="text-gray-400 text-sm">Convert documents between versions and formats</p>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        selectedOption === 'infoExtraction' 
                          ? 'border-versionBlue bg-versionBlue bg-opacity-10' 
                          : 'border-gray-500 hover:border-versionBlue'
                      }`}
                      onClick={() => setSelectedOption('infoExtraction')}
                    >
                      <Database size={48} className="mb-3 mx-auto text-versionBlue" />
                      <h3 className="text-white font-semibold mb-1">Critical Information Extraction</h3>
                      <p className="text-gray-400 text-sm">Extract specific fields from PDF documents</p>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        selectedOption === 'scnSelection' 
                          ? 'border-versionBlue bg-versionBlue bg-opacity-10' 
                          : 'border-gray-500 hover:border-versionBlue'
                      }`}
                      onClick={() => setSelectedOption('scnSelection')}
                    >
                      <Code size={48} className="mb-3 mx-auto text-versionBlue" />
                      <h3 className="text-white font-semibold mb-1">Software Change Notice</h3>
                      <p className="text-gray-400 text-sm">Process Software Change Notice documents</p>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        selectedOption === 'dependencyAnalysis' 
                          ? 'border-versionBlue bg-versionBlue bg-opacity-10' 
                          : 'border-gray-500 hover:border-versionBlue'
                      }`}
                      onClick={() => setSelectedOption('dependencyAnalysis')}
                    >
                      <FileJson size={48} className="mb-3 mx-auto text-versionBlue" />
                      <h3 className="text-white font-semibold mb-1">Software Dependency Analysis</h3>
                      <p className="text-gray-400 text-sm">Analyze and manage software dependencies</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Upload Document</h3>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                        fileSelected ? 'border-green-500 bg-green-500 bg-opacity-10' : 'border-gray-500 hover:border-versionBlue'
                      }`}
                      onClick={() => document.getElementById('fileUpload')?.click()}
                    >
                      {fileSelected ? (
                        <div className="flex flex-col items-center">
                          <Check size={48} className="text-green-500 mb-3" />
                          <p className="text-white">File ready for processing</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload size={48} className="text-gray-400 mb-3" />
                          <p className="text-gray-300">Drag & Drop or Click to Upload</p>
                          {selectedOption === 'documentTransformation' && (
                            <p className="text-gray-400 text-sm mt-2">Supports .docx, .pdf, .md, .xlsx and more</p>
                          )}
                          {selectedOption === 'infoExtraction' && (
                            <p className="text-gray-400 text-sm mt-2">Supports .pdf documents</p>
                          )}
                          {selectedOption === 'scnSelection' && (
                            <p className="text-gray-400 text-sm mt-2">Supports Software Change Notice PDFs</p>
                          )}
                          {selectedOption === 'dependencyAnalysis' && (
                            <p className="text-gray-400 text-sm mt-2">Upload Master Dependency Sheet (CSV)</p>
                          )}
                        </div>
                      )}
                      <input 
                        type="file" 
                        id="fileUpload" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept={
                          selectedOption === 'infoExtraction' ? '.pdf' :
                          selectedOption === 'scnSelection' ? '.pdf' :
                          selectedOption === 'dependencyAnalysis' ? '.csv' : 
                          '.docx,.pdf,.md,.xlsx'
                        }
                      />
                    </div>
                    
                    {fileSelected && (
                      <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg mt-3">
                        <FileText className="text-versionBlue mr-3" />
                        <div className="flex-1">
                          <p className="text-white">{file?.name || 'document.pdf'}</p>
                          <p className="text-gray-400 text-sm">{file ? Math.round(file.size / 1024) + ' KB' : '524 KB'}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Secondary file upload for dependency analysis */}
                    {selectedOption === 'dependencyAnalysis' && (
                      <div className="mt-4">
                        <h4 className="text-white font-medium mb-2">Upload Current Software Versions (JSON)</h4>
                        <div 
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            secondaryFile ? 'border-green-500 bg-green-500 bg-opacity-10' : 'border-gray-500 hover:border-versionBlue'
                          }`}
                          onClick={() => document.getElementById('secondaryFileUpload')?.click()}
                        >
                          {secondaryFile ? (
                            <div className="flex items-center justify-center">
                              <Check size={20} className="text-green-500 mr-2" />
                              <span className="text-white">JSON file uploaded</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Upload size={20} className="text-gray-400 mr-2" />
                              <span className="text-gray-300">Upload Current Software Versions (JSON)</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            id="secondaryFileUpload" 
                            className="hidden" 
                            onChange={handleSecondaryFileChange}
                            accept=".json"
                          />
                        </div>
                        
                        {secondaryFile && (
                          <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg mt-3">
                            <FileJson className="text-versionBlue mr-3" />
                            <div className="flex-1">
                              <p className="text-white">{secondaryFile.name}</p>
                              <p className="text-gray-400 text-sm">{Math.round(secondaryFile.size / 1024)} KB</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      className={`w-full py-3 rounded-md font-semibold transition-colors ${
                        fileSelected && (selectedOption !== 'dependencyAnalysis' || secondaryFile)
                          ? 'bg-versionBlue text-white hover:bg-opacity-90' 
                          : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                      }`}
                      onClick={fileSelected && (selectedOption !== 'dependencyAnalysis' || secondaryFile) ? () => setStep(2) : undefined}
                      disabled={!fileSelected || (selectedOption === 'dependencyAnalysis' && !secondaryFile)}
                    >
                      Continue to Configuration
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">Configure {
                    selectedOption === 'documentTransformation' ? 'Transformation' :
                    selectedOption === 'infoExtraction' ? 'Information Extraction' :
                    selectedOption === 'scnSelection' ? 'SCN Processing' :
                    'Dependency Analysis'
                  }</h2>
                  
                  <div className="bg-white bg-opacity-10 p-4 rounded-lg border border-versionBlue border-opacity-30">
                    <div className="flex items-center">
                      <AlertCircle className="text-versionBlue mr-2" size={20} />
                      <p className="text-white">
                        {selectedOption === 'documentTransformation' && (
                          <>Detected Version: <span className="font-semibold">2.1</span></>
                        )}
                        {selectedOption === 'infoExtraction' && (
                          <>PDF Document: <span className="font-semibold">{file?.name || 'document.pdf'}</span></>
                        )}
                        {selectedOption === 'scnSelection' && (
                          <>SCN Document: <span className="font-semibold">{file?.name || 'SCN.pdf'}</span></>
                        )}
                        {selectedOption === 'dependencyAnalysis' && (
                          <>Dependency Sheet: <span className="font-semibold">{file?.name || 'dependencies.csv'}</span></>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Document Transformation configuration */}
                    {selectedOption === 'documentTransformation' && (
                      <>
                        <div>
                          <Label className="block text-gray-300 mb-2">Select Target Version</Label>
                          <Select defaultValue="3.0">
                            <SelectTrigger className="form-input">
                              <SelectValue placeholder="Select target version" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3.0">Version 3.0</SelectItem>
                              <SelectItem value="2.5">Version 2.5</SelectItem>
                              <SelectItem value="2.0">Version 2.0 (Downgrade)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Transformation Options</Label>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Checkbox id="preserveFormatting" />
                              <Label htmlFor="preserveFormatting" className="ml-2 text-white">Preserve formatting</Label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="includeComments" />
                              <Label htmlFor="includeComments" className="ml-2 text-white">Include transformation comments</Label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="highlightChanges" defaultChecked />
                              <Label htmlFor="highlightChanges" className="ml-2 text-white">Highlight changes in output</Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Critical Information Extraction configuration */}
                    {selectedOption === 'infoExtraction' && (
                      <>
                        <div>
                          <Label htmlFor="extractFields" className="block text-gray-300 mb-2">
                            Fields to Extract (comma-separated)
                          </Label>
                          <Textarea 
                            id="extractFields"
                            placeholder="e.g., Invoice Number, Date, Total Amount, Customer Name"
                            className="form-input h-24"
                          />
                          <p className="text-gray-400 text-sm mt-1">
                            Specify the fields you want to extract from the document
                          </p>
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Output Format</Label>
                          <RadioGroup defaultValue="json" className="flex space-x-4">
                            <div className="flex items-center">
                              <RadioGroupItem value="json" id="json" />
                              <Label htmlFor="json" className="ml-2 text-white">JSON</Label>
                            </div>
                            <div className="flex items-center">
                              <RadioGroupItem value="csv" id="csv" />
                              <Label htmlFor="csv" className="ml-2 text-white">CSV</Label>
                            </div>
                            <div className="flex items-center">
                              <RadioGroupItem value="xml" id="xml" />
                              <Label htmlFor="xml" className="ml-2 text-white">XML</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Processing Options</Label>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Checkbox id="includeConfidence" defaultChecked />
                              <Label htmlFor="includeConfidence" className="ml-2 text-white">Include confidence scores</Label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="extractTables" />
                              <Label htmlFor="extractTables" className="ml-2 text-white">Extract tables as structured data</Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Software Change Notice configuration */}
                    {selectedOption === 'scnSelection' && (
                      <>
                        <div>
                          <Label htmlFor="softwareName" className="block text-gray-300 mb-2">Software Name</Label>
                          <Input 
                            id="softwareName"
                            placeholder="e.g., Adobe Acrobat Reader"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="currentVersion" className="block text-gray-300 mb-2">Current Version</Label>
                            <Input 
                              id="currentVersion"
                              placeholder="e.g., 11.0.23"
                              className="form-input"
                            />
                          </div>
                          <div>
                            <Label htmlFor="targetVersion" className="block text-gray-300 mb-2">Target Version</Label>
                            <Input 
                              id="targetVersion"
                              placeholder="e.g., 12.0.1"
                              className="form-input"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Output Format</Label>
                          <ToggleGroup type="single" defaultValue="markdown" className="justify-start">
                            <ToggleGroupItem value="markdown">Markdown</ToggleGroupItem>
                            <ToggleGroupItem value="csv">CSV</ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Aggregation Options</Label>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Checkbox id="includeDeprecated" />
                              <Label htmlFor="includeDeprecated" className="ml-2 text-white">Include deprecated features</Label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="highlightSecurity" defaultChecked />
                              <Label htmlFor="highlightSecurity" className="ml-2 text-white">Highlight security-related changes</Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Software Dependency Analysis configuration */}
                    {selectedOption === 'dependencyAnalysis' && (
                      <>
                        <div>
                          <Label htmlFor="softwareToUpgrade" className="block text-gray-300 mb-2">Software to Upgrade</Label>
                          <Input 
                            id="softwareToUpgrade"
                            placeholder="e.g., React"
                            className="form-input"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="targetDependencyVersion" className="block text-gray-300 mb-2">Target Version</Label>
                          <Input 
                            id="targetDependencyVersion"
                            placeholder="e.g., 18.2.0"
                            className="form-input"
                          />
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Upgrade Strategy</Label>
                          <RadioGroup defaultValue="minimum" className="flex flex-col space-y-2">
                            <div className="flex items-center">
                              <RadioGroupItem value="minimum" id="minimum" />
                              <Label htmlFor="minimum" className="ml-2 text-white">Minimum Changes (Conservative)</Label>
                            </div>
                            <div className="flex items-center">
                              <RadioGroupItem value="all" id="all" />
                              <Label htmlFor="all" className="ml-2 text-white">All Possible Upgrades (Aggressive)</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="block text-gray-300 mb-2">Analysis Options</Label>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Checkbox id="includeTransitive" defaultChecked />
                              <Label htmlFor="includeTransitive" className="ml-2 text-white">Include transitive dependencies</Label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="checkCompatibility" defaultChecked />
                              <Label htmlFor="checkCompatibility" className="ml-2 text-white">Check compatibility with existing dependencies</Label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="includeVulnerabilities" />
                              <Label htmlFor="includeVulnerabilities" className="ml-2 text-white">Include vulnerability analysis</Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full py-3 rounded-md bg-versionBlue text-white font-semibold hover:bg-opacity-90 transition-colors"
                      >
                        {selectedOption === 'documentTransformation' ? 'Transform Document' : 
                         selectedOption === 'infoExtraction' ? 'Extract Information' :
                         selectedOption === 'scnSelection' ? 'Process SCN Document' : 'Analyze Dependencies'}
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
                    <h2 className="text-2xl font-semibold text-white">Process Complete!</h2>
                    <p className="text-gray-300 mt-2">
                      {selectedOption === 'documentTransformation' && 'Your document has been successfully transformed.'}
                      {selectedOption === 'infoExtraction' && 'Information has been successfully extracted from your document.'}
                      {selectedOption === 'scnSelection' && 'Software Change Notice has been successfully processed.'}
                      {selectedOption === 'dependencyAnalysis' && 'Software dependency analysis has been completed.'}
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {selectedOption === 'documentTransformation' && 'Transformation Report'}
                      {selectedOption === 'infoExtraction' && 'Extraction Results'}
                      {selectedOption === 'scnSelection' && 'SCN Aggregation Report'}
                      {selectedOption === 'dependencyAnalysis' && 'Dependency Analysis Results'}
                    </h3>
                    <div className="space-y-4">
                      {selectedOption === 'documentTransformation' && (
                        <>
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
                        </>
                      )}
                      
                      {selectedOption === 'infoExtraction' && (
                        <>
                          <div>
                            <p className="text-gray-300">Fields Extracted:</p>
                            <p className="text-white">4 fields successfully extracted</p>
                          </div>
                          <div>
                            <p className="text-gray-300">Confidence Score:</p>
                            <p className="text-white">96% average confidence</p>
                          </div>
                          <div>
                            <p className="text-gray-300">Output Format:</p>
                            <p className="text-white">JSON (4.2 KB)</p>
                          </div>
                        </>
                      )}
                      
                      {selectedOption === 'scnSelection' && (
                        <>
                          <div>
                            <p className="text-gray-300">Changes Found:</p>
                            <p className="text-white">17 relevant changes between versions</p>
                          </div>
                          <div>
                            <p className="text-gray-300">Security Updates:</p>
                            <p className="text-white">3 critical security patches identified</p>
                          </div>
                          <div>
                            <p className="text-gray-300">Output Format:</p>
                            <p className="text-white">Markdown (8.6 KB)</p>
                          </div>
                        </>
                      )}
                      
                      {selectedOption === 'dependencyAnalysis' && (
                        <>
                          <div>
                            <p className="text-gray-300">Dependency Changes:</p>
                            <p className="text-white">Primary: 1 update, Transitive: 4 updates</p>
                          </div>
                          <div>
                            <p className="text-gray-300">Compatibility:</p>
                            <p className="text-white">98% compatible with existing dependencies</p>
                          </div>
                          <div>
                            <p className="text-gray-300">Risk Assessment:</p>
                            <p className="text-white">Low risk - 0 breaking changes detected</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 py-3 rounded-md bg-versionBlue text-white font-semibold hover:bg-opacity-90 transition-colors">
                      {selectedOption === 'documentTransformation' && 'Download Transformed Document'}
                      {selectedOption === 'infoExtraction' && 'Download Extracted Data'}
                      {selectedOption === 'scnSelection' && 'Download SCN Report'}
                      {selectedOption === 'dependencyAnalysis' && 'Download Dependency Report'}
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
