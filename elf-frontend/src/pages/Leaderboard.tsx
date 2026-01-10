import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Ranking {
  rank: number;
  name: string;
  school: string;
  region: 'Central' | 'Eastern' | 'Western' | 'Northern';
  score: number;
  timeTaken: string; 
}

const MOCK_RANKINGS: Ranking[] = [
  { rank: 1, name: "Namukasa Sarah", school: "Gayaza High School", region: "Central", score: 98, timeTaken: "45:20" },
  { rank: 2, name: "Okello John", school: "Gulu High School", region: "Northern", score: 96, timeTaken: "48:10" },
  { rank: 3, name: "Mwesigwa Isaac", school: "Mbarara High School", region: "Western", score: 95, timeTaken: "50:05" },
  { rank: 4, name: "Achieng Mary", school: "Tororo Girls", region: "Eastern", score: 94, timeTaken: "52:30" },
  { rank: 5, name: "Kato Paul", school: "Kings College Budo", region: "Central", score: 92, timeTaken: "55:12" },
];

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('National');
  const navigate = useNavigate();

  const filteredData = filter === 'National' 
    ? MOCK_RANKINGS 
    : MOCK_RANKINGS.filter(r => r.region === filter);

  return (
    <div className="max-w-6xl mx-auto py-10 px-5 font-inter">
      
      {/* Navigation Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-elf-teal font-black text-sm flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
        >
          ← BACK TO DASHBOARD
        </button>
      </div>

      <header className="text-center mb-10">
        <div className="text-5xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-elf-charcoal tracking-tight">National Ranking 2026</h1>
        <p className="text-gray-500 mt-2 font-medium">Recognizing Excellence in English Proficiency across Uganda</p>
      </header>

      {/* Prize Alert */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-center gap-4 mb-10 shadow-sm">
        <span className="text-3xl animate-bounce">🎁</span>
        <div className="text-center md:text-left text-blue-900 leading-snug">
          <strong className="font-black uppercase tracking-wide block md:inline">Grand Prize Alert:</strong> 
          <span className="ml-0 md:ml-2">The Top 10 National Students qualify for <strong>Laptops, iPads, and Smartphones</strong>!</span>
        </div>
      </div>

      {/* Regional Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['National', 'Central', 'Eastern', 'Western', 'Northern'].map(reg => (
          <button 
            key={reg} 
            onClick={() => setFilter(reg)}
            className={`px-8 py-3 rounded-full text-sm font-black transition-all border-2 
              ${filter === reg 
                ? 'bg-elf-charcoal border-elf-charcoal text-elf-teal shadow-lg scale-105' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Rank</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Student Name</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">School</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Region</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Score</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((student) => (
                <tr 
                  key={student.rank} 
                  className={`group transition-colors ${student.rank <= 3 ? 'bg-teal-50/30' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-8 py-6">
                    <span className={`flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm
                      ${student.rank === 1 ? 'bg-yellow-100 text-yellow-700 text-xl' : 
                        student.rank === 2 ? 'bg-gray-100 text-gray-600 text-xl' : 
                        student.rank === 3 ? 'bg-orange-100 text-orange-700 text-xl' : 
                        'bg-white text-gray-400 border border-gray-100'}`}>
                      {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : student.rank}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-elf-charcoal italic group-hover:text-elf-teal transition-colors">
                    {student.name}
                  </td>
                  <td className="px-8 py-6 text-gray-600 font-medium">
                    {student.school}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      {student.region}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xl font-black text-elf-teal">
                      {student.score}%
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-mono font-bold text-gray-400">
                    {student.timeTaken}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] mt-6 border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No rankings found for this region</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;