import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-[5%] max-w-4xl mx-auto font-inter">
      <h1 className="text-4xl font-black text-elf-charcoal mb-2 uppercase tracking-tighter">Terms of Service</h1>
      <p className="text-elf-teal font-bold mb-10 uppercase tracking-widest text-xs">Effective Date: January 2026</p>
      
      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-extrabold text-elf-charcoal mb-3 italic underline">1. Acceptance of Terms</h2>
          <p>
            By registering a school or student on the ELF Platform, you agree to comply with and be bound by these terms. 
            The ELF Platform is a digital extension of the National English Contest.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-elf-charcoal mb-3 italic underline">2. School Registration & Fees</h2>
          <p>
            Schools must pay a non-refundable registration fee of UGX 100,000 to participate. 
            Verification is manual; once verified, a unique 6-digit code will be issued. 
            Sharing this code with schools not registered under your name is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-elf-charcoal mb-3 italic underline">3. Contest Integrity</h2>
          <p>
            Teachers and Coordinators are responsible for ensuring that students take exams without external assistance. 
            The ELF Platform reserves the right to disqualify students or schools found to be manipulating exam sessions 
            (e.g., duplicate device logins or plagiarism).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-elf-charcoal mb-3 italic underline">4. Data Usage</h2>
          <p>
            Student performance data will be used to generate the National Leaderboard. 
            Individual scores are private to the school and the student, but aggregated data may be used for 
            national literacy reporting.
          </p>
        </section>

        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h2 className="text-xl font-extrabold text-elf-charcoal mb-3 italic underline">5. Limitation of Liability</h2>
          <p className="text-sm">
            The ELF Platform is provided "as-is." While we strive for 100% uptime, we are not liable for 
            internet connectivity issues at the school level during contest hours.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;