// product-item.js
const template = document.createElement("template");
template.innerHTML = `
<style>
  .price {
    color: green;
    font-size: 1.8em;
    font-weight: bold;
    margin: 0;
  }

  .product {
    align-items: center;
    background-color: white;
    border-radius: 5px;
    display: grid;
    grid-template-areas: 
    'image'
    'title'
    'price'
    'add';
    grid-template-rows: 67% 11% 11% 11%;
    height: 450px;
    filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
    margin: 0 30px 30px 0;
    padding: 10px 20px;
    width: 200px;
  }

  .product > button {
    background-color: rgb(255, 208, 0);
    border: none;
    border-radius: 5px;
    color: black;
    justify-self: center;
    max-height: 35px;
    padding: 8px 20px;
    transition: 0.1s ease all;
  }

  .product > button:hover {
    background-color: rgb(255, 166, 0);
    cursor: pointer;
    transition: 0.1s ease all;
  }

  .product > img {
    align-self: center;
    justify-self: center;
    width: 100%;
  }

  .title {
    font-size: 1.1em;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title:hover {
    font-size: 1.1em;
    margin: 0;
    white-space: wrap;
    overflow: auto;
    text-overflow: unset;
  }
</style>

<li class="product">
  <img src="" alt="">
  <p class="title"></p>
  <p class="price"></p>
  <button >Add to Cart</button>
</li>
`;
class ProductItem extends HTMLElement {
  static get observedAttributes() {
    return ["image", "title", "price", "id", "status"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.querySelector("li>button").setAttribute("status", 0);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    let shadow = this.shadowRoot;
    switch (attrName) {
      case "image":
        shadow.querySelector("li>img").src = newVal;
        break;
      case "title":
        shadow.querySelector("p.title").innerText = newVal;
        shadow.querySelector("li>img").alt = newVal;
        break;
      case "price":
        shadow.querySelector("p.price").innerText = newVal;
        break;
      case "id":
        shadow.querySelector("li>button").addEventListener("click", () => {
          this.updateCart(newVal);
          window.dispatchEvent(new Event("storage"));
        });
        break;
      case "status":
        let button = this.shadowRoot.querySelector("li>button");
        if (newVal == 0) {
          button.setAttribute("status", 0);
          button.innerText = "Add to Cart";
        } else {
          button.setAttribute("status", 1);
          button.innerText = "Remove From Cart";
          break;
        }
      default:
    }
  }

  updateCart(id) {
    let myStorage = window.localStorage;
    let cart = {};
    let button = this.shadowRoot.querySelector("li>button");
    let status = this.getAttribute("status");

    if (myStorage.getItem("cart") == "") {
      cart = {};
    } else {
      cart = JSON.parse(myStorage.getItem("cart"));
    }
    if (status == 0) {
      this.setAttribute("status", 1);
      button.innerText = "Remove From Cart";
      cart[id] = "";
      myStorage.setItem("cart", JSON.stringify(cart));
    } else {
      this.setAttribute("status", 0);
      button.innerText = "Add to Cart";
      delete cart[id];

      if (JSON.stringify(cart) === "{}") {
        myStorage.setItem("cart", "");
      } else {
        myStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
}

customElements.define("product-item", ProductItem);
