/* The Auto Refinery - Luxury Interactions */

(function($) {
    'use strict';

    // DOM Ready
    $(document).ready(function() {
        initializeLuxuryFeatures();
        setupScrollEffects();
        setupFormValidation();
        setupMobileMenu();
        setupCallTracking();
        setupGalleryLightbox();
        setupSmoothScrolling();
        setupScrollReveal();
        setupFAQFunctionality();
        setupConversionTracking();
        setupUrgencyElements();
        setupMobileOptimizations();
        setupMobileCarousels();
    });

    // Initialize luxury features
    function initializeLuxuryFeatures() {
        // Add loading animation
        $('body').addClass('loaded');
        
        // Setup parallax effects
        $(window).scroll(function() {
            var scrolled = $(this).scrollTop();
            var parallax = $('.hero-image');
            var speed = 0.5;
            parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
        });

        // Add hover effects to service cards
        $('.service-card').hover(
            function() {
                $(this).find('.service-icon i').addClass('fa-spin');
            },
            function() {
                $(this).find('.service-icon i').removeClass('fa-spin');
            }
        );

        // Navbar transparency on scroll
        $(window).scroll(function() {
            if ($(window).scrollTop() > 50) {
                $('.luxury-nav').addClass('scrolled');
            } else {
                $('.luxury-nav').removeClass('scrolled');
            }
        });
    }

    // Setup scroll effects
    function setupScrollEffects() {
        // Counter animation for testimonials
        function animateCounters() {
            $('.testimonial').each(function() {
                var $this = $(this);
                if (isInViewport($this) && !$this.hasClass('animated')) {
                    $this.addClass('animated');
                    $this.find('.stars i').each(function(index) {
                        $(this).delay(index * 100).fadeIn();
                    });
                }
            });
        }

        // Service card entrance animation
        function animateServiceCards() {
            $('.service-card').each(function(index) {
                var $this = $(this);
                if (isInViewport($this) && !$this.hasClass('animated')) {
                    $this.addClass('animated');
                    setTimeout(function() {
                        $this.addClass('slide-in');
                    }, index * 200);
                }
            });
        }

        // Process steps animation
        function animateProcessSteps() {
            $('.step').each(function(index) {
                var $this = $(this);
                if (isInViewport($this) && !$this.hasClass('animated')) {
                    $this.addClass('animated');
                    setTimeout(function() {
                        $this.addClass('fade-in-up');
                    }, index * 300);
                }
            });
        }

        $(window).scroll(function() {
            animateCounters();
            animateServiceCards();
            animateProcessSteps();
        });

        // Trigger initial animations
        animateCounters();
        animateServiceCards();
        animateProcessSteps();
    }

    // Form validation
    function setupFormValidation() {
        $('.conversion-form, .contact-form form').submit(function(e) {
            e.preventDefault();
            
            var isValid = true;
            var $form = $(this);
            
            // Clear previous errors
            $form.find('.error').removeClass('error');
            
            // Validate required fields
            $form.find('[required]').each(function() {
                if (!$(this).val().trim()) {
                    $(this).addClass('error');
                    isValid = false;
                }
            });
            
            // Validate email
            var email = $form.find('input[type="email"]').val();
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailPattern.test(email)) {
                $form.find('input[type="email"]').addClass('error');
                isValid = false;
            }
            
            // Validate phone
            var phone = $form.find('input[type="tel"]').val();
            var phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            if (phone && !phonePattern.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                $form.find('input[type="tel"]').addClass('error');
                isValid = false;
            }
            
            if (isValid) {
                // Track successful form submission
                trackConversion();
                
                // Show success message
                if ($form.hasClass('conversion-form')) {
                    showNotification('Thank you for your inquiry. We will contact you within 24 hours to discuss your service needs.', 'success');
                    
                    // Optional: Redirect to more information page
                    setTimeout(function() {
                        // Could redirect to a "What to expect" page instead of booking
                        // window.location.href = '/consultation-info.html';
                    }, 3000);
                } else {
                    showNotification('Thank you for contacting us. We will respond within 24 hours.', 'success');
                }
                
                // Reset form
                $form[0].reset();
            } else {
                var errorMessage = $form.hasClass('conversion-form') ? 
                    'Please complete all required fields to submit your consultation request.' :
                    'Please fill in all required fields correctly.';
                showNotification(errorMessage, 'error');
            }
        });
        
        // Real-time validation
        $('.contact-form input, .contact-form select, .contact-form textarea, .conversion-form input, .conversion-form select').on('blur', function() {
            validateField($(this));
        });
        
        // Track form engagement
        var formStarted = false;
        $('.conversion-form input, .conversion-form select').on('focus', function() {
            if (!formStarted) {
                formStarted = true;
                trackEvent('form_start', 'conversion', 'quote_form');
                
                // Set abandonment timer
                setTimeout(function() {
                    if (!$('.conversion-form').hasClass('submitted')) {
                        trackEvent('form_abandonment', 'conversion', 'quote_form');
                    }
                }, 30000);
            }
        });
    }

    // Mobile menu
    function setupMobileMenu() {
        $('.mobile-menu-toggle').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.luxury-menu').toggleClass('active');
            $('body').toggleClass('menu-open');
        });
        
        // Close menu on link click
        $('.luxury-menu a').click(function() {
            $('.mobile-menu-toggle').removeClass('active');
            $('.luxury-menu').removeClass('active');
            $('body').removeClass('menu-open');
        });
        
        // Close menu on outside click
        $(document).click(function(e) {
            if (!$(e.target).closest('.luxury-nav').length) {
                $('.mobile-menu-toggle').removeClass('active');
                $('.luxury-menu').removeClass('active');
                $('body').removeClass('menu-open');
            }
        });
        
        // Close menu on escape key
        $(document).keydown(function(e) {
            if (e.keyCode === 27) { // Escape key
                $('.mobile-menu-toggle').removeClass('active');
                $('.luxury-menu').removeClass('active');
                $('body').removeClass('menu-open');
            }
        });
        
        // Improve touch scrolling on mobile
        if (window.innerWidth <= 768) {
            $('body').css('-webkit-overflow-scrolling', 'touch');
        }
    }

    // Call tracking
    function setupCallTracking() {
        $('a[href^="tel:"]').click(function() {
            // Track phone call clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'header_phone'
                });
            }
            
            // Show call confirmation on mobile
            if (window.innerWidth <= 768) {
                return true; // Allow the call to proceed
            } else {
                // On desktop, show a modal or notification
                showNotification('Call us at (209) 214-9029 for immediate assistance!', 'info');
                return false;
            }
        });
    }

    // Gallery lightbox
    function setupGalleryLightbox() {
        $('.gallery-item').click(function() {
            var imgSrc = $(this).find('img').attr('src');
            var title = $(this).find('h4').text();
            var description = $(this).find('p').text();
            
            openLightbox(imgSrc, title, description);
        });
    }

    // Smooth scrolling
    function setupSmoothScrolling() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                    return false;
                }
            }
        });
    }

    // Scroll reveal animations
    function setupScrollReveal() {
        // Add CSS for animations
        if (!$('#scroll-reveal-css').length) {
            $('<style id="scroll-reveal-css">')
                .text(`
                    .slide-in {
                        animation: slideInUp 0.6s ease forwards;
                    }
                    
                    .fade-in-up {
                        animation: fadeInUp 0.8s ease forwards;
                    }
                    
                    @keyframes slideInUp {
                        from {
                            transform: translateY(30px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            transform: translateY(20px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    
                    .contact-form.error input.error,
                    .contact-form.error select.error,
                    .contact-form.error textarea.error {
                        border-color: #ff4444;
                        box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
                    }
                `)
                .appendTo('head');
        }
    }

    // Utility functions
    function isInViewport(element) {
        var elementTop = element.offset().top;
        var elementBottom = elementTop + element.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function validateField($field) {
        var value = $field.val().trim();
        var isValid = true;
        
        if ($field.attr('required') && !value) {
            isValid = false;
        }
        
        if ($field.attr('type') === 'email' && value) {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                isValid = false;
            }
        }
        
        if ($field.attr('type') === 'tel' && value) {
            var phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phonePattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
            }
        }
        
        if (isValid) {
            $field.removeClass('error');
        } else {
            $field.addClass('error');
        }
        
        return isValid;
    }

    function showNotification(message, type) {
        // Remove existing notifications
        $('.notification').remove();
        
        var $notification = $('<div class="notification notification-' + type + '">')
            .text(message)
            .css({
                'position': 'fixed',
                'top': '20px',
                'right': '20px',
                'background': type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
                'color': 'white',
                'padding': '15px 25px',
                'border-radius': '5px',
                'box-shadow': '0 4px 15px rgba(0,0,0,0.2)',
                'z-index': '9999',
                'max-width': '300px',
                'font-weight': '500'
            })
            .appendTo('body');
        
        setTimeout(function() {
            $notification.fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
    }

    function openLightbox(imgSrc, title, description) {
        var $lightbox = $('<div class="lightbox-overlay">')
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background': 'rgba(0,0,0,0.9)',
                'z-index': '9999',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'cursor': 'pointer'
            })
            .appendTo('body');
        
        var $content = $('<div class="lightbox-content">')
            .css({
                'max-width': '90%',
                'max-height': '90%',
                'text-align': 'center'
            })
            .appendTo($lightbox);
        
        var $img = $('<img>')
            .attr('src', imgSrc)
            .css({
                'max-width': '100%',
                'max-height': '80vh',
                'border-radius': '10px'
            })
            .appendTo($content);
        
        var $info = $('<div>')
            .css({
                'color': 'white',
                'margin-top': '20px'
            })
            .appendTo($content);
        
        $('<h3>').text(title).appendTo($info);
        $('<p>').text(description).appendTo($info);
        
        $lightbox.click(function() {
            $(this).fadeOut(function() {
                $(this).remove();
            });
        });
        
        $content.click(function(e) {
            e.stopPropagation();
        });
    }

    function trackFormSubmission() {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'contact',
                'event_label': 'quote_request'
            });
        }
        
        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
        }
    }

    // Preloader
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // FAQ Functionality
    function setupFAQFunctionality() {
        // Click to toggle using CSS classes only (avoids conflicts with max-height transitions)
        $('.faq-question').attr('role', 'button').attr('tabindex', '0');
        $('.faq-answer').attr('aria-hidden', 'true');

        function toggleFaq($trigger) {
            var $faqItem = $trigger.closest('.faq-item');
            var isActive = $faqItem.hasClass('active');

            // Close all
            $('.faq-item').removeClass('active');
            $('.faq-answer').attr('aria-hidden', 'true');
            $('.faq-question').attr('aria-expanded', 'false');

            // Open current if it was not active
            if (!isActive) {
                $faqItem.addClass('active');
                $faqItem.find('.faq-answer').attr('aria-hidden', 'false');
                $faqItem.find('.faq-question').attr('aria-expanded', 'true');
            }

            // Track FAQ interaction
            if (typeof gtag !== 'undefined') {
                gtag('event', 'faq_interaction', {
                    'event_category': 'engagement',
                    'event_label': $trigger.find('h3').text()
                });
            }
        }

        // Delegated events to ensure reliability
        $(document).on('click', '.faq-question', function() {
            toggleFaq($(this));
        });

        // Keyboard accessibility: Enter/Space
        $(document).on('keydown', '.faq-question', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq($(this));
            }
        });
    }

    // Conversion Tracking
    function setupConversionTracking() {
        // Track service card clicks
        $('.service-card .btn-service').click(function() {
            var serviceName = $(this).closest('.service-card').find('h3').text();
            trackEvent('service_interest', 'services', serviceName);
        });
        
        // Track phone number clicks
        $('a[href^="tel:"]').click(function() {
            trackEvent('phone_call', 'contact', 'header_phone');
        });
        
        // Track booking button clicks
        $('.btn-premium, .btn-primary-large').click(function() {
            var buttonText = $(this).text().trim();
            trackEvent('booking_attempt', 'conversion', buttonText);
        });
        
        // Track scroll depth
        var scrollDepths = [25, 50, 75, 90];
        var scrollDepthTriggered = [];
        
        $(window).scroll(function() {
            var scrollPercent = Math.round(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            
            scrollDepths.forEach(function(depth) {
                if (scrollPercent >= depth && scrollDepthTriggered.indexOf(depth) === -1) {
                    scrollDepthTriggered.push(depth);
                    trackEvent('scroll_depth', 'engagement', depth + '%');
                }
            });
        });
    }

    // Urgency Elements
    function setupUrgencyElements() {
        // Removed annoying social proof notifications
    }

    // Enhanced tracking function
    function trackEvent(action, category, label) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                action: action,
                category: category,
                label: label
            });
        }
    }

    function trackConversion() {
        // Mark form as submitted
        $('.conversion-form').addClass('submitted');
        
        // Google Analytics conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'GA_MEASUREMENT_ID/CONVERSION_ID',
                'event_category': 'lead_generation',
                'event_label': 'quote_request'
            });
        }
        
        // Facebook Pixel conversion
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Quote Request',
                content_category: 'Mobile Detailing'
            });
        }
    }

    // Add premium loading spinner if doesn't exist
    if (!$('.preloader').length) {
        $('<div class="preloader">')
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background': '#000',
                'z-index': '99999',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            })
            .html('<div style="border: 4px solid #333; border-top: 4px solid #1e90ff; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>')
            .prependTo('body');
        
        // Add spinner animation
        $('<style>')
            .text('@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }')
            .appendTo('head');
    }

    // Mobile-specific optimizations
    function setupMobileOptimizations() {
        // Handle orientation changes
        $(window).on('orientationchange', function() {
            // Close mobile menu on orientation change
            $('.mobile-menu-toggle').removeClass('active');
            $('.luxury-menu').removeClass('active');
            $('body').removeClass('menu-open');
            
            // Recalculate viewport height
            setTimeout(function() {
                var vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
            }, 100);
        });
        
        // Set initial viewport height for mobile browsers
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
        
        // Improve touch scrolling
        if ('ontouchstart' in window) {
            $('body').addClass('touch-device');
        }
        
        // Handle mobile form focus (prevents zoom on input focus)
        if (window.innerWidth <= 768) {
            $('input, textarea, select').on('focus', function() {
                $('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }).on('blur', function() {
                $('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1.0');
            });
        }
        
        // Optimize images for mobile
        if (window.innerWidth <= 768) {
            $('img').each(function() {
                $(this).attr('loading', 'lazy');
            });
        }
        
        // Add swipe functionality for mobile gallery
        var startX, startY, distX, distY;
        $('.gallery-item').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].pageX;
            startY = e.originalEvent.touches[0].pageY;
        }).on('touchmove', function(e) {
            e.preventDefault();
        }).on('touchend', function(e) {
            distX = e.originalEvent.changedTouches[0].pageX - startX;
            distY = e.originalEvent.changedTouches[0].pageY - startY;
            
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) {
                if (distX > 0) {
                    // Swipe right - previous image
                    $('.prev-btn').click();
                } else {
                    // Swipe left - next image
                    $('.next-btn').click();
                }
            }
        });
    }

    // Simple Working Mobile Carousel System
    function setupMobileCarousels() {
        // If isolated v2 carousels exist, skip v1 initialization entirely
        if ($('.reviews-carousel-v2').length || $('.process-carousel-v2').length) {
            return;
        }
        // Always initialize so widths are applied; CSS controls visibility per breakpoint
        initCarousel('process');
        initCarousel('reviews');

        // Debounced resize re-init to keep measurements accurate
        let reinitTimeout;
        $(window).on('resize.carousel-reinit', function() {
            clearTimeout(reinitTimeout);
            reinitTimeout = setTimeout(function() {
                initCarousel('process');
                initCarousel('reviews');
            }, 100);
        });
    }

    function initCarousel(type) {
        const $carousel = $(`.${type}-carousel`);
        if ($carousel.length === 0) return;
        
        // Remove previous initialization
        $carousel.removeClass('init');
        
        const $track = $carousel.find('.carousel-track');
        const $slides = $carousel.find('.carousel-slide');
        const $dots = $carousel.find('.dot');
        const $prevBtn = $carousel.find('.carousel-btn.prev');
        const $nextBtn = $carousel.find('.carousel-btn.next');
        const totalSlides = $slides.length;
        let currentSlide = 0;
        let slideWidthPx = 0;
        
        console.log(`Initializing ${type} carousel:`, {
            carousel: $carousel.length,
            track: $track.length,
            slides: $slides.length,
            dots: $dots.length,
            prevBtn: $prevBtn.length,
            nextBtn: $nextBtn.length
        });
        
        // Measure and set widths to eliminate gaps and ensure exact slide snapping
        function measure() {
            // Use the carousel width (viewport) as the slide width
            slideWidthPx = Math.round($carousel.width());
            // Set each slide to viewport width
            $slides.css({ width: `${slideWidthPx}px` });
            // Set track width to sum of slides
            $track.css({ width: `${slideWidthPx * totalSlides}px` });
        }

        // Move to a specific slide using pixel-based translation
        function goToSlide(index) {
            currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
            const translateX = -(currentSlide * slideWidthPx);
            $track.css('transform', `translate3d(${translateX}px, 0, 0)`);

            $dots.removeClass('active');
            $dots.eq(currentSlide).addClass('active');

            console.log(`${type} carousel moved to slide ${currentSlide}, translateX: ${translateX}px`);
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % totalSlides;
            goToSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(prev);
        }
        
        // Button clicks
        $nextBtn.off('click').on('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
        
        $prevBtn.off('click').on('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
        
        // Dot clicks
        $dots.off('click').on('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt($(this).data('slide'));
            goToSlide(slideIndex);
        });
        
        // Touch support
        let startX = 0;
        let endX = 0;
        
        $track.off('touchstart').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].clientX;
        });
        
        $track.off('touchend').on('touchend', function(e) {
            endX = e.originalEvent.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // Initialize
        measure();
        goToSlide(0);
        $carousel.addClass('init');

        // Recalculate on orientation/resize for this carousel only
        let resizeTimeout;
        $(window).off(`resize.${type}-carousel`).on(`resize.${type}-carousel`, function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (window.innerWidth <= 768) {
                    measure();
                    goToSlide(currentSlide);
                }
            }, 100);
        });
        
        console.log(`${type} carousel initialized with ${totalSlides} slides`);
    }

})(jQuery);