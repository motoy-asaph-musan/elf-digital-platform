import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';

const RegistrationPending: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5 font-inter">
      <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-2xl border border-gray-100 text-center">
        
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 animate-pulse">
          <FaClock size={40} />
        </div>

        <h2 className="text-2xl font-black text-elf-charcoal uppercase tracking-tight">Application Received</h2>
        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
          Your school details have been logged. Our team is currently verifying the payment confirmation.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Step</p>
            <p className="text-xs font-bold text-elf-charcoal mt-1">
              You will receive a 6-digit <span className="text-elf-teal">School Access Code</span> via SMS once verified.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Speed up process</p>
            <p className="text-xs font-bold text-green-800 mt-1">
              Send your payment receipt to our WhatsApp support.
            </p>
            <a 
              href="https://wa.me/256773774003" 
              className="mt-3 flex items-center justify-center gap-2 w-full py-2 bg-green-600 text-white rounded-xl text-xs font-black hover:bg-green-700 transition-all"
            >
              <FaWhatsapp /> OPEN WHATSAPP
            </a>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-gray-400 text-xs font-bold hover:text-elf-teal flex items-center justify-center gap-2 w-full transition-colors"
        >
          <FaArrowLeft size={10} /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default RegistrationPending;