/**
 * Advanced Animations and Visual Effects for Martone Website
 * Handles complex animations, transitions, and interactive effects
 */

(function($) {
    'use strict';

    // Animation configuration
    const ANIMATION_CONFIG = {
        duration: {
            fast: 300,
            medium: 600,
            slow: 1000,
            extraSlow: 1500
        },
        easing: {
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        delays: {
            stagger: 100,
            sequence: 200
        }
    };

    $(document).ready(function() {
        initializeAdvancedAnimations();
        initializeParticleSystem();
        initializeScrollAnimations();
        initializeHoverEffects();
        initializePageTransitions();
        initializeLoadingAnimations();
        initializeTextAnimations();
        initializeMusicVisualization();
    });

    /**
     * Advanced Animation System
     */
    function initializeAdvancedAnimations() {
        // Register custom animations
        registerCustomAnimations();
        
        // Initialize animation observer
        setupAnimationObserver();
        
        // Setup animation sequences
        initializeAnimationSequences();
    }

    function registerCustomAnimations() {
        // Fade in with scale
        $.fn.fadeInScale = function(duration = 600, delay = 0) {
            return this.each(function() {
                const $element = $(this);
                $element.css({
                    opacity: 0,
                    transform: 'scale(0.8)'
                });
                
                setTimeout(() => {
                    $element.animate({
                        opacity: 1
                    }, {
                        duration: duration,
                        step: function(now) {
                            const scale = 0.8 + (0.2 * now);
                            $(this).css('transform', `scale(${scale})`);
                        },
                        complete: function() {
                            $(this).css('transform', 'scale(1)');
                        }
                    });
                }, delay);
            });
        };

        // Slide in with rotation
        $.fn.slideInRotate = function(direction = 'left', duration = 800, delay = 0) {
            return this.each(function() {
                const $element = $(this);
                const translateValue = direction === 'left' ? '-100px' : '100px';
                
                $element.css({
                    opacity: 0,
                    transform: `translateX(${translateValue}) rotate(10deg)`
                });
                
                setTimeout(() => {
                    $element.animate({
                        opacity: 1
                    }, {
                        duration: duration,
                        step: function(now) {
                            const translateX = parseFloat(translateValue) * (1 - now);
                            const rotation = 10 * (1 - now);
                            $(this).css('transform', `translateX(${translateX}px) rotate(${rotation}deg)`);
                        },
                        complete: function() {
                            $(this).css('transform', 'translateX(0) rotate(0deg)');
                        }
                    });
                }, delay);
            });
        };

        // Typewriter effect
        $.fn.typeWriter = function(speed = 50, delay = 0) {
            return this.each(function() {
                const $element = $(this);
                const text = $element.text();
                $element.text('');
                
                setTimeout(() => {
                    let i = 0;
                    const timer = setInterval(() => {
                        $element.text(text.slice(0, ++i));
                        if (i === text.length) {
                            clearInterval(timer);
                            $element.addClass('typing-complete');
                        }
                    }, speed);
                }, delay);
            });
        };
    }

    function setupAnimationObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const $element = $(entry.target);
                    const animationType = $element.data('animation');
                    const delay = $element.data('delay') || 0;
                    const duration = $element.data('duration') || 600;

                    executeAnimation($element, animationType, duration, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });

        $('[data-animation]').each(function() {
            observer.observe(this);
        });
    }

    function executeAnimation($element, type, duration, delay) {
        switch (type) {
            case 'fadeInScale':
                $element.fadeInScale(duration, delay);
                break;
            case 'slideInLeft':
                $element.slideInRotate('left', duration, delay);
                break;
            case 'slideInRight':
                $element.slideInRotate('right', duration, delay);
                break;
            case 'typeWriter':
                $element.typeWriter(50, delay);
                break;
            case 'bounceIn':
                $element.addClass('animate__animated animate__bounceIn');
                break;
            default:
                $element.addClass('animate__animated animate__fadeInUp');
        }
    }

    function initializeAnimationSequences() {
        // Hero section sequence
        $('.hero-content').each(function() {
            const $content = $(this);
            const $title = $content.find('.hero-title');
            const $subtitle = $content.find('.hero-subtitle');
            const $buttons = $content.find('.hero-buttons');

            setTimeout(() => {
                $title.fadeInScale(1000);
            }, 500);

            setTimeout(() => {
                $subtitle.slideInRotate('left', 800);
            }, 1000);

            setTimeout(() => {
                $buttons.fadeInScale(600);
            }, 1500);
        });

        // Featured cards stagger animation
        $('.featured-card').each(function(index) {
            $(this).attr('data-animation', 'fadeInScale');
            $(this).attr('data-delay', index * 200);
        });

        // Stats counter sequence
        $('.stat-item').each(function(index) {
            $(this).attr('data-animation', 'bounceIn');
            $(this).attr('data-delay', index * 150);
        });
    }

    /**
     * Particle System
     */
    function initializeParticleSystem() {
        if (isMobile()) return; // Skip on mobile for performance

        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.3';

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: '#D4AF37'
            };
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                particle.opacity += (Math.random() - 0.5) * 0.02;
                particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        initParticles();
        animate();

        window.addEventListener('resize', resizeCanvas);
    }

    /**
     * Scroll-based Animations
     */
    function initializeScrollAnimations() {
        let ticking = false;

        function updateScrollAnimations() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Parallax backgrounds
            $('.hero-background').css('transform', `translateY(${scrollY * 0.5}px)`);
            
            // Fade elements based on scroll
            $('.fade-on-scroll').each(function() {
                const $element = $(this);
                const elementTop = this.offsetTop;
                const elementHeight = this.offsetHeight;
                const opacity = Math.max(0, Math.min(1, 1 - (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight)));
                
                $element.css('opacity', opacity);
            });

            // Scale elements based on scroll
            $('.scale-on-scroll').each(function() {
                const $element = $(this);
                const elementTop = this.offsetTop;
                const progress = Math.max(0, Math.min(1, (scrollY + windowHeight - elementTop) / windowHeight));
                const scale = 0.8 + (0.2 * progress);
                
                $element.css('transform', `scale(${scale})`);
            });

            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestScrollUpdate);
    }

    /**
     * Advanced Hover Effects
     */
    function initializeHoverEffects() {
        // Magnetic hover effect for buttons
        $('.btn-hero').each(function() {
            const $button = $(this);
            
            $button.on('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                $button.css('transform', `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`);
            });
            
            $button.on('mouseleave', function() {
                $button.css('transform', 'translate(0, 0) scale(1)');
            });
        });

        // 3D tilt effect for cards
        $('.featured-card').each(function() {
            const $card = $(this);
            
            $card.on('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);
                
                const rotateX = deltaY * -10;
                const rotateY = deltaX * 10;
                
                $card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`);
            });
            
            $card.on('mouseleave', function() {
                $card.css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)');
            });
        });

        // Ripple effect for clickable elements
        $('.btn, .social-link').on('click', function(e) {
            const $element = $(this);
            const rect = this.getBoundingClientRect();
            const ripple = $('<span class="ripple"></span>');
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.css({
                width: size,
                height: size,
                left: x,
                top: y
            });
            
            $element.append(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    /**
     * Page Transition Effects
     */
    function initializePageTransitions() {
        // Smooth page transitions
        $('a[href]:not([href^="#"]):not([target="_blank"])').on('click', function(e) {
            if (this.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            const href = this.href;
            
            // Create transition overlay
            const $overlay = $('<div class="page-transition-overlay"></div>');
            $('body').append($overlay);
            
            $overlay.animate({ width: '100%' }, 400, 'easeInOutCubic', function() {
                window.location.href = href;
            });
        });

        // Page load animation
        $(window).on('load', function() {
            $('.page-transition-overlay').animate({ width: '0%' }, 400, 'easeInOutCubic', function() {
                $(this).remove();
            });
        });
    }

    /**
     * Loading Animations
     */
    function initializeLoadingAnimations() {
        // Enhanced loading screen
        const $loadingScreen = $('#loading-screen');
        
        if ($loadingScreen.length) {
            // Add animated elements to loading screen
            const $waves = $('<div class="loading-waves"></div>');
            for (let i = 0; i < 3; i++) {
                $waves.append(`<div class="loading-wave" style="animation-delay: ${i * 0.2}s"></div>`);
            }
            
            $loadingScreen.find('.loading-content').append($waves);
        }

        // Content reveal animations
        $('.content-section').each(function(index) {
            $(this).css({
                opacity: 0,
                transform: 'translateY(50px)'
            });
            
            setTimeout(() => {
                $(this).animate({
                    opacity: 1
                }, {
                    duration: 800,
                    step: function(now) {
                        const translateY = 50 * (1 - now);
                        $(this).css('transform', `translateY(${translateY}px)`);
                    }
                });
            }, index * 200 + 500);
        });
    }

    /**
     * Text Animations
     */
    function initializeTextAnimations() {
        // Animated text reveal
        $('.animate-text').each(function() {
            const $element = $(this);
            const text = $element.text();
            const words = text.split(' ');
            
            $element.empty();
            
            words.forEach((word, index) => {
                const $word = $(`<span class="animated-word" style="animation-delay: ${index * 0.1}s">${word}</span>`);
                $element.append($word);
                if (index < words.length - 1) {
                    $element.append(' ');
                }
            });
        });

        // Glitch effect for special text
        $('.glitch-text').each(function() {
            const $element = $(this);
            const originalText = $element.text();
            
            setInterval(() => {
                if (Math.random() < 0.1) {
                    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                    let glitchedText = '';
                    
                    for (let i = 0; i < originalText.length; i++) {
                        if (Math.random() < 0.1) {
                            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        } else {
                            glitchedText += originalText[i];
                        }
                    }
                    
                    $element.text(glitchedText);
                    
                    setTimeout(() => {
                        $element.text(originalText);
                    }, 50);
                }
            }, 2000);
        });
    }

    /**
     * Music Visualization Effects
     */
    function initializeMusicVisualization() {
        // Audio visualizer effect for music-related elements
        const createVisualizer = ($container) => {
            const bars = 20;
            const $visualizer = $('<div class="audio-visualizer"></div>');
            
            for (let i = 0; i < bars; i++) {
                const $bar = $('<div class="visualizer-bar"></div>');
                $bar.css('animation-delay', `${i * 0.1}s`);
                $visualizer.append($bar);
            }
            
            $container.append($visualizer);
        };

        $('.music-element').each(function() {
            createVisualizer($(this));
        });

        // Pulsing effect for music buttons
        $('.music-btn').each(function() {
            const $button = $(this);
            
            setInterval(() => {
                $button.addClass('pulse');
                setTimeout(() => {
                    $button.removeClass('pulse');
                }, 1000);
            }, 3000);
        });
    }

    /**
     * Utility Functions
     */
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Export animation functions for external use
    window.MartoneAnimations = {
        fadeInScale: function($element, duration, delay) {
            $element.fadeInScale(duration, delay);
        },
        slideInRotate: function($element, direction, duration, delay) {
            $element.slideInRotate(direction, duration, delay);
        },
        typeWriter: function($element, speed, delay) {
            $element.typeWriter(speed, delay);
        }
    };

})(jQuery);

/**
 * CSS Animations (to be added to main.css)
 */
const additionalCSS = `
/* Animation-specific styles */
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 100vh;
    background: linear-gradient(135deg, #D4AF37, #CD7F32);
    z-index: 10000;
    pointer-events: none;
}

.loading-waves {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
}

.loading-wave {
    width: 8px;
    height: 40px;
    background: linear-gradient(to top, #D4AF37, #FFD700);
    animation: waveAnimation 1.5s ease-in-out infinite;
}

@keyframes waveAnimation {
    0%, 100% {
        transform: scaleY(0.5);
    }
    50% {
        transform: scaleY(1);
    }
}

.animated-word {
    display: inline-block;
    animation: wordReveal 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes wordReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.glitch-text {
    position: relative;
}

.audio-visualizer {
    display: flex;
    align-items: end;
    height: 40px;
    gap: 2px;
    margin: 10px 0;
}

.visualizer-bar {
    width: 3px;
    height: 100%;
    background: linear-gradient(to top, #D4AF37, #FFD700);
    animation: visualizerPulse 1s ease-in-out infinite;
}

@keyframes visualizerPulse {
    0%, 100% {
        transform: scaleY(0.3);
    }
    50% {
        transform: scaleY(1);
    }
}

.pulse {
    animation: pulseEffect 1s ease-in-out;
}

@keyframes pulseEffect {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
    }
}

/* Particle canvas styling */
#particle-canvas {
    background: transparent;
}

/* Custom cursor styles */
.custom-cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background: #D4AF37;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
}

.custom-cursor-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid rgba(212, 175, 55, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.3s ease;
}

.cursor-hover {
    transform: scale(2);
}

/* Performance optimizations */
.will-change-transform {
    will-change: transform;
}

.will-change-opacity {
    will-change: opacity;
}

/* Scroll progress bar */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #D4AF37, #FFD700);
    z-index: 1001;
    transition: width 0.1s ease;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
