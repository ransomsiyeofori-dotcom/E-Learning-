const inputs = document.querySelectorAll(".otp-input");
// auto move forward //
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
});

// back key delete //
inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// full paste otp //
inputs[0].addEventListener("paste", (e) => {
    e.preventDefault();

    const paste = (e.clipboardData || window.clipboardData)
        .getData("text")
        .slice(0, 6)
        .split("");

    inputs.forEach((input, i) => {
        input.value = paste[i] || "";
    });
});

// OTP counter down //

let timeLeft = 600; // 10 minutes in seconds

const timerDisplay = document.getElementById("timer");
const verifyBtn = document.getElementById("verifyOtpBtn");

const countdown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // format 09:05 style
    timerDisplay.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // warning style when less than 2 minutes
    if (timeLeft <= 120) {
        timerDisplay.parentElement.classList.add("low");
    }

    // when time runs out
    if (timeLeft <= 0) {
        clearInterval(countdown);

        timerDisplay.textContent = "Expired";
        verifyBtn.disabled = true;
        verifyBtn.style.opacity = "0.5";
        verifyBtn.style.cursor = "not-allowed";

        alert("OTP has expired. Please request a new one.");
    }

    timeLeft--;
}, 1000);


// resend otp //

const resendBtn = document.getElementById("resendOtpBtn");
const resendText = document.getElementById("resendText");

let resendTime = 60;
let canResend = false;

resendBtn.disabled = true;

const resendCountdown = setInterval(() => {
    resendTime--;

    resendText.textContent = `You can resend OTP in ${resendTime}s`;

    if (resendTime <= 0) {
        clearInterval(resendCountdown);

        resendBtn.disabled = false;
        resendText.textContent = "You can now resend OTP";
        canResend = true;
    }
}, 1000);

const EmailSent = document.getElementById("email-sent");
const email = localStorage.getItem("resetEmail");
EmailSent.textContent = email;


// resend connect to backend //
resendBtn.addEventListener("click", async () => {

    if (!canResend) return;

    const email = localStorage.getItem("resetEmail");
    

    try {
        resendBtn.disabled = true;

  const res = await fetch("https://edtech-backend-7.onrender.com/request-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        alert(data.message);

        // reset timer
        resendTime = 60;
        canResend = false;
        resendBtn.disabled = true;

        const newCountdown = setInterval(() => {
            resendTime--;

            resendText.textContent = `You can resend OTP in ${resendTime}s`;

            if (resendTime <= 0) {
                clearInterval(newCountdown);
                resendBtn.disabled = false;
                resendText.textContent = "You can now resend OTP";
                canResend = true;
            }
        }, 1000);

    } catch (error) {
        console.log(error);
        resendBtn.disabled = false;
    }
});