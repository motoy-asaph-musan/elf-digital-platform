import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaExclamationCircle } from 'react-icons/fa';

const SubBadge: React.FC = () => {
  const navigate = useNavigate();
  // We check for the subscription flag. 
  // Tip: In the future, you can wrap this in a Context Provider for real-time updates.
  const isSubscribed = localStorage.getItem('is_subscribed') === 'true';

  if (!isSubscribed) {
    return (
      <button 
        onClick={() => navigate('/subscribe')}
        className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full hover:bg-amber-500 transition-all group shadow-sm shadow-amber-500/10"
      >
        <FaExclamationCircle className="text-amber-500 group-hover:text-white text-[10px]" />
        <span className="text-[10px] font-black text-amber-500 group-hover:text-white uppercase tracking-tighter">
          Activate Plan
        </span>
      </button>
    );
  }

  return (
    <div 
      onClick={() => navigate('/subscribe')}
      className="flex items-center gap-2 px-3 py-1.5 bg-elf-teal/10 border border-elf-teal/20 rounded-full cursor-pointer hover:bg-elf-teal/20 transition-all group shadow-sm shadow-elf-teal/10"
    >
      <FaCrown className="text-elf-teal text-[10px]" />
      <span className="text-[10px] font-black text-elf-teal uppercase tracking-tighter">
        Premium Access
      </span>
    </div>
  );
};

export default SubBadge;