/**
 * Dinesh Naarayanan K - Portfolio Scripts
 * Handles: Typing animation, Theme toggle, Mobile Menu, Active links,
 *          Projects filtering, Form validation & Modals, Custom Particles
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize functions
    initTheme();
    initMobileMenu();
    initTypingEffect();
    initProjectFilters();
    initContactForm();
    initHeaderScroll();
    initActiveNavLinks();
    initParticles();
    initResumeDownload();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check localStorage or default to light theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* ==========================================================================
   2. Mobile Hamburger Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================================================
   3. Typing Animation Effect
   ========================================================================== */
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const words = [
        "B.Tech AI & Data Science Undergraduate",
        "Machine Learning Intern",
        "Full-Stack Web Developer",
        "Problem Solver"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting is faster
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        // Handle animation milestones
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing cycle
    setTimeout(type, 1000);
}

/* ==========================================================================
   4. Projects Filter Logic
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animations
                    card.classList.remove('fade-out');
                    void card.offsetWidth;
                } else {
                    card.classList.add('fade-out');
                    // Delay display:none to let fade-out animation play if any
                    setTimeout(() => {
                        if (card.classList.contains('fade-out')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   5. Interactive Contact Form with Validation & Modals
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalUserName = document.getElementById('modal-user-name');

    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    // Simple Email Regex
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateInput = (input, condition, errorGroupSelector) => {
        const formGroup = input.closest('.form-group');
        if (condition) {
            formGroup.classList.remove('error');
            return true;
        } else {
            formGroup.classList.add('error');
            return false;
        }
    };

    // Live validation triggers
    nameInput.addEventListener('input', () => validateInput(nameInput, nameInput.value.trim() !== ''));
    emailInput.addEventListener('input', () => validateInput(emailInput, isValidEmail(emailInput.value.trim())));
    messageInput.addEventListener('input', () => validateInput(messageInput, messageInput.value.trim() !== ''));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform final check
        const isNameValid = validateInput(nameInput, nameInput.value.trim() !== '');
        const isEmailValid = validateInput(emailInput, isValidEmail(emailInput.value.trim()));
        const isMessageValid = validateInput(messageInput, messageInput.value.trim() !== '');

        if (isNameValid && isEmailValid && isMessageValid) {
            // Save data or perform mock AJAX request
            const userName = nameInput.value.trim();
            
            // Display modal
            modalUserName.textContent = userName;
            successModal.classList.add('active');
            
            // Reset Form fields
            form.reset();
        }
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // Close modal when clicking on overlay background
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}

/* ==========================================================================
   6. Header Navigation Bar Scroll Behaviour
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   7. Active Navigation Links Highlighting
   ========================================================================== */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a little before reaching the section
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        // Corner case: Scroll is near the top
        if (window.scrollY < 100) {
            currentSection = 'hero';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href').substring(1);
            // Highlight 'About' for both hero and about to align initial design
            if (href === currentSection || (href === 'about' && currentSection === 'hero')) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   8. Ambient Particle Background Generator
   ========================================================================== */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const starCount = 60;
    const stars = [];

    // Create stardust
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.borderRadius = '50%';
        star.style.backgroundColor = '#ffffff';
        star.style.pointerEvents = 'none';
        
        // Randomize dimensions (mostly small stars)
        const sizeRand = Math.random();
        const size = sizeRand < 0.7 ? (Math.random() * 1 + 0.5) : (Math.random() * 2 + 1.5);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Position coordinates
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;

        // Twinkle speed & phase
        const twinkle = Math.random() < 0.4; // 40% twinkle
        const twinkleSpeed = Math.random() * 0.02 + 0.005;
        let twinkleDir = Math.random() < 0.5 ? -1 : 1;
        let opacity = Math.random() * 0.6 + 0.15;
        star.style.opacity = opacity;

        // Custom glow for larger stars
        if (size > 2) {
            star.style.boxShadow = '0 0 6px 1px rgba(255, 255, 255, 0.8)';
        } else if (size > 1) {
            star.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.5)';
        }

        // Random velocities and directions (slow space drift)
        const vx = (Math.random() - 0.5) * 0.015;
        const vy = (Math.random() - 0.5) * 0.015;

        container.appendChild(star);
        stars.push({ element: star, x, y, vx, vy, twinkle, twinkleSpeed, twinkleDir, opacity, size });
    }

    // Twinkling & Drifting Animation Loop
    function animate() {
        stars.forEach(s => {
            // Space drift
            s.x += s.vx;
            s.y += s.vy;

            // Boundary wrap around
            if (s.x < 0) s.x = 100;
            if (s.x > 100) s.x = 0;
            if (s.y < 0) s.y = 100;
            if (s.y > 100) s.y = 0;

            s.element.style.left = `${s.x}%`;
            s.element.style.top = `${s.y}%`;

            // Twinkling logic
            if (s.twinkle) {
                s.opacity += s.twinkleSpeed * s.twinkleDir;
                if (s.opacity > 0.8) {
                    s.opacity = 0.8;
                    s.twinkleDir = -1;
                } else if (s.opacity < 0.15) {
                    s.opacity = 0.15;
                    s.twinkleDir = 1;
                }
                s.element.style.opacity = s.opacity;
            }
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Shooting Stars (Comets) effect
    function spawnShootingStar() {
        const comet = document.createElement('div');
        comet.style.position = 'absolute';
        comet.style.width = '100px';
        comet.style.height = '2px';
        
        // Custom gradient for the tail
        const colorAccent = Math.random() < 0.5 ? '#8b5cf6' : '#06b6d4';
        comet.style.background = `linear-gradient(90deg, ${colorAccent} 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)`;
        comet.style.pointerEvents = 'none';
        comet.style.opacity = '0';
        comet.style.zIndex = '1';
        
        // Random starting point (top-half of screen, moving down-right)
        const startX = Math.random() * 60;
        const startY = Math.random() * 40;
        comet.style.left = `${startX}%`;
        comet.style.top = `${startY}%`;
        
        // Angle of flight (roughly 30-45 degrees down-right)
        const angle = Math.random() * 15 + 30; 
        comet.style.transform = `rotate(${angle}deg)`;
        
        container.appendChild(comet);
        
        // Animation using keyframes or simple Web Animations API
        const animation = comet.animate([
            { transform: `translate(0, 0) rotate(${angle}deg)`, opacity: 0 },
            { opacity: 1, offset: 0.15 },
            { transform: `translate(300px, ${300 * Math.tan(angle * Math.PI / 180)}px) rotate(${angle}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1200 + 800,
            easing: 'ease-in-out'
        });
        
        animation.onfinish = () => {
            comet.remove();
        };
    }

    // Spawn shooting stars periodically (every 7 to 15 seconds)
    function queueNextShootingStar() {
        const delay = Math.random() * 8000 + 7000;
        setTimeout(() => {
            spawnShootingStar();
            queueNextShootingStar();
        }, delay);
    }
    
    queueNextShootingStar();
}

/* ==========================================================================
   9. Resume PDF Download / Print Trigger
   ========================================================================== */
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
        // Trigger default print layout styled specifically for resume save
        window.print();
    });
}
