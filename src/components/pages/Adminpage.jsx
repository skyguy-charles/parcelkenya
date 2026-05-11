import { useState, useEffect, useCallback } from "react";

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

/* NAV */

.adm-nav{
  position:sticky;
  top:0;
  z-index:50;
  height:64px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 24px;
  background:rgba(8,9,13,0.95);
  border-bottom:1px solid var(--line);
  backdrop-filter:blur(18px);
}

.adm-nav-brand{
  display:flex;
  align-items:center;
  gap:10px;
  font-family:var(--display);
  font-size:1rem;
}

.adm-nav-brand-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:var(--amber);
  box-shadow:0 0 14px var(--amber);
}

.adm-nav-badge{
  font-size:.55rem;
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:2px;
  padding:3px 8px;
  border-radius:999px;
  background:rgba(224,96,96,.12);
  color:var(--coral);
  border:1px solid rgba(224,96,96,.2);
}

.adm-nav-right{
  display:flex;
  align-items:center;
  gap:10px;
}

.adm-nav-btn{
  border:none;
  outline:none;
  cursor:pointer;
  padding:10px 16px;
  border-radius:10px;
  background:var(--ink3);
  color:var(--text70);
  border:1px solid var(--line2);
  font-size:.8rem;
  transition:.2s;
}

.adm-nav-btn:hover{
  background:#1a1f2b;
  color:white;
}

/* MAIN */

.adm-main{
  padding:32px;
}

.adm-header{
  margin-bottom:28px;
}

.adm-eyebrow{
  font-size:.58rem;
  color:var(--amber);
  letter-spacing:3px;
  text-transform:uppercase;
  font-family:var(--mono);
  margin-bottom:10px;
}

.adm-title{
  font-size:clamp(2rem,4vw,3rem);
  font-family:var(--display);
  font-weight:400;
}

.adm-title em{
  color:var(--amber2);
}

.adm-subtitle{
  margin-top:8px;
  color:var(--text40);
  font-size:.9rem;
}

/* STATS */

.adm-stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-bottom:28px;
}

.adm-stat{
  background:var(--ink3);
  border:1px solid var(--line);
  border-radius:16px;
  padding:22px;
}

.adm-stat-label{
  font-size:.6rem;
  font-family:var(--mono);
  letter-spacing:2px;
  text-transform:uppercase;
  color:var(--text20);
  margin-bottom:12px;
}

.adm-stat-value{
  font-size:2rem;
  font-family:var(--mono);
  margin-bottom:6px;
}

.adm-stat-sub{
  font-size:.75rem;
  color:var(--text40);
}

.amber .adm-stat-value{ color:var(--amber2); }
.teal .adm-stat-value{ color:var(--teal); }
.coral .adm-stat-value{ color:var(--coral); }
.sky .adm-stat-value{ color:var(--sky); }

/* TOOLBAR */

.adm-toolbar{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-bottom:22px;
}

.adm-search-wrap{
  flex:1;
  min-width:220px;
  position:relative;
}

.adm-search-icon{
  position:absolute;
  left:14px;
  top:50%;
  transform:translateY(-50%);
}

.adm-search{
  width:100%;
  height:44px;
  border-radius:12px;
  border:1px solid var(--line2);
  background:var(--ink3);
  color:var(--text);
  padding:0 14px 0 40px;
  outline:none;
}

.adm-filter-group{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}

.adm-filter-btn,
.adm-refresh-btn{
  border:none;
  cursor:pointer;
  background:var(--ink3);
  border:1px solid var(--line2);
  color:var(--text70);
  padding:10px 14px;
  border-radius:10px;
  font-size:.75rem;
}

.adm-filter-btn.active{
  background:rgba(212,168,67,.1);
  border-color:rgba(212,168,67,.4);
  color:var(--amber2);
}

/* TABLE */

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
    140px
    200px
    200px
    160px
    120px
    110px
    130px;
  min-width:1060px;
}

.adm-table-head{
  border-bottom:1px solid var(--line);
  background:rgba(255,255,255,.02);
}

.adm-th{
  padding:16px;
  font-size:.58rem;
  letter-spacing:2px;
  text-transform:uppercase;
  color:var(--text20);
  font-family:var(--mono);
}

