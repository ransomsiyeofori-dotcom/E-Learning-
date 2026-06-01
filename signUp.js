 const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

let open = false;

menu.addEventListener("click", () => {
  open = !open;
  nav.classList.toggle("active");
  // change icon
  menu.textContent = open ? "close" : "menu";
});

// SEARCH
const icon = document.getElementById("search-icon");
const search = document.getElementById("search");

icon.addEventListener("click", () => {
  search.classList.toggle("active");
});

// FORM ELEMENTS
const form = document.getElementById("myForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const fullname = document.getElementById("fullname");
const phoneInput = document.getElementById("input"); // 💡 Target 'phone' ID directly
const dateOfBirth = document.getElementById("dateOfBirth");
const terms = document.getElementById("terms");

/* PHONE COUNTRY CODES INITIALIZATION */
const iti = window.intlTelInput(phoneInput, { // 💡 Uses the stable phoneInput element
  initialCountry: "auto",
  geoIpLookup: function (callback) {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("ng"));
  },
  separateDialCode: true,
  preferredCountries: ["ng", "us", "gb"],
});

// ERRORS
const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const PasswordError = document.getElementById("PasswordError");

// MODAL
const modal = document.getElementById("modal");
const Btn = document.getElementById("Btn");

// SPINNER
const spinner = document.getElementById("spinner");

// FULLNAME VALIDATION
fullname.addEventListener("input", () => {
  const fullnameValue = fullname.value.trim();
  if (fullnameValue === "") {
    fullnameError.textContent = "Field must not be empty";
    fullname.style.border = "2px solid red";
  } else {
    fullnameError.textContent = "";
    fullname.style.border = "2px solid green";
  }
});

// EMAIL VALIDATION
email.addEventListener("input", () => {
  const emailValue = email.value.trim();
  if (emailValue === "") {
    emailError.textContent = "Field must not be empty";
    email.style.border = "2px solid red";
  } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
    emailError.textContent = "Invalid email";
    email.style.border = "2px solid red";
  } else {
    emailError.textContent = "";
    email.style.border = "2px solid green";
  }
});

// PASSWORD VALIDATION
password.addEventListener("input", () => {
  const passwordValue = password.value.trim();
  if (passwordValue === "") {
    PasswordError.textContent = "Field must not be empty";
    password.style.border = "2px solid red";
  } else if (passwordValue.length < 6) {
    PasswordError.textContent = "Weak password";
    password.style.border = "2px solid red";
  } else {
    PasswordError.textContent = "";
    password.style.border = "2px solid green";
  }
});

// FINAL FORM SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullNameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const dateOfBirthValue = dateOfBirth.value;
  const termsValue = terms.checked;
  
  // 💡 Safely reference phoneInput now that it is declared globally
  const phoneValue = phoneInput.value.trim(); 


  // --- OTHER VALIDATIONS ---
  if (
    fullNameValue === "" ||
    !emailValue.includes("@") ||
    !emailValue.includes(".") ||
    passwordValue.length < 6
  ) {
    alert("Invalid form details");
    return;
  }

  if (!termsValue) {
    alert("Accept terms first");
    return;
  }

  // SHOW SPINNER (Will fire properly now that no errors interrupt execution)
  spinner.classList.add("active");

  try {
    const response = await fetch(
      "https://edtech-backend-7.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullNameValue,
          email: emailValue,
          phone: phoneValue, 
          dateOfBirth: dateOfBirthValue,
          password: passwordValue,
          terms: termsValue,
        }),
      }
    );

    const data = await response.json();
    console.log("SIGNUP RESPONSE:", data);

    // HIDE SPINNER
    spinner.classList.remove("active");

    // ERROR
    if (!response.ok || !data.success) {
      alert(data.message || "Signup failed");
      return;
    }

    // SAVE TOKEN
    localStorage.setItem("token", data.token);

    // SHOW MODAL
    modal.classList.add("active");

    // RESET FORM
    form.reset();

    // REDIRECT
    setTimeout(() => {
      window.location.href = "Dashboard.html";
    }, 1500);

  } catch (error) {
    // HIDE SPINNER ON EXCEPTION
    spinner.classList.remove("active");
    console.log(error);
    alert("Server error");
  }
});

// CLOSE MODAL
Btn.addEventListener("click", () => {
  modal.classList.remove("active");
});