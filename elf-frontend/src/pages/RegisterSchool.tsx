import React, { useState } from 'react';

const RegisterSchool: React.FC = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    headteacher: '',
    contact: '',
    region: 'Central',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration details saved! Please complete the payment and send confirmation.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5 font-inter">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-elf-charcoal tracking-tight">School Registration 2026</h2>
          <p className="text-gray-500 mt-2 font-medium">Official Entry for National English Contest & CBC Workshops</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Form Side */}
          <div className="md:col-span-3 bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">School Name</label>
                <input 
                  name="schoolName"
                  type="text" 
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none transition-all" 
                  placeholder="e.g. Mbarara High School" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">Region</label>
                <select 
                  name="region"
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none bg-white transition-all font-medium"
                >
                  <option>Central</option>
                  <option>Eastern</option>
                  <option>Western</option>
                  <option>Northern</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">Headteacher Name</label>
                <input 
                  name="headteacher"
                  type="text" 
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none transition-all" 
                  placeholder="Full Name" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-elf-charcoal text-white rounded-2xl font-black shadow-lg hover:bg-black transition-all active:scale-[0.98] mt-4"
              >
                Submit Details
              </button>
            </form>
          </div>

          {/* Payment Instructions Side */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] shadow-sm">
              <h4 className="text-amber-800 font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                💳 Payment Info
              </h4>
              
              <div className="space-y-4">
                <div className="pb-3 border-b border-amber-200/50">
                  <p className="text-[10px] text-amber-600 font-bold uppercase">Registration Fee</p>
                  <p className="text-xl font-black text-amber-900 tracking-tighter">UGX 100,000</p>
                </div>

                <div>
                  <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">Bank Accounts</p>
                  <div className="space-y-2 text-sm text-amber-900 font-medium">
                    <p className="flex justify-between"><span>Equity:</span> <span className="font-mono font-bold">1010100809855</span></p>
                    <p className="flex justify-between"><span>Centenary:</span> <span className="font-mono font-bold">3720039397</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-green-50 border border-green-100 p-6 rounded-[2rem] shadow-sm text-center">
              <p className="text-xs text-green-700 font-bold leading-relaxed mb-4">
                ⚠️ After payment, share the confirmation slip via WhatsApp
              </p>
              <a 
                href="https://wa.me/256773774003" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-xl font-black text-xs hover:bg-green-700 transition-all shadow-md shadow-green-100"
              >
                <span>💬</span> SHARE ON WHATSAPP
              </a>
              <p className="text-[10px] text-green-600 font-bold mt-3 tracking-widest">
                0773 774003
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterSchool;