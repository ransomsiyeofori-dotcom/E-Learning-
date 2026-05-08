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

const passwordError = document.getElementById("passwordError");
const emailError = document.getElementById("emailError");

const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const submitBtn = document.getElementById("submitBtn");


// EMAIL VALIDATION
function validateEmail() {

  let emailValue = email.value.trim();

  emailError.innerText = "";

  if (emailValue === "") {

    emailError.innerText = "Field must not be empty";
    email.style.border = "2px solid red";

    return false;
  }

  if (!emailValue.includes("@") || !emailValue.includes(".")) {

    emailError.innerText = "@ or . is missing";
    email.style.border = "2px solid red";

    return false;
  }

  email.style.border = "2px solid green";

  return true;
}


// PASSWORD VALIDATION
function validatePassword() {

  let passwordValue = password.value.trim();

  passwordError.innerText = "";

  if (passwordValue === "") {

    passwordError.innerText = "Field must not be empty";
    password.style.border = "2px solid red";

    return false;
  }

  if (passwordValue.length <= 6) {

    passwordError.innerText = "Characters must be greater than 6";
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
form.addEventListener("submit", function (e) {

  e.preventDefault();

  let emailValid = validateEmail();
  let passwordValid = validatePassword();

  if (emailValid && passwordValid) {

    // SHOW SPINNER
    spinner.style.display = "block";
    btnText.innerText = "Loading...";

    submitBtn.disabled = true;

    // FAKE LOADING
    setTimeout(() => {

      spinner.style.display = "none";
      btnText.innerText = "Submit";

      successModal.classList.add("active");

      form.reset();

      email.style.border = "";
      password.style.border = "";

      submitBtn.disabled = false;

    }, 2000);

  }

});


// CLOSE MODAL
closeBtn.addEventListener("click", () => {

  successModal.classList.remove("active");

});