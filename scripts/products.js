// Sample Menu Items
const menuItems = [
  {
    name: "Pasta Primavera",
    description: "Delicious pasta with fresh vegetables.",
    price: "$12.99",
    image: "images/pasta.jpg",
  },
  {
    name: "Grilled Chicken",
    description: "Juicy grilled chicken served with salad.",
    price: "$15.99",
    image: "images/grilled-chicken.jpg",
  },
  {
    name: "Vegan Buddha Bowl",
    description: "Healthy bowl with quinoa and roasted veggies.",
    price: "$10.99",
    image: "images/buddha-bowl.jpg",
  },
  {
    name: "Cheesecake",
    description: "Classic cheesecake topped with strawberries.",
    price: "$6.99",
    image: "images/cheesecake.jpg",
  },
];

// Function to render menu items
function renderMenu() {
  const productsContainer = document.getElementById("products-container");
  menuItems.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>${item.price}</strong></p>
            <button>Add to Cart</button>
        `;

    productsContainer.appendChild(menuItem);
  });
}

// Load the menu items on page load
document.addEventListener("DOMContentLoaded", renderMenu);
console.log("Menu Items Loaded");
