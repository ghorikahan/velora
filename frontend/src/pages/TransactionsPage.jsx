import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const TransactionsPage = () => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen bg-[#FDFCF8] font-sans text-gray-800 overflow-hidden">
      <Sidebar user={user} />

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FAFAFA]">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-8 py-4 bg-white shrink-0 border-b border-gray-100">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Velora / Transactions</div>
              <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-tight">Transactions</h1>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 text-[#127475] font-semibold text-[14px]">
              <button className="hover:text-gray-900">←</button>
              <span>October 2025</span>
              <button className="hover:text-gray-900">→</button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-700 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-[#127475] text-white px-4 py-2 rounded-full text-[13px] font-bold hover:bg-[#0e5d5e] transition-all shadow-sm flex items-center gap-1.5">
              <span className="text-[16px]">+</span> Add
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-6 md:pt-8 pb-12">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Monthly Total Spend */}
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Monthly Total Spend</p>
                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-bold text-red-500">- ₹84,250.00</span>
                </div>
              </div>

              {/* Total Income */}
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Total Income</p>
                <div className="flex items-center gap-2">
                  <span className="text-[28px] font-bold text-[#127475]">+ ₹1,45,000.00</span>
                </div>
              </div>

              {/* Family Saving Rate */}
              <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Family Saving Rate</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[28px] font-bold text-gray-900">41.8%</span>
                  <span className="text-[#127475] text-[13px] font-bold flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    +2.4%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-[#127475] rounded-full" style={{ width: '41.8%' }}></div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                <div className="md:col-span-1">
                  <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Search</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Merchant or Category" className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-[13.5px] outline-none focus:bg-white focus:border-[#127475]/30" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-[13.5px] outline-none appearance-none cursor-pointer focus:bg-white">
                    <option>All Categories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Family Member</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-[13.5px] outline-none appearance-none cursor-pointer focus:bg-white">
                    <option>Everyone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Date Range</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <input type="text" value="Oct 1 - Oct 31, 2025" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-[13.5px] outline-none cursor-pointer" />
                  </div>
                </div>

                <button className="bg-gray-100 text-gray-600 font-bold py-2.5 px-6 rounded-xl text-[13.5px] hover:bg-gray-200 transition-colors">
                  Clear
                </button>
              </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden">
              {/* Today */}
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <h3 className="text-[14px] font-bold text-gray-600">Today, Oct 24</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {/* Swiggy */}
                <div className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px]">Swiggy</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-bold uppercase">Food & Dining</span>
                        <span className="text-gray-400 text-[12px]">• 1:45 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-8 h-8 rounded-full border border-gray-100" />
                    <span className="text-[16px] font-bold text-red-500">- ₹850.00</span>
                  </div>
                </div>

                {/* HPCL */}
                <div className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"></path><circle cx="7" cy="13" r="3"></circle><circle cx="17" cy="13" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px]">HPCL Petrol Pump</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-bold uppercase">Transportation</span>
                        <span className="text-gray-400 text-[12px]">• 9:15 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" alt="User" className="w-8 h-8 rounded-full border border-gray-100" />
                    <span className="text-[16px] font-bold text-red-500">- ₹2,000.00</span>
                  </div>
                </div>
              </div>

              {/* Yesterday */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-b border-gray-100">
                <h3 className="text-[14px] font-bold text-gray-600">Yesterday, Oct 23</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {/* Salary */}
                <div className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-[#127475] flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px]">TechCorp Inc. Salary</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-bold uppercase">Income</span>
                        <span className="text-gray-400 text-[12px]">• 10:00 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" alt="User" className="w-8 h-8 rounded-full border border-gray-100" />
                    <div className="text-right">
                       <span className="text-[16px] font-bold text-[#127475]">+ ₹1,45,000.00</span>
                    </div>
                  </div>
                </div>

                {/* Myntra */}
                <div className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px]">Myntra</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px] font-bold uppercase">Shopping</span>
                        <span className="text-gray-400 text-[12px]">• 4:30 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Meera" alt="User" className="w-8 h-8 rounded-full border border-gray-100" />
                    <span className="text-[16px] font-bold text-red-500">- ₹3,499.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Load More */}
            <div className="mt-8 flex justify-center">
              <button className="bg-white border border-gray-200 text-gray-600 font-bold px-8 py-3 rounded-xl text-[14px] hover:bg-gray-50 transition-colors shadow-sm">
                Load More
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
