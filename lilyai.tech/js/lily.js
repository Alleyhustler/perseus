class LilyAI {
    constructor() {
        this.container = document.querySelector('.lily-container');
        this.portrait = document.querySelector('.lily-portrait');
        this.scanningEffect = document.querySelector('.scanning-effect');
        this.dataStreams = document.querySelector('.data-streams');
        this.state = 'idle';
        if (this.container) {  // Only initialize if container exists
            this.initializeLily();
        }
    }

    initializeLily() {
        this.setupPortraitEffects();
        this.setupInteractivity();
        this.startAmbientAnimations();
    }

    setupPortraitEffects() {
        // Create energy field effect if not exists
        if (!document.querySelector('.energy-field')) {
            const energyField = document.createElement('div');
            energyField.className = 'energy-field';
            this.container.appendChild(energyField);
        }

        // Add scanner effect if not exists
        if (!document.querySelector('.scanner')) {
            const scanner = document.createElement('div');
            scanner.className = 'scanner';
            this.container.appendChild(scanner);
        }
    }

    setupInteractivity() {
        if (this.container) {
            this.container.addEventListener('mousemove', (e) => {
                this.handleParallax(e);
            });

            this.container.addEventListener('mouseenter', () => {
                this.setState('active');
            });

            this.container.addEventListener('mouseleave', () => {
                this.setState('idle');
                this.resetPosition();
            });
        }
    }

    handleParallax(e) {
        if (!this.portrait) return;
        const rect = this.container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(this.portrait, {
            duration: 0.5,
            x: x * 30,
            y: y * 30,
            rotationY: x * 10,
            rotationX: -y * 10,
            ease: 'power2.out'
        });
    }

    resetPosition() {
        if (!this.portrait) return;
        gsap.to(this.portrait, {
            duration: 0.7,
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            ease: 'power2.out'
        });
    }

    setState(state) {
        this.state = state;
        if (this.container) {
            this.container.dataset.state = state;
        }

        switch(state) {
            case 'active':
                this.activateEffects();
                break;
            case 'processing':
                this.triggerProcessingState();
                break;
            case 'idle':
                this.deactivateEffects();
                break;
        }
    }

    activateEffects() {
        if (this.scanningEffect) {
            this.scanningEffect.style.opacity = '1';
        }
        if (this.dataStreams) {
            this.dataStreams.style.opacity = '1';
        }
        if (this.portrait) {
            gsap.to(this.portrait, {
                filter: 'brightness(1.2) contrast(1.1)',
                duration: 0.3
            });
        }
    }

    deactivateEffects() {
        if (this.scanningEffect && this.dataStreams) {
            gsap.to([this.scanningEffect, this.dataStreams], {
                opacity: 0.5,
                duration: 0.3
            });
        }
        if (this.portrait) {
            gsap.to(this.portrait, {
                filter: 'brightness(1) contrast(1)',
                duration: 0.3
            });
        }
    }

    triggerProcessingState() {
        this.setState('processing');
        this.triggerGlitch();
        setTimeout(() => {
            if (this.state === 'processing') {
                this.setState('idle');
            }
        }, 2000);
    }

    triggerGlitch() {
        if (!this.portrait) return;
        const glitchDuration = 50;
        const glitchInterval = setInterval(() => {
            const xPos = Math.random() * 10 - 5;
            const yPos = Math.random() * 10 - 5;
            this.portrait.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }, glitchDuration);

        setTimeout(() => {
            clearInterval(glitchInterval);
            if (this.portrait) {
                this.portrait.style.transform = '';
            }
        }, 500);
    }

    startAmbientAnimations() {
        if (this.portrait) {
            // Floating animation
            gsap.to(this.portrait, {
                y: '+=20',
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'power1.inOut'
            });
        }

        const energyField = document.querySelector('.energy-field');
        if (energyField) {
            // Energy field rotation
            gsap.to(energyField, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none'
            });
        }
    }
}

// Initialize Lily
const lily = new LilyAI();