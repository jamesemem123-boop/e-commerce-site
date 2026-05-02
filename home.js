window.addEventListener("load", () => {
    const loader = document.getElementById("preloader");

    // STEP 1: trigger logo split
    loader.classList.add("split");

    // STEP 2: wait for split animation, then fade out whole screen
    setTimeout(() => {
        loader.classList.add("hide");

        // STEP 3: remove after fade completes
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1000); // split animation duration
});

const menuToggle = document.getElementById("menuToggle");
const navCenter = document.querySelector(".nav-center");

menuToggle.addEventListener("click", () => {
    navCenter.classList.toggle("active");
});

const track = document.querySelector(".carousel-track");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const carouselBox = document.querySelector(".carousel-box");

let index = 0;
const step = carouselBox.clientWidth;

// const totalSlides = document.querySelectorAll(".carousel-track img").length;

next.onclick = () => {
    if (index < track.children.length - 1) {
        index++;
        track.style.transform = `translateX(-${index * carouselBox.clientWidth}px)`;
    }
};

prev.onclick = () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * carouselBox.clientWidth}px)`;
    }
};

document.addEventListener("DOMContentLoaded", () => {


    // ELEMENTS
    const profileBtn = document.getElementById("profileBtn");
    const modal = document.getElementById("authModal");
    const overlay = document.getElementById("overlay");
    const toast = document.getElementById("toast");
    const welcomeEl = document.getElementById("profileWelcome");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");

    // OPEN / CLOSE MODAL
    profileBtn.addEventListener("click", () => {
        modal.classList.add("active");
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", closeModal);

    function closeModal() {
        modal.classList.remove("active");
        overlay.classList.remove("active");

        // 🔥 FORCE STOP ANY BLOCKING LAYER STATE
        document.body.style.overflow = "auto";
    }

    // SWITCH FORMS
    showSignup.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
    });

    showLogin.addEventListener("click", () => {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // CHECK USER ON PAGE LOAD
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        showWelcome(storedUser.firstName);
    }

    // SIGNUP
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = {
            firstName: document.getElementById("firstName").value,
            email: document.getElementById("signupEmail").value
        };

        localStorage.setItem("user", JSON.stringify(user));

        showWelcome(user.firstName);     // persistent UI
        showToast("Signup successful");  // optional feedback

        closeModal();
    });

    // LOGIN
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            showWelcome(user.firstName);   // persistent UI
            showToast("Login successful"); // optional feedback

            closeModal();
        } else {
            alert("No account found. Please sign up first.");
        }
    });

    // PERSISTENT WELCOME TEXT
    function showWelcome(name) {
        if (!welcomeEl) return;

        welcomeEl.innerText = `Welcome ${name}`;
        welcomeEl.style.opacity = "1";
    }

    // OPTIONAL TOAST
    function showToast(message) {
        if (!toast) return;

        toast.innerText = message;
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-10px)";
        }, 2000);
    }

});