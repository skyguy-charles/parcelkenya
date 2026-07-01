import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --bg:#080A0F;
  --bg2:#0D1018;
  --surface:#161B27;
  --surface2:#1C2334;
  --border:rgba(255,255,255,0.08);
  --border2:rgba(255,255,255,0.14);
  --gold:#F5A623;
  --gold2:#FFCB6B;
  --sage:#5EC4A1;
  --white:#F0F2F8;
  --white70:rgba(240,242,248,0.7);
  --white40:rgba(240,242,248,0.4);
  --white20:rgba(240,242,248,0.2);
  --white08:rgba(240,242,248,0.08);
  --mono:'JetBrains Mono', monospace;
  --sans:'DM Sans', sans-serif;
  --display:'Syne', sans-serif;
  --ease:cubic-bezier(0.22,1,0.36,1);
}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  overflow-x:hidden;
}

.sp-home{
  background:var(--bg);
  color:var(--white);
  font-family:var(--sans);
  overflow-x:hidden;
  width:100%;
}

/* NAV */

.sp-nav{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:1000;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 40px;
  height:70px;
  background:rgba(8,10,15,0.9);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
}

.sp-nav.scrolled{
  background:rgba(8,10,15,0.97);
}

.sp-nav-logo{
  display:flex;
  align-items:center;
  gap:10px;
  font-family:var(--display);
  font-weight:800;
  font-size:1.2rem;
}

.sp-nav-logo-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:var(--gold);
  box-shadow:0 0 12px var(--gold);
}

.sp-nav-links{
  display:flex;
  align-items:center;
  gap:18px;
}

.sp-nav-cta{
  display:flex;
  align-items:center;
  gap:12px;
}

.btn-gold-sm{
  background:var(--gold);
  color:black;
  border:none;
  padding:10px 18px;
  border-radius:10px;
  font-weight:700;
  cursor:pointer;
  transition:0.3s;
}

.btn-gold-sm:hover{
  background:var(--gold2);
}

/* HERO */

.sp-hero{
  min-height:100vh;
  position:relative;
  display:flex;
  align-items:center;
  padding:120px 80px 80px;
}

.sp-hero-bg{
  position:absolute;
  inset:0;
}

.sp-hero-grid{
  position:absolute;
  inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size:55px 55px;
}

.sp-hero-orb1{
  position:absolute;
  width:700px;
  height:700px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(245,166,35,0.12), transparent 70%);
  top:-250px;
  right:-200px;
  filter:blur(70px);
}

.sp-hero-orb2{
  position:absolute;
  width:450px;
  height:450px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(94,196,161,0.08), transparent 70%);
  bottom:-150px;
  left:-100px;
  filter:blur(80px);
}

.sp-hero-content{
  position:relative;
  z-index:2;
  max-width:760px;
}

.sp-hero-badge{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:7px 16px;
  border-radius:100px;
  border:1px solid rgba(245,166,35,0.3);
  background:rgba(245,166,35,0.08);
  color:var(--gold);
  font-family:var(--mono);
  font-size:0.72rem;
  margin-bottom:26px;
}

.sp-hero-badge-dot{
  width:6px;
  height:6px;
  border-radius:50%;
  background:var(--gold);
}

.sp-hero-h1{
  font-family:var(--display);
  font-size:clamp(3rem,7vw,5.5rem);
  line-height:1;
  font-weight:800;
  letter-spacing:-3px;
  margin-bottom:24px;
}

