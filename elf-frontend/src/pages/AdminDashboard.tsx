import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaHistory, FaDownload, FaBroadcastTower, FaChartLine, FaSearch } from 'react-icons/fa';

interface School {
  id: string;
  name: string;
  region: string;
  headteacherPhone: string;
  isVerified: boolean;
  registrationCode?: string;
  activatedAt?: string;
}

const AdminDashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [verifiedLog, setVerifiedLog] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulated fetch of pending schools
    const mockSchools: School[] = [
      { id: '1', name: 'Buddo Secondary School', region: 'Central', headteacherPhone: '0772000000', isVerified: false },
      { id: '2', name: 'Namilyango College', region: 'Central', headteacherPhone: '0701111111', isVerified: false },
      { id: '3', name: 'Gulu High School', region: 'Northern', headteacherPhone: '0782222222', isVerified: false },
      { id: '4', name: 'St. Mary’s Kitende', region: 'Central', headteacherPhone: '0755999888', isVerified: false },
    ];
    
    setTimeout(() => {
      setSchools(mockSchools);
      setLoading(false);
    }, 800);
  }, []);

  // Filter schools based on search input
  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerify = (schoolId: string) => {
    const schoolToVerify = schools.find(s => s.id === schoolId);
    if (!schoolToVerify) return;

    const confirmApprove = window.confirm(
      `CONFIRM ACTIVATION:\n\nSchool: ${schoolToVerify.name}\nFee: UGX 100,000\n\nThis will generate a unique 6-digit access code for students.`
    );
    
    if (confirmApprove) {
      // 1. Logic to generate a unique 6-digit code
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // 2. Capture precise activation timestamp
      const timestamp = new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });

      const activatedSchool = { 
        ...schoolToVerify, 
        isVerified: true, 
        registrationCode: generatedCode,
        activatedAt: timestamp 
      };

      // 3. Update States: Move from queue to history log
      setSchools(prev => prev.filter(s => s.id !== schoolId));
      setVerifiedLog(prev => [activatedSchool, ...prev]);
      
      // 4. Mock SMS Dispatch
      console.log(`SMS API -> Sending to ${schoolToVerify.headteacherPhone}: Your ELF School Code is ${generatedCode}`);
      
      alert(`✅ Activation Successful!\n\nCode: ${generatedCode}\n\nThe Headteacher has been notified via SMS.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-8 font-inter bg-gray-50/30 min-h-screen">
      
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-black text-elf-charcoal tracking-tight uppercase">Admin Command Center</h1>
          <p className="text-gray-500 font-medium mt-1">Manage school onboarding and generated registration keys.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">In Queue</span>
            <span className="text-2xl font-black text-elf-charcoal">{schools.length} Schools</span>
          </div>
          <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-600">
            ⏳
          </div>
        </div>
      </div>

      {/* Quick Actions & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <ActionButton icon={<FaDownload />} label="Export" />
          <ActionButton icon={<FaBroadcastTower />} label="SMS All" />
          <ActionButton icon={<FaChartLine />} label="Revenue" />
        </div>
        
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <input 
            type="text"
            placeholder="Search school or region..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-elf-teal outline-none transition-all text-sm font-medium shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Verification Table */}
      <section className="mb-12">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Pending Verification</h2>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-elf-charcoal text-white">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">School Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Region</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">HT Contact</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <LoadingRow />
              ) : filteredSchools.map((school) => (
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
                      className="bg-elf-teal text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2c8d88] transition-all transform active:scale-95 shadow-lg shadow-teal-100/50"
                    >
                      Verify & Issue Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSchools.length === 0 && !loading && (
            <EmptyState message={searchQuery ? "No schools match your search." : "All schools are currently verified."} />
          )}
        </div>
      </section>

      {/* Recent Activations History */}
      <section>
        <div className="flex items-center gap-3 mb-4 ml-2">
          <FaHistory className="text-elf-teal" />
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Issued Registration Codes</h2>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-6">
          {verifiedLog.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verifiedLog.map((log) => (
                <div key={log.id} className="flex flex-col p-5 bg-elf-gray rounded-[1.5rem] border border-gray-100 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                    <FaCheckCircle className="text-elf-teal" size={20} />
                  </div>
                  <p className="text-xs font-black text-elf-charcoal uppercase truncate pr-6">{log.name}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">Unique Code</p>
                      <p className="text-lg font-black text-elf-teal tracking-widest">{log.registrationCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-400 font-bold uppercase italic">Activated At</p>
                      <p className="text-[10px] font-mono font-bold text-gray-600">{log.activatedAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 italic text-gray-400 text-xs font-bold uppercase tracking-widest">
              No codes issued in this session.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ... Helper Components (ActionButton, LoadingRow, EmptyState remain as provided before)
const ActionButton = ({ icon, label }: { icon: any, label: string }) => (
  <button className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-elf-teal hover:text-elf-teal transition-all flex items-center gap-2 shadow-sm">
    <span className="text-elf-teal">{icon}</span> {label}
  </button>
);

const LoadingRow = () => (
  <tr>
    <td colSpan={4} className="py-20 text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">
      Syncing National Registration Database...
    </td>
  </tr>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="py-20 text-center">
    <div className="text-4xl mb-4">✨</div>
    <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">{message}</p>
  </div>
);

export default AdminDashboard;