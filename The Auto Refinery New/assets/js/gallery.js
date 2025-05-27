/**
 * Gallery Carousel Functionality for The Auto Refinery
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gallery carousel - enforcing the 5 image limit
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    // Make sure only 5 images are shown in the gallery
    gallerySlides.forEach((slide, index) => {
        if (index >= 5) {
            slide.style.display = 'none'; // Hide any slides beyond the first 5
        }
    });
    
    if (gallerySlides.length > 0) {
        let currentIndex = 0;
        const totalSlides = 5; // Limit to 5 slides
        
        // Function to show slide at specific index
        function showSlide(index) {
            // Handle index boundaries - only cycle through the 5 slides
            if (index < 0) index = 4;
            if (index >= totalSlides) index = 0;
            
            currentIndex = index;
            
            // Hide all slides
            gallerySlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i < totalSlides) { // Only consider the first 5 slides
                    if (i === currentIndex) {
                        slide.classList.add('active');
                    }
                }
            });
            
            // Update dots
            galleryDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }
        
        // Set up previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(currentIndex - 1);
            });
        }
        
        // Set up next button
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(currentIndex + 1);
            });
        }
        
        // Set up dot navigation
        galleryDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-slide'));
                if (!isNaN(slideIndex) && slideIndex < totalSlides) {
                    showSlide(slideIndex);
                }
            });
        });
        
        // Auto-rotate gallery slides
        let autoplayTimer;
        
        function startAutoplay() {
            autoplayTimer = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 7000); // Change slide every 7 seconds
        }
        
        startAutoplay();
        
        // Pause rotation on hover
        const galleryCarousel = document.querySelector('.gallery-carousel');
        if (galleryCarousel) {
            galleryCarousel.addEventListener('mouseenter', () => {
                clearInterval(autoplayTimer);
            });
            
            galleryCarousel.addEventListener('mouseleave', () => {
                startAutoplay();
            });
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            const gallerySection = document.getElementById('gallery');
            const rect = gallerySection.getBoundingClientRect();
            
            // Only respond to keyboard if gallery is in view
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') {
                    showSlide(currentIndex - 1);
                    clearInterval(autoplayTimer);
                    startAutoplay();
                } else if (e.key === 'ArrowRight') {
                    showSlide(currentIndex + 1);
                    clearInterval(autoplayTimer);
                    startAutoplay();
                }
            }
        });
        
        // Initialize first slide
        showSlide(0);
    }
});
