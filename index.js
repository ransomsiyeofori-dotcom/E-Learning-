const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

let open = false;

function siderbar() {
  open = !open;

  nav.classList.toggle("active");
  menu.textContent = open ? "close" : "menu";
}

// Close menu when user taps outside
document.addEventListener("click", (e) => {
  if (
    open &&
    !nav.contains(e.target) &&
    !menu.contains(e.target)
  ) {
    nav.classList.remove("active");
    menu.textContent = "menu";
    open = false;
  }
});

const slides = document.querySelectorAll(".card");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let interval;

/* CREATE DOTS */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    index = i;
    showSlide();
    resetAuto();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

/* SHOW SLIDE */
function showSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

/* NEXT / PREV */
next.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide();
  resetAuto();
});

prev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide();
  resetAuto();
});

/* AUTO SLIDE */
function startAuto() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide();
  }, 3000);
}

function resetAuto() {
  clearInterval(interval);
  startAuto();
}

startAuto();
showSlide();

const icon = document.getElementById("search-icon");
const search = document.getElementById("search");

icon.addEventListener("click", () => {
  search.classList.toggle("active");
});

//----------IntersectionObserver-----//

const cards = document.querySelectorAll(".Service");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

cards.forEach((card) => {
  observer.observe(card);
});

//----------Intro-Animetion-------//
window.addEventListener("load", () => {

  setTimeout(() => {

    const intro = document.getElementById("intro");

    intro.classList.add("fade-out");

    setTimeout(() => {
      intro.remove();
    }, 800);

  }, 2000);

});
