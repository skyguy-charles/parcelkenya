import { useState } from "react";
import { ZONES, BRANCHES } from "../data/Constants";
import Footer from "../components/layout/Footer";
export default function CoveragePage({ setPage }) {
  const [active, setActive] = useState(null);

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <div className="page-eyebrow">Network Coverage</div>
        <h1 className="page-title">All <span>47 Counties.</span><br />One Network.</h1>
        <p className="page-desc">Urban express, rural last-mile — SwiftParcel delivers everywhere.</p>
      </div>

      {/* Stats */}
      <div className="stats-row" style={{ gridTemplateColumns:"repeat(4,1fr)" }}>
        {[
          { v:"47",     l:"Counties covered"  },
          { v:"6",      l:"Regional hubs"     },
          { v:"200+",   l:"Pickup agents"     },
          { v:"12 hrs", l:"Avg. urban transit" },
        ].map(s => (
          <div className="stat-card green" key={s.l}>
            <div className="stat-value">{s.v}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Delivery Zones */}
      <div style={{ marginBottom:"32px" }}>
        <h3 style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:"16px" }}>Delivery Zones</h3>
        <div className="zone-grid">
          {ZONES.map(z => (
            <div
              key={z.region}
              className={`zone-card ${active === z.region ? "active" : ""}`}
              onClick={() => setActive(active === z.region ? null : z.region)}
            >
              <div className="zone-card-top">
                <div className="zone-icon-wrap">{z.icon}</div>
                <div>
                  <div className="zone-name">{z.region}</div>
                  <div className="zone-count">{z.counties.length} counties</div>
                </div>
              </div>
              <div className="zone-speed">{z.speed}</div>
              {active === z.region && (
                <div className="zone-counties">
                  {z.counties.map(c => <span className="county-chip" key={c}>{c}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Branches */}
      <div>
        <h3 style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:"16px" }}>Branch Offices</h3>
        <div className="grid-2">
          {BRANCHES.map(b => (
            <div className="branch-card" key={b.city}>
              <div className="branch-icon-wrap">{b.icon}</div>
              <div className="branch-info">
                <h4>{b.city}</h4>
                <p>📍 {b.addr}</p>
                <p>🕐 {b.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}