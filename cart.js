// Function to add a product to the cart
function addToCart(button) {
    const productElement = button.closest('.pro');
    const productId = productElement.getAttribute('data-id');
    const productName = productElement.querySelector('h5').innerText;
    const productPrice = parseFloat(productElement.querySelector('h4').innerText.replace(/[^\d.-]/g, ''));

    // Create a cart item object
    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice
    };

    // Retrieve the cart from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart array
    cart.push(cartItem);

    // Save the updated cart array back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count and re-render items
    updateCartCount();
    renderCartItems();
}

// Function to update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById("badge").innerText = cart.length;
}

// Function to render all cart items with details and calculate total price
// Function to render all cart items with details and calculate total price
function renderCartItems() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    // Clear existing content in the cart container
    cartContainer.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach(item => {
            // Parse the price to ensure correct numerical format
            const itemPrice = parseFloat(item.price);
            totalAmount += itemPrice; // Add item price to totalAmount

            // Create a new element for each item in the cart
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <h5>Product Name: ${item.name}</h5>
                <p>Product ID: ${item.id}</p>
                <p>Price: $${itemPrice.toFixed(2)}</p>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Display the total amount
        document.getElementById('totalAmount').innerText = `Total Price: $${totalAmount.toFixed(2)}`;
        document.getElementById('totalItem').innerText = `Total Items: ${cart.length}`;
    } else {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('totalItem').innerText = 'Total Items: 0';
        document.getElementById('totalAmount').innerText = 'Total Price: $0.00';
    }
}

// Call this function on page load to set the initial display
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartItems();
});
