const roleToggle = document.querySelector(".role-toggle");
const roleButtons = document.querySelectorAll(".role-btn");
const loginForm = document.getElementById("loginForm");
const loginHint = document.getElementById("loginHint");
const loginError = document.getElementById("loginError");
const loginPanel = document.getElementById("loginPanel");
const dashboardPanel = document.getElementById("dashboardPanel");
const dashboardContent = document.getElementById("dashboardContent");
const roleTag = document.getElementById("roleTag");
const welcomeTitle = document.getElementById("welcomeTitle");
const logoutBtn = document.getElementById("logoutBtn");

let selectedRole = "driver";

const merchantAddresses = [
  { name: "Amazon Hub - Delhi", address: "Okhla Industrial Area Phase II, New Delhi", coords: "28.5335,77.2744" },
  { name: "Amazon Hub - Gurgaon", address: "Udyog Vihar Phase IV, Gurugram", coords: "28.4983,77.0842" },
  { name: "Flipkart Seller Node", address: "Sector 62, Noida", coords: "28.6205,77.3630" },
  { name: "Meesho Partner Hub", address: "Bhiwandi Logistics Park, Maharashtra", coords: "19.2813,73.0483" },
  { name: "D2C Seller Cluster", address: "Whitefield Industrial Zone, Bengaluru", coords: "12.9698,77.7499" },
  { name: "Amazon Hub - Hyderabad", address: "Madhapur Tech Corridor, Hyderabad", coords: "17.4474,78.3915" },
  { name: "Brand Dispatch Point", address: "Guindy Estate, Chennai", coords: "13.0104,80.2215" },
  { name: "Seller Node - Kolkata", address: "Salt Lake Sector V, Kolkata", coords: "22.5697,88.4339" },
  { name: "Fulfillment Center - Jaipur", address: "Sitapura Industrial Area, Jaipur", coords: "26.8025,75.8222" },
  { name: "Marketplace Pickup - Ahmedabad", address: "Naroda GIDC, Ahmedabad", coords: "23.0732,72.6730" }
];

const warehouses = [
  {
    id: "WH-DEL-01",
    name: "Delhi Mega Sort Hub",
    city: "Delhi",
    address: "Narela Freight Corridor, Delhi",
    coords: "28.8412,77.1015",
    current: { large: 420, medium: 680, small: 910 },
    remaining: { large: 180, medium: 320, small: 490 }
  },
  {
    id: "WH-GGN-02",
    name: "Gurugram Smart Warehouse",
    city: "Gurugram",
    address: "Sector 37 Industrial Belt, Gurugram",
    coords: "28.4721,77.0290",
    current: { large: 390, medium: 615, small: 830 },
    remaining: { large: 210, medium: 385, small: 570 }
  },
  {
    id: "WH-NOI-03",
    name: "Noida East Flow Center",
    city: "Noida",
    address: "Sector 81 Freight Zone, Noida",
    coords: "28.5608,77.3903",
    current: { large: 355, medium: 590, small: 790 },
    remaining: { large: 245, medium: 410, small: 610 }
  },
  {
    id: "WH-MUM-04",
    name: "Mumbai Bhiwandi Node",
    city: "Mumbai",
    address: "Kalyan-Bhiwandi Road, Maharashtra",
    coords: "19.2650,73.0349",
    current: { large: 500, medium: 760, small: 1030 },
    remaining: { large: 100, medium: 240, small: 370 }
  },
  {
    id: "WH-BLR-05",
    name: "Bengaluru Velocity Hub",
    city: "Bengaluru",
    address: "Hoskote Logistics District, Bengaluru",
    coords: "13.0789,77.8397",
    current: { large: 448, medium: 702, small: 925 },
    remaining: { large: 152, medium: 298, small: 475 }
  },
  {
    id: "WH-HYD-06",
    name: "Hyderabad Ring Sort Center",
    city: "Hyderabad",
    address: "Outer Ring Freight Belt, Hyderabad",
    coords: "17.3573,78.5539",
    current: { large: 376, medium: 620, small: 840 },
    remaining: { large: 224, medium: 380, small: 560 }
  },
  {
    id: "WH-CHE-07",
    name: "Chennai Coastal Hub",
    city: "Chennai",
    address: "Oragadam Logistic Zone, Chennai",
    coords: "12.8420,80.0245",
    current: { large: 342, medium: 570, small: 812 },
    remaining: { large: 258, medium: 430, small: 588 }
  },
  {
    id: "WH-KOL-08",
    name: "Kolkata East Link Warehouse",
    city: "Kolkata",
    address: "Dankuni Warehouse Cluster, Kolkata",
    coords: "22.6751,88.2844",
    current: { large: 321, medium: 544, small: 780 },
    remaining: { large: 279, medium: 456, small: 620 }
  },
  {
    id: "WH-JAI-09",
    name: "Jaipur Desert Route Hub",
    city: "Jaipur",
    address: "Ajmer Road Freight Park, Jaipur",
    coords: "26.8954,75.7050",
    current: { large: 290, medium: 510, small: 736 },
    remaining: { large: 310, medium: 490, small: 664 }
  },
  {
    id: "WH-AHD-10",
    name: "Ahmedabad Trade Flow Hub",
    city: "Ahmedabad",
    address: "Sanand Logistics Estate, Ahmedabad",
    coords: "22.9922,72.3849",
    current: { large: 305, medium: 532, small: 760 },
    remaining: { large: 295, medium: 468, small: 640 }
  }
];

