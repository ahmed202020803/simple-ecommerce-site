/**
 * Products Page JavaScript
 * Handles filtering, sorting, and view options for the products page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize products page functionality
    initViewOptions();
    initPriceRange();
    initFilters();
    initSorting();
    initMobileFilters();
});

/**
 * View Options (Grid/List)
 */
function initViewOptions() {
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsGrid = document.querySelector('.products-grid');
    
    if (!gridViewBtn || !listViewBtn || !productsGrid) return;
    
    // Grid view
    gridViewBtn.addEventListener('click', function() {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        productsGrid.classList.remove('list-view');
        
        // Save preference to localStorage
        localStorage.setItem('productsView', 'grid');
    });
    
    // List view
    listViewBtn.addEventListener('click', function() {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        productsGrid.classList.add('list-view');
        
        // Save preference to localStorage
        localStorage.setItem('productsView', 'list');
    });
    
    // Load saved preference
    const savedView = localStorage.getItem('productsView');
    if (savedView === 'list') {
        listViewBtn.click();
    }
}

/**
 * Price Range Slider
 */
function initPriceRange() {
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const sliderTrack = document.querySelector('.slider-track');
    
    if (!minRange || !maxRange || !minPrice || !maxPrice || !sliderTrack) return;
    
    // Set initial values
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);
    
    // Update slider track
    updateSliderTrack();
    
    // Min range input event
    minRange.addEventListener('input', function() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);
        
        if (minVal > maxVal - 50) {
            minRange.value = maxVal - 50;
        }
        
        minPrice.value = minRange.value;
        updateSliderTrack();
    });
    
    // Max range input event
    maxRange.addEventListener('input', function() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);
        
        if (maxVal < minVal + 50) {
            maxRange.value = minVal + 50;
        }
        
        maxPrice.value = maxRange.value;
        updateSliderTrack();
    });
    
    // Min price input event
    minPrice.addEventListener('input', function() {
        const minVal = parseInt(minPrice.value);
        const maxVal = parseInt(maxPrice.value);
        
        if (minVal < 0) {
            minPrice.value = 0;
        } else if (minVal > maxVal - 50) {
            minPrice.value = maxVal - 50;
        }
        
        minRange.value = minPrice.value;
        updateSliderTrack();
    });
    
    // Max price input event
    maxPrice.addEventListener('input', function() {
        const minVal = parseInt(minPrice.value);
        const maxVal = parseInt(maxPrice.value);
        
        if (maxVal > 1000) {
            maxPrice.value = 1000;
        } else if (maxVal < minVal + 50) {
            maxPrice.value = minVal + 50;
        }
        
        maxRange.value = maxPrice.value;
        updateSliderTrack();
    });
    
    // Update slider track function
    function updateSliderTrack() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);
        const percent1 = (minVal / parseInt(minRange.max)) * 100;
        const percent2 = (maxVal / parseInt(maxRange.max)) * 100;
        
        sliderTrack.style.left = percent1 + '%';
        sliderTrack.style.right = (100 - percent2) + '%';
        
        // Apply filters after updating price range
        applyFilters();
    }
}

/**
 * Filters
 */
function initFilters() {
    const filterInputs = document.querySelectorAll('.filters-sidebar input');
    const resetBtn = document.querySelector('.filter-reset');
    
    if (!filterInputs.length) return;
    
    // Add event listeners to all filter inputs
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            applyFilters();
        });
    });
    
    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset all checkboxes
            const checkboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset price range
            const minRange = document.querySelector('.min-range');
            const maxRange = document.querySelector('.max-range');
            const minPrice = document.getElementById('min-price');
            const maxPrice = document.getElementById('max-price');
            
            if (minRange && maxRange && minPrice && maxPrice) {
                minRange.value = 0;
                maxRange.value = 500;
                minPrice.value = 0;
                maxPrice.value = 500;
                
                // Update slider track
                const sliderTrack = document.querySelector('.slider-track');
                if (sliderTrack) {
                    sliderTrack.style.left = '0%';
                    sliderTrack.style.right = '50%';
                }
            }
            
            // Apply filters
            applyFilters();
        });
    }
}

/**
 * Apply Filters
 * In a real application, this would filter products based on selected criteria
 * For this example, we'll just log the selected filters
 */
function applyFilters() {
    // Get all selected filters
    const selectedFilters = {
        categories: getSelectedValues('category'),
        priceRange: {
            min: parseInt(document.getElementById('min-price').value),
            max: parseInt(document.getElementById('max-price').value)
        },
        sizes: getSelectedValues('size'),
        colors: getSelectedValues('color'),
        brands: getSelectedValues('brand'),
        ratings: getSelectedValues('rating')
    };
    
    // Log selected filters (for demonstration)
    console.log('Selected Filters:', selectedFilters);
    
    // In a real application, you would filter products based on these criteria
    // For this example, we'll simulate filtering by adding a "filtered" class to some products
    simulateFiltering(selectedFilters);
}

/**
 * Get Selected Values
 * Helper function to get all selected values for a given filter name
 */
function getSelectedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

