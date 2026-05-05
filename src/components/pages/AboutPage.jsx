import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #080A0F;
    --bg2: #0D1018;
    --surface: #161B27;
    --surface2: #1C2334;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --gold: #F5A623;
    --gold2: #FFCB6B;
    --sage: #5EC4A1;
    --white: #F0F2F8;
    --white70: rgba(240,242,248,0.7);
    --white40: rgba(240,242,248,0.4);
    --white20: rgba(240,242,248,0.2);
    --white08: rgba(240,242,248,0.08);
    --mono: 'JetBrains Mono', monospace;
    --sans: 'DM Sans', sans-serif;
    --display: 'Syne', sans-serif;
    --ease: cubic-bezier(0.22,1,0.36,1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ab-page {
    font-family: var(--sans);
    background: var(--bg);
    color: var(--white);
    min-height: 100vh;
  }

  /* NAV */
  .ab-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
    background: rgba(8,10,15,0.92);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
  }
  .ab-nav-logo {
    font-family: var(--display); font-size: 1.2rem; font-weight: 800;
    letter-spacing: -0.5px; display: flex; align-items: center; gap: 10px;
    cursor: pointer;
  }
  .ab-nav-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold); box-shadow: 0 0 12px var(--gold);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 8px var(--gold), 0 0 16px rgba(245,166,35,0.3); }
    50% { box-shadow: 0 0 16px var(--gold), 0 0 32px rgba(245,166,35,0.5); }
  }
  .ab-nav-links {
    display: flex; gap: 32px; font-size: 0.85rem; color: var(--white40);
  }
  .ab-nav-links span { cursor: pointer; transition: color 0.2s; }
  .ab-nav-links span:hover, .ab-nav-links span.active { color: var(--white); }
  .btn-ghost-nav {
    font-family: var(--sans); font-size: 0.82rem; font-weight: 500;
    color: var(--white70); background: none; border: 1px solid var(--border2);
    padding: 7px 18px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost-nav:hover { color: var(--white); border-color: rgba(255,255,255,0.3); }
  .btn-gold-sm {
    font-family: var(--sans); font-size: 0.82rem; font-weight: 600;
    color: #000; background: var(--gold); border: none;
    padding: 8px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
  }
  .btn-gold-sm:hover { background: var(--gold2); transform: translateY(-1px); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* HERO */
  .ab-hero {
    position: relative; padding: 160px 80px 100px;
    overflow: hidden;
  }
  .ab-hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 90% 60% at 20% 40%, black 10%, transparent 80%);
  }
  .ab-hero-orb {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%);
    top: -100px; right: -150px; filter: blur(60px); pointer-events: none;
  }
  .ab-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .ab-eyebrow {
    font-family: var(--mono); font-size: 0.68rem; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 20px;
    animation: fadeUp 0.7s var(--ease) both;
  }
  .ab-hero-h1 {
    font-family: var(--display);
    font-size: clamp(2.8rem, 5.5vw, 4.5rem);
    font-weight: 800; letter-spacing: -2px; line-height: 1.05;
    color: var(--white); max-width: 700px;
    animation: fadeUp 0.7s 0.1s var(--ease) both;
  }
  .ab-hero-h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ab-hero-sub {
    font-size: 1.05rem; font-weight: 300; line-height: 1.85;
    color: var(--white40); max-width: 560px; margin-top: 24px;
    animation: fadeUp 0.7s 0.2s var(--ease) both;
  }

  /* STORY */
  .ab-story {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 100px 80px;
  }
  .ab-story-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: start;
  }
  .ab-story-left { position: sticky; top: 100px; }
  .ab-story-label {
    font-family: var(--mono); font-size: 0.68rem; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
  }
  .ab-story-title {
    font-family: var(--display); font-size: 2.2rem; font-weight: 800;
    letter-spacing: -0.8px; color: var(--white); line-height: 1.15;
    margin-bottom: 20px;
  }
  .ab-story-intro {
    font-size: 0.9rem; color: var(--white40); line-height: 1.8; font-weight: 300;
  }
  .ab-story-year {
    display: inline-block; margin-top: 28px;
    font-family: var(--mono); font-size: 0.7rem; letter-spacing: 1.5px;
    color: var(--sage);
    border: 1px solid rgba(94,196,161,0.25);
    background: rgba(94,196,161,0.07);
    padding: 6px 14px; border-radius: 6px;
  }
  .ab-story-right { display: flex; flex-direction: column; gap: 40px; }
  .ab-story-para {
    font-size: 1rem; line-height: 1.9; color: var(--white70); font-weight: 300;
  }
  .ab-story-para strong {
    color: var(--white); font-weight: 500;
  }
  .ab-story-quote {
    border-left: 3px solid var(--gold);
    padding: 20px 28px;
    background: rgba(245,166,35,0.04);
    border-radius: 0 12px 12px 0;
  }
  .ab-story-quote-text {
    font-family: var(--display); font-size: 1.2rem; font-weight: 600;
    letter-spacing: -0.4px; line-height: 1.6; color: var(--white);
    margin-bottom: 12px;
  }
  .ab-story-quote-attr {
    font-size: 0.78rem; color: var(--white40); font-family: var(--mono);
    letter-spacing: 0.5px;
  }

  /* FOUNDERS */
  .ab-founders {
    padding: 100px 80px;
    background: var(--bg);
  }
  .ab-founders-inner { max-width: 1200px; margin: 0 auto; }
  .ab-founders-header { margin-bottom: 64px; }
  .ab-founders-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
  }
  .ab-founder-card {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 24px; overflow: hidden;
    transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
  }
  .ab-founder-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,166,35,0.1);
  }
  .ab-founder-header {
    padding: 40px 40px 28px;
    display: flex; align-items: flex-start; gap: 24px;
  }
  .ab-founder-avatar {
    width: 80px; height: 80px; border-radius: 20px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--display); font-size: 1.8rem; font-weight: 800;
    letter-spacing: -1px;
  }
  .ab-founder-avatar.gold {
    background: linear-gradient(135deg, rgba(245,166,35,0.2), rgba(245,166,35,0.08));
    border: 1px solid rgba(245,166,35,0.3);
    color: var(--gold);
  }
  .ab-founder-avatar.sage {
    background: linear-gradient(135deg, rgba(94,196,161,0.2), rgba(94,196,161,0.08));
    border: 1px solid rgba(94,196,161,0.3);
    color: var(--sage);
  }
  .ab-founder-name {
    font-family: var(--display); font-size: 1.4rem; font-weight: 800;
    letter-spacing: -0.5px; color: var(--white); margin-bottom: 4px;
  }
  .ab-founder-role {
    font-size: 0.8rem; color: var(--gold); font-family: var(--mono);
    letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;
  }
  .ab-founder-tagline { font-size: 0.85rem; color: var(--white40); line-height: 1.6; }
  .ab-founder-body {
    padding: 0 40px 40px;
    border-top: 1px solid var(--border);
    margin-top: 4px;
    padding-top: 28px;
  }
  .ab-founder-bio {
    font-size: 0.88rem; line-height: 1.8; color: var(--white70); font-weight: 300;
    margin-bottom: 24px;
  }
  .ab-founder-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  }
  .ab-founder-stat {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 16px;
  }
  .ab-founder-stat-val {
    font-family: var(--display); font-size: 1.3rem; font-weight: 800;
    letter-spacing: -0.5px; color: var(--white); margin-bottom: 2px;
  }
  .ab-founder-stat-lbl {
    font-size: 0.72rem; color: var(--white40); font-family: var(--mono); letter-spacing: 0.5px;
  }

  /* TIMELINE */
  .ab-timeline {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 100px 80px;
  }
  .ab-timeline-inner { max-width: 1200px; margin: 0 auto; }
  .ab-timeline-header { margin-bottom: 64px; }
  .ab-timeline-list { display: flex; flex-direction: column; gap: 0; position: relative; }
  .ab-timeline-list::before {
    content: ''; position: absolute; left: 28px; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, transparent, var(--border2) 10%, var(--border2) 90%, transparent);
  }
  .ab-timeline-item {
    display: flex; gap: 40px; align-items: flex-start;
    padding: 32px 0; border-bottom: 1px solid var(--border);
  }
  .ab-timeline-item:last-child { border-bottom: none; }
  .ab-timeline-dot-wrap {
    width: 56px; flex-shrink: 0; display: flex; justify-content: center; padding-top: 4px;
  }
  .ab-timeline-dot {
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--bg2); border: 2px solid var(--border2);
    position: relative; z-index: 1; transition: all 0.3s;
  }
  .ab-timeline-item:hover .ab-timeline-dot {
    background: var(--gold); border-color: var(--gold);
    box-shadow: 0 0 16px rgba(245,166,35,0.4);
  }
  .ab-timeline-year {
    font-family: var(--mono); font-size: 0.72rem; letter-spacing: 1.5px;
    color: var(--gold); width: 80px; flex-shrink: 0; padding-top: 2px;
  }
  .ab-timeline-content { flex: 1; }
  .ab-timeline-title {
    font-family: var(--display); font-size: 1.05rem; font-weight: 700;
    letter-spacing: -0.3px; color: var(--white); margin-bottom: 8px;
  }
  .ab-timeline-desc { font-size: 0.85rem; color: var(--white40); line-height: 1.7; }

  /* VALUES */
  .ab-values {
    padding: 100px 80px; background: var(--bg);
  }
  .ab-values-inner { max-width: 1200px; margin: 0 auto; }
  .ab-values-header { margin-bottom: 56px; }
  .ab-values-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 1px;
    background: var(--border); border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
  }
  .ab-value-card {
    background: var(--bg2); padding: 36px 32px;
    transition: background 0.3s;
  }
  .ab-value-card:hover { background: var(--surface); }
  .ab-value-icon { font-size: 1.8rem; margin-bottom: 20px; display: block; }
  .ab-value-title {
    font-family: var(--display); font-size: 1rem; font-weight: 700;
    color: var(--white); margin-bottom: 10px; letter-spacing: -0.3px;
  }
  .ab-value-desc { font-size: 0.82rem; color: var(--white40); line-height: 1.7; }

  /* CTA */
  .ab-cta {
    padding: 100px 80px;
    background: var(--bg2);
    border-top: 1px solid var(--border);
    text-align: center;
    position: relative; overflow: hidden;
  }
  .ab-cta-orb {
    position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%);
    left: 50%; top: 50%; transform: translate(-50%, -50%);
    filter: blur(60px); pointer-events: none;
  }
  .ab-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
  .ab-cta-title {
    font-family: var(--display); font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800; letter-spacing: -1px; color: var(--white); margin-bottom: 16px;
  }
  .ab-cta-sub { font-size: 0.95rem; color: var(--white40); line-height: 1.8; margin-bottom: 40px; }
  .ab-cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-hero-primary {
    font-family: var(--sans); font-size: 0.95rem; font-weight: 600;
    color: #000; background: var(--gold); border: none;
    padding: 14px 32px; border-radius: 10px; cursor: pointer;
    transition: all 0.3s var(--ease);
    box-shadow: 0 8px 32px rgba(245,166,35,0.3);
  }
  .btn-hero-primary:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 16px 48px rgba(245,166,35,0.4); }
  .btn-hero-secondary {
    font-family: var(--sans); font-size: 0.95rem; font-weight: 500;
    color: var(--white70); background: var(--white08);
    border: 1px solid var(--border2); padding: 14px 32px; border-radius: 10px;
    cursor: pointer; transition: all 0.3s var(--ease);
  }
  .btn-hero-secondary:hover { color: var(--white); background: rgba(255,255,255,0.12); }

  /* FOOTER */
  .ab-footer {
    background: var(--bg); border-top: 1px solid var(--border);
    padding: 40px 80px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 24px;
  }
  .ab-footer-brand {
    font-family: var(--display); font-size: 1rem; font-weight: 800;
    color: var(--white); display: flex; align-items: center; gap: 8px;
  }
  .ab-footer-links { display: flex; gap: 24px; font-size: 0.82rem; color: var(--white40); }
  .ab-footer-links span { cursor: pointer; transition: color 0.2s; }
  .ab-footer-links span:hover { color: var(--white); }
  .ab-footer-copy { font-size: 0.75rem; color: var(--white20); font-family: var(--mono); }

  .section-title {
    font-family: var(--display);
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 800; letter-spacing: -1px;
    color: var(--white); line-height: 1.1;
  }
