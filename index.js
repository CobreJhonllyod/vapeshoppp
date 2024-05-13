let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'BAZOOKA GUM',
        image: '1.png',
        price: 300
    },
    {
        id: 2,
        name: 'BLACK CURRANT',
        image: '2.png',
        price: 300
    },
    {
        id: 3,
        name: 'CAPPUCCINO',
        image: '3.png',
        price: 300
    },
    {
        id: 4,
        name: 'YAKULT ICE',
        image: '4.png',
        price: 300
    },
    {
        id: 5,
        name: 'HONEY PEACH',
        image: '5.jpg',
        price: 300
    },
    {
        id: 6,
        name: 'GLEAMY CYAN',
        image: '1a.jpg',
        price: 1957
    },
    {
        id: 6,
        name: 'GLEAMY GRAY',
        image: '2a.jpg',
        price: 1957
    },
    {
        id: 6,
        name: 'GLEAMY GREEN',
        image: '3a.jpg',
        price: 1957
    },
    {
        id: 6,
        name: 'GLEAMY PINK',
        image: '4a.jpg',
        price: 1957
    },
    {
        id: 6,
        name: 'GLEAMY RED',
        image: '5a.jpg',
        price: 1957
    },
    {
        id: 6,
        name: 'OXVA XLIM CATRIDGE 0.4',
        image: 'cartridge.jpg',
        price: 270
    },
    {
        id: 6,
        name: 'Black elite battery',
        image: 'bat.jpg',
        price: 250
    }

];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}


initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}


// Update the checkout button and move the total label
let checkoutButton = document.querySelector('.checkoutButton');
checkoutButton.addEventListener('click', () => {
    // Perform checkout logic here, e.g., redirect to checkout page
    console.log('Perform checkout');
});

// Move the total label above the checkout button
let checkoutSection = document.querySelector('.checkOut');
let totalLabel = document.querySelector('.total');
checkoutSection.insertBefore(totalLabel, checkoutButton);
document.addEventListener("DOMContentLoaded", function() {
    // Declare clearCartButton variable
    let clearCartButton = document.querySelector('.clearCartButton');
    console.log(clearCartButton); // Check if clearCartButton is correctly selected

    // Add event listener to clearCartButton
    clearCartButton.addEventListener('click', () => {
        console.log('Clear cart button clicked');
        listCards = []; // Clear the cart array
        console.log('Cart cleared:', listCards);
        reloadCard(); // Update the cart display
    });

    // Other code here
});
