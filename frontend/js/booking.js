const slotInput = document.getElementById("slotInput");
const durationSelect = document.getElementById("durationSelect");
const durationText = document.getElementById("durationText");
const totalAmount = document.getElementById("totalAmount");
const vehicleInput = document.getElementById("vehicleInput");

const RATE_PER_HOUR = 50;

// Load selected slot
const selectedSlot = localStorage.getItem("selectedSlot");
if (!selectedSlot) {
  alert("No slot selected");
  window.location.href = "parking.html";
}
slotInput.value = selectedSlot;

// Update cost
function updateCost() {
  const hours = Number(durationSelect.value);
  durationText.innerText = `${hours} Hour${hours > 1 ? "s" : ""}`;
  totalAmount.innerText = `₹${hours * RATE_PER_HOUR}`;
}

durationSelect.addEventListener("change", updateCost);

// Proceed to payment
function proceedPayment() {
  if (!vehicleInput.value.trim()) {
    alert("Please enter vehicle number");
    return;
  }

  const booking = {
    slot: selectedSlot,
    vehicle: vehicleInput.value,
    duration: durationSelect.value,
    amount: Number(durationSelect.value) * RATE_PER_HOUR
  };

  localStorage.setItem("bookingData", JSON.stringify(booking));
  window.location.href = "payment.html";
}

// Init
updateCost();
