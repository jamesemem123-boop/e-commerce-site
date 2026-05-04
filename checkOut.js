const menuToggle = document.getElementById("menuToggle");
const navCenter = document.querySelector(".nav-center");

menuToggle.addEventListener("click", () => {
  navCenter.classList.toggle("active");
});


// =======================
// CART COUNT
// =======================

const cartCount = document.getElementById("cartCount");

function updateCartCount() {
  let cartProducts =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

  cartCount.textContent = cartProducts.length;

  if (cartProducts.length > 0) {
    cartCount.classList.remove("hidden");
  } else {
    cartCount.classList.add("hidden");
  }
}

updateCartCount();


// =======================
// LIKE COUNT
// =======================

const likeCount = document.getElementById("likeCount");

function updateLikeCount() {
  let likedProducts =
    JSON.parse(localStorage.getItem("likedProducts")) || [];

  likeCount.textContent = likedProducts.length;

  if (likedProducts.length > 0) {
    likeCount.classList.remove("hidden");
  } else {
    likeCount.classList.add("hidden");
  }
}

updateLikeCount();


// =======================
// LIKED PRODUCTS MODAL
// =======================

const openLikedModal =
  document.getElementById("openLikedModal");

const likedModal =
  document.getElementById("likedModal");

const closeLikedModal =
  document.getElementById("closeLikedModal");

const likedProductsContainer =
  document.getElementById("likedProductsContainer");

// OPEN MODAL
openLikedModal.addEventListener("click", (e) => {
  e.preventDefault();

  likedModal.classList.remove("hidden");
  likedModal.classList.add("flex");

  renderLikedProducts();
});

// CLOSE MODAL
closeLikedModal.addEventListener("click", () => {
  likedModal.classList.add("hidden");
  likedModal.classList.remove("flex");
});

// CLOSE WHEN CLICKING OUTSIDE
likedModal.addEventListener("click", (e) => {
  if (e.target === likedModal) {
    likedModal.classList.add("hidden");
    likedModal.classList.remove("flex");
  }
});


// =======================
// RENDER LIKED PRODUCTS
// =======================

function renderLikedProducts() {
  let likedProducts =
    JSON.parse(localStorage.getItem("likedProducts")) || [];

  likedProductsContainer.innerHTML = "";

  // EMPTY STATE
  if (likedProducts.length === 0) {
    likedProductsContainer.innerHTML = `
      <p class="text-gray-500 text-center">
        No liked products yet
      </p>
    `;

    return;
  }

  // LOOP PRODUCTS
  likedProducts.forEach((product, index) => {
    likedProductsContainer.innerHTML += `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-4 rounded-lg">

        <!-- LEFT -->
        <div class="flex items-center gap-4">

          <img src="${product.image}"
               class="w-20 h-20 object-cover rounded">

          <div>
            <h3 class="font-bold text-lg">
              ${product.name}
            </h3>

            <p class="text-gray-500">
              ${product.price}
            </p>
          </div>

        </div>

        <!-- RIGHT -->
        <div class="flex gap-3">

          <!-- ADD TO CART -->
          <button
            class="add-cart-btn bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition"
            data-index="${index}">
            Add To Cart
          </button>

          <!-- DELETE -->
          <button
            class="delete-liked-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            data-index="${index}">
            Delete
          </button>

        </div>

      </div>
    `;
  });

  // =======================
  // DELETE BUTTONS
  // =======================

  const deleteButtons =
    document.querySelectorAll(".delete-liked-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      // REMOVE PRODUCT
      likedProducts.splice(index, 1);

      // SAVE
      localStorage.setItem(
        "likedProducts",
        JSON.stringify(likedProducts)
      );

      // UPDATE UI
      updateLikeCount();

      renderLikedProducts();

      // RESET LIKE BUTTONS ON PAGE
      if (typeof syncLikeButtons === "function") {
        syncLikeButtons();
      }
    });
  });

  // =======================
  // ADD TO CART BUTTONS
  // =======================

  const addCartButtons =
    document.querySelectorAll(".add-cart-btn");

  addCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      let likedProducts =
        JSON.parse(localStorage.getItem("likedProducts")) || [];

      let cartProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];

      const product = likedProducts[index];

      // CHECK IF PRODUCT EXISTS
      const existingProduct = cartProducts.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartProducts.push({
          ...product,
          quantity: 1
        });
      }

      // SAVE
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
      );

      // UPDATE COUNT
      updateCartCount();

      alert("Product added to cart!");
    });
  });
}


