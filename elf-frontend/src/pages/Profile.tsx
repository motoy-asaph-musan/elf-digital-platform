import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ExamHistory {
  id: string;
  name: string;
  date: string;
  score: number;
  total: number;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  const history: ExamHistory[] = [
    { id: '1', name: 'National English Contest', date: 'Jan 10, 2026', score: 48, total: 50 },
    { id: '2', name: 'CBC Literacy Trial', date: 'Dec 15, 2025', score: 42, total: 50 },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 font-inter">
      
      {/* Profile Header Card */}
      <div className="bg-elf-charcoal rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 mb-10 shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-elf-teal/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-elf-teal flex items-center justify-center text-4xl md:text-5xl font-black text-elf-charcoal shadow-lg border-4 border-gray-800">
          {user?.name?.charAt(0) || 'S'}
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h1 className="text-3xl font-black tracking-tight">{user?.name || 'Student Name'}</h1>
            <span className="bg-elf-teal/20 text-elf-teal text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-elf-teal/30">
              Student Scholar
            </span>
          </div>
          <p className="text-gray-400 font-medium flex items-center justify-center md:justify-start gap-2">
            <span>📍</span> {user?.schoolName || 'Uganda National School'}
          </p>
        </div>

        <button className="px-6 py-2.5 border border-gray-700 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
          Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Exams Taken', value: history.length, color: 'text-elf-charcoal' },
          { label: 'Average Score', value: '90%', color: 'text-elf-teal' },
          { label: 'National Rank', value: '#142', color: 'text-blue-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</span>
            <span className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Performance History Table */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black text-elf-charcoal mb-8 flex items-center gap-3">
          Performance History
          <span className="w-2 h-2 rounded-full bg-elf-teal animate-pulse"></span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Exam Name</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Score</th>
                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((item) => {
                const perc = Math.round((item.score / item.total) * 100);
                return (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-6 pr-4">
                      <p className="font-black text-elf-charcoal group-hover:text-elf-teal transition-colors uppercase text-sm italic">
                        {item.name}
                      </p>
                    </td>
                    <td className="py-6 text-sm font-medium text-gray-500">{item.date}</td>
                    <td className="py-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-black text-elf-charcoal">{perc}%</span>
                        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-elf-teal" style={{ width: `${perc}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-right">
                      <button className="bg-teal-50 text-elf-teal px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-elf-teal hover:text-white transition-all shadow-sm">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Action */}
      <button 
        onClick={() => navigate('/dashboard')} 
        className="w-full mt-8 py-5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-black text-sm hover:border-elf-teal hover:text-elf-teal transition-all uppercase tracking-widest"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default Profile;