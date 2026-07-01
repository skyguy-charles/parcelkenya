import { useState, useEffect } from "react";
import TopBar from "./components/layout/TopBar";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicePage";
import CoverPage from "./pages/CoverPage";
import BookPage from "./pages/BookPage";
const PAGES = {
  coverage: CoverPage,
  account: AccountPage,
};
function getPageFromPath() {
  return window.location.pathname === "/admin" ? "admin" : "landing";
}
export default function App() {
  const [page, setPage] = useState(getPageFromPath);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  // Keep in sync with browser back/forward
  useEffect(() => {
    const onPopState = () => setPage(getPageFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  // Wrap setPage so navigating elsewhere in the app also clears the /admin URL
  const navigate = (pg) => {
    if (pg !== "admin" && window.location.pathname === "/admin") {
      window.history.pushState({}, "", "/");
    }
    setPage(pg);
  };
  if (page === "landing")  return <LandingPage setPage={navigate} />;
  if (page === "home")     return <HomePage setPage={navigate} />;
  if (page === "about")    return <AboutPage setPage={navigate} />;
  if (page === "admin")    return <AdminPage setPage={navigate} />;
  if (page === "services") return <ServicesPage setPage={navigate} />;
  if (page === "book")     return <BookPage setPage={navigate} />;
  const PageComponent = PAGES[page] ?? CoverPage;
  return (
    <div className="main-content">
      <TopBar page={page} setPage={navigate} />
      <PageComponent setPage={navigate} />
    </div>
  );
}