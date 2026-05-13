const typedText = document.getElementById("typedText");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const titles = [
  "Web Developer",
  "AI Engineer (Beginner)",
  "SEO Expert",
  "WordPress Designer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentTitle = titles[titleIndex];
  const nextText = isDeleting
    ? currentTitle.slice(0, charIndex--)
    : currentTitle.slice(0, charIndex++);

  typedText.textContent = nextText;

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && nextText === currentTitle) {
    delay = 1500;
    isDeleting = true;
  } else if (isDeleting && nextText === "") {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 320;
  }

  window.setTimeout(typeLoop, delay);
}

function setupReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const bars = document.querySelectorAll(".bar-track span");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");

      if (entry.target.classList.contains("skills-bars")) {
        bars.forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  reveals.forEach((item) => observer.observe(item));
  const skillsBars = document.querySelector(".skills-bars");
  if (skillsBars) {
    observer.observe(skillsBars);
  }
}

function setupNavigation() {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });
}

function setupParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero").offsetHeight;
    particles = Array.from({ length: Math.max(36, Math.floor(window.innerWidth / 36)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(73, 234, 255, 0.65)";
      ctx.fill();

      for (let i = index + 1; i < particles.length; i += 1) {
        const other = particles[i];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 95) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(73, 234, 255, ${0.15 - distance / 900})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    window.requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const originalText = button.textContent;
  button.textContent = "Message Ready";
  button.disabled = true;

  window.setTimeout(() => {
    event.currentTarget.reset();
    button.textContent = originalText;
    button.disabled = false;
  }, 1800);
});

typeLoop();
setupReveal();
setupNavigation();
setupParticles();
