// =====================================================
// File: src/pages/About.jsx (דף "מי אני")
// =====================================================
import React from "react";

export default function About(){
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
