// Script.js

window.addEventListener("DOMContentLoaded", async () => {
  let myStorage = window.localStorage;
  let productList = document.getElementById("product-list");

  if (myStorage.getItem("data") == null) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((obj) => JSON.stringify(obj))
      .then((data) => {
        myStorage.setItem("data", data);
      });
  }

  let itemData = JSON.parse(localStorage.getItem("data"));

  for (index in itemData) {
    let item = itemData[index];
    let productItem = document.createElement("product-item");

    productItem.setAttribute("image", item["image"]);
    console.log(productItem);
    productItem.setAttribute("title", item["title"]);
    productItem.setAttribute("price", item["price"]);

    productList.appendChild(productItem);
  }
});
