import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AICoachPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token && !userData) { navigate('/login'); return; }
    if (userData) setUser(JSON.parse(userData));
  }, [navigate]);

  const getLastName = () => { if (!user?.fullName) return 'Sharma'; const p = user.fullName.split(' '); return p.length > 1 ? p[p.length-1] : p[0]; };
  const getInitials = () => user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';


  return (
    <div className="flex h-screen w-screen bg-[#FDFCF8] font-sans text-gray-800 overflow-hidden" style={{ fontFamily: 'var(--font-heading)' }}>
      {/* SIDEBAR */}
      <Sidebar user={user} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FDFCF8] pt-14 md:pt-0">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-10 py-4 md:py-6 shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Velora / Insights</div>
              <h1 className="text-[24px] font-bold text-gray-900 leading-tight">AI Spending Coach</h1>
            </div>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-[12px] font-medium text-gray-500 mt-3">October 2023</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#FDFCF8]"></span>
            </button>
            <button className="bg-[#127475] text-white px-5 py-2.5 rounded-full text-[13.5px] font-bold hover:bg-[#0e5d5e] transition-all shadow-sm">
              Add Expense
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-10">
          <div className="max-w-[1200px] mx-auto space-y-8">
            
            {/* Master Insight Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden">
                <div className="flex items-center gap-2 text-[#127475] mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                  <span className="text-[11px] font-bold uppercase tracking-widest">Master Insight</span>
                </div>
                <h2 className="text-[28px] font-bold text-gray-900 mb-4 leading-tight">You're on track to save ₹12,500 more than last month.</h2>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-8 max-w-[600px]">
                  Excellent progress, {getLastName()} Family! By reducing dining out by 15% and optimizing your utility usage, you're building a stronger safety net. Would you like to allocate this surplus to your 'Europe Trip' goal?
                </p>
                <div className="flex gap-4">
                  <button className="bg-[#127475] text-white px-6 py-3 rounded-full text-[14px] font-bold hover:bg-[#0e5d5e] transition-all shadow-sm">Move to Savings</button>
                  <button className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-[14px] font-bold hover:bg-gray-50 transition-all">Tell me how</button>
                </div>
              </div>

              <div className="bg-[#127475] rounded-[32px] p-8 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">Spending Health</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-[54px] font-bold">84</span>
                    <span className="text-[20px] font-bold text-white/50">/100</span>
                  </div>
                  <p className="text-[13px] text-white/80 leading-relaxed mb-6">
                    Your family's financial wellness score has improved by 4 points since last week.
                  </p>
                  <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              </div>
            </div>

            {/* Three Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Anomaly Alert */}
              <div className="bg-white rounded-[24px] p-6 border-l-4 border-red-500 shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">Anomaly Alert</span>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  Your Electricity bill is <span className="font-bold text-gray-800">40% higher</span> than your 6-month average. We recommend checking for appliance leaks or recent heavy AC usage.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-[14px] font-bold text-red-500 font-mono">₹8,450.00</span>
                  <button className="text-[12px] font-bold text-[#127475] hover:underline">View Breakdown</button>
                </div>
              </div>

              {/* Merchant Pattern */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-teal-50 text-[#127475] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">Merchant Pattern</span>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  Your family spent <span className="font-bold text-gray-800">₹4,200</span> on Swiggy in October. Most orders happen on Friday nights between 8:00 PM and 9:30 PM.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">R</div>
                    <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-bold">A</div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">12 TRANSACTIONS</span>
                </div>
              </div>

              {/* Seasonal Forecast */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-800">Seasonal Forecast</span>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  November usually brings a <span className="font-bold text-gray-800">25% increase</span> in clothing expenses due to the festive season. Plan an extra ₹15,000 in your budget.
                </p>
                <div className="bg-gray-50 px-3 py-2 rounded-xl flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Based on 3 years of family history</span>
                </div>
              </div>
            </div>

            {/* Spending DNA and Chat Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Spending DNA */}
              <div className="col-span-3 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-[18px] font-bold text-gray-900 mb-8">Spending DNA</h3>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#127475] mt-2 shrink-0"></div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-800 mb-1">The Weekend Spender</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        62% of your non-essential spending happens between Friday 6 PM and Sunday midnight. Suggestion: Set a "Weekend Fun" limit of ₹5,000.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-2 shrink-0"></div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-800 mb-1">Subscription Creep</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        You have 3 streaming services that haven't been used in 30 days. Canceling them could save you ₹1,200/month.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-2 shrink-0"></div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-800 mb-1">Grocery Optimizer</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        Buying pantry staples in bulk on the 1st of the month has saved you 8% compared to last year's fragmented shopping.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ask your Coach (Chat) */}
              <div className="col-span-2 bg-[#F1F5F5] rounded-[32px] p-8 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#127475] flex items-center justify-center text-white">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Ask your Coach</h3>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Online & Learning</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-20">
                  <div className="bg-white rounded-2xl rounded-tr-none p-4 shadow-sm ml-auto max-w-[85%]">
                    <p className="text-[12px] text-gray-600 italic">
                      "How much can we spend on our Diwali shopping this year without affecting our daughter's education fund?"
                    </p>
                  </div>
                  <div className="bg-[#127475] text-white rounded-2xl rounded-tl-none p-4 shadow-md mr-auto max-w-[85%]">
                    <p className="text-[12px] leading-relaxed">
                      Based on your current savings rate and upcoming bonuses, you can comfortably spend ₹45,000. This keeps your education fund contribution at 100%.
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-6 left-8 right-8">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type your financial question..." 
                      className="w-full bg-white border-transparent rounded-full py-3.5 pl-6 pr-14 text-[13px] shadow-sm focus:ring-0 outline-none"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#127475] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                  </div>
                </div>

                <button className="absolute bottom-6 right-8 translate-x-1/2 translate-y-full bg-[#0b4d4e] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-20" style={{ transform: 'translate(40%, 40%)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;
