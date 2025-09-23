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

  // Animate skill bars (progress effect if data-skill-level exists)
  document.querySelectorAll('.skill-item').forEach(skill => {
    const level = skill.getAttribute('data-skill-level');
    if (level) {
      const bar = skill.querySelector('.skill-level-bar');
      if (bar) {
        const fill = document.createElement('div');
        fill.style.width = `${level}%`;
        fill.style.height = '100%';
        fill.style.background = 'linear-gradient(90deg, #00dbde, #fc00ff)';
        fill.style.borderRadius = '5px';
        bar.appendChild(fill);
      }
    }
  });


// 🎯 Skills → alternate left/right
ScrollReveal().reveal('.skill-item:nth-child(odd)', {
  distance: '80px',
  origin: 'left',
  duration: 1000,
  interval: 150,
  reset: true
});
ScrollReveal().reveal('.skill-item:nth-child(even)', {
  distance: '80px',
  origin: 'right',
  duration: 1000,
  interval: 150,
  reset: true
});

// 🎯 Certificates → alternate left/right
ScrollReveal().reveal('.cert-card:nth-child(odd)', {
  distance: '80px',
  origin: 'left',
  duration: 1200,
  interval: 200,
  scale: 0.9,
  reset: true
});
ScrollReveal().reveal('.cert-card:nth-child(even)', {
  distance: '80px',
  origin: 'right',
  duration: 1200,
  interval: 200,
  scale: 0.9,
  reset: true
});

// 🎯 About Icons → alternate left/right
ScrollReveal().reveal('.social-icons li:nth-child(odd)', {
  distance: '50px',
  origin: 'left',
  duration: 1000,
  interval: 150,
  scale: 0.9,
  reset: true
});
ScrollReveal().reveal('.social-icons li:nth-child(even)', {
  distance: '50px',
  origin: 'right',
  duration: 1000,
  interval: 150,
  scale: 0.9,
  reset: true
});

// 🎯 Projects → alternate left/right
ScrollReveal().reveal('.project-card:nth-child(odd)', {
  distance: '80px',
  origin: 'left',
  duration: 1100,
  interval: 200,
  scale: 0.95,
  reset: true
});
ScrollReveal().reveal('.project-card:nth-child(even)', {
  distance: '80px',
  origin: 'right',
  duration: 1100,
  interval: 200,
  scale: 0.95,
  reset: true
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

// Custom cursor follow
document.addEventListener("mousemove", function (e) {
  const cursor = document.getElementById("custom-cursor");
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
