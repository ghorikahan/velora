import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const FamilyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMonth, setActiveMonth] = useState('January');
  useEffect(() => {
    const d = localStorage.getItem('user'), t = localStorage.getItem('token');
    if (!t && !d) { navigate('/login'); return; }
    if (d) setUser(JSON.parse(d));
  }, [navigate]);


  const months = ['January', 'February', 'March'];

  return (
    <div style={{display:'flex',height:'100vh',width:'100vw',background:'#FAFAF7',overflow:'hidden',fontFamily:"'Inter','Segoe UI',sans-serif"}}>
      <Sidebar user={user} />

      {/* Main */}
      <div style={{flex:1,display:'flex',flexDirection:'column',height:'100%',overflow:'hidden',paddingTop:'56px'}} className="md:pt-0">
        {/* Header */}
        <header style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'12px',padding:'12px 16px',background:'#fff',borderBottom:'1px solid #f0f0f0',flexShrink:0}} className="md:px-8">
          <div style={{display:'flex',alignItems:'center',gap:'32px'}}>
            <div>
              <div style={{fontSize:'10px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'4px'}}>Velora / Family Council</div>
              <h1 style={{fontSize:'22px',fontWeight:800,color:'#111827',margin:0}}>Family Council</h1>
            </div>
            <div style={{display:'flex',gap:'4px'}}>
              {months.map(m => (
                <button key={m} onClick={() => setActiveMonth(m)}
                  style={{padding:'6px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:600,border:'none',cursor:'pointer',
                    background: activeMonth === m ? 'transparent' : 'transparent',
                    color: activeMonth === m ? '#127475' : '#9ca3af',
                    borderBottom: activeMonth === m ? '2px solid #127475' : '2px solid transparent'
                  }}>{m}</button>
              ))}
            </div>
          </div>
          <button style={{background:'#127475',color:'#fff',padding:'10px 20px',borderRadius:'10px',fontSize:'13px',fontWeight:700,border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Expense
          </button>
        </header>

        {/* Content */}
        <div style={{flex:1,overflowY:'auto',padding:'16px 16px 40px'}} className="md:px-8">
          <div style={{maxWidth:'960px',margin:'0 auto'}}>

            {/* Top Row: Shared Wallet + Spending Score */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',marginBottom:'24px'}}>
              {/* Shared Wallet */}
              <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #f0f0f0',padding:'28px 32px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',right:'24px',top:'24px',opacity:0.06}}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#127475" stroke="none"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/></svg>
                </div>
                <div style={{fontSize:'10px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:'8px'}}>Shared Wallet View</div>
                <div style={{fontSize:'32px',fontWeight:800,color:'#111827',marginBottom:'16px'}}>₹4,52,000.00</div>
                <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
                  <div style={{background:'#F0FAF9',borderRadius:'20px',padding:'6px 14px',display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',fontWeight:600,color:'#127475'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#127475" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                    This Month Income
                    <span style={{fontWeight:800}}>₹1,85,000</span>
                  </div>
                  <div style={{background:'#FEF2F2',borderRadius:'20px',padding:'6px 14px',display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',fontWeight:600,color:'#EF4444'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/></svg>
                    Shared Expenses
                    <span style={{fontWeight:800}}>₹72,400</span>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    {['Rajesh','Sunita','Arjun'].map((name,i) => (
                      <div key={i} style={{width:'32px',height:'32px',borderRadius:'50%',overflow:'hidden',border:'2px solid #fff',marginLeft: i>0?'-10px':'0',position:'relative',zIndex:3-i}}>
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="" style={{width:'100%',height:'100%'}}/>
                      </div>
                    ))}
                    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#f3f4f6',border:'2px solid #fff',marginLeft:'-10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:700,color:'#6b7280'}}>+1</div>
                  </div>
                  <button style={{background:'none',border:'none',color:'#127475',fontSize:'13px',fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:'4px'}}>
                    Manage Permissions
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>

              {/* Spending Score */}
              <div style={{background:'linear-gradient(135deg,#0f3d3e,#127475)',borderRadius:'16px',padding:'28px',color:'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'16px',opacity:0.9}}>Family Spending Score</div>
                <div style={{position:'relative',width:'110px',height:'110px',marginBottom:'16px'}}>
                  <svg viewBox="0 0 36 36" style={{width:'100%',height:'100%',transform:'rotate(-90deg)'}}>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" strokeDasharray="82 100"/>
                  </svg>
                  <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <span style={{fontSize:'28px',fontWeight:800,color:'#fff'}}>82</span>
                    <span style={{fontSize:'8px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#2DD4BF'}}>Excellent</span>
                  </div>
                </div>
                <div style={{fontSize:'12px',fontWeight:600,marginBottom:'8px',opacity:0.85}}>Tips for +5 Points:</div>
                <div style={{background:'rgba(255,255,255,0.1)',borderRadius:'10px',padding:'10px 14px',fontSize:'11px',lineHeight:1.5,display:'flex',alignItems:'flex-start',gap:'6px',maxWidth:'200px'}}>
                  <span style={{color:'#2DD4BF',marginTop:'1px'}}>✓</span>
                  Consolidate 3 streaming services to family plans.
                </div>
              </div>
            </div>

            {/* Middle Row: Individual Savings + Approvals */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',marginBottom:'24px'}}>
              {/* Individual Savings */}
              <div>
                <h3 style={{fontSize:'18px',fontWeight:700,color:'#111827',marginBottom:'16px'}}>Individual Savings</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                  {[
                    { name: 'Sunita (Mom)', sub: 'Emergency Fund', amt: '₹85,400.00', color: '#127475' },
                    { name: 'Arjun (Son)', sub: 'College Fund', amt: '₹12,200.00', color: '#3B82F6' },
                    { name: 'Ishani (Daughter)', sub: 'Savings Goal', amt: '₹4,500.00', color: '#8B5CF6' },
                  ].map((p, i) => (
                    <div key={i} style={{background:'#fff',borderRadius:'14px',border:'1px solid #f0f0f0',padding:'20px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
                        <div style={{width:'28px',height:'28px',borderRadius:'50%',overflow:'hidden',border:'1px solid #e5e7eb'}}>
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name.split(' ')[0]}`} alt="" style={{width:'100%',height:'100%'}}/>
                        </div>
                        <div>
                          <div style={{fontSize:'13px',fontWeight:700,color:'#111827'}}>{p.name}</div>
                          <div style={{fontSize:'10px',color:'#9ca3af'}}>{p.sub}</div>
                        </div>
                      </div>
                      <div style={{fontSize:'18px',fontWeight:800,color:'#111827',marginBottom:'8px'}}>{p.amt}</div>
                      <div style={{height:'4px',background:'#f3f4f6',borderRadius:'999px',overflow:'hidden'}}>
                        <div style={{height:'100%',borderRadius:'999px',width: i===0?'70%':i===1?'40%':'20%',backgroundColor:p.color}}/>
                      </div>
                    </div>
                  ))}
                  {/* Add Member */}
                  <button style={{background:'#F0FAF9',borderRadius:'14px',border:'2px dashed #BDE3E0',padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',minHeight:'120px',color:'#127475'}}>
                    <div style={{width:'36px',height:'36px',borderRadius:'50%',border:'2px solid #BDE3E0',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'8px'}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                    <span style={{fontSize:'12px',fontWeight:600}}>Add Member</span>
                  </button>
                </div>
              </div>

              {/* Approvals */}
              <div>
                <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #f0f0f0',padding:'24px',height:'100%'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#127475" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                      <h3 style={{fontSize:'17px',fontWeight:700,color:'#111827',margin:0}}>Approvals</h3>
                    </div>
                    <span style={{background:'#FEF2F2',color:'#EF4444',fontSize:'9px',fontWeight:700,padding:'4px 10px',borderRadius:'20px',textTransform:'uppercase'}}>2 Pending</span>
                  </div>

                  {/* Approval 1 */}
                  <div style={{background:'#FAFAF7',borderRadius:'12px',padding:'16px',marginBottom:'12px'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',overflow:'hidden',border:'1px solid #e5e7eb',flexShrink:0,marginTop:'2px'}}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="" style={{width:'100%',height:'100%'}}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:'13px',fontWeight:700,color:'#111827',marginBottom:'2px'}}>Arjun requested ₹1,200</div>
                        <div style={{fontSize:'11px',color:'#9ca3af',marginBottom:'10px'}}>"New physics textbook & stationery"</div>
                        <div style={{display:'flex',gap:'8px'}}>
                          <button style={{background:'#127475',color:'#fff',border:'none',borderRadius:'6px',padding:'5px 14px',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>Approve</button>
                          <button style={{background:'#fff',color:'#374151',border:'1px solid #e5e7eb',borderRadius:'6px',padding:'5px 14px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>Reject</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Approval 2 */}
                  <div style={{background:'#FAFAF7',borderRadius:'12px',padding:'16px',marginBottom:'16px'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',overflow:'hidden',border:'1px solid #e5e7eb',flexShrink:0,marginTop:'2px'}}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ishani" alt="" style={{width:'100%',height:'100%'}}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:'13px',fontWeight:700,color:'#111827',marginBottom:'2px'}}>Ishani requested ₹450</div>
                        <div style={{fontSize:'11px',color:'#9ca3af',marginBottom:'10px'}}>"Ice cream treat for friends"</div>
                        <div style={{display:'flex',gap:'8px'}}>
                          <button style={{background:'#127475',color:'#fff',border:'none',borderRadius:'6px',padding:'5px 14px',fontSize:'11px',fontWeight:700,cursor:'pointer'}}>Approve</button>
                          <button style={{background:'#fff',color:'#374151',border:'1px solid #e5e7eb',borderRadius:'6px',padding:'5px 14px',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>Reject</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button style={{background:'none',border:'none',color:'#127475',fontSize:'12px',fontWeight:600,cursor:'pointer',width:'100%',textAlign:'right'}}>View History</button>
                </div>
              </div>
            </div>

            {/* Contribution Tracker */}
            <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #f0f0f0',padding:'28px 32px',marginBottom:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px'}}>
                <div>
                  <h3 style={{fontSize:'18px',fontWeight:700,color:'#111827',margin:'0 0 4px'}}>Contribution Tracker</h3>
                  <div style={{fontSize:'12px',color:'#9ca3af'}}>Shared household utility split for January</div>
                </div>
                <button style={{background:'none',border:'none',color:'#127475',fontSize:'12px',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:'4px'}}>
                  Settlement Report
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
              </div>

              <div style={{marginTop:'24px',marginBottom:'12px'}}>
                {[
                  { name: 'Rajesh', pct: 65, amt: '₹45,000 paid', color: '#127475' },
                  { name: 'Sunita', pct: 35, amt: '₹27,400 paid', color: '#2DD4BF' },
                ].map((p, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'16px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',width:'100px'}}>
                      <div style={{width:'24px',height:'24px',borderRadius:'50%',overflow:'hidden'}}>
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} alt="" style={{width:'100%',height:'100%'}}/>
                      </div>
                      <span style={{fontSize:'13px',fontWeight:600,color:'#111827'}}>{p.name}</span>
                    </div>
                    <div style={{flex:1,height:'10px',background:'#f3f4f6',borderRadius:'999px',overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:'999px',width:p.pct+'%',backgroundColor:p.color}}/>
                    </div>
                    <span style={{fontSize:'11px',color:'#9ca3af',width:'90px',textAlign:'right'}}>{p.amt}</span>
                    <span style={{fontSize:'12px',fontWeight:700,color:'#127475',width:'35px'}}>{p.pct}%</span>
                  </div>
                ))}
              </div>

              <div style={{borderTop:'1px solid #f3f4f6',paddingTop:'20px',display:'flex',gap:'40px'}}>
                {[
                  { icon: '⚡', label: 'Electricity', amt: '₹4,200.00' },
                  { icon: '🏠', label: 'Rent/Mtnc', amt: '₹42,000.00' },
                  { icon: '📶', label: 'Internet', amt: '₹1,500.00' },
                ].map((u, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#F0FAF9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px'}}>{u.icon}</div>
                    <div>
                      <div style={{fontSize:'9px',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.08em'}}>{u.label}</div>
                      <div style={{fontSize:'14px',fontWeight:700,color:'#111827'}}>{u.amt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{textAlign:'center',padding:'24px 0',borderTop:'1px solid #f0f0f0'}}>
              <div style={{display:'flex',justifyContent:'center',gap:'24px',marginBottom:'8px'}}>
                {['Privacy Policy','Terms','Help Center','Security'].map((l,i) => (
                  <span key={i} style={{fontSize:'11px',color:'#9ca3af',cursor:'pointer'}}>{l}</span>
                ))}
              </div>
              <div style={{fontSize:'11px',color:'#d1d5db'}}>© 2024 Velora • Secured by Wise Guardian Systems</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyPage;