/**
 * Simulate Filtering
 * For demonstration purposes only
 */
function simulateFiltering(filters) {
    const products = document.querySelectorAll('.product-card');
    
    // Reset all products
    products.forEach(product => {
        product.classList.remove('filtered');
        product.style.display = 'block';
    });
    
    // If no filters are selected, show all products
    const hasFilters = Object.values(filters).some(filter => {
        if (Array.isArray(filter)) {
            return filter.length > 0;
        } else if (typeof filter === 'object') {
            return Object.values(filter).some(val => val !== 0 && val !== 1000);
        }
        return false;
    });
    
    if (!hasFilters) return;
    
    // Simulate filtering by hiding some products
    // In a real application, you would filter based on actual product data
    products.forEach((product, index) => {
        // For demonstration, we'll hide products based on arbitrary criteria
        let shouldShow = true;
        
        // Simulate category filtering
        if (filters.categories.length > 0) {
            // For demo, we'll assume even-indexed products are men's and odd-indexed are women's
            const productCategory = index % 2 === 0 ? 'men' : 'women';
            if (!filters.categories.includes(productCategory)) {
                shouldShow = false;
            }
        }
        
        // Simulate price filtering
        const productPrice = parseFloat(product.querySelector('.current-price').textContent.replace('$', ''));
        if (productPrice < filters.priceRange.min || productPrice > filters.priceRange.max) {
            shouldShow = false;
        }
        
        // Simulate size filtering
        if (filters.sizes.length > 0) {
            // For demo, we'll assume products with index divisible by 3 are size S, by 4 are M, by 5 are L
            let productSize;
            if (index % 3 === 0) productSize = 's';
            else if (index % 4 === 0) productSize = 'm';
            else if (index % 5 === 0) productSize = 'l';
            else productSize = 'xl';
            
            if (!filters.sizes.includes(productSize)) {
                shouldShow = false;
            }
        }
        
        // Apply the filtering
        if (!shouldShow) {
            product.style.display = 'none';
        }
    });
    
    // Update product count
    updateProductCount();
}

/**
 * Update Product Count
 */
function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product-card[style="display: block;"]').length;
    const totalProducts = document.querySelectorAll('.product-card').length;
    const productsCount = document.querySelector('.products-count p span:first-child');
    
    if (productsCount) {
        productsCount.textContent = `1-${visibleProducts}`;
    }
}

/**
 * Sorting
 */
function initSorting() {
    const sortSelect = document.getElementById('sort-by');
    
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        sortProducts(sortValue);
    });
}

/**
 * Sort Products
 * In a real application, this would sort products based on selected criteria
 * For this example, we'll just rearrange the products in the DOM
 */
function sortProducts(sortBy) {
    const productsGrid = document.querySelector('.products-grid');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    if (!productsGrid || !products.length) return;
    
    // Sort products based on criteria
    products.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return getPriceFromProduct(a) - getPriceFromProduct(b);
            case 'price-high':
                return getPriceFromProduct(b) - getPriceFromProduct(a);
            case 'rating':
                return getRatingFromProduct(b) - getRatingFromProduct(a);
            case 'newest':
                // For demo, we'll just reverse the current order
                return -1;
            default:
                // Default to popularity (for demo, we'll use the original order)
                return 0;
        }
    });
    
    // Reappend sorted products to the grid
    products.forEach(product => {
        productsGrid.appendChild(product);
    });
}

/**
 * Get Price From Product
 * Helper function to extract price from product card
 */
function getPriceFromProduct(product) {
    const priceElement = product.querySelector('.current-price');
    if (!priceElement) return 0;
    
    return parseFloat(priceElement.textContent.replace('$', ''));
}

/**
 * Get Rating From Product
 * Helper function to extract rating from product card
 */
function getRatingFromProduct(product) {
    const ratingStars = product.querySelectorAll('.product-rating .fas.fa-star').length;
    const halfStar = product.querySelector('.product-rating .fas.fa-star-half-alt') ? 0.5 : 0;
    
    return ratingStars + halfStar;
}

/**
 * Mobile Filters
 */
function initMobileFilters() {
    // For mobile, we need to add a filter button and make the sidebar toggleable
    const productsHeader = document.querySelector('.products-header');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (!productsHeader || !filtersSidebar || !overlay) return;
    
    // Create filter button for mobile
    const filterBtn = document.createElement('button');
    filterBtn.className = 'btn filter-btn';
    filterBtn.innerHTML = '<i class="fas fa-filter"></i> Filters';
    
    // Insert filter button at the beginning of products header
    productsHeader.insertBefore(filterBtn, productsHeader.firstChild);
    
    // Add close button to filters sidebar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-filters';
    closeBtn.innerHTML = '&times;';
    filtersSidebar.insertBefore(closeBtn, filtersSidebar.firstChild);
    
    // Toggle filters sidebar
    filterBtn.addEventListener('click', function() {
        filtersSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    });
    
    // Close filters sidebar
    closeBtn.addEventListener('click', function() {
        filtersSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Close filters when clicking on overlay
    overlay.addEventListener('click', function() {
        filtersSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}