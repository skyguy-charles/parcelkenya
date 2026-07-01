import { useState, useEffect, useCallback } from "react";
import { loadAllBookings, updateBookingStatus } from "../utils/storage";

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Mulish:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root{
  --ink:#08090D;
  --ink2:#0D0F15;
  --ink3:#12151E;
  --panel:#0F1219;
  --line:rgba(255,255,255,0.06);
  --line2:rgba(255,255,255,0.1);
  --line3:rgba(255,255,255,0.15);

  --amber:#D4A843;
  --amber2:#F0C86A;

  --teal:#3DB38A;
  --sky:#5BA4E6;
  --coral:#E06060;

  --text:#DDE0EC;
  --text70:rgba(221,224,236,0.72);
  --text40:rgba(221,224,236,0.42);
  --text20:rgba(221,224,236,0.22);

  --display:'Playfair Display', serif;
  --body:'Mulish', sans-serif;
  --mono:'IBM Plex Mono', monospace;
}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:var(--ink);
}

.adm-root{
  min-height:100vh;
  width:100%;
  background:var(--ink);
  color:var(--text);
  font-family:var(--body);
  overflow-x:hidden;
}

/* ── NAV ── */

.adm-nav{
  position:sticky;
  top:0;
  z-index:50;
  height:64px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 32px;
  background:rgba(8,9,13,0.97);
  border-bottom:1px solid var(--line);
  backdrop-filter:blur(20px);
}

.adm-nav-brand{
  display:flex;
  align-items:center;
  gap:10px;
}

.adm-nav-logo{
  display:flex;
  align-items:center;
  gap:8px;
}

.adm-nav-brand-dot{
  width:9px;
  height:9px;
  border-radius:50%;
  background:var(--amber);
  box-shadow:0 0 16px var(--amber);
}

.adm-nav-wordmark{
  font-family:var(--display);
  font-size:1.05rem;
  letter-spacing:.02em;
  color:var(--text);
}

.adm-nav-divider{
  width:1px;
  height:18px;
  background:var(--line3);
  margin:0 14px;
}

.adm-nav-badge{
  font-size:.52rem;
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:2.5px;
  padding:4px 10px;
  border-radius:999px;
  background:rgba(212,168,67,.1);
  color:var(--amber2);
  border:1px solid rgba(212,168,67,.25);
}

.adm-nav-meta{
  font-size:.72rem;
  color:var(--text40);
  font-family:var(--mono);
}

/* ── MAIN ── */

.adm-main{
  padding:36px 32px;
  max-width:1400px;
  margin:0 auto;
}

/* ── HEADER ── */

.adm-header{
  margin-bottom:36px;
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:16px;
}

.adm-header-left{}

.adm-eyebrow{
  font-size:.56rem;
  color:var(--amber);
  letter-spacing:3.5px;
  text-transform:uppercase;
  font-family:var(--mono);
  margin-bottom:10px;
  display:flex;
  align-items:center;
  gap:8px;
}

.adm-eyebrow::before{
  content:'';
  display:inline-block;
  width:18px;
  height:1px;
  background:var(--amber);
  opacity:.7;
}

.adm-title{
  font-size:clamp(1.8rem,3.5vw,2.6rem);
  font-family:var(--display);
  font-weight:400;
  line-height:1.15;
}

.adm-title em{
  color:var(--amber2);
  font-style:italic;
}

.adm-subtitle{
  margin-top:8px;
  color:var(--text40);
  font-size:.85rem;
}

.adm-header-right{
  display:flex;
  align-items:center;
  gap:10px;
}

.adm-refresh-btn{
  border:none;
  cursor:pointer;
  background:var(--ink3);
  border:1px solid var(--line2);
  color:var(--text70);
  padding:10px 18px;
  border-radius:10px;
  font-size:.75rem;
  font-family:var(--mono);
  transition:.18s;
  display:flex;
  align-items:center;
  gap:6px;
}

.adm-refresh-btn:hover{
  background:#1a1f2b;
  color:white;
  border-color:var(--line3);
}

/* ── STATS ── */

.adm-stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-bottom:32px;
}

