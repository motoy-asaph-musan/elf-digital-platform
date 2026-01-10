import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MOCK_QUESTIONS = [
  { id: 1, text: "In CBC English, 'Functional Writing' primarily aims to help students:", options: ["Memorize dictionary definitions", "Master real-life communication tasks", "Analyze ancient Greek texts", "Improve handwriting speed"], correct: 1 },
  { id: 2, text: "Which element is essential for a successful scenario-based speech?", options: ["Using complex archaic words", "Understanding the specific audience and context", "Speaking for at least two hours", "Ignoring the moderator's prompts"], correct: 1 },
  { id: 3, text: "What is the capital city of Uganda?", options: ["Entebbe", "Kampala", "Jinja", "Mbarara"], correct: 1 },
];

const ExamPage: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // --- 🛡️ SECURITY: SESSION LOCK CHECK ---
  useEffect(() => {
    const completedExams = JSON.parse(localStorage.getItem('completed_exams') || '[]');
    if (completedExams.includes(examId)) {
      alert("This exam session has already been submitted.");
      navigate('/results', { replace: true });
    }
  }, [examId, navigate]);

  // --- 🛡️ SECURITY: TAB-SWITCH DETECTION ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isFinished) {
        console.warn("Unauthorized tab switch detected.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isFinished]);

  // --- 📥 SUBMISSION LOGIC ---
  const submitExam = useCallback(() => {
    if (isFinished) return;
    setIsFinished(true);

    let score = 0;
    MOCK_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) score += 1;
    });

    const completedExams = JSON.parse(localStorage.getItem('completed_exams') || '[]');
    if (!completedExams.includes(examId)) {
      completedExams.push(examId);
      localStorage.setItem('completed_exams', JSON.stringify(completedExams));
    }

    navigate('/results', { 
      state: { score, total: MOCK_QUESTIONS.length, examId },
      replace: true 
    });
  }, [answers, examId, navigate, isFinished]);

  // --- ⏲️ TIMER & TOAST LOGIC ---
  useEffect(() => {
    if (timeLeft <= 0) {
      submitExam();
      return;
    }

    // Trigger Toasts at critical intervals
    if (timeLeft === 600) triggerToast("10 Minutes Remaining! Check your answers.");
    if (timeLeft === 300) triggerToast("5 Minutes Remaining! Finalize your submission.");
    if (timeLeft === 60) triggerToast("FINAL MINUTE! System will auto-submit shortly.");

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitExam]);

  const triggerToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 5000);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (Object.keys(answers).length / MOCK_QUESTIONS.length) * 100;

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-inter overflow-hidden select-none">
      
      {/* --- 🔔 FLOATING TIMER TOAST --- */}
      {toast.visible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] animate-in slide-in-from-top duration-500">
          <div className="bg-elf-charcoal text-white px-6 py-3 rounded-2xl shadow-2xl border-b-4 border-elf-teal flex items-center gap-3">
            <span className="text-elf-teal animate-pulse">⚠️</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 px-10 bg-elf-charcoal text-white shadow-lg z-20">
        <div>
          <span className="text-elf-teal text-[10px] font-black tracking-widest block mb-1 uppercase">● Live Session</span>
          <h2 className="m-0 text-lg font-black tracking-tight uppercase italic">
            {examId?.replace('-', ' ') || 'National Contest'}
          </h2>
        </div>
        
        <div className="text-right">
          <span className="text-[10px] text-gray-500 font-bold block tracking-widest uppercase">Time Remaining</span>
          <div className={`text-2xl font-black font-mono transition-colors ${timeLeft < 600 ? 'text-red-500 animate-pulse' : 'text-elf-teal'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-800">
        <div 
          className="h-full bg-elf-teal transition-all duration-500 ease-out shadow-[0_0_10px_rgba(56,178,172,0.5)]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Navigation */}
        <aside className="w-72 bg-white border-r border-gray-200 p-8 overflow-y-auto hidden md:block">
          <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.2em]">Navigation</h3>
          <div className="grid grid-cols-4 gap-3">
            {MOCK_QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`h-10 rounded-xl text-xs font-black transition-all border-2 
                  ${currentIdx === i ? 'border-elf-teal bg-elf-teal text-white shadow-lg shadow-teal-100' : 
                    answers[i] !== undefined ? 'bg-elf-charcoal border-elf-charcoal text-white' : 
                    'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-elf-teal"></span> Active
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-elf-charcoal"></span> Answered
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto flex flex-col items-center bg-[#fcfcfc]">
          <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <span className="text-[10px] font-black text-elf-teal uppercase tracking-[0.3em]">
              Question {currentIdx + 1} / {MOCK_QUESTIONS.length}
            </span>
            <p className="text-xl md:text-2xl text-elf-charcoal mt-6 mb-12 leading-snug font-bold italic tracking-tight">
              {MOCK_QUESTIONS[currentIdx].text}
            </p>
            
            <div className="flex flex-col gap-4">
              {MOCK_QUESTIONS[currentIdx].options.map((opt, i) => (
                <label 
                  key={i} 
                  className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all active:scale-[0.98]
                    ${answers[currentIdx] === i 
                      ? 'border-elf-teal bg-teal-50/20 ring-4 ring-teal-500/5' 
                      : 'border-gray-50 hover:border-gray-200 hover:bg-gray-50/50'}`}
                >
                  <input
                    type="radio"
                    name={`q-${currentIdx}`}
                    checked={answers[currentIdx] === i}
                    onChange={() => setAnswers({ ...answers, [currentIdx]: i })}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all
                    ${answers[currentIdx] === i ? 'border-elf-teal bg-elf-teal' : 'border-gray-300'}`}>
                    {answers[currentIdx] === i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-bold ${answers[currentIdx] === i ? 'text-elf-teal' : 'text-gray-600'}`}>
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between w-full max-w-3xl mt-10">
            <button 
              disabled={currentIdx === 0} 
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-10 py-4 bg-white border border-gray-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
            >
              ← Back
            </button>
            
            {currentIdx === MOCK_QUESTIONS.length - 1 ? (
              <button 
                onClick={() => setShowConfirm(true)} 
                className="px-10 py-4 bg-elf-teal text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-teal-200 hover:bg-elf-tealHover transition-all transform hover:scale-105 active:scale-95"
              >
                Submit Finals
              </button>
            ) : (
              <button 
                onClick={() => setCurrentIdx(prev => prev + 1)} 
                className="px-10 py-4 bg-elf-charcoal text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200"
              >
                Next Question →
              </button>
            )}
          </div>
        </main>
      </div>

      {/* --- 🛡️ SUBMISSION CONFIRMATION MODAL --- */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-elf-charcoal/90 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-elf-teal/10 text-elf-teal rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                📝
              </div>
              <h2 className="text-2xl font-black text-elf-charcoal mb-2">Finish Exam?</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                You have answered <span className="font-bold text-elf-teal">{Object.keys(answers).length}</span> out of <span className="font-bold">{MOCK_QUESTIONS.length}</span> questions. 
              </p>

              {Object.keys(answers).length < MOCK_QUESTIONS.length && (
                <div className="mb-8 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-tight">
                    ⚠️ You have {MOCK_QUESTIONS.length - Object.keys(answers).length} unanswered questions!
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button 
                  onClick={submitExam}
                  className="w-full py-4 bg-elf-teal text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-elf-tealHover transition-all shadow-lg shadow-teal-100"
                >
                  Yes, Submit My Answers
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 bg-gray-50 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  No, Go Back to Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;