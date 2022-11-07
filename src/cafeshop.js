const bandList = [
    {
        name: "Cappuccino",
        price: 50,
        src: "https://i.ibb.co/fpjVnZF/cappucino.jpg"
    },
    {
        name: "Latte",
        price: 50,
        src: "https://i.ibb.co/N7mYw18/Latte-art.jpg"
    },
    {
        name: "Espresso",
        price: 50,
        src: "https://i.ibb.co/1f94T7Z/es.jpg"
    },
    {
        name: "Black coffee",
        price: 50,
        src: "https://i.ibb.co/y65c2xg/bcoffee.jpg"
    },
    {
        name: "Matcha tea",
        price: 50,
        src: "https://i.ibb.co/X7wWy4K/matcha.jpg"
    },
    {
        name: "White tea",
        price: 60,
        src: "https://i.ibb.co/4sgkLrQ/whitetea.jpg"
    },
    {
        name: "Thai tea",
        price: 40,
        src: "https://i.ibb.co/pfft38P/tea.jpg"
    },
    {
        name: "Cocoa",
        price: 40,
        src: "https://i.ibb.co/c6w3RBk/cocoamilk.jpg"
    },
    {
        name: "Chocolate cake",
        price: 60,
        src: "https://i.ibb.co/RP58Jt3/Chocolatecake.jpg"
    },
    {
        name: "Cheese cake",
        price: 60,
        src: "https://i.ibb.co/W2pWGGS/cheesecake.jpg"
    },
    {
        name: "Croissant",
        price: 60,
        src: "https://i.ibb.co/FmWG3Bw/Croissant.png"
    },
    {
        name: "Cupcake",
        price: 60,
        src: "https://i.ibb.co/64CjGXd/cupcake.jpg"
    }
]


const renderBandList = (bandList, selector) => {
    let HTML = '';
    for (const band of bandList) {
        HTML += `<div class="box">
                        <span class="price">${band.price} </span>
                        <img src="${band.src}" alt="">
                        <h3>${band.name}</h3>
                        <div class="buttons">
                            <a href="#" class="btn-buy">buy now</a>
                            <a href="#" class="btn-cart">add to cart</a>
                        </div>
                    </div>`;
    }
    const DOM = document.getElementById(selector);
    DOM.innerHTML = HTML;
}

renderBandList(bandList, 'box-container');

