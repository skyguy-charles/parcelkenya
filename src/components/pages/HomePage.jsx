import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #080A0F;
    --bg2: #0D1018;
    --bg3: #111520;
    --surface: #161B27;
    --surface2: #1C2334;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --gold: #F5A623;
    --gold2: #FFCB6B;
    --gold-glow: rgba(245,166,35,0.15);
    --gold-glow2: rgba(245,166,35,0.06);
    --sage: #5EC4A1;
    --sage-dim: rgba(94,196,161,0.7);
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

  .sp-home {
    font-family: var(--sans);
    background: var(--bg);
    color: var(--white);
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .sp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
    background: rgba(8,10,15,0.85);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
    transition: all 0.4s var(--ease);
  }
  .sp-nav.scrolled { background: rgba(8,10,15,0.97); border-color: var(--border2); }
  .sp-nav-logo {
    font-family: var(--display);
    font-size: 1.2rem; font-weight: 800;
    letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 10px;
  }
  .sp-nav-logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 12px var(--gold);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 8px var(--gold), 0 0 16px rgba(245,166,35,0.3); }
    50% { box-shadow: 0 0 16px var(--gold), 0 0 32px rgba(245,166,35,0.5); }
  }
  .sp-nav-links {
    display: flex; align-items: center; gap: 32px;
    font-size: 0.85rem; font-weight: 400; color: var(--white40);
  }
  .sp-nav-links span { cursor: pointer; transition: color 0.2s; }
  .sp-nav-links span:hover { color: var(--white); }
  .sp-nav-cta {
    display: flex; align-items: center; gap: 12px;
  }
  .btn-ghost-nav {
    font-family: var(--sans); font-size: 0.82rem; font-weight: 500;
    color: var(--white70); background: none; border: 1px solid var(--border2);
    padding: 7px 18px; border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost-nav:hover { color: var(--white); border-color: var(--white40); background: var(--white08); }
  .btn-gold-sm {
    font-family: var(--sans); font-size: 0.82rem; font-weight: 600;
    color: #000; background: var(--gold); border: none;
    padding: 8px 20px; border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-gold-sm:hover { background: var(--gold2); transform: translateY(-1px); }

  /* ── HERO ── */
  .sp-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 100px 80px 80px;
    overflow: hidden;
  }
  .sp-hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .sp-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%);
  }
  .sp-hero-orb1 {
    position: absolute; width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 65%);
    top: -300px; right: -200px; filter: blur(60px);
  }
  .sp-hero-orb2 {
    position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(94,196,161,0.07) 0%, transparent 70%);
    bottom: -100px; left: -100px; filter: blur(80px);
  }

  /* HERO CONTENT — single column, centred-left */
  .sp-hero-content {
    position: relative; z-index: 2;
    max-width: 760px;
  }
  .sp-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--mono); font-size: 0.68rem; letter-spacing: 1.5px;
    color: var(--gold); text-transform: uppercase;
    border: 1px solid rgba(245,166,35,0.3);
    background: rgba(245,166,35,0.06);
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px;
    animation: fadeUp 0.8s var(--ease) both;
  }
  .sp-hero-badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold); animation: pulse 2s ease-in-out infinite;
  }
  .sp-hero-h1 {
    font-family: var(--display);
    font-size: clamp(3rem, 5vw, 4.8rem);
    font-weight: 800; line-height: 1.0;
    letter-spacing: -2.5px; color: var(--white);
    margin-bottom: 24px; text-align: left;
    animation: fadeUp 0.8s 0.1s var(--ease) both;
  }
  .sp-hero-h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .sp-hero-p {
    font-size: 1rem; font-weight: 300; line-height: 1.85;
    color: var(--white40); max-width: 460px; margin-bottom: 40px;
    animation: fadeUp 0.8s 0.2s var(--ease) both;
  }
  .sp-hero-actions {
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    animation: fadeUp 0.8s 0.3s var(--ease) both;
  }
  .btn-hero-primary {
    font-family: var(--sans); font-size: 0.95rem; font-weight: 600;
    color: #000; background: var(--gold); border: none;
    padding: 14px 32px; border-radius: 10px; cursor: pointer;
    transition: all 0.3s var(--ease);
    box-shadow: 0 8px 32px rgba(245,166,35,0.3);
  }
  .btn-hero-primary:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 16px 48px rgba(245,166,35,0.45); }
  .btn-hero-secondary {
    font-family: var(--sans); font-size: 0.95rem; font-weight: 500;
    color: var(--white70); background: var(--white08);
    border: 1px solid var(--border2); padding: 14px 32px; border-radius: 10px;
    cursor: pointer; transition: all 0.3s var(--ease);
  }
  .btn-hero-secondary:hover { color: var(--white); background: rgba(255,255,255,0.12); border-color: var(--white40); }

  /* Metrics row */
  .sp-hero-metrics {
    display: flex; align-items: center; gap: 40px;
    margin-top: 56px; padding-top: 36px;
    border-top: 1px solid var(--border); flex-wrap: wrap;
    animation: fadeUp 0.8s 0.4s var(--ease) both;
  }
  .sp-hero-metric-val {
    font-family: var(--display); font-size: 1.9rem; font-weight: 800;
    letter-spacing: -1px; color: var(--white);
  }
  .sp-hero-metric-val span { color: var(--gold); }
  .sp-hero-metric-lbl { font-size: 0.75rem; color: var(--white40); font-family: var(--mono); letter-spacing: 0.5px; margin-top: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── SECTION WRAPPERS ── */
  .sp-section {
    padding: 100px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .sp-section-wide { max-width: 100%; padding: 100px 80px; }
  .sp-eyebrow {
    font-family: var(--mono); font-size: 0.68rem; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 16px;
  }
  .sp-section-title {
    font-family: var(--display);
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800; letter-spacing: -1px;
    color: var(--white); line-height: 1.1;
  }
  .sp-section-sub {
    font-size: 1rem; font-weight: 300; color: var(--white40);
    line-height: 1.8; max-width: 500px; margin-top: 12px;
  }

  /* ── STATS ROW ── */
  .sp-stats {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .sp-stats-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4,1fr);
    padding: 0;
  }
  .sp-stat {
    padding: 40px 32px;
    border-right: 1px solid var(--border);
    transition: background 0.3s;
    cursor: default;
  }
  .sp-stat:last-child { border-right: none; }
  .sp-stat:hover { background: var(--surface2); }
  .sp-stat-icon { font-size: 1.5rem; margin-bottom: 16px; }
  .sp-stat-val {
    font-family: var(--display); font-size: 2.2rem; font-weight: 800;
    letter-spacing: -1px; color: var(--white); margin-bottom: 4px;
  }
  .sp-stat-lbl { font-size: 0.8rem; color: var(--white40); margin-bottom: 8px; }
  .sp-stat-chg { font-size: 0.75rem; font-family: var(--mono); }
  .sp-stat-chg.up { color: var(--sage); }
  .sp-stat-chg.dn { color: #F08080; }

  /* ── QUICK TRACK ── */
  .sp-track-section {
    background: var(--bg);
    padding: 0 80px 80px;
  }
  .sp-track-card {
    max-width: 1200px; margin: 0 auto;
    background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
    border: 1px solid var(--border2);
    border-radius: 20px; padding: 40px;
    position: relative; overflow: hidden;
  }
  .sp-track-card-glow {
    position: absolute; width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%);
    right: -100px; top: -150px; pointer-events: none;
  }
  .sp-track-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
  }
  .sp-track-title {
    font-family: var(--display); font-size: 1.5rem; font-weight: 800;
    letter-spacing: -0.6px; color: var(--white);
  }
  .sp-track-sub { font-size: 0.85rem; color: var(--white40); margin-top: 4px; }
  .sp-track-row { display: flex; gap: 12px; align-items: center; }
  .sp-track-input-wrap {
    flex: 1; display: flex; align-items: center; gap: 12px;
    background: var(--bg); border: 1px solid var(--border2);
    border-radius: 10px; padding: 0 16px; height: 52px;
    transition: border-color 0.2s;
  }
  .sp-track-input-wrap:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(245,166,35,0.1); }
  .sp-track-input-icon { font-size: 1rem; color: var(--white40); }
  .sp-track-input-wrap input {
    flex: 1; background: none; border: none; outline: none;
    font-family: var(--mono); font-size: 0.9rem; color: var(--white);
  }
  .sp-track-input-wrap input::placeholder { color: var(--white20); }
  .btn-gold {
    font-family: var(--sans); font-size: 0.9rem; font-weight: 600;
    color: #000; background: var(--gold); border: none;
    padding: 0 28px; height: 52px; border-radius: 10px;
    cursor: pointer; transition: all 0.25s var(--ease); white-space: nowrap;
    box-shadow: 0 4px 16px rgba(245,166,35,0.25);
  }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(245,166,35,0.35); }

  /* ── SERVICES ── */
  .sp-services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 20px; overflow: hidden;
    margin-top: 48px;
  }
  .sp-service-card {
    background: var(--bg2); padding: 36px 32px;
    transition: background 0.3s var(--ease);
    cursor: default; position: relative; overflow: hidden;
  }
  .sp-service-card:hover { background: var(--surface); }
  .sp-service-card:hover .sp-service-icon { transform: scale(1.1) rotate(-5deg); }
  .sp-service-icon {
    font-size: 2rem; margin-bottom: 20px;
    display: block; transition: transform 0.3s var(--ease);
  }
  .sp-service-title {
    font-family: var(--display); font-size: 1.05rem; font-weight: 700;
    letter-spacing: -0.3px; color: var(--white); margin-bottom: 10px;
  }
  .sp-service-desc {
    font-size: 0.82rem; color: var(--white40); line-height: 1.7;
    margin-bottom: 20px;
  }
  .sp-service-tag {
    display: inline-block;
    font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.5px;
    color: var(--gold); background: rgba(245,166,35,0.08);
    border: 1px solid rgba(245,166,35,0.2);
    padding: 4px 10px; border-radius: 6px;
  }

  /* ── PROCESS ── */
  .sp-process-section {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 100px 80px;
    position: relative; overflow: hidden;
  }
  .sp-process-inner { max-width: 1200px; margin: 0 auto; }
  .sp-process-header { margin-bottom: 64px; }
  .sp-process-steps {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
    position: relative;
  }
  .sp-process-steps::before {
    content: '';
    position: absolute; top: 28px; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border2), var(--border2), transparent);
  }
  .sp-process-step { padding: 0 24px; position: relative; }
  .sp-process-num-wrap {
    width: 56px; height: 56px; border-radius: 16px;
    background: var(--bg2); border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px; position: relative; z-index: 1;
    transition: all 0.3s;
  }
  .sp-process-step:hover .sp-process-num-wrap {
    background: var(--gold-glow); border-color: rgba(245,166,35,0.4);
    box-shadow: 0 0 32px rgba(245,166,35,0.15);
  }
  .sp-process-num {
    font-family: var(--mono); font-size: 0.75rem; font-weight: 500;
    color: var(--gold); letter-spacing: 1px;
  }
  .sp-process-emoji { font-size: 1.3rem; margin-bottom: 16px; }
  .sp-process-title {
    font-family: var(--display); font-size: 1rem; font-weight: 700;
    color: var(--white); margin-bottom: 10px; letter-spacing: -0.3px;
  }
  .sp-process-desc {
    font-size: 0.8rem; color: var(--white40); line-height: 1.7;
  }
  .sp-process-cta {
    margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
  }
  .sp-process-cta-text { font-size: 0.9rem; color: var(--white40); }

  /* ── FOOTER ── */
  .sp-footer-strip {
    background: var(--bg2); border-top: 1px solid var(--border);
    padding: 40px 80px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 24px;
    max-width: 100%;
  }
  .sp-footer-brand {
    font-family: var(--display); font-size: 1rem; font-weight: 800;
    color: var(--white); display: flex; align-items: center; gap: 8px;
  }
  .sp-footer-links {
    display: flex; gap: 24px; font-size: 0.82rem; color: var(--white40);
  }
  .sp-footer-links span { cursor: pointer; transition: color 0.2s; }
  .sp-footer-links span:hover { color: var(--white); }
  .sp-footer-copy { font-size: 0.75rem; color: var(--white20); font-family: var(--mono); }
