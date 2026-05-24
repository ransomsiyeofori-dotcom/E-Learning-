// _______toggle menu //
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

/* phone country codes */
const input = document.querySelector(".input");

const iti = window.intlTelInput(input, {
  initialCountry: "auto", // auto-detect user country
  geoIpLookup: function(callback) {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("ng")); // fallback Nigeria
  },
  separateDialCode: true,
  preferredCountries: ["ng", "us", "gb"], // shows at top
});

// _________form validation //
const form = document.getElementById("myForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const fullname = document.getElementById("fullname");
const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const PasswordError = document.getElementById("PasswordError");
const phone = document.getElementById("phone");
const dateOfBirth = document.getElementById("dateOfBirth");
const terms = document.getElementById("terms");



//_________fullname validation //

fullname.addEventListener("input", () => { 
 const fullnameValue = fullname.value.trim();
 if (fullnameValue === ""){
   fullnameError.textContent = "Field must not be empty";
   fullname.style.border = "2px solid red";
   return false;
}
else { fullnameError.textContent = "";
       fullname.style.border = "2px solid green";
       return true;
}
})

//________________Email validation//

email.addEventListener("input", () => {
  
  const emailValue = email.value.trim();
  
  if (emailValue === ""){
    emailError.textContent = "Field must not be empty";
    email.style.border = "2px solid red";
    
    return false;
  }
 else if (!emailValue.includes("@") || !emailValue.includes(".")){
  emailError.textContent = "Invalid email";
  email.style.border = "2px solid red";
 return false;
}

else { emailError.textContent = "";
  email.style.border = "2px solid green";
 return true;}
  });

//______________password validation//

password.addEventListener("input", () =>
{ const passwordValue = password.value.trim();
if (passwordValue === ""){
  PasswordError.textContent = "Field must not be empty";
  password.style.border = "2px solid red";
  return false;}
  
else if (passwordValue.length < 6){
  PasswordError.textContent = "Weak password";
  password.style.border = "2px solid red";
  return false;
}

else { PasswordError.textContent = "";
    password.style.border = "2px solid green";
  return true;
}
  });
  
  
//___________final validation//

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullNameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const phoneValue = phone.value.trim();
  const dateOfBirthValue = dateOfBirth.value;
  const termsValue = terms.checked;
  const modal = document.getElementById("modal");
  const Btn = document.getElementById("Btn");

  // FRONTEND VALIDATION
  if (
    fullNameValue === "" ||
    !emailValue.includes("@") ||
    !emailValue.includes(".") ||
    passwordValue.length < 6
  ) {
    alert("Invalid form details");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/signup", {
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
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      localStorage.setItem("token", data.token);
      modal.classList.add("active");
      form.reset();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
});

Btn.addEventListener("click", () => {
  modal.classList.remove("active");
});