.adm-stat{
  background:var(--ink3);
  border:1px solid var(--line);
  border-radius:18px;
  padding:24px 22px;
  position:relative;
  overflow:hidden;
  transition:.2s;
}

.adm-stat::after{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:2px;
  opacity:.5;
}

.amber .adm-stat-value{ color:var(--amber2); }
.amber.adm-stat::after{ background:var(--amber2); }

.teal .adm-stat-value{ color:var(--teal); }
.teal.adm-stat::after{ background:var(--teal); }

.coral .adm-stat-value{ color:var(--coral); }
.coral.adm-stat::after{ background:var(--coral); }

.sky .adm-stat-value{ color:var(--sky); }
.sky.adm-stat::after{ background:var(--sky); }

.adm-stat-icon{
  font-size:1.2rem;
  margin-bottom:14px;
  opacity:.7;
}

.adm-stat-label{
  font-size:.56rem;
  font-family:var(--mono);
  letter-spacing:2.5px;
  text-transform:uppercase;
  color:var(--text20);
  margin-bottom:10px;
}

.adm-stat-value{
  font-size:2.1rem;
  font-family:var(--mono);
  font-weight:500;
  margin-bottom:6px;
  line-height:1;
}

.adm-stat-sub{
  font-size:.72rem;
  color:var(--text40);
}

/* ── TOOLBAR ── */

.adm-toolbar{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-bottom:20px;
  align-items:center;
}

.adm-search-wrap{
  flex:1;
  min-width:240px;
  position:relative;
}

.adm-search-icon{
  position:absolute;
  left:14px;
  top:50%;
  transform:translateY(-50%);
  font-size:.9rem;
  opacity:.5;
}

.adm-search{
  width:100%;
  height:44px;
  border-radius:12px;
  border:1px solid var(--line2);
  background:var(--ink3);
  color:var(--text);
  padding:0 14px 0 42px;
  outline:none;
  font-family:var(--body);
  font-size:.82rem;
  transition:.18s;
}

.adm-search:focus{
  border-color:rgba(212,168,67,.35);
  background:#14171f;
}

.adm-search::placeholder{
  color:var(--text20);
}

.adm-filter-group{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}

.adm-filter-btn{
  border:none;
  cursor:pointer;
  background:var(--ink3);
  border:1px solid var(--line2);
  color:var(--text40);
  padding:10px 14px;
  border-radius:10px;
  font-size:.72rem;
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:1px;
  transition:.18s;
}

.adm-filter-btn:hover{
  color:var(--text70);
  border-color:var(--line3);
}

.adm-filter-btn.active{
  background:rgba(212,168,67,.1);
  border-color:rgba(212,168,67,.4);
  color:var(--amber2);
}

/* ── TABLE ── */

.adm-table-wrap{
  width:100%;
  overflow:auto;
  border-radius:18px;
  border:1px solid var(--line);
  background:var(--ink3);
}

.adm-table-head,
.adm-row{
  display:grid;
  grid-template-columns:
    148px
    200px
    200px
    165px
    128px
    118px
    136px;
  min-width:1095px;
}

.adm-table-head{
  border-bottom:1px solid var(--line2);
  background:rgba(255,255,255,.025);
}

.adm-th{
  padding:14px 16px;
  font-size:.54rem;
  letter-spacing:2.5px;
  text-transform:uppercase;
  color:var(--text20);
  font-family:var(--mono);
}

.adm-row{
  border-bottom:1px solid var(--line);
  cursor:pointer;
  transition:.15s;
}

.adm-row:last-child{
  border-bottom:none;
}

.adm-row:hover{
  background:rgba(255,255,255,.028);
}

.adm-cell{
  padding:16px;
  font-size:.82rem;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.adm-cell-id{
  color:var(--amber2);
  font-family:var(--mono);
  font-size:.75rem;
}

.adm-cell-name{
  font-weight:700;
  color:var(--text);
}

.adm-cell-sub{
  margin-top:3px;
  color:var(--text40);
  font-size:.72rem;
}

.adm-cell-route{
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:6px;
  font-size:.78rem;
  flex-wrap:wrap;
}

.adm-cell-route-arrow{
  color:var(--text20);
  font-size:.65rem;
}

.adm-cell-amount{
  color:var(--teal);
  font-family:var(--mono);
  font-size:.82rem;
}

/* ── BADGES ── */

.adm-badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:5px 10px;
  border-radius:999px;
  font-size:.58rem;
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:1px;
  width:fit-content;
}

