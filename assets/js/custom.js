// Custom JS for The Auto Refinery Website
document.addEventListener('DOMContentLoaded', function() {
    // Ensure hero background image is loaded
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const img = new Image();
        img.onload = function() {
            heroSection.style.backgroundImage = `url('${img.src}')`;
            heroSection.classList.add('bg-loaded');
        };
        img.src = 'images/pic01.jpg';
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#navbar nav');
    
    // Initial check for scroll position
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('navbar-transparent');
    }
    
    // Scroll event for navbar styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Activate elements as they come into view
        document.querySelectorAll('.fade-in, .fade-in-up, .slide-up, .zoom-in').forEach(function(el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 70) {
                el.classList.add('in-view');
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking links
    const navLinks = document.querySelectorAll('#navbar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Parallax effect for mouse movement
    const parallaxMove = document.querySelectorAll('.parallax-move');
    if (parallaxMove.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            parallaxMove.forEach(element => {
                const speed = element.getAttribute('data-parallax-speed') || 20;
                const moveX = (0.5 - x) * speed;
                const moveY = (0.5 - y) * speed;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    // FAQ functionality is now handled by faq.js - removed to avoid conflicts
    
    // Testimonial functionality is now handled by testimonials.js - removed to avoid conflicts
    
    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                galleryItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.add('dimmed');
                    }
                });
            });
            
            item.addEventListener('mouseleave', () => {
                galleryItems.forEach(otherItem => {
                    otherItem.classList.remove('dimmed');
                });
            });
        });
    }
    
    // Reveal elements on scroll
    function revealElements() {
        const windowHeight = window.innerHeight;
        const revealElements = document.querySelectorAll('.fade-in:not(.in-view), .fade-in-up:not(.in-view), .slide-up:not(.in-view), .zoom-in:not(.in-view)');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('in-view');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);
    window.dispatchEvent(new Event('scroll'));
});

// Initialize all elements on load
window.addEventListener('load', function() {
    // Background paralax effect
    const parallaxBgs = document.querySelectorAll('.parallax');
    if (parallaxBgs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxBgs.forEach(bg => {
                const speed = bg.getAttribute('data-speed') || 0.3;
                const yPos = -(scrollY * speed);
                bg.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }

    // Check if URL has hash and scroll to it
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});

// Toggle service details function
function toggleDetails(button) {
    const serviceCard = button.closest('.service-content');
    const details = serviceCard.querySelector('.service-details');
    
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'See Less Details';
        button.classList.add('expanded');
    } else {
        details.style.display = 'none';
        button.textContent = 'See More Details';
        button.classList.remove('expanded');
    }
}

// Gallery functionality
$(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.gallery-slide');
    const dots = $('.gallery-dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        
        slides.eq(index).addClass('active');
        dots.eq(index).addClass('active');
        
        currentSlide = index;
    }

    // Next button
    $('.gallery-next').on('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    // Previous button
    $('.gallery-prev').on('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    // Dot navigation
    $('.gallery-dot').on('click', function() {
        const index = $(this).data('slide');
        showSlide(index);
    });

    // Auto-advance gallery (optional)
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);
});
