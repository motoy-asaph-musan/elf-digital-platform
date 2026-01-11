import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaMapMarkerAlt, FaUserTie, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';

const RegisterSchool: React.FC = () => {
  const navigate = useNavigate();
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
    // Simulate API call to save school details
    console.log("Saving School Registration:", formData);
    
    // Redirect to the success/pending page we discussed
    navigate('/registration-pending');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5 font-inter">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-elf-teal/10 text-elf-teal px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Official 2026 Portal
          </div>
          <h2 className="text-4xl font-black text-elf-charcoal tracking-tight uppercase">School Registration</h2>
          <p className="text-gray-500 mt-2 font-medium">Register your institution for the National English Contest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* School Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-2">
                  <FaUniversity className="text-elf-teal" /> School Name
                </label>
                <input 
                  name="schoolName"
                  type="text" 
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none transition-all font-semibold text-elf-charcoal placeholder:font-normal" 
                  placeholder="e.g. King's College Budo" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Region */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-elf-teal" /> Region
                  </label>
                  <select 
                    name="region"
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none bg-white transition-all font-bold text-elf-charcoal cursor-pointer"
                  >
                    <option>Central</option>
                    <option>Eastern</option>
                    <option>Western</option>
                    <option>Northern</option>
                  </select>
                </div>

                {/* Headteacher Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-2">
                    <FaUserTie className="text-elf-teal" /> Headteacher
                  </label>
                  <input 
                    name="headteacher"
                    type="text" 
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none transition-all font-semibold text-elf-charcoal" 
                    placeholder="Full Name" 
                    required 
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-2">
                  <FaPhoneAlt className="text-elf-teal" /> WhatsApp / SMS Contact
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm border-r pr-3 border-gray-100">+256</span>
                    <input 
                    name="contact"
                    type="tel" 
                    onChange={handleChange}
                    className="w-full p-4 pl-20 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 outline-none transition-all font-bold text-elf-charcoal" 
                    placeholder="772 000 000" 
                    required 
                    />
                </div>
                <p className="text-[9px] text-gray-400 font-bold ml-1 italic">* This number will receive the 6-digit activation code.</p>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-elf-charcoal text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3"
              >
                Submit Application <FaChevronRight size={12} />
              </button>
            </form>
          </div>

          {/* Payment Instructions Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] shadow-sm">
              <h4 className="text-amber-800 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                💳 Payment Guide
              </h4>
              
              <div className="space-y-6">
                <div className="pb-4 border-b border-amber-200/50">
                  <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">Registration Fee</p>
                  <p className="text-3xl font-black text-amber-900 tracking-tighter mt-1">UGX 100,000</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-2">Equity Bank</p>
                    <div className="bg-white/50 p-3 rounded-xl font-mono font-bold text-amber-900 border border-amber-100 text-sm">
                        1010100809855
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-2">Centenary Bank</p>
                    <div className="bg-white/50 p-3 rounded-xl font-mono font-bold text-amber-900 border border-amber-100 text-sm">
                        3720039397
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaPhoneAlt />
              </div>
              <p className="text-xs text-gray-500 font-bold leading-relaxed mb-6 px-2">
                After making payment, please share your <span className="text-elf-charcoal">Bank Slip</span> or <span className="text-elf-charcoal">Transaction ID</span> via WhatsApp.
              </p>
              <a 
                href="https://wa.me/256773774003" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 text-white rounded-2xl font-black text-xs hover:bg-green-700 transition-all shadow-lg shadow-green-100"
              >
                WHATSAPP CONFIRMATION
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterSchool;