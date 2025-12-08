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
    "fixed grid-snap bg-white rounded-lg shadow-lg border resizable popup w-[95vw] h-[80vh] md:w-[900px] md:h-[700px] flex flex-col";
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
    <div id="dragBar-${id}" class="cursor-move flex items-center bg-gray-800 p-2 md:p-3 shadow-md text-sm md:text-base">
        <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer mr-3">
            <span class="text-gray-300 text-xl">☰</span>
        </div>
        <div class="flex-grow text-gray-300 text-start bg-gray-900 p-2 rounded-full">
            Chayuth-Project
        </div>
        <div class="p-2">
            <div>
                <button onclick="toggleMaximize('${id}')" class="w-6 h-6 px-2 bg-yellow-500 rounded-full hover:bg-yellow-700"></button>
                <button onclick="closeWindow('${id}')" class="w-6 h-6 px-2 bg-red-500 rounded-full hover:bg-red-700 text-white"></button>
            </div>
        </div>
    </div>
    <div id="modalContent-${id}" class="flex-1 overflow-auto showcase-container">
      <!-- Header -->
      <div class="showcase-header">
        <h1 class="showcase-title">My Projects</h1>
        <p class="showcase-subtitle">Explore my latest work and creative endeavors</p>
      </div>

      <!-- Filter Bar -->
      <div class="project-filter-bar" id="filterBar-${id}">
        <button class="filter-chip active" data-filter="all">All Projects</button>
        <button class="filter-chip" data-filter="frontend">Frontend</button>
        <button class="filter-chip" data-filter="fullstack">Full-Stack</button>
        <button class="filter-chip" data-filter="clone">Clone</button>
      </div>

      <!-- Project Grid -->
      <div class="project-masonry-grid" id="projectGrid-${id}">
        
        <!-- Project Card 1 -->
        <div class="project-card" data-category="fullstack">
          <div class="project-thumbnail">
            <img src="next1.png" alt="Authentication Project" loading="lazy" />
            <div class="project-overlay">
              <span class="category-tag">Full-Stack</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">Authentication FACEBOOK+LINE</h3>
            <p class="project-tagline">Social authentication integration with Next.js</p>
            <div class="tech-stack">
              <span class="tech-pill frontend">HTML</span>
              <span class="tech-pill styling">Tailwind</span>
              <span class="tech-pill framework">Next.js</span>
            </div>
            <div class="project-footer">
              <a href="#" onclick="event.preventDefault(); alert('Web deploy coming soon');" class="project-view-btn">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="project-card" data-category="clone">
          <div class="project-thumbnail">
            <img src="cloneRandomWeb.png" alt="Clone Random Web" loading="lazy" />
            <div class="project-overlay">
              <span class="category-tag">Clone</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">Clone Random Web</h3>
            <p class="project-tagline">Pixel-perfect recreation of modern web designs</p>
            <div class="tech-stack">
              <span class="tech-pill frontend">HTML</span>
              <span class="tech-pill styling">Tailwind</span>
              <span class="tech-pill framework">JavaScript</span>
            </div>
            <div class="project-footer">
              <a href="https://chayuthp.github.io/cloneRandom1/" target="_blank" class="project-view-btn">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Project Card 3 -->
        <div class="project-card" data-category="frontend">
          <div class="project-thumbnail">
            <img src="dynamicSortProject.png" alt="Dynamic Sort Project" loading="lazy" />
            <div class="project-overlay">
              <span class="category-tag">Frontend</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">Dynamic Sort Project</h3>
            <p class="project-tagline">Interactive sorting visualization tool</p>
            <div class="tech-stack">
              <span class="tech-pill frontend">HTML</span>
              <span class="tech-pill styling">CSS</span>
              <span class="tech-pill framework">JavaScript</span>
            </div>
            <div class="project-footer">
              <a href="https://chayuthp.github.io/dynamicSort/" target="_blank" class="project-view-btn">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Project Card 4 -->
        <div class="project-card" data-category="frontend">
          <div class="project-thumbnail">
            <img src="pokePic.png" alt="PokePic" loading="lazy" />
            <div class="project-overlay">
              <span class="category-tag">Frontend</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">PokePic</h3>
            <p class="project-tagline">Pokémon encyclopedia with API integration</p>
            <div class="tech-stack">
              <span class="tech-pill frontend">HTML</span>
              <span class="tech-pill styling">Tailwind</span>
              <span class="tech-pill framework">JavaScript</span>
            </div>
            <div class="project-footer">
              <a href="https://chayuthp.github.io/pokeTest/" target="_blank" class="project-view-btn">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Project Card 5 -->
        <div class="project-card" data-category="frontend">
          <div class="project-thumbnail">
            <img src="kanbanBoardToDo.png" alt="Kanban Board" loading="lazy" />
            <div class="project-overlay">
              <span class="category-tag">Frontend</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">Kanban Board To Do</h3>
            <p class="project-tagline">Drag-and-drop task management board</p>
            <div class="tech-stack">
              <span class="tech-pill frontend">HTML</span>
              <span class="tech-pill styling">CSS</span>
              <span class="tech-pill framework">JavaScript</span>
            </div>
            <div class="project-footer">
              <a href="https://chayuthp.github.io/kanban/" target="_blank" class="project-view-btn">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Project Card 6 -->
        <div class="project-card" data-category="clone">
          <div class="project-thumbnail">
            <img src="cloneSpotify.png" alt="Clone Spotify" loading="lazy" />
            <div class="project-overlay">
              <span class="category-tag">Clone</span>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">Clone Spotify</h3>
            <p class="project-tagline">Spotify UI recreation with responsive design</p>
            <div class="tech-stack">
              <span class="tech-pill frontend">HTML</span>
              <span class="tech-pill styling">Tailwind</span>
              <span class="tech-pill framework">JavaScript</span>
            </div>
            <div class="project-footer">
              <a href="https://chayuthp.github.io/cloneSpotify/" target="_blank" class="project-view-btn">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  document.getElementById("windowContainer").appendChild(modal);

  // Ensure mobile starts in view
  if (!position && window.innerWidth < 768) {
    modal.style.left = "10px";
    modal.style.top = "10px";
  }

  makeDraggable(id);
  windows[id] = { modal, maximized: false };

  // Initialize animations and interactions after modal is added to DOM
  initializeShowcase(id);
}

