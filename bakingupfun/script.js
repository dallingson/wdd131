import { products } from './products.mjs';
import { reviews } from './reviews.mjs';

// Shopping cart
let cart = [];

// DOM elements
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const productsContainer = document.getElementById('products-container');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateCartDisplay();
    
    if (productsContainer) {
        displayProducts(products);
        setupEventListeners();
    }
    
    setupCartModal();
    displayRandomReviews();
});

// Display random reviews
function displayRandomReviews() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    if (!testimonialGrid) return;
    
    // Shuffle reviews and take first 3
    const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5).slice(0, 3);
    
    testimonialGrid.innerHTML = '';
    shuffledReviews.forEach(review => {
        const testimonial = document.createElement('div');
        testimonial.className = 'testimonial';
        testimonial.innerHTML = `
            <p>"${review.text}"</p>
            <cite>- ${review.author}</cite>
        `;
        testimonialGrid.appendChild(testimonial);
    });
}

// Display products
function displayProducts(productsToShow) {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="images/${product.image}" alt="${product.name}" loading="lazy" width="280" height="200">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id}, this)">Add to Cart</button>
        </div>
    `;
    return card;
}

// Add to cart
function addToCart(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    
    // Show feedback below the button
    showAddToCartFeedback(buttonElement || event.target);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
    displayCartItems();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            saveCartToStorage();
            displayCartItems();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Setup event listeners
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    
    let filteredProducts = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === selectedCategory
        );
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts(filteredProducts);
}

// Cart modal functionality
function setupCartModal() {
    const cartLinks = document.querySelectorAll('.cart-link');
    const closeBtn = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCartModal);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Close modal when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
}

// Open cart modal
function openCartModal() {
    if (cartModal) {
        cartModal.style.display = 'block';
        displayCartItems();
    }
}

// Close cart modal
function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Display cart items
function displayCartItems() {
    if (!cartItemsElement) return;
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty</p>';
        if (cartTotalElement) cartTotalElement.textContent = '0.00';
        return;
    }
    
    cartItemsElement.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">Remove</button>
            </div>
        `;
        cartItemsElement.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    if (cartTotalElement) {
        cartTotalElement.textContent = total.toFixed(2);
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your order! This is a demo - no actual payment processed.');
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
    closeCartModal();
}

// Local storage functions
function saveCartToStorage() {
    localStorage.setItem('bakingUpFunCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('bakingUpFunCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show add to cart feedback
function showAddToCartFeedback(buttonElement) {
    const feedback = document.createElement('div');
    feedback.textContent = 'Item added to cart!';
    feedback.className = 'cart-feedback';
    
    // Position below the button
    const rect = buttonElement.getBoundingClientRect();
    feedback.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 10}px;
        left: ${rect.left}px;
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        z-index: 1001;
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(feedback);
    
    // Fade in
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);
    
    // Fade out and remove
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(feedback)) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 1500);
}