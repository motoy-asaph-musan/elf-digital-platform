import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added missing import
import { subscribe } from "../api/payments";

export default function Subscribe() {
  const [plan, setPlan] = useState<string>("MONTHLY");
  const [provider, setProvider] = useState<"MTN" | "AIRTEL" | "VISA">("MTN");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Added missing hook initialization

  const price = plan === "MONTHLY" ? 20000 : 200000;

  const submit = async () => {
    setLoading(true);
    try {
      const res = await subscribe({ amount: price, provider, plan });
      
      // ✅ SUCCESS LOGIC: Update local state for the SubscriptionGuard
      localStorage.setItem('is_subscribed', 'true');
      
      // ✅ Redirect to the success page
      navigate('/payment-success');
    } catch (err) {
      alert("Subscription failed. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-12">
        <span className="text-elf-teal text-[10px] font-black tracking-[0.3em] uppercase block mb-4">
          Membership Access
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-elf-charcoal mb-4 tracking-tight">
          Upgrade Your School
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
          Unlock unlimited access to National Contest exams and advanced CBC reporting tools for your students.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mb-12">
        {/* Monthly Plan */}
        <div 
          onClick={() => setPlan("MONTHLY")}
          className={`relative p-8 rounded-[2.5rem] bg-white border-4 transition-all cursor-pointer transform hover:scale-[1.02]
            ${plan === "MONTHLY" ? 'border-elf-teal shadow-2xl shadow-teal-100' : 'border-transparent shadow-sm hover:border-gray-200'}`}
        >
          <div className={`absolute top-6 right-8 w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${plan === "MONTHLY" ? 'border-elf-teal bg-elf-teal' : 'border-gray-300'}`}>
            {plan === "MONTHLY" && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Monthly</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-elf-charcoal">UGX 20,000</span>
            <span className="text-gray-400 font-bold text-xs">/month</span>
          </div>
          <p className="mt-6 text-sm text-gray-500 font-medium">Perfect for a trial period or short-term exam prep.</p>
        </div>

        {/* Yearly Plan */}
        <div 
          onClick={() => setPlan("YEARLY")}
          className={`relative p-8 rounded-[2.5rem] bg-white border-4 transition-all cursor-pointer transform hover:scale-[1.02]
            ${plan === "YEARLY" ? 'border-elf-teal shadow-2xl shadow-teal-100' : 'border-transparent shadow-sm hover:border-gray-200'}`}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-elf-charcoal text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Best Value
          </div>
          <div className={`absolute top-6 right-8 w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${plan === "YEARLY" ? 'border-elf-teal bg-elf-teal' : 'border-gray-300'}`}>
            {plan === "YEARLY" && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Yearly</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-elf-charcoal">UGX 200,000</span>
            <span className="text-gray-400 font-bold text-xs">/year</span>
          </div>
          <p className="mt-4 text-xs font-black text-elf-teal bg-teal-50 inline-block px-3 py-1 rounded-lg">
            SAVE UGX 40,000
          </p>
          <p className="mt-4 text-sm text-gray-500 font-medium">Standard choice for schools committed to excellence.</p>
        </div>
      </div>

      {/* Payment Provider Selection */}
      <div className="w-full max-w-xl bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 text-center">
          Select Payment Method
        </h4>
        
        <div className="grid grid-cols-3 gap-4 mb-10">
          {(['MTN', 'AIRTEL', 'VISA'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`py-4 rounded-2xl font-black text-xs transition-all border-2 
                ${provider === p 
                  ? 'border-elf-charcoal bg-elf-charcoal text-white' 
                  : 'border-gray-100 text-gray-400 hover:border-gray-300'}`}
            >
              {p === 'VISA' ? 'Credit Card' : p}
            </button>
          ))}
        </div>

        <button 
          onClick={submit}
          disabled={loading}
          className="w-full py-5 bg-elf-teal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-teal-100 hover:bg-elf-tealHover transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Securely Pay with ${provider}`}
        </button>
        
        <p className="text-[9px] text-gray-400 mt-6 text-center font-bold uppercase tracking-widest">
          🔒 Secure 256-bit encrypted transaction
        </p>
      </div>
    </div>
  );
}