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