import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const getLastName = () => {
    if (!user?.fullName) return 'kahan';
    const p = user.fullName.split(' ');
    return p.length > 1 ? p[p.length - 1] : p[0];
  };

  const getInitials = () => user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'Gk';

  const navItems = [
    { name: 'Dashboard', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>, path: '/dashboard' },
    { name: 'Transactions', icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>, path: '/transactions' },
    { name: 'Family', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>, path: '/family' },
    { name: 'Budget', icon: <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>, path: '/budget' },
    { name: 'Goals', icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>, path: '/goals' },
    { name: 'Subscriptions', icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></>, path: '/subscriptions' },
    { name: 'AI Coach', icon: <><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></>, path: '/aicoach' },
    { name: 'Reports', icon: <><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></>, path: '/reports' },
    { name: 'Settings', icon: <circle cx="12" cy="12" r="3"></circle>, path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const SidebarContent = () => (
    <aside className="w-[240px] max-w-[80vw] bg-white border-r border-gray-100 flex flex-col pt-6 pb-4 px-3 shrink-0 h-full overflow-hidden">
      {/* Brand Logo */}
      <div className="px-3 mb-6 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[#127475] rounded-lg flex items-center justify-center text-white shadow-[0_4px_10px_rgba(18,116,117,0.15)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <span className="text-[20px] font-black text-[#127475] tracking-tight">Velora</span>
      </div>

      {/* User Profile Card */}
      <div className="bg-[#F8F9FA] rounded-[20px] p-3 flex items-center gap-2.5 mb-6 relative group cursor-pointer border border-gray-50/50">
        <div className="w-10 h-10 rounded-xl bg-[#127475] flex items-center justify-center text-white font-bold text-base overflow-hidden shrink-0">
          {user?.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover" /> : getInitials()}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[13px] font-bold text-gray-900 leading-tight truncate">{getLastName()} Family</h2>
          <span className="text-[11px] text-gray-400 font-medium">4 members</span>
        </div>
        <div className="text-gray-400 shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-auto flex-1 px-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-[14px] text-[13.5px] font-semibold transition-all ${
                isActive
                  ? 'bg-[#127475] text-white shadow-[0_4px_12px_rgba(18,116,117,0.2)]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                {item.icon}
              </svg>
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Premium Plan Banner */}
      <div className="mt-6 px-1">
        <div style={{
          background: 'linear-gradient(180deg, #0b5353 0%, #127475 100%)',
          borderRadius: '18px',
          padding: '16px 14px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>Velora Premium</div>
          <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '14px', fontWeight: 500 }}>Unlock advanced insights.</div>
          <button style={{
            width: '100%',
            background: '#fff',
            color: '#127475',
            border: 'none',
            borderRadius: '10px',
            padding: '8px',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer'
          }}>
            Upgrade
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-4 px-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12px] font-bold text-red-500 border border-red-50 hover:bg-red-50 transition-all cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout Session
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR (md+) ── */}
      <div className="hidden md:flex h-full">
        <SidebarContent />
      </div>

      {/* ── MOBILE HAMBURGER BUTTON ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 w-9 h-9 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-100 text-gray-700"
        aria-label="Open navigation"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* ── MOBILE OVERLAY BACKDROP ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE SLIDE-IN SIDEBAR ── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: 'min(240px, 80vw)' }}
      >
        <div className="relative h-full">
          <SidebarContent />
          {/* Close button — positioned inside the drawer so it stays on screen at 320px */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-3 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
