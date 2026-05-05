// AppSidebar.jsx
// All styles are inline or scoped via a unique [data-sp-sidebar] attribute selector
// to prevent any leakage into the rest of the app.

const NAV_ICONS = {
  home: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  track: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  coverage: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  account: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
};

// All tokens
const C = {
  bg: "#0e0e0e",
  border: "rgba(255,255,255,0.06)",
  gold: "#f59e0b",
  goldBright: "#fbbf24",
  goldDeep: "#ca8a04",
  goldBg: "rgba(245,158,11,0.12)",
  goldIcon: "rgba(245,158,11,0.20)",
  textPrimary: "rgba(255,255,255,0.80)",
  textMuted: "rgba(255,255,255,0.40)",
  textDim: "rgba(255,255,255,0.18)",
  textTiny: "rgba(255,255,255,0.28)",
  hoverBg: "rgba(255,255,255,0.04)",
  iconBg: "rgba(255,255,255,0.05)",
  badgeBg: "rgba(245,158,11,0.20)",
  divider: "rgba(255,255,255,0.05)",
};

const s = {
  // Root aside
  aside: {
    width: "240px",
    height: "100vh",
    backgroundColor: C.bg,
    borderRight: `1px solid ${C.border}`,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  glow: {
    position: "absolute",
    top: "-40px", left: "-40px", right: "-40px",
    height: "280px",
    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(202,138,4,0.13) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  inner: { position: "relative", zIndex: 1, display: "contents" },

  // Brand
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    padding: "20px 18px 17px",
    cursor: "pointer",
    borderBottom: `1px solid ${C.border}`,
    marginBottom: "4px",
    boxSizing: "border-box",
    transition: "opacity 0.15s",
    position: "relative",
    zIndex: 1,
    textDecoration: "none",
  },
  brandMark: {
    width: "36px",
    height: "36px",
    background: `linear-gradient(135deg, ${C.goldDeep} 0%, ${C.gold} 60%, ${C.goldBright} 100%)`,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    flexShrink: 0,
    boxShadow: `0 4px 16px rgba(202,138,4,0.38)`,
  },
  brandName: {
    fontFamily: "'Syne', 'DM Sans', sans-serif",
    fontSize: "15.5px",
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.3px",
    lineHeight: 1.1,
    margin: 0,
  },
  brandAccent: { color: C.gold },
  brandSub: {
    fontSize: "9.5px",
    color: C.textTiny,
    fontWeight: 500,
    letterSpacing: "1px",
    marginTop: "2px",
    textTransform: "uppercase",
  },

  // Nav
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    overflowY: "auto",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
  },
  sectionLabel: {
    fontSize: "9.5px",
    fontWeight: 600,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: C.textDim,
    padding: "14px 10px 5px",
    margin: 0,
  },

  // Nav button — base
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 10px",
    borderRadius: "9px",
    border: "none",
    background: "transparent",
    color: C.textMuted,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: "13.5px",
    fontWeight: 400,
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    marginBottom: "1px",
    boxSizing: "border-box",
    transition: "background 0.15s, color 0.15s",
    lineHeight: 1,
  },
  navBtnActive: {
    background: C.goldBg,
    color: C.goldBright,
    fontWeight: 500,
  },

  // Icon wrap
  iconWrap: {
    width: "28px",
    height: "28px",
    borderRadius: "7px",
    background: C.iconBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.15s, color 0.15s",
  },
  iconWrapActive: {
    background: C.goldIcon,
    color: C.gold,
  },

  // Badge
  badge: {
    marginLeft: "auto",
    fontSize: "10px",
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: "20px",
    background: C.badgeBg,
    color: C.goldBright,
    letterSpacing: "0.2px",
    lineHeight: 1.4,
  },
  badgeAlert: {
    background: "rgba(245,158,11,0.22)",
    color: C.gold,
    fontSize: "11px",
  },

  divider: {
    height: "1px",
    background: C.divider,
    margin: "8px 10px",
  },

  // Bottom / user
  bottom: {
    padding: "10px 10px 16px",
    borderTop: `1px solid ${C.border}`,
    position: "relative",
    zIndex: 1,
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 10px",
    borderRadius: "9px",
    cursor: "pointer",
    transition: "background 0.15s",
    boxSizing: "border-box",
  },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "9px",
    background: `linear-gradient(135deg, #92400e, ${C.gold})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "0.3px",
    userSelect: "none",
  },
  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: C.gold,
    position: "absolute",
    bottom: "-1px",
    right: "-1px",
    border: `1.5px solid ${C.bg}`,
    boxShadow: `0 0 6px rgba(245,158,11,0.55)`,
  },
  userName: {
    fontSize: "13px",
    fontWeight: 500,
    color: C.textPrimary,
    lineHeight: 1.2,
    margin: 0,
  },
  userRole: {
    fontSize: "11px",
    color: C.textTiny,
    margin: 0,
  },
  userArrow: {
    marginLeft: "auto",
    color: C.textDim,
    fontSize: "11px",
  },
};

function NavButton({ item, page, setPage }) {
  const isActive = page === item.id;
  return (
    <button
      style={{
        ...s.navBtn,
        ...(isActive ? s.navBtnActive : {}),
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.background = C.hoverBg;
          e.currentTarget.style.color = "rgba(255,255,255,0.70)";
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = C.textMuted;
        }
      }}
      onClick={() => setPage(item.id)}
    >
      <span style={{ ...s.iconWrap, ...(isActive ? s.iconWrapActive : {}) }}>
        {NAV_ICONS[item.icon]}
      </span>
      {item.label}
      {item.badge && (
        <span style={{ ...s.badge, ...(item.badgeType === "alert" ? s.badgeAlert : {}) }}>
          {item.badge}
        </span>
      )}
    </button>
  );
}

export default function AppSidebar({ page, setPage }) {
  // Load Google Fonts once without injecting global CSS rules
  if (typeof document !== "undefined" && !document.getElementById("sp-gfonts")) {
    const link = document.createElement("link");
    link.id = "sp-gfonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap";
    document.head.appendChild(link);
  }

  const mainNav = [
    { id: "home",     label: "Home",         icon: "home"     },
    { id: "book",     label: "Send Parcel",  icon: "book"     },
    { id: "track",    label: "Track Parcel", icon: "track",   badge: "2"              },
    { id: "coverage", label: "Coverage Map", icon: "coverage" },
  ];

  const secondaryNav = [
    { id: "contact", label: "Support",    icon: "contact" },
    { id: "account", label: "My Account", icon: "account" },
    { id: "admin",   label: "Admin",      icon: "admin",   badge: "!", badgeType: "alert" },
  ];

  return (
    <aside style={s.aside}>
      {/* Ambient gold glow — purely decorative, position:absolute inside overflow:hidden */}
      <div style={s.glow} aria-hidden="true" />

      {/* Brand */}
      <div
        style={s.brand}
        onClick={() => setPage("home")}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.80")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        <div style={s.brandMark}>📦</div>
        <div>
          <p style={s.brandName}>
            Swift<span style={s.brandAccent}>Parcel</span>
          </p>
          <p style={s.brandSub}>Kenya Logistics</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={s.nav}>
        <p style={s.sectionLabel}>Navigation</p>
        {mainNav.map(item => (
          <NavButton key={item.id} item={item} page={page} setPage={setPage} />
        ))}

        <div style={s.divider} />
        <p style={s.sectionLabel}>Account</p>
        {secondaryNav.map(item => (
          <NavButton key={item.id} item={item} page={page} setPage={setPage} />
        ))}
      </nav>

      {/* User */}
      <div style={s.bottom}>
        <div
          style={s.user}
          onMouseEnter={e => (e.currentTarget.style.background = C.hoverBg)}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <div style={s.avatarWrap}>
            <div style={s.avatar}>JK</div>
            <div style={s.statusDot} />
          </div>
          <div>
            <p style={s.userName}>John Kamau</p>
            <p style={s.userRole}>Personal Account</p>
          </div>
          <span style={s.userArrow}>↗</span>
        </div>
      </div>
    </aside>
  );
}