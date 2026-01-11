import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaChartLine, 
  FaApple, 
  FaGooglePlay, 
  FaCheckCircle, 
  FaFileDownload, 
  FaSearch,
  FaYoutube,
  FaTwitter
} from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const Home: React.FC = () => {
  return (
    <div className="font-inter text-elf-charcoal bg-white">
      {/* HERO SECTION */}
      <section className="bg-elf-gray py-20 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight uppercase">
              Empowering <span className="text-elf-teal">Ugandan Learners</span> Through Technology.
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              The English Language Fraternity (ELF) provides a competency-based curriculum platform for students and teachers across Uganda.
            </p>
            <div className="flex gap-4">
              <Link to="/register-school" className="bg-elf-teal text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-elf-teal-hover transition-all">
                Register School
              </Link>
              <Link to="/login" className="bg-white border-2 border-elf-teal text-elf-teal px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all">
                Login
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full h-96 bg-gray-200 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
                {/* Replace src with Mr. Woira's main hero photo */}
                <img src="/assets/hero-students.jpeg" alt="Students in Uganda" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 hidden md:block animate-bounce-slow">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Learners</p>
                <p className="text-2xl font-black text-elf-teal">15,000+</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS & SCHOOLS MARQUEE (New) */}
      <section className="py-12 bg-white border-y border-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Trusted by Leading Institutions</h3>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
            {/* Group 1 */}
            <SchoolLogo name="Gayaza High School" logo="/assets/logos/gayaza.png" />
            <SchoolLogo name="BRITE Organisation" logo="/assets/logos/brite.png" />
            <SchoolLogo name="Namilyango College" logo="/assets/logos/namilyango.png" />
            <SchoolLogo name="King's College Budo" logo="/assets/logos/budo.png" />
            <SchoolLogo name="Namagunga" logo="/assets/logos/namagunga.png" />
            {/* Duplicate for seamless loop */}
            <SchoolLogo name="Gayaza High School" logo="/assets/logos/gayaza.png" />
            <SchoolLogo name="BRITE Organisation" logo="/assets/logos/brite.png" />
            <SchoolLogo name="Namilyango College" logo="/assets/logos/namilyango.png" />
            <SchoolLogo name="King's College Budo" logo="/assets/logos/budo.png" />
            <SchoolLogo name="Namagunga" logo="/assets/logos/namagunga.png" />
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section className="py-20 px-5 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight">What We Offer</h2>
          <div className="w-20 h-1 bg-elf-teal mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaGraduationCap size={40} className="text-elf-teal"/>}
            title="Student Contests"
            desc="Join nationwide English language contests and test your skills against the best learners in Uganda."
            img="/assets/contest.jpeg"
          />
          <FeatureCard 
            icon={<FaChalkboardTeacher size={40} className="text-elf-teal"/>}
            title="Teacher Vault"
            desc="Access exclusive teaching materials and curriculum-aligned resources to improve classroom delivery."
            img="/assets/vault.jpeg"
          />
          <FeatureCard 
            icon={<FaChartLine size={40} className="text-elf-teal"/>}
            title="Performance Tracking"
            desc="Detailed analytics for parents and schools to monitor student progress and competency in real-time."
            img="/assets/tracking.jfif"
          />
        </div>
      </section>

      {/* SOCIAL PREVIEW SECTION (New) */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-black uppercase">Community <span className="text-elf-teal">Highlights</span></h2>
                    <p className="text-gray-500 mt-2">Latest school visits and award ceremonies across the country.</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-3 bg-white rounded-xl border border-gray-100 hover:text-red-600 transition-colors"><FaYoutube size={20}/></button>
                    <button className="p-3 bg-white rounded-xl border border-gray-100 hover:text-blue-400 transition-colors"><FaTwitter size={20}/></button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SocialCard title="Visit to Gayaza High" type="youtube" img="/assets/visit1.jpeg" />
                <SocialCard title="Eastern Region Finals" type="twitter" img="/assets/visit2.jpeg" />
                <SocialCard title="Teacher Training Day" type="youtube" img="/assets/visit3.jpeg" />
                <SchoolLogoGrid /> {/* Placeholder for extra proof */}
            </div>
        </div>
      </section>

      {/* TEACHER VAULT PREVIEW SECTION */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                <h4 className="font-black text-elf-teal uppercase text-sm">Vault Explorer</h4>
                <FaSearch className="text-gray-300" />
              </div>
              <div className="space-y-4">
                <VaultItem title="CBC Lesson Plan - Primary 5" category="English" date="Jan 2026" />
                <VaultItem title="Assessment Rubric - Term 1" category="Grammar" date="Jan 2026" />
                <VaultItem title="Poetry Performance Guide" category="Literature" date="Dec 2025" />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8 order-1 md:order-2">
            <div className="inline-block bg-elf-teal/10 text-elf-teal px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Exclusive for Educators
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Inside the <span className="text-elf-teal">Teacher Vault</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We provide teachers with a digital library of high-quality, CBC-aligned resources. Save hours on preparation and focus on what matters most: your students.
            </p>
            <Link to="/register-school" className="inline-block mt-4 bg-elf-charcoal text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg">
              Apply for Vault Access
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE APPS & PAYMENTS */}
      <section className="bg-elf-charcoal text-white py-16 px-5 rounded-[40px] mx-5 mb-20 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-black mb-4 uppercase">Take ELF Anywhere</h2>
            <p className="text-gray-400 mb-8">Download our mobile application to learn and track on the go.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <AppButton icon={<FaApple size={24}/>} store="App Store" />
              <AppButton icon={<FaGooglePlay size={20}/>} store="Play Store" />
            </div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-10">
            <h3 className="font-bold mb-6 uppercase text-sm tracking-widest text-elf-teal">Secure Local Payments</h3>
            <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
              <span className="font-black text-sm italic tracking-tighter opacity-80">MTN MoMo</span>
              <span className="font-black text-sm italic tracking-tighter opacity-80">AIRTEL Money</span>
              <SiVisa size={40} />
              <SiMastercard size={35} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const SchoolLogo = ({ name, logo }: any) => (
  <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 px-4">
    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img src={logo} alt={name} className="w-full h-full object-contain p-1" />
    </div>
    <span className="text-sm font-bold text-elf-charcoal tracking-tighter uppercase">{name}</span>
  </div>
);

const FeatureCard = ({ icon, title, desc, img }: any) => (
  <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
    <div className="h-40 bg-gray-200 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-8">
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-black mb-3 uppercase tracking-tight">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
    </div>
  </div>
);

const SocialCard = ({ title, type, img }: any) => (
    <div className="relative h-64 rounded-3xl overflow-hidden group shadow-lg">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-elf-teal mb-1 flex items-center gap-2">
                {type === 'youtube' ? <FaYoutube /> : <FaTwitter />} {type}
            </p>
            <p className="text-sm font-bold leading-tight">{title}</p>
        </div>
    </div>
);

const SchoolLogoGrid = () => (
    <div className="bg-elf-teal p-6 rounded-3xl flex flex-col justify-center items-center text-center text-white">
        <p className="text-2xl font-black mb-2 tracking-tighter uppercase">50+</p>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Schools Onboarded</p>
        <Link to="/register-school" className="mt-4 text-[10px] font-black uppercase bg-white text-elf-teal px-4 py-2 rounded-full">Join them</Link>
    </div>
);

const VaultItem = ({ title, category, date }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-elf-teal/30 hover:bg-white transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-elf-teal shadow-sm">
        <FaFileDownload />
      </div>
      <div>
        <p className="text-xs font-black text-elf-charcoal">{title}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{category} • {date}</p>
      </div>
    </div>
  </div>
);

const AppButton = ({ icon, store }: any) => (
  <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all">
    {icon}
    <div className="text-left">
      <p className="text-[10px] uppercase font-bold opacity-50">Download on</p>
      <p className="text-sm font-black leading-none">{store}</p>
    </div>
  </button>
);

export default Home;