.adm-badge-dot{
  width:5px;
  height:5px;
  border-radius:50%;
  background:currentColor;
  flex-shrink:0;
}

.adm-badge.pending{
  color:var(--amber2);
  background:rgba(212,168,67,.1);
  border:1px solid rgba(212,168,67,.18);
}

.adm-badge.transit{
  color:var(--sky);
  background:rgba(91,164,230,.1);
  border:1px solid rgba(91,164,230,.18);
}

.adm-badge.delivered{
  color:var(--teal);
  background:rgba(61,179,138,.1);
  border:1px solid rgba(61,179,138,.18);
}

.adm-badge.cancelled{
  color:var(--coral);
  background:rgba(224,96,96,.1);
  border:1px solid rgba(224,96,96,.18);
}

/* ── EMPTY ── */

.adm-empty{
  padding:80px 20px;
  text-align:center;
}

.adm-empty-icon{
  font-size:2.8rem;
  margin-bottom:14px;
  opacity:.6;
}

.adm-empty-title{
  font-size:1.2rem;
  font-family:var(--display);
  margin-bottom:8px;
}

.adm-empty-sub{
  color:var(--text40);
  font-size:.82rem;
}

/* ── RESULT COUNT ── */

.adm-result-count{
  font-size:.7rem;
  color:var(--text40);
  font-family:var(--mono);
  padding:0 4px 14px;
}

.adm-result-count span{
  color:var(--amber2);
}

/* ── DRAWER ── */

.adm-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.65);
  z-index:100;
  backdrop-filter:blur(2px);
}

.adm-drawer{
  position:fixed;
  top:0;
  right:0;
  width:500px;
  max-width:100%;
  height:100vh;
  overflow-y:auto;
  background:var(--panel);
  z-index:101;
  border-left:1px solid var(--line2);
  display:flex;
  flex-direction:column;
}

.adm-drawer-header{
  padding:26px 24px;
  border-bottom:1px solid var(--line);
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  background:rgba(255,255,255,.015);
}

.adm-drawer-id{
  font-family:var(--mono);
  color:var(--amber2);
  margin-bottom:5px;
  font-size:.82rem;
}

.adm-drawer-time{
  font-size:.72rem;
  color:var(--text40);
  margin-bottom:12px;
}

.adm-drawer-close{
  width:34px;
  height:34px;
  border:none;
  cursor:pointer;
  border-radius:9px;
  background:var(--ink3);
  color:var(--text70);
  border:1px solid var(--line2);
  font-size:.9rem;
  flex-shrink:0;
  transition:.15s;
}

.adm-drawer-close:hover{
  background:#1a1f2b;
  color:white;
}

.adm-drawer-body{
  padding:24px;
  flex:1;
}

.adm-drawer-section{
  margin-bottom:26px;
}

.adm-drawer-section-title{
  font-size:.56rem;
  font-family:var(--mono);
  color:var(--amber);
  margin-bottom:14px;
  text-transform:uppercase;
  letter-spacing:3px;
  display:flex;
  align-items:center;
  gap:8px;
}

.adm-drawer-section-title::after{
  content:'';
  flex:1;
  height:1px;
  background:var(--line);
}

.adm-drawer-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

.adm-drawer-field{
  background:var(--ink3);
  border:1px solid var(--line);
  border-radius:12px;
  padding:14px;
  transition:.15s;
}

.adm-drawer-field.full{
  grid-column:1/-1;
}

.adm-drawer-field-label{
  font-size:.56rem;
  color:var(--text20);
  text-transform:uppercase;
  letter-spacing:1.5px;
  font-family:var(--mono);
  margin-bottom:6px;
}

