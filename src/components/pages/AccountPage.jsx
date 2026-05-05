import { useState } from "react";
import { COUNTIES, SAMPLE_ORDERS } from "../../data/Constants";
export default function AccountPage({ setPage }) {
  const [tab, setTab] = useState("orders");

  const nav = [
    { id:"orders",        icon:"📦", label:"My Orders"     },
    { id:"addresses",     icon:"📍", label:"Addresses"     },
    { id:"profile",       icon:"👤", label:"Profile"       },
    { id:"notifications", icon:"🔔", label:"Notifications" },
  ];

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <div className="page-eyebrow">Account</div>
        <h1 className="page-title">My Account</h1>
      </div>

      <div className="account-layout">
        {/* Sidebar */}
        <div className="account-sidebar">
          <div className="account-avatar">JK</div>
          <div className="account-name">John Kamau</div>
          <div className="account-email">john.kamau@email.com</div>
          <ul className="account-nav">
            {nav.map(i => (
              <li key={i.id}>
                <button
                  className={`account-nav-item ${tab === i.id ? "active" : ""}`}
                  onClick={() => setTab(i.id)}
                >
                  <span>{i.icon}</span>{i.label}
                </button>
              </li>
            ))}
            <li><div style={{ height:1, background:"var(--border)", margin:"8px 0" }} /></li>
            <li>
              <button
                className="account-nav-item"
                style={{ color:"#C0392B" }}
                onClick={() => setPage("home")}
              >
                <span>🚪</span>Sign out
              </button>
            </li>
          </ul>
        </div>

        {/* Content area */}
        <div>
          {tab === "orders" && (
            <div className="table-wrap">
              <div className="table-head">
                <div className="table-title">Order History</div>
                <button
                  className="btn btn-primary"
                  style={{ fontSize:"0.8rem", padding:"8px 16px" }}
                  onClick={() => setPage("book")}
                >
                  + New Order
                </button>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table className="tbl" style={{ minWidth:560 }}>
                  <thead>
                    <tr><th>ID</th><th>From</th><th>To</th><th>Date</th><th>Status</th><th>Price</th></tr>
                  </thead>
                  <tbody>
                    {SAMPLE_ORDERS.map(o => (
                      <tr key={o.id} style={{ cursor:"pointer" }} onClick={() => setPage("track")}>
                        <td>{o.id}</td>
                        <td>{o.from}</td>
                        <td>{o.to}</td>
                        <td>{o.date}</td>
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
          )}

          {tab === "addresses" && (
            <div>
              {[
                { l:"Home",       a:"Apt 4B, Kilimani, Nairobi",   i:"🏠" },
                { l:"Office",     a:"ABC Plaza, Westlands",         i:"🏢" },
                { l:"Mum's Place",a:"Kimathi Street, Nakuru",       i:"👩" },
              ].map(a => (
                <div
                  key={a.l}
                  style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px", boxShadow:"var(--shadow-sm)" }}
                >
                  <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
                    <span style={{ fontSize:"1.2rem" }}>{a.i}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.88rem" }}>{a.l}</div>
                      <div style={{ fontSize:"0.78rem", color:"var(--ink-60)" }}>{a.a}</div>
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ fontSize:"0.78rem", padding:"6px 14px" }}>Edit</button>
                </div>
              ))}
              <button className="btn btn-primary mt-sm">+ Add Address</button>
            </div>
          )}

          {tab === "profile" && (
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-header-icon">👤</div>
                <div><h2>Profile Settings</h2><p>Manage your account details</p></div>
              </div>
              <div className="form-body">
                <div className="frow">
                  <div className="fgroup"><label>First Name</label><input defaultValue="John" /></div>
                  <div className="fgroup"><label>Last Name</label><input defaultValue="Kamau" /></div>
                </div>
                <div className="fgroup"><label>Phone Number</label><input defaultValue="+254 700 000 000" /></div>
                <div className="fgroup"><label>Email</label><input defaultValue="john.kamau@email.com" /></div>
                <div className="fgroup">
                  <label>Default County</label>
                  <select defaultValue="Nairobi">
                    {COUNTIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-header-icon">🔔</div>
                <div><h2>Notifications</h2><p>Manage your alert preferences</p></div>
              </div>
              <div className="form-body">
                {[
                  { l:"SMS alerts for parcel status updates",    d:true  },
                  { l:"Email confirmation on new bookings",      d:true  },
                  { l:"WhatsApp delivery notifications",         d:false },
                  { l:"Promotional offers and discounts",        d:false },
                  { l:"Weekly delivery summary email",           d:true  },
                ].map(n => (
                  <div
                    key={n.l}
                    style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 0", borderBottom:"1px solid var(--border)" }}
                  >
                    <span style={{ fontSize:"0.87rem" }}>{n.l}</span>
                    <input
                      type="checkbox"
                      defaultChecked={n.d}
                      style={{ width:17, height:17, accentColor:"var(--sage-light)", cursor:"pointer" }}
                    />
                  </div>
                ))}
                <button className="btn btn-primary mt-md">Save Preferences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}