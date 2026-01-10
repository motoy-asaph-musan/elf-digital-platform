import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Student' | 'Teacher'>('Student');

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-5 md:px-10 font-inter">
      
      {/* 1. NATIONAL THEME BANNER */}
      <div className="bg-elf-charcoal bg-gradient-to-br from-[#1a365d] to-elf-charcoal text-white p-8 rounded-[2rem] text-center mb-8 shadow-xl shadow-blue-900/10">
        <span className="bg-yellow-400 text-elf-charcoal px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase shadow-sm">
          2026 National Theme
        </span>
        <h2 className="text-xl md:text-2xl mt-6 font-medium italic leading-relaxed max-w-3xl mx-auto">
          "Inculcating Technology in the Competency-Based Curriculum (CBC) for Effective Teaching and Learning"
        </h2>
      </div>

      {/* 2. EVENT ALERT: ROUND 1 CONTEST */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-red-100 mb-8 shadow-sm hover:shadow-md transition-shadow group">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <span className="text-red-500 font-black text-xs tracking-widest uppercase">March 28, 2026</span>
          <h3 className="text-xl font-bold text-elf-charcoal mt-2 mb-1 flex items-center gap-2">
            🏆 National English Contest <span className="hidden sm:inline-block text-gray-300">|</span> <span className="text-gray-900">Round 1</span>
          </h3>
          <p className="text-sm text-gray-500">
            Registration Deadline: <span className="font-bold text-gray-700">March 23rd</span> • Fees: UGX 100,000 (School) / UGX 6,000 (Student)
          </p>
        </div>
        <button 
          onClick={() => navigate('/subscribe')} 
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
        >
          Register School
        </button>
      </div>

      {/* 3. MAIN DASHBOARD TABS */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {(['Student', 'Teacher'] as const).map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-black transition-all border-b-2 uppercase tracking-widest ${
              activeTab === tab 
              ? 'text-elf-teal border-elf-teal' 
              : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            {tab} {tab === 'Student' ? 'Contest Center' : 'Workshop Resources'}
          </button>
        ))}
      </div>

      {/* 4. CONTENT GRID */}
      {activeTab === 'Student' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured English Card */}
          <div className="bg-white rounded-[2rem] border-2 border-purple-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-2 bg-purple-500"></div>
            <div className="p-8">
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">Official Contest</span>
              <h3 className="text-xl font-black text-gray-900 mt-4 mb-2">National English Contest</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 h-10">Scenario-based Grammar, Creative Writing & Comprehension.</p>
              <div className="text-elf-teal text-xs font-black uppercase tracking-tighter mb-6 flex items-center gap-1">
                🎁 Prizes: Laptops, iPads & Smartphones
              </div>
              <button 
                onClick={() => navigate('/exam/contest-2026')} 
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-100 transition-all"
              >
                Enter Contest Paper
              </button>
            </div>
          </div>

          {/* Practice Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-elf-teal"></div>
            <div className="p-8">
              <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">Primary</span>
              <h3 className="text-xl font-black text-gray-900 mt-4 mb-2">P.7 Literacy Practice</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 h-10">Tailored questions for PLE English preparation.</p>
              <button 
                onClick={() => navigate('/exam/p7-practice')} 
                className="w-full py-4 bg-elf-teal hover:bg-[#2c8d88] text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-50"
              >
                Practice Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:border-elf-teal transition-all">
            <div className="w-12 h-12 bg-elf-teal/10 rounded-xl flex items-center justify-center text-elf-teal mb-6">
              📁
            </div>
            <h4 className="text-lg font-black text-gray-900 mb-2">Digital Content Creation</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">Access templates for Schemes of Work and Lesson Plans under the CBC framework.</p>
            <button className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-bold border border-gray-200 transition-all">
              Download Materials
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:border-elf-teal transition-all">
            <div className="w-12 h-12 bg-elf-teal/10 rounded-xl flex items-center justify-center text-elf-teal mb-6">
              💡
            </div>
            <h4 className="text-lg font-black text-gray-900 mb-2">Scenario-Based Assessment</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">Guide on setting CBC-aligned questions using digital tools and scenario scripts.</p>
            <button className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-bold border border-gray-200 transition-all">
              View Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;