const truckDrivers = Array.from({ length: 10 }, (_, index) => {
  const n = index + 1;
  const warehouse = warehouses[index];
  const merchant = merchantAddresses[index];
  return {
    id: `DRV-${String(n).padStart(2, "0")}`,
    username: `driver${String(n).padStart(2, "0")}`,
    password: `drive@${String(n).padStart(2, "0")}`,
    name: `Driver ${n}`,
    truckId: `MH12TR${2000 + n}`,
    currentCoords: warehouse.coords,
    currentPlace: `${warehouse.city} Outer Ring` ,
    merchant,
    warehouse
  };
});

const warehouseManagers = Array.from({ length: 10 }, (_, index) => {
  const n = index + 1;
  const warehouse = warehouses[index];
  return {
    id: `MGR-${String(n).padStart(2, "0")}`,
    username: `manager${String(n).padStart(2, "0")}`,
    password: `manage@${String(n).padStart(2, "0")}`,
    name: `Manager ${n}`,
    warehouseId: warehouse.id
  };
});

function buildWarehouseItems(warehouse) {
  return [
    { name: "Phone Cases Bulk Pack", price: 349, quantity: Math.floor(warehouse.current.small * 0.24) },
    { name: "Smartwatch Boxes", price: 2199, quantity: Math.floor(warehouse.current.medium * 0.18) },
    { name: "Kitchen Appliance Units", price: 4899, quantity: Math.floor(warehouse.current.large * 0.14) },
    { name: "Fashion Parcel Sets", price: 799, quantity: Math.floor(warehouse.current.small * 0.3) },
    { name: "Home Decor Combo", price: 1599, quantity: Math.floor(warehouse.current.medium * 0.22) }
  ];
}

function openDirections(origin, destination) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function attachTiltEffect(element, intensity = 8) {
  if (!element || element.dataset.tiltBound === "true") {
    return;
  }

  element.dataset.tiltBound = "true";

  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * intensity;
    const rotateX = (0.5 - y) * intensity;

    element.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
}

function bind3DInteractions() {
  attachTiltEffect(document.querySelector(".login-panel"), 6);

  document.querySelectorAll(".dashboard .card").forEach((card) => {
    attachTiltEffect(card, 9);
  });
}

function setRole(role) {
  selectedRole = role;
  roleToggle.dataset.role = role;

  roleButtons.forEach((button) => {
    const isActive = button.dataset.role === role;
    button.classList.toggle("active", isActive);
  });

  loginError.textContent = "";
  loginHint.textContent =
    role === "driver"
      ? "Demo credentials: driver01 / drive@01 (Truck Driver)"
      : "Demo credentials: manager01 / manage@01 (Warehouse Manager)";
}

function renderDriverDashboard(driver) {
  roleTag.textContent = "Truck Driver Console";
  welcomeTitle.textContent = `${driver.name} • Truck ${driver.truckId}`;

  dashboardContent.innerHTML = `
    <div class="dashboard-grid">
      <article class="card half">
        <h3>Merchant Pickup Assignment <span class="soft-emoji">📦</span></h3>
        <p><strong>Merchant:</strong> ${driver.merchant.name}</p>
        <p><strong>Pickup Address:</strong> ${driver.merchant.address}</p>
        <button class="map-btn" data-map="pickup">Open route to pickup</button>
      </article>

      <article class="card half">
        <h3>Warehouse Drop Assignment <span class="soft-emoji">🏬</span></h3>
        <p><strong>Warehouse:</strong> ${driver.warehouse.name}</p>
        <p><strong>Drop Address:</strong> ${driver.warehouse.address}</p>
        <button class="map-btn" data-map="drop">Open route to warehouse</button>
      </article>

      <article class="card">
        <h3>Complete Trip Route <span class="soft-emoji">🛣️</span></h3>
        <p>Use one-tap map routing from merchant to the warehouse nearest the consumer zone.</p>
        <button class="map-btn" data-map="trip">Open full trip map</button>
      </article>
    </div>
  `;

  const pickupBtn = dashboardContent.querySelector('[data-map="pickup"]');
  const dropBtn = dashboardContent.querySelector('[data-map="drop"]');
  const tripBtn = dashboardContent.querySelector('[data-map="trip"]');

  pickupBtn.addEventListener("click", () => {
    openDirections(driver.currentCoords, driver.merchant.coords);
  });

  dropBtn.addEventListener("click", () => {
    openDirections(driver.merchant.coords, driver.warehouse.coords);
  });

  tripBtn.addEventListener("click", () => {
    openDirections(driver.merchant.coords, driver.warehouse.coords);
  });
}

