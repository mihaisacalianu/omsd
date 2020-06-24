///////////elements selection/////////////
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const video = document.querySelector(".video-container");
const videoSwitch = document.querySelector(".switch-btn");

const addToBasketBtn = document.querySelector(".btn10");
const soapContainer = document.querySelector(".soap-container");
const lotionContainer = document.querySelector(".lotion-container");
const creamContainer = document.querySelector(".creams-container");
const scrubContainer = document.querySelector(".scrubs-container");

const shoppingBasketIcon = document.querySelector(".shopping-icon");
const shoppingBasketOverlay = document.querySelector(".shoppingBasket-overlay");
const basketContainer = document.querySelector(".shoppingBasket-content");
const shoppingBasketTotal = document.querySelector(".shoppingBasket-total");
const shoppingBasketItems = document.querySelector(".shoppingBasket-item");
const shoppingBasketItemsCount = document.querySelector(
    ".shoppingBasket-itemsCount"
);
const closeShoppingBasketBtn = document.querySelector(".close-shoppingBasket");
const clearShoppingBasketBtn = document.querySelector(".clear-shoppingBasket");

//shopping cart
let shoppingBasket = [];
let products = [];
let soapProducts = [];
let lotionProducts = [];
let creamProducts = [];
let scrubProducts = [];

//buttons
let buttonsDOM = [];

//function to control video on main  page
function controlVideo() {
    videoSwitch.addEventListener("click", () => {
        if (!videoSwitch.classList.contains("slide")) {
            videoSwitch.classList.add("slide");
            video.pause();
        } else {
            videoSwitch.classList.remove("slide");
            video.play();
        }
    });
}

//function to control toggle menu
function toggleMenu() {
    navToggle.addEventListener("click", () => {
        links.classList.toggle("show-links");
        setTimeout(() => {
            links.classList.remove("show-links");
        }, 5000);
    });
}

window.onload = function() {
    this.toggleMenu();
    this.controlVideo();
};

