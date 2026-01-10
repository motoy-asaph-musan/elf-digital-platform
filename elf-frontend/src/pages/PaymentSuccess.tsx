import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-teal-100 border border-gray-100 text-center relative overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-elf-teal"></div>

        {/* Success Icon */}
        <div className="w-24 h-24 bg-teal-50 text-elf-teal rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="text-elf-teal text-[10px] font-black tracking-[0.4em] uppercase block mb-2">
          Transaction Confirmed
        </span>
        <h1 className="text-3xl font-black text-elf-charcoal mb-4 tracking-tight">
          Welcome to the Club!
        </h1>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
          Your subscription is now active. Your school can now access all premium National Contest materials and detailed student analytics.
        </p>

        {/* Receipt Summary Box */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
            <span className="text-[10px] font-black text-elf-teal uppercase">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Billing</span>
            <span className="text-[10px] font-black text-elf-charcoal uppercase italic">Jan 2027</span>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="w-full py-5 bg-elf-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-black transition-all transform hover:scale-[1.02] active:scale-95"
          >
            Go to Dashboard
          </button>
          
          <button 
            onClick={() => window.print()}
            className="w-full py-4 bg-white text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:text-elf-charcoal transition-colors"
          >
            Download Receipt (PDF)
          </button>
        </div>

        <p className="mt-8 text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
          Need help? Contact our support team at <br/>
          <span className="text-elf-teal">support@elf-digital.com</span>
        </p>
      </div>
    </div>
  );
}