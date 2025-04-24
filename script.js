document.addEventListener('DOMContentLoaded', () => {

    // --- Page Transition Logic ---
    const overlay = document.getElementById('page-transition-overlay');
    // Use CSS variable for duration, fallback to 300ms
    const transitionDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-duration') || '0.3s') * 1000;

    function fadeInPage() {
        if (overlay) {
            overlay.classList.remove('fade-out'); // Ensure fade-out isn't stuck
            overlay.classList.add('fade-in');    // Make overlay disappear
        }
        // Ensure body content is visible
        document.body.classList.remove('fade-out-content');
        // --- Trigger Homepage Animations ---
        // Check if we are on the homepage after the page fades in
        const homeContainer = document.getElementById('container');
        if (homeContainer) {
            // Delay slightly after page transition starts
             setTimeout(triggerHomepageAnimations, 50); // Small delay after transition starts
        }
    }

    function fadeOutPageAndNavigate(url) {
        if (overlay) {
            overlay.classList.remove('fade-in'); // Prepare for fade-out
            overlay.classList.add('fade-out');   // Make overlay appear
        }
        // Fade out body content
        document.body.classList.add('fade-out-content');

        // Wait for the transition, then navigate
        setTimeout(() => {
            window.location.href = url;
        }, transitionDuration);
    }

    // Handle clicks on internal links for fade-out effect
    function attachLinkListeners() {
        const internalLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto:"]):not([target="_blank"])');
        internalLinks.forEach(link => {
            // Remove existing listener to prevent duplicates if this runs multiple times
            link.removeEventListener('click', handleLinkClick);
            // Add the listener
            link.addEventListener('click', handleLinkClick);
        });
    }

    function handleLinkClick(event) {
         const href = event.currentTarget.getAttribute('href');
         // Basic check if it's a relative or root-relative link
         if (href && (href.startsWith('/') || !href.includes(':'))) {
             event.preventDefault(); // Prevent immediate navigation
             fadeOutPageAndNavigate(href);
         }
    }

    // Attach listeners initially
    attachLinkListeners();

    // Handle browser back/forward navigation
    window.addEventListener('pageshow', function(event) {
        // event.persisted is true if loaded from bfcache
        // Always ensure the page fades in on show, especially vital for bfcache
        fadeInPage();
    });

    // Initial page load fade-in
    fadeInPage();
    // --- End Page Transition Logic ---


    // --- Homepage Animation Logic ---
    function triggerHomepageAnimations() {
        const homeContainer = document.getElementById('container');
        // Check if the container exists (we should be on the homepage)
        if (homeContainer) {
            // Configuration
            const emailAddress = "alessgiacobetti@proton.me";
            const linksData = [
                { text: 'LinkedIn', url: "https://www.linkedin.com/in/alessandrogiacobetti/", target: "_blank" },
                { text: 'GitHub', url: "https://github.com/alessgiacobetti", target: "_blank" },
                { text: 'Mail', url: '#', id: 'email-link' }
            ];
            const initialDelay = 100; // Reduced delay after page fade-in starts
            const staggerDelay = 250;

            // DOM Elements
            const heading = homeContainer.querySelector('.heading');
            const description = homeContainer.querySelector('.description');

            // Function to create links (modified slightly)
            function createLinkElement(linkData, index) {
                const link = document.createElement('a');
                link.textContent = linkData.text;
                link.href = linkData.url;
                link.classList.add('dynamic-link'); // Keep class for styling/selection
                link.style.opacity = 0; // Start hidden for JS fade-in

                if (linkData.target) {
                    link.target = linkData.target;
                } else if (linkData.id === 'email-link') {
                    link.classList.add('email-link');
                    setupEmailLinkInteraction(link);
                } else {
                    // It's an internal link, ensure transition listener is attached
                    link.addEventListener('click', handleLinkClick);
                }
                homeContainer.appendChild(link);

                // Stagger the appearance using JS transition
                setTimeout(() => {
                     link.style.transition = `opacity ${getComputedStyle(document.documentElement).getPropertyValue('--fade-in-duration') || '0.5s'} ease-in-out`;
                     link.style.opacity = 1; // Fade in
                 }, initialDelay + (index + 2) * staggerDelay);
            }

            // Function to handle email link interaction (no changes needed here)
            let copiedTimeoutId = null;
            function setupEmailLinkInteraction(link) {
                 let isEmailVisible = false;
                 const originalLinkText = link.textContent;
                 link.addEventListener('click', (event) => {
                     event.preventDefault();
                     if (!isEmailVisible) {
                         link.textContent = emailAddress;
                         isEmailVisible = true;
                         link.title = "Click to copy email";
                     } else {
                         navigator.clipboard.writeText(emailAddress).then(() => {
                             link.textContent = "Copied";
                             link.title = "";
                             clearTimeout(copiedTimeoutId);
                             copiedTimeoutId = setTimeout(() => {
                                 link.textContent = originalLinkText;
                                 link.title = "Click to show email";
                                 isEmailVisible = false;
                             }, 1500);
                         }).catch(err => {
                             console.error("Failed to copy email: ", err);
                             link.title = "Failed to copy. Please copy manually.";
                             link.textContent = emailAddress;
                             isEmailVisible = true;
                         });
                     }
                 });
                 link.addEventListener('mouseenter', () => { if (isEmailVisible && link.textContent === emailAddress) { link.textContent = "Click to copy"; } });
                 link.addEventListener('mouseleave', () => { if (link.textContent === "Click to copy") { link.textContent = emailAddress; } });
            }

            // Initial Setup for homepage fade-in
            function fadeInElement(element, delay) {
                 if (element) {
                     element.style.opacity = 0; // Ensure starts hidden
                     setTimeout(() => {
                         element.style.transition = `opacity ${getComputedStyle(document.documentElement).getPropertyValue('--fade-in-duration') || '0.5s'} ease-in-out`;
                         element.style.opacity = 1; // Fade in
                     }, delay);
                 }
            }

            fadeInElement(heading, initialDelay);
            fadeInElement(description, initialDelay + staggerDelay);

            // Clear existing dynamic links before creating new ones
            homeContainer.querySelectorAll('.dynamic-link').forEach(el => el.remove());
            linksData.forEach((linkData, index) => {
                createLinkElement(linkData, index);
            });
        }
    }
     // --- End Homepage Animation Logic ---

}); // End of DOMContentLoaded