/**
 * Mobile Layout Verification for The Auto Refinery
 * This script helps verify that mobile-specific changes are working correctly
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Layout Verification script loaded');
    
    // Function to check if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Function to verify location cards visibility
    function verifyLocationCards() {
        if (!isMobileDevice()) {
            console.log('Desktop view - all location cards should be visible');
            return;
        }
        
        console.log('Mobile view - checking location cards visibility');
        
        const areaCards = document.querySelectorAll('.service-areas-grid .area-card');
        console.log(`Total location cards found: ${areaCards.length}`);
        
        // Check which cards are visible
        areaCards.forEach((card, index) => {
            const computedStyle = window.getComputedStyle(card);
            const isVisible = computedStyle.display !== 'none';
            
            console.log(`Card ${index + 1}: ${isVisible ? 'Visible' : 'Hidden'}`);
            
            if (index < 3 && !isVisible) {
                console.warn(`Expected card ${index + 1} to be visible on mobile`);
            }
            
            if (index >= 3 && isVisible) {
                console.warn(`Expected card ${index + 1} to be hidden on mobile`);
            }
        });
    }
    
    // Function to verify mobile gallery
    function verifyMobileGallery() {
        if (!isMobileDevice()) {
            console.log('Desktop view - mobile gallery should be hidden');
            
            const mobileSlideshow = document.querySelector('.mobile-gallery-slideshow');
            const mobileIndicators = document.getElementById('mobile-gallery-indicators');
            const instagramGrid = document.getElementById('instagram-grid');
            
            if (mobileSlideshow && window.getComputedStyle(mobileSlideshow).display !== 'none') {
                console.warn('Mobile slideshow should be hidden on desktop');
            }
            
            if (mobileIndicators && window.getComputedStyle(mobileIndicators).display !== 'none') {
                console.warn('Mobile indicators should be hidden on desktop');
            }
            
            if (instagramGrid && window.getComputedStyle(instagramGrid).display === 'none') {
                console.warn('Instagram grid should be visible on desktop');
            }
            
            return;
        }
        
        console.log('Mobile view - checking gallery setup');
        
        const mobileSlideshow = document.querySelector('.mobile-gallery-slideshow');
        const mobileIndicators = document.getElementById('mobile-gallery-indicators');
        const instagramGrid = document.getElementById('instagram-grid');
        const slides = document.querySelectorAll('.mobile-gallery-slide');
        
        if (mobileSlideshow) {
            const isVisible = window.getComputedStyle(mobileSlideshow).display !== 'none';
            console.log(`Mobile slideshow: ${isVisible ? 'Visible' : 'Hidden'}`);
        } else {
            console.warn('Mobile slideshow element not found');
        }
        
        if (mobileIndicators) {
            const isVisible = window.getComputedStyle(mobileIndicators).display !== 'none';
            console.log(`Mobile indicators: ${isVisible ? 'Visible' : 'Hidden'}`);
        } else {
            console.warn('Mobile indicators element not found');
        }
        
        if (instagramGrid) {
            const isVisible = window.getComputedStyle(instagramGrid).display !== 'none';
            console.log(`Instagram grid: ${isVisible ? 'Visible' : 'Hidden'}`);
        }
        
        console.log(`Mobile gallery slides found: ${slides.length}`);
    }
    
    // Function to run all verifications
    function runVerifications() {
        console.log('--- Mobile Layout Verification ---');
        console.log(`Screen width: ${window.innerWidth}px`);
        console.log(`Device type: ${isMobileDevice() ? 'Mobile' : 'Desktop'}`);
        
        setTimeout(() => {
            verifyLocationCards();
            verifyMobileGallery();
            console.log('--- Verification Complete ---');
        }, 1000); // Wait for CSS to load
    }
    
    // Run initial verification
    runVerifications();
    
    // Re-verify on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(runVerifications, 500);
    });
});
