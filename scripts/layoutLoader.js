let currentPage = "";

/**
 * Loads an external HTML file into a specified element.
 * @param {string} url - The URL of the HTML file to load.
 * @param {string} elementId - The ID of the element where content will be inserted.
 */
function loadLayout(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.text();
        })
        .then(data => document.getElementById(elementId).innerHTML = data)
        .catch(error => console.error("Error loading content:", error));
}

/**
 * Loads a new page inside the #items section with a fade effect.
 * @param {string} page - The URL of the page to load.
 */
function loadContent(page) {
    if (currentPage === page) return; // Prevent reloading if already loaded
    currentPage = page;

    let content = document.getElementById('content'); // Load content inside #items div
    content.classList.add("fade-out");

    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${page}`);
            return response.text();
        })
        .then(data => {
            setTimeout(() => {
                content.innerHTML = data;
                content.classList.remove("fade-out");
                updateActiveNav(page); // Highlight current page
            }, 500);
        })
        .catch(error => console.error("Error loading content:", error));
}

function updateActiveNav(page) {
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("data-page") === page) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}