// used for getting the products
class Products {
    // using async / await
    //so that everything is loaded asyncronoumus
    async getProducts() {
        try {
            //get the items from json file
            let result = await fetch("../products.json");
            // convert the result in workable data
            let data = await result.json();
            // save the data into product variable
            let products = data.items;
            // used product.map beacuse it creates a new array
            products = products.map((item) => {
                const { title, type, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, type, price, id, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
//used for diplaying in DOM
class UI {
    //method for sorting the products
    sortProducts(products) {
            products.forEach((product) => {
                if (product.type == "soap") {
                    soapProducts.push(product);
                } else if (product.type == "lotion") {
                    lotionProducts.push(product);
                } else if (product.type == "cream") {
                    creamProducts.push(product);
                } else if (product.type == "scrub") {
                    scrubProducts.push(product);
                }
            });
        }
        //method for displaying soap products
    displaySoapProducts(soapProducts) {
            let result = "";
            soapProducts.forEach((product) => {
                result += `<!-- single soap Item -->
    <div class="product-item">
       <div class="product-item__title">
           <h2>${product.title}</h2>
           <p class="price">£${product.price}</p>
       </div>
       <div class="product-item__objects">
           <div class="product-item__photo">
               <img src="${product.image}" alt="soap photo" class="productPhoto itemPhoto">
           </div>
           <div class="product-item__description"><p>${product.description}</p></div>
       </div>
       <div class="buyButtons">
           <button class="addToBasket buttons" data-id=${product.id}>Add to basket</button>
       </div>
   </div>
   <!-- end of single soap Item -->`;
                soapContainer.innerHTML = result;
            });
        }
        //method for displaying lotion products
    displayLotionProducts(lotionProducts) {
            let result = "";
            lotionProducts.forEach((product) => {
                result += `<!-- single lotion Item -->
    <div class="product-item">
       <div class="product-item__title">
           <h2>${product.title}</h2>
           <p class="price">£${product.price}</p>
       </div>
       <div class="product-item__objects">
           <div class="product-item__photo">
               <img src="${product.image}" alt="lotion photo" class="productPhoto itemPhoto">
           </div>
           <div class="product-item__description"><p>${product.description}</p></div>
       </div>
       <div class="buyButtons">
           <button class="addToBasket buttons" data-id=${product.id}>Add to basket</button>
       </div>
   </div>
   <!-- end of lotion soap Item -->`;
                lotionContainer.innerHTML = result;
            });
        }
        //method for displaying cream products
    displayCreamProducts(creamProducts) {
            let result = "";
            creamProducts.forEach((product) => {
                result += `<!-- single cream Item -->
    <div class="product-item">
       <div class="product-item__title">
           <h2>${product.title}</h2>
           <p class="price">£${product.price}</p>
       </div>
       <div class="product-item__objects">
           <div class="product-item__photo">
               <img src="${product.image}" alt="cream photo" class="productPhoto itemPhoto">
           </div>
           <div class="product-item__description" data-id=${product.id}><p>${product.description}</p></div>
       </div>
       <div class="buyButtons">
           <button class="addToBasket buttons" data-id=${product.id}>Add to basket</button>
       </div>
   </div>
   <!-- end of lotion soap Item -->`;
                creamContainer.innerHTML = result;
            });
        }
        //method for displaying scrub products
    displayScrubProducts(scrubProducts) {
        let result = "";
        scrubProducts.forEach((product) => {
            result += `<!-- single scrub Item -->
    <div class="product-item">
       <div class="product-item__title">
           <h2>${product.title}</h2>
           <p class="price">£${product.price}</p>
       </div>
       <div class="product-item__objects">
           <div class="product-item__photo">
               <img src="${product.image}" alt="cream photo" class="productPhoto itemPhoto">
           </div>
           <div class="product-item__description"><p>${product.description}</p></div>
       </div>
       <div class="buyButtons">
           <button class="addToBasket buttons" data-id=${product.id}>Add to basket</button>
       </div>
   </div>
   <!-- end of lotion soap Item -->`;
            scrubContainer.innerHTML = result;
        });
    }
    getBasketButtons() {
        // getting the buttons and saving them as an array
        const buttons = [...document.querySelectorAll(".addToBasket")];
        buttonsDOM = buttons;
        buttons.forEach((button) => {
            let id = button.dataset.id;
            let inShoppingBasket = shoppingBasket.find((item) => {
                item.id === id;
            });

            if (inShoppingBasket) {
                button.innerText = "In Basket";
                button.disabled = true;
            }
            button.addEventListener("click", (event) => {
                event.target.innerText = "In Basket";
                event.target.disabled = true;
                // get product from products
                // ... spread operator allows you to add propeties
                let shoppingItem = {...Storage.getProduct(id), amount: 1 };
                // add product to the shoppingBasket
                shoppingBasket = [...shoppingBasket, shoppingItem];
                //save shoppingBasket in local storage
                Storage.saveShoppingBasket(shoppingBasket);
                this.setShoppingBasketValues(shoppingBasket);
                this.addShoppingBasketItem(shoppingItem);
                this.showShoppingBasket();
            });
        });
    }
    setShoppingBasketValues(shoppingBasket) {
        let tempTotal = 0;
        let itemsTotal = 0;
        shoppingBasket.map((item) => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        shoppingBasketTotal.innerText = parseFloat(tempTotal.toFixed(2));
        shoppingBasketItemsCount.innerText = itemsTotal;
    }
    showShoppingBasket() {
        basketContainer.classList.add("showShoppingBasket");
        shoppingBasketOverlay.classList.add("transparentBcg");
    }
    addShoppingBasketItem(item) {
        const div = document.createElement("div");
        div.classList.add("shoppingBasket-item");
        div.innerHTML = ` <img src=${item.image} alt="product" />
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up"  data-id=${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down"  data-id=${item.id}></i>
            </div>`;
        basketContainer.appendChild(div);
    }
    populateShoppingBasket(shoppingBasket) {
        shoppingBasket.forEach((item) => this.addShoppingBasketItem(item));
    }
    setupApp() {
        shoppingBasket = Storage.getShoppingBasket();
        this.setShoppingBasketValues(shoppingBasket);
        this.populateShoppingBasket(shoppingBasket);
        shoppingBasketIcon.addEventListener("click", this.showShoppingBasket);
        closeShoppingBasketBtn.addEventListener("click", this.closeShoppingBasket);
    }
    closeShoppingBasket() {
        shoppingBasketOverlay.classList.remove("transparentBcg");
        basketContainer.classList.remove("showShoppingBasket");
    }
    shoppingBasketLogic() {
        clearShoppingBasketBtn.addEventListener("click", () => {
            this.clearShoppingBasket();
        });
        basketContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                basketContainer.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = shoppingBasket.find((item) => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveShoppingBasket(shoppingBasket);
                this.setShoppingBasketValues(shoppingBasket);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = shoppingBasket.find((item) => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                console.log(lowerAmount);
                if (tempItem.amount > 0) {
                    Storage.saveShoppingBasket(shoppingBasket);
                    this.setShoppingBasketValues(shoppingBasket);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    basketContainer.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }
    clearShoppingBasket() {
        let shoppingBasketItems = shoppingBasket.map((item) => item.id);
        shoppingBasketItems.forEach((id) => {
            this.removeItem(id);
        });
        while (basketContainer.children.length > 0) {
            basketContainer.removeChild(basketContainer.children[0]);
        }
        this.closeShoppingBasket();
    }
    removeItem(id) {
        shoppingBasket = shoppingBasket.filter((item) => item.id !== id);
        this.setShoppingBasketValues(shoppingBasket);
        Storage.saveShoppingBasket(shoppingBasket);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `add to basket`;
    }
    getSingleButton(id) {
        return buttonsDOM.find((button) => button.dataset.id === id);
    }

    //play stop video function
}

//used for storing products in local storage
class Storage {
    //method for saving products in local storage
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find((product) => product.id === id);
    }
    static saveShoppingBasket(shoppingBasket) {
        localStorage.setItem("shopping basket", JSON.stringify(shoppingBasket));
    }
    static getShoppingBasket() {
        return localStorage.getItem("shopping basket") ?
            JSON.parse(localStorage.getItem("shopping basket")) :
            [];
    }
}

// used to access methods and classes after everthing has loaded on DOM
document.addEventListener("DOMContentLoaded", () => {
    //instanciate the ui class
    const ui = new UI();
    //instanciate products class
    const products = new Products();
    // set up app
    ui.setupApp();
    // calling getProducts method, after it is done
    //calling the displayProducts method
    products
        .getProducts()
        .then((products) => {
            ui.sortProducts(products);
            ui.displaySoapProducts(soapProducts);
            ui.displayLotionProducts(lotionProducts);
            ui.displayCreamProducts(creamProducts);
            ui.displayScrubProducts(scrubProducts);
            //saves the products in local storage
            Storage.saveProducts(products);
        })
        .then(() => {
            ui.getBasketButtons();
            ui.shoppingBasketLogic();
        });
});