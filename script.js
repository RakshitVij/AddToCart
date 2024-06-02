let ArrProducts = [
  {
    id: 1,
    name: "JUJUTSU KAISEN",
    image: "jjk.jpg",
    price: "750",
    ratings: "4",
  },
  {
    id: 2,
    name: "CHAINSAW MAN",
    image: "chainsawman.jpeg",
    price: "550",
    ratings: "3",
  },
  {
    id: 3,
    name: "ONE PIECE",
    image: "onepiece.jpeg",
    price: "1000",
    ratings: "5",
  },
  {
    id: 4,
    name: "NARUTO",
    image: "naruto.jpeg",
    price: "850",
    ratings: "4",
  },
  {
    id: 5,
    name: "WIND BREAKER",
    image: "windbreaker.jpeg",
    price: "650",
    ratings: "3",
  },
  {
    id: 6,
    name: "DEMON SLAYER",
    image: "demonslayer.jpeg",
    price: "800",
    ratings: "4",
  },
];

// Select DOM elements
const body = document.querySelector("body"),
  products = document.querySelector(".products"),
  shoppingBasket = document.querySelector(".shoppingBasket"),
  closeCart = document.querySelector(".close"),
  productList = document.querySelector(".productList"),
  quantity = document.querySelector(".quantity"),
  total = document.querySelector(".total");

let checkOutList = [];

// Add 'active' class to body when shopping basket is clicked
shoppingBasket.addEventListener("click", () => {
  body.classList.add("active");
});

// Remove 'active' class from body when close button is clicked
closeCart.addEventListener("click", () => {
  body.classList.remove("active");
});

// Initialize the product list on page load
function onInIt() {
  ArrProducts.forEach((item, key) => {
    let div = document.createElement("div");
    div.classList.add("item");

    let star = "";
    for (let i = 0; i < item.ratings; i++) {
      star += `<i class="fa fa-star"></i>`;
    }

    // Add product details and add to cart button
    div.innerHTML = `
    <img src= "${item.image}" />
    <div>${star}</div>
    <div class="name">${item.name}</div>
    <div class="price"><small>₨</small>${item.price}</div>
    <button onClick="addToCart(${key})"><i class="fa fa-cart-plus"></i>Add To Cart</button>
    `;
    products.appendChild(div);
  });
}
onInIt();

// Add product to cart
function addToCart(Id) {
  if (checkOutList[Id] == null) {
    checkOutList[Id] = ArrProducts[Id];
    checkOutList[Id].quantity = 1;
  } else {
    checkOutList[Id].quantity += 1;
  }

  // Optional: Remove 'cz-shortcut-listen' attribute if it exists
  if (body.hasAttribute("cz-shortcut-listen")) {
    body.removeAttribute("cz-shortcut-listen");
  }
  reloadCart();
}

// Reload the cart UI
function reloadCart() {
  productList.innerHTML = "";

  let count = 0;
  let totalPrice = 0;

  checkOutList.forEach((item, key) => {
    totalPrice += parseInt(item.price) * item.quantity;
    count += item.quantity;

    // Create cart item list element
    let li = document.createElement("li");
    li.innerHTML = `
    <img src= "${item.image}" />
    <div>${item.name}</div>
    <div>${item.price}</div>
    <div>
    <button onClick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
    <div class="count">${item.quantity}</div>
    <button onClick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
    </div>
    `;
    productList.appendChild(li);
  });

  // Update total price and quantity
  total.innerHTML = `<small>Subtotal (${count} items) ₨</small>` + totalPrice;
  quantity.innerHTML = count;
}

// Change the quantity of a cart item
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete checkOutList[key];
  } else {
    checkOutList[key].quantity = quantity;
  }
  reloadCart();
}

