// ===========================
// File: src/App.jsx (shell + routing)
// ===========================
import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";

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
      .menu .ico{font-size:18px;width:22px;text-align:center;color:${'var(--gold-600)'}}

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


// -------------------- Footer --------------------
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
