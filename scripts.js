// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== DOM Elements =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const typingText = document.getElementById('typing-text');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const pageLoader = document.getElementById('page-loader');

    // ===== PAGE LOADER =====
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.classList.add('hidden');
            }
            
            // Initialize progress bars
            initializeProgressBars();
            
            // Animate skill bars after a short delay
            setTimeout(() => {
                animateSkillBars();
            }, 300);
        }, 1000);
    });

    // ===== PROGRESS BARS =====
    function initializeProgressBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            
            if (progressBar) {
                // Reset to 0 for animation
                progressBar.style.width = '0%';
                progressBar.style.opacity = '1';
                progressBar.style.visibility = 'visible';
            }
        });
    }

    function animateSkillBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                const progressBar = card.querySelector('.progress-bar');
                
                if (progressBar) {
                    // Get width from data attribute or CSS variable
                    const width = progressBar.getAttribute('data-width') || 
                                 getComputedStyle(progressBar).getPropertyValue('--progress-width').replace('%', '');
                    
                    // Animate to full width
                    progressBar.style.width = `${width}%`;
                    
                    // Add reveal class for other animations
                    card.classList.add('reveal');
                }
            }, index * 200);
        });
    }

    // ===== TYPING ANIMATION =====
    const texts = ['Frontend Developer', 'Web Designer', 'BCA Student', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        if (!typingText) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // ===== MOBILE NAVIGATION =====
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.innerHTML = isActive 
                ? '<i class="fas fa-bars"></i>' 
                : '<i class="fas fa-times"></i>';
            
            // Toggle body scroll
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    });

    // ===== THEME TOGGLE =====
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDarkMode 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
            
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.replace('dark-mode', 'light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // ===== ACTIVE NAVIGATION LINK =====
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // ===== CUSTOM CURSOR =====
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    if (cursorDot && cursorOutline) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            
            cursorOutline.style.left = `${cursorX}px`;
            cursorOutline.style.top = `${cursorY}px`;
            
            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .skill-card, .project-card, .cert-card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'var(--accent-color)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // Hide custom cursor on mobile
    if ('ontouchstart' in window) {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    // ===== CONTACT FORM =====
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        const successOverlay = document.getElementById('success-overlay');
        const closeSuccessBtn = document.getElementById('close-success');
        
        if (!contactForm) return;
        
        initFormValidation();
        
        contactForm.addEventListener('submit', handleFormSubmit);
        
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                successOverlay.classList.remove('active');
                contactForm.reset();
                resetFormValidation();
            });
        }
    }

    function initFormValidation() {
        const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
        
        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            input.addEventListener('focus', () => {
                formGroup.classList.remove('error');
                removeErrorMessage(formGroup);
            });
            
            input.addEventListener('blur', () => {
                validateInput(formGroup, input);
            });
            
            input.addEventListener('input', () => {
                if (formGroup.classList.contains('error')) {
                    validateInput(formGroup, input);
                }
            });
        });
    }

    function validateInput(formGroup, input) {
        const value = input.value.trim();
        const type = input.type;
        const isRequired = input.required;
        
        removeErrorMessage(formGroup);
        
        if (isRequired && !value) {
            showError(formGroup, `${getFieldName(input)} is required`);
            return false;
        }
        
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(formGroup, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (input.id === 'message' && value.length < 10) {
            showError(formGroup, 'Message should be at least 10 characters');
            return false;
        }
        
        formGroup.classList.remove('error');
        return true;
    }

    function getFieldName(input) {
        const label = input.closest('.form-group').querySelector('label');
        return label ? label.textContent.replace('Your ', '').replace('Email ', '') : 'This field';
    }

    function showError(formGroup, message) {
        formGroup.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        formGroup.appendChild(errorElement);
    }

    function removeErrorMessage(formGroup) {
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function resetFormValidation() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            group.classList.remove('error');
            removeErrorMessage(group);
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const contactForm = document.getElementById('contact-form');
        const successOverlay = document.getElementById('success-overlay');
        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);
        
        let isValid = true;
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (input && !validateInput(group, input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            contactForm.classList.add('shake');
            setTimeout(() => {
                contactForm.classList.remove('shake');
            }, 500);
            return;
        }
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                setTimeout(() => {
                    successOverlay.classList.add('active');
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }, 1000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            alert('Failed to send message. Please try again.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // ===== INITIALIZE EVERYTHING =====
    // Start typing animation after a delay
    setTimeout(typeText, 1000);
    
    // Initialize contact form
    initContactForm();
    
    // Set initial active link
    setActiveLink();
    
    // Add CSS variables for color manipulation
    const root = document.documentElement;
    root.style.setProperty('--primary-color-rgb', '67, 97, 238');
    root.style.setProperty('--secondary-color-rgb', '58, 12, 163');
    root.style.setProperty('--accent-color-rgb', '76, 201, 240');
    root.style.setProperty('--success-color-rgb', '74, 222, 128');
    root.style.setProperty('--danger-color-rgb', '239, 68, 68');
    root.style.setProperty('--text-primary-rgb', '33, 37, 41');
    root.style.setProperty('--text-muted-rgb', '108, 117, 125');

    // ===== PERFORMANCE OPTIMIZATION =====
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(setActiveLink, 100);
    });
});
// ===== SHOW ALL SECTIONS =====
function showAllSections() {
    // Make all sections visible
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.transform = 'none';
    });
    
    // Make all section headers visible
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '1';
        header.style.visibility = 'visible';
        header.style.transform = 'translateY(0)';
        header.classList.add('reveal');
    });
    
    // Make all content visible
    document.querySelectorAll('.about-image, .about-text, .project-card, .cert-card, .timeline-item, .form-container').forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.transform = 'none';
        element.classList.add('reveal');
    });
}