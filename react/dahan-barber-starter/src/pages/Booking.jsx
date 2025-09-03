// =====================================================
// File: src/pages/Booking.jsx (קובץ 2 — ניהול/קביעת תורים)
// =====================================================
import React, { useEffect, useMemo, useState } from "react";

// ---- הגדרות בסיס ----
const STORAGE_KEY = "db_bookings_v1"; // שמירה ב-localStorage
const SLOT_MINUTES = 30;              // משך תור בדקות
// שעות עבודה לדוגמה (א׳–ה׳ 10–20, ו׳ 9–14, שבת סגור)
const HOURS = {
  0: [10, 20], // Sunday
  1: [10, 20],
  2: [10, 20],
  3: [10, 20],
  4: [10, 20],
  5: [9, 14],  // Friday
  6: null      // Saturday closed
};

export default function Booking(){
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [bookings, setBookings] = useState(() => loadBookings());
  const [draft, setDraft] = useState({open:false, dateISO:"", time:"", name:"", phone:""});
  const [message, setMessage] = useState("");

  useEffect(()=>{ saveBookings(bookings); }, [bookings]);

  const days = useMemo(()=> getWeekDays(weekStart), [weekStart]);

  const grid = useMemo(()=>{
    // מפיק מערך של {date, slots:[{time, taken:boolean, by?:{name,phone}}]}
    return days.map(d => {
      const dow = d.getDay();
      const hours = HOURS[dow];
      if(!hours) return { date:d, slots:[] };
      const [startH, endH] = hours;
      const slots = genSlotsForDay(d, startH, endH, SLOT_MINUTES).map(time => {
        const key = slotKey(d, time);
        const b = bookings[key];
        return { time, taken: !!b, by: b };
      });
      return { date:d, slots };
    });
  }, [days, bookings]);

  function clickSlot(day, time, taken){
    if(taken){
      setMessage("המשבצת כבר תפוסה");
      return;
    }
    setDraft({open:true, dateISO: toISODate(day), time, name:"", phone:""});
  }

  function confirmBooking(e){
    e.preventDefault();
    if(!draft.name || !draft.phone) return;
    const k = slotKey(new Date(draft.dateISO), draft.time);
    if(bookings[k]){ setMessage("שגיאה: המשבצת נתפסה בינתיים"); setDraft(s=>({...s, open:false})); return; }
    setBookings(prev => ({
      ...prev,
      [k]: { name: draft.name, phone: draft.phone, createdAt: new Date().toISOString() }
    }));
    setDraft(s=>({...s, open:false}));
    setMessage("התור נשמר בהצלחה ✔");
  }

  function clearMessage(){ setMessage(""); }

  return (
    <section aria-labelledby="book-h">
      <h2 id="book-h" className="h2">ניהול / קביעת תורים</h2>
      <p className="muted">בחרו שבוע, לחצו על משבצת פנויה כדי להזמין. (שמירה בדפדפן זה לצורכי דמו)</p>

      <WeekNav weekStart={weekStart} onPrev={()=>setWeekStart(addDays(weekStart,-7))} onNext={()=>setWeekStart(addDays(weekStart,7))} />

      <div className="card" style={{overflowX:"auto", marginTop:12}}>
        <ScheduleGrid grid={grid} onPick={clickSlot} />
      </div>

      {draft.open && (
        <Modal onClose={()=>setDraft(s=>({...s, open:false}))}>
          <h3 style={{marginTop:0}}>אישור תור</h3>
          <p className="muted">{fmtFullDate(new Date(draft.dateISO))} · {draft.time}</p>
          <form onSubmit={confirmBooking} style={{display:"grid",gap:10,marginTop:10}}>
            <div className="field">
              <label htmlFor="name">שם</label>
              <input id="name" className="input" value={draft.name} onChange={e=>setDraft(s=>({...s,name:e.target.value}))} required />
            </div>
            <div className="field">
              <label htmlFor="phone">טלפון</label>
              <input id="phone" className="input" value={draft.phone} onChange={e=>setDraft(s=>({...s,phone:e.target.value}))} required />
            </div>
            <div className="btns" style={{marginTop:6}}>
              <button className="btn primary" type="submit">שמור תור</button>
              <button type="button" className="btn ghost" onClick={()=>setDraft(s=>({...s, open:false}))}>בטל</button>
            </div>
          </form>
        </Modal>
      )}

      {message && (
        <div className="card" style={{marginTop:12}} onAnimationEnd={clearMessage}>
          {message}
        </div>
      )}

      <div className="muted" style={{marginTop:10,fontSize:13}}>הערה: זהו דמו ללא שרת — הנתונים נשמרים ב־localStorage של הדפדפן.</div>
    </section>
  );
}

