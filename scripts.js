// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ===== LENIS SMOOTH SCROLL =====
    const lenis = new Lenis({
        duration: 0.8, // Reduced from 1.2 for snappier feel
        lerp: 0.1,    // Added lerp for smoother acceleration/deceleration
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9, // Slightly reduced to prevent "runaway" scrolling
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // ===== SCROLL PROGRESS & BACK TO TOP BUTTON LOGIC =====
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    lenis.on('scroll', (e) => {
        // Scroll Progress Bar Update
        if (scrollProgress) {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollTotal > 0 ? (e.scroll / scrollTotal) * 100 : 0;
            scrollProgress.style.width = `${progress}%`;
        }

        // Back to top Button Fading
        if (backToTopBtn) {
            if (e.scroll > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    // ===== GSAP & SCROLLTRIGGER =====
    gsap.registerPlugin(ScrollTrigger);

    // Page Loader Fade Out
    const pageLoader = document.getElementById('page-loader');

    function hideLoader() {
        if (pageLoader && pageLoader.style.display !== 'none') {
            gsap.to(pageLoader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    pageLoader.style.display = 'none';
                    initAnimations();
                }
            });
        }
    }

    // Hide loader on window load OR after 3 seconds max (fallback)
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 3000);

    function initAnimations() {
        // Hero Section Animations
        const heroTl = gsap.timeline();
        heroTl.from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, ease: "power3.out" })
            .from(".hero-title", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
            .from(".hero-role", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
            .from(".hero-description", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
            .from(".hero-buttons", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
            .from(".hero-image", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1");

        // Section Headers
        gsap.utils.toArray(".section-header").forEach(header => {
            gsap.fromTo(header,
                { y: 50, opacity: 0, visibility: "hidden" },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 1,
                    ease: "power3.out"
                }
            );
        });

        // About Content
        gsap.fromTo(".about-image",
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                ease: "power3.out"
            }
        );

        gsap.fromTo(".about-text",
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                ease: "power3.out"
            }
        );

        // Skill Cards Staggered
        gsap.fromTo(".skill-card",
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                onStart: () => animateSkillBars()
            }
        );

        // Project Cards
        gsap.fromTo(".project-card, .card",
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }
        );

        // Certification Cards
        gsap.fromTo(".cert-card",
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                scrollTrigger: {
                    trigger: ".certifications-grid",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            }
        );

        // Timeline Items
        gsap.utils.toArray(".timeline-item").forEach(item => {
            gsap.fromTo(item,
                { y: 50, opacity: 0, visibility: "hidden" },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 1,
                    ease: "power3.out"
                }
            );
        });

        // Contact Form
        gsap.fromTo(".form-container",
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                scrollTrigger: {
                    trigger: ".contact-wrapper",
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                ease: "power3.out"
            }
        );

        // Refresh ScrollTrigger to ensure all markers and trigger points are correct
        ScrollTrigger.refresh();
    }

    // ===== DOM Elements =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const typingText = document.getElementById('typing-text');

    // ===== TYPING ANIMATION =====
    const texts = ['Web Developer', 'Software Engineer', 'BCA Student', 'Tech Enthusiast'];
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
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    setTimeout(typeText, 2000);

    // Skill Bar Animation Logic (called from GSAP)
    function animateSkillBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                const width = progressBar.getAttribute('data-width') || '0';
                progressBar.style.width = `${width}%`;
            }
        });
    }

    // Mobile Navigation logic (Keeping original)
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            navToggle.innerHTML = isActive
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }



    // Custom Cursor logic
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const { clientX: posX, clientY: posY } = e;

            // Use GSAP for smoother cursor following
            gsap.to(cursorDot, {
                x: posX,
                y: posY,
                duration: 0,
                overwrite: true
            });

            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.15,
                ease: "power2.out",
                overwrite: true
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            gsap.to([cursorDot, cursorOutline], { opacity: 0 });
        });

        document.addEventListener('mouseenter', () => {
            gsap.to([cursorDot, cursorOutline], { opacity: 1 });
        });
    }

    // ===== 10/10 MAGNETIC BUTTONS =====
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .nav-logo, .social-icons a, .social-link');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            gsap.to(btn, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', function () {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // ===== 10/10 HERO SPOTLIGHT =====
    const spotlight = document.querySelector('.hero-spotlight');
    const hero = document.getElementById('home');

    if (hero && spotlight) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const heroRect = hero.getBoundingClientRect();
            const x = clientX - heroRect.left;
            const y = clientY - heroRect.top;

            gsap.to(spotlight, {
                x: x - 300,
                y: y - 300,
                duration: 0.8, // Snappier spotlight
                ease: "power2.out"
            });
        });

        hero.addEventListener('mouseleave', () => {
            gsap.to(spotlight, {
                opacity: 0,
                duration: 0.5
            });
        });

        hero.addEventListener('mouseenter', () => {
            gsap.to(spotlight, {
                opacity: 0.5,
                duration: 0.5
            });
        });
    }

    // ===== SMOOTH SCROLL FOR NAV AND ANCHORS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target === '#') return;
            
            // Auto close mobile menu
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
            
            lenis.scrollTo(target);
        });
    });

    // ===== CERTIFICATIONS DYNAMIC SORTING & VIEW MORE =====
    const certGrid1 = document.querySelector('#certifications .certifications-grid');
    const certMore = document.getElementById('certifications-more');
    const certGrid2 = certMore ? certMore.querySelector('.certifications-grid') : null;
    const allCerts = Array.from(document.querySelectorAll('.cert-card'));
    const sortButtons = document.querySelectorAll('.cert-sort-btn');
    const viewMoreBtn = document.getElementById('view-more-certs');

    function parseDateString(dateStr) {
        const yearMatch = dateStr.match(/\d{4}/);
        const year = yearMatch ? parseInt(yearMatch[0]) : 0;
        
        let searchStr = dateStr;
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length > 1) {
                searchStr = parts[1];
            }
        }
        
        const months = {
            'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
            'jul': 7, 'aug': 8, 'sep': 9, 'sept': 9, 'oct': 10, 'nov': 11, 'dec': 12
        };
        
        let monthVal = 1;
        searchStr = searchStr.toLowerCase();
        
        for (const [key, val] of Object.entries(months)) {
            if (searchStr.includes(key)) {
                monthVal = val;
                break;
            }
        }
        
        return year * 12 + monthVal;
    }

    function sortAndRenderCertifications(sortBy) {
        if (!certGrid1 || !certGrid2) return;

        let sorted = [...allCerts];
        
        if (sortBy === 'date-desc') {
            sorted.sort((a, b) => {
                const dateA = a.querySelector('.cert-date') ? a.querySelector('.cert-date').textContent : '';
                const dateB = b.querySelector('.cert-date') ? b.querySelector('.cert-date').textContent : '';
                return parseDateString(dateB) - parseDateString(dateA);
            });
        } else if (sortBy === 'date-asc') {
            sorted.sort((a, b) => {
                const dateA = a.querySelector('.cert-date') ? a.querySelector('.cert-date').textContent : '';
                const dateB = b.querySelector('.cert-date') ? b.querySelector('.cert-date').textContent : '';
                return parseDateString(dateA) - parseDateString(dateB);
            });
        } else if (sortBy === 'alpha') {
            sorted.sort((a, b) => {
                const titleA = a.querySelector('h3') ? a.querySelector('h3').textContent.trim().toLowerCase() : '';
                const titleB = b.querySelector('h3') ? b.querySelector('h3').textContent.trim().toLowerCase() : '';
                return titleA.localeCompare(titleB);
            });
        }

        // Clear and rebuild
        certGrid1.innerHTML = '';
        certGrid2.innerHTML = '';

        sorted.forEach((card, index) => {
            // Reset styles for GSAP animation
            card.style.opacity = '';
            card.style.visibility = '';
            card.style.transform = '';
            
            if (index < 3) {
                certGrid1.appendChild(card);
            } else {
                certGrid2.appendChild(card);
            }
        });

        // Animate the main grid
        gsap.fromTo(certGrid1.querySelectorAll(".cert-card"),
            { y: 50, opacity: 0, visibility: "hidden" },
            {
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                overwrite: "auto"
            }
        );
        
        // If expanded, animate more grid
        if (certMore && certMore.style.display !== 'none') {
            gsap.fromTo(certGrid2.querySelectorAll(".cert-card"),
                { y: 50, opacity: 0, visibility: "hidden" },
                {
                    y: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    overwrite: "auto"
                }
            );
        }
        
        ScrollTrigger.refresh();
    }

    if (sortButtons.length > 0) {
        sortButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sortButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const sortBy = this.getAttribute('data-sort');
                sortAndRenderCertifications(sortBy);
            });
        });
    }

    if (viewMoreBtn && certMore) {
        viewMoreBtn.addEventListener('click', () => {
            if (certMore.style.display === 'none') {
                certMore.style.display = 'block';
                viewMoreBtn.textContent = 'View Less';
                
                // Animate elements entering
                gsap.fromTo(certGrid2.querySelectorAll(".cert-card"),
                    { y: 50, opacity: 0, visibility: "hidden" },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: "visible",
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out"
                    }
                );
            } else {
                certMore.style.display = 'none';
                viewMoreBtn.textContent = 'View More';
            }
            ScrollTrigger.refresh();
        });
    }

    // Default sorting run
    sortAndRenderCertifications('featured');

    // ===== CONTACT FORM AJAX SUBMISSION =====
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('success-overlay');
    const closeSuccessBtn = document.getElementById('close-success');
    const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;

    if (contactForm && successOverlay) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                const btnText = submitBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = ''; // hide text for spinner overlay
            }

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    successOverlay.classList.add('active');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong, please try again.');
                }
            })
            .catch(error => {
                console.error('Form error:', error);
                alert('Oops! There was a connection error, please try again.');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector('.btn-text');
                    if (btnText) btnText.textContent = 'Send Message';
                }
            });
        });
    }

    if (closeSuccessBtn && successOverlay) {
        closeSuccessBtn.addEventListener('click', () => {
            successOverlay.classList.remove('active');
        });
    }

    // ===== HERO PARTICLE CANVAS =====
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 45;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.alpha = Math.random() * 0.4 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
            }

            draw() {
                ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.12;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }
});