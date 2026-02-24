/**
 * Gallery Tabs Functionality
 * Handles the tabbed filtering for the gallery section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all gallery tab buttons and gallery items
    const tabButtons = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event listeners to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to filter
            const category = this.getAttribute('data-category');
            
            // Filter gallery items based on category
            galleryItems.forEach(item => {
                if (category === 'all') {
                    // Show all items
                    item.style.display = 'block';
                } else {
                    // Check if item has the selected category
                    const itemCategories = item.getAttribute('data-category');
                    
                    if (itemCategories && itemCategories.includes(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // Add animation for smoother transitions
            galleryItems.forEach(item => {
                if (item.style.display === 'block') {
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 500);
                }
            });
        });
    });
    
    // Add hover effects for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            }
        });
    });
});