// =====================================================
// File: src/pages/Contact.jsx (קובץ 3 — צור קשר)
// =====================================================
import React from "react";

export default function Contact(){
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