`;

export default function AboutPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="ab-page">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="ab-nav" style={{ background: scrolled ? "rgba(8,10,15,0.97)" : "rgba(8,10,15,0.85)", borderBottomColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)" }}>
        <div className="ab-nav-logo" onClick={() => setPage("home")}>
          <div className="ab-nav-dot" />
          SpeedPak
        </div>
        <div className="ab-nav-links">
          {[["home","Home"],["services","Services"],["track","Track"],["about","About"]].map(([pg, lbl]) => (
            <span key={pg} className={pg === "about" ? "active" : ""} onClick={() => setPage(pg)}>{lbl}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-ghost-nav" onClick={() => setPage("track")}>Track Parcel</button>
          <button className="btn-gold-sm" onClick={() => setPage("book")}>Send Now →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-bg" />
        <div className="ab-hero-orb" />
        <div className="ab-hero-inner">
          <div className="ab-eyebrow">Our Story</div>
          <h1 className="ab-hero-h1">
            Built by Kenyans,<br />for <em>every corner</em><br />of Kenya.
          </h1>
          <p className="ab-hero-sub">
            SpeedPak was born from a simple frustration — parcels that got lost, riders who didn't show up, and tracking that said "delivered" when nothing arrived. We decided to fix it.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-left">
            <div className="ab-story-label">The Origin</div>
            <h2 className="ab-story-title">From a Nairobi CBD frustration to 47 counties</h2>
            <p className="ab-story-intro">Two friends. One broke laptop. One missed delivery. A whole lot of determination.</p>
            <span className="ab-story-year">EST. 2019 · NAIROBI, KENYA</span>
          </div>
          <div className="ab-story-right">
            <p className="ab-story-para">
              In 2019, <strong>Michael</strong> and <strong>Charles</strong> were running small e-commerce side hustles out of Nairobi's Westlands. Every week, the same headache: unreliable couriers, no tracking, customers complaining about missing orders. They spent more time managing deliveries than running their actual businesses.
            </p>
            <div className="ab-story-quote">
              <p className="ab-story-quote-text">"We kept asking — why is it so hard to send something from Westlands to Eastleigh and actually know it got there?"</p>
              <p className="ab-story-quote-attr">— Michael, Co-Founder & CEO</p>
            </div>
            <p className="ab-story-para">
              Charles, who had spent three years building logistics software for a regional freight company, saw the technical gap clearly. <strong>Kenya had riders everywhere</strong> — boda bodas on every corner — but no modern system tying them together. No real-time GPS, no digital proof of delivery, no accountability layer.
            </p>
            <p className="ab-story-para">
              They launched SpeedPak in early 2020 with 6 riders, a WhatsApp group, and a Google Sheet for tracking. Within 8 months they had <strong>200+ riders across Nairobi</strong>. By 2022, SpeedPak had expanded to all 47 counties, processing over 40,000 deliveries a month.
            </p>
            <div className="ab-story-quote">
              <p className="ab-story-quote-text">"The tech was the easy part. Earning the trust of riders and customers — that was the real work."</p>
              <p className="ab-story-quote-attr">— Charles, Co-Founder & CTO</p>
            </div>
            <p className="ab-story-para">
              Today SpeedPak is Kenya's fastest-growing courier platform — still headquartered in Nairobi, still deeply rooted in understanding how <strong>Kenyan commerce actually moves</strong>: the mama mboga, the online boutique, the SME shipping to upcountry, the student waiting for a parcel from Mum.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="ab-founders">
        <div className="ab-founders-inner">
          <div className="ab-founders-header">
            <div className="ab-eyebrow">The Founders</div>
            <h2 className="section-title">Meet Michael & Charles</h2>
          </div>
          <div className="ab-founders-grid">
            {/* MICHAEL */}
            <div className="ab-founder-card">
              <div className="ab-founder-header">
                <div className="ab-founder-avatar gold">MK</div>
                <div>
                  <div className="ab-founder-name">Michael Kamau</div>
                  <div className="ab-founder-role">Co-Founder & CEO</div>
                  <div className="ab-founder-tagline">Operations, growth, and the relentless belief that logistics in Kenya can be world-class.</div>
                </div>
              </div>
              <div className="ab-founder-body">
                <p className="ab-founder-bio">
                  Michael studied Business Administration at the University of Nairobi before spending four years scaling operations for a pan-African FMCG distributor. His obsession is simple: make every delivery feel effortless — for the sender, the rider, and the recipient. Outside of SpeedPak, he mentors young entrepreneurs through the Nairobi Startup Garage and is an avid marathon runner (he's completed the Lewa Marathon twice).
                </p>
                <div className="ab-founder-stats">
                  {[{v:"5+", l:"Years in logistics"},{v:"47", l:"Counties led"},{v:"200K+", l:"Deliveries overseen"},{v:"2×", l:"Lewa Marathon finisher"}].map(s => (
                    <div className="ab-founder-stat" key={s.l}>
                      <div className="ab-founder-stat-val">{s.v}</div>
                      <div className="ab-founder-stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* CHARLES */}
            <div className="ab-founder-card">
              <div className="ab-founder-header">
                <div className="ab-founder-avatar sage">CO</div>
                <div>
                  <div className="ab-founder-name">Charles Ochieng</div>
                  <div className="ab-founder-role">Co-Founder & CTO</div>
                  <div className="ab-founder-tagline">The engineer who built the spine of SpeedPak — real-time tracking, rider apps, and the API powering 1,200+ businesses.</div>
                </div>
              </div>
              <div className="ab-founder-body">
                <p className="ab-founder-bio">
                  Charles holds a Computer Science degree from Strathmore University and sharpened his skills building freight management systems for East Africa's largest logistics firm. He architected SpeedPak's entire tech stack from scratch — the rider app, the real-time tracking infrastructure, and the business API. He is a vocal advocate for open-source tech in Africa and regularly speaks at Nairobi Dev Con. In his rare downtime, he brews his own coffee and maintains a thriving kitchen garden in Kiambu.
                </p>
                <div className="ab-founder-stats">
                  {[{v:"8+", l:"Years in software"},{v:"3", l:"Patents filed"},{v:"1.2M+", l:"Deliveries tracked"},{v:"99.9%", l:"Platform uptime"}].map(s => (
                    <div className="ab-founder-stat" key={s.l}>
                      <div className="ab-founder-stat-val">{s.v}</div>
                      <div className="ab-founder-stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="ab-timeline">
        <div className="ab-timeline-inner">
          <div className="ab-timeline-header">
            <div className="ab-eyebrow">Milestones</div>
            <h2 className="section-title">How we got here</h2>
          </div>
          <div className="ab-timeline-list">
            {[
              { year: "2019", title: "The idea", desc: "Michael and Charles sketch the first version of SpeedPak on a napkin at Java House, Westlands. The frustration is real; the solution starts forming." },
              { year: "Jan 2020", title: "6 riders, 1 WhatsApp group", desc: "SpeedPak launches with 6 trusted boda boda riders across Nairobi. Orders tracked on a Google Sheet. First 100 deliveries completed in 3 weeks." },
              { year: "Aug 2020", title: "First tech release", desc: "Charles ships the v1 rider app — basic GPS ping every 5 minutes, automatic SMS to customers. Game-changer. Rider count hits 200." },
              { year: "2021", title: "Series A — KSh 180M raised", desc: "First institutional funding round led by Savannah Fund and two angel investors. Expansion to Mombasa, Kisumu, and Nakuru begins." },
              { year: "2022", title: "All 47 counties reached", desc: "SpeedPak becomes the first tech-enabled courier with confirmed coverage across every county in Kenya, including Mandera and Turkana." },
              { year: "2023", title: "1 million deliveries milestone", desc: "The platform processes its 1,000,000th delivery. Real-time tracking now updates every 30 seconds. Business API launches with 1,200+ integrations." },
              { year: "2024", title: "SpeedPak for Business", desc: "Launch of volume pricing, SLA guarantees, and dedicated account management for enterprise clients. 47 active riders online 24/7." },
              { year: "2025", title: "Today", desc: "1.2 million deliveries and counting. 98.4% on-time rate. Expanding into Uganda and Tanzania — but Kenya always first." },
            ].map(t => (
              <div className="ab-timeline-item" key={t.year}>
                <div className="ab-timeline-dot-wrap">
                  <div className="ab-timeline-dot" />
                </div>
                <div className="ab-timeline-year">{t.year}</div>
                <div className="ab-timeline-content">
                  <div className="ab-timeline-title">{t.title}</div>
                  <p className="ab-timeline-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-values">
        <div className="ab-values-inner">
          <div className="ab-values-header">
            <div className="ab-eyebrow">What we stand for</div>
            <h2 className="section-title">Our values</h2>
          </div>
          <div className="ab-values-grid">
            {[
              { icon: "🎯", title: "Accountability first", desc: "Every parcel is someone's promise. We take that seriously — real-time tracking, digital proof, and no excuses when something goes wrong." },
              { icon: "🤝", title: "Rider dignity", desc: "Our riders are our backbone. Fair pay, safety gear, transparent earnings, and a platform that respects their time and expertise." },
              { icon: "🌍", title: "Built for Kenya", desc: "No copy-pasting from foreign logistics models. Our routing, pricing, and coverage are designed around how Kenya actually moves." },
              { icon: "⚡", title: "Speed without shortcuts", desc: "Fast delivery never means reckless delivery. We optimise for both — and our 98.4% on-time rate proves the two aren't in conflict." },
              { icon: "📱", title: "Technology that serves people", desc: "Every line of code Charles writes exists to make life easier for a rider in Kibera or a customer in Eldoret — not to impress investors." },
              { icon: "🌱", title: "Long-term Kenya", desc: "We're not here for an exit. Michael and Charles are committed to building Kenya's logistics backbone for the next 20 years." },
            ].map(v => (
              <div className="ab-value-card" key={v.title}>
                <span className="ab-value-icon">{v.icon}</span>
                <div className="ab-value-title">{v.title}</div>
                <p className="ab-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-cta-orb" />
        <div className="ab-cta-inner">
          <div className="ab-eyebrow">Join the journey</div>
          <h2 className="ab-cta-title">Let's move Kenya forward — together.</h2>
          <p className="ab-cta-sub">Whether you're sending a single parcel or integrating SpeedPak into your business — we'd love to have you on board.</p>
          <div className="ab-cta-actions">
            <button className="btn-hero-primary" onClick={() => setPage("book")}>Send a Parcel →</button>
            <button className="btn-hero-secondary" onClick={() => setPage("contact")}>Get in Touch</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ab-footer">
        <div className="ab-footer-brand">
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 12px var(--gold)" }} />
          SpeedPak
        </div>
        <div className="ab-footer-links">
          {["Home","Services","Track","About","Careers","Contact"].map(l => (
            <span key={l} onClick={() => setPage(l.toLowerCase())}>{l}</span>
          ))}
        </div>
        <div className="ab-footer-copy">© 2025 SpeedPak Kenya · All 47 Counties</div>
      </footer>
    </div>
  );
}