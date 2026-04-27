import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const SignupPage = () => {
  const navigate = useNavigate();
  const [familySize, setFamilySize] = useState('1 - 2');

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    onError: errorResponse => console.error(errorResponse),
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDFCF8]" style={{ fontFamily: 'var(--font-heading)' }}>
      {/* ── LEFT PANEL ────────────────────────────── */}
      <div className="w-[42%] bg-[#127475] p-10 flex flex-col justify-between relative text-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 rounded-[3px] border-[2px] border-[#127475]"></div>
          </div>
          <span className="font-medium text-lg tracking-tight">FamilyFinance</span>
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
              { icon: '✓', title: 'Free forever', desc: 'Core features will always be accessible.' },
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
              <button type="button" onClick={() => googleLogin()} className="flex-1 py-2.5 border border-[#E5E7EB] rounded-xl bg-white flex items-center justify-center gap-2 text-[13px] font-medium text-[#374151] hover:bg-gray-50 transition-colors">
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

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Full Name</label>
                <input type="text" placeholder="Enter your full name" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475]" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Email</label>
                  <input type="email" placeholder="name@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475]" />
                </div>
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Mobile</label>
                  <div className="flex">
                    <div className="px-3.5 py-2.5 bg-[#F9FAFB] border border-r-0 border-[#E5E7EB] rounded-l-xl text-[#9CA3AF] text-[13px] font-medium">+91</div>
                    <input type="tel" placeholder="9876543210" className="flex-1 w-full px-3.5 py-2.5 rounded-r-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475] tracking-widest" />
                </div>
                <div className="flex-1">
                  <label className="block text-[12px] font-medium text-[#4B5563] mb-1">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] outline-none text-[13px] text-[#374151] placeholder-[#9CA3AF] focus:border-[#127475] tracking-widest" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#4B5563] mb-2">Family size</label>
                <div className="flex gap-3">
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
                <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded border-[#E5E7EB] text-[#127475] focus:ring-[#127475]" />
                <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
                  By creating an account, you agree to our <a href="#" className="text-[#127475]">Terms of Service</a> and <a href="#" className="text-[#127475]">Privacy Policy</a>.
                </p>
              </div>

              <button type="button" className="w-full bg-[#127475] text-white py-3.5 rounded-full text-[14px] font-semibold mt-4 hover:bg-[#0e5d5e] transition-colors shadow-sm">
                Create Free Account
              </button>

              <p className="text-center text-[13.5px] text-[#9CA3AF] mt-5 mb-2">
                Already have an account? <Link to="/login" className="text-[#127475] font-bold hover:underline ml-1">Login →</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-[#E5E7EB] py-5 px-8 lg:px-16 flex justify-between items-center text-[12px] text-[#9CA3AF]">
          <span>© 2024 FamilyFinance. Safe & Secure.</span>
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
