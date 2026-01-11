import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaSchool, FaGlobeAfrica, FaShieldAlt, FaSpinner } from 'react-icons/fa';

interface PendingPayment {
  id: string;
  amount: number;
  purpose: string;
  status: string;
  school: {
    name: string;
    region: string;
  };
}

const AdminVerifications: React.FC = () => {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch pending payments from NestJS backend
    fetch('/api/payments/pending')
      .then(res => res.json())
      .then(data => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleVerify = async (paymentId: string) => {
    const confirm = window.confirm("Confirm UGX 100,000 receipt? This will activate the school and generate an access code.");
    if (!confirm) return;

    setVerifyingId(paymentId);
    try {
      const response = await fetch(`/api/payments/verify/${paymentId}`, { method: 'PATCH' });
      const result = await response.json();
      
      if (result.success) {
        // We use a custom alert style or a prompt to show the code clearly
        window.alert(`✅ VERIFIED!\n\nSchool: ${result.data.schoolName}\nCode: ${result.data.schoolCode}\n\nAn SMS has been triggered to the headteacher.`);
        setPayments(payments.filter(p => p.id !== paymentId));
      }
    } catch (err) {
      alert("Verification failed. Please check your internet connection.");
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-10 font-inter">
      
      {/* Admin Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-elf-teal">
            <FaShieldAlt size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Administrator Portal</span>
          </div>
          <h2 className="text-4xl font-black text-elf-charcoal tracking-tighter uppercase">Verifications</h2>
          <p className="text-gray-400 font-medium italic text-sm">Reviewing manual payment slips for the 2026 Season</p>
        </div>

        <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                    <FaSpinner className={loading ? 'animate-spin' : ''} />
                </div>
                <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">In Queue</span>
                    <span className="text-xl font-black text-elf-charcoal">{payments.length} Pending</span>
                </div>
            </div>
        </div>
      </header>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-32 text-center">
            <div className="w-16 h-16 border-4 border-elf-teal/10 border-t-elf-teal rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Accessing Encrypted Data...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-32 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <FaCheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-elf-charcoal uppercase">Queue Clear</h3>
            <p className="text-gray-400 mt-2 font-medium">All school payments have been processed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-elf-charcoal text-white">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Institution</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Region</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Amount</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map(payment => (
                  <tr key={payment.id} className="group hover:bg-elf-teal/[0.02] transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-elf-teal group-hover:text-white transition-all">
                            <FaSchool />
                        </div>
                        <div>
                            <p className="font-black text-elf-charcoal uppercase text-sm group-hover:text-elf-teal transition-colors tracking-tight">
                                {payment.school.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Registration Fee</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <FaGlobeAfrica className="text-gray-300 text-xs" />
                        <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">
                            {payment.school.region}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="font-mono font-black text-elf-charcoal bg-gray-50 px-3 py-1 rounded-lg">
                        UGX {payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        disabled={verifyingId === payment.id}
                        onClick={() => handleVerify(payment.id)} 
                        className={`
                            ${verifyingId === payment.id ? 'bg-gray-200 cursor-not-allowed' : 'bg-elf-teal hover:bg-[#2c8d88] shadow-lg shadow-teal-100'}
                            text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 flex items-center gap-2 ml-auto
                        `}
                      >
                        {verifyingId === payment.id ? 'Processing...' : 'Verify & Generate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-gray-100 rounded-full text-gray-400">
            <FaShieldAlt size={12} />
            <p className="text-[9px] font-black uppercase tracking-[0.2em]">
                System Log: Session expires in 55 minutes
            </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminVerifications;