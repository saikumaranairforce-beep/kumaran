// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Page navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and pages
            navLinks.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Show corresponding page
            const targetPage = this.getAttribute('href').substring(1);
            const targetPageElement = document.getElementById(targetPage);
            
            if (targetPageElement) {
                targetPageElement.classList.add('active');
            }
            
            // Scroll to top smoothly
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form data
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create mailto link with form data
            const mailtoSubject = encodeURIComponent(subject);
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            const mailtoLink = `mailto:saikumaranairforce@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Your email client should open now. If it doesn\'t open automatically, please send your query directly to saikumaranairforce@gmail.com');
            
            // Reset form after submission
            this.reset();
        });
    }

    // Scroll animations for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply scroll animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Smooth scrolling for internal links (if any)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement && !this.classList.contains('nav-link')) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        let originalText = submitBtn.textContent;
        
        submitBtn.addEventListener('click', function() {
            this.textContent = 'Sending...';
            this.disabled = true;
            
            // Re-enable button after a short delay
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    }

    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click-to-copy functionality for contact information
    const emailElement = document.querySelector('.contact-item p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email address';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(function() {
                    // Show temporary feedback
                    const originalText = emailElement.textContent;
                    emailElement.textContent = 'Copied!';
                    emailElement.style.color = '#28a745';
                    
                    setTimeout(() => {
                        emailElement.textContent = originalText;
                        emailElement.style.color = '';
                    }, 1500);
                }).catch(function() {
                    // Fallback: select the text
                    const range = document.createRange();
                    range.selectNode(emailElement);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                });
            }
        });
    }

    // Initialize page
    console.log('Kumaran GP Website Loaded Successfully');
    
    // Add a subtle fade-in effect for the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
});