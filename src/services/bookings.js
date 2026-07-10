import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const bookingsRef = collection(db, "bookings");

function toBookingDoc(snapshot) {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt ?? null,
  };
}

export async function addBooking(payload) {
  try {
    const bookingData = {
      ...payload,
      status: payload.status ?? "pending",
      createdAt: payload.createdAt ?? serverTimestamp(),
    };

    return await addDoc(bookingsRef, bookingData);
  } catch (error) {
    console.error("Failed to add booking:", error);
    throw error;
  }
}

export async function getBookings() {
  try {
    const q = query(bookingsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(toBookingDoc);
  } catch (error) {
    console.error("Failed to load bookings:", error);
    return [];
  }
}

export function subscribeBookings(callback) {
  const q = query(bookingsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(toBookingDoc);
    callback(bookings);
  });
}

export async function updateBookingStatus(id, status, user = null) {
  try {
    const updateData = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (user?.uid) {
      updateData.statusHistory = arrayUnion({
        status,
        updatedBy: user.uid,
        email: user.email || null,
        updatedAt: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, "bookings", id), updateData);
    return true;
  } catch (error) {
    console.error("Failed to update booking status:", error);
    throw error;
  }
}

export async function deleteBooking(id) {
  try {
    await deleteDoc(doc(db, "bookings", id));
    return true;
  } catch (error) {
    console.error("Failed to delete booking:", error);
    throw error;
  }
}
