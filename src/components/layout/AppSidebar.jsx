// src/components/AppSidebar.jsx
import { useState, useEffect } from "react";
const NAV_ICONS = {
  home: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  services: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
};
const sidebarStyle = {
  width: "240px",
  minHeight: "100vh",
  background: "#0e0e0e",
  borderRight: "1px solid rgba(255,255,255,0.06)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: "20px 12px",
  boxSizing: "border-box",
};
const mobileButton = {
  position: "fixed",
  top: "15px",
  left: "15px",
  zIndex: 1000,
  background: "#f59e0b",
  border: "none",
  color: "black",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
const navButton = active => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  background: active ? "rgba(245,158,11,0.15)" : "transparent",
  color: active ? "#fbbf24" : "rgba(255,255,255,0.7)",
  fontSize: "14px",
  textAlign: "left",
});
function NavItem({ item, page, setPage, closeMenu }) {
  const active = page === item.id;
  return (
    <button
      style={navButton(active)}
      onClick={() => { setPage(item.id); closeMenu(); }}
    >
      {NAV_ICONS[item.icon]}
      {item.label}
    </button>
  );
}
export default function AppSidebar({ page = "home", setPage = () => {} }) {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navItems = [];
  if (mobile) {
    return (
      <>
        <button style={mobileButton} onClick={() => setOpen(!open)}>☰</button>
        {open && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }}
            onClick={() => setOpen(false)}
          />
        )}
        <aside style={{ ...sidebarStyle, position: "fixed", top: 0, left: open ? 0 : "-240px", zIndex: 999, transition: "0.3s" }}>
          <h2 style={{ color: "#f59e0b", marginBottom: "30px" }}>SwiftParcel</h2>
          {navItems.map(item => (
            <NavItem key={item.id} item={item} page={page} setPage={setPage} closeMenu={() => setOpen(false)} />
          ))}
        </aside>
      </>
    );
  }
  return (
    <aside style={sidebarStyle}>
      <h2 style={{ color: "#f59e0b", marginBottom: "30px" }}>SwiftParcel</h2>
      {navItems.map(item => (
        <NavItem key={item.id} item={item} page={page} setPage={setPage} closeMenu={() => {}} />
      ))}
    </aside>
  );
}