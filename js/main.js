/**
 * ShopEasy E-commerce Website JavaScript
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initProductActions();
    initBackToTop();
    initCartSidebar();
    initQuickView();
    initTestimonialSlider();
    initNewsletterForm();
    
    // Load cart from localStorage
    loadCart();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    if (!mobileMenuBtn || !mobileMenu || !overlay) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Toggle hamburger animation
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on overlay
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        mobileMenuBtn.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

/**
 * Product Actions (Add to Cart, Wishlist, Quick View)
 */
function initProductActions() {
    // Add to Cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            addToCart(productId);
            showNotification('Product added to cart!', 'success');
        });
    });
    
    // Add to Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.add-to-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            showNotification(
                isActive ? 'Product added to wishlist!' : 'Product removed from wishlist!',
                isActive ? 'success' : 'info'
            );
        });
    });
    
    // Quick View functionality
    const quickViewBtns = document.querySelectorAll('.quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            openQuickView(productId);
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Cart Sidebar Functionality
 */
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    
    if (!cartIcon || !cartSidebar || !closeCart || !overlay) return;
    
    // Open cart sidebar
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    });
    
    // Close cart sidebar
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Close cart when clicking on overlay
    overlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

/**
 * Quick View Modal Functionality
 */
function initQuickView() {
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    const overlay = document.querySelector('.overlay');
    
    if (!quickViewModal || !closeModal || !overlay) return;
    
    // Close modal when clicking on close button
    closeModal.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Close modal when clicking on overlay
    overlay.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Quantity selector in quick view
    const minusBtn = quickViewModal.querySelector('.minus');
    const plusBtn = quickViewModal.querySelector('.plus');
    const quantityInput = quickViewModal.querySelector('.quantity-selector input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < parseInt(quantityInput.max)) {
                quantityInput.value = value + 1;
            }
        });
    }
    
    // Thumbnail images in quick view
    const thumbnails = quickViewModal.querySelectorAll('.thumbnail-images img');
    const mainImage = quickViewModal.querySelector('.main-image img');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                mainImage.src = this.src.replace('100x100', '500x500');
            });
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (!slider || !prevBtn || !nextBtn || !dots.length) return;
    
    let currentSlide = 0;
    const testimonials = slider.querySelectorAll('.testimonial');
    
    if (!testimonials.length) return;
    
    // Show the first testimonial
    showSlide(currentSlide);
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = testimonials.length - 1;
        }
        showSlide(currentSlide);
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        currentSlide++;
        if (currentSlide >= testimonials.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide
    let interval = setInterval(function() {
        currentSlide++;
        if (currentSlide >= testimonials.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    
    slider.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonials.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    });
    
    // Show slide function
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current testimonial
        testimonials[index].style.display = 'block';
        
        // Add active class to current dot
        dots[index].classList.add('active');
    }
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email === '') {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        emailInput.value = '';
    });
}

/**
 * Cart Functionality
 */
// Add to cart
function addToCart(productId) {
    // In a real application, you would fetch product details from an API
    // For this example, we'll use dummy data
    const product = {
        id: productId,
        name: 'Product ' + productId,
        price: 29.99,
        image: 'https://via.placeholder.com/100x100',
        quantity: 1
    };
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex !== -1) {
        // Update quantity if product already exists
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push(product);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartUI(cart);
}

// Remove from cart
function removeFromCart(productId) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove product from cart
    cart = cart.filter(item => item.id !== productId);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartUI(cart);
    
    showNotification('Product removed from cart.', 'info');
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find product in cart
    const productIndex = cart.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
        // Update quantity
        cart[productIndex].quantity = quantity;
        
        // Remove product if quantity is 0
        if (quantity <= 0) {
            cart.splice(productIndex, 1);
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart UI
        updateCartUI(cart);
    }
}

// Load cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartUI(cart);
}

// Update cart UI
function updateCartUI(cart) {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const emptyCart = document.querySelector('.empty-cart');
    
    if (!cartCount || !cartItems || !cartTotal || !emptyCart) return;
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        // Show empty cart message
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        cartTotal.textContent = '$0.00';
    } else {
        // Hide empty cart message
        emptyCart.style.display = 'none';
        
        // Calculate total price
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotal.textContent = '$' + totalPrice.toFixed(2);
        
        // Generate cart items HTML
        let cartItemsHTML = '';
        
        cart.forEach(item => {
            cartItemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <button class="remove-item">&times;</button>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartItemsHTML;
        
        // Add event listeners to cart items
        const minusBtns = cartItems.querySelectorAll('.minus');
        const plusBtns = cartItems.querySelectorAll('.plus');
        const removeItemBtns = cartItems.querySelectorAll('.remove-item');
        
        minusBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const productId = cartItem.getAttribute('data-id');
                const currentQuantity = parseInt(cartItem.querySelector('.cart-item-quantity span').textContent);
                updateCartQuantity(productId, currentQuantity - 1);
            });
        });
        
        plusBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const productId = cartItem.getAttribute('data-id');
                const currentQuantity = parseInt(cartItem.querySelector('.cart-item-quantity span').textContent);
                updateCartQuantity(productId, currentQuantity + 1);
            });
        });
        
        removeItemBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const productId = cartItem.getAttribute('data-id');
                removeFromCart(productId);
            });
        });
    }
}

/**
 * Quick View Functionality
 */
function openQuickView(productId) {
    const quickViewModal = document.getElementById('quickViewModal');
    const overlay = document.querySelector('.overlay');
    
    if (!quickViewModal || !overlay) return;
    
    // In a real application, you would fetch product details from an API
    // For this example, we'll use dummy data
    const product = {
        id: productId,
        name: 'Product ' + productId,
        price: 29.99,
        oldPrice: 39.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        rating: 4.5,
        reviews: 24,
        sku: 'PRD-' + productId,
        category: 'Clothing',
        tags: ['Fashion', 'Summer', 'Casual'],
        images: [
            'https://via.placeholder.com/500x500',
            'https://via.placeholder.com/500x500',
            'https://via.placeholder.com/500x500'
        ]
    };
    
    // Update modal content with product details
    quickViewModal.querySelector('.product-title').textContent = product.name;
    quickViewModal.querySelector('.current-price').textContent = '$' + product.price.toFixed(2);
    quickViewModal.querySelector('.old-price').textContent = '$' + product.oldPrice.toFixed(2);
    quickViewModal.querySelector('.product-description p').textContent = product.description;
    quickViewModal.querySelector('.product-meta p:nth-child(1) span:last-child').textContent = 'PRD-' + product.id;
    
    // Show modal
    quickViewModal.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification to the DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        
        // Remove notification from the DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Close notification when clicking on close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('active');
        
        // Remove notification from the DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}