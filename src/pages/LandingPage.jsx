import { useState, useEffect, useRef } from "react";

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

function Counter({ target, suffix }) {
  const val = useCounter(target, 2200);
  const display = Number.isInteger(parseFloat(target))
    ? Math.floor(val).toLocaleString()
    : val.toFixed(1);
  return <>{display}{suffix}</>;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg:      #080A0F;
    --bg2:     #0D1018;
    --surface: #161B27;
    --sur2:    #1C2334;
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
    --r:       14px;
    --r-lg:    22px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .lp { font-family: var(--sans); background: var(--bg); color: var(--w); overflow-x: hidden; }
  .lp-eyebrow { font-family: var(--mono); font-size: 0.67rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); }
  .lp-h2 { font-family: var(--disp); font-size: clamp(1.7rem, 5vw, 2.8rem); font-weight: 800; letter-spacing: -1.2px; line-height: 1.08; color: var(--w); }
  .lp-h2 em { font-style: normal; background: linear-gradient(135deg,var(--gold),var(--gold2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .lp-sub { font-size: .95rem; font-weight: 300; color: var(--w40); line-height: 1.85; max-width: 480px; }
  .lp-inner { max-width: 1200px; margin: 0 auto; padding: 0 60px; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 8px var(--gold), 0 0 18px rgba(245,166,35,.3); } 50% { box-shadow: 0 0 18px var(--gold), 0 0 36px rgba(245,166,35,.55); } }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
  @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes fcMain   { 0%,100%{transform:translate(-50%,-50%) rotate(-2deg) translateY(0)}   50%{transform:translate(-50%,-50%) rotate(-1deg) translateY(-16px)} }
  @keyframes fcStatus { 0%,100%{transform:rotate(4deg) translateY(0)}   50%{transform:rotate(3deg) translateY(-20px)} }
  @keyframes fcRider  { 0%,100%{transform:rotate(-3deg) translateY(0)}  50%{transform:rotate(-2deg) translateY(-11px)} }
  @keyframes fcNotif  { 0%,100%{transform:rotate(2deg) translateY(0)}   50%{transform:rotate(1deg) translateY(-22px)} }
  @keyframes pfill { from{width:0} }

  /* NAV */
  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 64px; display: flex; align-items: center; padding: 0 60px;
    background: rgba(8,10,15,.80); backdrop-filter: blur(28px) saturate(180%);
    border-bottom: 1px solid var(--border); transition: background .35s var(--ease), border-color .35s var(--ease);
  }
  .lp-nav.solid { background: rgba(8,10,15,.97); border-color: var(--bord2); }
  .lp-nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; font-family: var(--disp); font-size: 1.15rem; font-weight: 800; letter-spacing: -.4px; color: var(--w); flex-shrink: 0; }
  .lp-nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
  .lp-nav-links { display: flex; gap: 30px; margin: 0 auto; font-size: .84rem; color: var(--w40); }
  .lp-nav-links span { cursor: pointer; transition: color .2s; white-space: nowrap; }
  .lp-nav-links span:hover { color: var(--w); }
  .lp-nav-right { display: flex; gap: 10px; flex-shrink: 0; }
  .lp-nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; margin-left: auto; background: none; border: none; }
  .lp-nav-hamburger span { display: block; width: 22px; height: 2px; background: var(--w70); border-radius: 2px; transition: all .25s var(--ease); }
  .lp-nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
  .lp-nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .lp-nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
  .lp-mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(8,10,15,.98); backdrop-filter: blur(28px); border-bottom: 1px solid var(--bord2); z-index: 199; padding: 20px 24px 28px; flex-direction: column; gap: 0; }
  .lp-mobile-menu.open { display: flex; }
  .lp-mobile-menu-link { font-size: .95rem; color: var(--w70); padding: 14px 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: color .2s; }
  .lp-mobile-menu-link:hover { color: var(--w); }
  .lp-mobile-menu-actions { display: flex; gap: 10px; margin-top: 20px; }
  .lp-mobile-menu-actions button { flex: 1; }

  .btn-ghost { font-family: var(--sans); font-size: .82rem; font-weight: 500; cursor: pointer; color: var(--w70); background: transparent; border: 1px solid var(--bord2); padding: 7px 18px; border-radius: 9px; transition: all .2s; }
  .btn-ghost:hover { color: var(--w); border-color: rgba(255,255,255,.35); background: var(--w08); }
  .btn-gold { font-family: var(--sans); font-size: .84rem; font-weight: 700; cursor: pointer; color: #000; background: var(--gold); border: none; padding: 8px 22px; border-radius: 9px; transition: all .25s var(--ease); box-shadow: 0 4px 18px rgba(245,166,35,.28); }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(245,166,35,.4); }
  .btn-gold-lg { font-family: var(--sans); font-size: .97rem; font-weight: 700; cursor: pointer; color: #000; background: var(--gold); border: none; padding: 15px 36px; border-radius: 11px; transition: all .3s var(--ease); box-shadow: 0 8px 32px rgba(245,166,35,.32); white-space: nowrap; }
  .btn-gold-lg:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 16px 48px rgba(245,166,35,.45); }
  .btn-outline-lg { font-family: var(--sans); font-size: .97rem; font-weight: 500; cursor: pointer; color: var(--w70); background: var(--w08); border: 1px solid var(--bord2); padding: 15px 36px; border-radius: 11px; transition: all .3s var(--ease); white-space: nowrap; }
  .btn-outline-lg:hover { color: var(--w); background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.3); }

  /* HERO */
  .lp-hero { position: relative; min-height: 100vh; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 60px; padding: 120px 60px 80px; }
  .lp-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .lp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px); background-size: 54px 54px; mask-image: radial-gradient(ellipse 100% 100% at 50% 50%,black 20%,transparent 75%); }
  .lp-hero-orb-a { position: absolute; width: 750px; height: 750px; border-radius: 50%; background: radial-gradient(circle,rgba(245,166,35,.11) 0%,transparent 65%); top: -250px; right: -150px; filter: blur(70px); animation: float 9s ease-in-out infinite; }
  .lp-hero-orb-b { position: absolute; width: 450px; height: 450px; border-radius: 50%; background: radial-gradient(circle,rgba(94,196,161,.07) 0%,transparent 70%); bottom: -80px; left: -100px; filter: blur(80px); }
  .lp-hero-copy { position: relative; z-index: 2; }
  .lp-hero-badge { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: .67rem; letter-spacing: 1.8px; color: var(--gold); text-transform: uppercase; border: 1px solid rgba(245,166,35,.3); background: rgba(245,166,35,.06); padding: 6px 16px; border-radius: 100px; margin-bottom: 28px; animation: fadeUp .8s var(--ease) both; }
  .lp-hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
  .lp-hero-h1 { font-family: var(--disp); font-size: clamp(2.6rem,5.2vw,5rem); font-weight: 800; letter-spacing: -2.5px; line-height: 1.0; color: var(--w); margin-bottom: 24px; animation: fadeUp .8s .1s var(--ease) both; }
  .lp-hero-h1 em { font-style: normal; background: linear-gradient(135deg,var(--gold),var(--gold2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .lp-hero-p { font-size: 1.02rem; font-weight: 300; line-height: 1.88; color: var(--w40); max-width: 440px; margin-bottom: 40px; animation: fadeUp .8s .2s var(--ease) both; }
  .lp-hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 52px; animation: fadeUp .8s .3s var(--ease) both; }
  .lp-hero-trust { display: flex; align-items: center; gap: 10px; font-size: .78rem; color: var(--w40); font-family: var(--mono); letter-spacing: .5px; animation: fadeUp .8s .4s var(--ease) both; }
  .lp-hero-trust-faces { display: flex; }
  .lp-hero-face { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--bg); display: flex; align-items: center; justify-content: center; font-size: 12px; margin-left: -6px; background: var(--surface); }
  .lp-hero-face:first-child { margin-left: 0; }
  .lp-hero-stars { color: var(--gold); font-size: .7rem; letter-spacing: 1px; }
  .lp-hero-visual { position: relative; z-index: 2; height: 520px; display: flex; align-items: center; justify-content: center; animation: fadeUp .8s .2s var(--ease) both; }
  .lp-cards-scene { position: relative; width: 340px; height: 460px; }
  .lp-glow-bg { position: absolute; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle,rgba(245,166,35,.08) 0%,transparent 65%); top: 50%; left: 50%; transform: translate(-50%,-50%); filter: blur(30px); pointer-events: none; animation: pulse 4s ease-in-out infinite; }
  .lp-dots-bg { position: absolute; inset: -40px; background-image: radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px); background-size: 26px 26px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%); pointer-events: none; }
  .lp-fc { position: absolute; background: var(--surface); border: 1px solid var(--bord2); border-radius: 18px; padding: 18px 20px; box-shadow: 0 24px 64px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.03); transition: transform .3s var(--ease); }
  .lp-fc:hover { transform: scale(1.04) translateY(-6px) !important; z-index: 20 !important; }
  .lp-fc-main { width: 290px; top: 50%; left: 50%; transform: translate(-50%,-50%) rotate(-2deg); z-index: 10; background: linear-gradient(145deg,#1c2334,#161b27); border-color: rgba(245,166,35,.22); box-shadow: 0 32px 80px rgba(0,0,0,.65),0 0 0 1px rgba(245,166,35,.07),0 0 60px rgba(245,166,35,.06); animation: fcMain 6s ease-in-out infinite; }
  .lp-fc-status { width: 205px; top: 4px; right: -20px; z-index: 8; animation: fcStatus 7s .6s ease-in-out infinite; }
  .lp-fc-rider { width: 225px; bottom: 28px; left: -44px; z-index: 9; animation: fcRider 8s 1.2s ease-in-out infinite; }
  .lp-fc-notif { width: 190px; top: 64px; left: -52px; z-index: 7; padding: 12px 15px; animation: fcNotif 5.5s .4s ease-in-out infinite; }

  .fc-row { display:flex; align-items:center; justify-content:space-between; }
  .fc-id { font-family:var(--mono); font-size:.66rem; letter-spacing:1px; color:var(--w40); }
  .fc-pill { display:inline-flex; align-items:center; gap:5px; font-family:var(--mono); font-size:.62rem; letter-spacing:.5px; padding:3px 10px; border-radius:100px; }
  .fc-pill-dot { width:5px; height:5px; border-radius:50%; background:currentColor; animation:pulse 2s ease-in-out infinite; }
  .fc-transit   { background:rgba(245,166,35,.11); color:var(--gold); border:1px solid rgba(245,166,35,.25); }
  .fc-delivered { background:rgba(94,196,161,.1);  color:var(--sage); border:1px solid rgba(94,196,161,.25); }
  .fc-divider { height:1px; background:var(--border); margin:12px 0; }
  .fc-city { font-family:var(--disp); font-size:.88rem; font-weight:700; color:var(--w); letter-spacing:-.2px; }
  .fc-arrow { color:var(--gold); font-size:.72rem; margin:0 6px; }
  .fc-label { font-size:.69rem; color:var(--w40); font-family:var(--mono); }
  .fc-val { font-size:.76rem; color:var(--w70); font-weight:500; }
  .fc-val.gold { color:var(--gold); }
  .fc-val.sage { color:var(--sage); }
  .fc-progress-track { height:4px; background:var(--bord2); border-radius:2px; overflow:hidden; margin-top:14px; }
  .fc-progress-fill { height:100%; border-radius:2px; background:linear-gradient(90deg,var(--gold),var(--gold2)); animation:pfill 2.2s 1s var(--ease) both; }
  .fc-progress-lbls { display:flex; justify-content:space-between; margin-top:5px; font-family:var(--mono); font-size:.58rem; color:var(--w20); }
  .fc-avatar { width:32px; height:32px; border-radius:9px; flex-shrink:0; background:linear-gradient(135deg,rgba(245,166,35,.2),rgba(245,166,35,.07)); border:1px solid rgba(245,166,35,.25); display:flex; align-items:center; justify-content:center; font-family:var(--disp); font-size:.68rem; font-weight:800; color:var(--gold); }
  .fc-name { font-size:.76rem; font-weight:500; color:var(--w); }
  .fc-sub { font-size:.66rem; color:var(--w40); margin-top:1px; }
  .fc-notif-icon { width:26px; height:26px; border-radius:7px; flex-shrink:0; background:rgba(94,196,161,.1); border:1px solid rgba(94,196,161,.2); display:flex; align-items:center; justify-content:center; font-size:12px; }
  .fc-notif-title { font-size:.72rem; font-weight:500; color:var(--w); margin-bottom:2px; }
  .fc-notif-sub { font-size:.66rem; color:var(--w40); line-height:1.5; }

  /* TICKER */
  .lp-ticker { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); overflow: hidden; padding: 14px 0; position: relative; }
  .lp-ticker::before,.lp-ticker::after { content:''; position:absolute; top:0; bottom:0; width:80px; z-index:2; pointer-events:none; }
  .lp-ticker::before { left:0; background:linear-gradient(to right,var(--bg2),transparent); }
  .lp-ticker::after  { right:0; background:linear-gradient(to left,var(--bg2),transparent); }
  .lp-ticker-track { display:flex; gap:0; width:max-content; animation:tickerScroll 28s linear infinite; }
  .lp-ticker-track:hover { animation-play-state:paused; }
  .lp-ticker-item { display:inline-flex; align-items:center; gap:8px; padding:0 28px; font-size:.78rem; color:var(--w40); white-space:nowrap; font-family:var(--mono); letter-spacing:.3px; }
  .lp-ticker-dot { width:5px; height:5px; border-radius:50%; background:var(--sage); flex-shrink:0; }
  .lp-ticker-val { color:var(--w70); font-weight:500; }

  /* METRICS */
  .lp-metrics { border-bottom: 1px solid var(--border); background: var(--bg); }
  .lp-metrics-inner { display:grid; grid-template-columns:repeat(4,1fr); max-width:1200px; margin:0 auto; }
  .lp-metric { padding:44px 36px; border-right:1px solid var(--border); transition:background .25s; cursor:default; }
  .lp-metric:last-child { border-right:none; }
  .lp-metric:hover { background:var(--surface); }
  .lp-metric-num { font-family:var(--disp); font-size:2.4rem; font-weight:800; letter-spacing:-1.2px; color:var(--w); margin-bottom:4px; line-height:1; }
  .lp-metric-lbl { font-size:.78rem; color:var(--w40); font-family:var(--mono); letter-spacing:.5px; }
  .lp-metric-chg { font-size:.72rem; margin-top:6px; font-family:var(--mono); }
  .lp-metric-chg.up { color:var(--sage); }

  /* HOW IT WORKS */
  .lp-how { padding:110px 0; background:var(--bg2); border-bottom:1px solid var(--border); position:relative; overflow:hidden; }
  .lp-how-orb { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(245,166,35,.05) 0%,transparent 65%); right:-100px; top:50%; transform:translateY(-50%); filter:blur(60px); pointer-events:none; }
  .lp-how-header { margin-bottom:72px; }
  .lp-how-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
  .lp-how-steps::before { content:''; position:absolute; top:27px; left:8%; right:8%; height:1px; background:linear-gradient(90deg,transparent,var(--bord2) 20%,var(--bord2) 80%,transparent); }
  .lp-step { padding:0 28px; }
  .lp-step-num-box { width:54px; height:54px; border-radius:14px; background:var(--bg); border:1px solid var(--bord2); display:flex; align-items:center; justify-content:center; margin-bottom:28px; position:relative; z-index:1; transition:all .3s var(--ease); }
  .lp-step:hover .lp-step-num-box { background:rgba(245,166,35,.1); border-color:rgba(245,166,35,.4); box-shadow:0 0 30px rgba(245,166,35,.15); }
  .lp-step-n { font-family:var(--mono); font-size:.72rem; font-weight:500; color:var(--gold); letter-spacing:1px; }
  .lp-step-icon { font-size:1.4rem; margin-bottom:16px; }
  .lp-step-title { font-family:var(--disp); font-size:1rem; font-weight:700; letter-spacing:-.3px; color:var(--w); margin-bottom:10px; }
  .lp-step-desc { font-size:.8rem; color:var(--w40); line-height:1.75; }

  /* SERVICES GRID */
  .lp-services { padding:110px 0; background:var(--bg); }
  .lp-services-header { margin-bottom:60px; }
  .lp-srv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:22px; overflow:hidden; }
  .lp-srv { background:var(--bg2); padding:38px 34px; transition:background .3s var(--ease); cursor:pointer; position:relative; overflow:hidden; }
  .lp-srv::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(245,166,35,.04),transparent); opacity:0; transition:opacity .3s; }
  .lp-srv:hover { background:var(--surface); }
  .lp-srv:hover::after { opacity:1; }
  .lp-srv:hover .lp-srv-icon { transform:scale(1.12) rotate(-6deg); }
  .lp-srv-icon { font-size:2.1rem; margin-bottom:22px; display:block; transition:transform .3s var(--ease); }
  .lp-srv-title { font-family:var(--disp); font-size:1.05rem; font-weight:700; letter-spacing:-.3px; color:var(--w); margin-bottom:10px; }
  .lp-srv-desc { font-size:.82rem; color:var(--w40); line-height:1.72; margin-bottom:20px; }
  .lp-srv-tag { display:inline-block; font-family:var(--mono); font-size:.66rem; letter-spacing:.5px; color:var(--gold); background:rgba(245,166,35,.08); border:1px solid rgba(245,166,35,.2); padding:4px 10px; border-radius:6px; }
  .lp-srv-cta { margin-top:16px; font-size:.78rem; color:var(--gold); font-family:var(--mono); opacity:0; transition:opacity .25s; }
  .lp-srv:hover .lp-srv-cta { opacity:1; }

  /* TESTIMONIALS */
  .lp-testimonials { padding:110px 0; background:var(--bg2); border-top:1px solid var(--border); }
  .lp-testi-header { margin-bottom:64px; }
  .lp-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .lp-testi-card { background:var(--bg); border:1px solid var(--border); border-radius:18px; padding:30px 28px; transition:all .3s var(--ease); }
  .lp-testi-card:hover { border-color:var(--bord2); transform:translateY(-4px); box-shadow:0 20px 56px rgba(0,0,0,.4); }
  .lp-testi-stars { color:var(--gold); font-size:.75rem; letter-spacing:2px; margin-bottom:16px; }
  .lp-testi-text { font-size:.88rem; color:var(--w70); line-height:1.8; font-weight:300; margin-bottom:22px; font-style:italic; }
  .lp-testi-author { display:flex; align-items:center; gap:12px; }
  .lp-testi-av { width:36px; height:36px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:var(--disp); font-size:.75rem; font-weight:800; }
  .lp-testi-av.a { background:rgba(245,166,35,.15); border:1px solid rgba(245,166,35,.25); color:var(--gold); }
  .lp-testi-av.b { background:rgba(94,196,161,.12); border:1px solid rgba(94,196,161,.22); color:var(--sage); }
  .lp-testi-av.c { background:rgba(168,155,255,.12); border:1px solid rgba(168,155,255,.22); color:#A89BFF; }
  .lp-testi-name { font-size:.82rem; font-weight:600; color:var(--w); }
  .lp-testi-role { font-size:.73rem; color:var(--w40); }

  /* FAQ */
  .lp-faq { padding:110px 0; background:var(--bg2); border-top:1px solid var(--border); }
  .lp-faq-header { margin-bottom:60px; }
  .lp-faq-list { display:flex; flex-direction:column; gap:0; max-width:760px; }
  .lp-faq-item { border-bottom:1px solid var(--border); }
  .lp-faq-q { display:flex; justify-content:space-between; align-items:center; padding:22px 0; cursor:pointer; gap:16px; font-size:.95rem; font-weight:500; color:var(--w); transition:color .2s; }
  .lp-faq-q:hover { color:var(--gold); }
  .lp-faq-icon { width:24px; height:24px; border-radius:7px; flex-shrink:0; background:var(--w08); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:14px; color:var(--w40); transition:all .25s; }
  .lp-faq-item.open .lp-faq-icon { background:rgba(245,166,35,.1); border-color:rgba(245,166,35,.25); color:var(--gold); }
  .lp-faq-a { font-size:.875rem; color:var(--w40); line-height:1.8; font-weight:300; padding-bottom:20px; display:none; }
  .lp-faq-item.open .lp-faq-a { display:block; }

  /* FINAL CTA */
  .lp-final { padding:120px 0; background:var(--bg); border-top:1px solid var(--border); text-align:center; position:relative; overflow:hidden; }
  .lp-final-orb { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(245,166,35,.08) 0%,transparent 65%); left:50%; top:50%; transform:translate(-50%,-50%); filter:blur(70px); pointer-events:none; animation:pulse 5s ease-in-out infinite; }
  .lp-final-inner { position:relative; z-index:1; max-width:640px; margin:0 auto; }
  .lp-final-h2 { font-family:var(--disp); font-size:clamp(2rem,4.5vw,3.6rem); font-weight:800; letter-spacing:-1.5px; line-height:1.06; color:var(--w); margin:16px 0; }
  .lp-final-h2 em { font-style:normal; background:linear-gradient(135deg,var(--gold),var(--gold2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .lp-final-sub { font-size:.97rem; color:var(--w40); font-weight:300; line-height:1.8; margin-bottom:44px; }
  .lp-final-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .lp-final-note { margin-top:24px; font-size:.75rem; color:var(--w20); font-family:var(--mono); letter-spacing:.3px; }

  /* FOOTER */
  .lp-footer { background:var(--bg2); border-top:1px solid var(--border); padding:64px 60px 40px; }
  .lp-footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:40px; max-width:1200px; margin:0 auto 56px; }
  .lp-footer-brand { font-family:var(--disp); font-size:1.1rem; font-weight:800; color:var(--w); display:flex; align-items:center; gap:8px; margin-bottom:14px; }
  .lp-footer-dot { width:7px; height:7px; border-radius:50%; background:var(--gold); box-shadow:0 0 10px var(--gold); }
  .lp-footer-tagline { font-size:.82rem; color:var(--w40); line-height:1.7; max-width:240px; margin-bottom:20px; }
  .lp-footer-social { display:flex; gap:10px; }
  .lp-footer-social-btn { width:32px; height:32px; border-radius:8px; background:var(--w08); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:.85rem; cursor:pointer; transition:all .2s; color:var(--w40); }
  .lp-footer-social-btn:hover { background:rgba(245,166,35,.1); border-color:rgba(245,166,35,.25); color:var(--gold); }
  .lp-footer-col-title { font-family:var(--mono); font-size:.67rem; letter-spacing:2px; text-transform:uppercase; color:var(--w40); margin-bottom:16px; }
  .lp-footer-col-links { display:flex; flex-direction:column; gap:10px; }
  .lp-footer-link { font-size:.82rem; color:var(--w40); cursor:pointer; transition:color .2s; }
  .lp-footer-link:hover { color:var(--w); }
  .lp-footer-bottom { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding-top:24px; border-top:1px solid var(--border); flex-wrap:wrap; gap:12px; }
  .lp-footer-copy { font-size:.73rem; color:var(--w20); font-family:var(--mono); }
  .lp-footer-legal { display:flex; gap:20px; font-size:.73rem; color:var(--w20); font-family:var(--mono); }
  .lp-footer-legal span { cursor:pointer; transition:color .2s; }
  .lp-footer-legal span:hover { color:var(--w40); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .lp-nav { padding: 0 20px; height: 58px; }
    .lp-nav-links { display: none; }
    .lp-nav-right { display: none; }
    .lp-nav-hamburger { display: flex; }
    .lp-inner { padding: 0 20px; }
    .lp-hero { grid-template-columns: 1fr; padding: 90px 20px 60px; gap: 0; min-height: auto; }
    .lp-hero-h1 { font-size: clamp(2.4rem,10vw,3.4rem); letter-spacing: -1.5px; }
    .lp-hero-actions { flex-direction: column; align-items: stretch; }
    .btn-gold-lg, .btn-outline-lg { padding: 14px 24px; font-size: .92rem; }
    .lp-hero-visual { display: none; }
    .lp-metrics-inner { grid-template-columns: repeat(2,1fr); }
    .lp-metric { padding: 28px 20px; }
    .lp-how { padding: 70px 0; }
    .lp-how-steps { grid-template-columns: 1fr 1fr; gap: 32px 0; }
    .lp-how-steps::before { display: none; }
    .lp-step { padding: 0 20px; }
    .lp-services { padding: 70px 0; }
    .lp-srv-grid { grid-template-columns: 1fr; }
    .lp-testimonials { padding: 70px 0; }
    .lp-testi-grid { grid-template-columns: 1fr; }
    .lp-faq { padding: 70px 0; }
    .lp-final { padding: 80px 20px; }
    .lp-final-actions { flex-direction: column; align-items: stretch; }
    .lp-footer { padding: 48px 20px 32px; }
    .lp-footer-top { grid-template-columns: 1fr 1fr; gap: 36px 24px; }
    .lp-footer-top > div:first-child { grid-column: 1 / -1; }
    .lp-footer-bottom { flex-direction: column; align-items: flex-start; }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .lp-inner { padding: 0 32px; }
    .lp-nav { padding: 0 32px; }
    .lp-hero { padding: 100px 32px 80px; gap: 32px; }
    .lp-how-steps { grid-template-columns: repeat(2,1fr); gap: 40px; }
    .lp-how-steps::before { display: none; }
    .lp-srv-grid { grid-template-columns: repeat(2,1fr); }
    .lp-testi-grid { grid-template-columns: 1fr; }
    .lp-footer { padding: 48px 32px 32px; }
    .lp-footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
    .lp-footer-top > div:first-child { grid-column: 1 / -1; }
  }
`;

const TICKER = [
  "SPK-009123 delivered to Kisumu",
  "SPK-009124 collected in Westlands",
  "SPK-009125 in transit to Eldoret",
  "SPK-009126 delivered to Mombasa",
  "SPK-009127 collected in Karen",
  "SPK-009128 out for delivery — Nakuru",
  "SPK-009129 delivered to Thika",
  "SPK-009130 in transit — Nairobi → Nyeri",
];

const FAQS = [
  { q: "How long does countrywide delivery take?", a: "Standard delivery to all 47 counties takes 1–3 business days. Express same-day is available within Nairobi and major towns with a guaranteed 6 pm cutoff." },
  { q: "What items can I send?", a: "We handle documents, clothing, electronics, fragile items (with special packaging), and bulk business shipments. Prohibited items include perishables, liquids, hazardous materials, and anything restricted by Kenyan law." },
  { q: "Can I insure my parcel?", a: "Yes — optional cover up to KSh 100,000 is available at checkout for an additional fee. Recommended for electronics, jewellery, and high-value goods." },
  { q: "Do you offer API integration for businesses?", a: "Absolutely. Our Business API supports booking, tracking, webhook callbacks, and bulk manifests. Contact our team for a sandbox key." },
  { q: "What if the recipient is unavailable?", a: "The rider will attempt delivery twice. On the second failed attempt, the parcel is held at the nearest agent point for up to 5 days. The recipient is notified via SMS with collection instructions." },
];

export default function LandingPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNav = (pg) => {
    setMenuOpen(false);
    setPage?.(pg);
  };

  return (
    <div className="lp">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`lp-nav${scrolled ? " solid" : ""}`}>
        <div className="lp-nav-logo" onClick={() => handleNav("home")}>
          <div className="lp-nav-dot" />
          SwiftParcel
        </div>
        <div className="lp-nav-links">
          {[["home","Home"],["services","Services"],["about","About"]].map(([pg,lbl]) => (
            <span key={pg} onClick={() => handleNav(pg)}>{lbl}</span>
          ))}
        </div>
        <div className="lp-nav-right">
          <button className="btn-gold" onClick={() => handleNav("book")}>Send Now →</button>
        </div>
        <button
          className={`lp-nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`lp-mobile-menu${menuOpen ? " open" : ""}`}>
        {[["home","Home"],["services","Services"],["about","About"]].map(([pg,lbl]) => (
          <div className="lp-mobile-menu-link" key={pg} onClick={() => handleNav(pg)}>{lbl}</div>
        ))}
        <div className="lp-mobile-menu-actions">
          <button className="btn-gold" onClick={() => handleNav("book")}>Send Now →</button>
        </div>
      </div>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <div className="lp-hero-grid" />
          <div className="lp-hero-orb-a" />
          <div className="lp-hero-orb-b" />
        </div>

        <div className="lp-hero-copy">
          <div className="lp-hero-badge">
            <div className="lp-hero-badge-dot" />
            Kenya's #1 tech-first courier platform
          </div>
          <h1 className="lp-hero-h1">
            Send parcels<br />across Kenya<br /><em>effortlessly.</em>
          </h1>
          <p className="lp-hero-p">
            Book in 60 seconds. A verified rider collects from your door.
            Real-time GPS tracking all the way to 47 counties — from Nairobi CBD to Mandera.
          </p>
          <div className="lp-hero-actions">
            <button className="btn-gold-lg" onClick={() => handleNav("book")}>Send a Parcel →</button>
            <button className="btn-outline-lg" onClick={() => handleNav("services")}>View Services</button>
          </div>
          <div className="lp-hero-trust">
            <div className="lp-hero-trust-faces">
              {["👨🏾","👩🏽","👨🏿","👩🏾","👨🏽"].map((e,i) => (
                <div className="lp-hero-face" key={i}>{e}</div>
              ))}
            </div>
            <div>
              <div className="lp-hero-stars">★★★★★</div>
              <div style={{marginTop:2}}>Trusted by 18,000+ customers</div>
            </div>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-cards-scene">
            <div className="lp-glow-bg" />
            <div className="lp-dots-bg" />

            <div className="lp-fc lp-fc-main">
              <div className="fc-row" style={{marginBottom:14}}>
                <span className="fc-id">SPK-009421</span>
                <span className="fc-pill fc-transit"><span className="fc-pill-dot"/>In Transit</span>
              </div>
              <div style={{display:"flex",alignItems:"center",marginBottom:14}}>
                <span className="fc-city">Nairobi</span>
                <span className="fc-arrow">──▶</span>
                <span className="fc-city">Kisumu</span>
              </div>
              <div className="fc-divider"/>
              <div className="fc-row" style={{marginBottom:8}}>
                <span className="fc-label">Service</span>
                <span className="fc-val gold">Express · 6 hrs</span>
              </div>
              <div className="fc-row" style={{marginBottom:8}}>
                <span className="fc-label">ETA</span>
                <span className="fc-val">Today, 5:45 PM</span>
              </div>
              <div className="fc-row">
                <span className="fc-label">Insured</span>
                <span className="fc-val sage">✓ KSh 50K</span>
              </div>
              <div className="fc-progress-track" style={{marginTop:16}}>
                <div className="fc-progress-fill" style={{width:"68%"}}/>
              </div>
              <div className="fc-progress-lbls">
                <span>Collected</span><span>In Transit</span><span>Delivered</span>
              </div>
            </div>

            <div className="lp-fc lp-fc-status">
              <div className="fc-row" style={{marginBottom:10}}>
                <span className="fc-id">SPK-009399</span>
                <span className="fc-pill fc-delivered"><span className="fc-pill-dot"/>Delivered</span>
              </div>
              <div className="fc-divider"/>
              <div className="fc-row">
                <span className="fc-label">Mombasa</span>
                <span className="fc-val sage">✓ 2:18 PM</span>
              </div>
            </div>

            <div className="lp-fc lp-fc-rider">
              <div className="fc-label" style={{marginBottom:10}}>Your rider</div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div className="fc-avatar">JM</div>
                <div>
                  <div className="fc-name">James Mwangi</div>
                  <div className="fc-sub">⭐ 4.97 · 2,341 rides</div>
                </div>
              </div>
              <div className="fc-divider"/>
              <div className="fc-row">
                <span className="fc-label">ETA to you</span>
                <span className="fc-val gold">12 min away</span>
              </div>
            </div>

            <div className="lp-fc lp-fc-notif">
              <div style={{display:"flex",alignItems:"flex-start",gap:9}}>
                <div className="fc-notif-icon">✅</div>
                <div>
                  <div className="fc-notif-title">Parcel Delivered</div>
                  <div className="fc-notif-sub">SPK-009401 · Nakuru<br/>Signed by recipient</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="lp-ticker">
        <div className="lp-ticker-track">
          {[...TICKER,...TICKER].map((t,i) => (
            <span className="lp-ticker-item" key={i}>
              <span className="lp-ticker-dot"/>
              <span className="lp-ticker-val">{t.split(" ")[0]}</span>
              {" "}{t.split(" ").slice(1).join(" ")}
              <span style={{marginLeft:20,color:"var(--border)"}}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* METRICS */}
      <div className="lp-metrics">
        <div className="lp-metrics-inner">
          {[
            { target:47,   suffix:"",   label:"Counties Covered",  chg:"↑ All 47 active" },
            { target:1200, suffix:"K+", label:"Parcels Delivered",  chg:"↑ +18% this month" },
            { target:98.4, suffix:"%",  label:"On-time Rate",       chg:"↑ +0.2% vs last month" },
            { target:18,   suffix:"K+", label:"Happy Customers",    chg:"↑ Growing daily" },
          ].map((m,i) => (
            <div className="lp-metric" key={i}>
              <div className="lp-metric-num"><Counter target={m.target} suffix={m.suffix}/></div>
              <div className="lp-metric-lbl">{m.label}</div>
              <div className="lp-metric-chg up">{m.chg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="lp-how">
        <div className="lp-how-orb"/>
        <div className="lp-inner">
          <div className="lp-how-header">
            <div className="lp-eyebrow" style={{marginBottom:14}}>Simple process</div>
            <h2 className="lp-h2">From booking to<br/><em>doorstep delivery</em></h2>
          </div>
          <div className="lp-how-steps">
            {[
              {n:"01",icon:"📝",title:"Book online",  desc:"Fill sender & recipient details, pick a service tier, schedule pickup. Done in under 60 seconds."},
              {n:"02",icon:"🚐",title:"We collect",   desc:"A verified rider arrives at your door within your chosen time window. Track them live on the map."},
              {n:"03",icon:"🛣️",title:"In transit",   desc:"Your parcel moves through our network. SMS & WhatsApp updates fire at every checkpoint automatically."},
              {n:"04",icon:"🎉",title:"Delivered",    desc:"Recipient receives parcel + digital proof of delivery. You're notified instantly. Job done."},
            ].map(s => (
              <div className="lp-step" key={s.n}>
                <div className="lp-step-num-box"><span className="lp-step-n">{s.n}</span></div>
                <div className="lp-step-icon">{s.icon}</div>
                <div className="lp-step-title">{s.title}</div>
                <p className="lp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="lp-services">
        <div className="lp-inner">
          <div className="lp-services-header">
            <div className="lp-eyebrow" style={{marginBottom:14}}>What we offer</div>
            <h2 className="lp-h2">Built for <em>Kenya's terrain</em></h2>
            <p className="lp-sub" style={{marginTop:12}}>Six delivery tiers engineered around how Kenyan commerce actually moves.</p>
          </div>
          <div className="lp-srv-grid">
            {[
              {icon:"⚡",title:"Express Delivery",  desc:"Same-day within Nairobi & major towns. Guaranteed before 6 pm.",               tag:"< 6 hrs"},
              {icon:"🗺️",title:"Countrywide",        desc:"1–3 day delivery to all 47 counties — including remote upcountry regions.",     tag:"1–3 days"},
              {icon:"📦",title:"Bulk & Business",    desc:"Volume discounts, SLA guarantees, and full API integration for e-commerce.",   tag:"Custom rates"},
              {icon:"🔒",title:"Insured Parcels",    desc:"Optional cover up to KSh 100,000 for high-value or fragile items.",           tag:"Optional"},
              {icon:"❄️",title:"Fragile & Special",  desc:"White-glove handling, reinforced packaging for electronics & glass.",          tag:"Special care"},
              {icon:"📱",title:"Real-time Tracking", desc:"SMS + WhatsApp + app updates at every checkpoint. Know exactly where it is.", tag:"Live GPS"},
            ].map(s => (
              <div className="lp-srv" key={s.title} onClick={() => handleNav("services")}>
                <span className="lp-srv-icon">{s.icon}</span>
                <div className="lp-srv-title">{s.title}</div>
                <p className="lp-srv-desc">{s.desc}</p>
                <span className="lp-srv-tag">{s.tag}</span>
                <div className="lp-srv-cta">View all services →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lp-testimonials">
        <div className="lp-inner">
          <div className="lp-testi-header">
            <div className="lp-eyebrow" style={{marginBottom:14}}>Customer love</div>
            <h2 className="lp-h2">Trusted by <em>18,000+ Kenyans</em></h2>
          </div>
          <div className="lp-testi-grid">
            {[
              {av:"AW",cls:"a",stars:"★★★★★",text:"I run an online boutique in Nairobi and ship to 12 counties weekly. SwiftParcel cut my delivery complaints by 90%. The tracking alone is worth it.",name:"Amina Wanjiku",role:"Founder, StyleAfrica"},
              {av:"BK",cls:"b",stars:"★★★★★",text:"Sent a laptop from Westlands to my sister in Kisumu. It arrived in 5 hours with a photo of the delivery. Absolutely unreal. This is how it should work.",name:"Brian Kariuki",role:"Software Engineer, Nairobi"},
              {av:"FM",cls:"c",stars:"★★★★★",text:"We integrated the Business API and now process 800+ orders a month without touching a dashboard. The webhook callbacks are rock-solid.",name:"Faith Mutua",role:"CTO, Soko eCommerce"},
            ].map(t => (
              <div className="lp-testi-card" key={t.name}>
                <div className="lp-testi-stars">{t.stars}</div>
                <p className="lp-testi-text">"{t.text}"</p>
                <div className="lp-testi-author">
                  <div className={`lp-testi-av ${t.cls}`}>{t.av}</div>
                  <div>
                    <div className="lp-testi-name">{t.name}</div>
                    <div className="lp-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-faq">
        <div className="lp-inner">
          <div className="lp-faq-header">
            <div className="lp-eyebrow" style={{marginBottom:14}}>FAQ</div>
            <h2 className="lp-h2">Common <em>questions</em></h2>
          </div>
          <div className="lp-faq-list">
            {FAQS.map((f,i) => (
              <div className={`lp-faq-item${openFaq===i?" open":""}`} key={i}>
                <div className="lp-faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  {f.q}
                  <div className="lp-faq-icon">{openFaq===i?"−":"+"}</div>
                </div>
                <div className="lp-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-final">
        <div className="lp-final-orb"/>
        <div className="lp-final-inner">
          <div className="lp-eyebrow">Ready to ship?</div>
          <h2 className="lp-final-h2">Kenya delivered<br/><em>on time, every time.</em></h2>
          <p className="lp-final-sub">Join 18,000+ customers and businesses who trust SwiftParcel to move their world. Book your first delivery in under 60 seconds.</p>
          <div className="lp-final-actions">
            <button className="btn-gold-lg" onClick={() => handleNav("book")}>Send a Parcel →</button>
            <button className="btn-outline-lg" onClick={() => handleNav("about")}>Our Story</button>
          </div>
          <div className="lp-final-note">No account needed · Free first-time booking support · Cancel anytime</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div>
            <div className="lp-footer-brand"><div className="lp-footer-dot"/>SwiftParcel</div>
            <p className="lp-footer-tagline">Kenya's most trusted tech-first courier. 47 counties, real-time tracking, zero excuses.</p>
            <div className="lp-footer-social">
              {["𝕏","in","▶","📘"].map(s => <div className="lp-footer-social-btn" key={s}>{s}</div>)}
            </div>
          </div>
          {[
          ].map(col => (
            <div key={col.title}>
              <div className="lp-footer-col-title">{col.title}</div>
              <div className="lp-footer-col-links">
                {col.links.map(l => (
                  <div className="lp-footer-link" key={l}
                    onClick={() => l === "Services" ? handleNav("services") : l === "Send Parcel" ? handleNav("book") : l === "About Us" ? handleNav("about") : null}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="lp-footer-bottom">
          <div className="lp-footer-copy">© 2025 SwiftParcel Kenya Ltd · All 47 Counties · Nairobi HQ</div>
          <div className="lp-footer-legal">
            <span>Privacy Policy</span><span>Terms of Service</span><span>Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}