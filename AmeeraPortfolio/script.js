        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.getElementById('hamburger').classList.remove('active');
                    document.querySelector('.nav-links').classList.remove('active');
                }
            });
        });

        // Header style on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
                header.style.background = 'rgba(18, 18, 18, 0.98)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
                header.style.background = 'rgba(18, 18, 18, 0.95)';
            }
            
            // Show/hide back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Mobile menu toggle
        document.getElementById('hamburger').addEventListener('click', function() {
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('hamburger').classList.remove('active');
                document.getElementById('hamburger').innerHTML = '<i class="fas fa-bars"></i>';
                document.querySelector('.nav-links').classList.remove('active');
            });
        });

        // Fade in animation on scroll
        function checkFade() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
                
                if (isVisible) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkFade);
        window.addEventListener('load', checkFade);

        // Back to top button functionality
        document.getElementById('backToTop').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const alertBox = document.getElementById('alertBox');
            const formStatus = document.getElementById('form-status');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Show loading state
            alertBox.textContent = 'جاري إرسال الرسالة...';
            alertBox.className = 'alert';
            alertBox.style.display = 'block';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission code)
            setTimeout(() => {
                alertBox.textContent = 'تم إرسال رسالتك بنجاح. سأرد عليك في أقرب وقت ممكن!';
                alertBox.className = 'alert alert-success';
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.className = 'status-message success';
                this.reset();
                submitBtn.disabled = false;
                
                // Hide alert after 5 seconds
                setTimeout(() => {
                    alertBox.style.display = 'none';
                }, 5000);
            }, 2000);
        });

        // Fix navigation to sections
        function fixNavigation() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - 100)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
        }

        // Initialize EmailJS
        (function() {
            // Replace with your actual EmailJS public key
            emailjs.init("mgz8vNMK1kBFH7jXy");
        })();

        // Handle contact form submission with EmailJS
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formStatus = document.getElementById('form-status');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Show loading state
            formStatus.className = 'status-message loading';
            formStatus.textContent = 'Sending message...';
            formStatus.style.display = 'block';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_201b3ke', 'template_n0cettm', this)
                .then(function() {
                    // Success
                    formStatus.className = 'status-message success';
                    formStatus.textContent = 'Your message has been sent successfully!';
                    
                    // Reset form
                    document.getElementById('contactForm').reset();
                    
                    // Restore button state
                    submitBtn.disabled = false;
                }, function(error) {
                    // Error
                    formStatus.className = 'status-message error';
                    formStatus.textContent = 'There was an error sending your message. Please try again.';
                    
                    // Restore button state
                    submitBtn.disabled = false;
                    console.error('Email sending failed:', error);
                });
        });

        // Initialize everything when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            checkFade();
            fixNavigation();
            
            // Handle mobile view adjustments
            function handleMobileView() {
                if (window.innerWidth <= 768) {
                    // Add any additional mobile optimizations here
                }
            }
            
            // Call function on load and window resize
            window.addEventListener('load', handleMobileView);
            window.addEventListener('resize', handleMobileView);
        });
