/**
 * Mobile Navigation Enhancement for The Auto Refinery
 * Handles mobile menu toggle, touch interactions, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile navigation script loaded');
    
    // Create mobile menu button if it doesn't exist
    createMobileMenuButton();
    
    // Create mobile menu overlay
    createMobileMenuOverlay();
    
    // Initialize mobile menu functionality
    initializeMobileMenu();
    
    // Handle window resize
    handleResponsiveChanges();
    
    // Optimize touch interactions
    optimizeTouchInteractions();
    
    // Handle scroll behavior on mobile
    handleMobileScroll();
});

function createMobileMenuButton() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const container = navbar.querySelector('.container');
    if (!container) return;
    
    // Check if mobile menu button already exists
    if (container.querySelector('.mobile-menu-btn')) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuBtn.style.display = 'none'; // Hidden by default, shown in CSS
    
    // Insert the button at the end of the container
    container.appendChild(mobileMenuBtn);
}

function createMobileMenuOverlay() {
    // Check if overlay already exists
    if (document.querySelector('.mobile-menu-overlay')) return;
    
    // Get the navigation menu content
    const navMenu = document.querySelector('.nav-menu, nav');
    if (!navMenu) return;
    
    const navList = navMenu.querySelector('.nav-list, ul');
    if (!navList) return;
    
    // Create mobile menu overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    
    // Clone the navigation
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    
    // Clone the nav list
    const mobileNavList = navList.cloneNode(true);
    mobileNavList.className = 'nav-list mobile-nav-list';
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Close mobile menu');
    
    // Assemble the mobile menu
    mobileNav.appendChild(closeBtn);
    mobileNav.appendChild(mobileNavList);
    mobileOverlay.appendChild(mobileNav);
    
    // Add to body
    document.body.appendChild(mobileOverlay);
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-overlay a');
    
    if (!mobileMenuBtn || !mobileOverlay) return;
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstLink = mobileOverlay.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 300);
        }
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuBtn.focus();
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking any nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function handleResponsiveChanges() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const mobileOverlay = document.querySelector('.mobile-menu-overlay');
            
            // Close mobile menu if window is resized to desktop
            if (window.innerWidth > 768 && mobileOverlay && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update viewport height for mobile browsers
            updateViewportHeight();
        }, 250);
    });
    
    // Initial viewport height update
    updateViewportHeight();
}

function updateViewportHeight() {
    // Fix for mobile browsers with changing viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function optimizeTouchInteractions() {
    // Improve touch scrolling on mobile
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Optimize button interactions for touch
    const buttons = document.querySelectorAll('button, .button, a');
    
    buttons.forEach(button => {
        // Add touch feedback
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '';
        }, { passive: true });
        
        button.addEventListener('touchcancel', function() {
            this.style.opacity = '';
        }, { passive: true });
    });
    
    // Prevent zoom on input focus (iOS Safari)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no');
                }
            }
        });
    });
}

function handleMobileScroll() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    // Hide/show navbar on scroll (mobile only)
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }
    }, { passive: true });
}

// Smooth scroll for anchor links on mobile
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - (window.innerWidth <= 768 ? 80 : 100);
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', initializeSmoothScroll);

// Performance monitoring
function monitorMobilePerformance() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Mobile page load time:', entry.loadEventEnd - entry.loadEventStart);
                }
            }
        });
        
        observer.observe({ entryTypes: ['navigation'] });
    }
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
    monitorMobilePerformance();
}

// Export functions for potential external use
window.MobileNavigation = {
    closeMobileMenu: function() {
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    updateViewportHeight: updateViewportHeight,
    
    optimizeForMobile: function() {
        optimizeTouchInteractions();
        handleMobileScroll();
        initializeSmoothScroll();
    }
};
