import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaApple, 
  FaGooglePlay, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaWhatsapp 
} from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="bg-elf-charcoal text-white pt-16 pb-8 px-5 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        
        {/* Column 1: Brand & Social */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-black text-elf-teal block">
            ELF <span className="text-white">& BRITE</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            English Language Fraternity (ELF) in partnership with BRITE Organisation. 
            Empowering Ugandan learners through technology and the Competency-Based Curriculum (CBC).
          </p>
          <div className="flex gap-4">
             <FaFacebook className="text-xl hover:text-elf-teal cursor-pointer transition-colors" />
             <FaTwitter className="text-xl hover:text-elf-teal cursor-pointer transition-colors" />
             <FaInstagram className="text-xl hover:text-elf-teal cursor-pointer transition-colors" />
             <FaYoutube className="text-xl hover:text-elf-teal cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Column 2: Quick Links (Now Functional) */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-elf-teal">Platform</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/offerings" className="hover:text-white transition-colors">What We Offer</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors font-bold text-elf-teal/80">Privacy Policy</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Member Login</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Coordination */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-elf-teal">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-elf-teal mt-1" />
              <span>Makerere University,<br/>College of Computing, Kampala</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-elf-teal" />
              <span>0773 774003 (Mr. Paul)</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-elf-teal" />
              <span className="text-xs">paulwoira112@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 text-elf-teal font-bold">
              <FaWhatsapp />
              <span>Share Proof of Payment</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Apps & Official Accounts */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-elf-teal">Download App</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all group">
                <FaGooglePlay className="group-hover:text-elf-teal" /> 
                <span className="text-[10px] font-bold uppercase">Google Play</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all group">
                <FaApple className="text-lg group-hover:text-elf-teal" /> 
                <span className="text-[10px] font-bold uppercase">App Store</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-xl border-l-2 border-elf-teal">
            <p className="text-[10px] font-black text-elf-teal uppercase">Equity Bank Account</p>
            <p className="text-sm text-white font-bold">1010100809855</p>
          </div>
        </div>
      </div>

      {/* Bottom Payment Bar */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[11px] text-gray-500 uppercase tracking-widest">
          © 2026 ELF Platform. Designed for Ugandan Schools.
        </p>
        <div className="flex items-center gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
          <span className="text-[10px] font-bold text-gray-400">SECURE PAYMENTS:</span>
          <span className="text-[11px] font-black italic">MTN MoMo</span>
          <span className="text-[11px] font-black italic">Airtel Money</span>
          <SiVisa size={28} />
          <SiMastercard size={24} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;