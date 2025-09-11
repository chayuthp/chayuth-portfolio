const gridSize = 20;
let windows = {};

// โหลดตำแหน่งที่จำได้
window.onload = () => {
  const savedWindows = JSON.parse(localStorage.getItem("windows")) || {};
  Object.keys(savedWindows).forEach((id) => createPopup(id, savedWindows[id]));
};

let lastPopupPosition = { left: 500, top: 10 }; // ตำแหน่งเริ่มต้น

function createPopup(id, position = null) {
  if (windows[id]) return; // เปิดได้แค่หนึ่งแท็บต่อปุ่ม
  console.log("id-popup= ", id);

  const modal = document.createElement("div");
  modal.id = id;
  modal.className =
    "fixed grid-snap w-[900px] h-[700px] bg-white rounded-lg shadow-lg border resizable popup";
  modal.style.zIndex = 1000;

  // ถ้าไม่มีตำแหน่งที่ส่งเข้ามา ใช้ตำแหน่งที่คำนวณใหม่
  if (position) {
    modal.style.left = `${position.left}px`;
    modal.style.top = `${position.top}px`;
    modal.style.width = `${position.width}px`;
    modal.style.height = `${position.height}px`;
  } else {
    modal.style.left = `${lastPopupPosition.left}px`;
    modal.style.top = `${lastPopupPosition.top}px`;

    // คำนวณตำแหน่งของป๊อปอัพถัดไป
    lastPopupPosition.left += 30; // เพิ่มระยะห่างในแนวนอน
    lastPopupPosition.top += 30; // เพิ่มระยะห่างในแนวตั้ง
  }

  modal.innerHTML = `
    <div id="dragBar-${id}" class="cursor-move flex items-center bg-gray-800 p-3 shadow-md">
        <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer mr-3">
            <span class="text-gray-300 text-xl">☰</span>
        </div>
        <div class="flex-grow text-gray-300 text-start bg-gray-900 p-2 rounded-full">
            https://www.example.com
        </div>
        <div class="p-2">
            <div>
                <button onclick="toggleMaximize('${id}')" class="w-6 h-6 px-2 bg-yellow-500 rounded-full hover:bg-yellow-700"></button>
                <button onclick="closeWindow('${id}')" class="w-6 h-6 px-2 bg-red-500 rounded-full hover:bg-red-700 text-white"></button>
            </div>
        </div>
    </div>
<div id="modalContent" class="p-6">
      <h1 class="text-2xl font-bold text-white mb-6">My Projects</h1>

      <!-- Grid Layout -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Card Template (1) -->
        <div
          class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            class="w-full h-48 object-cover"
            src="https://picsum.photos/600/400?random=1"
            alt="Project Preview"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold text-white">Project 1</h3>
            <p class="text-gray-400 text-sm mt-2">รายละเอียดโปรเจกต์ 🎉</p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                >React</span
              >
              <span
                class="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
                >Node.js</span
              >
              <span
                class="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium"
                >MongoDB</span
              >
            </div>

            <div class="flex justify-end mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
              >
                View
              </a>
            </div>
          </div>
        </div>

        <!-- Card Template (2) -->
        <div
          class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            class="w-full h-48 object-cover"
            src="https://picsum.photos/600/400?random=1"
            alt="Project Preview"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold text-white">Project 1</h3>
            <p class="text-gray-400 text-sm mt-2">รายละเอียดโปรเจกต์ 🎉</p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                >React</span
              >
              <span
                class="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
                >Node.js</span
              >
              <span
                class="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium"
                >MongoDB</span
              >
            </div>

            <div class="flex justify-end mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
              >
                View
              </a>
            </div>
          </div>
        </div>

        <!-- Card Template (3) -->
        <div
          class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            class="w-full h-48 object-cover"
            src="https://picsum.photos/600/400?random=1"
            alt="Project Preview"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold text-white">Project 1</h3>
            <p class="text-gray-400 text-sm mt-2">รายละเอียดโปรเจกต์ 🎉</p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                >React</span
              >
              <span
                class="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
                >Node.js</span
              >
              <span
                class="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium"
                >MongoDB</span
              >
            </div>

            <div class="flex justify-end mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
              >
                View
              </a>
            </div>
          </div>
        </div>

        <!-- Card Template (4) -->
        <div
          class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            class="w-full h-48 object-cover"
            src="https://picsum.photos/600/400?random=1"
            alt="Project Preview"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold text-white">Project 1</h3>
            <p class="text-gray-400 text-sm mt-2">รายละเอียดโปรเจกต์ 🎉</p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                >React</span
              >
              <span
                class="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
                >Node.js</span
              >
              <span
                class="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium"
                >MongoDB</span
              >
            </div>

            <div class="flex justify-end mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
              >
                View
              </a>
            </div>
          </div>
        </div>

        <!-- Card Template (5) -->
        <div
          class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            class="w-full h-48 object-cover"
            src="https://picsum.photos/600/400?random=1"
            alt="Project Preview"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold text-white">Project 1</h3>
            <p class="text-gray-400 text-sm mt-2">รายละเอียดโปรเจกต์ 🎉</p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                >React</span
              >
              <span
                class="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
                >Node.js</span
              >
              <span
                class="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium"
                >MongoDB</span
              >
            </div>

            <div class="flex justify-end mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
              >
                View
              </a>
            </div>
          </div>
        </div>

        <!-- Card Template (6) -->
        <div
          class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            class="w-full h-48 object-cover"
            src="https://picsum.photos/600/400?random=1"
            alt="Project Preview"
          />

          <div class="p-5">
            <h3 class="text-xl font-semibold text-white">Project 1</h3>
            <p class="text-gray-400 text-sm mt-2">รายละเอียดโปรเจกต์ 🎉</p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
                >React</span
              >
              <span
                class="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium"
                >Node.js</span
              >
              <span
                class="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium"
                >MongoDB</span
              >
            </div>

            <div class="flex justify-end mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
              >
                View
              </a>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
            `;

  document.getElementById("windowContainer").appendChild(modal);
  makeDraggable(id);
  windows[id] = { modal, maximized: false };
}

