/* ===== Fade-in scroll animation ===== */
const items = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
items.forEach(item => observer.observe(item));

/* ===== Cursor Glow Trail (default: ON) ===== */
let trailEnabled = true;

function createPulse(e) {
  if (!trailEnabled) return;
  const pulse = document.createElement('div');
  pulse.className = 'pulse-trace';
  pulse.style.left = e.pageX + 'px';
  pulse.style.top = e.pageY + 'px';
  document.body.appendChild(pulse);
  setTimeout(() => pulse.remove(), 700);
}

document.addEventListener('mousemove', createPulse);

/* ===== Trail Styling ===== */
const pulseStyle = document.createElement('style');
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
    0% { opacity: 1; transform: translate(-50%, -50%) scale(1);
