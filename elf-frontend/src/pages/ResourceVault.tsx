import React, { useState } from 'react';

const resources = [
  { 
    id: 1, 
    category: 'CBC Planning', 
    title: 'Simplified Schemes of Work Template', 
    description: 'A digital guide to creating CBC-compliant schemes efficiently.',
    format: 'DOCX',
    icon: '📄'
  },
  { 
    id: 2, 
    category: 'Assessment', 
    title: 'Scenario-Based Question Bank', 
    description: 'Examples of English & Literature questions under the new curriculum.',
    format: 'PDF',
    icon: '📝'
  },
  { 
    id: 3, 
    category: 'ICT Integration', 
    title: 'Digital Content Creation Guide', 
    description: 'Handout from the Makerere University Workshop.',
    format: 'PDF',
    icon: '💻'
  },
  { 
    id: 4, 
    category: 'Projects', 
    title: 'Project-Based Learning (PBL) Strategies', 
    description: 'How to implement and assess student projects in English.',
    format: 'PDF',
    icon: '🌟'
  }
];

const ResourceVault: React.FC = () => {
  // Set to 'false' to view the locked state
  const [isVerified, setIsVerified] = useState(true);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 font-inter min-h-screen">
      
      {/* Header with Brand Border */}
      <header className="mb-12 border-l-8 border-elf-teal pl-6 py-2">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-black text-elf-charcoal tracking-tight">Teacher Resource Vault</h1>
          <span className="bg-elf-teal text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
            CBC 2026
          </span>
        </div>
        <p className="text-gray-500 text-lg max-w-2xl font-medium">
          Exclusive materials for the <span className="text-elf-charcoal font-bold">English Language Fraternity</span> educator network.
        </p>
      </header>

      {!isVerified ? (
        /* Locked State: Glassmorphism Design */
        <div className="bg-elf-charcoal rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-elf-teal/10 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner border border-gray-700">
              🔒
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Access Restricted</h2>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-10">
              Your school account is pending activation. Access is granted once the registration fee of 
              <span className="text-white font-bold px-1.5 underline decoration-elf-teal">UGX 100,000</span> 
              is verified.
            </p>
            <button className="bg-elf-teal hover:bg-[#2c8d88] text-white px-10 py-4 rounded-2xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-teal-900/20">
              Contact Admin for Activation
            </button>
          </div>
        </div>
      ) : (
        /* Resource Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {resources.map((res) => (
            <div key={res.id} className="bg-white rounded-[2.5rem] border border-gray-100 flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              
              {/* Card Header (Icon & Format) */}
              <div className="p-6 bg-gray-50/80 flex justify-between items-center group-hover:bg-elf-teal/5 transition-colors">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {res.icon}
                </span>
                <span className="bg-elf-charcoal text-white text-[9px] font-black px-3 py-1.5 rounded-lg">
                  {res.format}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-grow">
                <span className="text-[10px] font-black text-elf-teal uppercase tracking-widest block mb-3">
                  {res.category}
                </span>
                <h3 className="text-xl font-black text-elf-charcoal leading-tight mb-4">
                  {res.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {res.description}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert('Download starting...')} 
                className="mx-8 mb-8 py-4 bg-elf-charcoal text-white rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Download Resource
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Copyright Notice */}
      <div className="mt-20 p-8 bg-white border border-gray-100 rounded-[2rem] text-center shadow-sm">
        <p className="text-xs text-gray-400 font-medium leading-relaxed">
          <strong className="text-elf-charcoal uppercase tracking-tighter">Copyright Notice:</strong><br />
          These materials are licensed for use within registered schools. <br className="hidden md:block" />
          Redistribution outside the ELF network is strictly prohibited and protected by digital watermarking.
        </p>
      </div>
    </div>
  );
};

export default ResourceVault;