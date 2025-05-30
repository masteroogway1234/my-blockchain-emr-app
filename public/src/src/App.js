import React, { useState, useEffect, useRef } from 'react';

// Simple icon components to replace lucide-react
const Camera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const Upload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const FileText = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14,2 L14,8 L20,8 M14,2 L20,8 L20,20 C20,21.1045695 19.1045695,22 18,22 L6,22 C4.8954305,22 4,21.1045695 4,20 L4,4 C4,2.8954305 4.8954305,2 6,2 L14,2 Z"></path>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10,9 9,9 8,9"></polyline>
  </svg>
);

const Image = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21,15 16,10 5,21"></polyline>
  </svg>
);

const Plus = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Shield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12,22 C12,22 20,18 20,12 L20,5 L12,2 L4,5 L4,12 C4,18 12,22 12,22 Z"></path>
  </svg>
);

const Search = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const User = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const X = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const Brain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
    <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
    <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
    <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
  </svg>
);

const Scan = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
    <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
    <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
  </svg>
);

const MobileBlockchainEMR = () => {
  const [records, setRecords] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Simulate AI document analysis
  const analyzeDocument = async (file, type) => {
    setAiProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let aiAnalysis = {};
    
    if (type === 'lab') {
      aiAnalysis = {
        documentType: 'Lab Results',
        category: 'Laboratory',
        keyFindings: ['Hemoglobin: 14.2 g/dL (Normal)', 'White Blood Cell Count: 7,200/μL (Normal)', 'Glucose: 95 mg/dL (Normal)'],
        provider: 'Quest Diagnostics',
        testDate: '2024-05-28',
        urgency: 'routine',
        tags: ['CBC', 'Blood Work', 'Annual Physical']
      };
    } else if (type === 'imaging') {
      aiAnalysis = {
        documentType: 'Chest X-Ray',
        category: 'Radiology',
        keyFindings: ['Clear lung fields', 'Normal cardiac silhouette', 'No acute findings'],
        provider: 'City Medical Imaging',
        testDate: '2024-05-25',
        urgency: 'routine',
        tags: ['X-Ray', 'Chest', 'Follow-up']
      };
    } else if (type === 'prescription') {
      aiAnalysis = {
        documentType: 'Prescription',
        category: 'Medication',
        keyFindings: ['Lisinopril 10mg once daily', 'Metformin 500mg twice daily', '30-day supply'],
        provider: 'Dr. Sarah Johnson',
        testDate: '2024-05-29',
        urgency: 'active',
        tags: ['Blood Pressure', 'Diabetes', 'Chronic Care']
      };
    } else {
      aiAnalysis = {
        documentType: 'Medical Document',
        category: 'General',
        keyFindings: ['Document processed successfully'],
        provider: 'Healthcare Provider',
        testDate: new Date().toISOString().split('T')[0],
        urgency: 'routine',
        tags: ['Medical Record']
      };
    }
    
    setAiProcessing(false);
    return aiAnalysis;
  };

  // Handle file upload
  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      // Simulate AI analysis
      const aiAnalysis = await analyzeDocument(file, type);
      
      // Generate blockchain-style record
      const record = {
        id: `rec_${Date.now()}`,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        previewUrl,
        uploadDate: new Date(),
        blockchainHash: generateHash(file.name + Date.now()),
        ipfsHash: `Qm${Math.random().toString(36).substring(2, 15)}`,
        ...aiAnalysis,
        verified: true,
        encrypted: true
      };
      
      setRecords(prev => [record, ...prev]);
      setShowUploadModal(false);
      
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Generate hash for blockchain simulation
  const generateHash = (data) => {
    let hash = 0;
    const str = data.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).substring(0, 12);
  };

  // Initialize with sample data
  useEffect(() => {
    const sampleRecords = [
      {
        id: 'rec_sample_1',
        fileName: 'blood_test_may2024.pdf',
        documentType: 'Complete Blood Count',
        category: 'Laboratory',
        keyFindings: ['All values within normal range'],
        provider: 'LabCorp',
        testDate: '2024-05-15',
        urgency: 'routine',
        tags: ['CBC', 'Annual Physical'],
        blockchainHash: generateHash('sample1'),
        ipfsHash: 'QmSample1Hash',
        verified: true,
        encrypted: true,
        uploadDate: new Date('2024-05-15')
      }
    ];
    setRecords(sampleRecords);
  }, []);

  const filteredRecords = records.filter(record => 
    record.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    record.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uploadOptions = [
    {
      id: 'photo',
      title: 'Take Photo',
      description: 'Snap a picture of your medical document',
      icon: Camera,
      color: 'bg-blue-500'
    },
    {
      id: 'lab',
      title: 'Lab Results',
      description: 'Upload blood tests, urine tests, etc.',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      id: 'imaging',
      title: 'Medical Images',
      description: 'X-rays, MRIs, CT scans, ultrasounds',
      icon: Image,
      color: 'bg-purple-500'
    },
    {
      id: 'prescription',
      title: 'Prescriptions',
      description: 'Medication lists and pharmacy receipts',
      icon: Scan,
      color: 'bg-orange-500'
    },
    {
      id: 'document',
      title: 'Documents',
      description: 'PDFs, reports, discharge summaries',
      icon: Upload,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">My Health Records</h1>
                <p className="text-xs text-gray-500">Blockchain Secured</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          {[
            { id: 'home', label: 'Records', icon: FileText },
            { id: 'search', label: 'Search', icon: Search },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`flex-1 py-3 px-4 text-center ${
                currentView === tab.id 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500'
              }`}
            >
              <div className="mx-auto mb-1"><tab.icon /></div>
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        {currentView === 'home' && (
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{records.length}</div>
                <div className="text-xs text-gray-500">Total Records</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{records.filter(r => r.verified).length}</div>
                <div className="text-xs text-gray-500">Verified</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{records.filter(r => r.urgency === 'active').length}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
            </div>

            {/* Recent Records */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Recent Records</h2>
              {filteredRecords.map(record => (
                <div
                  key={record.id}
                  className="bg-white rounded-lg p-4 shadow-sm border cursor-pointer"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{record.documentType}</h3>
                      <p className="text-xs text-gray-500">{record.provider} • {record.testDate}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {record.verified && <Check />}
                      {record.encrypted && <Shield />}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {record.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-400 font-mono">#{record.blockchainHash}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'search' && (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-3"><Search /></div>
              <input
                type="text"
                placeholder="Search your medical records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-3">
              {filteredRecords.map(record => (
                <div key={record.id} className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium text-gray-900">{record.documentType}</h3>
                  <p className="text-sm text-gray-600">{record.keyFindings.join(', ')}</p>
                  <p className="text-xs text-gray-500 mt-1">{record.provider} • {record.testDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Your Health Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Patient ID</p>
                  <p className="text-gray-900">PAT_001_2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Wallet Address</p>
                  <p className="text-xs font-mono text-gray-600">0x742d35Cc6Df4b7c8f5a9b2A3E4d5f6</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Records Stored</p>
                  <p className="text-gray-900">{records.length} documents</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Security Status</p>
                  <p className="text-green-600">✓ Fully Encrypted & Verified</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-xl w-full max-h-screen overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Medical Record</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-gray-400"
              >
                <X />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg mb-4">
                  <Brain />
                  <div>
                    <p className="text-sm font-medium text-blue-900">AI-Powered Analysis</p>
                    <p className="text-xs text-blue-700">We'll automatically identify and organize your documents</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {uploadOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setUploadType(option.id);
                      if (option.id === 'photo') {
                        cameraInputRef.current?.click();
                      } else {
                        fileInputRef.current?.click();
                      }
                    }}
                    className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    disabled={isUploading}
                  >
                    <div className={`p-2 rounded-lg ${option.color}`}>
                      <option.icon />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{option.title}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileUpload(e, uploadType)}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileUpload(e, 'photo')}
                className="hidden"
              />

              {(isUploading || aiProcessing) && (
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {isUploading ? 'Uploading...' : 'AI Analyzing Document...'}
                      </p>
                      <p className="text-xs text-blue-700">
                        {aiProcessing ? 'Extracting key information and categorizing' : 'Please wait'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-xl w-full max-h-screen overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedRecord.documentType}</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 text-gray-400"
              >
                <X />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Provider</p>
                  <p className="text-sm text-gray-900">{selectedRecord.provider}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Date</p>
                  <p className="text-sm text-gray-900">{selectedRecord.testDate}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Key Findings</p>
                <div className="space-y-1">
                  {selectedRecord.keyFindings.map((finding, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                      {finding}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 text-xs px-2 py-1
