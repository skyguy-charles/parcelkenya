import { useState } from "react";

const DEMO_RESULT = {
  id:      "SPK-001234",
  status:  "In Transit",
  from:    "Nairobi CBD Hub",
  to:      "Mombasa — Moi Avenue",
  eta:     "Tomorrow, 29 Apr 2025",
  weight:  "2.3 kg",
  service: "Standard",
  events: [
    { time:"28 Apr · 8:14 am",         desc:"Parcel collected from sender",      loc:"Westlands, Nairobi",     status:"done"     },
    { time:"28 Apr · 10:32 am",        desc:"Arrived at Nairobi sorting hub",    loc:"Industrial Area",        status:"done"     },
    { time:"28 Apr · 2:45 pm",         desc:"Departed — in transit to Mombasa",  loc:"Mlolongo checkpoint",    status:"done"     },
    { time:"29 Apr · 6:00 am (est.)",  desc:"Arriving at Mombasa branch",        loc:"Moi Avenue, Mombasa",    status:"current"  },
    { time:"29 Apr · 10:00 am (est.)", desc:"Out for final delivery",            loc:"Mombasa Island",         status:"upcoming" },
    { time:"29 Apr (est.)",            desc:"Delivered to recipient",            loc:"Mombasa",                status:"upcoming" },
  ],
};

export default function TrackPage() {
  const [id, setId]       = useState("");
  const [result, setResult] = useState(null);

  const doTrack = (override) => {
    const val = (override || id).trim();
    if (!val) return;
    setResult({ ...DEMO_RESULT, id: val.toUpperCase() });
  };

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <div className="page-eyebrow">Live Tracking</div>
        <h1 className="page-title">Track your parcel</h1>
      </div>

      <div style={{ maxWidth:720 }}>
        {/* Search */}
        <div className="track-search-card">
          <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:"14px" }}>Enter Tracking ID</div>
          <div style={{ display:"flex", gap:"10px" }}>
            <div className="qt-input-wrap" style={{ flex:1 }}>
              <span className="qt-input-icon">📦</span>
              <input
                placeholder="e.g. SPK-001234"
                value={id}
                onChange={e => setId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && doTrack()}
              />
            </div>
            <button className="btn btn-primary" onClick={() => doTrack()}>Track →</button>
          </div>
          <div style={{ marginTop:"10px", fontSize:"0.75rem", color:"var(--ink-60)" }}>
            Demo:{" "}
            <span
              style={{ color:"var(--sage-light)", cursor:"pointer", fontFamily:"var(--mono)", fontWeight:600 }}
              onClick={() => { setId("SPK-001234"); doTrack("SPK-001234"); }}
            >
              SPK-001234
            </span>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="track-result-card animate-in">
            <div className="track-result-header">
              <div style={{ position:"relative" }}>
                <div className="track-id-label">Tracking ID</div>
                <div className="track-id-val">{result.id}</div>
                <div className="track-route">{result.from} → {result.to}</div>
              </div>
              <div className="track-status-pill">
                <div className="status-pulse"></div>
                🚚 {result.status}
              </div>
            </div>

            <div className="track-body">
              <div className="track-details-row">
                {[
                  { l:"ETA",          v: result.eta     },
                  { l:"Weight",       v: result.weight  },
                  { l:"Service tier", v: result.service },
                ].map(d => (
                  <div className="track-detail-box" key={d.l}>
                    <div className="lbl">{d.l}</div>
                    <div className="val">{d.v}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontWeight:700, fontSize:"0.88rem", marginBottom:"16px", letterSpacing:"-0.2px" }}>
                Delivery Timeline
              </div>
              <div className="timeline">
                {result.events.map((ev, i) => (
                  <div key={i} className="tl-item">
                    <div className={`tl-dot ${ev.status}`} />
                    <div className="tl-time">{ev.time}</div>
                    <div className={`tl-desc ${ev.status === "upcoming" ? "dim" : ""}`}>{ev.desc}</div>
                    <div className="tl-loc">📍 {ev.loc}</div>
                  </div>
                ))}
              </div>

              <div className="sms-alert">
                <div className="sms-alert-dot"></div>
                <div className="sms-alert-text">
                  <div className="t1">SMS alerts active</div>
                  <div className="t2">Updates being sent to +254 7** *** 890</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}