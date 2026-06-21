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


const icon = document.getElementById("search-icon");
const search = document.getElementById("search");

icon.addEventListener("click", () => {
  search.classList.toggle("active");
});