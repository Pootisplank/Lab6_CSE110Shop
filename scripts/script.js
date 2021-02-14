// Script.js

window.addEventListener("DOMContentLoaded", async () => {
  let myStorage = window.localStorage;
  let productList = document.getElementById("product-list");
  let cartCount = document.getElementById("cart-count");
  let cart = myStorage.getItem("cart");
  let counter = 0;

  if (myStorage.getItem("data") == null) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((obj) => JSON.stringify(obj))
      .then((data) => {
        myStorage.setItem("data", data);
      });
  }
  if (cart == null) {
    myStorage.setItem("cart", "");
  }

  let itemData = JSON.parse(localStorage.getItem("data"));

  for (index in itemData) {
    let item = itemData[index];
    let productItem = document.createElement("product-item");

    if (cart != "") {
      if ("item" + index in JSON.parse(cart)) {
        counter++;
      }
    }

    productItem.setAttribute("image", item["image"]);
    productItem.setAttribute("title", item["title"]);
    productItem.setAttribute("price", item["price"]);
    productItem.setAttribute("id", "item" + index);
    cart = myStorage.getItem("cart");

    if (cart == "") {
      productItem.setAttribute("status", 0);
    } else {
      if (JSON.parse(cart)["item" + index] == null) {
        productItem.setAttribute("status", 0);
      } else {
        productItem.setAttribute("status", 1);
      }
    }
    productList.appendChild(productItem);
  }
  cartCount.innerText = counter;
  window.addEventListener("storage", () => {
    cart = myStorage.getItem("cart");
    if (cart == "") {
      cartCount.innerText = 0;
    } else {
      cartCount.innerText = Object.keys(JSON.parse(cart)).length;
    }
  });
});
