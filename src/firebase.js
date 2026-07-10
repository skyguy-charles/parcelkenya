import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA80M0x0EYVfkDhrhXkDvPOYwlBBITkwBQ",
  authDomain: "parcelkenya.firebaseapp.com",
  projectId: "parcelkenya",
  storageBucket: "parcelkenya.firebasestorage.app",
  messagingSenderId: "664163910615",
  appId: "1:664163910615:web:b3fc616033b89915440192",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;