
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   COUNTER HOOK — counts up on mount
───────────────────────────────────────────── */
function useCounter(target, duration = 2000) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const num = parseFloat(target);
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);

      setVal(Math.floor(ease * num * 10) / 10);

      if (p < 1) ref.current = requestAnimationFrame(tick);
    };

    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return val;
}

function Counter({ target, suffix, prefix }) {
  const val = useCounter(target, 2200);
  const display = Number.isInteger(parseFloat(target))
    ? Math.floor(val).toLocaleString()
    : val.toFixed(1);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

/* ─────────────────────────────────────────────
   CSS (RESPONSIVE FIXES INCLUDED)
───────────────────────────────────────────── */
const CSS = `
:root {
  --bg:#080A0F;
  --bg2:#0D1018;
  --surface:#161B27;
  --bord2:rgba(255,255,255,0.13);
  --border:rgba(255,255,255,0.07);
  --gold:#F5A623;
  --gold2:#FFCB6B;
  --w:#F0F2F8;
  --w40:rgba(240,242,248,0.4);
  --w70:rgba(240,242,248,0.7);
  --mono: monospace;
  --disp: system-ui;
  --sans: system-ui;
}

/* RESET */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.lp{font-family:var(--sans);background:var(--bg);color:var(--w);overflow-x:hidden}

/* ───── RESPONSIVE HELPERS ───── */
.lp-inner{max-width:1200px;margin:auto;padding:0 60px}
@media (max-width:1024px){
  .lp-inner{padding:0 32px}
}
@media (max-width:768px){
  .lp-inner{padding:0 18px}
}

/* ───── NAV ───── */
.lp-nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  height:64px;display:flex;align-items:center;
  padding:0 60px;
  background:rgba(8,10,15,.9);
  backdrop-filter:blur(20px);
}
.lp-nav-links{display:flex;gap:24px;margin:auto}
@media (max-width:768px){
  .lp-nav{padding:0 16px}
  .lp-nav-links{display:none}
}

/* ───── HERO ───── */
.lp-hero{
  display:grid;
  grid-template-columns:1fr 1fr;
  min-height:100vh;
  padding:120px 60px 60px;
  gap:40px;
  align-items:center;
}
@media (max-width:1024px){
  .lp-hero{padding:100px 32px}
}
@media (max-width:768px){
  .lp-hero{
    grid-template-columns:1fr;
    text-align:center;
    padding:100px 18px 60px;
  }
}

/* HERO TEXT */
.lp-hero-h1{
  font-size:clamp(2.2rem,6vw,5rem);
  line-height:1.05;
}

/* HERO VISUAL */
.lp-hero-visual{
  display:flex;
  justify-content:center;
}
@media (max-width:768px){
  .lp-hero-visual{transform:scale(.85)}
}

/* ───── METRICS ───── */
.lp-metrics-inner{
  display:grid;
  grid-template-columns:repeat(4,1fr);
}
@media (max-width:1024px){
  .lp-metrics-inner{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:600px){
  .lp-metrics-inner{grid-template-columns:1fr}
}

/* ───── HOW IT WORKS ───── */
.lp-how-steps{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
}
@media (max-width:1024px){
  .lp-how-steps{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:600px){
  .lp-how-steps{grid-template-columns:1fr}
}

/* ───── SERVICES ───── */
.lp-srv-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
}
@media (max-width:1024px){
  .lp-srv-grid{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:600px){
  .lp-srv-grid{grid-template-columns:1fr}
}

/* ───── TESTIMONIALS ───── */
.lp-testi-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
}
@media (max-width:1024px){
  .lp-testi-grid{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:600px){
  .lp-testi-grid{grid-template-columns:1fr}
}

/* ───── PRICING ───── */
.lp-pricing-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
}
@media (max-width:1024px){
  .lp-pricing-grid{grid-template-columns:1fr}
}

/* ───── FOOTER ───── */
.lp-footer-top{
  display:grid;
  grid-template-columns:2fr 1fr 1fr 1fr;
}
@media (max-width:1024px){
  .lp-footer-top{grid-template-columns:1fr 1fr}
}
@media (max-width:600px){
  .lp-footer-top{grid-template-columns:1fr}
}

/* ───── HERO CARDS FIX ───── */
.lp-cards-scene{
  transform:scale(1);
}
@media (max-width:768px){
  .lp-cards-scene{
    transform:scale(.75);
  }
}
@media (max-width:480px){
  .lp-cards-scene{
    transform:scale(.62);
  }
}
`;

export default function LandingPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="lp">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="lp-nav">
        <div style={{ fontWeight: 800 }}>SpeedPak</div>
        <div className="lp-nav-links">
          <span>Home</span>
          <span>Services</span>
          <span>Track</span>
          <span>Pricing</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div>
          <h1 className="lp-hero-h1">
            Send parcels across Kenya effortlessly.
          </h1>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-cards-scene">
            {/* simplified for mobile safety */}
            <div
              style={{
                width: 260,
                height: 320,
                background: "#161B27",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,.1)",
              }}
            />
          </div>
        </div>
      </section>

      {/* METRICS */}
      <div className="lp-metrics-inner">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ padding: 20 }}>
            Metric {i}
          </div>
        ))}
      </div>
    </div>
  );
}