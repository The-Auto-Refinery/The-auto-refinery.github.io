document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if FAQ elements exist on the page
    const faqElements = document.querySelectorAll('.faq-item, .accordion');
    if (faqElements.length === 0) {
        return; // Exit early if no FAQ elements found
    }

    // Initialize FAQ accordions with enhanced functionality
    function initAccordions(container = document) {
        const accordions = container.querySelectorAll('.faq-item.accordion:not([data-initialized])');
        if (accordions.length > 0) {
            accordions.forEach(accordion => {
                const question = accordion.querySelector('.faq-question');
                const answer = accordion.querySelector('.faq-answer');
                
                if (question && answer) {
                    // Mark as initialized to prevent duplicate listeners
                    accordion.setAttribute('data-initialized', 'true');
                    
                    // Make accordion header accessible for keyboard navigation
                    question.setAttribute('tabindex', '0');
                    question.setAttribute('role', 'button');
                    question.setAttribute('aria-expanded', 'false');
                    answer.setAttribute('aria-hidden', 'true');
                    
                    // Initialize with proper closed state
                    answer.style.maxHeight = '0';
                    answer.style.overflow = 'hidden';
                    answer.style.transition = 'max-height 0.5s ease';
                    
                    const toggleAccordion = () => {
                        const isOpen = accordion.classList.contains('open');
                        
                        // For home page FAQs, close all others in the same container
                        const parentContainer = accordion.closest('.faq-preview-section, .faq-list');
                        if (parentContainer) {
                            const allAccordions = parentContainer.querySelectorAll('.faq-item.accordion');
                            allAccordions.forEach(acc => {
                                if (acc !== accordion) {
                                    acc.classList.remove('open');
                                    const q = acc.querySelector('.faq-question');
                                    const a = acc.querySelector('.faq-answer');
                                    if (q) q.setAttribute('aria-expanded', 'false');
                                    if (a) {
                                        a.style.maxHeight = '0';
                                        a.setAttribute('aria-hidden', 'true');
                                    }
                                }
                            });
                        }
                        
                        // Toggle current item
                        if (isOpen) {
                            // Close current item
                            accordion.classList.remove('open');
                            answer.style.maxHeight = '0';
                            question.setAttribute('aria-expanded', 'false');
                            answer.setAttribute('aria-hidden', 'true');
                        } else {
                            // Open current item
                            accordion.classList.add('open');
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            question.setAttribute('aria-expanded', 'true');
                            answer.setAttribute('aria-hidden', 'false');
                        }
                    };
                    
                    // Add click handler
                    question.addEventListener('click', toggleAccordion);
                    
                    // Add keyboard support (Enter and Space)
                    question.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleAccordion();
                        }
                    });
                }
            });
        }
    }
    
    // Initialize FAQ category tabs with enhanced functionality (only for FAQ page)
    function initCategoryTabs() {
        const categories = document.querySelectorAll('.faq-category');
        const lists = document.querySelectorAll('.faq-list');
        
        if (categories.length > 0 && lists.length > 0) {
            categories.forEach((category, index) => {
                // Make tabs accessible for keyboard navigation
                category.setAttribute('tabindex', '0');
                category.setAttribute('role', 'tab');
                category.setAttribute('aria-selected', category.classList.contains('active') ? 'true' : 'false');
                
                const handleCategoryChange = () => {
                    // Remove active class from all categories
                    categories.forEach(cat => {
                        cat.classList.remove('active');
                        cat.setAttribute('aria-selected', 'false');
                    });
                    
                    // Add active class to clicked/focused category
                    category.classList.add('active');
                    category.setAttribute('aria-selected', 'true');
                    
                    // Show corresponding list
                    const targetCategory = category.getAttribute('data-category');
                    lists.forEach(list => {
                        list.classList.remove('active');
                        if (list.classList.contains('category-' + targetCategory)) {
                            list.classList.add('active');
                            
                            // Init accordions only in this newly visible list
                            initAccordions(list);
                            
                            // Close all accordions when switching tabs
                            const accordions = list.querySelectorAll('.accordion');
                            if (accordions.length > 0) {
                                accordions.forEach(acc => {
                                    acc.classList.remove('open');
                                    const q = acc.querySelector('.faq-question');
                                    const ans = acc.querySelector('.faq-answer');
                                    if (q) q.setAttribute('aria-expanded', 'false');
                                    if (ans) {
                                        ans.style.maxHeight = '0';
                                        ans.setAttribute('aria-hidden', 'true');
                                    }
                                });
                                
                                // Open first accordion in new category
                                const firstAccordion = accordions[0];
                                if (firstAccordion) {
                                    firstAccordion.classList.add('open');
                                    const firstQuestion = firstAccordion.querySelector('.faq-question');
                                    const firstAnswer = firstAccordion.querySelector('.faq-answer');
                                    if (firstQuestion) firstQuestion.setAttribute('aria-expanded', 'true');
                                    if (firstAnswer) {
                                        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
                                        firstAnswer.setAttribute('aria-hidden', 'false');
                                    }
                                }
                            }
                        }
                    });
                };
                
                // Add click handler
                category.addEventListener('click', handleCategoryChange);
                
                // Add keyboard support (Enter and Space)
                category.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryChange();
                    } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        let nextIndex = (index + 1) % categories.length;
                        categories[nextIndex].focus();
                    } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        let prevIndex = (index - 1 + categories.length) % categories.length;
                        categories[prevIndex].focus();
                    }
                });
            });
        }
    }
    
    // Initialize both features
    initAccordions();
    initCategoryTabs();
    
    // Recalculate accordion heights on window resize (for responsive design)
    window.addEventListener('resize', () => {
        const openAccordions = document.querySelectorAll('.faq-item.accordion.open');
        openAccordions.forEach(accordion => {
            const answer = accordion.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
