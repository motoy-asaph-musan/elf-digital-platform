import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { score, total, examId } = location.state || { score: 0, total: 0, examId: 'National-Contest' };
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  // Dynamic colors based on performance
  const statusColor = percentage >= 80 ? 'text-green-500' : percentage >= 50 ? 'text-elf-teal' : 'text-orange-500';

  return (
    <div className="min-h-screen bg-elf-charcoal flex justify-center items-center p-5 font-inter">
      <div className="bg-white w-full max-w-[550px] p-10 md:p-12 rounded-[2.5rem] shadow-2xl text-center animate-in zoom-in duration-500">
        
        <div className="inline-block bg-teal-50 text-elf-teal px-4 py-1 rounded-full text-[11px] font-black tracking-widest mb-6">
          CONTEST COMPLETED
        </div>
        
        <div className="text-6xl mb-4">🎓</div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Results Summary</h1>
        <p className="text-gray-500 text-sm mb-8">
          You have successfully submitted the <strong className="text-elf-charcoal uppercase">{examId.replace(/-/g, ' ')}</strong> paper.
        </p>
        
        {/* Score Display Card */}
        <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-elf-teal to-transparent opacity-50"></div>
          
          <span className="text-[11px] font-black tracking-[0.2em] text-elf-teal">PERFORMANCE SCORE</span>
          <h2 className={`text-8xl font-black my-4 tracking-tighter transition-all ${statusColor}`}>
            {percentage}%
          </h2>
          <p className="text-sm font-bold text-gray-400">
            {score} out of {total} questions correct
          </p>
        </div>

        {/* Dynamic Message */}
        <div className="text-gray-600 leading-relaxed mb-10 px-4 italic font-medium">
          {percentage >= 80 ? "Exceptional work! You are among the top performers in the fraternity." : 
           percentage >= 50 ? "Good job! You've shown strong proficiency in CBC English." : 
           "Thank you for participating! Review the teacher resources to improve your score."}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => alert('Certificate Generation coming soon!')} 
            className="w-full py-5 bg-elf-charcoal text-white rounded-2xl font-black text-sm shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            📜 Download Participation Certificate
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate(`/leaderboard`)} 
              className="flex-1 py-4 bg-elf-teal text-white rounded-xl font-bold text-sm hover:bg-[#2c8d88] shadow-lg shadow-teal-100 transition-all"
            >
              National Ranking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;