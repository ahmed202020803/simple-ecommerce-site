/**
 * ShopEasy E-commerce Website JavaScript
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initProductActions();
    initCartFunctionality();
    initBackToTop();
    initTestimonialSlider();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (overlay) {
            overlay.classList.toggle('active');
        }
        
        // Toggle menu button appearance
        if (this.classList.contains('active')) {
            this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.querySelector('span:nth-child(2)').style.opacity = '0';
            this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            this.querySelector('span:nth-child(1)').style.transform = 'none';
            this.querySelector('span:nth-child(2)').style.opacity = '1';
            this.querySelector('span:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            
            // Reset menu button appearance
            mobileMenuBtn.querySelector('span:nth-child(1)').style.transform = 'none';
            mobileMenuBtn.querySelector('span:nth-child(2)').style.opacity = '1';
            mobileMenuBtn.querySelector('span:nth-child(3)').style.transform = 'none';
        });
    }
}

/**
 * Product Actions (Add to Cart, Wishlist, Quick View)
 */
function initProductActions() {
    // Quick View Functionality
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const overlay = document.querySelector('.overlay');
    
    if (quickViewBtns.length && quickViewModal) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                
                // In a real application, you would fetch product details based on the ID
                // For now, we'll just show the modal with placeholder content
                quickViewModal.classList.add('active');
                if (overlay) overlay.classList.add('active');
                
                // Prevent scrolling when modal is open
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal when clicking the close button
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                quickViewModal.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside
        if (overlay) {
            overlay.addEventListener('click', function() {
                quickViewModal.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    if (addToCartBtns.length) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-id');
                
                // Add product to cart (in a real app, this would update the cart in localStorage or send to a server)
                addToCart(productId);
                
                // Show notification
                showNotification('Product added to cart!', 'success');
                
                // Update cart count
                updateCartCount();
            });
        });
    }
    
    // Add to Wishlist Functionality
    const wishlistBtns = document.querySelectorAll('.add-to-wishlist');
    
    if (wishlistBtns.length) {
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle active class for heart icon
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    showNotification('Product added to wishlist!', 'success');
                } else {
                    showNotification('Product removed from wishlist!', 'info');
                }
            });
        });
    }
    
    // Product Quantity Selector in Quick View
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    if (quantityBtns.length) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                let value = parseInt(input.value);
                
                if (this.classList.contains('minus')) {
                    value = value > 1 ? value - 1 : 1;
                } else {
                    value = value < parseInt(input.getAttribute('max')) ? value + 1 : parseInt(input.getAttribute('max'));
                }
                
                input.value = value;
            });
        });
    }
    
    // Product Image Gallery in Quick View
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.querySelector('.main-image img');
    
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
 * Cart Functionality
 */
function initCartFunctionality() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    
    if (cartIcon && cartSidebar) {
        // Open cart sidebar when clicking cart icon
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            
            // Prevent scrolling when cart is open
            document.body.style.overflow = 'hidden';
        });
        
        // Close cart sidebar when clicking close button
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', function() {
                cartSidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close cart sidebar when clicking outside
        if (overlay) {
            overlay.addEventListener('click', function() {
                cartSidebar.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    // Initialize cart from localStorage
    loadCart();
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        // Scroll to top when clicking the button
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || !testimonials.length) return;
    
    let currentIndex = 0;
    
    // Show testimonial at current index
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].style.display = 'block';
        
        // Add active class to current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    // Initialize slider
    showTestimonial(currentIndex);
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Dot navigation
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
    }
    
    // Auto slide (optional)
    let interval = setInterval(function() {
        if (nextBtn) {
            nextBtn.click();
        }
    }, 5000);
    
    // Pause auto slide on hover
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            clearInterval(interval);
        });
        
        slider.addEventListener('mouseleave', function() {
            interval = setInterval(function() {
                if (nextBtn) {
                    nextBtn.click();
                }
            }, 5000);
        });
    }
}

/**
 * Cart Helper Functions
 */
function addToCart(productId) {
    // In a real application, you would fetch product details from an API
    // For now, we'll use hardcoded product data
    const products = {
        '1': {
            id: 1,
            name: 'Casual T-Shirt',
            price: 29.99,
            image: 'https://via.placeholder.com/100x100'
        },
        '2': {
            id: 2,
            name: 'Denim Jacket',
            price: 59.99,
            image: 'https://via.placeholder.com/100x100'
        },
        '3': {
            id: 3,
            name: 'Leather Handbag',
            price: 89.99,
            image: 'https://via.placeholder.com/100x100'
        },
        '4': {
            id: 4,
            name: 'Running Shoes',
            price: 119.99,
            image: 'https://via.placeholder.com/100x100'
        }
    };
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => item.id == productId);
    
    if (existingProductIndex !== -1) {
        // Increment quantity if product is already in cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add product to cart
        const product = products[productId];
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartUI();
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (!cartCountElement) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total quantity
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count
    cartCountElement.textContent = totalQuantity;
}

function loadCart() {
    // Update cart count
    updateCartCount();
    
    // Update cart UI
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.total-amount');
    const emptyCartElement = document.querySelector('.empty-cart');
    
    if (!cartItemsContainer) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Show/hide empty cart message
    if (cart.length === 0) {
        if (emptyCartElement) emptyCartElement.style.display = 'block';
        cartItemsContainer.innerHTML = '';
        if (cartTotalElement) cartTotalElement.textContent = '$0.00';
        return;
    } else {
        if (emptyCartElement) emptyCartElement.style.display = 'none';
    }
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    // Add cart items to UI
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">
                    <span class="quantity">${item.quantity}</span> x
                    <span class="price">$${item.price.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
    
    // Calculate total
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update total
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

function removeFromCart(productId) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove product from cart
    cart = cart.filter(item => item.id != productId);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartUI();
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification('Product removed from cart!', 'info');
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification to the DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}