function renderWarehouseDashboard(manager) {
  const warehouse = warehouses.find((item) => item.id === manager.warehouseId);
  const inventoryRows = buildWarehouseItems(warehouse)
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>INR ${item.price}</td>
          <td>${item.quantity}</td>
        </tr>
      `
    )
    .join("");

  roleTag.textContent = "Warehouse Manager Console";
  welcomeTitle.textContent = `${manager.name} • ${warehouse.name}`;

  const trackingRows = truckDrivers
    .filter((driver) => driver.warehouse.id === warehouse.id)
    .map(
      (driver) => `
        <tr>
          <td>${driver.id}</td>
          <td>${driver.truckId}</td>
          <td>${driver.currentPlace}</td>
          <td><span class="status-on-time">In Transit</span></td>
          <td><button class="map-btn" data-truck="${driver.id}">Track on map</button></td>
        </tr>
      `
    )
    .join("");

  dashboardContent.innerHTML = `
    <div class="scroll-block">
      <article class="card">
        <h3>Warehouse Inventory by Item <span class="soft-emoji">📋</span></h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Item Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${inventoryRows}
            </tbody>
          </table>
        </div>
      </article>

      <article class="card">
        <h3>Current Warehouse Availability of Goods <span class="soft-emoji">📦</span></h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Package Type</th>
                <th>Current Units in Warehouse</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Large Packages</td><td>${warehouse.current.large}</td></tr>
              <tr><td>Medium Packages</td><td>${warehouse.current.medium}</td></tr>
              <tr><td>Small Packages</td><td>${warehouse.current.small}</td></tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="card">
        <h3>Additional Goods That Can Be Accommodated <span class="soft-emoji">➕</span></h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Package Type</th>
                <th>Remaining Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Large Packages</td><td>${warehouse.remaining.large}</td></tr>
              <tr><td>Medium Packages</td><td>${warehouse.remaining.medium}</td></tr>
              <tr><td>Small Packages</td><td>${warehouse.remaining.small}</td></tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="card">
        <h3>Package Tracking Through Truck Location <span class="soft-emoji">📍</span></h3>
        <p>Live route sharing is simulated with hardcoded truck positions.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Truck</th>
                <th>Current Place</th>
                <th>Status</th>
                <th>Map</th>
              </tr>
            </thead>
            <tbody>
              ${trackingRows}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  `;

  dashboardContent.querySelectorAll("[data-truck]").forEach((button) => {
    button.addEventListener("click", () => {
      const driver = truckDrivers.find((item) => item.id === button.dataset.truck);
      const googleMap = `https://www.google.com/maps?q=${encodeURIComponent(driver.currentCoords)}&z=12`;
      window.open(googleMap, "_blank", "noopener,noreferrer");
    });
  });
}

function showDashboard(role, user) {
  loginPanel.classList.add("hidden");
  dashboardPanel.classList.remove("hidden");

  if (role === "driver") {
    renderDriverDashboard(user);
  } else {
    renderWarehouseDashboard(user);
  }

  bind3DInteractions();
}

roleButtons.forEach((button) => {
  button.addEventListener("click", () => setRole(button.dataset.role));
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginError.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (selectedRole === "driver") {
    const driver = truckDrivers.find(
      (item) => item.username === username && item.password === password
    );
    if (!driver) {
      loginError.textContent = "Invalid truck driver credentials.";
      return;
    }
    showDashboard("driver", driver);
    return;
  }

  const manager = warehouseManagers.find(
    (item) => item.username === username && item.password === password
  );

  if (!manager) {
    loginError.textContent = "Invalid warehouse manager credentials.";
    return;
  }

  showDashboard("manager", manager);
});

logoutBtn.addEventListener("click", () => {
  dashboardPanel.classList.add("hidden");
  loginPanel.classList.remove("hidden");
  loginForm.reset();
  loginError.textContent = "";
  bind3DInteractions();
});

setRole("driver");
bind3DInteractions();
