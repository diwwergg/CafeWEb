let bandList = [
    {
        key: 1,
        name: "Cappuccino",
        price: 50,
        src: "https://i.ibb.co/fpjVnZF/cappucino.jpg",
        toCart: false
    },
    {
        key: 2,
        name: "Latte",
        price: 50,
        src: "https://i.ibb.co/N7mYw18/Latte-art.jpg",
        toCart: false
    },
    {
        key: 3,
        name: "Espresso",
        price: 50,
        src: "https://i.ibb.co/1f94T7Z/es.jpg",
        toCart: false
    },
    {
        key: 4,
        name: "Black coffee",
        price: 50,
        src: "https://i.ibb.co/y65c2xg/bcoffee.jpg",
        toCart: false
    },
    {
        key: 5,
        name: "Matcha tea",
        price: 50,
        src: "https://i.ibb.co/X7wWy4K/matcha.jpg",
        toCart: false
    },
    {
        key: 6,
        name: "White tea",
        price: 60,
        src: "https://i.ibb.co/4sgkLrQ/whitetea.jpg",
        toCart: false
    },
    {
        key: 7,
        name: "Thai tea",
        price: 40,
        src: "https://i.ibb.co/pfft38P/tea.jpg",
        toCart: false
    },
    {
        key: 8,
        name: "Cocoa",
        price: 40,
        src: "https://i.ibb.co/c6w3RBk/cocoamilk.jpg",
        toCart: false
    },
    {
        key: 9,
        name: "Chocolate cake",
        price: 60,
        src: "https://i.ibb.co/RP58Jt3/Chocolatecake.jpg",
        toCart: false
    },
    {
        key: 10,
        name: "Cheese cake",
        price: 60,
        src: "https://i.ibb.co/W2pWGGS/cheesecake.jpg",
        toCart: false
    },
    {
        key: 11,
        name: "Croissant",
        price: 60,
        src: "https://i.ibb.co/FmWG3Bw/Croissant.png",
        toCart: false
    },
    {
        key: 12,
        name: "Cupcake",
        price: 60,
        src: "https://i.ibb.co/64CjGXd/cupcake.jpg",
        toCart: false
    }
]

let cart = [];
// where toCart is true push to cart
function addToCart() {
    cart = [];
    for (let i = 0; i < bandList.length; i++) {
        if (bandList[i].toCart) {
            cart.push(bandList[i]);
        }
    }
    console.log(cart);
}


function renderCart(cart, selector) {
    renderAllPrceCart();
    let HTML = '';
    for (const band of cart) {
        HTML += `
        <div class="counter-item">
                        <h4>${band.name}</h4>
                        <h4>${band.price} bath</h4>
                    </div>
        `
    }
    const DOM = document.getElementById(selector);
    DOM.innerHTML = HTML;
}

function renderAllPrceCart() {
    counterCart = document.getElementById('counterCart');
    priceCart = document.getElementById('priceCart');
    let sumIndex = 0;
    let sumPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        sumIndex++;
        sumPrice += cart[i].price;
    }
    counterCart.innerHTML = `All items : ${sumIndex}`;
    priceCart.innerHTML = 'Price : ' + sumPrice + ' bath';

}

const renderBandList = (bandList, selector) => {
    let HTML = '';
    for (const band of bandList) {
        HTML += `<div class="box">
                        <span class="price">${band.price} bath </span>
                        <img src="${band.src}" alt="">
                        <h3>${band.name}</h3>
                        <div class="buttonsCart" key=${band.key} onclick="callButtonsCart()">
                            <h5 class="btn-cart ${band.toCart ? " addCart" : ""}">add to cart</h5>
                        </div>
                    </div>`;
    }
    const DOM = document.getElementById(selector);
    DOM.innerHTML = HTML;
}

// when buttonsCart is clicked
function callButtonsCart() {
    buttonsCart = document.querySelectorAll('.buttonsCart');
    buttonsCart.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('key');
            const index = bandList.findIndex(band => band.key == key);
            console.log(index);
            bandList[index].toCart = !bandList[index].toCart;
            renderBandList(bandList, 'box-container');
            console.log(bandList[index]);
            callButtonsCart();
            addToCart();
            renderCart(cart, 'boxCart');
        });
    });
}

function clearCart() {
    cart = [];
    for (let i = 0; i < bandList.length; i++) {
        bandList[i].toCart = false;
    }
    renderBandList(bandList, 'box-container');
    callButtonsCart();
    addToCart();
    renderCart(cart, 'boxCart');
    console.log("clear");
}

renderBandList(bandList, 'box-container');
callButtonsCart();
addToCart();
renderCart(cart, 'boxCart');
renderAllPrceCart();