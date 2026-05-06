import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const goals = [
  { id:1, name:'Goa Family Trip', date:'Dec 2024', icon:'✈️', saved:34000, target:50000, monthly:5000, status:'On Track', statusColor:'#127475', barColor:'#127475' },
  { id:2, name:'New Laptop (Aryan)', date:'Aug 2024', icon:'💻', saved:20000, target:50000, monthly:8000, status:'Behind', statusColor:'#EF4444', barColor:'#EF4444' },
  { id:3, name:'Emergency Fund', date:'Ongoing', icon:'🛡️', saved:85000, target:100000, monthly:5000, status:'On Track', statusColor:'#127475', barColor:'#127475' },
  { id:4, name:'Home Renovation', date:'Oct 2024', icon:'🏠', saved:32000, target:125000, monthly:15000, status:'Urgent', statusColor:'#EF4444', barColor:'#EF4444' },
  { id:5, name:'New Phone (Priya)', date:'Completed Mar 2024', icon:'📱', saved:45000, target:45000, monthly:0, status:'Goal Reached!', statusColor:'#10B981', barColor:'#10B981' },
];

const GoalsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('All Goals');
  const [sortBy, setSortBy] = useState('Progress');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token && !userData) { navigate('/login'); return; }
    if (userData) setUser(JSON.parse(userData));
  }, [navigate]);

  const getLastName = () => { if (!user?.fullName) return 'User'; const p = user.fullName.split(' '); return p.length > 1 ? p[p.length-1] : p[0]; };
  const getInitials = () => user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  const totalSaved = goals.reduce((s,g) => s+g.saved, 0);
  const totalTarget = goals.reduce((s,g) => s+g.target, 0);
  const overallPct = Math.round((totalSaved/totalTarget)*100);
  const activeGoals = goals.filter(g => g.status !== 'Goal Reached!');

  const filtered = filter === 'All Goals' ? goals
    : filter === 'On Track' ? goals.filter(g => g.status === 'On Track')
    : filter === 'Needs Attention' ? goals.filter(g => ['Behind','Urgent'].includes(g.status))
    : goals.filter(g => g.status === 'Goal Reached!');

  const fmt = n => n >= 100000 ? `₹${(n/100000).toFixed(n%100000?1:0)}L` : `₹${n.toLocaleString('en-IN')}`;

  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };

  const filters = ['All Goals','On Track','Needs Attention','Completed'];

  return (
    <div className="flex h-screen w-screen bg-[#FDFCF8] font-sans text-gray-800 overflow-hidden" style={{fontFamily:'var(--font-heading)'}}>
      <Sidebar user={user} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FDFCF8] pt-14 md:pt-0">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-10 py-4 md:py-5 shrink-0 border-b border-gray-100/60">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Velora / Savings Goals</div>
            <h1 className="text-[32px] font-bold text-gray-900 leading-tight">Savings Goals</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search goals..." className="pl-9 pr-4 py-2.5 text-[13px] border border-gray-200 rounded-xl bg-white w-[200px] focus:outline-none focus:ring-2 focus:ring-[#127475]/20 focus:border-[#127475]/40 transition-all"/>
            </div>
            <button className="relative text-gray-400 hover:text-gray-700 transition-colors p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#FDFCF8]"/>
            </button>
            <button className="bg-[#127475] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#0e5d5e] transition-all shadow-sm flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Goal
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 pt-6 md:pt-8 pb-12">
          <div className="max-w-[1100px] mx-auto">

            {/* AI Coach Insight */}
            <div className="bg-gradient-to-r from-[#0b5353] to-[#127475] rounded-2xl p-6 mb-8 flex items-start gap-4 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"/>
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
              </div>
              <div className="z-10">
                <h3 className="text-[15px] font-bold mb-1">AI Coach Insight</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Great job! You are on track for 3 out of your {activeGoals.length} active goals. Consider shifting ₹2,000 from your discretionary budget to the 'New Laptop' fund to stay on target.</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E5F5F4] text-[#127475] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Saved</span>
                </div>
                <p className="text-[28px] font-bold text-gray-900" style={{fontFamily:'monospace'}}>₹{totalSaved.toLocaleString('en-IN')}</p>
                <p className="text-[12px] text-[#127475] font-semibold mt-1 flex items-center gap-1">
                  <span>↗</span> +₹12,500 this month
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#F59E0B] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Target</span>
                </div>
                <p className="text-[28px] font-bold text-gray-900" style={{fontFamily:'monospace'}}>₹{totalTarget.toLocaleString('en-IN')}</p>
                <p className="text-[12px] text-gray-500 font-medium mt-1">Across {activeGoals.length} active goals</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E5F5F4] text-[#127475] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Overall Progress</span>
                </div>
                <div className="flex items-end gap-3">
                  <p className="text-[28px] font-bold text-gray-900" style={{fontFamily:'monospace'}}>{overallPct}%</p>
                  <span className="text-[12px] font-semibold text-[#127475] mb-1.5 bg-[#E5F5F4] px-2.5 py-0.5 rounded-full">On Track</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#127475] to-[#32E0C4] rounded-full transition-all duration-700" style={{width:`${overallPct}%`}}/>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 flex-wrap">
                {filters.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${filter===f ? 'bg-[#127475] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 text-[13px] font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 transition-colors">
                Sort by: {sortBy}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>

            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {filtered.map(g => {
                const pct = Math.round((g.saved/g.target)*100);
                const isComplete = g.status === 'Goal Reached!';
                return (
                  <div key={g.id} className={`bg-white rounded-2xl p-6 border shadow-[0_2px_16px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group ${isComplete ? 'border-[#10B981]/30 bg-gradient-to-br from-white to-[#f0fdf4]' : 'border-gray-100'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#F8F9FA] flex items-center justify-center text-xl border border-gray-100 group-hover:scale-110 transition-transform">{g.icon}</div>
                        <div>
                          <h3 className="text-[15px] font-bold text-gray-900 leading-tight">{g.name}</h3>
                          <p className="text-[11px] text-gray-400 font-medium mt-0.5">{g.date}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{color: g.statusColor, backgroundColor: g.statusColor+'15'}}>{g.status}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[22px] font-bold text-gray-900" style={{fontFamily:'monospace'}}>{fmt(g.saved)}</span>
                      <span className="text-[12px] text-gray-400 font-medium">of {fmt(g.target)}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`, backgroundColor: g.barColor}}/>
                      </div>
                      <span className="text-[11px] font-bold text-gray-500">{pct}%</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/80">
                      <span className="text-[12px] text-gray-500 font-medium">
                        {isComplete ? '✓ Completed' : g.status==='Behind'||g.status==='Urgent' ? `₹${g.monthly.toLocaleString('en-IN')} / mo needed` : `₹${g.monthly.toLocaleString('en-IN')} / mo`}
                      </span>
                      <button className="text-[12px] font-semibold text-[#127475] hover:text-[#0e5d5e] transition-colors flex items-center gap-1">
                        {isComplete ? (
                          <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> View Details</>
                        ) : (
                          <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Create New Goal Card */}
              <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-[#127475] hover:border-[#127475]/40 hover:bg-[#127475]/5 transition-all cursor-pointer min-h-[220px] group">
                <div className="w-14 h-14 rounded-2xl border-2 border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span className="text-[15px] font-bold mb-1">Create New Goal</span>
                <span className="text-[12px] text-gray-400 text-center leading-relaxed">Set a new target for family<br/>savings, education, or big purchases.</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Add Button */}
        <button className="fixed bottom-8 right-8 md:left-[290px] md:right-auto bg-[#127475] text-white px-6 py-3.5 rounded-2xl text-[14px] font-semibold shadow-[0_8px_30px_rgba(18,116,117,0.4)] hover:shadow-[0_12px_40px_rgba(18,116,117,0.5)] hover:bg-[#0e5d5e] transition-all flex items-center gap-2 z-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Goal
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;
