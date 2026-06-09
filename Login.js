      // toggle menu //
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

let open = false;

menu.addEventListener("click", () => {
  open = !open;

  nav.classList.toggle("active");

  // change icon
  menu.textContent = open ? "close" : "menu";
});

const icon = document.getElementById("search-icon");
const search = document.getElementById("search");

icon.addEventListener("click", () => {
  search.classList.toggle("active");
});

// Form Validation //
const form = document.getElementById("myForm");
const successModal = document.getElementById("successModal");
const closeBtn = document.getElementById("closeBtn");

const email = document.getElementById("email");
const password = document.getElementById("password");

const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const submitBtn = document.getElementById("submitBtn");


// EMAIL VALIDATION

function validateEmail() {

  let emailValue = email.value.trim();


  if (emailValue === "") {
    email.style.border = "2px solid red";
return false; }

  if (!emailValue.includes("@") || !emailValue.includes(".")){
    email.style.border = "2px solid red";

    return false;
  }

  email.style.border = "2px solid green";

  return true;
}


// PASSWORD VALIDATION
function validatePassword() {

  let passwordValue = password.value.trim();


  if (passwordValue === "") {
    password.style.border = "2px solid red";

    return false;
  }

  if (passwordValue.length <= 6) {
    password.style.border = "2px solid red";

    return false;
  }

  password.style.border = "2px solid green";

  return true;
}


// LIVE VALIDATION
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);


// FORM SUBMIT
form.addEventListener("submit", async function (e) {

  e.preventDefault();

  let emailValid = validateEmail();
  let passwordValid = validatePassword();

  // GET VALUES
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValid && passwordValid) {

    // SHOW SPINNER
    spinner.style.display = "block";
    btnText.innerText = "Loading...";

    submitBtn.disabled = true;

    try {

      const response = await fetch("https://edtech-backend-7.onrender.com/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email: emailValue,
          password: passwordValue
        })

      });

const data = await response.json();

console.log("STATUS:", response.status);
console.log("DATA:", data);

// STOP SPINNER
spinner.style.display = "none";
btnText.innerText = "Submit";
submitBtn.disabled = false;

if (!response.ok) {
  alert(data.message || "Login failed");
  return;
}

if (!data.success) {
  alert(data.message || "Invalid login");
  return;
}

      // SAVE TOKEN
      localStorage.setItem("token", data.token);


      // SUCCESS MODAL
      successModal.classList.add("active");

      // RESET FORM
      form.reset();

      email.style.border = "";
      password.style.border = "";

      // REDIRECT TO DASHBOARD
      setTimeout(() => {

        window.location.href = "Dashboard.html";

      }, 1500);

    } catch (error) {

      console.log(error);

      spinner.style.display = "none";
      btnText.innerText = "Submit";

      submitBtn.disabled = false;

      alert("Server error");

    }

  }

});
const Btn = document.getElementById("closeBtn");
Btn.addEventListener("click", () => {
    successModal.classList.remove("active");
  });
  
  // Password toggle //
  
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  password.type =
    password.type === "password" ? "text" : "password";

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

//---------forgot password modal------//

const press = document.getElementById("forgot");
const container = document.getElementById("container2");
const xmark = document.getElementById("xmark");

press.addEventListener("click", () => {
  container.classList.add("active");
  form.classList.add("blur");
  });
xmark.addEventListener("click", () => {
  container.classList.remove("active");
  form.classList.remove("blur");
});

  // error modal //
 const errorModal = document.getElementById("modal-container");
  
  if (emailValue === "" && passwordValue === ""){  errorModal.classList.add("show");
    setTimeout(() =>{
      errorModal.classList.remove("show");}, 2000);
  }







            

   

        
       
