const booking = JSON.parse(localStorage.getItem("bookingData"));

if (!booking) {
  alert("No booking found");
  location.href = "parking.html";
}

document.getElementById("slotText").innerText = booking.slot;
document.getElementById("vehicleText").innerText = booking.vehicle;
document.getElementById("durationText").innerText = booking.duration + " hours";
document.getElementById("durationText2").innerText = booking.duration + " hours";
document.getElementById("amountText").innerText = `₹${booking.amount}`;
document.getElementById("payAmount").innerText = `₹${booking.amount}`;


// Tabs
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

function confirmPayment() {
  alert("Payment Successful! Booking Confirmed.");
  localStorage.clear();
  location.href = "index.html";
}
