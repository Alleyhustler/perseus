class Effects {
    constructor() {
        this.initializeEffects();
    }

    initializeEffects() {
        this.setupNeuralNetwork();
        this.setupBackgroundEffects();
        this.setupParallaxEffects();
        this.setupGlitchEffects();
        this.createParticleEffect(); // Added new method call
    }

    setupNeuralNetwork() {
        const canvas = document.querySelector('.neural-network');
        if (!canvas) return;
    
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    
        const ctx = canvas.getContext('2d');
        const nodes = [];
        const nodeCount = 20;
        const connectionDistance = 100;
        const nodeSpeed = 0.3;
    
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * nodeSpeed,
                vy: (Math.random() - 0.5) * nodeSpeed,
                radius: Math.random() * 2 + 1
            });
        }
    
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 0, 51, 0.5)';
            ctx.strokeStyle = 'rgba(255, 0, 51, 0.2)';
    
            // Update and draw nodes
            nodes.forEach(node => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;
    
                // Bounce off walls
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
    
                // Draw connections
                nodes.forEach(otherNode => {
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
    
                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(255, 0, 51, ${1 - distance / connectionDistance})`;
                        ctx.stroke();
                    }
                });
            });
    
            requestAnimationFrame(animate);
        }
    
        animate();
    
        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });
    }

    animateNeuralNetwork() {
        const canvas = document.querySelector('.neural-network');
        if (!canvas) return;

        const ctx = this.network.ctx;
        const nodes = this.network.nodes;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach(node => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off walls
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 0, 51, 0.5)';
                ctx.fill();
            });

            // Draw connections
            nodes.forEach((node1, i) => {
                nodes.slice(i + 1).forEach(node2 => {
                    const dx = node2.x - node1.x;
                    const dy = node2.y - node1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(node1.x, node1.y);
                        ctx.lineTo(node2.x, node2.y);
                        ctx.strokeStyle = `rgba(255, 0, 51, ${1 - distance / 100})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    setupBackgroundEffects() {
        this.createGrainEffect();
        this.createScanlines();
    }

    createGrainEffect() {
        const grainOverlay = document.querySelector('.grain-overlay');
        if (!grainOverlay) return;

        // Animate grain
        setInterval(() => {
            grainOverlay.style.transform = `translate(
                ${Math.random() * 4 - 2}px,
                ${Math.random() * 4 - 2}px
            )`;
        }, 50);
    }

    createScanlines() {
        const scanlines = document.querySelector('.scanlines');
        if (!scanlines) return;
        // Scanlines are handled via CSS animations
    }

    setupParallaxEffects() {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

            document.querySelectorAll('[data-parallax]').forEach(element => {
                const speed = element.dataset.parallax || 1;
                element.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    }

    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerGlitch(element);
            });
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
    
        document.querySelectorAll('.about-card, .connection-card').forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    createParticleEffect() {
        const container = document.querySelector('.lily-container');
        if (!container) return;

        const particleCount = 50;
        
        // Add particle styles
        const particleStyles = document.createElement('style');
        particleStyles.textContent = `
            .particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 0, 51, 0.5);
                pointer-events: none;
                border-radius: 50%;
                filter: blur(1px);
            }

            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                50% {
                    transform: translate(var(--moveX), var(--moveY));
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(particleStyles);
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random initial position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random movement
            particle.style.setProperty('--moveX', `${Math.random() * 20 - 10}px`);
            particle.style.setProperty('--moveY', `${Math.random() * 20 - 10}px`);
            
            // Random animation duration
            const duration = 3 + Math.random() * 2;
            particle.style.animation = `float ${duration}s infinite`;
            
            container.appendChild(particle);
        }
    }

    triggerGlitch(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let intervals = [];

        // Create multiple glitch intervals
        for (let i = 0; i < 3; i++) {
            intervals.push(setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (Math.random() < 0.1) {
                            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        }
                        return char;
                    })
                    .join('');
            }, 50));
        }

        // Reset after glitch effect
        setTimeout(() => {
            intervals.forEach(interval => clearInterval(interval));
            element.textContent = originalText;
        }, 500);
    }

    createDataStream(parent) {
        if (!parent) return;
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        parent.appendChild(stream);
    }

    addEnergyField(element) {
        if (!element) return;
        const field = document.createElement('div');
        field.className = 'energy-field';
        element.appendChild(field);

        // Create multiple layers for depth effect
        for (let i = 0; i < 3; i++) {
            const layer = field.cloneNode();
            layer.style.animationDelay = `${i * 0.5}s`;
            element.appendChild(layer);
        }
    }

    createScanningEffect(element) {
        if (!element) return;
        const scanner = document.createElement('div');
        scanner.className = 'scanning-effect';
        element.appendChild(scanner);
    }

    pulseEffect(element, color = 'rgba(255, 0, 51, 0.5)') {
        if (!element) return;
        const pulse = document.createElement('div');
        pulse.className = 'pulse-effect';
        element.appendChild(pulse);

        pulse.style.cssText = `
            border: 2px solid ${color};
            animation: pulse 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        `;

        setTimeout(() => {
            pulse.remove();
        }, 1000);
    }
}

// Initialize Effects
const effects = new Effects();