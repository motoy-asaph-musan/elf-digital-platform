import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-elf-charcoal text-gray-400 pt-16 mt-auto w-full font-inter">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10 pb-16">
        
        {/* Column 1: Organization Branding */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-2xl font-extrabold m-0 mb-2">
            <span className="text-elf-teal">ELF</span> & BRITE
          </h3>
          <p className="text-sm leading-relaxed m-0">
            English Language Fraternity (ELF) in partnership with BRITE Organisation. 
            Empowering Ugandan learners through technology and the Competency-Based Curriculum (CBC).
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-sm m-0">📍 P.O. Box 70621 Kampala, Uganda</p>
            <p className="text-sm m-0">📍 Makerere University, College of Computing</p>
          </div>
          {/* Social Icons */}
          <div className="flex gap-2.5 mt-2">
            {['f', 't', 'i', 'y'].map((icon) => (
              <div key={icon} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-elf-teal transition-colors uppercase">
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Official Contact Details */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white text-base font-bold mb-1 uppercase tracking-wider border-b border-gray-800 pb-2">Contact Coordinators</h4>
          <p className="text-sm text-gray-300 m-0">📞 0773 774003 (Mr. Paul Woira)</p>
          <p className="text-sm text-gray-300 m-0">📞 0701 537 583 (Mrs. Erin Molan)</p>
          <p className="text-sm text-gray-300 m-0">📞 0765 347 527 (General Enquiries)</p>
          <p className="text-sm text-gray-300 m-0">📧 paulwoira112@gmail.com</p>
        </div>

        {/* Column 3: Payment & Registration */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white text-base font-bold mb-1 uppercase tracking-wider border-b border-gray-800 pb-2">Official Bank Accounts</h4>
          <div className="bg-gray-900/50 p-3 rounded-lg border-l-4 border-elf-teal">
            <p className="text-[11px] font-black text-elf-teal m-0">EQUITY BANK</p>
            <p className="text-lg text-white font-bold m-0 mt-1">A/C: 1010100809855</p>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg border-l-4 border-elf-teal">
            <p className="text-[11px] font-black text-elf-teal m-0">CENTENARY BANK</p>
            <p className="text-lg text-white font-bold m-0 mt-1">A/C: 3720039397</p>
          </div>
          <p className="text-[12px] text-gray-400 italic mt-1">
            📲 Share WhatsApp confirmation to <strong className="text-elf-teal">0773 774003</strong> for verification.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 p-6 text-center text-[12px] text-gray-600 bg-black/50">
        <p className="m-0 uppercase tracking-widest">
          © 2026 English Language Fraternity (ELF). Designed for Ugandan Schools.
        </p>
      </div>
    </footer>
  );
};

export default Footer;