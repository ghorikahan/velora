import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const BudgetPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const d = localStorage.getItem('user'), t = localStorage.getItem('token');
    if (!t && !d) { navigate('/login'); return; }
    if (d) setUser(JSON.parse(d));
  }, [navigate]);

  const getLastName = () => {
    if (!user?.fullName) return 'Sharma';
    const p = user.fullName.split(' ');
    return p[p.length - 1];
  };


  const cats = [
    { name: 'Rent', spent: 22000, limit: 22000, status: 'NEAR LIMIT', sc: '#F59E0B' },
    { name: 'Food & Dining', spent: 16450, limit: 15000, status: 'OVER BUDGET', sc: '#EF4444' },
    { name: 'Transport', spent: 3250, limit: 5000, status: 'ON TRACK', sc: '#10B981' },
    { name: 'Groceries', spent: 7300, limit: 9500, status: 'NEAR LIMIT', sc: '#F59E0B' },
    { name: 'Medical', spent: 5400, limit: 4000, status: 'OVER BUDGET', sc: '#EF4444' },
    { name: 'Subscriptions', spent: 1350, limit: 3000, status: 'NEAR LIMIT', sc: '#F59E0B' },
    { name: 'Education', spent: 0, limit: 10000, status: 'NOT STARTED', sc: '#94A3B8' },
  ];

  const members = [
    { name: 'Rajesh Sharma', role: 'Admin', cap: '₹35,690', pct: 81, c: '#127475' },
    { name: 'Priya Sharma', role: 'Member', cap: '₹15,690', pct: 81, c: '#127475' },
    { name: 'Aryan Sharma', role: 'Child', cap: '₹5,003', pct: 69, c: '#127475' },
    { name: 'Dada Ji', role: 'Elderly', cap: '₹18,690', pct: 90, c: '#F59E0B' },
  ];

  const catIcons = {
    'Rent': <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
    'Food & Dining': <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></>,
    'Transport': <><path d="M5 17h14"/><path d="M19 17V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    'Groceries': <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/></>,
    'Medical': <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
    'Subscriptions': <rect x="2" y="4" width="20" height="16" rx="2"/>,
    'Education': <><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></>,
  };

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');
  const statusBg = (s) => s === 'OVER BUDGET' ? 'bg-red-50 text-red-500' : s === 'NEAR LIMIT' ? 'bg-orange-50 text-orange-500' : s === 'ON TRACK' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400';

  return (
    <div className="flex h-screen w-screen bg-[#FAFAF7] overflow-hidden" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Sidebar user={user} />

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden pt-14 md:pt-0">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-8 py-4 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Velora / Budget Planner</div>
              <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Budget Planner</h1>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-[13px] font-semibold text-gray-600">
              <button className="hover:text-[#127475]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg></button>
              <span>October 2025</span>
              <button className="hover:text-[#127475]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></button>
            <button className="relative text-gray-400 hover:text-gray-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"/></button>
            <button className="bg-[#127475] text-white px-4 py-2 rounded-lg text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#0e5d5e] shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Set Budgets
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-5 md:py-6">
          <div className="max-w-[1020px] mx-auto">

            {/* Summary Cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',gap:'16px',marginBottom:'24px'}}>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm" style={{minHeight:'120px'}}>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Total Budget</div>
                <div className="text-[24px] font-extrabold text-gray-900 mb-1">₹65,000</div>
                <div className="text-[11px] text-gray-400">Planned for October</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm relative overflow-hidden" style={{minHeight:'120px'}}>
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-r"/>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Total Spent</div>
                <div className="text-[24px] font-extrabold text-red-600 mb-1">₹52,340</div>
                <div className="text-[11px] text-red-500 font-medium">Critical threshold reached</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm" style={{minHeight:'120px'}}>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Budget Used</div>
                <div className="text-[24px] font-extrabold text-gray-900 mb-3">80%</div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{width:'80%'}}/></div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm" style={{minHeight:'120px'}}>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Over Budget</div>
                <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}><span className="text-[24px] font-extrabold text-red-600">2</span><span className="text-[15px] font-bold text-gray-900">Categories</span></div>
                <div className="text-[11px] text-gray-400">Food & Medical needs attention</div>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-[#127475] rounded-2xl p-5 mb-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"/>
              <div className="flex items-center gap-4 z-10">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className="text-white font-bold text-[15px] mb-0.5">Your Budget is Under Pressure</div>
                  <div className="text-white/75 text-[12px] max-w-[500px] leading-relaxed">We've noticed high medical spending this month. To stay on track, consider reallocating ₹3,500 from the 'Subscriptions' and 'Education' pools which are currently under-utilized.</div>
                </div>
              </div>
              <button className="bg-white text-[#127475] px-5 py-2 rounded-lg text-[12px] font-bold hover:bg-gray-50 z-10 shrink-0 ml-4">View Advice</button>
            </div>

            {/* Budget Health + Spending Pace */}
            <div className="bg-white rounded-2xl border border-gray-100 p-7 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[17px] font-bold text-gray-900">Budget Health</h3>
                <div className="flex gap-2">
                  <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[9px] font-bold">6 ON TRACK</span>
                  <span className="bg-orange-50 text-orange-500 px-2.5 py-0.5 rounded-full text-[9px] font-bold">2 NEAR LIMIT</span>
                </div>
              </div>
              <div className="h-8 rounded-xl overflow-hidden flex mb-8">
                <div className="h-full bg-[#127475]" style={{width:'32%'}}/>
                <div className="h-full bg-[#5CB8B2]" style={{width:'32%'}}/>
                <div className="h-full bg-[#7DD3C8]" style={{width:'12%'}}/>
                <div className="h-full bg-[#FDBA74]" style={{width:'12%'}}/>
                <div className="h-full bg-gray-200" style={{width:'12%'}}/>
              </div>

              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5">Spending Pace</div>
              <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
                {/* Chart */}
                <div style={{width:'180px',height:'140px',background:'#F8FAFA',borderRadius:'16px',border:'1px solid #f0f0f0',padding:'12px',position:'relative',flexShrink:0,display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                  <svg style={{position:'absolute',left:'12px',top:'10px',width:'calc(100% - 24px)',height:'calc(100% - 48px)'}} viewBox="0 0 160 80" preserveAspectRatio="none">
                    <path d="M0 72 Q40 65,80 45 T160 10" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <path d="M0 72 Q40 60,80 35 T160 0" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2"/>
                    <path d="M0 72 Q30 70,60 62 T110 50" fill="none" stroke="#127475" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="110" cy="50" r="3.5" fill="#127475" stroke="white" strokeWidth="2"/>
                  </svg>
                  <div style={{display:'flex',gap:'6px',position:'relative',zIndex:10,marginTop:'auto'}}>
                    <span style={{background:'#ecfdf5',color:'#059669',padding:'2px 6px',borderRadius:'4px',fontSize:'7px',fontWeight:700}}>6 ON TRACK</span>
                    <span style={{background:'#fff7ed',color:'#f97316',padding:'2px 6px',borderRadius:'4px',fontSize:'7px',fontWeight:700}}>2 NEAR LIMIT</span>
                  </div>
                </div>
                {/* Stats */}
                <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontSize:'10px',color:'#9ca3af',fontWeight:500,marginBottom:'2px'}}>Daily Average</div>
                    <div style={{fontSize:'22px',fontWeight:800,color:'#111827'}}>₹2,617</div>
                    <div style={{fontSize:'10px',color:'#9ca3af',fontWeight:500,marginTop:'16px',marginBottom:'2px'}}>Days Left</div>
                    <div style={{fontSize:'22px',fontWeight:800,color:'#111827'}}>5 Days</div>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:'10px',color:'#9ca3af',fontWeight:500,marginBottom:'2px'}}>Projected Total</div>
                    <div style={{fontSize:'26px',fontWeight:800,color:'#111827'}}>₹81,180</div>
                  </div>
                  <div style={{position:'relative',width:'100px',height:'100px'}}>
                    <svg viewBox="0 0 36 36" style={{width:'100%',height:'100%',transform:'rotate(-90deg)'}}>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="3"/>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#127475" strokeWidth="3" strokeLinecap="round" strokeDasharray="80 100"/>
                    </svg>
                    <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                      <span style={{fontSize:'18px',fontWeight:800,color:'#111827'}}>80%</span>
                      <span style={{fontSize:'8px',color:'#9ca3af',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>Utilized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:'16px',marginBottom:'24px'}}>
              {cats.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                    <div style={{width:'36px',height:'36px',borderRadius:'12px',background:'#f9fafb',color:'#127475',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid #f0f0f0'}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{catIcons[c.name]}</svg>
                    </div>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${statusBg(c.status)}`}>{c.status}</span>
                  </div>
                  <div className="text-[15px] font-bold text-gray-900 mb-0.5">{c.name}</div>
                  <div className="text-[12px] text-gray-400 mb-4">{fmt(c.spent)} / {fmt(c.limit)}</div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width: c.spent===0?'0%':Math.min((c.spent/c.limit)*100,100)+'%', backgroundColor: c.sc}}/>
                  </div>
                </div>
              ))}
              <button className="border-2 border-dashed border-gray-200 rounded-2xl transition-all min-h-[140px] cursor-pointer" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#9ca3af'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',border:'1.5px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'8px'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span className="text-[12px] font-semibold">Add Category</span>
              </button>
            </div>

            {/* Member Contribution */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="p-6 pb-4 flex justify-between items-center border-b border-gray-50">
                <h3 className="text-[17px] font-bold text-gray-900">Member Contribution</h3>
                <button className="text-[12px] font-bold text-[#127475] flex items-center gap-1 hover:underline">
                  View Detailed Breakdown
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </button>
              </div>
              <table style={{width:'100%',textAlign:'left',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#f9fafb'}}>
                    <th style={{padding:'12px 24px',fontSize:'9px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.1em',width:'30%'}}>Family Member</th>
                    <th style={{padding:'12px 24px',fontSize:'9px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.1em',width:'15%'}}>Role</th>
                    <th style={{padding:'12px 24px',fontSize:'9px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.1em',width:'20%'}}>Budget Cap</th>
                    <th style={{padding:'12px 24px',fontSize:'9px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.1em',width:'25%'}}>Utilized</th>
                    <th style={{padding:'12px 24px',fontSize:'9px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.1em',width:'10%'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i} style={{borderTop:'1px solid #f5f5f5'}}>
                      <td style={{padding:'16px 24px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                          <div style={{width:'32px',height:'32px',borderRadius:'50%',overflow:'hidden',border:'1px solid #f0f0f0',flexShrink:0}}>
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name.split(' ')[0]}`} alt="" style={{width:'100%',height:'100%'}}/>
                          </div>
                          <span style={{fontSize:'13px',fontWeight:700,color:'#111827'}}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{padding:'16px 24px',fontSize:'12px',color:'#6b7280'}}>{m.role}</td>
                      <td style={{padding:'16px 24px',fontSize:'13px',fontWeight:700,color:'#111827'}}>{m.cap}</td>
                      <td style={{padding:'16px 24px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'12px',width:'160px'}}>
                          <div style={{flex:1,height:'6px',background:'#f3f4f6',borderRadius:'999px',overflow:'hidden'}}><div style={{height:'100%',borderRadius:'999px',width:m.pct+'%',backgroundColor:m.c}}/></div>
                          <span style={{fontSize:'11px',fontWeight:700,color:'#374151',width:'28px'}}>{m.pct}%</span>
                        </div>
                      </td>
                      <td style={{padding:'16px 24px',color:'#9ca3af',fontSize:'14px',letterSpacing:'0.1em',fontWeight:700}}>---</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Insight */}
            <div className="flex items-start gap-3 bg-[#F0FAF9] p-4 rounded-xl border border-[#BDE3E0]/30 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#127475" strokeWidth="2.5" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <p className="text-[12px] text-gray-600"><strong className="text-[#127475]">Insight:</strong> Aryan has used 20% less of his budget compared to last month. Consider moving his surplus to Dada's medical pool to cover the deficit.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
