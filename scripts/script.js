// Script.js

window.addEventListener("DOMContentLoaded", async () => {
  let myStorage = window.localStorage;
  let productList = document.getElementById("product-list");
  let cartCount = document.getElementById("cart-count");

  if (myStorage.getItem("data") == null) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((obj) => JSON.stringify(obj))
      .then((data) => {
        myStorage.setItem("data", data);
      });
  }
  if (myStorage.getItem("cart") == null) {
    myStorage.setItem("cart", []);
  }

  let itemData = JSON.parse(localStorage.getItem("data"));

  for (index in itemData) {
    let item = itemData[index];
    let productItem = document.createElement("product-item");

    productItem.setAttribute("image", item["image"]);
    productItem.setAttribute("title", item["title"]);
    productItem.setAttribute("price", item["price"]);
    productItem.setAttribute("id", "item" + index);
    productList.appendChild(productItem);
  }

  window.addEventListener("storage", () => {
    console.log("storage");
    let cart = JSON.parse(localStorage.getItem("cart"));
    cartCount.innerText = Object.keys(cart).length;
  });
});