.adm-drawer-field-value{
  font-size:.84rem;
  color:var(--text70);
  word-break:break-word;
}

.adm-drawer-field-value.mono{
  font-family:var(--mono);
}

.adm-drawer-field-value.teal{
  color:var(--teal);
  font-family:var(--mono);
  font-size:.95rem;
  font-weight:600;
}

.adm-drawer-footer{
  padding:22px 24px;
  border-top:1px solid var(--line);
}

.adm-drawer-footer-label{
  font-size:.62rem;
  color:var(--text40);
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:2px;
  margin-bottom:12px;
}

.adm-status-row{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}

.adm-status-opt{
  border:none;
  cursor:pointer;
  padding:10px 16px;
  border-radius:10px;
  background:var(--ink);
  color:var(--text70);
  border:1px solid var(--line2);
  font-size:.72rem;
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:1px;
  transition:.18s;
}

.adm-status-opt:hover{
  border-color:var(--line3);
  color:white;
}

.adm-status-opt.active{
  border-color:var(--amber2);
  color:var(--amber2);
  background:rgba(212,168,67,.08);
}

/* ── TOAST ── */

.adm-toast{
  position:fixed;
  right:24px;
  bottom:24px;
  background:var(--ink2);
  border:1px solid var(--line3);
  padding:14px 20px;
  border-radius:12px;
  z-index:200;
  font-size:.82rem;
  color:var(--teal);
  font-family:var(--mono);
  box-shadow:0 8px 32px rgba(0,0,0,.5);
  animation:toastIn .2s ease;
}

@keyframes toastIn{
  from{ opacity:0; transform:translateY(8px); }
  to{ opacity:1; transform:translateY(0); }
}

/* ── MOBILE ── */

