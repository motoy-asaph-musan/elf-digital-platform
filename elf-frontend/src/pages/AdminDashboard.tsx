import React, { useState, useEffect } from 'react';

interface School {
  id: string;
  name: string;
  region: string;
  headteacherPhone: string;
  isVerified: boolean;
  registrationCode?: string;
}

const AdminDashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    const mockSchools: School[] = [
      { id: '1', name: 'Buddo Secondary School', region: 'Central', headteacherPhone: '0772000000', isVerified: false },
      { id: '2', name: 'Namilyango College', region: 'Central', headteacherPhone: '0701111111', isVerified: false },
      { id: '3', name: 'Gulu High School', region: 'Northern', headteacherPhone: '0782222222', isVerified: false },
    ];
    setTimeout(() => {
      setSchools(mockSchools);
      setLoading(false);
    }, 800);
  }, []);

  const handleVerify = (schoolId: string) => {
    const confirmApprove = window.confirm("Confirm payment received (UGX 100,000) and generate School Code?");
    if (confirmApprove) {
      setSchools(schools.filter(s => s.id !== schoolId));
      alert("School Verified! 6-Digit Code has been sent to the Headteacher via SMS.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-8 font-inter">
      
      {/* Dashboard Stats & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-black text-elf-charcoal tracking-tight">Main Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Manage school onboarding and system-wide activations.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Active Queue</span>
            <span className="text-2xl font-black text-elf-charcoal">{schools.length} Schools</span>
          </div>
          <div className="w-12 h-12 bg-elf-teal/10 rounded-2xl flex items-center justify-center text-xl">
            ⏳
          </div>
        </div>
      </div>

      {/* Admin Quick Actions Bar */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button className="bg-white border border-gray-200 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:border-elf-teal hover:text-elf-teal transition-all flex items-center gap-2 whitespace-nowrap">
          <span>📥</span> Export List
        </button>
        <button className="bg-white border border-gray-200 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:border-elf-teal hover:text-elf-teal transition-all flex items-center gap-2 whitespace-nowrap">
          <span>📣</span> Broadcast SMS
        </button>
        <button className="bg-white border border-gray-200 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:border-elf-teal hover:text-elf-teal transition-all flex items-center gap-2 whitespace-nowrap">
          <span>📊</span> Generate Report
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-elf-charcoal text-white">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">School Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Region</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Headteacher Contact</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-gray-400 font-bold uppercase text-xs tracking-widest animate-pulse">
                    Synchronizing Database...
                  </td>
                </tr>
              ) : schools.map((school) => (
                <tr key={school.id} className="group hover:bg-gray-50/80 transition-colors">
                  <td className="px-8 py-6 font-black text-elf-charcoal uppercase italic tracking-tight text-sm">
                    {school.name}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {school.region}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-mono text-sm text-gray-500">
                    {school.headteacherPhone}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleVerify(school.id)} 
                      className="bg-elf-teal text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-100 hover:bg-[#2c8d88] transition-all transform active:scale-95"
                    >
                      Verify & Activate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {schools.length === 0 && !loading && (
          <div className="py-20 text-center">
            <div className="text-4xl mb-4">✨</div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
              All schools are currently verified.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;