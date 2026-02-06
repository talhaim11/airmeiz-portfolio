/**
 * AIRMEIZ - Main JavaScript
 * Pure vanilla JavaScript - No external libraries
 */

(function() {
  'use strict';

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileMenuToggle || !navMenu) return;

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ==========================================
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore if href is just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class when scrolled down
        if (scrollTop > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
      }, 10);
    });
  }

  // ==========================================
  // ACTIVE NAV LINK ON SCROLL
  // ==========================================
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset + 200;

      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // ==========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ==========================================
  function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const animatedElements = document.querySelectorAll(
      '.project-tile, .service-card, .team-member'
    );

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          
          setTimeout(function() {
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function(element) {
      observer.observe(element);
    });
  }

  // ==========================================
  // PROJECT TILE CLICK HANDLER
  // ==========================================
  function initProjectTiles() {
    const projectTiles = document.querySelectorAll('.project-tile');

    projectTiles.forEach(function(tile) {
      tile.addEventListener('click', function(e) {
        e.preventDefault();
        const projectUrl = this.getAttribute('data-project-url');
        
        if (projectUrl) {
          window.location.href = projectUrl;
        }
      });

      // Add keyboard accessibility
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      
      tile.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  // ==========================================
  // CONTACT FORM PLACEHOLDER
  // (Future implementation for lead collection)
  // ==========================================
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // TODO: Implement form submission logic
      // This will connect to an API endpoint in the future
      // For now, just show a console message
      
      console.log('Form submission prevented - API integration pending');
      
      // Future implementation will include:
      // 1. Form validation
      // 2. API call to backend/serverless function
      // 3. Success/error handling
      // 4. User feedback (success message or error)
      
      alert('Thank you for your interest! Form submission will be implemented in the next phase.');
    });
  }

  // ==========================================
  // VIDEO HOVER PREVIEW (FUTURE FEATURE)
  // ==========================================
  /*
  function initVideoHoverPreview() {
    const projectTiles = document.querySelectorAll('.project-tile');

    projectTiles.forEach(function(tile) {
      const video = tile.querySelector('.project-tile-video');
      
      if (!video) return;

      tile.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) { // Desktop only
          video.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
          });
        }
      });

      tile.addEventListener('mouseleave', function() {
        video.pause();
        video.currentTime = 0;
      });
    });
  }
  */

  // ==========================================
  // UTILITY: Debounce Function
  // ==========================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // ==========================================
  // UTILITY: Throttle Function
  // ==========================================
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // ==========================================
  // LAZY LOADING FOR IMAGES (FUTURE)
  // ==========================================
  /*
  function initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
  */

  // ==========================================
  // ANALYTICS PLACEHOLDER (FUTURE)
  // ==========================================
  /*
  function initAnalytics() {
    // Track page views
    // Track button clicks
    // Track form submissions
    // Integration with Google Analytics, Mixpanel, etc.
  }
  */

  // ==========================================
  // PERFORMANCE: Optimize scroll events
  // ==========================================
  const optimizedScroll = throttle(function() {
    // Add any scroll-based functionality here
  }, 100);

  window.addEventListener('scroll', optimizedScroll);

  // ==========================================
  // INITIALIZE ALL FUNCTIONS
  // ==========================================
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        runInit();
      });
    } else {
      runInit();
    }
  }

  function runInit() {
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initActiveNavLink();
    initScrollAnimations();
    initProjectTiles();
    initContactForm();
    
    // Future features (uncomment when ready):
    // initVideoHoverPreview();
    // initLazyLoading();
    // initAnalytics();
    
    console.log('AIRMEIZ website initialized successfully');
  }

  // Start initialization
  init();

  // ==========================================
  // EXPOSE PUBLIC API (if needed)
  // ==========================================
  window.AIRMEIZ = {
    version: '1.0.0',
    init: init
  };

})();
