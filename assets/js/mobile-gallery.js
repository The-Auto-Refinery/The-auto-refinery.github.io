/**
 * Mobile Gallery Slideshow for The Auto Refinery
 * Converts the Instagram gallery to a testimonials-style slideshow on mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Gallery script loaded');
    
    // Only initialize on mobile devices
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Initialize mobile gallery slideshow
    function initMobileGallery() {
        if (!isMobileDevice()) {
            console.log('Not a mobile device - skipping mobile gallery initialization');
            return; // Exit if not mobile
        }
        
        console.log('Initializing mobile gallery slideshow');
        
        // Show mobile slideshow elements
        const mobileSlideshow = document.querySelector('.mobile-gallery-slideshow');
        const mobileIndicators = document.getElementById('mobile-gallery-indicators');
        
        if (mobileSlideshow) {
            mobileSlideshow.style.display = 'block';
            console.log('Mobile slideshow displayed');
        } else {
            console.warn('Mobile slideshow element not found');
        }
        
        if (mobileIndicators) {
            mobileIndicators.style.display = 'flex';
            console.log('Mobile indicators displayed');
        } else {
            console.warn('Mobile indicators element not found');
        }
        
        // Gallery slideshow variables
        const slider = document.getElementById('mobile-gallery-slider');
        const slides = document.querySelectorAll('.mobile-gallery-slide');
        const prevBtn = document.getElementById('mobile-gallery-prev');
        const nextBtn = document.getElementById('mobile-gallery-next');
        const indicators = document.querySelectorAll('.mobile-gallery-indicator');
        
        if (!slider || slides.length === 0) {
            console.warn('Mobile gallery elements not found');
            return;
        }
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoplayTimer;
        
        // Function to show specific slide
        function showSlide(index) {
            // Handle index boundaries
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            
            // Move slider
            const translateX = -currentSlide * 100;
            slider.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.remove('active');
                if (i === currentSlide) {
                    indicator.classList.add('active');
                }
            });
            
            console.log(`Showing mobile gallery slide ${currentSlide + 1}/${totalSlides}`);
        }
        
        // Next slide function
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Previous slide function
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Auto-advance functionality
        function startAutoplay() {
            autoplayTimer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after manual interaction
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after manual interaction
            });
        }
        
        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopAutoplay();
                startAutoplay(); // Restart autoplay after manual interaction
            });
        });
        
        // Touch/swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoplay(); // Pause autoplay during touch
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoplay(); // Resume autoplay after swipe
        }, { passive: true });
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swiped right - show previous slide
                    prevSlide();
                } else {
                    // Swiped left - show next slide
                    nextSlide();
                }
            }
        }
        
        // Pause autoplay when slideshow is hovered/focused
        if (mobileSlideshow) {
            mobileSlideshow.addEventListener('mouseenter', stopAutoplay);
            mobileSlideshow.addEventListener('mouseleave', startAutoplay);
        }
        
        // Initialize first slide and start autoplay
        showSlide(0);
        startAutoplay();
        
        console.log('Mobile gallery slideshow initialized successfully');
    }
    
    // Hide mobile gallery on desktop
    function hideMobileGallery() {
        if (isMobileDevice()) {
            return; // Exit if mobile
        }
        
        const mobileSlideshow = document.querySelector('.mobile-gallery-slideshow');
        const mobileIndicators = document.getElementById('mobile-gallery-indicators');
        
        if (mobileSlideshow) {
            mobileSlideshow.style.display = 'none';
        }
        
        if (mobileIndicators) {
            mobileIndicators.style.display = 'none';
        }
    }
    
    // Initialize based on screen size
    function initializeGallery() {
        if (isMobileDevice()) {
            initMobileGallery();
        } else {
            hideMobileGallery();
        }
    }
    
    // Initialize on load
    initializeGallery();
    
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initializeGallery();
        }, 250);
    });
});
