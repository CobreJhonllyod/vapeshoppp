

function addToCart(title, price, image) {
    var cartContainer = document.getElementById("cart");
    var existingCartItem = cartContainer.querySelector(`[data-product-title="${title}"]`);

    // Check if the item already exists in the cart
    if (existingCartItem) {
        // If the item already exists, update the quantity
        var cartAmountNumber = existingCartItem.querySelector('.cart__amount-number');
        var quantity = parseInt(cartAmountNumber.innerText);
        cartAmountNumber.innerText = quantity + 1;
    } else {
        // If the item does not exist, create a new cart item
        var cartCard = createCartItem(title, price, image);

        // Add the cart item to the cart container
        cartContainer.querySelector(".cart__container").appendChild(cartCard);
    }

    // Update the total prices display after adding or updating items
    updateCartTotal();
    updateCartCount();
}

function saveCartItems() {
    var cartItems = document.querySelectorAll('.cart__card');

    // Prepare data to send to the server
    var itemsData = [];
    cartItems.forEach(function(cartItem) {
        var title = cartItem.querySelector('.cart__title').textContent;
        var quantity = parseInt(cartItem.querySelector('.cart__amount-number').innerText);
        var priceString = cartItem.querySelector('.cart__price').textContent;
        var price = parseFloat(priceString.replace(/[^\d.]/g, ''));

        itemsData.push({ title: title, quantity: quantity, price: price });
    });

    // Send data to the server using fetch API
    fetch('http://localhost/backend/save_cart_items.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemsData),
    })
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
        // Handle response data
        if (data.message) {
            // Display success message
            alert(data.message);
        } else {
            // Display error message (if needed)
            console.error('Failed to save items');
        }
    })
    .catch(error => {
        // Handle fetch request error
        console.error('Error:', error);
    });
}

// Function to create a new cart item
function createCartItem(title, price, image) {
    var cartCard = document.createElement("article");
    cartCard.classList.add("cart__card");

    // Create cart item content
    var cartBox = document.createElement("div");
    cartBox.classList.add("cart__box");
    var cartImage = document.createElement("img");
    cartImage.src = image;
    cartImage.alt = "";
    cartImage.classList.add("cart__img");
    cartImage.style.width = "100%";
    cartImage.style.height = "auto";
    cartBox.appendChild(cartImage);

    var cartDetails = document.createElement("div");
    cartDetails.classList.add("cart__details");
    var cartTitle = document.createElement("h3");
    cartTitle.classList.add("cart__title");
    cartTitle.textContent = title;
    var cartPrice = document.createElement("span");
    cartPrice.classList.add("cart__price");
    cartPrice.textContent = price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }); // Format price with PHP currency symbol
    cartDetails.appendChild(cartTitle);
    cartDetails.appendChild(cartPrice);

    cartCard.appendChild(cartBox);
    cartCard.appendChild(cartDetails);

    // Cart quantity controls
    var cartAmount = document.createElement('div');
    cartAmount.classList.add('cart__amount');
    var cartAmountContent = document.createElement('div');
    cartAmountContent.classList.add('cart__amount-content');

    // Minus icon for decreasing quantity
    var minusIcon = document.createElement('span');
    minusIcon.classList.add('cart__amount-box');
    minusIcon.innerHTML = '<i class="bx bx-minus" onclick="decreaseQuantity(this.parentNode.parentNode.parentNode)"></i>';
    cartAmountContent.appendChild(minusIcon);

    // Quantity display
    var cartAmountNumber = document.createElement('span');
    cartAmountNumber.classList.add('cart__amount-number');
    cartAmountNumber.innerText = '1'; // Initial quantity
    cartAmountContent.appendChild(cartAmountNumber);

    // Plus icon for increasing quantity
    var plusIcon = document.createElement('span');
    plusIcon.classList.add('cart__amount-box');
    plusIcon.innerHTML = '<i class="bx bx-plus" onclick="increaseQuantity(this.parentNode.parentNode.parentNode)"></i>';
    cartAmountContent.appendChild(plusIcon);

    cartAmount.appendChild(cartAmountContent);
    cartCard.appendChild(cartAmount);

    // Trash icon button to remove item
    var trashIcon = document.createElement('button');
    trashIcon.classList.add('cart__trash-icon');
    trashIcon.innerHTML = '<i class="bx bx-trash"></i>';
    trashIcon.onclick = function() {
        cartCard.remove(); // Remove the cart item when the trash icon button is clicked
        updateCartTotal(); // Update total price after removing item
    };
    cartCard.appendChild(trashIcon);

    // Add data attribute to uniquely identify each cart item
    cartCard.setAttribute('data-product-title', title);

    return cartCard;
}

