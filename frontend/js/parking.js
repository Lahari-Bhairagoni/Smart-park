/* ===============================
   ELEMENTS
================================ */

const user = localStorage.getItem("userEmail");

if (!user) {
  alert("Please login first");
  window.location.href = "index.html";
}
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
  const user = localStorage.getItem("userEmail");

  // 🔒 CHECK LOGIN FIRST
  if (!user) {
    alert("Please login first to book a slot");
    window.location.href = "index.html";
    return;
  }

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
      amount: duration * RATE,
      user: user
    })
  );

  closeModal();
  window.location.href = "payment.html";
}
/* ===============================
   INIT
================================ */

loadZone("A");
function selectZone(btn, zone) {
  // remove active from all
  document.querySelectorAll(".zone-btn").forEach(b => {
    b.classList.remove("btn-primary");
    b.classList.remove("active");
    b.classList.add("btn-outline");
  });

  // activate clicked
  btn.classList.remove("btn-outline");
  btn.classList.add("btn-primary");
  btn.classList.add("active");

  loadZone(zone);
}
function recommendSlot() {

  const currentZone = document.querySelector(".zone-btn.active").innerText.split(" ")[1];

  const slots = zones[currentZone];

  // filter only available slots
  const availableSlots = slots.filter(s => s.status === "available");

  if (availableSlots.length === 0) {
    document.getElementById("aiResult").innerText = "❌ No available slots";
    return;
  }

  // AI LOGIC (simple smart selection)
  const bestSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];

  // remove previous highlight
  document.querySelectorAll(".slot").forEach(s => s.style.border = "");

  // highlight selected slot
  const slotElements = document.querySelectorAll(".slot");
  slotElements.forEach(el => {
    if (el.innerText.includes(bestSlot.id)) {
      el.style.border = "3px solid #00ffcc";
    }
  });

  // Route suggestion (simple logic)
  const route = Math.random() > 0.5 ? "Main Gate" : "Side Entrance";

  document.getElementById("aiResult").innerText =
  `Slot: ${bestSlot.id} | Route: ${route} | Time: 3 min | Traffic: Low`;

}