.adm-row{
  border-bottom:1px solid var(--line);
  cursor:pointer;
  transition:.2s;
}

.adm-row:hover{
  background:rgba(255,255,255,.03);
}

.adm-cell{
  padding:16px;
  font-size:.82rem;
}

.adm-cell-id{
  color:var(--amber2);
  font-family:var(--mono);
}

.adm-cell-name{
  font-weight:700;
}

.adm-cell-sub{
  margin-top:4px;
  color:var(--text40);
  font-size:.72rem;
}

.adm-cell-route{
  display:flex;
  align-items:center;
  gap:8px;
}

.adm-cell-amount{
  color:var(--teal);
  font-family:var(--mono);
}

/* BADGES */

.adm-badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:6px 10px;
  border-radius:999px;
  font-size:.6rem;
  font-family:var(--mono);
  text-transform:uppercase;
  letter-spacing:1px;
}

.adm-badge-dot{
  width:6px;
  height:6px;
  border-radius:50%;
  background:currentColor;
}

.adm-badge.pending{
  color:var(--amber2);
  background:rgba(212,168,67,.08);
}

.adm-badge.transit{
  color:var(--sky);
  background:rgba(91,164,230,.08);
}

.adm-badge.delivered{
  color:var(--teal);
  background:rgba(61,179,138,.08);
}

.adm-badge.cancelled{
  color:var(--coral);
  background:rgba(224,96,96,.08);
}

/* EMPTY */

.adm-empty{
  padding:80px 20px;
  text-align:center;
}

.adm-empty-icon{
  font-size:3rem;
  margin-bottom:12px;
}

.adm-empty-title{
  font-size:1.3rem;
  margin-bottom:6px;
}

.adm-empty-sub{
  color:var(--text40);
  font-size:.82rem;
}

/* DRAWER */

.adm-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.6);
  z-index:100;
}

.adm-drawer{
  position:fixed;
  top:0;
  right:0;
  width:480px;
  max-width:100%;
  height:100vh;
  overflow-y:auto;
  background:var(--panel);
  z-index:101;
  border-left:1px solid var(--line);
}

.adm-drawer-header{
  padding:24px;
  border-bottom:1px solid var(--line);
  display:flex;
  justify-content:space-between;
  gap:12px;
}

.adm-drawer-id{
  font-family:var(--mono);
  color:var(--amber2);
  margin-bottom:6px;
}

.adm-drawer-time{
  font-size:.75rem;
  color:var(--text40);
}

.adm-drawer-close{
  width:36px;
  height:36px;
  border:none;
  cursor:pointer;
  border-radius:10px;
  background:var(--ink3);
  color:var(--text70);
}

.adm-drawer-body{
  padding:24px;
}

.adm-drawer-section{
  margin-bottom:28px;
}

.adm-drawer-section-title{
  font-size:.6rem;
  font-family:var(--mono);
  color:var(--amber);
  margin-bottom:12px;
  text-transform:uppercase;
  letter-spacing:2px;
}

.adm-drawer-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}

.adm-drawer-field{
  background:var(--ink3);
  border:1px solid var(--line);
  border-radius:12px;
  padding:14px;
}

.adm-drawer-field.full{
  grid-column:1/-1;
}

.adm-drawer-field-label{
  font-size:.6rem;
  color:var(--text20);
  text-transform:uppercase;
  margin-bottom:5px;
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
}

.adm-drawer-footer{
  padding:24px;
  border-top:1px solid var(--line);
}

.adm-status-row{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:10px;
}

.adm-status-opt{
  border:none;
  cursor:pointer;
  padding:10px 14px;
  border-radius:10px;
  background:var(--ink3);
  color:var(--text70);
  border:1px solid var(--line2);
  font-size:.72rem;
}

.adm-status-opt.active{
  border-color:var(--amber2);
}

/* TOAST */

.adm-toast{
  position:fixed;
  right:20px;
  bottom:20px;
  background:var(--ink2);
  border:1px solid var(--line2);
  padding:14px 18px;
  border-radius:12px;
  z-index:120;
}

/* MOBILE */

