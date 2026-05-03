document.addEventListener("DOMContentLoaded", function () {

    // ===== CONTACT FORM SUBMIT VALIDATION =====
    const submitBtn = document.querySelector(".main button");

    const nameInput = document.querySelector(".name input");
    const emailInput = document.querySelector(".email input");
    const subjectInput = document.querySelector(".subject input");
    const messageInput = document.querySelector(".message input");

    if (submitBtn) {
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Trim values (removes spaces)
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            // Simple email pattern
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

            // VALIDATION
            if (name === "") {
                alert("Please enter your name");
                return;
            }

            if (email === "") {
                alert("Please enter your email");
                return;
            }

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address");
                return;
            }

            if (message === "") {
                alert("Please enter your message");
                return;
            }

            // SUCCESS
            alert("Thanks for your feedback");

            // OPTIONAL: clear form
            nameInput.value = "";
            emailInput.value = "";
            subjectInput.value = "";
            messageInput.value = "";
        });
    }


    // ===== SUBSCRIBE FUNCTION =====
    const subscribeBtn = document.querySelector(".subscribe a");
    const footerEmail = document.querySelector(".mail input");

    if (subscribeBtn) {
        subscribeBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const email = footerEmail.value.trim();
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

            if (email === "") {
                alert("Please enter your email");
                return;
            }

            if (!emailPattern.test(email)) {
                alert("Enter a valid email address");
                return;
            }

            alert("Subscribed successfully");
            footerEmail.value = "";
        });
    }

});