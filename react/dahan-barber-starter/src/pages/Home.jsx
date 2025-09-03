// =====================================================
// File: src/pages/Home.jsx  (קובץ 1 — דף הבית)
// =====================================================
import React from "react";

export default function Home(){
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
