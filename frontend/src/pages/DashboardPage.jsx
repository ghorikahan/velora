import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token && !userData) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const getInitials = () => user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'V';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen bg-[#FDFCF8] font-sans text-gray-800 overflow-hidden" style={{ fontFamily: 'var(--font-heading)' }}>
      <Sidebar user={user} />

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FDFCF8] pt-14 md:pt-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-10 py-4 md:py-5 bg-[#FDFCF8] shrink-0 border-b border-transparent">
          {/* Top Links */}
          <div className="flex items-center gap-10">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Velora / Vault</div>
              <div className="flex gap-8">
                <button className="text-[14px] text-gray-500 font-medium hover:text-gray-900 transition-colors">Portfolio</button>
                <button className="text-[14px] text-gray-500 font-medium hover:text-gray-900 transition-colors">Insights</button>
                <button className="text-[14px] text-[#127475] font-semibold border-b-[2px] border-[#127475] pb-1.5">Vault</button>
              </div>
            </div>
          </div>

          {/* Right Header Items */}
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-gray-700 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#EF4444] rounded-full border border-[#FDFCF8]"></span>
            </button>
            
            <button onClick={handleLogout} title="Logout" className="w-10 h-10 rounded-full bg-[#127475] flex items-center justify-center text-white text-[14px] font-semibold shadow-sm overflow-hidden border-2 border-white cursor-pointer hover:opacity-90 transition-opacity">
              {user?.picture ? (
                <img src={user.picture} alt={user.fullName || 'User Profile'} className="w-full h-full object-cover" />
              ) : (
                getInitials()
              )}
            </button>
          </div>
        </header>

        {/* Scrollable Body Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 pt-6 pb-12">
          <div className="max-w-[1000px] mx-auto">
            
            {/* Title Section */}
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="bg-[#BDE3E0] text-[#127475] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-3">
                  Monthly Overview
                </div>
                <h1 className="text-[38px] font-bold text-gray-900 leading-none">June Budget</h1>
              </div>
              <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-700 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-gray-50 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Jun 1 - Jun 30, 2024
              </button>
            </div>

            {/* Banner Section */}
            <div className="bg-[#0b5353] rounded-3xl p-5 md:p-8 mb-10 flex flex-col md:flex-row text-white relative shadow-sm overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#127475] to-[#0b5353] opacity-50 pointer-events-none"></div>
              
              <div className="flex-1 z-10">
                <p className="text-[13px] text-white/70 mb-2 font-medium">Family Net Flow</p>
                <h2 className="text-[52px] font-bold tracking-tight leading-none mb-10 drop-shadow-sm" style={{fontFamily: 'monospace'}}>₹1,42,000</h2>
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="text-[#32E0C4] text-[14px] leading-none">↑</span> Total Income
                    </p>
                    <p className="text-[22px] font-semibold tracking-wide drop-shadow-sm" style={{fontFamily: 'monospace'}}>₹2,85,000</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="text-[#FCA5A5] text-[14px] leading-none">↓</span> Total Spend
                    </p>
                    <p className="text-[22px] font-semibold tracking-wide drop-shadow-sm" style={{fontFamily: 'monospace'}}>₹1,43,000</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-[340px] bg-white/10 rounded-[24px] p-6 z-10 backdrop-blur-md border border-white/10 flex flex-col justify-between shadow-lg mt-4 md:mt-0">
                <div className="flex justify-between items-start">
                  <span className="text-[14px] font-medium text-white/90">Daily Burn Rate</span>
                  <span className="bg-[#32E0C4] text-[#0b5353] px-3 py-1 rounded-full text-[10px] font-bold tracking-wide">Optimal</span>
                </div>
                <div className="flex items-end gap-2 h-[70px] mt-6 opacity-90">
                  {/* Burn rate simulated bars */}
                  {[35, 45, 40, 55, 45, 75, 30].map((h, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-[4px] ${i === 6 ? 'bg-[#32E0C4]' : 'bg-white/30'}`} 
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Allocation Header */}
            <div className="flex justify-between items-end mb-5">
              <h3 className="text-[20px] font-bold text-gray-900">Category Allocation</h3>
              <button className="text-[13px] font-bold text-[#127475] hover:text-[#0e5d5e] transition-colors flex items-center gap-1">
                View All Categories →
              </button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              
              {/* Card 1: Food & Dining */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E5F5F4] text-[#127475] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#127475] uppercase tracking-widest mt-1.5">On Track</span>
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-1.5">Food & Dining</h4>
                <p className="text-[13px] text-gray-500 mb-8 font-medium">₹8,200 left for groceries</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-gray-900">₹16,800 <span className="text-gray-400 font-medium">spent</span></span>
                    <span className="text-gray-400 font-medium">Limit ₹25,000</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-[#127475] rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 2: Rent & Utilities */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Completed</span>
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-1.5">Rent & Utilities</h4>
                <p className="text-[13px] text-gray-500 mb-8 font-medium">Full payment processed on 5th</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-gray-900">₹45,000 <span className="text-gray-400 font-medium">spent</span></span>
                    <span className="text-gray-400 font-medium">Limit ₹45,000</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-[#127475] rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 3: Medical */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect><path d="M12 11v6"></path><path d="M9 14h6"></path><path d="M16 8V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1.5">Over Budget</span>
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-1.5">Medical</h4>
                <p className="text-[13px] text-gray-500 mb-8 font-medium">₹1,200 over planned limit</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-gray-900">₹13,200 <span className="text-gray-400 font-medium">spent</span></span>
                    <span className="text-gray-400 font-medium">Limit ₹12,000</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 4: Education */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#32E0C4] uppercase tracking-widest mt-1.5">Near Limit</span>
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-1.5">Education</h4>
                <p className="text-[13px] text-gray-500 mb-8 font-medium">₹3,000 left for tuition</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-gray-900">₹27,000 <span className="text-gray-400 font-medium">spent</span></span>
                    <span className="text-gray-400 font-medium">Limit ₹30,000</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 5: Personal & Shop */}
              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E5F5F4] text-[#127475] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#127475] uppercase tracking-widest mt-1.5">Healthy</span>
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-1.5">Personal & Shop</h4>
                <p className="text-[13px] text-gray-500 mb-8 font-medium">₹12,400 remaining this month</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[11px] font-bold mb-2.5">
                    <span className="text-gray-900">₹7,600 <span className="text-gray-400 font-medium">spent</span></span>
                    <span className="text-gray-400 font-medium">Limit ₹20,000</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-[#127475] rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
              </div>

              {/* Card 6: Add New */}
              <button className="border-[2px] border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-[#127475] hover:border-[#127475]/50 hover:bg-[#127475]/5 transition-all h-[210px] cursor-pointer">
                <div className="w-12 h-12 rounded-full border-[1.5px] border-current flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
                <span className="text-[14px] font-semibold">New Budget Category</span>
              </button>

            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Member Activity */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-1.5">Member Activity</h3>
                    <p className="text-[13px] text-gray-500 font-medium">Spending contribution per family member</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-700 p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </div>
                
                <div className="flex flex-col justify-between flex-1 gap-6">
                  {[
                    { name: 'Arjun', role: 'Head', amount: '₹68,400', progress: '65%', color: '#127475', initials: 'A', bg: 'bg-[#ffebd6]' },
                    { name: 'Meera', role: 'Partner', amount: '₹52,100', progress: '50%', color: '#127475', initials: 'M', bg: 'bg-[#ffe4e1]' },
                    { name: 'Rahul', role: 'Kid', amount: '₹22,500', progress: '25%', color: '#127475', initials: 'R', bg: 'bg-[#e0f7fa]' }
                  ].map((member, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div className={`w-11 h-11 rounded-full ${member.bg} text-gray-700 flex items-center justify-center font-bold text-[15px] shrink-0 border border-black/5`}>
                        {member.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-[13px] font-bold mb-2.5">
                          <span className="text-gray-900">{member.name} <span className="text-gray-400 font-medium ml-1">({member.role})</span></span>
                          <span className="text-[#127475] tracking-wide" style={{fontFamily: 'monospace'}}>{member.amount}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: member.progress, backgroundColor: member.color }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Smart Save Alert */}
              <div className="lg:col-span-1 bg-gradient-to-br from-[#E5F5F4] to-[#f2fafa] rounded-3xl p-8 border border-[#BDE3E0]/40 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#BDE3E0]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                
                <div className="w-11 h-11 rounded-full bg-[#127475] text-white flex items-center justify-center mb-6 shadow-md z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>
                </div>
                
                <h3 className="text-[20px] font-bold text-gray-900 mb-3 z-10">Smart Save Alert</h3>
                
                <p className="text-[13.5px] text-gray-600 leading-relaxed mb-8 z-10 font-medium">
                  You've spent <strong className="text-[#127475] font-bold">12% less</strong> on Food than last month. Moving ₹5,000 to your <strong className="text-gray-900 font-bold">Emergency Fund</strong> vault is recommended.
                </p>
                
                <button className="mt-auto w-full bg-[#127475] text-white py-3.5 rounded-2xl text-[14px] font-semibold shadow-[0_4px_14px_rgba(18,116,117,0.3)] hover:bg-[#0e5d5e] hover:shadow-[0_6px_20px_rgba(18,116,117,0.4)] transition-all z-10 cursor-pointer">
                  Execute Transfer
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
