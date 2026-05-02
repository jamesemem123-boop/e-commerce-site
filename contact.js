// ===== CONTACT FORM SUBMIT =====
const submitBtn = document.querySelector(".main button");

if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault(); // stops page reload
        alert("Thanks for your feedback");
    });
}


// ===== SUBSCRIBE FUNCTION =====
const subscribeBtn = document.querySelector(".subscribe a");
const emailInput = document.querySelector(".mail input");

if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (emailInput.value.trim() === "") {
            alert("Please enter your email");
        } else {
            alert("Subscribed successfully");
            emailInput.value = ""; // clear field
        }
    });
}


// ===== HAMBURGER TOGGLE =====
function toggleMenu() {
    document.querySelector(".navelement ul").classList.toggle("active");
}