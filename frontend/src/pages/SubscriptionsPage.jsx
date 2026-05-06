import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const subscriptions = [
  { id:1, name:'Disney+ Hotstar', plan:'Premium Annual Plan', price:'₹1,499/yr', logo:'https://img.icons8.com/color/480/hotstar.png', iconBg:'#000000', status:'BURIED', statusColor:'#EF4444', usage:'Not used in 47 days', usageIcon:'⚠', usageColor:'#EF4444', action:'CANCEL' },
  { id:2, name:'Netflix', plan:'Premium 4K Family', price:'₹649/mo', logo:'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png', iconBg:'#000000', status:'ACTIVE', statusColor:'#10B981', usage:'Last used: 2 hours ago', usageIcon:'✓✓', usageColor:'#6B7280', action:'MANAGE' },
  { id:3, name:'Spotify Family', plan:'6 Accounts Premium', price:'₹199/mo', logo:'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', iconBg:'#000000', status:'ACTIVE', statusColor:'#10B981', usage:'Last used: Yesterday', usageIcon:'✓✓', usageColor:'#6B7280', action:'MANAGE' },
  { id:4, name:'Canva Pro', plan:'Individual Designer Plan', price:'₹499/mo', logo:'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/canva-icon.png', iconBg:'#000000', status:'BURIED', statusColor:'#EF4444', usage:'Not used in 92 days', usageIcon:'⚠', usageColor:'#EF4444', action:'CANCEL' },
  { id:5, name:'Apple One', plan:'Family Bundle (Music, iCloud, Arcade)', price:'₹365/mo', logo:'https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg', iconBg:'#000000', status:'ACTIVE', statusColor:'#10B981', usage:'Last used: 12 mins ago', usageIcon:'✓✓', usageColor:'#6B7280', action:'MANAGE' },
];

const SubscriptionsPage = () => {
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

  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };

  return (
    <div className="flex h-screen w-screen bg-[#FDFCF8] font-sans text-gray-800 overflow-hidden" style={{fontFamily:'var(--font-heading)'}}>
      <Sidebar user={user} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FDFCF8] pt-14 md:pt-0">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-10 py-4 md:py-5 shrink-0">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Velora / Subscriptions</div>
            <h1 className="text-[24px] font-bold text-[#127475] leading-tight">Subscription Graveyard</h1>
            <p className="text-[13px] text-gray-500 font-medium mt-1">Identifying the silent leaks in your family wealth.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-gray-700 transition-colors p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#FDFCF8]"/>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#127475] flex items-center justify-center text-white text-[14px] font-semibold overflow-hidden border-2 border-white shadow-sm">
              {user?.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover"/> : getInitials()}
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 pt-2 pb-12">
          <div className="max-w-[1100px] mx-auto">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {/* Total Annual Leakage */}
              <div className="bg-gradient-to-br from-[#0b5353] to-[#127475] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"/>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-3">Total Annual Leakage</p>
                <h2 className="text-[38px] font-bold tracking-tight leading-none mb-4" style={{fontFamily:'monospace'}}>₹42,850</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[12px] text-white/70 font-medium">Monthly Average</span>
                  <span className="text-[14px] font-bold" style={{fontFamily:'monospace'}}>₹3,578</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full w-full mb-4 overflow-hidden">
                  <div className="h-full bg-[#32E0C4] rounded-full" style={{width:'65%'}}/>
                </div>
                <p className="text-[12px] text-white/80 leading-relaxed">You could save <strong className="text-[#32E0C4]">₹12,400</strong> by canceling unused "Buried" services.</p>
              </div>

              {/* Action Required */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </div>
                  <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">Action Required</span>
                </div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-2">4 Buried</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">Subscriptions haven't been touched in over 30 days.</p>
              </div>

              {/* One-Tap Exit */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
                <div className="w-10 h-10 rounded-full bg-[#E5F5F4] text-[#127475] flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">One-Tap Exit</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">Velora can auto-generate cancellation emails for you.</p>
              </div>
            </div>

            {/* All Subscriptions Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-gray-900">All Subscriptions</h3>
              <div className="flex items-center gap-3">
                <button className="text-[12px] font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors">Filter: Active</button>
                <button className="text-[12px] font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors">Sort: Highest Cost</button>
              </div>
            </div>

            {/* Subscription Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {subscriptions.map(sub => (
                <div key={sub.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_16px_rgb(0,0,0,0.02)] flex flex-col">
                  {/* Top row: icon + status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-[18px] shrink-0 overflow-hidden shadow-sm" style={{backgroundColor: sub.iconBg}}>
                      {sub.logo ? (
                        <img src={sub.logo} alt={sub.name} className="w-7 h-7 object-contain" />
                      ) : sub.icon || (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 4-3 4-6s-2-4-4-4c-1.5 0-2.5 1-4 1s-2.5-1-4-1c-2 0-4 1-4 4s1 6 4 6c1.25 0 2.5-1.06 4-1.06z"/><path d="M12 2a4 4 0 0 0-2 7"/></svg>
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{color: sub.statusColor, backgroundColor: sub.statusColor+'15'}}>
                      {sub.status === 'BURIED' && '⚠ '}{sub.status}
                    </span>
                  </div>

                  {/* Name & Plan */}
                  <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">{sub.name}</h4>
                  <p className="text-[12px] text-gray-500 font-medium mb-3">{sub.plan}</p>

                  {/* Usage info */}
                  <p className="text-[12px] font-medium mb-5 flex items-center gap-1.5" style={{color: sub.usageColor}}>
                    {sub.status === 'BURIED' ? (
                      <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></>
                    ) : (
                      <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></>
                    )}
                    {sub.usage}
                  </p>

                  {/* Bottom: Price + Action */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <span className="text-[14px] font-bold text-gray-900" style={{fontFamily:'monospace'}}>{sub.price}</span>
                    <button className={`text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-lg border transition-colors ${
                      sub.action === 'CANCEL' 
                        ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'border-[#127475]/30 text-[#127475] bg-[#E5F5F4] hover:bg-[#d0ebe9]'
                    }`}>
                      {sub.action}
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Subscription Card */}
              <button className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-400 hover:text-[#127475] hover:border-[#127475]/40 hover:bg-[#127475]/5 transition-all cursor-pointer min-h-[200px]">
                <div className="w-12 h-12 rounded-full border-[1.5px] border-current flex items-center justify-center mb-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span className="text-[14px] font-bold mb-1">Add Subscription</span>
                <span className="text-[12px] text-gray-400 text-center">Scan emails or statements</span>
              </button>
            </div>

            {/* Bottom Banner - Smart One-Tap Cancellation */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold mb-0.5">Smart One-Tap Cancellation</h4>
                  <p className="text-[13px] text-white/70">We've identified 3 services with complex cancellation flows. Let our AI assistant handle the logout for you.</p>
                </div>
              </div>
              <button className="bg-[#127475] text-white px-6 py-3 rounded-xl text-[13px] font-semibold hover:bg-[#0e5d5e] transition-colors shadow-lg whitespace-nowrap shrink-0 ml-6">
                Enable Auto-Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
