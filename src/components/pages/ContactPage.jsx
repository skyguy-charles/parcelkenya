import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="page-content animate-in">
      <div className="page-header">
        <div className="page-eyebrow">Support</div>
        <h1 className="page-title">We're here to help</h1>
        <p className="page-desc">Reach out via any channel — we aim to respond within 2 hours.</p>
      </div>

      <div className="contact-grid">
        {/* Left: contact methods */}
        <div>
          {[
            { icon:"📞", title:"Phone",       val:"+254 700 000 000",          sub:"Mon–Sat, 7 am–8 pm"    },
            { icon:"💬", title:"WhatsApp",    val:"+254 700 111 111",           sub:"Available 24/7"        },
            { icon:"📧", title:"Email",       val:"support@swiftparcel.co.ke", sub:"Reply within 2 hours"  },
            { icon:"📍", title:"Head Office", val:"Tom Mboya St, Nairobi CBD", sub:"Mon–Sat, 7 am–7 pm"    },
          ].map(c => (
            <div className="contact-method" key={c.title}>
              <div className="contact-method-icon">{c.icon}</div>
              <div className="contact-method-body">
                <h4>{c.title}</h4>
                <div className="val">{c.val}</div>
                <div className="sub">{c.sub}</div>
              </div>
            </div>
          ))}

          <div style={{ background:"var(--ink)", borderRadius:"var(--r-lg)", padding:"20px 24px" }}>
            <div style={{ fontSize:"0.82rem", fontWeight:700, color:"rgba(255,255,255,0.7)", marginBottom:"10px", textTransform:"uppercase", letterSpacing:"0.8px" }}>
              Follow us
            </div>
            <div className="social-row">
              {["Twitter / X", "Facebook", "Instagram", "LinkedIn"].map(s => (
                <span className="social-chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form or confirmation */}
        {!sent ? (
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-card-header-icon">📬</div>
              <div>
                <h2>Send a message</h2>
                <p>We respond within 2 business hours</p>
              </div>
            </div>
            <div className="form-body">
              <div className="fgroup"><label>Full Name</label><input placeholder="John Kamau" /></div>
              <div className="fgroup"><label>Phone / Email</label><input placeholder="+254 700 000 000" /></div>
              <div className="fgroup">
                <label>Subject</label>
                <select>
                  <option>General Enquiry</option>
                  <option>Lost / Damaged Parcel</option>
                  <option>Complaint</option>
                  <option>Business Partnership</option>
                  <option>Tracking Issue</option>
                </select>
              </div>
              <div className="fgroup"><label>Tracking ID (if applicable)</label><input placeholder="SPK-XXXXXX" /></div>
              <div className="fgroup"><label>Message</label><textarea placeholder="Tell us how we can help..." /></div>
              <button
                className="btn btn-primary"
                style={{ width:"100%", justifyContent:"center" }}
                onClick={() => setSent(true)}
              >
                Send Message →
              </button>
            </div>
          </div>
        ) : (
          <div className="confirm-card">
            <div className="confirm-ring">✅</div>
            <h3 style={{ fontWeight:800, fontSize:"1.2rem" }}>Message sent!</h3>
            <p style={{ color:"var(--ink-60)", marginTop:6 }}>We'll get back to you within 2 hours.</p>
            <button className="btn btn-outline mt-md" onClick={() => setSent(false)}>
              Send another →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}