/**
 * Products Page JavaScript
 * Handles all interactive functionality specific to the products page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all product page components
    initViewToggle();
    initPriceRangeSlider();
    initFilterFunctionality();
    initSortingFunctionality();
    initPaginationFunctionality();
});

/**
 * Toggle between grid and list view
 */
function initViewToggle() {
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsGrid = document.querySelector('.products-grid');
    
    if (!gridViewBtn || !listViewBtn || !productsGrid) return;
    
    gridViewBtn.addEventListener('click', function() {
        productsGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        
        // Save view preference in localStorage
        localStorage.setItem('productsView', 'grid');
    });
    
    listViewBtn.addEventListener('click', function() {
        productsGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        
        // Save view preference in localStorage
        localStorage.setItem('productsView', 'list');
    });
    
    // Load saved view preference from localStorage
    const savedView = localStorage.getItem('productsView');
    if (savedView === 'list') {
        listViewBtn.click();
    }
}

/**
 * Price Range Slider Functionality
 */
function initPriceRangeSlider() {
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    const minSlider = document.getElementById('price-min');
    const maxSlider = document.getElementById('price-max');
    const sliderTrack = document.querySelector('.slider-track');
    
    if (!minInput || !maxInput || !minSlider || !maxSlider || !sliderTrack) return;
    
    // Set initial values
    const minValue = parseInt(minSlider.value);
    const maxValue = parseInt(maxSlider.value);
    
    // Update slider track
    updateSliderTrack(minValue, maxValue, minSlider, maxSlider, sliderTrack);
    
    // Update min slider
    minSlider.addEventListener('input', function() {
        const minValue = parseInt(minSlider.value);
        const maxValue = parseInt(maxSlider.value);
        
        if (minValue > maxValue) {
            minSlider.value = maxValue;
            minInput.value = maxValue;
        } else {
            minInput.value = minValue;
        }
        
        updateSliderTrack(parseInt(minSlider.value), maxValue, minSlider, maxSlider, sliderTrack);
    });
    
    // Update max slider
    maxSlider.addEventListener('input', function() {
        const minValue = parseInt(minSlider.value);
        const maxValue = parseInt(maxSlider.value);
        
        if (maxValue < minValue) {
            maxSlider.value = minValue;
            maxInput.value = minValue;
        } else {
            maxInput.value = maxValue;
        }
        
        updateSliderTrack(minValue, parseInt(maxSlider.value), minSlider, maxSlider, sliderTrack);
    });
    
    // Update min input
    minInput.addEventListener('input', function() {
        const minValue = parseInt(minInput.value);
        const maxValue = parseInt(maxInput.value);
        
        if (minValue > maxValue) {
            minInput.value = maxValue;
            minSlider.value = maxValue;
        } else if (minValue < parseInt(minSlider.min)) {
            minInput.value = minSlider.min;
            minSlider.value = minSlider.min;
        } else {
            minSlider.value = minValue;
        }
        
        updateSliderTrack(parseInt(minSlider.value), maxValue, minSlider, maxSlider, sliderTrack);
    });
    
    // Update max input
    maxInput.addEventListener('input', function() {
        const minValue = parseInt(minInput.value);
        const maxValue = parseInt(maxInput.value);
        
        if (maxValue < minValue) {
            maxInput.value = minValue;
            maxSlider.value = minValue;
        } else if (maxValue > parseInt(maxSlider.max)) {
            maxInput.value = maxSlider.max;
            maxSlider.value = maxSlider.max;
        } else {
            maxSlider.value = maxValue;
        }
        
        updateSliderTrack(minValue, parseInt(maxSlider.value), minSlider, maxSlider, sliderTrack);
    });
}

/**
 * Update slider track appearance
 */
function updateSliderTrack(minValue, maxValue, minSlider, maxSlider, sliderTrack) {
    const minPercent = ((minValue - parseInt(minSlider.min)) / (parseInt(minSlider.max) - parseInt(minSlider.min))) * 100;
    const maxPercent = ((maxValue - parseInt(maxSlider.min)) / (parseInt(maxSlider.max) - parseInt(maxSlider.min))) * 100;
    
    sliderTrack.style.left = minPercent + '%';
    sliderTrack.style.width = (maxPercent - minPercent) + '%';
}

/**
 * Filter Functionality
 */
