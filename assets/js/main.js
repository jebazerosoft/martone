/**
 * Main JavaScript file for Martone website
 * Handles core functionality, navigation, and user interactions
 */

$(document).ready(function () {
    "use strict";

    // Define custom easing functions for jQuery
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t + 2) + b;
    };

    // Initialize all components
    initializeLoader();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeStats();
    initializeNewsletter();
    initializeSocialSidebar();
    initializeBackToTop();
    initializeImageLazyLoading();

    /**
     * Loading Screen Management
     */
    function initializeLoader() {
        const $loader = $("#loading-screen");
        const $body = $("body");

        // Hide loader after page load
        $(window).on("load", function () {
            setTimeout(function () {
                $loader.addClass("loaded");
                $body.removeClass("loading");

                // Remove loader from DOM after animation
                setTimeout(function () {
                    $loader.remove();
                }, 500);
            }, 1000);
        });

        // Fallback: Hide loader after 3 seconds
        setTimeout(function () {
            if ($loader.length) {
                $loader.addClass("loaded");
                setTimeout(function () {
                    $loader.remove();
                }, 500);
            }
        }, 3000);
    }

    /**
     * Navigation Functionality
     */
    function initializeNavigation() {
        const $navbar = $(".navbar");
        const $navLinks = $(".navbar-nav .nav-link");
        const $navToggler = $(".navbar-toggler");
        const $navCollapse = $(".navbar-collapse");

        // Navbar scroll effect
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 50) {
                $navbar.addClass("scrolled");
            } else {
                $navbar.removeClass("scrolled");
            }
        });

        // Active nav link highlighting
        $navLinks.on("click", function () {
            $navLinks.removeClass("active");
            $(this).addClass("active");
        });

        // Mobile navigation
        $navToggler.on("click", function () {
            $(this).toggleClass("collapsed");
        });

        // Close mobile nav when clicking outside
        $(document).on("click", function (e) {
            if (!$(e.target).closest(".navbar").length) {
                $navCollapse.removeClass("show");
                $navToggler.addClass("collapsed");
            }
        });

        // Smooth scroll for anchor links
        $('a[href^="#"]').on("click", function (e) {
            const target = $(this.getAttribute("href"));
            if (target.length) {
                e.preventDefault();
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 80,
                    },
                    800,
                    "easeInOutCubic",
                );
            }
        });
    }

    /**
     * Scroll Effects and Animations
     */
    function initializeScrollEffects() {
        const $window = $(window);
        const $elements = $("[data-animate]");

        // Intersection Observer for scroll animations
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            const $element = $(entry.target);
                            const animationType =
                                $element.data("animate") || "fadeInUp";

                            $element.addClass(
                                "animate__animated animate__" + animationType,
                            );
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px",
                },
            );

            $elements.each(function () {
                observer.observe(this);
            });
        }

        // Parallax effect for hero section
        $window.on("scroll", function () {
            const scrollTop = $window.scrollTop();
            const $heroBackground = $(".hero-background");

            if ($heroBackground.length) {
                const parallaxSpeed = 0.5;
                $heroBackground.css(
                    "transform",
                    `translateY(${scrollTop * parallaxSpeed}px)`,
                );
            }
        });

        // Scroll progress indicator
        const $progressBar = $('<div class="scroll-progress"></div>');
        $("body").append($progressBar);

        $window.on("scroll", function () {
            const windowHeight = $window.height();
            const documentHeight = $(document).height();
            const scrollTop = $window.scrollTop();
            const progress =
                (scrollTop / (documentHeight - windowHeight)) * 100;

            $progressBar.css("width", progress + "%");
        });
    }

    /**
     * General Animations
     */
    function initializeAnimations() {
        // Hover effects for cards
        $(".featured-card")
            .on("mouseenter", function () {
                $(this).find(".image-placeholder").addClass("hovered");
            })
            .on("mouseleave", function () {
                $(this).find(".image-placeholder").removeClass("hovered");
            });

        // Button hover effects
        $(".btn-hero")
            .on("mouseenter", function () {
                $(this).addClass("hovered");
            })
            .on("mouseleave", function () {
                $(this).removeClass("hovered");
            });

        // Social link animations
        $(".social-link")
            .on("mouseenter", function () {
                $(this).siblings().addClass("dimmed");
            })
            .on("mouseleave", function () {
                $(this).siblings().removeClass("dimmed");
            });

        // Floating elements animation
        $(".floating-element").each(function (index) {
            const $element = $(this);
            const delay = index * 500;

            setTimeout(function () {
                $element.addClass("floating");
            }, delay);
        });
    }

    /**
     * Statistics Counter Animation
     */
    function initializeStats() {
        const $statNumbers = $(".stat-number");

        function animateStats() {
            $statNumbers.each(function () {
                const $this = $(this);
                const target = parseInt($this.data("target"));
                const duration = 2000;
                const startTime = Date.now();

                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(target * easeOutCubic(progress));

                    $this.text(current);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        $this.text(target);
                    }
                }

                updateCounter();
            });
        }

        // Trigger animation when stats section comes into view
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animateStats();
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 },
            );

            const statsSection = document.querySelector(".stats-section");
            if (statsSection) {
                observer.observe(statsSection);
            }
        }
    }

    /**
     * Newsletter Subscription
     */
    function initializeNewsletter() {
        const $form = $("#newsletterForm");
        const $input = $form.find('input[type="email"]');
        const $button = $form.find('button[type="submit"]');
        const originalButtonText = $button.html();

        $form.on("submit", function (e) {
            e.preventDefault();

            const email = $input.val().trim();

            if (!isValidEmail(email)) {
                showNotification(
                    "Please enter a valid email address.",
                    "error",
                );
                return;
            }

            // Disable form during submission
            $button.prop("disabled", true);
            $button.html(
                '<i class="fas fa-spinner fa-spin"></i> Subscribing...',
            );

            // Simulate API call
            setTimeout(function () {
                showNotification(
                    "Thank you for subscribing! You'll receive updates soon.",
                    "success",
                );
                $input.val("");
                $button.prop("disabled", false);
                $button.html(originalButtonText);

                // Add subscription success animation
                $form.addClass("subscription-success");
                setTimeout(function () {
                    $form.removeClass("subscription-success");
                }, 3000);
            }, 1500);
        });

        // Real-time email validation
        $input.on("input", function () {
            const email = $(this).val().trim();
            const $formControl = $(this);

            if (email.length > 0) {
                if (isValidEmail(email)) {
                    $formControl.addClass("is-valid").removeClass("is-invalid");
                } else {
                    $formControl.addClass("is-invalid").removeClass("is-valid");
                }
            } else {
                $formControl.removeClass("is-valid is-invalid");
            }
        });
    }

    /**
     * Social Sidebar Functionality
     */
    function initializeSocialSidebar() {
        const $socialMore = $(".social-more");
        const $socialLinks = $(".social-sidebar .social-link");
        let isExpanded = false;

        $socialMore.on("click", function () {
            isExpanded = !isExpanded;

            if (isExpanded) {
                $socialLinks.addClass("expanded");
                $(this).addClass("active");
            } else {
                $socialLinks.removeClass("expanded");
                $(this).removeClass("active");
            }
        });

        // Share functionality
        $socialLinks.on("click", function (e) {
            e.preventDefault();
            const platform = $(this).data("platform");
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            let shareUrl = "";

            switch (platform) {
                case "facebook":
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case "twitter":
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case "linkedin":
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                default:
                    return;
            }

            if (shareUrl) {
                window.open(
                    shareUrl,
                    "share",
                    "width=600,height=400,scrollbars=yes,resizable=yes",
                );
            }
        });
    }

    /**
     * Back to Top Button
     */
    function initializeBackToTop() {
        const $backToTop = $("#backToTop");
        const $window = $(window);

        $window.on("scroll", function () {
            if ($window.scrollTop() > 500) {
                $backToTop.addClass("visible");
            } else {
                $backToTop.removeClass("visible");
            }
        });

        $backToTop.on("click", function () {
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                800,
                "easeInOutCubic",
            );
        });
    }

    /**
     * Lazy Loading for Images
     */
    function initializeImageLazyLoading() {
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;

                        if (src) {
                            img.src = src;
                            img.classList.add("loaded");
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll("img[data-src]").forEach(function (img) {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Utility Functions
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = "info") {
        const $notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);

        $("body").append($notification);

        setTimeout(function () {
            $notification.addClass("show");
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(function () {
            removeNotification($notification);
        }, 5000);

        // Close button functionality
        $notification.find(".notification-close").on("click", function () {
            removeNotification($notification);
        });
    }

    function removeNotification($notification) {
        $notification.removeClass("show");
        setTimeout(function () {
            $notification.remove();
        }, 300);
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    /**
     * Custom Cursor Effect (Desktop only)
     */
    if (!isMobile()) {
        initializeCustomCursor();
    }

    function initializeCustomCursor() {
        const $cursor = $('<div class="custom-cursor"></div>');
        const $cursorFollower = $('<div class="custom-cursor-follower"></div>');

        $("body").append($cursor).append($cursorFollower);

        $(document).on("mousemove", function (e) {
            $cursor.css({
                left: e.clientX,
                top: e.clientY,
            });

            $cursorFollower.css({
                left: e.clientX,
                top: e.clientY,
            });
        });

        // Cursor interactions
        $("a, button, .clickable")
            .on("mouseenter", function () {
                $cursor.addClass("cursor-hover");
                $cursorFollower.addClass("cursor-hover");
            })
            .on("mouseleave", function () {
                $cursor.removeClass("cursor-hover");
                $cursorFollower.removeClass("cursor-hover");
            });
    }

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    }

    /**
     * Performance Monitoring
     */
    function initializePerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener("load", function () {
            setTimeout(function () {
                const perfData = performance.getEntriesByType("navigation")[0];
                const loadTime =
                    perfData.loadEventEnd - perfData.loadEventStart;

                console.log("Page load time:", loadTime + "ms");

                // Log performance metrics (in production, send to analytics)
                if (loadTime > 3000) {
                    console.warn("Page load time is above optimal threshold");
                }
            }, 0);
        });
    }

    initializePerformanceMonitoring();

    /**
     * Accessibility Enhancements
     */
    function initializeAccessibility() {
        // Skip to content functionality
        const $skipLink = $(
            '<a href="#main-content" class="skip-link">Skip to main content</a>',
        );
        $("body").prepend($skipLink);

        // Keyboard navigation for custom elements
        $(".social-link, .btn-hero").on("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                $(this).click();
            }
        });

        // Focus management for mobile menu
        $(".navbar-toggler").on("click", function () {
            setTimeout(function () {
                if ($(".navbar-collapse").hasClass("show")) {
                    $(".navbar-nav .nav-link:first").focus();
                }
            }, 100);
        });

        // High contrast mode detection
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-contrast: high)").matches
        ) {
            $("body").addClass("high-contrast");
        }

        // Reduced motion detection
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            $("body").addClass("reduced-motion");
        }
    }

    initializeAccessibility();
});

/**
 * Global Error Handling
 */
window.addEventListener("error", function (e) {
    console.error("Global error:", e.error);
    // In production, send error to logging service
});

window.addEventListener("unhandledrejection", function (e) {
    console.error("Unhandled promise rejection:", e.reason);
    // In production, send error to logging service
});
