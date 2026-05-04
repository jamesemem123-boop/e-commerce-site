const menuToggle = document.getElementById("menuToggle");
const navCenter = document.querySelector(".nav-center");

menuToggle.addEventListener("click", () => {
  navCenter.classList.toggle("active");
});

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

    const cards = document.querySelectorAll(".product-card");
  const cardsPerPage = 8;
  let currentPage = 1;

  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card, index) => {
      card.style.display = (index >= start && index < end) ? "block" : "none";
    });

    updateButtons();
  }

  function changePage(page) {
    showPage(page);
  }

function nextPage() {
  const totalPages = 2;

  if (currentPage < totalPages) {
    showPage(currentPage + 1);
  }
}

  function updateButtons() {
    document.querySelectorAll(".page-btn").forEach((btn, i) => {
      if (i + 1 === currentPage) {
        btn.classList.add("bg-yellow-600", "text-white");
        btn.classList.remove("bg-gray-200");
      } else {
        btn.classList.remove("bg-yellow-600", "text-white");
        btn.classList.add("bg-gray-200");
      }
    });
  }

  // INITIAL LOAD
  showPage(1);

  // SEARCH FUNCTIONALITY
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

// Toggle Search Box
searchBtn.addEventListener("click", () => {
  searchBox.classList.toggle("hidden");
  searchInput.focus();
});

// Search Products
searchInput.addEventListener("keyup", () => {

  const searchValue = searchInput.value.toLowerCase();

  cards.forEach((card) => {

    const productName = card.querySelector("h2").textContent.toLowerCase();

    if (productName.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});

// NAVBAR LIKE COUNT
const likeCount = document.getElementById("likeCount");

// LIKE BUTTONS
const likeButtons = document.querySelectorAll(".like-btn");

// CART COUNT
const cartCount = document.getElementById("cartCount");

// GET SAVED CART PRODUCTS
let cartProducts =
  JSON.parse(localStorage.getItem("cartProducts")) || [];

// UPDATE CART COUNT
updateCartCount();

function updateCartCount() {

  cartCount.textContent = cartProducts.length;

  if (cartProducts.length > 0) {
    cartCount.classList.remove("hidden");
  } else {
    cartCount.classList.add("hidden");
  }

}

// GET SAVED PRODUCTS
let likedProducts =
  JSON.parse(localStorage.getItem("likedProducts")) || [];

// UPDATE NAVBAR COUNT
updateLikeCount();

// LOAD PREVIOUSLY LIKED PRODUCTS
likeButtons.forEach((button) => {

  const card = button.closest(".product-card");

  const product = {
    name: card.querySelector("h2").textContent,
    price: card.querySelectorAll(".font-bold")[1].textContent,
    image: card.querySelector("img").src
  };

  const alreadyLiked = likedProducts.find(
    (item) => item.name === product.name
  );

  if (alreadyLiked) {

    const icon = button.querySelector(".like-icon");
    const text = button.querySelector(".like-text");

    icon.src = icon.dataset.liked;

    text.textContent = "Liked";

    text.classList.add("text-red-400");

    button.dataset.liked = "true";
  }

});

// CLICK EVENTS
likeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card = button.closest(".product-card");

    const product = {
      name: card.querySelector("h2").textContent,
      price: card.querySelectorAll(".font-bold")[1].textContent,
      image: card.querySelector("img").src
    };

    const icon = button.querySelector(".like-icon");
    const text = button.querySelector(".like-text");

    let liked = button.dataset.liked === "true";

    liked = !liked;

    button.dataset.liked = liked;

    if (liked) {

      likedProducts.push(product);

      icon.src = icon.dataset.liked;

      text.textContent = "Liked";

      text.classList.add("text-red-400");

    } else {

      likedProducts = likedProducts.filter(
        (item) => item.name !== product.name
      );

      icon.src = icon.dataset.default;

      text.textContent = "Like";

      text.classList.remove("text-red-400");

    }

    // SAVE
    localStorage.setItem(
      "likedProducts",
      JSON.stringify(likedProducts)
    );

    updateLikeCount();

  });

});

// UPDATE COUNT FUNCTION
function updateLikeCount() {

  likeCount.textContent = likedProducts.length;

  if (likedProducts.length > 0) {
    likeCount.classList.remove("hidden");
  } else {
    likeCount.classList.add("hidden");
  }

}

// MODAL ELEMENTS
const likedModal = document.getElementById("likedModal");

const openLikedModal =
  document.getElementById("openLikedModal");

const closeLikedModal =
  document.getElementById("closeLikedModal");

const likedProductsContainer =
  document.getElementById("likedProductsContainer");

// OPEN MODAL
openLikedModal.addEventListener("click", (e) => {

  e.preventDefault();

  renderLikedProducts();

  likedModal.classList.remove("hidden");

  likedModal.classList.add("flex");

});

// CLOSE MODAL
closeLikedModal.addEventListener("click", () => {

  likedModal.classList.add("hidden");

  likedModal.classList.remove("flex");

});

// RENDER PRODUCTS
function renderLikedProducts() {

  likedProductsContainer.innerHTML = "";

  if (likedProducts.length === 0) {

    likedProductsContainer.innerHTML = `
      <p class="text-gray-500">
        No liked products yet.
      </p>
    `;

    return;
  }

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

  // DELETE BUTTONS
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
      syncLikeButtons();

    });

  });

  // ADD TO CART BUTTONS
  const addCartButtons =
    document.querySelectorAll(".add-cart-btn");

  addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

cartProducts =
  JSON.parse(localStorage.getItem("cartProducts")) || [];

cartProducts.push(likedProducts[index]);

localStorage.setItem(
  "cartProducts",
  JSON.stringify(cartProducts)
);

updateCartCount();

      alert("Product added to cart!");

    });

  });

}

function syncLikeButtons() {

  likeButtons.forEach((button) => {

    const card = button.closest(".product-card");

    const productName =
      card.querySelector("h2").textContent;

    const icon = button.querySelector(".like-icon");

    const text = button.querySelector(".like-text");

    const exists = likedProducts.find(
      (item) => item.name === productName
    );

    if (exists) {

      button.dataset.liked = "true";

      icon.src = icon.dataset.liked;

      text.textContent = "Liked";

      text.classList.add("text-red-400");

    } else {

      button.dataset.liked = "false";

      icon.src = icon.dataset.default;

      text.textContent = "Like";

      text.classList.remove("text-red-400");

    }

  });

}

// PRODUCT CARD ADD TO CART
const addToCartButtons =
  document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card = button.closest(".product-card");
    
const product = {
  name: card.querySelector("h2").textContent,
  price: card.querySelectorAll(".font-bold")[1].textContent,
  image: card.querySelector("img").src
};

    // GET EXISTING CART
    cartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];

    // ADD PRODUCT
    cartProducts.push(product);

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