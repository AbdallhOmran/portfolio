// Mobile menu
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
}
menu.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Active link while scrolling
const links = [...nav.querySelectorAll("a")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.hash === "#" + e.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

// Skill bars fill when visible (change data-level in the HTML to adjust)
const bars = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.level + "%";
      bars.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".bar i").forEach((b) => bars.observe(b));

// Typing effect (skipped for visitors who prefer reduced motion)
const typed = document.getElementById("typed");
const words = ["Backend Developer", "API Builder", "Problem Solver"];
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let w = 0, i = words[0].length, deleting = true;
  setTimeout(function tick() {
    const word = words[w];
    i += deleting ? -1 : 1;
    typed.textContent = word.slice(0, i);
    let delay = deleting ? 45 : 90;
    if (!deleting && i === word.length) { deleting = true; delay = 1600; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; }
    setTimeout(tick, delay);
  }, 1800);
}

document.getElementById("year").textContent = new Date().getFullYear();