/**
 * Booking Form Handling
 * Handles consultation booking form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Hide any previous messages
            document.querySelector('.form-success').style.display = 'none';
            document.querySelector('.form-error').style.display = 'none';
            
            // Get form data
            const formData = new FormData(consultationForm);
            
            // Form validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'phone', 'location', 'vehicle-make', 'vehicle-model'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.get('email'))) {
                isValid = false;
                document.getElementById('email').classList.add('error');
            }
            
            // Phone validation
            const phoneRegex = /^[0-9()\-\s+]{10,15}$/;
            if (!phoneRegex.test(formData.get('phone'))) {
                isValid = false;
                document.getElementById('phone').classList.add('error');
            }
            
            if (!isValid) {
                document.querySelector('.form-error').style.display = 'block';
                document.querySelector('.form-error').textContent = 'Please fill in all required fields correctly.';
                return;
            }
            
            // In a real implementation, this would send data to a server
            // For now, we'll just show the success message
            
            // Simulate API call with timeout
            document.querySelector('.btn-submit').disabled = true;
            document.querySelector('.btn-submit').textContent = 'Processing...';
            
            setTimeout(() => {
                // Show success message
                document.querySelector('.form-success').style.display = 'block';
                
                // Reset form
                consultationForm.reset();
                
                // Re-enable button
                document.querySelector('.btn-submit').disabled = false;
                document.querySelector('.btn-submit').textContent = 'Schedule Consultation';
                
                // Scroll to success message
                document.querySelector('.form-success').scrollIntoView({behavior: 'smooth'});
            }, 1500);
            
            // Analytics tracking would go here
            console.log('Booking form submitted', Object.fromEntries(formData));
        });
        
        // Add input listeners to remove error class when user types
        const allInputs = consultationForm.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                
                // Hide error message when user starts fixing the form
                if (document.querySelector('.form-error').style.display === 'block') {
                    document.querySelector('.form-error').style.display = 'none';
                }
            });
        });
    }
});