.sp-hero-h1 em{
  font-style:normal;
  background:linear-gradient(135deg,var(--gold),var(--gold2));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.sp-hero-p{
  font-size:1rem;
  line-height:1.9;
  color:var(--white40);
  max-width:550px;
  margin-bottom:40px;
}

.sp-hero-actions{
  display:flex;
  gap:14px;
  flex-wrap:wrap;
}

.btn-hero-primary{
  background:var(--gold);
  color:black;
  border:none;
  padding:15px 28px;
  border-radius:12px;
  font-weight:700;
  cursor:pointer;
}

.sp-hero-metrics{
  margin-top:60px;
  padding-top:40px;
  border-top:1px solid var(--border);
  display:flex;
  gap:40px;
  flex-wrap:wrap;
}

.sp-hero-metric-val{
  font-size:2rem;
  font-family:var(--display);
  font-weight:800;
}

.sp-hero-metric-val span{
  color:var(--gold);
}

.sp-hero-metric-lbl{
  color:var(--white40);
  font-size:0.78rem;
  margin-top:6px;
}

/* STATS */

.sp-stats{
  background:var(--surface);
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
}

.sp-stats-inner{
  max-width:1200px;
  margin:auto;
  display:grid;
  grid-template-columns:repeat(4,1fr);
}

.sp-stat{
  padding:40px 30px;
  border-right:1px solid var(--border);
}

.sp-stat:last-child{
  border-right:none;
}

.sp-stat-icon{
  font-size:1.5rem;
  margin-bottom:15px;
}

.sp-stat-val{
  font-size:2rem;
  font-family:var(--display);
  font-weight:800;
}

.sp-stat-lbl{
  color:var(--white40);
  margin-top:6px;
}

.sp-stat-chg{
  margin-top:10px;
  font-size:0.78rem;
}

.up{
  color:var(--sage);
}

.dn{
  color:#ff7b7b;
}

/* VIDEO SECTION */

.video-section{
  padding:90px 80px;
  border-bottom:1px solid var(--border);
}

.video-grid{
  max-width:1200px;
  margin:auto;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
}

.video-box{
  border-radius:20px;
  overflow:hidden;
  border:1px solid var(--border2);
}

.video-box video{
  width:100%;
  display:block;
}

.video-content h2{
  font-size:2.2rem;
  line-height:1.2;
  margin-bottom:20px;
  font-family:var(--display);
}

.video-content p{
  color:var(--white40);
  line-height:1.8;
}

/* SERVICES */

.sp-section{
  max-width:1200px;
  margin:auto;
  padding:100px 40px;
}

.sp-eyebrow{
  color:var(--gold);
  font-size:0.75rem;
  letter-spacing:2px;
  text-transform:uppercase;
  margin-bottom:16px;
}

.sp-section-title{
  font-size:clamp(2rem,5vw,3rem);
  font-family:var(--display);
  font-weight:800;
}

.sp-section-sub{
  color:var(--white40);
  line-height:1.8;
  margin-top:14px;
  max-width:650px;
}

.sp-services-grid{
  margin-top:50px;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

.sp-service-card{
  background:var(--bg2);
  border:1px solid var(--border);
  border-radius:18px;
  padding:30px;
}

.sp-service-icon{
  font-size:2rem;
  display:block;
  margin-bottom:20px;
}

.sp-service-title{
  font-size:1.1rem;
  font-weight:700;
  margin-bottom:10px;
}

.sp-service-desc{
  color:var(--white40);
  line-height:1.7;
  margin-bottom:18px;
}

.sp-service-tag{
  display:inline-block;
  background:rgba(245,166,35,0.08);
  border:1px solid rgba(245,166,35,0.2);
  color:var(--gold);
  padding:6px 10px;
  border-radius:8px;
  font-size:0.72rem;
}

/* FOOTER */

.sp-footer-strip{
  padding:40px;
  border-top:1px solid var(--border);
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:20px;
}

.sp-footer-brand{
  display:flex;
  align-items:center;
  gap:10px;
  font-family:var(--display);
  font-weight:800;
}

.sp-footer-links{
  display:flex;
  gap:20px;
  flex-wrap:wrap;
}

.sp-footer-links span{
  color:var(--white40);
  cursor:pointer;
}

.sp-footer-copy{
  color:var(--white20);
  font-size:0.8rem;
}

/* MOBILE */

@media(max-width:992px){

  .sp-hero{
    padding:120px 30px 80px;
  }

  .video-section{
    padding:70px 30px;
  }

  .video-grid{
    grid-template-columns:1fr;
  }

  .sp-services-grid{
    grid-template-columns:1fr 1fr;
  }

  .sp-stats-inner{
    grid-template-columns:1fr 1fr;
  }
}

@media(max-width:768px){

  .sp-nav{
    padding:0 18px;
  }

  .sp-nav-cta{
    gap:8px;
  }

  .btn-gold-sm{
    padding:8px 12px;
    font-size:0.8rem;
  }

  .sp-hero{
    padding:110px 20px 70px;
  }

  .sp-hero-h1{
    letter-spacing:-2px;
  }

  .sp-hero-metrics{
    gap:24px;
  }

  .sp-section{
    padding:80px 20px;
  }

  .sp-services-grid{
    grid-template-columns:1fr;
  }

  .sp-stats-inner{
    grid-template-columns:1fr;
  }

  .sp-footer-strip{
    padding:30px 20px;
    flex-direction:column;
    align-items:flex-start;
  }
}
`;

const videoSteps = [
  {
    title: "Pack & book in seconds",
    desc: "Fill in sender and recipient details quickly using our modern booking flow.",
    mp4: "https://assets.mixkit.co/videos/42137/42137-720.mp4",
  },
  {
    title: "We transport it safely",
    desc: "A verified rider collects your parcel and transports it securely.",
    mp4: "https://assets.mixkit.co/videos/42130/42130-720.mp4",
  },
  {
    title: "Delivered within nairobi",
    desc: "Recipient receives alerts and digital proof of delivery instantly.",
    mp4: "https://assets.mixkit.co/videos/31155/31155-720.mp4",
  },
];

export default function HomePage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sp-home">
      <style>{CSS}</style>

      <nav className={`sp-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="sp-nav-logo">
          <div className="sp-nav-logo-dot" />
          SpeedPak
        </div>

        <div className="sp-nav-links"></div>

        <div className="sp-nav-cta">
          <button
            className="btn-gold-sm"
            onClick={() => setPage("book")}
          >
            Send Now →
          </button>
        </div>
      </nav>

      <section className="sp-hero">
        <div className="sp-hero-bg">
          <div className="sp-hero-grid"></div>
          <div className="sp-hero-orb1"></div>
          <div className="sp-hero-orb2"></div>
        </div>

        <div className="sp-hero-content">
          <div className="sp-hero-badge">
            <div className="sp-hero-badge-dot"></div>
            Kenya's most trusted courier
          </div>

          <h1 className="sp-hero-h1">
            Deliver anywhere
            <br />
            in Kenya, <em>fast.</em>
          </h1>

          <p className="sp-hero-p">
            Reliable parcel delivery across all 47 counties with real-time
            tracking and fast nationwide service.
          </p>

          <div className="sp-hero-actions">
            <button
              className="btn-hero-primary"
              onClick={() => setPage("book")}
            >
              Send a Parcel →
            </button>
          </div>

          <div className="sp-hero-metrics">
            {[
              { v: "47", u: "", l: "Counties Covered" },
              { v: "1.2", u: "M+", l: "Parcels Delivered" },
              { v: "98.4", u: "%", l: "On-time Rate" },
              { v: "24/7", u: "", l: "Live Support" },
            ].map((m) => (
              <div key={m.l}>
                <div className="sp-hero-metric-val">
                  {m.v}
                  <span>{m.u}</span>
                </div>

                <div className="sp-hero-metric-lbl">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-stats">
        <div className="sp-stats-inner">
          {[
            {
              icon: "📦",
              val: "1,284",
              lbl: "Parcels today",
              chg: "↑ +12%",
              up: true,
            },
            {
              icon: "💰",
              val: "KSh 324K",
              lbl: "Revenue today",
              chg: "↑ +8%",
              up: true,
            },
            {
              icon: "🚐",
              val: "47",
              lbl: "Active riders",
              chg: "↑ Online",
              up: true,
            },
            {
              icon: "⏱",
              val: "98.1%",
              lbl: "On-time rate",
              chg: "↓ -0.3%",
              up: false,
            },
          ].map((s) => (
            <div className="sp-stat" key={s.lbl}>
              <div className="sp-stat-icon">{s.icon}</div>

              <div className="sp-stat-val">{s.val}</div>

              <div className="sp-stat-lbl">{s.lbl}</div>

              <div className={`sp-stat-chg ${s.up ? "up" : "dn"}`}>
                {s.chg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {videoSteps.map((step, index) => (
        <section className="video-section" key={index}>
          <div className="video-grid">
            <div className="video-box">
              <video autoPlay muted loop playsInline>
                <source src={step.mp4} type="video/mp4" />
              </video>
            </div>

            <div className="video-content">
              <h2>{step.title}</h2>
              <p>{step.desc}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="sp-section">
        <div className="sp-eyebrow">Services</div>

        <h2 className="sp-section-title">
          Built for Kenya's terrain
        </h2>

        <p className="sp-section-sub">
          Delivery services designed specifically for Kenya's roads,
          businesses, and customers.
        </p>

        <div className="sp-services-grid">
          {[
            {
              icon: "⚡",
              title: "Express Delivery",
              desc: "Fast same-day delivery within Nairobi.",
              tag: "< 6 hrs",
            },
            {
              icon: "🗺️",
              title: "Countrywide",
              desc: "Delivery to all 47 counties in Kenya.",
              tag: "1–3 days",
            },
            {
              icon: "📦",
              title: "Bulk & Business",
              desc: "Affordable bulk logistics for businesses.",
              tag: "Custom",
            },
            {
              icon: "🔒",
              title: "Insured Parcels",
              desc: "Insurance cover for valuable deliveries.",
              tag: "Protected",
            },
            {
              icon: "❄️",
              title: "Fragile Handling",
              desc: "Extra care for sensitive parcels.",
              tag: "Special",
            },
            {
              icon: "📱",
              title: "Real-time Tracking",
              desc: "Track parcels live anytime.",
              tag: "Live",
            },
          ].map((s) => (
            <div className="sp-service-card" key={s.title}>
              <span className="sp-service-icon">{s.icon}</span>

              <div className="sp-service-title">{s.title}</div>

              <p className="sp-service-desc">{s.desc}</p>

              <span className="sp-service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="sp-footer-strip">
        <div className="sp-footer-brand">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--gold)",
            }}
          ></div>

          SpeedPak
        </div>

        <div className="sp-footer-links">
          <span>Services</span>
          <span>Contact</span>
        </div>

        <div className="sp-footer-copy">
          © 2025 SpeedPak Kenya
        </div>
      </div>
    </div>
  );
}