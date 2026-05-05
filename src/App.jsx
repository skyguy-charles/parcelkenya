import { useState, useEffect } from "react";
import "./index.css";

import AppSidebar from "./components/AppSidebar";
import TopBar     from "./components/TopBar";

import HomePage    from "./components/pages/HomePage";
import BookPage    from "./components/pages/BookPage";
import TrackPage   from "./TrackPage";
import CoveragePage from "./components/pages/CoverPage";
import ContactPage  from "./components/pages/ContactPage";
import AccountPage  from "./components/pages/AccountPage";
import AdminPage    from "./components/pages/Adminpage";
import AboutPage    from "./components/pages/AboutPage";

const PAGES = {
  track:    TrackPage,
  coverage: CoveragePage,
  contact:  ContactPage,
  account:  AccountPage,
  admin:    AdminPage,
};

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Full-bleed dark pages with their own nav — render outside sidebar shell
  if (page === "home")  return <HomePage  setPage={setPage} />;
  if (page === "about") return <AboutPage setPage={setPage} />;
  if (page === "book")  return <BookPage  setPage={setPage} />;

  const PageComponent = PAGES[page] || TrackPage;

  return (
    <div className="app-shell">
      <AppSidebar page={page} setPage={setPage} />
      <div className="main-content">
        <TopBar page={page} setPage={setPage} />
        <PageComponent setPage={setPage} />
      </div>
    </div>
  );
}