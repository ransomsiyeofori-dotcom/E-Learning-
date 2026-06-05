const token = localStorage.getItem("token");

// PROTECT DASHBOARD
if (!token) {
  window.location.href = "login.html";
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
  
  
