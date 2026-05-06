import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SEO from '../components/SEO';
import dashboardPreview from '../assets/dashboard_preview.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goToSignup = () => navigate('/signup');
  const goToLogin = () => navigate('/login');

  // ── Pricing data ──────────────────────────────────────────────
  const plans = [
    {
      name: 'Individual',
      monthly: { price: '₹0', period: '/21 days', annual: null },
      yearly: { price: '₹0', period: '/21 days', annual: null, savings: null },
      features: ['1 Member Account', 'Basic UPI Tracking', 'Goal tracking (2)'],
      cta: 'Get Started', variant: 'outline', popular: false,
    },
    {
      name: 'Family',
      monthly: { price: '₹199', period: '/month', annual: null },
      yearly: { price: '₹1,908', period: '/year', monthly: '₹159/month', savings: 'Save ₹480/year' },
      features: ['Up to 5 Family Members', 'Advanced UPI & Bank Sync', 'AI Coaching Insights', 'Family Budget Council'],
      cta: 'Start 30 Day Free Trial', variant: 'primary', popular: true,
    },
    {
      name: 'Premium',
      monthly: { price: '₹399', period: '/month', annual: null },
      yearly: { price: '₹3,828', period: '/year', monthly: '₹319/month', savings: 'Save ₹960/year' },
      features: ['Unlimited Members', 'Tax Helper & Reports', 'Annual Wealth Analysis', 'Priority Support'],
      cta: 'Explore Sales', variant: 'outline', popular: false,
    },
  ];

  const generations = [
    { role: 'Grandparents', icon: '👴', desc: 'Easy voice commands and large fonts for tracking pension.' },
    { role: 'Parents', icon: '👩‍💼', desc: 'Manage household expenses and shared budget council.' },
    { role: 'Young Adults', icon: '👨‍🎓', desc: 'Net worth tracking and smart credit card usage insights.' },
    { role: 'Students', icon: '🎒', desc: 'Pocket money management and simple colorful UI.' },
  ];

  return (
    <div className="landing-page">
      <SEO 
        title="Home" 
        description="Finally — One Place For Every Rupee Your Family Spends. Automated UPI tracking and family budget sharing." 
      />

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="container flex items-center justify-between">
          <div className="logo flex items-center" style={{ gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: '36px', height: '36px', background: '#127475', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(18, 116, 117, 0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32E0C4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: '24px', color: '#127475', letterSpacing: '-0.5px' }}>Velora</span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-links flex">
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
          </div>

          {/* Desktop nav actions */}
          <div className="nav-actions flex" style={{ gap: '12px' }}>
            <Button variant="text" sx={{ color: '#127475', fontWeight: 600 }} onClick={goToLogin}>Login</Button>
            <Button variant="contained" sx={{ bgcolor: '#127475', borderRadius: '12px', px: 3, py: 1 }} onClick={goToSignup}>Sign Up</Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            className="nav-actions-mobile"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#127475" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '15px', padding: '8px 0' }}>Features</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '15px', padding: '8px 0' }}>How it Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '15px', padding: '8px 0' }}>Pricing</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '15px', padding: '8px 0' }}>Blog</a>
            <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
              <button onClick={goToLogin} style={{ flex: 1, padding: '10px', border: '1px solid #127475', background: 'transparent', color: '#127475', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>Login</button>
              <button onClick={goToSignup} style={{ flex: 1, padding: '10px', background: '#127475', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container flex items-center" style={{ gap: '60px', flexWrap: 'wrap' }}>
          <div className="hero-content">
            <div className="badge">FINALLY ONE FOR THE WHOLE HOME</div>
            <h1 className="hero-title">Finally — One Place For Every Rupee Your Family Spends</h1>
            <p className="hero-subtitle">
              Automated UPI tracking, family budget sharing, and AI-powered savings goals.
              Built for the modern Indian household to grow your wealth together.
            </p>
            <div className="flex" style={{ gap: '16px', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={goToSignup}
                sx={{ 
                  bgcolor: '#127475', 
                  py: 2, 
                  px: 4, 
                  borderRadius: '16px', 
                  fontSize: '16px',
                  fontWeight: 700,
                  boxShadow: '0 10px 30px rgba(18, 116, 117, 0.3)',
                  '&:hover': { bgcolor: '#0f5e5f' }
                }}
              >
                Start Free Now
              </Button>
              <button className="btn btn-outline" style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Watch How It Works
              </button>
            </div>
          </div>
          <div className="hero-image-container" style={{ minWidth: '280px' }}>
            <img src={dashboardPreview} alt="Dashboard Preview" className="hero-image" />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────── */}
      <div className="trust-bar" style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6, fontSize: '13px', fontWeight: 600, flexWrap: 'wrap', gap: '12px' }}>
          {[
            { icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>, label: 'AES-256 SECURED' },
            { icon: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>, label: 'IOS / ANDROID / WEB' },
            { icon: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />, label: 'BUILT FOR INDIA' },
            { icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>, label: '4G+ INDIAN SAVERS' },
          ].map((item, i) => (
            <div key={i} className="flex items-center" style={{ gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── SOUND FAMILIAR ─────────────────────────────────────── */}
      <section id="features" className="section-padding text-center">
        <div className="container">
          <h2 style={{ fontSize: '40px', marginBottom: '12px' }}>Sound Familiar?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '60px' }}>Managing money shouldn't feel like a part-time job.</p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: '💸', title: 'Money Disappears', desc: "Where did that ₹21,300 go by the 20th? Single UPI apps add up but they're hard to track manually." },
              { icon: '📱', title: '10 Apps, Zero Clarity', desc: "Checking three bank apps, two credit cards, and your spouse's statements just to know your net worth." },
              { icon: '🕵️', title: 'Family Spending Invisible', desc: '"Beta, how much did we blow on Zomato this month?" Stop asking, start seeing.' },
            ].map((c, i) => (
              <div key={i} className="card text-center">
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{c.icon}</div>
                <h3 style={{ marginBottom: '12px' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section id="how" className="section-padding" style={{ background: '#fff' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '40px', marginBottom: '60px' }}>Simple as 1 — 2 — 3</h2>
          <div className="flex justify-between items-start" style={{ position: 'relative', flexWrap: 'wrap', gap: '40px' }}>
            {[
              { n: '1', title: 'Setup Profile', desc: 'Add your family members and set roles like "Contributor" or "Viewer".' },
              { n: '2', title: 'Sync Accounts', desc: 'Connect bank accounts and UPI apps for automatic transaction fetch.' },
              { n: '3', title: 'Get Insights', desc: 'Watch your net worth grow as AI categorizes every single paisa automatically.' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, zIndex: 2 }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontWeight: 700 }}>{s.n}</div>
                <h3 style={{ marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '200px', margin: '0 auto' }}>{s.desc}</p>
              </div>
            ))}
            <div style={{ position: 'absolute', top: '24px', left: '15%', right: '15%', height: '2px', borderTop: '2px dashed var(--border)', zIndex: 1 }} />
          </div>
        </div>
      </section>

      {/* ── BENTO FEATURES (DASHBOARD PREVIEW) ───────────────────── */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <div className="badge">DASHBOARD PREVIEW</div>
            <h2 style={{ fontSize: '40px' }}>See How Smarter Families Save</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* AI Spending Coach */}
            <div className="card" style={{ gridRow: 'span 1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--primary)', color: 'white', border: 'none' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px' }}>🤖</span>
                  <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>AI SPENDING COACH</span>
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>"You spent ₹4,200 on Swiggy this month — 3 fewer orders saves ₹900"</h3>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', fontSize: '14px' }}>
                Velora detects patterns in your UPI spends and nudges you in plain language. No finance jargon.
              </div>
            </div>

            {/* Family Council */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px' }}>👨‍👩‍👧‍👦</span>
                  <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'var(--primary)' }}>FAMILY COUNCIL</span>
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>One Shared View for the Whole Household</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Approve children's pocket money, track shared groceries, and help parents manage retirement funds in one secure place.</p>
              </div>
              <div style={{ flex: 1, background: 'var(--bg-hero)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Amit (Self)', spend: '₹22,400', color: 'var(--primary)' },
                  { name: 'Sunita (Wife)', spend: '₹18,200', color: 'var(--accent)' },
                  { name: 'Grandpa', spend: '₹8,500', color: '#6366F1' }
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.color }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, flex: 1 }}>{m.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{m.spend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Graveyard */}
            <div className="card" style={{ background: '#0B1120', color: 'white', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>⚰️</span>
                <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'var(--accent)' }}>SUBSCRIPTION GRAVEYARD</span>
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Stop paying for what you don't use</h3>
              <p style={{ color: 'var(--dark-text-secondary)', fontSize: '14px' }}>"Hotstar — unused for 23 days. You're wasting ₹299/mo."</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                <div style={{ padding: '4px 12px', background: 'rgba(248, 113, 113, 0.2)', color: '#F87171', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>UNSUBSCRIBE</div>
                <div style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '20px', fontSize: '12px' }}>KEEP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GENERATIONS ────────────────────────────────────────── */}
      <section className="section-padding text-center">
        <div className="container">
          <h2 style={{ fontSize: '40px', marginBottom: '60px' }}>Designed for Every Generation</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px' }}>
            {generations.map((g, i) => (
              <div key={i} className="text-center">
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-light)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>{g.icon}</div>
                <h4 style={{ marginBottom: '8px' }}>{g.role}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--primary)', color: 'white' }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginBottom: '60px' }}>
            {[
              { quote: "Finally, I don't need to ask my husband for every bank OTP. Loans are on our monthly dashboard. It's life-changing.", author: '— Priya S., Mumbai' },
              { quote: "The AI coach actually stopped me from a ₹2,400 purchase to ensure my holiday goal stays on track. It's actually a friend.", author: '— Rahul M., Bengaluru' },
              { quote: "Setting up my parents on this was so easy. Now I can help them manage their retirement funds remotely with Velora.", author: '— Anjali M., Delhi' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '16px' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>★★★★★</div>
                <p style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '20px' }}>"{t.quote}"</p>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{t.author}</div>
              </div>
            ))}
          </div>
          <div className="grid text-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '24px' }}>
            {[
              { num: '₹400Cr+', label: 'VOLUME TRACKED' },
              { num: '1.2M+', label: 'FAMILIES IN INDIA' },
              { num: '4.9/5', label: 'APP STORE RATING' },
              { num: '100%', label: 'DATA PRIVACY' },
            ].map((s, i) => (
              <div key={i}>
                <div className="stat-number" style={{ fontSize: '32px' }}>{s.num}</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section id="pricing" className="section-padding text-center">
        <div className="container">
          <h2 style={{ fontSize: '40px' }}>The Right Plan for Your Family</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', marginBottom: '32px', fontSize: '16px' }}>
            Start free, upgrade when your family is ready.
          </p>

          {/* Toggle */}
          <div className="pricing-toggle">
            <button className={`toggle-btn ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>
              Monthly
            </button>
            <button className={`toggle-btn ${billing === 'yearly' ? 'active' : ''}`} onClick={() => setBilling('yearly')}>
              Yearly
              <span style={{
                marginLeft: '6px',
                background: billing === 'yearly' ? 'var(--primary)' : 'var(--accent-light)',
                color: billing === 'yearly' ? 'white' : 'var(--primary)',
                fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '20px',
              }}>SAVE 20%</span>
            </button>
          </div>

          {/* Cards */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left', marginTop: '32px' }}>
            {plans.map((plan) => {
              const cur = billing === 'yearly' ? plan.yearly : plan.monthly;
              return (
                <div key={plan.name} className="card" style={{
                  border: plan.popular ? '2px solid var(--primary)' : undefined,
                  transform: plan.popular ? 'scale(1.05)' : undefined,
                  zIndex: plan.popular ? 10 : undefined,
                  transition: 'transform 0.2s',
                }}>
                  {plan.popular && (
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <h3 style={{ marginBottom: '8px' }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                    <span className="stat-number" style={{ fontSize: '32px' }}>{cur.price}</span>
                    <span style={{ fontSize: '14px', opacity: 0.6 }}>{cur.period}</span>
                  </div>
                  <div style={{ minHeight: '44px', marginBottom: '16px' }}>
                    {billing === 'yearly' && cur.monthly && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Equivalent to <strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{cur.monthly}</strong>
                        </span>
                        <span style={{ display: 'inline-block', background: 'var(--accent-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', width: 'fit-content' }}>
                          🎉 {cur.savings}
                        </span>
                      </div>
                    )}
                  </div>
                  <ul style={{ listStyle: 'none', marginBottom: '32px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                  </ul>
                  <button
                    className={`btn ${plan.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ width: '100%' }}
                    onClick={goToSignup}
                  >
                    {billing === 'yearly' && cur.savings && plan.variant === 'primary' ? 'Start Yearly Free Trial' : plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        {/* Yearly upsell */}
        <div style={{ background: 'var(--primary)', color: 'white', padding: '60px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '16px' }}>
                💰 SAVE 20% — YEARLY PLANS
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '12px' }}>Switch to Yearly &amp; Save More</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '480px' }}>
                Get 2 months free when you switch to an annual plan. Family plan drops to just <strong style={{ color: 'white' }}>₹159/mo</strong> and Premium to <strong style={{ color: 'white' }}>₹319/mo</strong>.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { label: 'FAMILY — YEARLY', price: '₹1,908', monthly: '₹159/mo', save: 'Save ₹480/year', bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.2)' },
                  { label: 'PREMIUM — YEARLY', price: '₹3,828', monthly: '₹319/mo', save: 'Save ₹960/year', bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.15)' },
                ].map((c, i) => (
                  <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '20px 24px', textAlign: 'center', minWidth: '160px' }}>
                    <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '6px', fontWeight: 700, letterSpacing: '0.06em' }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 700 }}>{c.price}<span style={{ fontSize: '13px', opacity: 0.7 }}>/yr</span></div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 2px' }}>Equivalent to <strong style={{ color: 'white' }}>{c.monthly}</strong></div>
                    <div style={{ fontSize: '12px', color: '#2DD4BF', fontWeight: 700 }}>{c.save}</div>
                  </div>
                ))}
              </div>
              <button onClick={goToSignup} style={{ background: 'white', color: 'var(--primary)', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer', transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Get Yearly Plan →
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="section-padding" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
          <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px' }}>
            <div>
              <div className="logo flex items-center" style={{ gap: '10px', marginBottom: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                <div style={{ width: '28px', height: '28px', background: '#127475', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#32E0C4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                </div>
                <span style={{ fontWeight: 800, fontSize: '20px', color: '#127475', letterSpacing: '-0.5px' }}>Velora</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '240px' }}>Know where every rupee goes. Designed for Indian families across generations.</p>
            </div>
            {[
              { title: 'Platform', items: ['Features', 'Security', 'Pricing'] },
              { title: 'Company', items: ['About Us', 'Careers', 'Contact'] },
              { title: 'Legal', items: ['Privacy Policy', 'Terms of Service', 'Security Policy'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ marginBottom: '20px', fontSize: '14px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                  {col.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
            <div>
              <h4 style={{ marginBottom: '20px', fontSize: '14px' }}>Follow</h4>
              <div className="flex" style={{ gap: '16px' }}>
                {['X', 'L', 'I'].map((s, i) => (
                  <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="container" style={{ borderTop: '1px solid var(--border)', marginTop: '48px', paddingTop: '24px', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
            © 2026 Velora Finance (Antigravity). All rights reserved. Made with ❤️ in India.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
