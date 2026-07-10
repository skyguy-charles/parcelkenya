import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";

import Login from "./admin/Login";
import AdminPage from "./pages/AdminPage";

import TopBar from "./components/layout/TopBar";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicePage";
import CoverPage from "./pages/CoverPage";
import BookPage from "./pages/BookPage";

const PAGES = {
  coverage: CoverPage,
  account: AccountPage,
};

function getPageFromPath() {
  if (window.location.pathname === "/admin") return "admin";
  return "landing";
}

export default function App() {
  const [page, setPage] = useState(getPageFromPath);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  // Listen for browser back/forward
  useEffect(() => {
    const onPopState = () => {
      setPage(getPageFromPath());
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Listen for Firebase login/logout and verify admin role
  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!mounted) return;

      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, "admins", currentUser.uid));
        if (adminDoc.exists()) {
          if (!mounted) return;
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          await signOut(auth);
          if (!mounted) return;
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
        if (!mounted) return;
        setUser(null);
        setIsAdmin(false);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Navigation helper
  const navigate = (pg) => {
    if (pg === "admin") {
      window.history.pushState({}, "", "/admin");
    } else {
      window.history.pushState({}, "", "/");
    }

    setPage(pg);
  };

  // ===========================
  // ADMIN AREA
  // ===========================
  if (page === "admin") {
    if (loading) {
      return <div style={{ padding: 40 }}>Loading...</div>;
    }

    if (!user) {
      return <Login />;
    }

    if (!isAdmin) {
      return (
        <div style={{ padding: 40, color: "#fff" }}>
          <h2>Access denied</h2>
          <p>You must be signed in with an admin account to view this page.</p>
        </div>
      );
    }

    return <AdminPage setPage={navigate} />;
  }

  // ===========================
  // CUSTOMER WEBSITE
  // ===========================

  if (page === "landing")
    return <LandingPage setPage={navigate} />;

  if (page === "home")
    return <HomePage setPage={navigate} />;

  if (page === "about")
    return <AboutPage setPage={navigate} />;

  if (page === "services")
    return <ServicesPage setPage={navigate} />;

  if (page === "book")
    return <BookPage setPage={navigate} />;

  const PageComponent = PAGES[page] ?? CoverPage;

  return (
    <div className="main-content">
      <TopBar page={page} setPage={navigate} />
      <PageComponent setPage={navigate} />
    </div>
  );
}