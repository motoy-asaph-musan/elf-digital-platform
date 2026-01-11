import React from 'react';

const About: React.FC = () => (
  <div className="max-w-4xl mx-auto py-20 px-5">
    <h1 className="text-4xl font-black mb-8 uppercase">About ELF & BRITE</h1>
    <div className="prose prose-lg text-gray-600 space-y-6">
      <p>
        The <strong>English Language Fraternity (ELF)</strong> is a partnership with <strong>BRITE</strong>, 
        operating out of Makerere University. We are dedicated to revolutionizing the Ugandan education 
        landscape by integrating modern technology with the Competency-Based Curriculum.
      </p>
      <p>
        Our platform serves as a bridge between learners, teachers, and national standards, ensuring 
        that every student has a fair chance to compete and excel in English language literacy.
      </p>
    </div>
  </div>
);

export default About;