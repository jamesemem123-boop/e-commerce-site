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





const cartItemsContainer =
  document.getElementById("cartItemsContainer");

const cartSubtotal =
  document.getElementById("cartSubtotal");

const cartTotal =
  document.getElementById("cartTotal");

// GET PRODUCTS
let cartProducts =
  JSON.parse(localStorage.getItem("cartProducts")) || [];

// ADD QUANTITY IF NOT EXISTS
cartProducts = cartProducts.map(product => ({
  ...product,
  quantity: product.quantity || 1
}));

// SAVE UPDATED PRODUCTS
localStorage.setItem(
  "cartProducts",
  JSON.stringify(cartProducts)
);

// RENDER CART
function renderCart() {

  cartItemsContainer.innerHTML = "";

  // EMPTY CART
  if (cartProducts.length === 0) {

    cartItemsContainer.innerHTML = `
      <div class="bg-gray-100 rounded-xl p-10 text-center">
        <h2 class="text-2xl font-bold mb-3">
          Your cart is empty
        </h2>

        <p class="text-gray-500">
          Add some products to continue shopping.
        </p>
      </div>
    `;

    cartSubtotal.textContent = "Rs. 0";
    cartTotal.textContent = "Rs. 0";

    return;
  }

  let total = 0;

  cartProducts.forEach((product, index) => {

    // REMOVE CURRENCY + CONVERT TO NUMBER
    const priceNumber =
      parseInt(
        product.price.replace(/[^\d]/g, "")
      );

    const subtotal =
      priceNumber * product.quantity;

    total += subtotal;

    cartItemsContainer.innerHTML += `

      <div class="grid grid-cols-1 md:grid-cols-5 items-center gap-5 border-b py-6 px-2">

        <!-- PRODUCT -->
        <div class="md:col-span-2 flex items-center gap-4">

          <div class="bg-[#F9F1E7] p-3 rounded-xl">

            <img src="${product.image}"
                 class="w-20 h-20 object-cover rounded-lg"
                 alt="">

          </div>

          <div>
            <h3 class="font-medium text-gray-700">
              ${product.name}
            </h3>
          </div>

        </div>

        <!-- PRICE -->
        <div>
          <p class="text-gray-400 text-sm md:text-base">
            ${product.price}
          </p>
        </div>

        <!-- QUANTITY -->
        <div>

          <input
            type="number"
            min="1"
            value="${product.quantity}"
            data-index="${index}"
            class="quantity-input w-16 h-10 border rounded-lg text-center outline-none focus:border-yellow-600"
          >

        </div>

        <!-- SUBTOTAL -->
        <div class="flex items-center justify-between md:justify-start gap-5">

          <p class="font-medium">
            Rs. ${subtotal.toLocaleString()}
          </p>

          <!-- DELETE -->
          <button
            class="delete-btn hover:scale-110 transition"
            data-index="${index}">

            <img src="./images/delete.png"
                 class="w-5 h-5"
                 alt="">

          </button>

        </div>

      </div>

    `;
  });

  // UPDATE TOTALS
  cartSubtotal.textContent =
    `Rs. ${total.toLocaleString()}`;

  cartTotal.textContent =
    `Rs. ${total.toLocaleString()}`;

  attachEvents();
}

// EVENTS
function attachEvents() {

  // DELETE
  const deleteButtons =
    document.querySelectorAll(".delete-btn");

  deleteButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      cartProducts.splice(index, 1);

      localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
      );

      renderCart();

    });

  });

  // QUANTITY
  const quantityInputs =
    document.querySelectorAll(".quantity-input");

  quantityInputs.forEach(input => {

    input.addEventListener("input", () => {

      const index = input.dataset.index;

      let value = parseInt(input.value);

      if (value < 1 || isNaN(value)) {
        value = 1;
      }

      cartProducts[index].quantity = value;

      localStorage.setItem(
        "cartProducts",
        JSON.stringify(cartProducts)
      );

      renderCart();

    });

  });

}

// INITIAL RENDER
renderCart();

