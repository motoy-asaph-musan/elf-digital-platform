import React from 'react';
import { FaLaptopCode, FaAward, FaUsers } from 'react-icons/fa';

const WhatWeOffer: React.FC = () => {
  const offers = [
    {
      icon: <FaLaptopCode size={24} />,
      title: "Digital Exams",
      desc: "Timed, secure English contests tailored for P.7, S.4, and S.6 levels."
    },
    {
      icon: <FaAward size={24} />,
      title: "National Ranking",
      desc: "Instant results and national leaderboards to showcase school excellence."
    },
    {
      icon: <FaUsers size={24} />,
      title: "Teacher Vault",
      desc: "A library of resources to help teachers improve literacy in their classrooms."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-[5%] font-inter">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black text-elf-charcoal tracking-tighter mb-4">PLATFORM <span className="text-elf-teal">OFFERINGS</span></h1>
        <p className="text-gray-400 font-medium italic">Empowering schools with tools for the 2026 academic cycle.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {offers.map((item, idx) => (
          <div key={idx} className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform">
            <div className="w-14 h-14 bg-elf-teal/10 rounded-2xl flex items-center justify-center text-elf-teal mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-black text-elf-charcoal mb-3 uppercase tracking-tight">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;