// ฟังก์ชันลากหน้าต่าง
function makeDraggable(id) {
  const modal = document.getElementById(id);
  const dragBar = document.getElementById(`dragBar-${id}`);
  let offsetX = 0,
    offsetY = 0,
    isDragging = false;

  dragBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - modal.getBoundingClientRect().left;
    offsetY = e.clientY - modal.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      modal.style.left = `${e.clientX - offsetX}px`;
      modal.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    snapToGrid(modal);
    saveWindows();
  });
}

// ฟังก์ชัน Snap to Grid
function snapToGrid(modal) {
  const left = Math.round(modal.offsetLeft / gridSize) * gridSize;
  const top = Math.round(modal.offsetTop / gridSize) * gridSize;
  modal.style.left = `${left}px`;
  modal.style.top = `${top}px`;
}

// ฟังก์ชัน Maximize
function toggleMaximize(id) {
  const { modal, maximized } = windows[id];
  if (!maximized) {
    modal.dataset.oldLeft = modal.style.left;
    modal.dataset.oldTop = modal.style.top;
    modal.dataset.oldWidth = modal.style.width;
    modal.dataset.oldHeight = modal.style.height;
    modal.style.left = "0px";
    modal.style.top = "0px";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
  } else {
    modal.style.left = modal.dataset.oldLeft;
    modal.style.top = modal.dataset.oldTop;
    modal.style.width = modal.dataset.oldWidth;
    modal.style.height = modal.dataset.oldHeight;
  }
  windows[id].maximized = !maximized;
  saveWindows();
}

// ฟังก์ชันปิดหน้าต่าง
function closeWindow(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("popup-closing");
    modal.addEventListener("animationend", () => {
      modal.remove();
      delete windows[id];
      saveWindows();
    });
  }
}

// บันทึกตำแหน่งหน้าต่าง
function saveWindows() {
  const positions = {};
  Object.keys(windows).forEach((id) => {
    const modal = windows[id].modal;
    positions[id] = {
      left: modal.offsetLeft,
      top: modal.offsetTop,
      width: modal.offsetWidth,
      height: modal.offsetHeight,
    };
  });
  localStorage.setItem("windows", JSON.stringify(positions));
}

// Event เปิดป๊อปอัพ
document
  .getElementById("openModal1")
  .addEventListener("click", () => createPopup("popup1"));
document
  .getElementById("openModal2")
  .addEventListener("click", () => createPopup("popup2"));
