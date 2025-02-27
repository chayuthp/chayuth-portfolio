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
                <div id="dragBar-${id}" class="cursor-move bg-gray-800 text-white p-2 rounded-t-lg flex justify-between">
                    🟦 ${id}
                    <div>
                        <button onclick="toggleMaximize('${id}')" class="px-2 bg-yellow-500 rounded-full hover:bg-yellow-700">⬜</button>
                        <button onclick="closeWindow('${id}')" class="px-2 bg-red-500 rounded-full hover:bg-red-700">&times;</button>
                    </div>
                </div>
                <div id="modalContent-${id}" class="p-4">
                    <p>นี่คือหน้าต่าง ${id} 🎉</p>
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
        "Available commands: <br> - <b>help</b>: Show available commands <br> - <b>clear</b>: Clear terminal";
      break;
    case "clear":
      output.innerHTML = "";
      return;
    default:
      response.innerHTML = `Command not found: <b>${command}</b>`;
  }
  output.appendChild(response);
}

document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive');
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
          move();
      });
  }

  window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
  });

  move();
});

// Create a Typewriter instance for typing and deleting effect
const typewriter = new Typewriter('.text-container', {
  loop: true, // Make it loop continuously
  delay: 75,  // Typing speed
  deleteSpeed: 50, // Deleting speed
});

// Add the first text
typewriter.typeString('Hello 👋')
  .pauseFor(3000)  // Pause for 1 second before deleting
  .deleteAll()  // Delete all text
  .pauseFor(1000)  // Pause before typing the next text

  // Add the second text
  .typeString('CHAYUTH')
  .pauseFor(3000)
  .deleteAll()
  .start();  // Start the typing animation