@media(max-width:980px){
  .adm-stats{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:700px){
  .adm-nav{
    padding:0 16px;
    height:56px;
  }
  .adm-main{
    padding:20px 16px;
  }
  .adm-stats{
    grid-template-columns:1fr 1fr;
    gap:10px;
  }
  .adm-toolbar{
    flex-direction:column;
    align-items:stretch;
  }
  .adm-filter-group{
    overflow-x:auto;
    padding-bottom:4px;
    flex-wrap:nowrap;
  }
  .adm-filter-btn{
    white-space:nowrap;
  }
  .adm-drawer{
    width:100%;
  }
  .adm-drawer-grid{
    grid-template-columns:1fr;
  }
  .adm-drawer-field.full{
    grid-column:auto;
  }
  .adm-header{
    flex-direction:column;
    align-items:flex-start;
  }
}
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────

const SVC_MAP = {
  express: { label: "Express", eta: "Same day" },
  standard: { label: "Standard", eta: "1–2 days" },
  economy: { label: "Economy", eta: "3–5 days" },
};

function fmt(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return (
    d.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" })
  );
}

function StatusBadge({ status }) {
  const labels = {
    pending: "Pending",
    transit: "In Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return (
    <span className={`adm-badge ${status}`}>
      <span className="adm-badge-dot" />
      {labels[status] || status}
    </span>
  );
}

// ── DETAIL DRAWER ─────────────────────────────────────────────────────────────

function DetailDrawer({ booking, onClose, onStatusChange }) {
  const { form, fee, weightCost, total, createdAt, id, status } = booking;
  const svc = SVC_MAP[form?.speed] || SVC_MAP.standard;

  const Field = ({ label, value, mono, teal, full }) => (
    <div className={`adm-drawer-field${full ? " full" : ""}`}>
      <div className="adm-drawer-field-label">{label}</div>
      <div className={`adm-drawer-field-value${mono ? " mono" : ""}${teal ? " teal" : ""}`}>
        {value || "—"}
      </div>
    </div>
  );

  return (
    <>
      <div className="adm-overlay" onClick={onClose} />
      <div className="adm-drawer">
        <div className="adm-drawer-header">
          <div>
            <div className="adm-drawer-id">{id}</div>
            <div className="adm-drawer-time">{fmt(createdAt)}</div>
            <StatusBadge status={status} />
          </div>
          <button className="adm-drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="adm-drawer-body">
          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Sender</div>
            <div className="adm-drawer-grid">
              <Field label="Full Name" value={form?.senderName} />
              <Field label="Phone" value={form?.senderPhone} mono />
              <Field label="County" value={form?.senderCounty} />
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Recipient</div>
            <div className="adm-drawer-grid">
              <Field label="Full Name" value={form?.recipientName} />
              <Field label="Phone" value={form?.recipientPhone} mono />
              <Field label="County" value={form?.recipientCounty} />
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Parcel & Service</div>
            <div className="adm-drawer-grid">
              <Field label="Weight" value={form?.weight ? `${form.weight} kg` : "—"} />
              <Field label="Service Tier" value={svc.label} />
              <Field label="ETA" value={svc.eta} />
              <Field label="Pickup Date" value={form?.date} />
              <Field label="Time Slot" value={form?.timeSlot} />
              <Field label="Insurance" value={form?.insurance ? "Yes — KSh 80" : "No"} />
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Payment</div>
            <div className="adm-drawer-grid">
              <Field
                label="Method"
                value={form?.payment ? form.payment.charAt(0).toUpperCase() + form.payment.slice(1) : "—"}
              />
              {form?.mpesaPhone && <Field label="M-Pesa Number" value={form.mpesaPhone} mono />}
              <Field label="Base Fee" value={`KSh ${(fee || 0).toLocaleString()}`} />
              <Field label="Weight Cost" value={`KSh ${(weightCost || 0).toLocaleString()}`} />
              <Field label="Total Charged" value={`KSh ${(total || 0).toLocaleString()}`} teal />
            </div>
          </div>
        </div>

        <div className="adm-drawer-footer">
          <div className="adm-drawer-footer-label">Update Status</div>
          <div className="adm-status-row">
            {["pending", "transit", "delivered", "cancelled"].map((s) => (
              <button
                key={s}
                className={`adm-status-opt${status === s ? " active" : ""}`}
                onClick={() => onStatusChange(id, s)}
              >
                {s === "transit" ? "In Transit" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function AdminPage({ setPage }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const refresh = useCallback((spin = false) => {
    if (spin) setSpinning(true);
    setBookings(loadAllBookings());
    setLoading(false);
    if (spin) setTimeout(() => setSpinning(false), 600);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleStatusChange = (id, status) => {
    if (updateBookingStatus(id, status)) {
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
      showToast(`✓ Status updated to ${status === "transit" ? "In Transit" : status}`);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === "all" || b.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      b.id?.toLowerCase().includes(q) ||
      b.form?.senderName?.toLowerCase().includes(q) ||
      b.form?.recipientName?.toLowerCase().includes(q) ||
      b.form?.senderCounty?.toLowerCase().includes(q) ||
      b.form?.recipientCounty?.toLowerCase().includes(q) ||
      b.form?.senderPhone?.includes(q);
    return matchFilter && matchSearch;
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
  const pending = bookings.filter((b) => b.status === "pending").length;
  const inTransit = bookings.filter((b) => b.status === "transit").length;
  const delivered = bookings.filter((b) => b.status === "delivered").length;

  // Live date string
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="adm-root">
      <style>{CSS}</style>

      {/* NAV — brand only, no action buttons */}
      <nav className="adm-nav">
        <div className="adm-nav-brand">
          <div className="adm-nav-logo">
            <div className="adm-nav-brand-dot" />
            <span className="adm-nav-wordmark">SpeedPak</span>
          </div>
          <div className="adm-nav-divider" />
          <span className="adm-nav-badge">Admin Console</span>
        </div>
        <div className="adm-nav-meta">{dateStr}</div>
      </nav>

      <div className="adm-main">
        {/* HEADER */}
        <div className="adm-header">
          <div className="adm-header-left">
            <div className="adm-eyebrow">Control Panel</div>
            <h1 className="adm-title">Shipment <em>Dashboard</em></h1>
            <p className="adm-subtitle">All bookings submitted through the SpeedPak platform.</p>
          </div>
          <div className="adm-header-right">
            <button className="adm-refresh-btn" onClick={() => refresh(true)}>
              <span>{spinning ? "↻" : "↻"}</span>
              {spinning ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="adm-stats">
          {[
            { label: "Total Bookings", value: bookings.length, sub: "All time", cls: "amber", icon: "📦" },
            { label: "Revenue (KSh)", value: `${(totalRevenue / 1000).toFixed(1)}K`, sub: "Estimated total", cls: "teal", icon: "💰" },
            { label: "Pending", value: pending, sub: "Awaiting pickup", cls: "coral", icon: "⏳" },
            { label: "In Transit", value: inTransit, sub: `${delivered} delivered`, cls: "sky", icon: "🚚" },
          ].map((s) => (
            <div key={s.label} className={`adm-stat ${s.cls}`}>
              <div className="adm-stat-icon">{s.icon}</div>
              <div className="adm-stat-label">{s.label}</div>
              <div className="adm-stat-value">{loading ? "…" : s.value}</div>
              <div className="adm-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="adm-toolbar">
          <div className="adm-search-wrap">
            <span className="adm-search-icon">🔍</span>
            <input
              className="adm-search"
              placeholder="Search by ID, name, county, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-group">
            {["all", "pending", "transit", "delivered", "cancelled"].map((f) => (
              <button
                key={f}
                className={`adm-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "transit" ? "Transit" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT COUNT */}
        {!loading && (
          <div className="adm-result-count">
            Showing <span>{filtered.length}</span> of {bookings.length} bookings
          </div>
        )}

        {/* TABLE */}
        <div className="adm-table-wrap">
          <div className="adm-table-head">
            <div className="adm-th">Tracking ID</div>
            <div className="adm-th">Sender</div>
            <div className="adm-th">Recipient</div>
            <div className="adm-th">Route</div>
            <div className="adm-th">Service</div>
            <div className="adm-th">Amount</div>
            <div className="adm-th">Status</div>
          </div>
          <div className="adm-table-body">
            {loading ? (
              <div className="adm-empty">
                <div className="adm-empty-icon">⏳</div>
                <div className="adm-empty-title">Loading bookings…</div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="adm-empty">
                <div className="adm-empty-icon">📭</div>
                <div className="adm-empty-title">No bookings found</div>
                <div className="adm-empty-sub">Try adjusting your filters or search query.</div>
              </div>
            ) : (
              filtered.map((b) => {
                const svc = SVC_MAP[b.form?.speed] || SVC_MAP.standard;
                return (
                  <div key={b.id} className="adm-row" onClick={() => setSelected(b)}>
                    <div className="adm-cell adm-cell-id">{b.id}</div>
                    <div className="adm-cell">
                      <div className="adm-cell-name">{b.form?.senderName || "—"}</div>
                      <div className="adm-cell-sub">{b.form?.senderPhone || ""}</div>
                      <div className="adm-cell-sub" style={{ color: "var(--amber2)" }}>{b.form?.senderCounty || ""}</div>
                    </div>
                    <div className="adm-cell">
                      <div className="adm-cell-name">{b.form?.recipientName || "—"}</div>
                      <div className="adm-cell-sub">{b.form?.recipientPhone || ""}</div>
                      <div className="adm-cell-sub" style={{ color: "var(--teal)" }}>{b.form?.recipientCounty || ""}</div>
                    </div>
                    <div className="adm-cell">
                      <div className="adm-cell-route">
                        <strong style={{ color: "var(--amber2)" }}>{b.form?.senderCounty || "—"}</strong>
                        <span className="adm-cell-route-arrow">→</span>
                        <strong style={{ color: "var(--teal)" }}>{b.form?.recipientCounty || "—"}</strong>
                      </div>
                    </div>
                    <div className="adm-cell">
                      <div className="adm-cell-name">{svc.label}</div>
                      <div className="adm-cell-sub">{svc.eta}</div>
                    </div>
                    <div className="adm-cell adm-cell-amount">KSh {(b.total || 0).toLocaleString()}</div>
                    <div className="adm-cell">
                      <StatusBadge status={b.status || "pending"} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {selected && (
        <DetailDrawer
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
}