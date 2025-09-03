// ===========================
// File: src/App.jsx (shell + routing)
// ===========================
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

export default function App(){
  return (
    <BrowserRouter>
      <div dir="rtl" className="app-root">
        <Style/>
        <div className="layout container">
          <TopNav/>
          <main className="main">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/booking" element={<Booking/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="*" element={<Navigate to="/" replace/>} />
            </Routes>
          </main>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

// -------------------- Styles (shared) --------------------
function Style(){
  return (
    <style>{`
      :root{
        --bg:#ffffff;           /* page bg */
        --fg:#0f0f12;           /* text */
        --muted:#6c6d73;        /* secondary text */
        --gold:#c9a449;         /* brand gold */
        --gold-600:#b28f39;     /* darker gold */
        --ring:#e2d4a0;         /* light gold ring */
        --card:#ffffff;         /* card surface */
        --line:#e7e7ea;         /* soft border */
        --shadow:0 6px 20px rgba(0,0,0,.06);
      }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}

      .container{max-width:1250px;margin-inline:auto;padding:0 20px}
      .layout{display:grid;grid-template-columns:1fr;gap:28px;align-items:start}
      @media (max-width:1000px){.layout{grid-template-columns:1fr}}
      .main{padding:28px 0 8px}

      /* Typography */
      .h1{font-size:clamp(32px,6vw,64px);line-height:1.05;font-weight:900;margin:0 0 8px}
      .h1 .brand{color:var(--gold)}
      .subtitle{color:var(--muted);margin-top:6px}
      .h2{font-size:clamp(22px,3.6vw,34px);margin:0 0 12px}

      /* Buttons */
      .btns{display:flex;gap:12px;margin-top:18px;flex-wrap:wrap}
      .btn{display:inline-flex;align-items:center;gap:.6rem;padding:.8rem 1.3rem;border-radius:14px;border:1px solid var(--fg);font-weight:700;text-decoration:none}
      .btn.primary{background:#0f0f12;color:#fff;border-color:#0f0f12}
      .btn.ghost{background:transparent;color:var(--gold);border-color:var(--gold)}
      .btn:hover{filter:brightness(1.05)}

      /* Top navigation buttons */
      .topnav{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px}


      /* Cards grid */
      .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:28px}
      @media (max-width:1100px){.cards{grid-template-columns:repeat(2,1fr)}}
      @media (max-width:620px){.cards{grid-template-columns:1fr}}
      .card{background:var(--card);border:2px solid var(--ring);border-radius:18px;padding:18px;box-shadow:var(--shadow)}
      .card .icon{font-size:34px;color:var(--gold);display:inline-grid;place-items:center;width:46px;height:46px;border-radius:10px;border:1px solid var(--ring)}
      .card h3{margin:10px 0 6px;font-size:20px}
      .card p{color:var(--muted);margin:0}

      /* Generic panel */
      .panel{border:2px solid var(--ring);border-radius:18px;padding:20px;margin-top:26px;min-height:180px;display:grid;place-items:center;color:var(--muted)}

      /* Right sidebar */
      aside{position:sticky;top:14px;align-self:start;border-left:1px solid var(--line)}
      .aside{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:var(--shadow)}
      .brandRow{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
      .brandMark{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;border:2px solid var(--gold);color:var(--gold);font-size:18px}
      .brandName{font-weight:900}
      .menu{margin-top:10px;display:grid;gap:8px}
      .menu a{display:flex;align-items:center;gap:10px;padding:10px;border-radius:12px;text-decoration:none;color:var(--fg);border:1px solid transparent}
      .menu a.active{background:var(--gold);color:#161616}
      .menu a:not(.active){background:#fff;border-color:var(--line)}
      .menu .ico{font-size:18px;width:22px;text-align:center;color:var(--gold-600)}

      footer{border-top:1px solid var(--line);margin-top:24px}
      .footer{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:22px 0;color:#4b4c52}
      @media (max-width:700px){.footer{grid-template-columns:1fr}}
      .muted{color:var(--muted)}
      .field{display:grid;gap:6px}
      .input, textarea{border:1px solid var(--line);border-radius:10px;padding:10px;font:inherit}
    `}</style>
  );
}

// -------------------- Sidebar --------------------
function Aside(){
  return (
    <aside>
      <div className="aside">
        <div className="brandRow">
          <div>
            <div className="brandName">Dahan Barber</div>
            <div style={{color:"var(--muted)",marginTop:2,fontSize:13}}>רועי דהן</div>
          </div>
          <div className="brandMark">✂</div>
        </div>
        <nav className="menu" aria-label="ניווט צדדי">
          <NavLink className={({isActive})=> isActive?"active":""} to="/">
            <span className="ico">🏠</span><span>בית</span>
          </NavLink>
          <NavLink className={({isActive})=> isActive?"active":""} to="/booking">
            <span className="ico">📅</span><span>תורים</span>
          </NavLink>
          <NavLink className={({isActive})=> isActive?"active":""} to="/about">
            <span className="ico">👤</span><span>מי אני</span>
          </NavLink>
          
          <NavLink className={({isActive})=> isActive?"active":""} to="/contact">
            <span className="ico">📞</span><span>צור קשר</span>
          </NavLink>
          <NavLink className={({isActive})=> isActive?"active":""} to="/admin">
            <span className="ico">🛠️</span><span>ניהול</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

// -------------------- TopNav (buttons row) --------------------
function TopNav(){
  return (
    <nav className="topnav" aria-label="ניווט עליון">
      <NavLink className={({isActive})=> isActive?"btn primary":"btn ghost"} to="/">דף הבית</NavLink>
      <NavLink className={({isActive})=> isActive?"btn primary":"btn ghost"} to="/booking">קביעת תורים</NavLink>
      <NavLink className={({isActive})=> isActive?"btn primary":"btn ghost"} to="/about">מי אני</NavLink>
      <NavLink className={({isActive})=> isActive?"btn primary":"btn ghost"} to="/contact">צור קשר</NavLink>
      <NavLink className={({isActive})=> isActive?"btn primary":"btn ghost"} to="/admin">ניהול</NavLink>
    </nav>
  );
}

function Footer(){
  return (
    <footer id="contact">
      <div className="container footer">
        <div>
          <div style={{fontWeight:800}}>Dahan Barber</div>
          <div style={{color:"var(--muted)",marginTop:6}}>רחוב יצחק גרציאני 9, רעננה</div>
        </div>
      </div>
    </footer>
  );
}

// =====================================================
// File: src/pages/Home.jsx  (קובץ 1 — דף הבית)
// =====================================================

function Home(){
  const cards=[
    {icon:"✂️", title:"תספורת מקצועית", text:"תספורת שמתאימה לכם"},
    {icon:"🕒", title:"שירות מהיר", text:"ללא המתנה מיותרת, שירות יעיל ומקצועי"},
    {icon:"⭐", title:"איכות גבוהה", text:"רק החומרים והכלים הטובים ביותר"},
    {icon:"🛡️", title:"ניקיון והיגיינה", text:"חיטוי יסודי של כלים בכל תספורת"},
  ];
  return (
    <section aria-labelledby="hero-h">
      <h1 id="hero-h" className="h1"><span className="brand">Dahan Barber</span></h1>
      <div className="subtitle">רועי דהן</div>

      <section className="cards" aria-label="יתרונות">
        {cards.map((c,i)=> (
          <article key={i} className="card">
            <div className="icon" aria-hidden>{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </article>
        ))}
      </section>

      <section className="panel" style={{minHeight:220,marginTop:26}}>
        אזור תוכן נוסף — גלריה/מפה/באנר שיווקי
      </section>
    </section>
  );
}

// =====================================================
// File: src/pages/Booking.jsx (קובץ 2 — אשף קביעת תורים)
// =====================================================

// ---- קונפיג בסיס ----
const STORAGE_KEY = 'db_bookings_v1'; // שמירה ב-localStorage (דמו ללא שרת)
const SLOT_MINUTES = 30;              // משך תור בדקות (לכל השירותים)
const SERVICES = [
  { id: 'classic', name: 'תספורת קלאסית', price: 80, minutes: 30 },
  { id: 'fade',    name: 'פייד',            price: 120, minutes: 30 },
  { id: 'beard',   name: 'עיצוב זקן',       price: 60, minutes: 30 },
  { id: 'combo',   name: 'תספורת + פנים',   price: 150, minutes: 30 },
];
// שעות פעילות: א׳–ה׳ 16:00–20:00, ו׳/ש׳ סגור
const HOURS = { 0:[16,20], 1:[16,20], 2:[16,20], 3:[16,20], 4:[16,20], 5:null, 6:null };

function Booking(){
  const [bookings, setBookings] = useState(()=> loadBookings());
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState({ service:null, dateISO:null, time:null, name:'', phone:'', editKey:null });
  const [managePhone, setManagePhone] = useState('');

  useEffect(()=>{ saveBookings(bookings); }, [bookings]);

  // ימים לבחירה (שבועיים קדימה, רק ימים עם שעות פעילות)
  const days = useMemo(()=> getNextDays(14).filter(d=> HOURS[d.getDay()]), []);

  const timesForSelectedDay = useMemo(()=>{
    if(!sel.dateISO) return [];
    const d = new Date(sel.dateISO);
    const hours = HOURS[d.getDay()];
    if(!hours) return [];
    return genSlotsForDay(d, hours[0], hours[1], SLOT_MINUTES); // הזמנה אפשרית בכל שעה, ללא חסימה
  }, [sel.dateISO]);

  function next(){ setStep(function(s){ return Math.min(4, s+1); }); }
  function back(){ setStep(function(s){ return Math.max(1, s-1); }); }

  function chooseService(svc){ setSel(function(prev){ return {...prev, service:svc}; }); setStep(2); }
  function chooseDate(dateISO){ setSel(function(prev){ return {...prev, dateISO:dateISO, time:null}; }); setStep(3); }
  function chooseTime(time){ setSel(function(prev){ return {...prev, time:time}; }); setStep(4); }

  function confirm(e){
    e.preventDefault();
    if(!(sel.service && sel.dateISO && sel.time && sel.name && sel.phone)) return;
    const newKey = slotKey(new Date(sel.dateISO), sel.time);
    // אם משנים תור: התייחס לכך שמותר לדרוס את אותה משבצת אם זו אותה הזמנה
    if(bookings[newKey] && newKey !== sel.editKey){ alert('המשבצת נתפסה בינתיים – בחר/י שעה אחרת'); return; }
    const nextMap = { ...bookings };
    if(sel.editKey){
      const prev = bookings[sel.editKey];
      if(!prev || prev.phone !== sel.phone){ alert('אימות טלפון נכשל לשינוי תור'); return; }
      delete nextMap[sel.editKey];
    }
    nextMap[newKey] = { name: sel.name, phone: sel.phone, service: sel.service.id, createdAt: new Date().toISOString() };
    setBookings(nextMap);
    alert(sel.editKey ? 'התור עודכן בהצלחה' : 'התור נשמר בהצלחה ✂');
    setSel({ service:null, dateISO:null, time:null, name:'', phone:'', editKey:null });
    setStep(1);
  }

  // --- ניהול לפי טלפון ---
  const myBookings = useMemo(function(){ return listByPhone(bookings, managePhone); }, [bookings, managePhone]);

  function cancelBooking(key){
    const rec = bookings[key]; if(!rec){ alert('תור לא נמצא'); return; }
    if(!managePhone || rec.phone !== managePhone){ alert('מספר טלפון לא תואם להזמנה'); return; }
    const copy = { ...bookings }; delete copy[key]; setBookings(copy); alert('התור בוטל');
  }
  function startReschedule(key){
    const rec = bookings[key]; if(!rec){ alert('תור לא נמצא'); return; }
    if(!managePhone || rec.phone !== managePhone){ alert('מספר טלפון לא תואם להזמנה'); return; }
    const parts = key.split('_');
    const svc = SERVICES.find(function(s){ return s.id===rec.service; });
    setSel({ service: svc, dateISO: parts[0], time: null, name: rec.name, phone: rec.phone, editKey: key });
    setStep(3);
  }

  return (
    <section aria-labelledby='book-h'>
      <h2 id='book-h' className='h2'>קביעת תורים — אשף</h2>

      <Stepper step={step}/>

      {/* שלב 1: שירות */}
      {step===1 && (
        <div className='card' style={{background:'#111',color:'#eee'}}>
          <h3 style={{marginTop:0,textAlign:'center'}}>בחר שירות</h3>
          <div style={{display:'grid',gap:10}}>
            {SERVICES.map(function(s){ return (
              <button key={s.id} className='card' style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#1a1a1a',color:'#eee',borderColor:'var(--ring)'}} onClick={function(){chooseService(s);}}>
                <div style={{display:'grid',gap:4}}>
                  <strong>{s.name}</strong>
                  <span className='muted'>{s.minutes} דק</span>
                </div>
                <div style={{fontWeight:800}}>₪{s.price}</div>
              </button>
            ); })}
          </div>
        </div>
      )}

      {/* שלב 2: בחירת יום */}
      {step===2 && (
        <div className='cards'>
          {days.map(function(d){
            var iso = toISODate(d);
            var avail = availableCountForDay(d, bookings);
            var disabled = avail===0;
            return (
              <button key={iso} className='card' onClick={function(){ if(!disabled) chooseDate(iso); }} disabled={disabled}>
                <h3 style={{marginTop:0}}>{fmtDayName(d)} · {fmtDate(d)}</h3>
                <p className='muted'>{disabled ? 'אין משבצות פנויות' : 'משבצות פנויות: ' + avail}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* שלב 3: בחירת שעה */}
      {step===3 && (
        <div className='card' style={{padding:12}}>
          <div className='muted' style={{marginBottom:8}}>{fmtFullDate(new Date(sel.dateISO||Date.now()))}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:10}}>
            {timesForSelectedDay.map(function(t){
              var taken = !!bookings[slotKey(new Date(sel.dateISO), t)];
              return (
                <button key={t} className={taken?'btn primary':'btn ghost'} disabled={taken} onClick={function(){chooseTime(t);}}>
                  {t} · {taken?'תפוס':'פנוי'}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* שלב 4: פרטים אישיים ושמירה */}
      {step===4 && (
        <form onSubmit={confirm} className='card' style={{display:'grid',gap:10}}>
          <Summary sel={sel}/>
          <div className='field'>
            <label htmlFor='name'>שם</label>
            <input id='name' className='input' value={sel.name} onChange={function(e){ setSel(function(p){ return {...p, name:e.target.value}; }); }} required/>
          </div>
          <div className='field'>
            <label htmlFor='phone'>טלפון</label>
            <input id='phone' className='input' value={sel.phone} onChange={function(e){ setSel(function(p){ return {...p, phone:e.target.value}; }); }} required/>
          </div>
          <div className='btns' style={{marginTop:6}}>
            <button className='btn primary' type='submit'>{sel.editKey? 'עדכן תור' : 'שמור תור'}</button>
            <button type='button' className='btn ghost' onClick={back}>חזרה</button>
          </div>
        </form>
      )}

      {/* ניהול תורים לפי טלפון */}
      <section className='card' style={{marginTop:14}}>
        <h3 style={{marginTop:0}}>ניהול תורים שלי</h3>
        <div className='field' style={{maxWidth:360}}>
          <label htmlFor='mphone'>הזדהות לפי מספר טלפון</label>
          <input id='mphone' className='input' value={managePhone} onChange={function(e){ setManagePhone(e.target.value); }} placeholder='לדוגמה: 0521234567'/>
        </div>
        {managePhone && (
          <div style={{marginTop:10,display:'grid',gap:8}}>
            {myBookings.length===0 && <div className='muted'>לא נמצאו תורים עבור המספר שהוזן</div>}
            {myBookings.map(function(row){
              return (
                <div key={row.key} className='card' style={{display:'grid',gridTemplateColumns:'1fr auto auto',alignItems:'center',gap:8}}>
                  <div>
                    <strong>{serviceName(row.data.service)}</strong> · {row.dateISO} · {row.time}
                  </div>
                  <button className='btn ghost' onClick={function(){ startReschedule(row.key); }}>שנה</button>
                  <button className='btn primary' onClick={function(){ cancelBooking(row.key); }}>בטל</button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <DevTests/>
    </section>
  );
}

function Stepper(props){
  var labels=['סוג תספורת','בחירת תאריך','בחירת שעה','פרטים'];
  return (
    <div className='card' style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:12}}>
      {labels.map(function(lbl, idx){
        var active = props.step===idx+1;
        return <div key={lbl} style={{textAlign:'center',padding:8,border:'1px solid var(--line)',borderRadius:10,fontWeight:active?800:600,background:active?'var(--gold)':'#fff'}}>{lbl}</div>;
      })}
    </div>
  );
}

function Summary(props){
  var sel = props.sel;
  if(!(sel.service && sel.dateISO && sel.time)) return null;
  return (
    <div className='card' style={{marginBottom:6}}>
      <strong>סיכום:</strong> {sel.service.name} · {fmtFullDate(new Date(sel.dateISO))} · {sel.time}
    </div>
  );
}

// ---- Utilities ----
function two(n){ return (n<10?'0':'') + n; }
function getNextDays(n){ var arr=[]; var d=new Date(); d.setHours(0,0,0,0); for(var i=0;i<n;i++){ var x=new Date(d); x.setDate(d.getDate()+i); arr.push(x);} return arr; }
function genSlotsForDay(date,startH,endH,stepMin){ var out=[]; for(var h=startH;h<endH;h++){ for(var m=0;m<60;m+=stepMin){ var t = two(h)+':'+two(m); out.push(t);} } return out; }
function toISODate(d){ return d.toISOString().slice(0,10); }
function fmtDate(d){ return new Intl.DateTimeFormat('he-IL',{day:'2-digit',month:'2-digit'}).format(d); }
function fmtDayName(d){ return new Intl.DateTimeFormat('he-IL',{weekday:'short'}).format(d); }
function fmtFullDate(d){ return new Intl.DateTimeFormat('he-IL',{weekday:'long', day:'2-digit', month:'long', year:'numeric'}).format(d); }
function slotKey(date, time){ return toISODate(date)+'_'+time; }
function loadBookings(){ try{ var j = localStorage.getItem(STORAGE_KEY); return j?JSON.parse(j):{}; }catch(e){ return {}; } }
function saveBookings(obj){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }catch(e){} }
function availableCountForDay(d, bookings){ var hours=HOURS[d.getDay()]; if(!hours) return 0; var s=hours[0],e=hours[1]; var arr=genSlotsForDay(d,s,e,SLOT_MINUTES); var free=0; for(var i=0;i<arr.length;i++){ if(!bookings[slotKey(d,arr[i])]) free++; } return free; }
function listByPhone(map, phone){ if(!phone) return []; var out=[]; for(var k in map){ if(map[k] && map[k].phone===phone){ var parts=k.split('_'); out.push({ key:k, dateISO:parts[0], time:parts[1], data:map[k] }); } } return out.sort(function(a,b){ return a.key.localeCompare(b.key); }); }
function serviceName(id){ var s = SERVICES.find(function(x){ return x.id===id; }); return s? s.name : id; }

// ---- בדיקות (Test Cases) ----
function DevTests(){
  useEffect(function(){
    // 30 דק׳ בין 16:00–20:00 => 8 משבצות
    var d=new Date('2025-01-05T00:00:00Z'); // יום ראשון
    var arr = genSlotsForDay(d,16,20,30);
    if(!(arr.length===8 && arr[0]==='16:00' && arr[7]==='19:30')){ console.error('genSlotsForDay 16–20 failed'); }

    // זמינות ביום ריק שווה למספר המשבצות
    var freeCount = availableCountForDay(d, {});
    if(freeCount !== 8){ console.error('availableCountForDay failed'); }

    // בדיקת מפתח משבצת
    var iso = toISODate(d); if(!(iso.length===10 && iso.charAt(4)==='-' && iso.charAt(7)==='-')){ console.error('toISODate format failed'); }
  },[]);
  return null;
}

// =====================================================
// File: src/pages/Contact.jsx (קובץ 3 — צור קשר)
// =====================================================

function Contact(){
  return (
    <section aria-labelledby="contact-h">
      <h2 id="contact-h" className="h2">צור קשר</h2>
      <div className="cards">
        <div className="card"><div className="icon">📞</div><h3>טלפון</h3><p><a href="tel:+972526590220">0526590220</a></p></div>
        <div className="card"><div className="icon">💬</div><h3>וואטסאפ</h3><p><a href="https://wa.me/972526590220" target="_blank" rel="noreferrer">שלחו הודעה</a></p></div>
      </div>
    </section>
  );
}
// =====================================================
// File: src/pages/Admin.jsx (קובץ 4 — ניהול / אדמין)
// =====================================================

function Admin(){
  const [email,setEmail] = useState("");
  const [pwd,setPwd] = useState("");
  const login = e => {
    e.preventDefault();
    // TODO: להחליף באימות אמיתי מצד שרת (JWT / Firebase / וכו')
    alert(`(דמו) התחברת כ- ${email}`);
  };
  return (
    <section aria-labelledby="admin-h">
      <h2 id="admin-h" className="h2">ניהול (Admin)</h2>
      <p className="muted">המסך הבא הוא דמו בלבד. נוכל לחבר התחברות מאובטחת + דשבורד ניהול.</p>

      <form onSubmit={login} className="card" style={{maxWidth:520,display:"grid",gap:12}}>
        <div className="field">
          <label htmlFor="email">אימייל</label>
          <input id="email" className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div className="field">
          <label htmlFor="pwd">סיסמה</label>
          <input id="pwd" className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required/>
        </div>
        <button className="btn primary" type="submit">התחברות</button>
      </form>

      <section className="cards" style={{marginTop:22}}>
        <div className="card"><div className="icon">📋</div><h3>ניהול תורים</h3><p>צפייה/אישור/ביטול</p></div>
        <div className="card"><div className="icon">💼</div><h3>שירותים ומחירים</h3><p>עדכון תמחור ורשימת שירותים</p></div>
        <div className="card"><div className="icon">👤</div><h3>לקוחות</h3><p>כרטיסי לקוח והיסטוריה</p></div>
        <div className="card"><div className="icon">⚙️</div><h3>הגדרות</h3><p>שעות פעילות, התראות, צוות</p></div>
      </section>
    </section>
  );
}

// =====================================================
// File: src/pages/About.jsx (דף "מי אני")
// =====================================================

function About(){
  return (
    <section aria-labelledby="about-h">
      <h2 id="about-h" className="h2">מי אני</h2>
      <article className="card" style={{maxWidth:800,lineHeight:1.7}}>
        <h3 style={{marginTop:0}}>רועי דהן</h3>
        <p>אני רועי דהן, עברתי קורס של ירין דרורי.</p>
        <p>המטרה שלי היא פשוטה - לתת לכל לקוח את החוויה הטובה ביותר. אני מאמין שתספורת טובה זה לא רק עניין של טכניקה, אלא גם של הקשבה ורגישות לצרכים של הלקוח.</p>
      </article>
    </section>
  );
}
