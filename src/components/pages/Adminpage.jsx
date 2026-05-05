import { useState } from "react";
import { SAMPLE_ORDERS } from "../../data/Constants";

const DRIVERS = [
  { name:"Peter Otieno",   id:"DRV-001", county:"Nairobi",  parcels:12, status:"active"   },
  { name:"Mary Achieng",   id:"DRV-002", county:"Mombasa",  parcels:8,  status:"active"   },
  { name:"Samuel Kipchoge",id:"DRV-003", county:"Nakuru",   parcels:5,  status:"inactive" },
  { name:"Grace Wambui",   id:"DRV-004", county:"Kisumu",   parcels:9,  status:"active"   },
  { name:"Hassan Omar",    id:"DRV-005", county:"Garissa",  parcels:3,  status:"active"   },
];

// ── Sub-views ─────────────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <>
      <div className="stats-row" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))" }}>
        {[
          { i:"📦", v:"1,284",   l:"Parcels today",   c:"+12%",      u:true,  cl:"green" },
          { i:"💰", v:"KSh 324K",l:"Revenue today",   c:"+8%",       u:true,  cl:"gold"  },
          { i:"🚐", v:"47",      l:"Active riders",   c:"All on duty",u:true, cl:"green" },
          { i:"✅", v:"98.1%",   l:"On-time rate",    c:"-0.3%",     u:false, cl:"ink"   },
          { i:"⚠️", v:"12",      l:"Open complaints", c:"2 urgent",  u:false, cl:"ink"   },
          { i:"🏢", v:"6",       l:"Branch offices",  c:"All open",  u:true,  cl:"green" },
        ].map(s => (
          <div className={`stat-card ${s.cl}`} key={s.l}>
            <span className="stat-icon">{s.i}</span>
            <div className="stat-value">{s.v}</div>
            <div className="stat-label">{s.l}</div>
            <div className={`stat-change ${s.u ? "up" : "dn"}`}>{s.u ? "↑" : "↓"} {s.c}</div>
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-head">
          <div className="table-title">Recent Orders</div>
        </div>
        <OrderTable orders={SAMPLE_ORDERS} />
      </div>
    </>
  );
}

function OrderTable({ orders }) {
  return (
    <div style={{ overflowX:"auto" }}>
      <table className="tbl" style={{ minWidth:560 }}>
        <thead>
          <tr><th>ID</th><th>From</th><th>To</th><th>Date</th><th>Status</th><th>Revenue</th></tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={`${o.id}-${i}`}>
              <td>{o.id}</td><td>{o.from}</td><td>{o.to}</td><td>{o.date}</td>
              <td>
                <span className={`pill pill-${o.status}`}>
                  {o.status === "delivered" ? "✓ Delivered" : o.status === "transit" ? "🚚 Transit" : "⏳ Pending"}
                </span>
              </td>
              <td style={{ fontFamily:"var(--mono)", fontWeight:600 }}>{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="table-wrap">
      <div className="table-head">
        <div className="table-title">All Orders</div>
        <div style={{ display:"flex", gap:"8px" }}>
          <select style={{ border:"1px solid var(--border)", borderRadius:"var(--r-sm)", padding:"7px 12px", fontFamily:"var(--font)", fontSize:"0.82rem", background:"var(--surface)" }}>
            <option>All Statuses</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Pending</option>
          </select>
        </div>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table className="tbl" style={{ minWidth:700 }}>
          <thead>
            <tr><th>ID</th><th>Sender</th><th>From</th><th>To</th><th>Weight</th><th>Date</th><th>Status</th><th>Revenue</th></tr>
          </thead>
          <tbody>
            {[...SAMPLE_ORDERS, ...SAMPLE_ORDERS].map((o, i) => (
              <tr key={i}>
                <td>{o.id}</td><td>J. Kamau</td><td>{o.from}</td><td>{o.to}</td>
                <td style={{ fontFamily:"var(--mono)" }}>{o.weight}</td><td>{o.date}</td>
                <td>
                  <span className={`pill pill-${o.status}`}>
                    {o.status === "delivered" ? "✓ Delivered" : o.status === "transit" ? "🚚 Transit" : "⏳ Pending"}
                  </span>
                </td>
                <td style={{ fontFamily:"var(--mono)", fontWeight:600 }}>{o.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DriversTab() {
  return (
    <div className="table-wrap">
      <div className="table-head">
        <div className="table-title">Driver Management</div>
        <button className="btn btn-primary" style={{ fontSize:"0.82rem", padding:"8px 16px" }}>+ Add Driver</button>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table className="tbl" style={{ minWidth:540 }}>
          <thead>
            <tr><th>Driver</th><th>ID</th><th>County</th><th>Parcels</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {DRIVERS.map(d => (
              <tr key={d.id}>
                <td style={{ fontWeight:600, fontFamily:"var(--font)", color:"var(--ink)" }}>{d.name}</td>
                <td style={{ fontFamily:"var(--mono)", color:"var(--ink-60)" }}>{d.id}</td>
                <td>{d.county}</td>
                <td style={{ fontFamily:"var(--mono)", fontWeight:600 }}>{d.parcels}</td>
                <td>
                  <span className={`pill ${d.status === "active" ? "pill-delivered" : "pill-pending"}`}>
                    {d.status === "active" ? "✓ Active" : "● Offline"}
                  </span>
                </td>
                <td>
                  <button style={{ background:"none", border:"1px solid var(--border)", borderRadius:"6px", padding:"4px 10px", cursor:"pointer", fontSize:"0.75rem" }}>
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsTab() {
  const reports = [
    { title:"Revenue by Region", gold:false, items:[
      { l:"Nairobi",      v:"KSh 1.2M",    p:62 },
      { l:"Coast",        v:"KSh 340K",    p:18 },
      { l:"Rift Valley",  v:"KSh 220K",    p:11 },
      { l:"Others",       v:"KSh 180K",    p:9  },
    ]},
    { title:"Volume by Service", gold:true, items:[
      { l:"Standard", v:"8,420 parcels", p:55 },
      { l:"Express",  v:"4,210 parcels", p:28 },
      { l:"Economy",  v:"2,640 parcels", p:17 },
    ]},
    { title:"Top Routes", gold:false, items:[
      { l:"Nairobi → Mombasa", v:"2,340", p:70 },
      { l:"Nairobi → Kisumu",  v:"1,100", p:50 },
      { l:"Nairobi → Nakuru",  v:"980",   p:45 },
    ]},
    { title:"Complaint Types", gold:true, items:[
      { l:"Delayed delivery", v:"48 cases", p:55 },
      { l:"Damaged parcel",   v:"22 cases", p:25 },
      { l:"Lost parcel",      v:"12 cases", p:14 },
    ]},
  ];

  return (
    <div className="grid-2">
      {reports.map(r => (
        <div className="table-wrap" style={{ padding:"20px 22px" }} key={r.title}>
          <div style={{ fontWeight:700, fontSize:"0.92rem", marginBottom:"16px" }}>{r.title}</div>
          <div className="bar-chart">
            {r.items.map(i => (
              <div className="bar-row" key={i.l}>
                <div className="bar-label">{i.l}</div>
                <div className="bar-track">
                  <div className={`bar-fill ${r.gold ? "gold" : ""}`} style={{ width:`${i.p}%` }} />
                </div>
                <div className="bar-val">{i.v}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main AdminPage ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <div className="page-eyebrow">Admin Portal</div>
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="admin-tabs">
        {["overview", "orders", "drivers", "reports"].map(t => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
            style={{ textTransform:"capitalize" }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab />}
      {tab === "orders"   && <OrdersTab />}
      {tab === "drivers"  && <DriversTab />}
      {tab === "reports"  && <ReportsTab />}
    </div>
  );
}