@media(max-width:980px){
  .adm-stats{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:700px){

  .adm-nav{
    padding:0 14px;
    height:auto;
    min-height:64px;
    flex-wrap:wrap;
    gap:10px;
    padding-top:12px;
    padding-bottom:12px;
  }

  .adm-nav-right{
    width:100%;
  }

  .adm-nav-btn{
    flex:1;
  }

  .adm-main{
    padding:18px;
  }

  .adm-stats{
    grid-template-columns:1fr;
  }

  .adm-toolbar{
    flex-direction:column;
    align-items:stretch;
  }

  .adm-filter-group{
    width:100%;
    overflow:auto;
    padding-bottom:4px;
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
}
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────

const SVC_MAP = {
  express: {
    label: "Express",
    eta: "Same day",
  },
  standard: {
    label: "Standard",
    eta: "1–2 days",
  },
  economy: {
    label: "Economy",
    eta: "3–5 days",
  },
};

function fmt(ts){
  if(!ts) return "—";

  const d = new Date(ts);

  return (
    d.toLocaleDateString("en-KE", {
      day:"numeric",
      month:"short",
      year:"numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-KE", {
      hour:"2-digit",
      minute:"2-digit",
    })
  );
}

function StatusBadge({ status }){
  const labels = {
    pending:"Pending",
    transit:"In Transit",
    delivered:"Delivered",
    cancelled:"Cancelled",
  };

  return (
    <span className={`adm-badge ${status}`}>
      <span className="adm-badge-dot" />
      {labels[status] || status}
    </span>
  );
}

// ── STORAGE ───────────────────────────────────────────────────────────────────

function loadAllBookings(){
  try{
    const results = [];

    for(let i = 0; i < localStorage.length; i++){
      const key = localStorage.key(i);

      if(key && key.startsWith("booking:")){
        const val = localStorage.getItem(key);

        if(val){
          results.push(JSON.parse(val));
        }
      }
    }

    return results.sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  }catch(err){
    console.error(err);
    return [];
  }
}

function updateBookingStatus(id, status){
  try{
    const key = `booking:${id}`;
    const val = localStorage.getItem(key);

    if(!val) return false;

    const booking = JSON.parse(val);

    booking.status = status;

    localStorage.setItem(key, JSON.stringify(booking));

    return true;
  }catch(err){
    console.error(err);
    return false;
  }
}

// ── DETAIL DRAWER ─────────────────────────────────────────────────────────────

function DetailDrawer({
  booking,
  onClose,
  onStatusChange,
}){

  const {
    form,
    fee,
    weightCost,
    total,
    createdAt,
    id,
    status,
  } = booking;

  const svc = SVC_MAP[form?.speed] || SVC_MAP.standard;

  const Field = ({
    label,
    value,
    mono,
    teal,
    full,
  }) => (
    <div className={`adm-drawer-field${full ? " full" : ""}`}>
      <div className="adm-drawer-field-label">
        {label}
      </div>

      <div
        className={
          `adm-drawer-field-value` +
          `${mono ? " mono" : ""}` +
          `${teal ? " teal" : ""}`
        }
      >
        {value || "—"}
      </div>
    </div>
  );

  return (
    <>
      <div
        className="adm-overlay"
        onClick={onClose}
      />

      <div className="adm-drawer">

        <div className="adm-drawer-header">
          <div>
            <div className="adm-drawer-id">
              {id}
            </div>

            <div className="adm-drawer-time">
              {fmt(createdAt)}
            </div>

            <div style={{ marginTop:10 }}>
              <StatusBadge status={status} />
            </div>
          </div>

          <button
            className="adm-drawer-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="adm-drawer-body">

          {/* Sender */}

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">
              Sender
            </div>

            <div className="adm-drawer-grid">
              <Field label="Full Name" value={form?.senderName} />
              <Field label="Phone" value={form?.senderPhone} mono />
              <Field label="County" value={form?.senderCounty} />
              <Field label="Email" value={form?.senderEmail || "—"} />
              <Field label="Pickup Address" value={form?.senderAddress} full />
            </div>
          </div>

          {/* Recipient */}

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">
              Recipient
            </div>

            <div className="adm-drawer-grid">
              <Field label="Full Name" value={form?.recipientName} />
              <Field label="Phone" value={form?.recipientPhone} mono />
              <Field label="County" value={form?.recipientCounty} />
              <Field label="Delivery Address" value={form?.recipientAddress} full />
            </div>
          </div>

          {/* Parcel */}

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">
              Parcel & Service
            </div>

            <div className="adm-drawer-grid">
              <Field label="Weight" value={form?.weight ? `${form.weight} kg` : "—"} />
              <Field label="Category" value={form?.parcelType} />
              <Field label="Service Tier" value={svc.label} />
              <Field label="ETA" value={svc.eta} />
              <Field label="Pickup Date" value={form?.date} />
              <Field label="Time Slot" value={form?.timeSlot} />
              <Field label="Insurance" value={form?.insurance ? "Yes — KSh 80" : "No"} />
              <Field label="Description" value={form?.description || "—"} full />
            </div>
          </div>

          {/* Payment */}

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">
              Payment
            </div>

            <div className="adm-drawer-grid">
              <Field
                label="Method"
                value={
                  form?.payment
                    ? form.payment.charAt(0).toUpperCase() +
                      form.payment.slice(1)
                    : "—"
                }
              />

              {form?.mpesaPhone && (
                <Field
                  label="M-Pesa Number"
                  value={form.mpesaPhone}
                  mono
                />
              )}

              <Field
                label="Base Fee"
                value={`KSh ${(fee || 0).toLocaleString()}`}
              />

              <Field
                label="Weight Cost"
                value={`KSh ${(weightCost || 0).toLocaleString()}`}
              />

              <Field
                label="Total Charged"
                value={`KSh ${(total || 0).toLocaleString()}`}
                teal
              />
            </div>
          </div>
        </div>

        <div className="adm-drawer-footer">
          <div className="adm-drawer-footer-label">
            Update shipment status
          </div>

          <div className="adm-status-row">
            {[
              "pending",
              "transit",
              "delivered",
              "cancelled",
            ].map((s) => (
              <button
                key={s}
                className={
                  `adm-status-opt ${s}` +
                  `${status === s ? " active" : ""}`
                }
                onClick={() => onStatusChange(id, s)}
              >
                {s === "transit"
                  ? "In Transit"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function AdminPage({ setPage }){

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const refresh = useCallback((spin = false) => {

    if(spin){
      setSpinning(true);
    }

    const data = loadAllBookings();

    setBookings(data);
    setLoading(false);

    if(spin){
      setTimeout(() => {
        setSpinning(false);
      }, 500);
    }

  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleStatusChange = (id, status) => {

    const ok = updateBookingStatus(id, status);

    if(ok){

      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, status }
            : b
        )
      );

      if(selected?.id === id){
        setSelected((prev) => ({
          ...prev,
          status,
        }));
      }

      showToast(
        `✓ Status updated to ${
          status === "transit"
            ? "In Transit"
            : status
        }`
      );
    }
  };

  const filtered = bookings.filter((b) => {

    const matchFilter =
      filter === "all" ||
      b.status === filter;

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

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.total || 0),
    0
  );

  const pending = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  const inTransit = bookings.filter(
    (b) => b.status === "transit"
  ).length;

  const delivered = bookings.filter(
    (b) => b.status === "delivered"
  ).length;

  return (
    <div className="adm-root">

      <style>{CSS}</style>

      {/* NAV */}

      <nav className="adm-nav">

        <div className="adm-nav-brand">
          <div className="adm-nav-brand-dot" />
          SpeedPak
          <span className="adm-nav-badge">
            Admin
          </span>
        </div>

        <div className="adm-nav-right">

          <button
            className="adm-nav-btn"
            onClick={() => setPage?.("home")}
          >
            ← Home
          </button>

          <button
            className="adm-nav-btn"
            onClick={() => setPage?.("book")}
          >
            + New Booking
          </button>

        </div>
      </nav>

      {/* MAIN */}

      <div className="adm-main">

        <div className="adm-header">

          <div className="adm-eyebrow">
            Control Panel
          </div>

          <h1 className="adm-title">
            Shipment <em>Dashboard</em>
          </h1>

          <p className="adm-subtitle">
            All bookings submitted through the SpeedPak form.
          </p>

        </div>

        {/* STATS */}

        <div className="adm-stats">

          {[
            {
              label:"Total Bookings",
              value:bookings.length,
              sub:"All time",
              cls:"amber",
            },
            {
              label:"Revenue (KSh)",
              value:`${(totalRevenue / 1000).toFixed(1)}K`,
              sub:"Estimated total",
              cls:"teal",
            },
            {
              label:"Pending",
              value:pending,
              sub:"Awaiting pickup",
              cls:"coral",
            },
            {
              label:"In Transit",
              value:inTransit,
              sub:`${delivered} delivered`,
              cls:"sky",
            },
          ].map((s) => (

            <div
              key={s.label}
              className={`adm-stat ${s.cls}`}
            >
              <div className="adm-stat-label">
                {s.label}
              </div>

              <div className="adm-stat-value">
                {loading ? "…" : s.value}
              </div>

              <div className="adm-stat-sub">
                {s.sub}
              </div>
            </div>

          ))}

        </div>

        {/* TOOLBAR */}

        <div className="adm-toolbar">

          <div className="adm-search-wrap">

            <span className="adm-search-icon">
              🔍
            </span>

            <input
              className="adm-search"
              placeholder="Search by ID, sender, county..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="adm-filter-group">

            {[
              "all",
              "pending",
              "transit",
              "delivered",
              "cancelled",
            ].map((f) => (

              <button
                key={f}
                className={
                  `adm-filter-btn${
                    filter === f
                      ? " active"
                      : ""
                  }`
                }
                onClick={() => setFilter(f)}
              >
                {f === "transit"
                  ? "Transit"
                  : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>

            ))}

          </div>

          <button
            className="adm-refresh-btn"
            onClick={() => refresh(true)}
          >
            {spinning ? "↻ Refreshing..." : "↻ Refresh"}
          </button>

        </div>

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
                <div className="adm-empty-title">
                  Loading bookings...
                </div>
              </div>

            ) : filtered.length === 0 ? (

              <div className="adm-empty">
                <div className="adm-empty-icon">📭</div>

                <div className="adm-empty-title">
                  No bookings found
                </div>

                <div className="adm-empty-sub">
                  Try adjusting your filters or search.
                </div>
              </div>

            ) : (

              filtered.map((b) => {

                const svc =
                  SVC_MAP[b.form?.speed] ||
                  SVC_MAP.standard;

                return (

                  <div
                    key={b.id}
                    className="adm-row"
                    onClick={() => setSelected(b)}
                  >

                    <div className="adm-cell adm-cell-id">
                      {b.id}
                    </div>

                    {/* Sender */}

                    <div className="adm-cell">

                      <div className="adm-cell-name">
                        {b.form?.senderName || "—"}
                      </div>

                      <div className="adm-cell-sub">
                        {b.form?.senderPhone || ""}
                      </div>

                      <div
                        className="adm-cell-sub"
                        style={{
                          color:"var(--amber2)",
                        }}
                      >
                        {b.form?.senderCounty || ""}
                      </div>

                    </div>

                    {/* Recipient */}

                    <div className="adm-cell">

                      <div className="adm-cell-name">
                        {b.form?.recipientName || "—"}
                      </div>

                      <div className="adm-cell-sub">
                        {b.form?.recipientPhone || ""}
                      </div>

                      <div
                        className="adm-cell-sub"
                        style={{
                          color:"var(--teal)",
                        }}
                      >
                        {b.form?.recipientCounty || ""}
                      </div>

                    </div>

                    {/* Route */}

                    <div className="adm-cell adm-cell-route">

                      <strong>
                        {b.form?.senderCounty || "—"}
                      </strong>

                      <span>→</span>

                      <strong>
                        {b.form?.recipientCounty || "—"}
                      </strong>

                    </div>

                    {/* Service */}

                    <div className="adm-cell">

                      <div className="adm-cell-name">
                        {svc.label}
                      </div>

                      <div className="adm-cell-sub">
                        {svc.eta}
                      </div>

                    </div>

                    {/* Amount */}

                    <div className="adm-cell adm-cell-amount">
                      KSh {(b.total || 0).toLocaleString()}
                    </div>

                    {/* Status */}

                    <div className="adm-cell">
                      <StatusBadge
                        status={b.status || "pending"}
                      />
                    </div>

                  </div>

                );
              })

            )}

          </div>

        </div>

      </div>

      {/* DRAWER */}

      {selected && (
        <DetailDrawer
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* TOAST */}

      {toast && (
        <div className="adm-toast">
          {toast}
        </div>
      )}

    </div>
  );
}