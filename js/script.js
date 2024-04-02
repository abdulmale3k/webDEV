document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const basket = document.querySelector('.basket');
    const checkoutButton = document.querySelector('.checkout');
    const orderSummary = document.querySelector('.order-summary');
    const checkoutSummary = document.querySelector('.checkout-summary');

    let totalAmount = 0;

    // Event listener for "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productName = product.querySelector('h2').textContent;
            const productPriceText = product.querySelector('p:nth-child(4)').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', '')); 
            const quantity = parseInt(product.querySelector('#quantity').value); 
            const totalPrice = productPrice * quantity;
            const basketItem = document.createElement('div');
            basketItem.classList.add('basket-item');
            basketItem.innerHTML = `
                <p>${productName}</p>
                <p>${quantity} x $${productPrice.toFixed(2)}</p>
                <p>$${totalPrice.toFixed(2)}</p>
            `;
            basket.appendChild(basketItem);

            totalAmount += totalPrice;

            updateOrderSummary(totalAmount);
            updateCheckoutSummary(totalAmount);
        });
    });

    // Function to update order summary
    function updateOrderSummary(totalAmount) {
        orderSummary.querySelector('.amount-to-pay').textContent = `$${totalAmount.toFixed(2)}`;
    }

    // Function to update checkout summary
    function updateCheckoutSummary(totalAmount) {
        checkoutSummary.querySelector('.total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    }

    // Event listener for "Checkout" button
    checkoutButton.addEventListener('click', function() {
        checkoutSummary.classList.remove('hidden');
        checkoutSummary.querySelector('.exact-amount').textContent = orderSummary.querySelector('.amount-to-pay').textContent;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const productShowcase = document.querySelector('.product-showcase');
    const productItems = document.querySelectorAll('.product');

    let position = 0;
    const slideWidth = 240; 
    const maxPosition = (productItems.length - 1) * slideWidth;

    productShowcase.addEventListener('wheel', function(event) {
        const delta = Math.sign(event.deltaY);
        position = Math.min(maxPosition, Math.max(0, position + delta * slideWidth));
        productShowcase.style.transform = `translateX(-${position}px)`;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const basket = document.querySelector('.basket');
    const checkoutButton = document.querySelector('.checkout');
    const orderSummary = document.querySelector('.order-summary');
    const checkoutFormContainer = document.querySelector('.checkout-form-container');

    let totalAmount = 0;
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productName = product.querySelector('h2').textContent;
            const productPriceText = product.querySelector('p:nth-child(4)').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', '')); 

            
            const basketItem = document.createElement('div');
            basketItem.classList.add('basket-item');
            basketItem.innerHTML = `
                <p>${productName}</p>
                <p>${productPriceText}</p>
            `;
            basket.appendChild(basketItem);

            // Update total amount
            totalAmount += productPrice;
            updateOrderSummary();
        });
    });

    function updateOrderSummary() {
        orderSummary.querySelector('.amount-to-pay').textContent = `$${totalAmount.toFixed(2)}`;
    }
    checkoutButton.addEventListener('click', function() {
        const checkoutSummary = document.querySelector('.checkout-summary');
        checkoutSummary.classList.remove('hidden');
    });

    const completePurchaseButton = document.querySelector('.checkout-form-container button[type="submit"]');
    completePurchaseButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        alert('Your purchase is completed! Thank you for shopping with us!');
    });
});
