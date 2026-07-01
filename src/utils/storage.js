// ── SHARED STORAGE ────────────────────────────────────────────
// Used by both BookPage.jsx and AdminPage.jsx

export function saveBooking(data) {
  try {
    localStorage.setItem(`booking:${data.id}`, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

export function loadAllBookings() {
  try {
    const results = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("booking:")) {
        const val = localStorage.getItem(key);
        if (val) results.push(JSON.parse(val));
      }
    }
    return results.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function updateBookingStatus(id, status) {
  try {
    const key = `booking:${id}`;
    const val = localStorage.getItem(key);
    if (!val) return false;
    const booking = JSON.parse(val);
    booking.status = status;
    localStorage.setItem(key, JSON.stringify(booking));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}