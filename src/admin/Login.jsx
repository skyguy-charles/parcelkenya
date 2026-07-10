import { useState } from "react";
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await setPersistence(auth, browserSessionPersistence);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const uid = credential.user?.uid;
      console.log("Signed in UID:", uid);

      // Force a fresh ID token before Firestore access.
      await auth.currentUser?.getIdToken(true);

      const adminDoc = await getDoc(doc(db, "admins", uid));
      if (!adminDoc.exists()) {
        await signOut(auth);
        setError(
          `This account is not authorized as an admin. Create a Firestore document at admins/${uid} in the parcelkenya project.`
        );
        return;
      }

      onLogin?.();
    } catch (err) {
      console.error("Login error:", err);
      if (err?.code === "permission-denied") {
        setError(
          "Firestore access was blocked or denied. Disable browser extensions that block firestore.googleapis.com and retry."
        );
      } else {
        setError(err?.code || err?.message || "Invalid email or password");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={login}
        style={{
          width: 350,
          background: "white",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <h2>ParcelKenya Admin</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <div style={{ position: "relative", marginTop: 10 }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, paddingRight: 42 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 16,
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
}