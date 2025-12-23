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
        <a class="navbar-brand brand-name" href="#home" data-page="/">Khoi Nguyen</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a class="nav-link headerachor" href="#home" data-page="/">Home</a></li>
                <li class="nav-item"><a class="nav-link headerachor" href="#resume" data-page="/html/career.path.html">Resume</a></li>
                <li class="nav-item"><a class="nav-link headerachor" href="#projects" data-page="/html/projects.html">Projects</a></li>
                <li class="nav-item"><a class="nav-link headerachor" href="#contact" data-page="/html/contact.html">Contact</a></li>
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
        // Load header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = COMPONENTS.header;

            // Fix navigation links for current page context
            fixNavigationLinks();

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
     * Converts absolute paths to relative paths based on current directory depth
     */
    function fixNavigationLinks() {
        // Get current path and calculate directory depth
        const currentPath = window.location.pathname;

        // Remove the filename to get just the directory path
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));

        // Calculate depth (number of directories deep from root)
        // Empty or '/' means depth 0 (at root)
        const depth = currentDir === '' || currentDir === '/' ? 0 : currentDir.split('/').filter(seg => seg).length;

        const links = document.querySelectorAll('[data-page]');

        links.forEach(link => {
            const targetPath = link.getAttribute('data-page');

            if (targetPath === '/') {
                // Link to home page
                if (depth === 0) {
                    link.setAttribute('href', 'index.html');
                } else {
                    link.setAttribute('href', '../'.repeat(depth) + 'index.html');
                }
            } else {
                // Link to other pages
                const cleanPath = targetPath.replace(/^\//, ''); // Remove leading slash

                if (depth === 0) {
                    // We're at root, use path as-is
                    link.setAttribute('href', cleanPath);
                } else {
                    // We're in subdirectory, go up then to target
                    link.setAttribute('href', '../'.repeat(depth) + cleanPath);
                }
            }
        });
    }

    /**
     * Highlight active navigation link based on current page
     */
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('[data-page]');

        navLinks.forEach(link => {
            const targetPage = link.getAttribute('data-page');

            // Normalize current path
            let normalizedCurrent = currentPath.replace(/^\/+|\/+$/g, '');
            if (normalizedCurrent === '' || normalizedCurrent === 'index.html') {
                normalizedCurrent = '/';
            } else if (!normalizedCurrent.startsWith('/')) {
                normalizedCurrent = '/' + normalizedCurrent;
            }

            // Check if current page matches target
            if (targetPage === normalizedCurrent ||
                (targetPage === '/' && (currentPath === '/' || currentPath.endsWith('index.html')))) {
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
