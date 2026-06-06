const token = localStorage.getItem("token");

// PROTECT DASHBOARD
if (!token) {
  window.location.href = "Login.html";
}

// GET USER INFO
fetch("https://edtech-backend-7.onrender.com/profile", {
  method: "GET",

  headers: {
    Authorization: "Bearer " + token
  }
})

.then(res => res.json())

.then(data => {

  document.getElementById("username").innerText =
    data.user.fullName;

});
//-----------------Toggle menu------------------------------//

const menu = document.getElementById("span");
const nav = document.getElementById("nav");

let open = false;

menu.addEventListener("click", () => {
  open = !open;

  nav.classList.toggle("active");

  // change icon
  menu.textContent = open ? "close" : "menu";
});

// logout and modal //

const modal = document.getElementById("logoutModal");
const cancelBtn = document.getElementById("cancelLogout");
const confirmBtn = document.getElementById("confirmLogout");


function openLogoutModal() {
  modal.classList.add("active");
}

// CLOSE MODAL
function closeLogoutModal() {
  modal.classList.remove("active");
}

// ACTUAL LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "Login.html";
}

// EVENTS
document.getElementById("logoutBtn").addEventListener("click", openLogoutModal);

cancelBtn.addEventListener("click", closeLogoutModal);

confirmBtn.addEventListener("click", logout);

// IntersectionObserver //

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = [...cards].indexOf(entry.target);

      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 200);

      observer.unobserve(entry.target);
    }
  });
});

cards.forEach((card) => observer.observe(card));

  
  
