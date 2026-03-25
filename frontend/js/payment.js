// ===============================
// LOAD BOOKING DATA
// ===============================

const user = localStorage.getItem("userEmail");

if (!user) {
  alert("Please login first");
  window.location.href = "index.html";
}
const booking = JSON.parse(localStorage.getItem("bookingData"));

if (!booking) {
  alert("No booking found");
  window.location.href = "/frontend/pages/parking.html";
}

// Fill booking details
document.getElementById("slotText").innerText = booking.slot;
document.getElementById("vehicleText").innerText = booking.vehicle;
document.getElementById("durationText").innerText = booking.duration + " hours";
document.getElementById("durationText2").innerText = booking.duration + " hours";
document.getElementById("amountText").innerText = "₹" + booking.amount;
document.getElementById("payAmount").innerText = "₹" + booking.amount;


// ===============================
// PAYMENT TABS
// ===============================

const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".payment-form");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    forms.forEach(f => f.classList.add("hidden"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.method).classList.remove("hidden");

  });
});


// ===============================
// CONFIRM PAYMENT
// ===============================

window.confirmPayment = async function () {

  const activeTab = document.querySelector(".tab.active").dataset.method;

  // ================= VALIDATION =================

  if (activeTab === "card") {
    const cardNumber = document.querySelector("#card input[placeholder='1234 5678 9012 3456']").value.replace(/\s/g, "");
    const expiry = document.querySelector("#card input[placeholder='MM/YY']").value;
    const cvv = document.querySelector("#card input[placeholder='123']").value;

    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be 16 digits");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Enter expiry in MM/YY format");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be 3 digits");
      return;
    }
  }

  if (activeTab === "upi") {
    const upi = document.querySelector("#upi input").value;

    if (!upi.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }
  }

  if (activeTab === "wallet") {
    const wallet = document.querySelector("#wallet select").value;

    if (!wallet) {
      alert("Select a wallet");
      return;
    }
  }

  // ================= PAYMENT PROCESS =================

  try {

    const booking = JSON.parse(localStorage.getItem("bookingData"));

    await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: booking.user,
        slotId: booking.slot,
        time: new Date().toLocaleString()
      })
    });

    localStorage.setItem("lastBooking", JSON.stringify(booking));

    window.location.href = "confirmation.html";

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }

};