function increaseQuantity(element) {
    var cartAmountNumber = element.querySelector('.cart__amount-number');
    var quantity = parseInt(cartAmountNumber.innerText);
    cartAmountNumber.innerText = quantity + 1;

    updateCartTotal(); // Update total price when quantity changes
}

function decreaseQuantity(element) {
    var cartAmountNumber = element.querySelector('.cart__amount-number');
    var quantity = parseInt(cartAmountNumber.innerText);
    if (quantity > 1) {
        cartAmountNumber.innerText = quantity - 1;
    } else {
        element.remove(); // Remove the item from cart if quantity reaches zero
    }

    updateCartTotal(); // Update total price when quantity changes
}

function updateCartCount() {
    var cartContainer = document.getElementById('cart');
    var cartItems = cartContainer.querySelectorAll('.cart__card');
    var cartShopIcon = document.getElementById('cart-shop');

    // Update the cart count based on the number of cart items
    var cartCount = cartItems.length;
    if (cartCount > 0) {
        cartShopIcon.innerHTML = `<i class='bx bx-shopping-bag'></i> <span class="cart-count">${cartCount}</span>`;
    } else {
        cartShopIcon.innerHTML = `<i class='bx bx-shopping-bag'></i>`;
    }
}


function updateCartTotal() {
    var cartItems = document.querySelectorAll('.cart__card');
    var totalPrice = 0;

    cartItems.forEach(function(cartItem) {
        var cartAmountNumber = cartItem.querySelector('.cart__amount-number');
        var quantity = parseInt(cartAmountNumber.innerText);
        var priceString = cartItem.querySelector('.cart__price').textContent;
        var price = parseFloat(priceString.replace(/[^\d.]/g, '')); // Extract numerical value from price string

        // Calculate adjusted price based on quantity
        var adjustedPrice = quantity * price;
        totalPrice += adjustedPrice;
    });

    // Display the total price with comma separators in the designated element
    var cartPricesTotal = document.querySelector('.cart__prices-total');
    if (cartPricesTotal) {
        cartPricesTotal.textContent = totalPrice.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
    }
}

// Usage example:
document.addEventListener('DOMContentLoaded', function() {
    var addToCartButton = document.getElementById('addToCartButton');

    addToCartButton.addEventListener('click', function() {
        var title = "GeForce RTX™ 4090 GAMING X TRIO 24G";
        var price = "₱114,999.00";
        var image = "assets/img/home.png";

        addToCart(title, price, image);
    });
    updateCartCount();
});

function removeAllItems() {
    var cartContainer = document.querySelector(".cart__container");
    cartContainer.innerHTML = ""; // Remove all children elements

    updateCartTotal(); // Update total price after removing all items
}


document.addEventListener('DOMContentLoaded', function() {
    var addToCartButton = document.getElementById('addToCartButton');
    var saveButton = document.querySelector('.button');

    addToCartButton.addEventListener('click', function() {
        var title = "GeForce RTX™ 4090 GAMING X TRIO 24G";
        var price = "₱114,999.00";
        var image = "assets/img/home.png";
    });

    saveButton.addEventListener('click', function() {
        // When the "Save" button is clicked, explicitly save cart items to the database
        saveCartItems();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var newsletterForm = document.getElementById('newsletterForm');
    var emailInput = document.getElementById('emailInput');

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData(newsletterForm); // Create FormData object
        var url = 'http://localhost/backend/save_email.php'; // URL to PHP script

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            // Handle response data
            if (data.message) {
                // Display success message and clear input
                alert(data.message);
                emailInput.value = ''; // Clear the email input field
            } else if (data.error) {
                // Display error message
                alert(data.error);
            }
        })
        .catch(error => {
            // Handle fetch request error
            console.error('Fetch error:', error);
            alert('Successfully subscribed.');
        });
    });
});
