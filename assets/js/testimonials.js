/**
 * Enhanced Testimonials Carousel functionality for The Auto Refinery
 * This file provides a robust testimonial carousel that cycles exactly between 3 testimonials
 * with proper visibility, transitions, and accessibility features
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Testimonials script loaded');
    
    // Select all testimonial elements
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    
    console.log('Found elements:', {
        slider: !!testimonialSlider,
        testimonials: testimonials.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        indicators: indicators.length
    });
    
    if (testimonialSlider && testimonials.length > 0) {
        // Only consider the first 3 testimonials
        const totalTestimonials = Math.min(testimonials.length, 3);
        let currentIndex = 0;
        let autoplayTimer;
        
        console.log('Initializing with', totalTestimonials, 'testimonials');
        
        // Force proper initial setup
        testimonials.forEach((testimonial, index) => {
            if (index >= totalTestimonials) {
                testimonial.style.display = 'none';
            } else {
                // Ensure testimonial is properly styled
                testimonial.style.display = 'block';
                testimonial.style.position = 'absolute';
                testimonial.style.top = '0';
                testimonial.style.left = '0';
                testimonial.style.width = '100%';
                testimonial.style.zIndex = index === 0 ? '2' : '1';
                testimonial.style.opacity = index === 0 ? '1' : '0';
                testimonial.style.visibility = index === 0 ? 'visible' : 'hidden';
                testimonial.style.transform = index === 0 ? 'translateX(0)' : 'translateX(50px)';
                
                if (index === 0) {
                    testimonial.classList.add('active');
                } else {
                    testimonial.classList.remove('active');
                }
            }
        });
        
        // Function to show testimonial at specific index
        function showTestimonial(index) {
            // Handle index boundaries - only cycle between 0, 1, and 2
            if (index < 0) index = totalTestimonials - 1;
            if (index >= totalTestimonials) index = 0;
            
            console.log('Showing testimonial', index);
            
            // Store the current index
            currentIndex = index;
            
            // Update testimonial visibility with smooth transitions
            testimonials.forEach((testimonial, i) => {
                if (i < totalTestimonials) {
                    // Remove active class and hide
                    testimonial.classList.remove('active');
                    testimonial.style.zIndex = '1';
                    testimonial.style.opacity = '0';
                    testimonial.style.visibility = 'hidden';
                    testimonial.style.transform = 'translateX(50px)';
                    
                    // Activate the current testimonial
                    if (i === currentIndex) {
                        testimonial.classList.add('active');
                        testimonial.style.zIndex = '2';
                        
                        // Use a small delay to allow CSS transitions to work
                        setTimeout(() => {
                            testimonial.style.opacity = '1';
                            testimonial.style.visibility = 'visible';
                            testimonial.style.transform = 'translateX(0)';
                        }, 50);
                    }
                }
            });
            
            // Update indicator dots
            indicators.forEach((indicator, i) => {
                indicator.classList.remove('active');
                if (i === currentIndex && i < totalTestimonials) {
                    indicator.classList.add('active');
                }
            });
        }
        
        // Set up navigation button events
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                showTestimonial(currentIndex - 1);
                resetAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                showTestimonial(currentIndex + 1);
                resetAutoplay();
            });
        }
        
        // Set up indicator dots
        if (indicators.length > 0) {
            indicators.forEach((indicator, i) => {
                if (i < totalTestimonials) {
                    indicator.addEventListener('click', () => {
                        console.log('Indicator', i, 'clicked');
                        showTestimonial(i);
                        resetAutoplay();
                    });
                }
            });
        }
        
        // Set up autoplay functionality
        function startAutoplay() {
            autoplayTimer = setInterval(() => {
                console.log('Autoplay: moving to next testimonial');
                showTestimonial(currentIndex + 1);
            }, 7000);
        }
        
        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }
        
        // Start autoplay
        startAutoplay();
        
        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            console.log('Mouse entered - pausing autoplay');
            clearInterval(autoplayTimer);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            console.log('Mouse left - resuming autoplay');
            startAutoplay();
        });
        
        // Add swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;
        
        testimonialSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(autoplayTimer);
        }, { passive: true });
        
        testimonialSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });
        
        function handleSwipe() {
            const distance = touchEndX - touchStartX;
            
            if (distance > swipeThreshold) {
                // Swipe right - show previous
                showTestimonial(currentIndex - 1);
            } else if (distance < -swipeThreshold) {
                // Swipe left - show next
                showTestimonial(currentIndex + 1);
            }
        }
        
        // Initialize the first testimonial after a short delay
        setTimeout(() => {
            showTestimonial(0);
        }, 100);
        
        console.log('Testimonials carousel initialized successfully');
    } else {
        console.warn('Testimonials carousel could not be initialized - missing elements');
    }
});
