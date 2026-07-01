import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg:      #080A0F;
    --bg2:     #0D1018;
    --surface: #161B27;
    --border:  rgba(255,255,255,0.07);
    --bord2:   rgba(255,255,255,0.13);
    --gold:    #F5A623;
    --gold2:   #FFCB6B;
    --sage:    #5EC4A1;
    --w:       #F0F2F8;
    --w70:     rgba(240,242,248,0.70);
    --w40:     rgba(240,242,248,0.40);
    --w20:     rgba(240,242,248,0.20);
    --w08:     rgba(240,242,248,0.08);
    --mono:    'JetBrains Mono', monospace;
    --sans:    'DM Sans', sans-serif;
    --disp:    'Syne', sans-serif;
    --ease:    cubic-bezier(0.22,1,0.36,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .sv { font-family: var(--sans); background: var(--bg); color: var(--w); overflow-x: hidden; min-height: 100vh; }
  .sv-inner { max-width: 1200px; margin: 0 auto; padding: 0 60px; }
  .sv-eyebrow { font-family: var(--mono); font-size: .67rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); display: inline-flex; align-items: center; gap: 8px; }
  .sv-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }

  @keyframes pulse { 0%,100% { box-shadow: 0 0 8px var(--gold), 0 0 18px rgba(245,166,35,.3); } 50% { box-shadow: 0 0 18px var(--gold), 0 0 36px rgba(245,166,35,.55); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }

  /* NAV (matches landing page) */
  .sv-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; display: flex; align-items: center; padding: 0 60px;
    background: rgba(8,10,15,.97); backdrop-filter: blur(28px) saturate(180%);
    border-bottom: 1px solid var(--bord2);
  }
  .sv-nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; font-family: var(--disp); font-size: 1.15rem; font-weight: 800; letter-spacing: -.4px; color: var(--w); flex-shrink: 0; }
  .sv-nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
  .sv-nav-links { display: flex; gap: 30px; margin: 0 auto; font-size: .84rem; color: var(--w40); }
  .sv-nav-links span { cursor: pointer; transition: color .2s; white-space: nowrap; }
  .sv-nav-links span.active { color: var(--gold); }
  .sv-nav-links span:hover { color: var(--w); }
  .btn-gold { font-family: var(--sans); font-size: .84rem; font-weight: 700; cursor: pointer; color: #000; background: var(--gold); border: none; padding: 8px 22px; border-radius: 9px; transition: all .25s var(--ease); box-shadow: 0 4px 18px rgba(245,166,35,.28); flex-shrink: 0; }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(245,166,35,.4); }

  /* HERO */
  .sv-hero { position: relative; padding: 150px 0 70px; overflow: hidden; }
  .sv-hero-orb { position: absolute; width: 640px; height: 640px; border-radius: 50%; background: radial-gradient(circle,rgba(245,166,35,.10) 0%,transparent 65%); top: -280px; right: -160px; filter: blur(70px); animation: float 9s ease-in-out infinite; pointer-events: none; }
  .sv-hero-inner { position: relative; z-index: 1; }
  .sv-hero-h1 { font-family: var(--disp); font-size: clamp(2.3rem, 4.6vw, 3.6rem); font-weight: 800; letter-spacing: -1.6px; line-height: 1.05; color: var(--w); margin: 16px 0 20px; animation: fadeUp .7s var(--ease) both; }
  .sv-hero-h1 em { font-style: normal; background: linear-gradient(135deg,var(--gold),var(--gold2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .sv-hero-p { font-size: 1rem; font-weight: 300; line-height: 1.85; color: var(--w40); max-width: 560px; animation: fadeUp .7s .1s var(--ease) both; }

  /* SERVICES GRID */
  .sv-grid-section { padding: 20px 0 110px; background: var(--bg); position: relative; }
  .sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 22px; overflow: hidden; }
  .sv-card { background: var(--bg2); padding: 36px 32px; position: relative; overflow: hidden; transition: background .3s var(--ease); }
  .sv-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(245,166,35,.05), transparent); opacity: 0; transition: opacity .3s; }
  .sv-card:hover { background: var(--surface); }
  .sv-card:hover::after { opacity: 1; }
  .sv-card:hover .sv-card-icon { transform: scale(1.12) rotate(-6deg); }
  .sv-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
  .sv-card-icon { font-size: 2rem; transition: transform .3s var(--ease); display: block; }
  .sv-card-badge { font-family: var(--mono); font-size: .62rem; letter-spacing: .6px; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; }
  .sv-card-badge.express { color: var(--gold); background: rgba(245,166,35,.1); border: 1px solid rgba(245,166,35,.25); }
  .sv-card-badge.enterprise { color: var(--sage); background: rgba(94,196,161,.1); border: 1px solid rgba(94,196,161,.25); }
  .sv-card-title { font-family: var(--disp); font-size: 1.05rem; font-weight: 700; letter-spacing: -.3px; color: var(--w); margin-bottom: 10px; }
  .sv-card-desc { font-size: .84rem; color: var(--w40); line-height: 1.75; }
  .sv-card-cta { margin-top: 18px; font-size: .78rem; color: var(--gold); font-family: var(--mono); opacity: 0; transition: opacity .25s; }
  .sv-card:hover .sv-card-cta { opacity: 1; }

  /* CTA STRIP */
  .sv-cta { padding: 90px 0; background: var(--bg2); border-top: 1px solid var(--border); text-align: center; position: relative; overflow: hidden; }
  .sv-cta-orb { position: absolute; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(245,166,35,.08) 0%, transparent 65%); left: 50%; top: 50%; transform: translate(-50%,-50%); filter: blur(70px); pointer-events: none; animation: pulse 5s ease-in-out infinite; }
  .sv-cta-inner { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
  .sv-cta-h2 { font-family: var(--disp); font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 800; letter-spacing: -1.2px; color: var(--w); margin: 14px 0 16px; line-height: 1.1; }
  .sv-cta-h2 em { font-style: normal; background: linear-gradient(135deg,var(--gold),var(--gold2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .sv-cta-p { font-size: .95rem; color: var(--w40); font-weight: 300; line-height: 1.8; margin-bottom: 32px; }
  .btn-gold-lg { font-family: var(--sans); font-size: .95rem; font-weight: 700; cursor: pointer; color: #000; background: var(--gold); border: none; padding: 14px 34px; border-radius: 11px; transition: all .3s var(--ease); box-shadow: 0 8px 32px rgba(245,166,35,.32); }
  .btn-gold-lg:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 16px 48px rgba(245,166,35,.45); }

  @media (max-width: 768px) {
    .sv-nav { padding: 0 20px; height: 58px; }
    .sv-nav-links { display: none; }
    .sv-inner { padding: 0 20px; }
    .sv-hero { padding: 100px 0 40px; }
    .sv-grid-section { padding: 10px 0 70px; }
    .sv-grid { grid-template-columns: 1fr; }
    .sv-cta { padding: 60px 20px; }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .sv-inner { padding: 0 32px; }
    .sv-nav { padding: 0 32px; }
    .sv-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

const services = [
  {
    icon: "🚚",
    title: "Same-Day Delivery",
    desc: "Need your parcel delivered urgently? Our same-day delivery service ensures packages reach their destination within the same day in selected towns and cities across Kenya.",
    badge: "Express",
  },
  {
    icon: "🚛",
    title: "Next-Day Delivery",
    desc: "A reliable and affordable option for parcels that do not require immediate delivery. Perfect for nationwide deliveries with guaranteed next-day dispatch.",
  },
  {
    icon: "📦",
    title: "Door-to-Door Delivery",
    desc: "We collect parcels directly from the sender and deliver them to the recipient's doorstep, offering maximum convenience and saving valuable time.",
  },
  {
    icon: "🗺️",
    title: "Town-to-Town Delivery",
    desc: "Send parcels between major towns and counties across Kenya through our trusted transport network, ensuring safe and timely delivery.",
  },
  {
    icon: "🏢",
    title: "Parcel Collection Points",
    desc: "Customers can drop off or collect parcels from designated collection centres, making deliveries more flexible and accessible no matter where you are in Kenya.",
  },
  {
    icon: "🏬",
    title: "Business Bulk Deliveries",
    desc: "Tailored delivery plans for businesses with high parcel volumes. Enjoy competitive rates, priority handling, and a dedicated account manager for your logistics needs.",
    badge: "Enterprise",
  },
  {
    icon: "❄️",
    title: "Fragile & Special Handling",
    desc: "Some parcels need extra care. Our fragile handling service uses protective packaging and dedicated couriers to ensure delicate items arrive in perfect condition.",
  },
];

export default function Services({ setPage }) {
  const handleNav = (pg) => setPage?.(pg);

  return (
    <div className="sv">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="sv-nav">
        <div className="sv-nav-logo" onClick={() => handleNav("home")}>
          <div className="sv-nav-dot" />
          SwiftParcel
        </div>
        <div className="sv-nav-links">
          {[["home","Home"],["services","Services"],["about","About"]].map(([pg,lbl]) => (
            <span key={pg} className={pg === "services" ? "active" : ""} onClick={() => handleNav(pg)}>{lbl}</span>
          ))}
        </div>
        <button className="btn-gold" onClick={() => handleNav("book")}>Send Now →</button>
      </nav>

      {/* HERO */}
      <section className="sv-hero">
        <div className="sv-hero-orb" />
        <div className="sv-inner sv-hero-inner">
          <div className="sv-eyebrow"><span className="sv-eyebrow-dot" />What we offer</div>
          <h1 className="sv-hero-h1">Delivery, tailored to<br/><em>how you ship.</em></h1>
          <p className="sv-hero-p">
            We provide reliable parcel delivery solutions across Kenya, ensuring every package
            reaches its destination safely, securely, and on time — whether you're sending
            personal packages or managing business deliveries.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="sv-grid-section">
        <div className="sv-inner">
          <div className="sv-grid">
            {services.map((s, i) => (
              <div className="sv-card" key={i} onClick={() => handleNav("book")}>
                <div className="sv-card-top">
                  <span className="sv-card-icon">{s.icon}</span>
                  {s.badge && (
                    <span className={`sv-card-badge ${s.badge.toLowerCase()}`}>{s.badge}</span>
                  )}
                </div>
                <div className="sv-card-title">{s.title}</div>
                <p className="sv-card-desc">{s.desc}</p>
                <div className="sv-card-cta">Send a parcel →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sv-cta">
        <div className="sv-cta-orb" />
        <div className="sv-cta-inner">
          <div className="sv-eyebrow"><span className="sv-eyebrow-dot" />Ready to ship?</div>
          <h2 className="sv-cta-h2">Pick a service.<br/><em>We'll handle the rest.</em></h2>
          <p className="sv-cta-p">Book in 60 seconds and track your parcel in real time, wherever it's headed.</p>
          <button className="btn-gold-lg" onClick={() => handleNav("book")}>Send a Parcel →</button>
        </div>
      </section>
    </div>
  );
}