const forgotPasswordForm = document.getElementById("form");
const submitbtn = forgotPasswordForm.querySelector("button[type='submit']");
const btnWord = document.getElementById("BtnWord");
const spinn = document.getElementById("spin");

forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("emailreset").value.trim();

  if (!email) {
    alert("Please enter your email");
    return;
  }

  // Helper functions to handle the loading state cleanly
  const startLoading = () => {
    if (submitbtn) submitbtn.disabled = true;
    if (btnWord) btnWord.innerText = "Sending...";
    if (spinn) spinn.classList.add("hidden");
  };

  const stopLoading = () => {
    if (submitbtn) submitbtn.disabled = false;
    if (btnWord) btnWord.innerText = "Reset Password";
    if (spinn) spinn.classList.remove("hidden");
  };
  
  function showModal(){
  const successfully = document.getElementById("otpSuccess");
    successfully.classList.add("show");
    setTimeout(() =>{ successfully.remove("show");},2000);
  }

  try {
    // Show spinner and disable button
    startLoading();

    const response = await fetch(
      "https://edtech-backend-7.onrender.com/request-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    console.log(data);

 if (!response.ok) {
  alert(data.message || "Failed to send OTP.");
  stopLoading();
  return;
}

// success
showModal();
stopLoading();

setTimeout(() => {
  localStorage.setItem("resetEmail", email);
  window.location.href = "verify-otp.html";
}, 2000);

  } catch (error) {
    console.error("Request OTP Error:", error);
    alert("Server error. Please try again.");
    stopLoading(); // Turn off spinner on network failure
  }
});