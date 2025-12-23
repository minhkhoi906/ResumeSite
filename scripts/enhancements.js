/**
 * Portfolio Enhancement Scripts
 * Handles smooth scrolling, active navigation states, component loading, and other interactive features
 */

(function() {
    'use strict';

    /**
     * Component templates - embedded for GitHub Pages compatibility
     */
    const COMPONENTS = {
        header: `<header>
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand brand-name" href="index.html" data-home-link>Khoi Nguyen</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a class="nav-link headerachor" href="index.html" data-nav-link="home">Home</a></li>
                <li class="nav-item"><a class="nav-link headerachor" href="html/career.path.html" data-nav-link="resume">Resume</a></li>
                <li class="nav-item"><a class="nav-link headerachor" href="html/projects.html" data-nav-link="projects">Projects</a></li>
                <li class="nav-item"><a class="nav-link headerachor" href="html/contact.html" data-nav-link="contact">Contact</a></li>
            </ul>
        </div>
    </nav>
</header>`,
        footer: `<footer class="row justify-content-center">
    <div class="col-lg-4 col-md-4">
        <p>© 2025 By Khoi Nguyen.</p>
    </div>
</footer>`
    };

    /**
     * Load header and footer components dynamically
     */
    function loadComponents() {
        // Determine base path (root or subdirectory)
        const isRootPage = window.location.pathname === '/' ||
                          window.location.pathname.endsWith('/index.html') ||
                          window.location.pathname === '/index.html';

        // Load header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = COMPONENTS.header;

            // Fix navigation links for current page context
            fixNavigationLinks(isRootPage);

            // Set active navigation after header is loaded
            setActiveNavLink();
        }

        // Load footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = COMPONENTS.footer;
        }
    }

    /**
     * Fix navigation links based on current page location
     */
    function fixNavigationLinks(isRootPage) {
        const links = document.querySelectorAll('[data-nav-link], [data-home-link]');

        links.forEach(link => {
            const href = link.getAttribute('href');

            if (!isRootPage && href) {
                // For pages in subdirectories (like html/), add ../ prefix
                link.setAttribute('href', '../' + href);
            }
        });
    }

    /**
     * Highlight active navigation link based on current page
     */
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');

            // Normalize paths for comparison
            const normalizedCurrent = currentPath.replace(/^\/+|\/+$/g, '');
            const normalizedLink = linkPath.replace(/^\.\.\/|^\/+|\/+$/g, '');

            // Check if current page matches link
            if (normalizedCurrent.includes(normalizedLink) && linkPath !== '#') {
                link.style.fontWeight = 'bold';
                link.style.color = '#3498db';
            } else if (normalizedCurrent === '' && normalizedLink === 'index.html') {
                // Handle root index page
                link.style.fontWeight = 'bold';
                link.style.color = '#3498db';
            }
        });
    }

    /**
     * Add animation to elements on scroll
     */
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-1, .feature-2, .timeline-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    /**
     * Add back to top button
     */
    function addBackToTop() {
        // Create button
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;

        document.body.appendChild(button);

        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.background = '#2980b9';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = '#3498db';
        });
    }

    /**
     * Improve form validation if contact form exists
     */
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });
    }

    /**
     * Add loading state to external links
     */
    function enhanceExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            // Add security attributes if not present
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    /**
     * Initialize all enhancements when DOM is ready
     */
    function init() {
        // Load components first
        loadComponents();

        // Then initialize other features
        animateOnScroll();
        addBackToTop();
        enhanceFormValidation();
        enhanceExternalLinks();
    }

    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
