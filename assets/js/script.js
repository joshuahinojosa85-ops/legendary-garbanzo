// Fade-in scroll animation
const items = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
items.forEach(item => observer.observe(item));

// Optional cursor glow effect
document.addEventListener('mousemove', e => {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.left = e.pageX + 'px';
  glow.style.top = e.pageY + 'px';
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), 500);
});

// Cursor-glow styling
const style = document.createElement('style');
style.innerHTML = `
  .cursor-glow {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(0,255,255,0.4);
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(0,255,255,0.6);
    animation: fadeout 0.5s forwards;
  }
  @keyframes fadeout {
    to { opacity: 0; transform: translate(-50%, -50%) scale(2); }
  }
`;
document.head.appendChild(style);