// =======================
// REMOVE PRODUCT
// =======================

function removeLikedProduct(index) {
  let likedProducts =
    JSON.parse(localStorage.getItem("likedProducts")) || [];

  likedProducts.splice(index, 1);

  localStorage.setItem(
    "likedProducts",
    JSON.stringify(likedProducts)
  );

  updateLikeCount();

  renderLikedProducts();
}

// =======================
// AUTH MODAL
// =======================

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

    showWelcome(user.firstName);

    showToast("Signup successful");

    closeModal();
  });

  // LOGIN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      showWelcome(user.firstName);

      showToast("Login successful");

      closeModal();
    } else {
      alert("No account found. Please sign up first.");
    }
  });

  // SHOW WELCOME
  function showWelcome(name) {
    if (!welcomeEl) return;

    welcomeEl.innerText = `Welcome ${name}`;
    welcomeEl.style.opacity = "1";
  }

  // TOAST
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






const checkoutProducts =
  document.getElementById("checkoutProducts");

const checkoutForm =
  document.getElementById("checkoutForm");

const successMessage =
  document.getElementById("successMessage");

// GET CART PRODUCTS
let cartProducts =
  JSON.parse(localStorage.getItem("cartProducts")) || [];

// RENDER PRODUCTS
function renderCheckoutProducts() {

  // EMPTY CART
  if (cartProducts.length === 0) {

    checkoutProducts.innerHTML = `
      <div class="text-center py-10">
        <h2 class="text-2xl font-bold mb-3">
          No products in cart
        </h2>

        <p class="text-gray-500">
          Please add products before checkout.
        </p>
      </div>
    `;

    return;
  }

  let total = 0;

  let productsHTML = "";

  cartProducts.forEach(product => {

    const priceNumber =
      parseInt(product.price.replace(/[^\d]/g, ""));

    const subtotal =
      priceNumber * product.quantity;

    total += subtotal;

    productsHTML += `

      <div class="flex justify-between items-center text-gray-600">

        <p>
          ${product.name} × ${product.quantity}
        </p>

        <p>
          Rs. ${subtotal.toLocaleString()}
        </p>

      </div>

    `;
  });

  checkoutProducts.innerHTML = `

    ${productsHTML}

    <!-- SUBTOTAL -->
    <div class="flex justify-between items-center text-gray-600 border-b pb-5 pt-4">

      <p>
        Subtotal
      </p>

      <p>
        Rs. ${total.toLocaleString()}
      </p>

    </div>

    <!-- TOTAL -->
    <div class="flex justify-between items-center py-2">

      <p class="font-semibold text-lg">
        Total
      </p>

      <p class="text-2xl font-bold text-[#B88E2F]">
        Rs. ${total.toLocaleString()}
      </p>

    </div>

  `;
}

// FORM SUBMIT
checkoutForm.addEventListener("submit", (e) => {

  e.preventDefault();

  // SUCCESS MESSAGE
  successMessage.classList.remove("hidden");

  successMessage.textContent =
    "✅ Order placed successfully!";

  // CLEAR CART
  localStorage.removeItem("cartProducts");

  // RESET FORM
  checkoutForm.reset();

  // RELOAD PRODUCTS
  cartProducts = [];

  renderCheckoutProducts();

});

// INITIAL RENDER
renderCheckoutProducts();