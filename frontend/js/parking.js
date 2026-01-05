/* ===============================
   ELEMENTS
================================ */

const grid = document.getElementById("parkingGrid");

const totalEl = document.getElementById("totalSlots");
const availableEl = document.getElementById("availableSlots");
const evEl = document.getElementById("evCount");
const availabilityEl = document.getElementById("availabilityPercent");

/* ===============================
   DATA
================================ */

const RATE = 50; // ₹ per hour
let selectedSlot = null;
let duration = 2;

const zones = {
  A: createZone("A", 4, 10), // 40 slots
  B: createZone("B", 4, 8),  // 32 slots
  C: createZone("C", 3, 10)  // 30 slots
};

function createZone(zone, rows, cols) {
  const slots = [];
  const rowLabels = ["A", "B", "C", "D"];

  for (let r = 0; r < rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const rand = Math.random();

      let status = "available";
      if (rand < 0.35) status = "occupied";
      else if (rand < 0.55) status = "reserved";

      slots.push({
        id: `${rowLabels[r]}-${c}`,
        zone,
        status,
        ev: Math.random() < 0.2
      });
    }
  }
  return slots;
}

/* ===============================
   RENDER ZONE
================================ */

function loadZone(zoneKey) {
  const slots = zones[zoneKey];
  grid.innerHTML = "";

  let available = 0;
  let evCount = 0;

  slots.forEach(slot => {
    const div = document.createElement("div");
    div.className = "card slot";
    div.innerHTML = `<div class="slot-id">${slot.id}</div>`;

    if (slot.status === "available") {
      div.classList.add("slot-available");
      available++;
      div.onclick = () => openBookingModal(slot);
    }

    if (slot.status === "occupied") {
      div.classList.add("slot-occupied");
    }

    if (slot.status === "reserved") {
      div.classList.add("slot-reserved");
    }

    if (slot.ev) {
      div.classList.add("slot-ev");
      evCount++;
    }

    grid.appendChild(div);
  });

  totalEl.innerText = slots.length;
  availableEl.innerText = available;
  evEl.innerText = evCount;
  availabilityEl.innerText =
    Math.round((available / slots.length) * 100) + "%";
}

/* ===============================
   BOOKING MODAL
================================ */

function openBookingModal(slot) {
  selectedSlot = slot;
  duration = 2;

  document.getElementById("modalSlot").innerText = slot.id;
  document.getElementById("modalRow").innerText = slot.id.split("-")[0];
  document.getElementById("vehicleInput").value = "";

  setDefaultDuration();
  updatePrice();

  document.getElementById("bookingModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("bookingModal").classList.add("hidden");
}

/* ===============================
   DURATION LOGIC (FIXED)
================================ */

function setDefaultDuration() {
  const buttons = document.querySelectorAll(".duration-buttons button");

  buttons.forEach(btn => btn.classList.remove("active"));

  buttons.forEach(btn => {
    if (btn.innerText === "2h") {
      btn.classList.add("active");
    }
  });

  duration = 2;
}

function setDuration(hours) {
  duration = hours;

  const buttons = document.querySelectorAll(".duration-buttons button");

  buttons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText === `${hours}h`) {
      btn.classList.add("active");
    }
  });

  updatePrice();
}

function updatePrice() {
  document.getElementById("durationText").innerText = `${duration} hours`;
  document.getElementById("totalAmount").innerText = `₹${duration * RATE}`;
}

/* ===============================
   CONFIRM BOOKING
================================ */

function confirmBooking() {
  const vehicle = document.getElementById("vehicleInput").value.trim();

  if (!vehicle) {
    alert("Please enter vehicle registration number");
    return;
  }

  localStorage.setItem(
    "bookingData",
    JSON.stringify({
      slot: selectedSlot.id,
      vehicle,
      duration,
      amount: duration * RATE
    })
  );

  closeModal();
  window.location.href = "payment.html";
}

/* ===============================
   INIT
================================ */

loadZone("A");
