// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('active');
}

// Typing Animation
const text = ["Front-End Developer", "BCA Student"];
let index = 0, charIndex = 0;
const typingElement = document.getElementById("typing-text");

function type() {
  if (index >= text.length) index = 0;
  typingElement.textContent = text[index].slice(0, ++charIndex);
  if (charIndex === text[index].length) {
    setTimeout(() => {
      charIndex = 0;
      index++;
      setTimeout(type, 500);
    }, 1500);
  } else {
    setTimeout(type, 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();

  // Animate skill bars based on data-skill-level
  document.querySelectorAll('.skill-item').forEach(skill => {
    const level = skill.getAttribute('data-skill-level');
    const bar = skill.querySelector('.skill-level-bar');
    const fill = document.createElement('div');
    fill.style.width = `${level}%`;
    fill.style.height = '100%';
    fill.style.background = 'linear-gradient(90deg, #00dbde, #fc00ff)';
    fill.style.borderRadius = '5px';
    bar.appendChild(fill);
  });

  // Scroll Reveal
  ScrollReveal().reveal('.section', {
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out',
    origin: 'bottom',
    interval: 200
  });

  ScrollReveal().reveal('.cert-item', {
    distance: '30px',
    duration: 800,
    easing: 'ease-in-out',
    origin: 'bottom',
    interval: 200
  });
});

// Auto-close nav on link click (mobile)
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('active');
  });
});
// Highlight active nav link on click
const navLinks = document.querySelectorAll('#nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
document.addEventListener("mousemove", function (e) {
  const cursor = document.getElementById("custom-cursor");
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
ScrollReveal().reveal('.scroll-animate', {
  distance: '40px',
  duration: 1000,
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 150
});