`;

const videoSteps = [
  {
    n: "01",
    title: "Pack & book\nin seconds",
    desc: "Fill in sender and recipient details in our intuitive booking flow. Select your service tier, schedule a pickup time, and you're done in under 60 seconds.",
    features: ["Smart address autocomplete", "Real-time price estimate", "Instant booking confirmation"],
    badge: "● BOOKING",
    mp4: "https://assets.mixkit.co/videos/42137/42137-720.mp4",
    poster: "https://assets.mixkit.co/videos/42137/42137-thumb-360-0.jpg",
  },
  {
    n: "02",
    title: "A rider collects\nat your door",
    desc: "A verified SpeedPak rider arrives at your scheduled time. Watch the live map as your courier approaches. No waiting around.",
    features: ["Live rider GPS tracking", "Rider ID verification", "Collection within 60 min window"],
    badge: "● COLLECTION",
    mp4: "https://assets.mixkit.co/videos/42130/42130-720.mp4",
    poster: "https://assets.mixkit.co/videos/42130/42130-thumb-360-0.jpg",
  },
  {
    n: "03",
    title: "Delivered — right\nto their door",
    desc: "Your recipient gets an SMS + WhatsApp alert. The rider rings the bell and hands over the parcel. Signature captured digitally. Job done.",
    features: ["Digital proof of delivery", "SMS + WhatsApp recipient alert", "Live map confirmation"],
    badge: "● DELIVERED",
    mp4: "https://assets.mixkit.co/videos/31155/31155-720.mp4",
    poster: "https://assets.mixkit.co/videos/31155/31155-thumb-360-0.jpg",
  },
];

function VideoCard({ step, reversed }) {
  return (
    <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "100px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: reversed ? "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(94,196,161,0.04) 0%, transparent 70%)" : "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(245,166,35,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", direction: reversed ? "rtl" : "ltr" }}>
        <div style={{ direction: "ltr" }}>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border2)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", aspectRatio: "16/9", background: "var(--surface)" }}>
            <video
              autoPlay muted loop playsInline
              poster={step.poster}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            >
              <source src={step.mp4} type="video/mp4" />
            </video>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.2), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", border: "1px solid var(--border2)", borderRadius: 8, padding: "8px 14px", fontSize: "0.72rem", color: "var(--white70)", fontFamily: "var(--mono)", display: "flex", alignItems: "center", gap: 8, zIndex: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage)", display: "inline-block", flexShrink: 0 }} />
              {step.badge}
            </div>
          </div>
        </div>
        <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase" }}>Step {step.n}</div>
          <div style={{ fontFamily: "var(--display)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.8px", color: "var(--white)", lineHeight: 1.15, whiteSpace: "pre-line" }}>{step.title}</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--white40)", lineHeight: 1.8 }}>{step.desc}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {step.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.875rem", color: "var(--white70)" }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: "rgba(94,196,161,0.1)", border: "1px solid rgba(94,196,161,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--sage)" }}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sp-home">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`sp-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="sp-nav-logo">
          <div className="sp-nav-logo-dot" />
          SpeedPak
        </div>
        <div className="sp-nav-links">
          {["Services", "Track", "Pricing", "About"].map(l => (
            <span key={l} onClick={() => setPage(l.toLowerCase())}>{l}</span>
          ))}
        </div>
        <div className="sp-nav-cta">
          <button className="btn-ghost-nav" onClick={() => setPage("track")}>Track Parcel</button>
          <button className="btn-gold-sm" onClick={() => setPage("book")}>Send Now →</button>
        </div>
      </nav>

      {/* HERO — single column, no white gap */}
      <section className="sp-hero">
        <div className="sp-hero-bg">
          <div className="sp-hero-grid" />
          <div className="sp-hero-orb1" />
          <div className="sp-hero-orb2" />
        </div>
        <div className="sp-hero-content">
          <div className="sp-hero-badge">
            <div className="sp-hero-badge-dot" />
            Kenya's most trusted courier — 47 counties
          </div>
          <h1 className="sp-hero-h1">
            Deliver anywhere<br />in Kenya, <em>fast.</em>
          </h1>
          <p className="sp-hero-p">
            From Nairobi CBD to Mandera County — reliable parcel delivery across every corner of the country, with real-time tracking at every step.
          </p>
          <div className="sp-hero-actions">
            <button className="btn-hero-primary" onClick={() => setPage("book")}>Send a Parcel →</button>
            <button className="btn-hero-secondary" onClick={() => setPage("track")}>Track Existing</button>
          </div>
          <div className="sp-hero-metrics">
            {[
              { v: "47", u: "", l: "Counties Covered" },
              { v: "1.2", u: "M+", l: "Parcels Delivered" },
              { v: "98.4", u: "%", l: "On-time Rate" },
              { v: "24/7", u: "", l: "Live Support" },
            ].map(m => (
              <div key={m.l}>
                <div className="sp-hero-metric-val">{m.v}<span>{m.u}</span></div>
                <div className="sp-hero-metric-lbl">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      <div className="sp-stats">
        <div className="sp-stats-inner">
          {[
            { icon: "📦", val: "1,284", lbl: "Parcels today", chg: "↑ +12% vs yesterday", up: true },
            { icon: "💰", val: "KSh 324K", lbl: "Revenue today", chg: "↑ +8% vs yesterday", up: true },
            { icon: "🚐", val: "47", lbl: "Active riders", chg: "↑ All online", up: true },
            { icon: "⏱", val: "98.1%", lbl: "On-time rate", chg: "↓ −0.3% vs target", up: false },
          ].map(s => (
            <div className="sp-stat" key={s.lbl}>
              <div className="sp-stat-icon">{s.icon}</div>
              <div className="sp-stat-val">{s.val}</div>
              <div className="sp-stat-lbl">{s.lbl}</div>
              <div className={`sp-stat-chg ${s.up ? "up" : "dn"}`}>{s.chg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO STEPS */}
      {videoSteps.map((step, i) => (
        <VideoCard key={step.n} step={step} reversed={i % 2 === 1} />
      ))}

      {/* QUICK TRACK */}
      <div className="sp-track-section">
        <div style={{ paddingTop: 80 }}>
          <div className="sp-track-card">
            <div className="sp-track-card-glow" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="sp-track-header">
                <div>
                  <div className="sp-track-title">Quick Track</div>
                  <div className="sp-track-sub">Enter your tracking ID to get live status</div>
                </div>
                <button className="btn-ghost-nav" onClick={() => setPage("track")} style={{ fontSize: "0.8rem" }}>Full Tracking →</button>
              </div>
              <div className="sp-track-row">
                <div className="sp-track-input-wrap">
                  <span className="sp-track-input-icon">📦</span>
                  <input placeholder="e.g. SPK-001234" onKeyDown={e => e.key === "Enter" && setPage("track")} />
                </div>
                <button className="btn-gold" onClick={() => setPage("track")}>Track →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="sp-section">
        <div className="sp-eyebrow">Services</div>
        <h2 className="sp-section-title">Built for Kenya's terrain</h2>
        <p className="sp-section-sub">Six tiers of delivery designed around how Kenya actually works — not copy-pasted from overseas logistics.</p>
        <div className="sp-services-grid">
          {[
            { icon: "⚡", title: "Express Delivery", desc: "Same-day delivery within Nairobi and major towns. Guaranteed before 6 pm.", tag: "< 6 hrs" },
            { icon: "🗺️", title: "Countrywide", desc: "Standard 1–3 day delivery to all 47 counties including remote regions.", tag: "1–3 days" },
            { icon: "📦", title: "Bulk & Business", desc: "Volume discounts and API integration for e-commerce businesses.", tag: "Custom rates" },
            { icon: "🔒", title: "Insured Parcels", desc: "Optional cover up to KSh 100,000 for high-value or fragile items.", tag: "Optional" },
            { icon: "❄️", title: "Fragile & Special", desc: "Dedicated packaging and white-glove handling for electronics and glass.", tag: "Special care" },
            { icon: "📱", title: "Real-time Tracking", desc: "SMS and app updates at every checkpoint. Always know where it is.", tag: "Live" },
          ].map(s => (
            <div className="sp-service-card" key={s.title}>
              <span className="sp-service-icon">{s.icon}</span>
              <div className="sp-service-title">{s.title}</div>
              <p className="sp-service-desc">{s.desc}</p>
              <span className="sp-service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <div className="sp-process-section">
        <div className="sp-process-inner">
          <div className="sp-process-header">
            <div className="sp-eyebrow">Simple process</div>
            <h2 className="sp-section-title">How it works</h2>
          </div>
          <div className="sp-process-steps">
            {[
              { n: "01", icon: "📝", title: "Book online", desc: "Fill in sender and recipient details, select your service tier in under 60 seconds." },
              { n: "02", icon: "🚐", title: "We collect", desc: "A verified rider collects from your door within the scheduled time window." },
              { n: "03", icon: "🛣️", title: "In transit", desc: "Your parcel moves through our network with live tracking at every checkpoint." },
              { n: "04", icon: "🎉", title: "Delivered", desc: "Recipient receives SMS + WhatsApp confirmation on successful delivery." },
            ].map(s => (
              <div className="sp-process-step" key={s.n}>
                <div className="sp-process-num-wrap">
                  <div className="sp-process-num">{s.n}</div>
                </div>
                <div className="sp-process-emoji">{s.icon}</div>
                <div className="sp-process-title">{s.title}</div>
                <p className="sp-process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="sp-process-cta">
            <p className="sp-process-cta-text">Ready to send your first parcel?</p>
            <button className="btn-hero-primary" onClick={() => setPage("book")}>Book a delivery →</button>
          </div>
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="sp-footer-strip">
        <div className="sp-footer-brand">
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 12px var(--gold)" }} />
          SpeedPak
        </div>
        <div className="sp-footer-links">
          {["Services", "Track", "About", "Careers", "Contact"].map(l => (
            <span key={l} onClick={() => setPage(l.toLowerCase())}>{l}</span>
          ))}
        </div>
        <div className="sp-footer-copy">© 2025 SpeedPak Kenya · All 47 Counties</div>
      </div>
    </div>
  );
}