const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav a");
const statNumbers = document.querySelectorAll(".count");
const contactForm = document.querySelector(".contact-form");

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  mainNav.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const animateCounters = () => {
  statNumbers.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      counter.textContent = value.toLocaleString("en-IN");
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        obs.disconnect();
      }
    });
  },
  { threshold: 0.35 }
);

const awardsSection = document.getElementById("awards");
if (awardsSection) {
  observer.observe(awardsSection);
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const btn = contactForm.querySelector("button");
  const initialLabel = btn.textContent;
  btn.textContent = "Message Sent";
  btn.disabled = true;
  contactForm.reset();

  setTimeout(() => {
    btn.textContent = initialLabel;
    btn.disabled = false;
  }, 1800);
});
