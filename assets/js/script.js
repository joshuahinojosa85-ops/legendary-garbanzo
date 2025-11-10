/* ===== Fade-in Scroll Animation ===== */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
});

/* ===== Cursor Glow Trail (Default: ON) ===== */
let trailEnabled = true;

function createPulse(e) {
  if (!trailEnabled) return;
  const pulse = document.createElement("div");
  pulse.className = "pulse-trace";
  pulse.style.left = e.pageX + "px";
  pulse.style.top = e.pageY + "px";
  document.body.appendChild(pulse);
  setTimeout(() => pulse.remove(), 700);
}
document.addEventListener("mousemove", createPulse);

/* ===== Trail Styling + Toggle ===== */
const pulseStyle = document.createElement("style");
pulseStyle.innerHTML = `
  .pulse-trace {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(0,255,255,0.6);
    pointer-events: none;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 20px rgba(0,255,255,0.8);
    animation: pulseFade 0.7s ease-out forwards;
    z-index: 1000;
  }
  @keyframes pulseFade {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
  }
  .trail-toggle {
    position: fixed;
    bottom: 15px;
    right: 20px;
    background: #0b0b0b;
    border: 1px solid #00ffff80;
    color: #00ffff;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 0 10px #00ffff40;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1500;
  }
  .trail-toggle:hover {
    box-shadow: 0 0 20px #00ffff80;
    background: #111;
  }
  .trail-toggle.off {
    color: #444;
    border-color: #444;
    box-shadow: none;
  }
  .trail-tooltip {
    position: fixed;
    bottom: 70px;
    right: 25px;
    background: rgba(0, 0, 0, 0.9);
    color: #00ffff;
    padding: 6px 10px;
    border: 1px solid #00ffff40;
    border-radius: 6px;
    font-size: 0.8rem;
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    box-shadow: 0 0 15px rgba(0,255,255,0.3);
    z-index: 1500;
  }
  .trail-toggle:hover + .trail-tooltip {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(pulseStyle);

/* ===== Toggle Button ===== */
const toggle = document.createElement("div");
toggle.className = "trail-toggle";
toggle.innerHTML = "⚡";
document.body.appendChild(toggle);

const tooltip = document.createElement("div");
tooltip.className = "trail-tooltip";
tooltip.textContent = "Toggle Pulse Trail";
document.body.appendChild(tooltip);

toggle.addEventListener("click", () => {
  trailEnabled = !trailEnabled;
  toggle.classList.toggle("off");
  toggle.innerHTML = trailEnabled ? "⚡" : "✖";
});
// ===== Neural Nexus UI Ping Sound =====
document.addEventListener("DOMContentLoaded", () => {
  const ping = new Audio("assets/sounds/ui-ping.mp3");
  ping.volume = 0.3; // soft and subtle

  // Select all nav links + return buttons
  const interactiveLinks = document.querySelectorAll("a, button, .main-node-btn");

  interactiveLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Clone audio so rapid clicks don't cut it off
      const playPing = ping.cloneNode();
      playPing.play().catch(() => {});
    });
  });
});
// ===== Neural Nexus Page Fade Transition =====
document.addEventListener("DOMContentLoaded", () => {
  // Trigger fade-in after load
  document.body.classList.add("fade-in");

  // Intercept link clicks for fade-out effect
  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    const url = new URL(link.href, window.location.origin);

    // Only trigger fade if staying within site
    if (url.origin === window.location.origin) {
      link.addEventListener("click", e => {
        // Allow middle-click or ctrl-click to open new tab normally
        if (e.ctrlKey || e.metaKey || e.button !== 0) return;

        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.style.opacity = "0";

        // Delay navigation until fade-out finishes
        setTimeout(() => {
          window.location.href = link.href;
        }, 400);
      });
    }
  });
});
