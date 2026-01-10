import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubBadge: React.FC = () => {
  const navigate = useNavigate();
  const isSubscribed = localStorage.getItem('is_subscribed') === 'true';

  if (!isSubscribed) {
    return (
      <button 
        onClick={() => navigate('/subscribe')}
        className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full hover:bg-orange-500 transition-all group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white animate-pulse"></span>
        <span className="text-[10px] font-black text-orange-500 group-hover:text-white uppercase tracking-tighter">Inactive Plan</span>
      </button>
    );
  }

  return (
    <div 
      onClick={() => navigate('/subscribe')}
      className="flex items-center gap-2 px-3 py-1.5 bg-elf-teal/10 border border-elf-teal/20 rounded-full cursor-pointer hover:bg-elf-teal/20 transition-all group"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-elf-teal"></span>
      <span className="text-[10px] font-black text-elf-teal uppercase tracking-tighter">Premium Active</span>
    </div>
  );
};

export default SubBadge;