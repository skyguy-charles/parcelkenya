import React, { useRef, useState } from "react";
import { saveBooking } from "../utils/storage";

/* ─────────────────────────────────────────────────────────────
   SPEEDPAK BOOK PAGE
───────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --bg:#080A0F;
  --bg2:#111520;
  --bg3:#171C29;
  --surface:#1B2233;
  --line:rgba(255,255,255,0.07);
  --line2:rgba(255,255,255,0.12);

  --gold:#F5A623;
  --gold2:#FFCB6B;

  --text:#F3F5FA;
  --text70:rgba(243,245,250,0.7);
  --text40:rgba(243,245,250,0.4);
  --text20:rgba(243,245,250,0.2);

  --green:#5EC4A1;

  --display:'Syne',sans-serif;
  --sans:'DM Sans',sans-serif;
  --mono:'JetBrains Mono',monospace;
}

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  background:var(--bg);
}

.bp-root{
  min-height:100vh;
  background:var(--bg);
  color:var(--text);
  font-family:var(--sans);
}

/* NAV */

.bp-nav{
  position:sticky;
  top:0;
  z-index:100;
  height:72px;
  padding:0 40px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:rgba(8,10,15,0.9);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--line);
}

.bp-nav-brand{
  display:flex;
  align-items:center;
  gap:10px;
  font-family:var(--display);
  font-weight:800;
  cursor:pointer;
}

.bp-nav-brand-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:var(--gold);
  box-shadow:0 0 12px var(--gold);
}

.bp-nav-center{
  font-size:0.82rem;
  color:var(--text40);
}

.bp-nav-center span{
  margin:0 6px;
}

.bp-nav-btn{
  border:none;
  background:var(--surface);
  color:var(--text);
  padding:10px 16px;
  border-radius:10px;
  cursor:pointer;
  font-size:0.82rem;
}

/* LAYOUT */

.bp-layout{
  display:grid;
  grid-template-columns:1fr 360px;
  gap:40px;
  padding:50px;
  align-items:start;
}

.bp-form-area{
  min-width:0;
}

/* HEADER */

.bp-page-header{
  margin-bottom:32px;
}

.bp-page-eyebrow{
  font-size:0.7rem;
  letter-spacing:2px;
  color:var(--gold);
  font-family:var(--mono);
  text-transform:uppercase;
  margin-bottom:14px;
}

.bp-page-title{
  font-size:clamp(2.3rem,5vw,4rem);
  line-height:1;
  font-family:var(--display);
  font-weight:800;
  letter-spacing:-2px;
}

