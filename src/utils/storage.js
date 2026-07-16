import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

// Save booking
export async function saveBooking(data) {
  try {
    await addDoc(collection(db, "bookings"), data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Load all bookings
export async function loadAllBookings() {
  try {
    const q = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Update booking status
export async function updateBookingStatus(id, status) {
  try {
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, {
      status,
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}