/**
 * Accessibility & Utility Functions for The Auto Refinery
 * 
 * This file contains utility functions to enhance accessibility and interactive
 * elements across the website.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Make important elements focusable for keyboard navigation
    function enhanceAccessibility() {
        // Add focus indicators to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], [tabindex="0"]');
        interactiveElements.forEach(el => {
            // Skip elements that already have focus/blur handlers
            if (!el.getAttribute('data-focus-enhanced')) {
                el.setAttribute('data-focus-enhanced', 'true');
                
                el.addEventListener('focus', () => {
                    el.classList.add('focus-visible');
                });
                
                el.addEventListener('blur', () => {
                    el.classList.remove('focus-visible');
                });
            }
        });
    }
    
    // Add aria roles to enhance screen reader support
    function enhanceAriaSupport() {
        // Service cards
        document.querySelectorAll('.services-grid .testimonial-card').forEach(card => {
            card.setAttribute('role', 'region');
            const heading = card.querySelector('h3');
            if (heading) {
                card.setAttribute('aria-labelledby', heading.id || `service-heading-${Math.random().toString(36).substr(2, 9)}`);
                if (!heading.id) {
                    heading.id = card.getAttribute('aria-labelledby');
                }
            }
        });
        
        // Testimonial carousel and indicators
        const testimonialSlider = document.querySelector('.testimonials-slider');
        if (testimonialSlider) {
            testimonialSlider.setAttribute('role', 'region');
            testimonialSlider.setAttribute('aria-label', 'Customer Testimonials');
            
            document.querySelectorAll('.testimonial-indicators .indicator').forEach((indicator, index) => {
                indicator.setAttribute('role', 'button');
                indicator.setAttribute('aria-label', `View testimonial ${index + 1}`);
            });
        }
    }
    
    // Fix any remaining interactive elements
    function fixInteractiveElements() {
        // Ensure navigation toggle works on mobile
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        const navMenu = document.querySelector('header nav');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
                
                // Update aria attributes
                const isExpanded = mobileToggle.classList.contains('active');
                mobileToggle.setAttribute('aria-expanded', isExpanded);
                navMenu.setAttribute('aria-hidden', !isExpanded);
            });
        }
        
        // Add smooth scroll behavior to all anchor links
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (mobileToggle && mobileToggle.classList.contains('active')) {
                        mobileToggle.click();
                    }
                    
                    // Scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL hash without scrolling
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // Initialize all enhancements
    enhanceAccessibility();
    enhanceAriaSupport();
    fixInteractiveElements();
    
    // Re-initialize on window resize for responsive behavior
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            enhanceAccessibility();
            enhanceAriaSupport();
        }, 250);
    });
});