.bp-page-title em{
  font-style:normal;
  background:linear-gradient(135deg,var(--gold),var(--gold2));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.bp-page-desc{
  margin-top:18px;
  color:var(--text40);
  line-height:1.8;
  max-width:620px;
}

/* PROGRESS */

.bp-progress{
  display:flex;
  gap:14px;
  margin-bottom:30px;
  flex-wrap:wrap;
}

.bp-progress-step{
  padding:10px 16px;
  border-radius:999px;
  background:var(--bg2);
  border:1px solid var(--line);
  color:var(--text40);
  font-size:0.76rem;
}

.bp-progress-step.active{
  background:rgba(245,166,35,0.08);
  border-color:rgba(245,166,35,0.3);
  color:var(--gold);
}

/* BLOCK */

.bp-block{
  background:var(--bg2);
  border:1px solid var(--line);
  border-radius:24px;
  padding:34px;
}

.bp-section{
  margin-bottom:26px;
}

.bp-section-head{
  display:flex;
  align-items:center;
  gap:14px;
  margin-bottom:20px;
}

.bp-section-num{
  width:34px;
  height:34px;
  border-radius:10px;
  background:rgba(245,166,35,0.1);
  color:var(--gold);
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:var(--mono);
  font-size:0.76rem;
}

.bp-section-title{
  font-size:1rem;
  font-weight:700;
}

/* INPUTS */

.bp-grid-2{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:18px;
}

.bp-field{
  margin-bottom:18px;
}

.bp-label{
  margin-bottom:10px;
  color:var(--text70);
  font-size:0.76rem;
  letter-spacing:1px;
  font-family:var(--mono);
}

.bp-input{
  width:100%;
  height:48px;
  border-radius:12px;
  border:1px solid var(--line2);
  background:var(--bg3);
  padding:0 16px;
  color:var(--text);
  outline:none;
  font-size:0.92rem;
}

.bp-input:focus{
  border-color:var(--gold);
}

/* LOCATION */

.bp-loc-row{
  display:flex;
  gap:10px;
}

.bp-loc-row .bp-input{
  flex:1;
}

.bp-loc-btn{
  flex-shrink:0;
  border:1px solid rgba(245,166,35,0.3);
  background:rgba(245,166,35,0.08);
  color:var(--gold);
  padding:0 18px;
  height:48px;
  border-radius:12px;
  cursor:pointer;
  font-size:0.82rem;
  font-weight:600;
  white-space:nowrap;
  transition:0.2s;
}

.bp-loc-btn:hover{
  background:rgba(245,166,35,0.15);
}

.bp-loc-btn:disabled{
  opacity:0.6;
  cursor:default;
}

.bp-loc-note{
  margin-top:10px;
  font-size:0.78rem;
  color:var(--green);
}

.bp-loc-error{
  margin-top:10px;
  font-size:0.78rem;
  color:#F27272;
}

/* SERVICES */

.bp-services{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}

.bp-svc{
  background:var(--bg3);
  border:1px solid var(--line2);
  border-radius:18px;
  padding:20px;
  cursor:pointer;
  transition:0.2s;
}

.bp-svc:hover{
  transform:translateY(-2px);
}

.bp-svc.sel{
  border-color:var(--gold);
  background:rgba(245,166,35,0.08);
}

.bp-svc-tag{
  color:var(--gold);
  font-size:0.65rem;
  font-family:var(--mono);
  margin-bottom:10px;
}

.bp-svc-name{
  font-weight:700;
  margin-bottom:8px;
}

.bp-svc-eta{
  color:var(--text40);
  font-size:0.82rem;
  margin-bottom:12px;
}

.bp-svc-price{
  font-weight:700;
}

/* SLOTS */

.bp-slots{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}

.bp-slot{
  background:var(--bg3);
  border:1px solid var(--line2);
  border-radius:16px;
  padding:18px;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:12px;
}

.bp-slot.sel{
  border-color:var(--gold);
  background:rgba(245,166,35,0.08);
}

.bp-slot-icon{
  font-size:1.2rem;
}

/* TOGGLE */

.bp-toggle-row{
  display:flex;
  justify-content:space-between;
  gap:18px;
  align-items:center;
  padding:22px;
  border-radius:18px;
  background:var(--bg3);
  border:1px solid var(--line2);
  cursor:pointer;
}

.bp-toggle-row.on{
  border-color:var(--gold);
}

.bp-toggle-title{
  font-weight:700;
}

.bp-toggle-sub{
  margin-top:6px;
  color:var(--text40);
  font-size:0.82rem;
}

.bp-toggle-switch{
  width:52px;
  height:28px;
  border-radius:999px;
  background:var(--gold);
}

/* FOOTER */

.bp-form-footer{
  display:flex;
  justify-content:space-between;
  gap:14px;
  margin-top:34px;
  flex-wrap:wrap;
}

.bp-btn-primary{
  border:none;
  background:var(--gold);
  color:#000;
  font-weight:700;
  padding:14px 24px;
  border-radius:12px;
  cursor:pointer;
}

.bp-btn-ghost{
  border:1px solid var(--line2);
  background:transparent;
  color:var(--text);
  padding:14px 24px;
  border-radius:12px;
  cursor:pointer;
}

/* SUMMARY */

.bp-summary{
  position:sticky;
  top:100px;
  background:var(--bg2);
  border:1px solid var(--line);
  border-radius:24px;
  padding:28px;
}

.bp-summary-title{
  font-size:1.2rem;
  font-weight:700;
  margin-bottom:24px;
}

.bp-summary-row{
  display:flex;
  justify-content:space-between;
  margin-bottom:16px;
  color:var(--text70);
}

.bp-summary-total{
  margin-top:24px;
  padding-top:24px;
  border-top:1px solid var(--line);
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  font-weight:700;
}

/* PAYMENT */

.bp-payments{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}

.bp-pay{
  background:var(--bg3);
  border:1px solid var(--line2);
  border-radius:18px;
  padding:20px;
  text-align:center;
  cursor:pointer;
}

.bp-pay.sel{
  border-color:var(--gold);
  background:rgba(245,166,35,0.08);
}

.bp-pay-icon{
  font-size:1.5rem;
}

.bp-pay-name{
  margin-top:10px;
  font-weight:700;
}

.bp-pay-detail{
  margin-top:24px;
}

.bp-cash-alert{
  margin-top:24px;
  background:rgba(94,196,161,0.1);
  border:1px solid rgba(94,196,161,0.3);
  padding:18px;
  border-radius:16px;
  color:var(--text70);
}

/* CONFIRM */

.bp-confirm{
  background:var(--bg2);
  border:1px solid var(--line);
  border-radius:28px;
  padding:50px 34px;
  text-align:center;
}

.bp-confirm-ring{
  width:90px;
  height:90px;
  border-radius:50%;
  margin:0 auto 24px;
  background:rgba(94,196,161,0.12);
  border:1px solid rgba(94,196,161,0.3);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:2rem;
  color:var(--green);
}

.bp-confirm-status{
  color:var(--green);
  font-family:var(--mono);
  letter-spacing:2px;
  font-size:0.75rem;
  margin-bottom:14px;
}

.bp-confirm-title{
  font-size:2.2rem;
  font-family:var(--display);
  font-weight:800;
}

.bp-confirm-sub{
  margin-top:12px;
  color:var(--text40);
}

.bp-tracking-id{
  margin-top:20px;
  font-size:1.5rem;
  font-family:var(--mono);
  color:var(--gold);
}

.bp-confirm-table{
  margin-top:36px;
  border-top:1px solid var(--line);
}

.bp-confirm-row{
  display:flex;
  justify-content:space-between;
  padding:18px 0;
  border-bottom:1px solid var(--line);
}

.bp-confirm-note{
  margin-top:28px;
  color:var(--text40);
  line-height:1.8;
}

.bp-confirm-actions{
  margin-top:32px;
  display:flex;
  gap:12px;
  justify-content:center;
  flex-wrap:wrap;
}

/* MOBILE */

@media (max-width: 1000px){
  .bp-layout{
    grid-template-columns:1fr;
  }
  .bp-summary{
    position:relative;
    top:0;
  }
  .bp-services,
  .bp-slots,
  .bp-payments{
    grid-template-columns:1fr;
  }
}

@media (max-width: 768px){
  .bp-nav{
    padding:0 18px;
  }
  .bp-nav-center{
    display:none;
  }
  .bp-layout{
    padding:20px;
  }
  .bp-block,
  .bp-summary,
  .bp-confirm{
    padding:22px;
    border-radius:20px;
  }
  .bp-grid-2{
    grid-template-columns:1fr;
  }
  .bp-loc-row{
    flex-direction:column;
  }
  .bp-loc-btn{
    height:44px;
    width:100%;
  }
  .bp-page-title{
    font-size:2.5rem;
  }
  .bp-form-footer{
    flex-direction:column;
  }
  .bp-btn-primary,
  .bp-btn-ghost{
    width:100%;
  }
  .bp-confirm-row{
    flex-direction:column;
    gap:8px;
    align-items:flex-start;
  }
}
`;

/* DATA */

const INITIAL_FORM_STATE = {
  senderName: "",
  senderPhone: "",
  senderCounty: "",
  recipientName: "",
  recipientPhone: "",
  recipientCounty: "",
  weight: "",
  speed: "standard",
  date: "",
  timeSlot: "",
  insurance: false,
  payment: "mpesa",
  mpesaPhone: "",
};

const SVC_MAP = {
  express: { label: "Express", price: 700 },
  standard: { label: "Standard", price: 420 },
  economy: { label: "Economy", price: 250 },
};

const slots = [
  { label: "Morning", sub: "8am – 12pm", icon: "🌤️" },
  { label: "Afternoon", sub: "12pm – 4pm", icon: "☀️" },
  { label: "Evening", sub: "4pm – 7pm", icon: "🌙" },
];

/* HELPERS */

function Field({ label, children }) {
  return (
    <div className="bp-field">
      <div className="bp-label">{label}</div>
      {children}
    </div>
  );
}

function Section({ num, title }) {
  return (
    <div className="bp-section">
      <div className="bp-section-head">
        <div className="bp-section-num">{num}</div>
        <div className="bp-section-title">{title}</div>
      </div>
    </div>
  );
}

function ProgressRail({ step }) {
  return (
    <div className="bp-progress">
      {["Sender", "Schedule", "Payment"].map((s, i) => (
        <div
          key={s}
          className={`bp-progress-step ${step === i + 1 ? "active" : ""}`}
        >
          {i + 1}. {s}
        </div>
      ))}
    </div>
  );
}

/* STEP 1 */

function Step1({ form, u, onNext }) {
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [locFound, setLocFound] = useState(false);

  const detectRecipientLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Location isn't supported on this device.");
      return;
    }
    setLocating(true);
    setLocError("");
    setLocFound(false);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await res.json();
          const addr = data.address || {};
          const place =
            addr.county ||
            addr.state_district ||
            addr.city ||
            addr.town ||
            addr.village ||
            addr.state ||
            data.display_name;
          u("recipientCounty", place || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } catch {
          u("recipientCounty", `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setLocating(false);
          setLocFound(true);
        }
      },
      () => {
        setLocating(false);
        setLocError("Couldn't detect location. Please turn on location access and try again, or enter it manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="bp-block">
      <Section num="A" title="Sender Information" />
      <div className="bp-grid-2">
        <Field label="Sender Name">
          <input className="bp-input" value={form.senderName} onChange={(e) => u("senderName", e.target.value)} />
        </Field>
        <Field label="Phone Number">
          <input className="bp-input" value={form.senderPhone} onChange={(e) => u("senderPhone", e.target.value)} />
        </Field>
      </div>
      <Field label="Sender County">
        <input className="bp-input" value={form.senderCounty} onChange={(e) => u("senderCounty", e.target.value)} />
      </Field>
      <Section num="B" title="Recipient Information" />
      <div className="bp-grid-2">
        <Field label="Recipient Name">
          <input className="bp-input" value={form.recipientName} onChange={(e) => u("recipientName", e.target.value)} />
        </Field>
        <Field label="Recipient Phone">
          <input className="bp-input" value={form.recipientPhone} onChange={(e) => u("recipientPhone", e.target.value)} />
        </Field>
      </div>
      <Field label="Recipient County">
        <div className="bp-loc-row">
          <input className="bp-input" value={form.recipientCounty} onChange={(e) => u("recipientCounty", e.target.value)} />
          <button type="button" className="bp-loc-btn" onClick={detectRecipientLocation} disabled={locating}>
            {locating ? "Locating…" : "📍 Use recipient's location"}
          </button>
        </div>
        {locFound && !locError && <div className="bp-loc-note">Location detected and filled in above.</div>}
        {locError && <div className="bp-loc-error">{locError}</div>}
      </Field>
      <Field label="Parcel Weight (kg)">
        <input className="bp-input" type="number" value={form.weight} onChange={(e) => u("weight", e.target.value)} />
      </Field>
      <div className="bp-form-footer">
        <button className="bp-btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  );
}

/* STEP 2 */

function Step2({ form, u, onBack, onNext }) {
  return (
    <div className="bp-block">
      <Section num="A" title="Delivery Service" />
      <div className="bp-services">
        {[
          { val: "express", tag: "Priority", name: "Express", eta: "Same day", price: "KSh 700+" },
          { val: "standard", tag: "Popular", name: "Standard", eta: "1–2 business days", price: "KSh 420+" },
          { val: "economy", tag: "Value", name: "Economy", eta: "3–5 business days", price: "KSh 250+" },
        ].map((s) => (
          <div key={s.val} className={`bp-svc ${form.speed === s.val ? "sel" : ""}`} onClick={() => u("speed", s.val)}>
            <div className="bp-svc-tag">{s.tag}</div>
            <div className="bp-svc-name">{s.name}</div>
            <div className="bp-svc-eta">{s.eta}</div>
            <div className="bp-svc-price">{s.price}</div>
          </div>
        ))}
      </div>
      <Section num="B" title="Collection Window" />
      <Field label="Pickup Date">
        <input className="bp-input" type="date" value={form.date} onChange={(e) => u("date", e.target.value)} />
      </Field>
      <div className="bp-slots">
        {slots.map((s) => (
          <div key={s.label} className={`bp-slot ${form.timeSlot === s.label ? "sel" : ""}`} onClick={() => u("timeSlot", s.label)}>
            <span className="bp-slot-icon">{s.icon}</span>
            <div>
              <div>{s.label}</div>
              <div style={{ opacity: 0.5, fontSize: "0.75rem" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <Section num="C" title="Add-ons" />
      <div className={`bp-toggle-row ${form.insurance ? "on" : ""}`} onClick={() => u("insurance", !form.insurance)}>
        <div>
          <div className="bp-toggle-title">Parcel Insurance Cover</div>
          <div className="bp-toggle-sub">Up to KSh 50,000 protection</div>
        </div>
        <div className="bp-toggle-switch" />
      </div>
      <div className="bp-form-footer">
        <button className="bp-btn-ghost" onClick={onBack}>← Back</button>
        <button className="bp-btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </div>
  );
}

/* STEP 3 */

function Step3({ form, u, total, onBack, onNext }) {
  return (
    <div className="bp-block">
      <Section num="A" title="Payment Method" />
      <div className="bp-payments">
        {[
          { val: "mpesa", icon: "📱", name: "M-Pesa" },
          { val: "card", icon: "💳", name: "Card" },
          { val: "cash", icon: "💵", name: "Cash" },
        ].map((p) => (
          <div key={p.val} className={`bp-pay ${form.payment === p.val ? "sel" : ""}`} onClick={() => u("payment", p.val)}>
            <div className="bp-pay-icon">{p.icon}</div>
            <div className="bp-pay-name">{p.name}</div>
          </div>
        ))}
      </div>
      {form.payment === "mpesa" && (
        <div className="bp-pay-detail">
          <Field label="M-Pesa Number">
            <input className="bp-input" placeholder="+254700000000" value={form.mpesaPhone} onChange={(e) => u("mpesaPhone", e.target.value)} />
          </Field>
        </div>
      )}
      {form.payment === "cash" && (
        <div className="bp-cash-alert">Pay your rider KSh {total.toLocaleString()} on pickup.</div>
      )}
      <div className="bp-form-footer">
        <button className="bp-btn-ghost" onClick={onBack}>← Back</button>
        <button className="bp-btn-primary" onClick={onNext}>Confirm Booking →</button>
      </div>
    </div>
  );
}

/* STEP 4 */

function Step4({ form, total, trackingId, onNew }) {
  return (
    <div className="bp-confirm">
      <div className="bp-confirm-ring">✓</div>
      <div className="bp-confirm-status">BOOKING CONFIRMED</div>
      <div className="bp-confirm-title">You're all set!</div>
      <div className="bp-confirm-sub">Tracking reference number</div>
      <div className="bp-tracking-id">{trackingId}</div>
      <div className="bp-confirm-table">
        <div className="bp-confirm-row">
          <span>Destination</span>
          <strong>{form.recipientCounty}</strong>
        </div>
        <div className="bp-confirm-row">
          <span>Service</span>
          <strong>{SVC_MAP[form.speed].label}</strong>
        </div>
        <div className="bp-confirm-row">
          <span>Total</span>
          <strong>KSh {total.toLocaleString()}</strong>
        </div>
      </div>
      <p className="bp-confirm-note">SMS confirmation has been sent successfully.</p>
      <div className="bp-confirm-actions">
        <button className="bp-btn-primary" onClick={onNew}>Book Another Parcel</button>
      </div>
    </div>
  );
}

/* SUMMARY */

function SummaryPanel({ fee, weightCost, total }) {
  return (
    <div className="bp-summary">
      <div className="bp-summary-title">Shipment Summary</div>
      <div className="bp-summary-row"><span>Delivery Fee</span><span>KSh {fee}</span></div>
      <div className="bp-summary-row"><span>Weight Charge</span><span>KSh {weightCost}</span></div>
      <div className="bp-summary-total"><span>Total</span><span>KSh {total}</span></div>
    </div>
  );
}

/* MAIN */

export default function BookPage({ setPage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const trackingId = useRef("SPK-" + Math.floor(100000 + Math.random() * 900000));
  const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const fee = (SVC_MAP[form.speed] || SVC_MAP.standard).price;
  const weightCost = Math.round(parseFloat(form.weight || 0) * 60);
  const total = fee + weightCost + (form.insurance ? 80 : 0);

  const handleConfirm = () => {
    // Save with booking:{id} key so AdminPage can read it
    saveBooking({
      id: trackingId.current,
      form,
      fee,
      weightCost,
      total,
      status: "pending",
      createdAt: Date.now(),
    });
    setStep(4);
  };

  const handleNew = () => {
    setForm(INITIAL_FORM_STATE);
    trackingId.current = "SPK-" + Math.floor(100000 + Math.random() * 900000);
    setStep(1);
  };

  return (
    <div className="bp-root">
      <style>{CSS}</style>
      <nav className="bp-nav">
        <div className="bp-nav-brand" onClick={() => setPage?.("home")}>
          <div className="bp-nav-brand-dot" />
          SpeedPak
        </div>
        <div className="bp-nav-center">New Shipment</div>
      </nav>
      <div className="bp-layout">
        <div className="bp-form-area">
          <div className="bp-page-header">
            <div className="bp-page-eyebrow">New Shipment</div>
            <h1 className="bp-page-title">Send a <em>Parcel</em></h1>
            <p className="bp-page-desc">Schedule parcel collection and delivery across Kenya.</p>
          </div>
          {step < 4 && <ProgressRail step={step} />}
          {step === 1 && <Step1 form={form} u={u} onNext={() => setStep(2)} />}
          {step === 2 && <Step2 form={form} u={u} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <Step3 form={form} u={u} total={total} onBack={() => setStep(2)} onNext={handleConfirm} />}
          {step === 4 && <Step4 form={form} total={total} trackingId={trackingId.current} onNew={handleNew} />}
        </div>
        {step < 4 && <SummaryPanel fee={fee} weightCost={weightCost} total={total} />}
      </div>
    </div>
  );
}