document
  .getElementById("openModal3")
  .addEventListener("click", () => showTerminal());

// THIS CODE UNDER HERE FOR TERMINAL

function showTerminal() {
  terminal.classList.remove("hidden");
  terminal.style.animation = "fadeIn 0.3s ease";
}

// Make terminal draggable
const terminal = document.getElementById("terminal");
const header = document.getElementById("terminal-header");
const openBtn = document.getElementById("open-terminal-btn");
const closeBtn = document.getElementById("close-btn");
const input = document.getElementById("input");
const output = document.getElementById("output");

let offsetX = 0,
  offsetY = 0,
  isDragging = false;

// Dragging functionality
header.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - terminal.offsetLeft;
  offsetY = e.clientY - terminal.offsetTop;
  header.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    terminal.style.left = `${e.clientX - offsetX}px`;
    terminal.style.top = `${e.clientY - offsetY}px`;
    terminal.style.position = "absolute";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  header.style.cursor = "move";
});

// Close button functionality
closeBtn.addEventListener("click", () => {
  terminal.style.animation = "fadeOut 0.3s ease";
  terminal.addEventListener(
    "animationend",
    () => {
      terminal.classList.add("hidden");
    },
    { once: true }
  );
});

// Fade-out animation for closing
const style = document.createElement("style");
style.innerHTML = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
document.head.appendChild(style);

// Terminal input functionality
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim();
    if (command) {
      const userLine = document.createElement("div");
      userLine.classList.add("output-line");
      userLine.innerHTML = `<span class="text-green-300">user@terminal:~$</span> ${command}`;
      output.appendChild(userLine);
      processCommand(command);
    }
    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});

// Process terminal commands
function processCommand(command) {
  const response = document.createElement("div");
  response.classList.add("output-line");
  switch (command.toLowerCase()) {
    case "help":
      response.innerHTML =
        "Available commands: <br> - <b>help</b>: Show available commands <br> - <b>clear</b>: Clear terminal <br> - <b>about</b>: About me <br> - <b>portfolio</b>: Open file portfolio <br> - <b>project</b>: Open file project";
      break;
    case "about":
      response.innerHTML = `👋 Hi, I'm Chayuth — Full‑Stack Developer. 💻
                    <br>
                    <strong>Frontend 🌐</strong>
                    <br>
                    HTML, CSS, JavaScript/TypeScript, React, Next.js, Tailwind, Bootstrap
                    <br>
                    <strong>Backend ⚙️</strong>
                    <br>
                    Node.js/Express, REST API
                    <br>
                    <strong>Database 🗃️</strong>
                    <br>
                    SQL Server, MongoDB
                    <br>
                    <strong>Tools 🛠️</strong>
                    <br>
                    Git/GitLab, Figma
                    <br>
                    <strong>Focus 🎯</strong>
                    <br>
                    Responsive, dynamic apps — end‑to‑end delivery
                    <br><br>
                    Type 'help' for commands.`;
      break;
      case "portfolio":
        createPopup("popup1");
        break;
        case "project":
          createPopup("popup2");
          break;
    case "clear":
      output.innerHTML = "";
      return;
    default:
      response.innerHTML = `Command not found: <b>${command}</b>`;
  }
  output.appendChild(response);
}

document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".interactive");
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(
      curX
    )}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});

// Create a Typewriter instance for typing and deleting effect
const typewriter = new Typewriter(".text-container", {
  loop: true, // Make it loop continuously
  delay: 75, // Typing speed
  deleteSpeed: 50, // Deleting speed
});

// Add the first text
typewriter
  .typeString("Hello 👋")
  .pauseFor(3000) // Pause for 1 second before deleting
  .deleteAll() // Delete all text
  .pauseFor(1000) // Pause before typing the next text

  // Add the second text
  .typeString("CHAYUTH")
  .pauseFor(3000)
  .deleteAll()
  .start(); // Start the typing animation

  //tooltips
  document.addEventListener("DOMContentLoaded", function () {
    const toast = document.getElementById("toast");
    const closeToast = document.getElementById("close-toast");

    // Show toast with animation
    setTimeout(() => {
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
    }, 1000);

    // Close toast on button click
    closeToast.addEventListener("click", () => {
      toast.classList.add("opacity-0");
      setTimeout(() => {
        toast.remove();
      }, 300);
    });
  });