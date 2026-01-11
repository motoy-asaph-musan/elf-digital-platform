import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield, FaEyeSlash } from 'react-icons/fa';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="font-inter text-elf-charcoal bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-elf-gray py-16 px-5 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-elf-teal/10 rounded-2xl text-elf-teal mb-6">
            <FaShieldAlt size={40} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-medium italic">Last Updated: January 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-5 max-w-4xl mx-auto leading-relaxed">
        <div className="space-y-12">
          
          {/* 1. Introduction */}
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase mb-4">
              <span className="text-elf-teal">01.</span> Introduction
            </h2>
            <p className="text-gray-600">
              The English Language Fraternity (ELF) Platform, in partnership with BRITE and operating within 
              Makerere University, is committed to protecting the privacy of our students, teachers, and schools. 
              This policy explains how we collect, use, and safeguard your personal data in accordance with 
              the <strong>Uganda Data Protection and Privacy Act</strong>.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div className="bg-elf-gray/50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase mb-4">
              <span className="text-elf-teal">02.</span> Information Collection
            </h2>
            <p className="text-gray-600 mb-6">To provide a secure contest environment, we collect the following:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PrivacyItem icon={<FaLock size={12}/>} text="Names and School Affiliation" />
              <PrivacyItem icon={<FaLock size={12}/>} text="Phone Numbers (for MoMo/Airtel)" />
              <PrivacyItem icon={<FaLock size={12}/>} text="Email Addresses (for Auth)" />
              <PrivacyItem icon={<FaLock size={12}/>} text="Teacher Registration Codes" />
            </ul>
          </div>

          {/* 3. Payment Security */}
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase mb-4">
              <span className="text-elf-teal">03.</span> Payment Security
            </h2>
            <p className="text-gray-600 mb-4">
              Financial transactions for contest fees via <strong>MTN Mobile Money, Airtel Money, or Visa</strong> 
              are processed through encrypted secure gateways.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800 italic font-medium">
              Important: ELF Platform does not store your Mobile Money PINs or Credit Card CVV numbers. 
              All payments are handled by regulated third-party financial aggregators.
            </div>
          </div>

          {/* 4. Data Usage */}
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase mb-4">
              <span className="text-elf-teal">04.</span> How We Use Data
            </h2>
            <p className="text-gray-600">Your data is strictly used for:</p>
            <ul className="mt-4 space-y-2 text-gray-600 list-disc ml-6">
              <li>Verifying student eligibility for national contests.</li>
              <li>Generating digital merit certificates.</li>
              <li>Allowing teachers to access the "Teacher Vault" materials.</li>
              <li>Providing progress analytics to schools and parents.</li>
            </ul>
          </div>

          {/* 5. Data Protection */}
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-black uppercase mb-4">
              <span className="text-elf-teal">05.</span> Your Rights
            </h2>
            <p className="text-gray-600">
              Under Ugandan law, you have the right to request access to your data, correct inaccuracies, 
              or request the deletion of your account. For any privacy-related concerns, please contact our 
              Data Protection Officer at <strong>privacy@elfuganda.com</strong>.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-10 bg-elf-charcoal rounded-[40px] text-center text-white shadow-xl">
          <FaUserShield size={48} className="mx-auto text-elf-teal mb-6" />
          <h3 className="text-2xl font-black uppercase mb-2">We respect your digital space.</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">By using the ELF Platform, you agree to the terms outlined in this Privacy Policy.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-elf-teal text-white px-8 py-3 rounded-xl font-bold hover:bg-elf-teal-hover transition-all"
          >
            I Understand
          </button>
        </div>
      </section>
    </div>
  );
};

// Helper Component
const PrivacyItem = ({ icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
    <div className="text-elf-teal">{icon}</div>
    <span className="text-sm font-bold text-gray-700">{text}</span>
  </div>
);

export default PrivacyPolicy;