function initFilterFunctionality() {
    const filterApplyBtn = document.querySelector('.filter-apply-btn');
    const filterResetBtn = document.querySelector('.filter-reset-btn');
    const filterInputs = document.querySelectorAll('.filters-sidebar input');
    
    if (!filterApplyBtn || !filterResetBtn) return;
    
    // Apply filters
    filterApplyBtn.addEventListener('click', function() {
        // In a real application, this would filter the products based on selected filters
        // For now, we'll just show a notification
        showNotification('Filters applied!', 'success');
        
        // Save filter state to localStorage
        saveFilterState();
    });
    
    // Reset filters
    filterResetBtn.addEventListener('click', function() {
        // Reset all filter inputs
        filterInputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.type === 'range' || input.type === 'number') {
                input.value = input.defaultValue;
            }
        });
        
        // Reset price range slider
        const minSlider = document.getElementById('price-min');
        const maxSlider = document.getElementById('price-max');
        const sliderTrack = document.querySelector('.slider-track');
        
        if (minSlider && maxSlider && sliderTrack) {
            minSlider.value = minSlider.defaultValue;
            maxSlider.value = maxSlider.defaultValue;
            document.getElementById('min-price').value = minSlider.defaultValue;
            document.getElementById('max-price').value = maxSlider.defaultValue;
            
            updateSliderTrack(parseInt(minSlider.value), parseInt(maxSlider.value), minSlider, maxSlider, sliderTrack);
        }
        
        // Show notification
        showNotification('Filters reset!', 'info');
        
        // Clear filter state from localStorage
        localStorage.removeItem('filterState');
    });
    
    // Load saved filter state from localStorage
    loadFilterState();
    
    // Mobile filter toggle
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (filterToggleBtn && filtersSidebar) {
        filterToggleBtn.addEventListener('click', function() {
            filtersSidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            
            // Prevent scrolling when filters are open
            document.body.style.overflow = 'hidden';
        });
        
        // Close filters when clicking outside
        if (overlay) {
            overlay.addEventListener('click', function() {
                filtersSidebar.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
}

/**
 * Save filter state to localStorage
 */
function saveFilterState() {
    const filterState = {
        categories: [],
        colors: [],
        sizes: [],
        ratings: [],
        priceRange: {
            min: document.getElementById('min-price').value,
            max: document.getElementById('max-price').value
        }
    };
    
    // Get selected categories
    document.querySelectorAll('input[name="category"]:checked').forEach(input => {
        filterState.categories.push(input.value);
    });
    
    // Get selected colors
    document.querySelectorAll('input[name="color"]:checked').forEach(input => {
        filterState.colors.push(input.value);
    });
    
    // Get selected sizes
    document.querySelectorAll('input[name="size"]:checked').forEach(input => {
        filterState.sizes.push(input.value);
    });
    
    // Get selected ratings
    document.querySelectorAll('input[name="rating"]:checked').forEach(input => {
        filterState.ratings.push(input.value);
    });
    
    // Save to localStorage
    localStorage.setItem('filterState', JSON.stringify(filterState));
}

/**
 * Load filter state from localStorage
 */
function loadFilterState() {
    const savedState = localStorage.getItem('filterState');
    if (!savedState) return;
    
    const filterState = JSON.parse(savedState);
    
    // Set categories
    filterState.categories.forEach(category => {
        const input = document.querySelector(`input[name="category"][value="${category}"]`);
        if (input) input.checked = true;
    });
    
    // Set colors
    filterState.colors.forEach(color => {
        const input = document.querySelector(`input[name="color"][value="${color}"]`);
        if (input) input.checked = true;
    });
    
    // Set sizes
    filterState.sizes.forEach(size => {
        const input = document.querySelector(`input[name="size"][value="${size}"]`);
        if (input) input.checked = true;
    });
    
    // Set ratings
    filterState.ratings.forEach(rating => {
        const input = document.querySelector(`input[name="rating"][value="${rating}"]`);
        if (input) input.checked = true;
    });
    
    // Set price range
    if (filterState.priceRange) {
        const minInput = document.getElementById('min-price');
        const maxInput = document.getElementById('max-price');
        const minSlider = document.getElementById('price-min');
        const maxSlider = document.getElementById('price-max');
        const sliderTrack = document.querySelector('.slider-track');
        
        if (minInput && maxInput && minSlider && maxSlider && sliderTrack) {
            minInput.value = filterState.priceRange.min;
            maxInput.value = filterState.priceRange.max;
            minSlider.value = filterState.priceRange.min;
            maxSlider.value = filterState.priceRange.max;
            
            updateSliderTrack(parseInt(minSlider.value), parseInt(maxSlider.value), minSlider, maxSlider, sliderTrack);
        }
    }
}

/**
 * Sorting Functionality
 */
function initSortingFunctionality() {
    const sortSelect = document.getElementById('sort-by');
    
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        
        // In a real application, this would sort the products based on the selected option
        // For now, we'll just show a notification
        showNotification(`Products sorted by ${sortValue}!`, 'success');
        
        // Save sort preference to localStorage
        localStorage.setItem('productSort', sortValue);
    });
    
    // Load saved sort preference from localStorage
    const savedSort = localStorage.getItem('productSort');
    if (savedSort) {
        sortSelect.value = savedSort;
    }
}

/**
 * Pagination Functionality
 */
function initPaginationFunctionality() {
    const paginationLinks = document.querySelectorAll('.pagination a:not(.pagination-prev):not(.pagination-next)');
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');
    
    if (!paginationLinks.length) return;
    
    // Page click
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Enable/disable prev/next buttons
            if (prevBtn) {
                if (this.textContent === '1') {
                    prevBtn.classList.add('disabled');
                } else {
                    prevBtn.classList.remove('disabled');
                }
            }
            
            if (nextBtn) {
                if (this.textContent === '8') { // Assuming 8 is the last page
                    nextBtn.classList.add('disabled');
                } else {
                    nextBtn.classList.remove('disabled');
                }
            }
            
            // In a real application, this would load the products for the selected page
            // For now, we'll just show a notification
            showNotification(`Page ${this.textContent} loaded!`, 'success');
            
            // Scroll to top of products section
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled')) return;
            
            // Find current active page
            const activePage = document.querySelector('.pagination a.active');
            if (!activePage) return;
            
            // Find previous page
            const prevPage = activePage.previousElementSibling;
            if (prevPage && !prevPage.classList.contains('pagination-prev')) {
                prevPage.click();
            }
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled')) return;
            
            // Find current active page
            const activePage = document.querySelector('.pagination a.active');
            if (!activePage) return;
            
            // Find next page
            let nextPage = activePage.nextElementSibling;
            
            // Skip pagination dots
            if (nextPage && nextPage.classList.contains('pagination-dots')) {
                nextPage = nextPage.nextElementSibling;
            }
            
            if (nextPage && !nextPage.classList.contains('pagination-next')) {
                nextPage.click();
            }
        });
    }
}