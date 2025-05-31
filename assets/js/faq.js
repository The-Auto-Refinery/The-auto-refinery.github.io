document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordions with enhanced functionality
    function initAccordions() {
        const accordions = document.querySelectorAll('.faq-item.accordion:not([data-initialized])');
        
        accordions.forEach(accordion => {
            const question = accordion.querySelector('.faq-question');
            const answer = accordion.querySelector('.faq-answer');
            
            if (question && answer) {
                // Mark as initialized to prevent duplicate listeners
                accordion.setAttribute('data-initialized', 'true');
                
                // Initialize with proper closed state
                answer.style.maxHeight = '0';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.3s ease';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
                
                const toggleAccordion = () => {
                    const isOpen = accordion.classList.contains('open');
                    
                    if (isOpen) {
                        // Close current item
                        accordion.classList.remove('open');
                        answer.style.maxHeight = '0';
                        answer.style.paddingTop = '0';
                        answer.style.paddingBottom = '0';
                        question.setAttribute('aria-expanded', 'false');
                        answer.setAttribute('aria-hidden', 'true');
                    } else {
                        // Close all other accordions in the same container
                        const container = accordion.closest('.faq-container, .faq-section');
                        if (container) {
                            const allAccordions = container.querySelectorAll('.faq-item.accordion');
                            allAccordions.forEach(acc => {
                                if (acc !== accordion) {
                                    acc.classList.remove('open');
                                    const q = acc.querySelector('.faq-question');
                                    const a = acc.querySelector('.faq-answer');
                                    if (q) q.setAttribute('aria-expanded', 'false');
                                    if (a) {
                                        a.style.maxHeight = '0';
                                        a.style.paddingTop = '0';
                                        a.style.paddingBottom = '0';
                                        a.setAttribute('aria-hidden', 'true');
                                    }
                                }
                            });
                        }
                        
                        // Open current item
                        accordion.classList.add('open');
                        answer.style.paddingTop = '1rem';
                        answer.style.paddingBottom = '1rem';
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        question.setAttribute('aria-expanded', 'true');
                        answer.setAttribute('aria-hidden', 'false');
                    }
                };
                
                // Add click handler
                question.addEventListener('click', toggleAccordion);
                
                // Add keyboard support
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleAccordion();
                    }
                });
            }
        });
    }
    
    // Initialize accordions
    initAccordions();
    
    // Re-initialize on dynamic content load
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initAccordions();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Recalculate heights on window resize
    window.addEventListener('resize', () => {
        const openAccordions = document.querySelectorAll('.faq-item.accordion.open .faq-answer');
        openAccordions.forEach(answer => {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });
    });
});