// Initialize showcase animations and filter functionality
function initializeShowcase(popupId) {
  const modal = document.getElementById(popupId);
  if (!modal) return;

  // Animate cards with staggered delay
  const cards = modal.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
      // Mark as loaded after animation
      setTimeout(() => card.classList.add('loaded'), 500);
    }, 100 + (index * 120)); // Stagger by 120ms
  });

  // Setup filter functionality
  const filterBar = modal.querySelector(`#filterBar-${popupId}`);
  const projectGrid = modal.querySelector(`#projectGrid-${popupId}`);

  if (filterBar && projectGrid) {
    const filterChips = filterBar.querySelectorAll('.filter-chip');

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Update active state
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filterValue = chip.dataset.filter;
        const allCards = projectGrid.querySelectorAll('.project-card');

        // Animate out then filter
        allCards.forEach(card => {
          card.classList.add('fade-out');
        });

        setTimeout(() => {
          allCards.forEach(card => {
            const category = card.dataset.category;
            if (filterValue === 'all' || category === filterValue) {
              card.classList.remove('hidden', 'fade-out');
              // Re-trigger animation
              card.classList.remove('animate-in');
              setTimeout(() => card.classList.add('animate-in'), 10);
            } else {
              card.classList.add('hidden');
              card.classList.remove('fade-out');
            }
          });
        }, 300);
      });
    });
  }
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
  .addEventListener("click", () => createPopupResume("popup2"));
document
  .getElementById("openModal3")
  .addEventListener("click", () => showTerminal());

// THIS CODE UNDER HERE FOR TERMINAL

function createPopupResume(id, position = null) {
  if (windows[id]) return; // เปิดได้แค่หนึ่งแท็บต่อปุ่ม
  console.log("id-popup= ", id);

  const modal = document.createElement("div");
  modal.id = id;
  modal.className =
    "fixed grid-snap bg-white rounded-lg shadow-lg border resizable popup w-[95vw] h-[80vh] md:w-[900px] md:h-[700px] flex flex-col";
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
    <div id="dragBar-${id}" class="cursor-move flex items-center bg-gray-800 p-2 md:p-3 shadow-md text-sm md:text-base">
        <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer mr-3">
            <span class="text-gray-300 text-xl">☰</span>
        </div>
        <div class="flex-grow text-gray-300 text-start bg-gray-900 p-2 rounded-full">
            Chauyuth_CV.pdf
        </div>
        <div class="p-2">
            <div>
                <button onclick="toggleMaximize('${id}')" class="w-6 h-6 px-2 bg-yellow-500 rounded-full hover:bg-yellow-700"></button>
                <button onclick="closeWindow('${id}')" class="w-6 h-6 px-2 bg-red-500 rounded-full hover:bg-red-700 text-white"></button>
            </div>
        </div>
    </div>

    <div class="p-0 flex-1 overflow-auto bg-white">
      <div class="flex items-center justify-between px-3 md:px-4 py-2 bg-gray-100 border-b">
        <h2 class="text-gray-700 font-medium">Resume / CV</h2>
        <div class="space-x-2 text-xs md:text-sm">
          <a href="Chauyuth_CV.pdf" target="_blank" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full">Open in new tab</a>
          <a href="Chauyuth_CV.pdf" download class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full">Download</a>
        </div>
      </div>
      <iframe src="Chauyuth_CV.pdf" class="w-full h-[70vh] md:h-[600px]" title="Chayuth Resume"></iframe>
    </div>
            `;

  document.getElementById("windowContainer").appendChild(modal);
  // Ensure mobile starts in view
  if (!position && window.innerWidth < 768) {
    modal.style.left = "10px";
    modal.style.top = "10px";
  }
  makeDraggable(id);
  windows[id] = { modal, maximized: false };
}

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
        "Available commands: <br> - <b>help</b>: Show available commands <br> - <b>clear</b>: Clear terminal <br> - <b>about</b>: About me <br> - <b>Project</b>: Open file Project <br> - <b>resume</b>: Open file Resume";
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
    case "project":
      createPopup("popup1");
      break;
    case "resume":
      createPopupResume("popup2");
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
