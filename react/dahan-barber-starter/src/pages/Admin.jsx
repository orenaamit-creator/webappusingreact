// =====================================================
// File: src/pages/Admin.jsx (קובץ 4 — ניהול / אדמין)
// =====================================================
import React, { useState } from "react";

export default function Admin(){
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
