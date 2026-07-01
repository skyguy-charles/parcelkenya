const PAGE_LABELS = {
  home:     "Overview",
  book:     "Send Parcel",
  track:    "Track Parcel",
  coverage: "Coverage",
  contact:  "Support",
  account:  "Account",
  admin:    "Admin",
};

export default function TopBar({ page, setPage }) {
  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        SwiftParcel Kenya
        <span style={{ opacity: 0.3 }}>/</span>
        <span>{PAGE_LABELS[page] || page}</span>
      </div>
      <div className="topbar-actions">
        <button className="topbar-btn" onClick={() => setPage("track")}>
          🔍 Track
        </button>
        <button className="topbar-btn primary" onClick={() => setPage("book")}>
          + Send Parcel
        </button>
      </div>
    </header>
  );
}