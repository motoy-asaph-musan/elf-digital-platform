import { useState } from "react";
import { donate } from "../api/payments";

const PRESET_AMOUNTS = [5000, 10000, 20000, 50000];

export default function Donate() {
  const [amount, setAmount] = useState<number>(10000);
  const [provider, setProvider] = useState<"MTN" | "AIRTEL" | "VISA">("MTN");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await donate({ amount, provider });
      alert(res.data.message || "Payment Initialized. Check your phone for the MoMo prompt.");
    } catch (err) {
      alert("Payment failed to initialize. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6 font-inter">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
            ❤️
          </div>
          <h2 className="text-2xl font-black text-elf-charcoal tracking-tight">Support ELF</h2>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Your contributions keep the National English Contest accessible to students across Uganda.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Amount Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Select Amount (UGX)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_AMOUNTS.map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all border-2 
                    ${amount === val 
                      ? 'bg-elf-teal border-elf-teal text-white shadow-md' 
                      : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}`}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
            
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">UGX</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-elf-teal/50 outline-none font-bold text-elf-charcoal"
                placeholder="Custom Amount"
              />
            </div>
          </div>

          {/* Payment Provider Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Payment Method
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: 'MTN', label: 'MTN Mobile Money', sub: 'Instant Prompt' },
                { id: 'AIRTEL', label: 'Airtel Money', sub: 'Instant Prompt' },
                { id: 'VISA', label: 'Debit / Credit Card', sub: 'Visa or Mastercard' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id as any)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all
                    ${provider === p.id 
                      ? 'border-elf-charcoal bg-gray-50' 
                      : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="text-left">
                    <p className="text-sm font-black text-elf-charcoal uppercase">{p.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{p.sub}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-4 flex items-center justify-center
                    ${provider === p.id ? 'border-elf-teal bg-elf-charcoal' : 'border-gray-100'}`}>
                    {provider === p.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={submit} 
            disabled={loading || amount < 500}
            className="w-full py-5 bg-elf-charcoal text-white rounded-[1.5rem] font-black shadow-xl shadow-gray-200 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              `Donate UGX ${amount.toLocaleString()}`
            )}
          </button>
        </div>

        <p className="text-center mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
          Secure Payment Powered by <br />
          <span className="text-elf-charcoal">ELF Finance Gateway</span>
        </p>
      </div>
    </div>
  );
}