import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

/* ─────────────── Toast Notification Component ─────────────── */
const Toast = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 400);
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#ECFDF5', border: '#10B981', text: '#065F46', icon: '✓' },
    error:   { bg: '#FEF2F2', border: '#EF4444', text: '#991B1B', icon: '✕' },
    warning: { bg: '#FFFBEB', border: '#F59E0B', text: '#92400E', icon: '⚠' },
    info:    { bg: '#EFF6FF', border: '#3B82F6', text: '#1E40AF', icon: 'ℹ' },
  };
  const c = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed', top: '32px', right: '32px', zIndex: 9999,
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      padding: '16px 20px', minWidth: '340px', maxWidth: '440px',
      background: c.bg, border: `1px solid ${c.border}20`,
      borderLeft: `4px solid ${c.border}`,
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.06)',
      animation: isExiting ? 'toastOut 0.4s ease forwards' : 'toastIn 0.5s cubic-bezier(0.16,1,0.3,1)',
      backdropFilter: 'blur(20px)',
    }}>
      <style>{`
        @keyframes toastIn { from { opacity:0; transform:translateX(100px) scale(0.95); } to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes toastOut { from { opacity:1; transform:translateX(0) scale(1); } to { opacity:0; transform:translateX(100px) scale(0.95); } }
        @keyframes progressShrink { from { width:100%; } to { width:0%; } }
      `}</style>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%', background: c.border,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: '13px', fontWeight: '700', flexShrink: 0, marginTop: '1px',
      }}>{c.icon}</div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: c.text, lineHeight: '1.5' }}>{message}</p>
      </div>
      <button onClick={() => { setIsExiting(true); setTimeout(onClose, 400); }} style={{
        background: 'none', border: 'none', cursor: 'pointer', color: c.text,
        opacity: 0.5, fontSize: '18px', padding: '0', lineHeight: 1, flexShrink: 0, marginTop: '-2px',
      }}>×</button>
      <div style={{
        position: 'absolute', bottom: '0', left: '4px', right: '4px', height: '3px',
        borderRadius: '0 0 16px 16px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', background: c.border, borderRadius: '4px',
          animation: 'progressShrink 4.5s linear forwards',
        }} />
      </div>
    </div>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [familySize, setFamilySize] = useState('1 - 2');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const showToast = (message, type = 'error') => {
    setToast({ message, type, key: Date.now() });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.fullName.trim()) {
      showToast('Please enter your full name.', 'warning');
      return;
    }
    if (!formData.email.trim()) {
      showToast('Please enter your email address.', 'warning');
      return;
    }
    if (!formData.password) {
      showToast('Please create a password.', 'warning');
      return;
    }
    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters long.', 'warning');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match. Please check and try again.', 'warning');
      return;
    }
    if (!formData.agreed) {
      showToast('Please agree to the Terms of Service and Privacy Policy.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          familySize,
          agreed: formData.agreed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Save token & user to localStorage
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      showToast('Account created successfully! Redirecting to dashboard...', 'success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      showToast(error.message || 'Signup failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/auth/google/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Google signup failed');
        }

        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        showToast('Google account linked successfully! Redirecting...', 'success');
        setTimeout(() => navigate('/dashboard'), 1500);
      } catch (error) {
        showToast(error.message || 'Google signup failed. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    },
    onError: () => showToast('Google authentication was cancelled or failed.', 'error'),
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDFCF8]" style={{ fontFamily: 'var(--font-heading)' }}>

      {/* Toast Notification */}
      {toast && <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── LEFT PANEL ────────────────────────────── */}
      <div className="hidden md:flex w-[42%] bg-[#127475] p-10 flex-col justify-between relative text-white">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <span className="font-medium text-[20px] tracking-tight">Velora</span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center mb-8 mt-4">
          <h1 className="text-[34px] xl:text-[40px] font-medium leading-[1.2] mb-10 max-w-[420px]">
            Master your family's<br/>financial future together.
          </h1>

          <div className="flex flex-col gap-6">
            {[
              { icon: '↻', title: 'Auto-sync', desc: 'Connected bank accounts update in real-time.' },
              { icon: '✧', title: 'AI insights', desc: 'Smart suggestions to save more every month.' },
              { icon: '👥', title: 'Family budgets', desc: 'Shared visibility for collective goals.' },
              { icon: '✓', title: 'Free for 21 days', desc: 'Experience the full power of Velora.' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-lg text-[#BDE3E0]">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-medium text-[15px] mb-0.5">{f.title}</h3>
                  <p className="text-white/70 text-[13px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-medium text-white/60 uppercase tracking-widest">MONTHLY SPEND</span>
            <span className="text-white/60 leading-none pb-1 tracking-widest">•••</span>
          </div>
          <div className="text-[28px] font-medium mb-2 tracking-wide font-mono">₹42,850.00</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-[#32E0C4] border border-[#32E0C4]/30 px-1.5 py-0.5 rounded">↑ 12%</span>
            <span className="text-[11px] text-white/50">vs last month</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 px-8 lg:px-16 py-8 lg:py-10 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-[440px] w-full mx-auto flex flex-col my-auto">
            
            {/* Progress */}
            <div className="flex justify-end gap-1.5 mb-8">
              <div className="w-8 h-[3px] bg-[#127475] rounded-full"></div>
              <div className="w-8 h-[3px] bg-[#E5E7EB] rounded-full"></div>
              <div className="w-8 h-[3px] bg-[#E5E7EB] rounded-full"></div>
            </div>

            <header className="mb-6">
              <h2 className="text-[22px] font-medium text-[#374151] mb-1">Create your free account</h2>
              <p className="text-[#9CA3AF] text-[13px]">Set up in 2 minutes and start your journey.</p>
            </header>

            <div className="flex gap-4 mb-6">
              <button type="button" onClick={() => googleSignup()} disabled={loading} className="flex-1 py-2.5 border border-[#E5E7EB] rounded-xl bg-white flex items-center justify-center gap-2 text-[13px] font-medium text-[#374151] hover:bg-gray-50 transition-colors disabled:opacity-50">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
              <button type="button" className="flex-1 py-2.5 border border-[#E5E7EB] rounded-xl bg-white flex items-center justify-center gap-2 text-[13px] font-medium text-[#374151] hover:bg-gray-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                Phone signup
              </button>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
              <span className="px-4 text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">OR CONTINUE WITH EMAIL</span>
              <div className="flex-1 h-[1px] bg-[#E5E7EB]"></div>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475]" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475]" />
                </div>
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Mobile</label>
                  <div className="flex">
                    <div className="px-3.5 py-2.5 bg-[#F9FAFB] border border-r-0 border-[#E5E7EB] rounded-l-xl text-[#9CA3AF] text-[13px] font-medium">+91</div>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="9876543210" className="flex-1 w-full px-3.5 py-2.5 rounded-r-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475] tracking-widest" />
                </div>
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475] tracking-widest" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#4B5563] mb-2">Family size</label>
              <div className="flex gap-3 flex-wrap">
                {['1 - 2', '3 - 4', '5 - 6', '6+'].map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFamilySize(size)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                        familySize === size 
                          ? 'border-[1.5px] border-[#127475] text-[#127475] bg-white' 
                          : 'border border-[#E5E7EB] text-[#9CA3AF] bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5 mt-2">
                <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} className="mt-0.5 w-3.5 h-3.5 rounded border-[#E5E7EB] text-[#127475] focus:ring-[#127475]" />
                <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
                  By creating an account, you agree to our <a href="#" className="text-[#127475]">Terms of Service</a> and <a href="#" className="text-[#127475]">Privacy Policy</a>.
                </p>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#127475] text-white py-3.5 rounded-full text-[14px] font-semibold mt-4 hover:bg-[#0e5d5e] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                    Creating Account...
                  </span>
                ) : 'Create Free Account'}
              </button>

              <p className="text-center text-[13.5px] text-[#9CA3AF] mt-5 mb-2">
                Already have an account? <Link to="/login" className="text-[#127475] font-bold hover:underline ml-1">Login →</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-[#E5E7EB] py-5 px-8 lg:px-16 flex justify-between items-center text-[12px] text-[#9CA3AF]">
          <span>© 2026 Velora. Safe & Secure.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#6B7280] transition-colors">Help Center</a>
            <a href="#" className="hover:text-[#6B7280] transition-colors">Contact Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
