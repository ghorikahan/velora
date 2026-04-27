import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'

  // ── Google Auth Logic ────────────────────────────────────────
  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:5000/api/auth/google', {
        token: tokenResponse.access_token
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => alert('Google Login Failed'),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginMethod !== 'email') {
      alert("Only Email login is implemented for now.");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      alert(`Login failed: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#fdfbf7] flex flex-col font-sans">
      
      {/* Top Logo - Fixed at top */}
      <div className="flex-none pt-8 pb-2 flex justify-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-[#13766b]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <span className="text-[#13766b] text-[20px] font-medium tracking-tight">Velora</span>
        </div>
      </div>

      {/* Main Content - Takes up remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-0">
        
        {/* Main Card */}
        <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden flex flex-col">
          <div className="p-6 pb-7">
            <div className="text-center mb-5">
              <h1 className="text-[20px] font-semibold text-gray-800 mb-1">Welcome back</h1>
              <p className="text-[13px] text-gray-500">Login to your family dashboard</p>
            </div>

            {/* Toggle Email / Mobile OTP */}
            <div className="flex p-1 bg-gray-50 rounded-xl mb-5 border border-gray-100">
              <button 
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-1.5 text-[13px] font-medium rounded-lg transition-all cursor-pointer ${
                  loginMethod === 'email' 
                    ? 'bg-white text-[#13766b] shadow-sm border border-gray-100/50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Email
              </button>
              <button 
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 py-1.5 text-[13px] font-medium rounded-lg transition-all cursor-pointer ${
                  loginMethod === 'otp' 
                    ? 'bg-white text-[#13766b] shadow-sm border border-gray-100/50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mobile OTP
              </button>
            </div>

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-3.5">
                <label className="block text-[11px] font-medium text-gray-600 mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@family.com" 
                  required
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#13766b] focus:ring-1 focus:ring-[#13766b] transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-medium text-[#13766b] hover:underline cursor-pointer">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] focus:outline-none focus:border-[#13766b] focus:ring-1 focus:ring-[#13766b] transition-all placeholder:text-gray-400 tracking-widest"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 mb-5">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#13766b] focus:ring-[#13766b] accent-[#13766b] cursor-pointer"
                />
                <label htmlFor="remember" className="text-[12px] text-gray-600 select-none cursor-pointer">
                  Remember me on this device
                </label>
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#13766b] hover:bg-[#106259] text-white py-2.5 rounded-xl font-medium text-[13px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm cursor-pointer"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Google Auth Divider & Button */}
            <div className="flex items-center gap-3 mt-5 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <button 
              type="button" 
              onClick={() => loginWithGoogle()}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl font-medium text-[13px] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Bottom Link */}
          <div className="bg-gray-50/80 p-3.5 text-center border-t border-gray-100">
            <Link to="/signup" className="text-[12px] font-medium text-[#13766b] hover:underline flex items-center justify-center gap-1 cursor-pointer">
              New to Velora? Create free account 
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>

      </div>

      {/* Footer / Trust Badges - Fixed at bottom */}
      <div className="flex-none pb-6 px-4">
        {/* Horizontal Trust Badges */}
        <div className="flex justify-center gap-6 sm:gap-10 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#edf4f3] flex items-center justify-center text-[#13766b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Secure 256-Bit</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#edf4f3] flex items-center justify-center text-[#13766b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Made In India</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#edf4f3] flex items-center justify-center text-[#13766b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9l-9 10 2-10H4l9-10z"></path></svg>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Instant Access</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[11px] text-gray-400 font-medium">
            © 2026 Velora. Secure family financial management.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
