// 🔒 AUTH CHECK
const user = localStorage.getItem("userEmail");

if (!user) {
  alert("Please login first");
  window.location.href = "index.html";
}

// FETCH BOOKINGS
async function loadBookings() {
  try {
    const BASE_URL = "https://smart-park-backend-4vbr.onrender.com";

    const res = await fetch(`${BASE_URL}/api/bookings`);
    const data = await res.json();

    const userBookings = data.filter(b => b.user === user);

    const container = document.getElementById("bookingsList");

    if (userBookings.length === 0) {
      container.innerHTML = "<p>No bookings found</p>";
      return;
    }

    container.innerHTML = userBookings.map(b => `
      <div class="card">
        <h3>Slot: ${b.slotId}</h3>
        <p>User: ${b.user}</p>
        <p>Time: ${b.time}</p>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
    alert("Error loading bookings");
  }
}

loadBookings();