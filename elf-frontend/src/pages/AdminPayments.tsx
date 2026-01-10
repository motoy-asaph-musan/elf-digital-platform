import React, { useState } from 'react';

interface PendingPayment {
  id: string;
  schoolName: string;
  amount: number;
  bank: 'Equity' | 'Centenary';
  whatsappRef: string;
  date: string;
  status: 'PENDING' | 'VERIFIED';
}

const MOCK_PENDING: PendingPayment[] = [
  { id: '1', schoolName: 'Mbarara High School', amount: 100000, bank: 'Equity', whatsappRef: '0773... - Headteacher', date: '2026-01-08', status: 'PENDING' },
  { id: '2', schoolName: 'Gulu University Primary', amount: 100000, bank: 'Centenary', whatsappRef: 'Screenshot_102.jpg', date: '2026-01-09', status: 'PENDING' },
];

const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState(MOCK_PENDING);

  const handleVerify = (id: string) => {
    setPayments(payments.filter(p => p.id !== id));
    alert("School Verified! Access to Contest and Resources is now active.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 md:p-12 font-inter">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-black text-elf-charcoal tracking-tight flex items-center gap-3">
          Verification Ledger <span className="text-sm font-medium text-gray-400 font-mono">/ Payments</span>
        </h1>
        <p className="text-gray-500 mt-1 font-medium italic">
          Cross-reference bank deposits with WhatsApp confirmations to activate school credentials.
        </p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Queue Size</span>
          <h2 className="text-3xl font-black text-elf-charcoal">{payments.length} <span className="text-sm text-elf-teal uppercase">Pending</span></h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm md:col-span-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total Collection (2026)</span>
          <h2 className="text-3xl font-black text-elf-charcoal font-mono">UGX 2,400,000</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-elf-charcoal text-white">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">School Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Bank</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">WhatsApp Ref</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => (
                <tr key={p.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 text-sm font-mono text-gray-400">{p.date}</td>
                  <td className="px-8 py-6">
                    <p className="font-black text-elf-charcoal uppercase text-sm italic tracking-tight">{p.schoolName}</p>
                    <p className="text-[10px] font-bold text-elf-teal uppercase tracking-widest">UGX {p.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${p.bank === 'Equity' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                      {p.bank}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <code className="bg-gray-100 px-3 py-1.5 rounded-lg font-mono text-xs text-gray-600 border border-gray-200 group-hover:bg-white transition-colors">
                      {p.whatsappRef}
                    </code>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleVerify(p.id)} 
                      className="bg-elf-teal text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#2c8d88] shadow-lg shadow-teal-50 transition-all active:scale-95"
                    >
                      Verify & Activate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {payments.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">All payment records verified</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;