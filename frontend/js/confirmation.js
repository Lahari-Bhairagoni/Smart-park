const data = JSON.parse(localStorage.getItem("lastBooking"));

if (!data) {
  location.href = "index.html";
}

document.getElementById("cSlot").innerText = data.slot;
document.getElementById("cVehicle").innerText = data.vehicle;
document.getElementById("cDuration").innerText = data.duration + " hours";
document.getElementById("cAmount").innerText = "₹" + data.amount;
