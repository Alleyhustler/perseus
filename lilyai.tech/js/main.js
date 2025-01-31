document.addEventListener('DOMContentLoaded', () => {
    const lily = new LilyAI();
    const terminal = new Terminal();
    const effects = new Effects();
    initializeLoading(); 
});

// Loading Screen Handler
function initializeLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none'; // Add this line
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 100);
}

// Scroll Handler
function initializeScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Parallax Effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const offset = window.scrollY * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    const interactiveElements = document.querySelectorAll('[data-interactive]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('active');
            triggerGlitch(element);
        });

        element.addEventListener('mouseleave', () => {
            element.classList.remove('active');
        });
    });
}

// Glitch Effect
function triggerGlitch(element) {
    element.classList.add('glitch');
    setTimeout(() => {
        element.classList.remove('glitch');
    }, 200);
}

// Smooth Scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation Observer
function initializeAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('[data-animate]').forEach(element => {
        observer.observe(element);
    });
}

// Initialize all components
function initializeComponents() {
    initializeScrollEffects();
    initializeParallax();
    initializeInteractiveElements();
    initializeSmoothScroll();
    initializeAnimationObserver();
}

// Error Handler
function handleError(error) {
    console.error('An error occurred:', error);
    // Add custom error handling logic here
}
