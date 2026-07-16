import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>ParcelKenya Admin Dashboard</h1>

      <button
        onClick={() => signOut(auth)}
        style={{ padding: 10, marginTop: 20 }}
      >
        Logout
      </button>
    </div>
  );
}