// ---- רכיבים מסייעים ----
function WeekNav({weekStart, onPrev, onNext}){
  const end = addDays(weekStart, 6);
  return (
    <div className="card" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <button className="btn ghost" onClick={onPrev}>שבוע קודם</button>
      <div style={{fontWeight:800}}>{fmtRange(weekStart, end)}</div>
      <button className="btn ghost" onClick={onNext}>שבוע הבא</button>
    </div>
  );
}

function ScheduleGrid({grid, onPick}){
  // כותרת הימים
  return (
    <div style={{minWidth:700}}>
      <div style={{display:"grid",gridTemplateColumns:`140px repeat(${grid.length}, 1fr)`,gap:10,alignItems:"start"}}>
        <div></div>
        {grid.map(({date}) => (
          <div key={date.toDateString()} style={{textAlign:"center"}}>
            <div style={{fontWeight:800}}>{fmtDayName(date)}</div>
            <div className="muted" style={{marginTop:2}}>{fmtDate(date)}</div>
          </div>
        ))}

        {/* שורות משבצות */}
        {collectAllTimes(grid).map((time) => (
          <React.Fragment key={time}>
            <div className="muted" style={{textAlign:"center"}}>{time}</div>
            {grid.map(({date, slots}) => {
              const s = slots.find(x=>x.time===time);
              const taken = !!s?.taken;
              return (
                <div key={toISODate(date)+time} style={{padding:4}}>
                  <button
                    className={taken?"btn primary":"btn ghost"}
                    style={{width:"100%"}}
                    onClick={()=>onPick(date, time, taken)}
                    disabled={taken}
                    aria-label={taken?"תפוס":"פנוי"}
                  >{taken?"תפוס":"פנוי"}</button>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Modal({children, onClose}){
  return (
    <div role="dialog" aria-modal className="modal-overlay" onClick={onClose}>
      <div className="card" style={{maxWidth:500,margin:"10vh auto",padding:18}} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
      <style>{`
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.28);display:block;z-index:60}
      `}</style>
    </div>
  );
}

// ---- שירותי תאריכים ונתונים ----
function startOfWeek(date){
  const d = new Date(date); const day = d.getDay(); // 0=Sun
  const diff = day; // sunday-based
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - diff);
  return d;
}
function addDays(date, n){ const d = new Date(date); d.setDate(d.getDate()+n); return d; }
function toISODate(d){ return d.toISOString().slice(0,10); }
function fmtDate(d){ return new Intl.DateTimeFormat('he-IL',{day:'2-digit',month:'2-digit'}).format(d); }
function fmtDayName(d){ return new Intl.DateTimeFormat('he-IL',{weekday:'short'}).format(d); }
function fmtFullDate(d){ return new Intl.DateTimeFormat('he-IL',{weekday:'long', day:'2-digit', month:'long', year:'numeric'}).format(d); }
function fmtRange(a,b){
  const sameMonth = a.getMonth()===b.getMonth() && a.getFullYear()===b.getFullYear();
  const f = (x, opts)=> new Intl.DateTimeFormat('he-IL', opts).format(x);
  return sameMonth
    ? `${f(a,{day:'2-digit'})}–${f(b,{day:'2-digit', month:'long', year:'numeric'})}`
    : `${f(a,{day:'2-digit', month:'short'})} – ${f(b,{day:'2-digit', month:'long', year:'numeric'})}`;
}

function getWeekDays(weekStart){
  return Array.from({length:7}, (_,i)=> addDays(weekStart, i)).filter(d=> d.getDay()!==6); // ללא שבת
}

function genSlotsForDay(date, startH, endH, stepMin){
  const slots=[]; const base=new Date(date); base.setHours(0,0,0,0);
  for(let h=startH; h<endH; h++){
    for(let m=0; m<60; m+=stepMin){
      const t = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      slots.push(t);
    }
  }
  return slots;
}

function slotKey(date, time){ return `${toISODate(date)}_${time}`; }

function loadBookings(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch{ return {}; }
}
function saveBookings(obj){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }catch{}
}
