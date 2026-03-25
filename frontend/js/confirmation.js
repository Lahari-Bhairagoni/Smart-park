// Load booking details from localStorage
const data = JSON.parse(localStorage.getItem("lastBooking"));

// If booking does not exist, redirect user to home
if (!data) {
  alert("No booking found");
  window.location.href = "index.html";
}

// Fill confirmation details
document.getElementById("cSlot").innerText = data.slot;
document.getElementById("cVehicle").innerText = data.vehicle;
document.getElementById("cDuration").innerText = data.duration + " hours";
document.getElementById("cAmount").innerText = "₹" + data.amount;