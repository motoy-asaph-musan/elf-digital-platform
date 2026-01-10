import React, { useEffect, useState } from 'react';

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
    const confirm = window.confirm("Verify payment and activate school?");
    if (!confirm) return;

    try {
      const response = await fetch(`/api/payments/verify/${paymentId}`, { method: 'PATCH' });
      const result = await response.json();
      
      if (result.success) {
        alert(`Success! School Code Generated: ${result.data.schoolCode}`);
        setPayments(payments.filter(p => p.id !== paymentId));
      }
    } catch (err) {
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-8 font-inter">
      {/* Admin Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-elf-charcoal tracking-tight">Payment Verifications</h2>
          <p className="text-gray-500 font-medium italic">Approving school registrations for the 2026 Cycle</p>
        </div>
        <div className="bg-elf-teal/10 px-6 py-3 rounded-2xl border border-elf-teal/20">
          <span className="text-[10px] font-black text-elf-teal uppercase tracking-widest block">Pending Queue</span>
          <span className="text-2xl font-black text-elf-charcoal">{payments.length} Schools</span>
        </div>
      </header>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 border-4 border-elf-teal/20 border-t-elf-teal rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Secure Data...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-20 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-black text-elf-charcoal">All Caught Up!</h3>
            <p className="text-gray-400">There are no pending payments to verify at the moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-elf-charcoal text-white">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">School Name</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Region</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map(payment => (
                  <tr key={payment.id} className="group hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-elf-charcoal uppercase text-sm italic group-hover:text-elf-teal transition-colors">
                        {payment.school.name}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                        {payment.school.region}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center font-mono font-bold text-elf-charcoal">
                      UGX {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleVerify(payment.id)} 
                        className="bg-elf-teal text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-100 hover:bg-[#2c8d88] transition-all transform active:scale-95"
                      >
                        Verify & Generate Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Safety Note */}
      <footer className="mt-10 flex items-center justify-center gap-2 text-gray-400">
        <span className="text-lg">🛡️</span>
        <p className="text-[10px] font-bold uppercase tracking-widest">
          Secure Administrator Session — All actions are logged
        </p>
      </footer>
    </div>
  );
};

export default AdminVerifications;