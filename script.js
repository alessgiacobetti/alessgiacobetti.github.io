document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const emailAddress = "alessgiacobetti@proton.me"; //
    const linksData = [
        { text: 'LinkedIn', url: "https://www.linkedin.com/in/alessandrogiacobetti/", target: "_blank" }, //
        { text: 'GitHub', url: "https://github.com/alessgiacobetti", target: "_blank" }, //
        { text: 'Mail', url: '#', id: 'email-link' } // Special handling for Mail //
    ];
    const initialDelay = 500; // ms delay before first element fades in
    const staggerDelay = 250; // ms delay between subsequent elements fading in

    // DOM Elements
    const container = document.getElementById('container'); //
    const heading = document.querySelector('.heading'); //
    const description = document.querySelector('.description'); //

    // --- Function to create and append link elements ---
    function createLinkElement(linkData, index) {
        const link = document.createElement('a'); //
        link.textContent = linkData.text; //
        link.href = linkData.url; //
        link.classList.add('dynamic-link'); // Add class for styling and transition

        if (linkData.target) {
            link.target = linkData.target; //
        }
        if (linkData.id === 'email-link') {
            link.classList.add('email-link'); // Specific class for email //
            setupEmailLinkInteraction(link); //
        }

        container.appendChild(link); //

        // Stagger the appearance of the link
        setTimeout(() => {
            link.classList.add('visible'); //
        }, initialDelay + (index + 2) * staggerDelay); // +2 to start after heading/desc
    }

    // --- Function to handle email link interactions ---
    let copiedTimeoutId = null; // Use let as it will be reassigned

    function setupEmailLinkInteraction(link) {
        let isEmailVisible = false;
        const originalLinkText = link.textContent; // Store the initial text "Mail"

        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior //

            if (!isEmailVisible) {
                // First click: Show email
                link.textContent = emailAddress; //
                isEmailVisible = true;
                link.title = "Click to copy email"; // Set tooltip
            } else {
                // Subsequent clicks (while email is visible): Copy email
                navigator.clipboard.writeText(emailAddress).then(() => { //
                    // Success feedback
                    link.textContent = "Copied"; //
                    link.title = ""; // Clear tooltip during "Copied"

                    // Clear any existing timeout to prevent conflicts
                    clearTimeout(copiedTimeoutId); //

                    // Revert back to "Mail" after a delay
                    copiedTimeoutId = setTimeout(() => {
                        link.textContent = originalLinkText; // Revert to "Mail"
                        link.title = "Click to show email"; // Reset title
                        isEmailVisible = false; // Reset state
                    }, 1500); // Show "Copied" for 1.5 seconds

                }).catch(err => {
                    // Basic error handling
                    console.error("Failed to copy email: ", err);
                    link.title = "Failed to copy. Please copy manually.";
                    // Optionally provide visual feedback for failure - revert?
                    // Consider reverting to email or Mail here on error
                    // For now, just keep the email visible on error
                    link.textContent = emailAddress; //
                    isEmailVisible = true; // Keep state as email visible
                });
            }
        });

        // Hover effects for the email link
        link.addEventListener('mouseenter', () => {
            // Show "Click to copy" only when the email is currently displayed
            if (isEmailVisible && link.textContent === emailAddress) { //
                link.textContent = "Click to copy"; //
            }
        });

        link.addEventListener('mouseleave', () => {
            // If the text is "Click to copy", revert to the email address
            // because the mouse left before clicking to copy.
            if (link.textContent === "Click to copy") { //
                link.textContent = emailAddress; //
            }
            // If the text is "Copied", the timeout will handle reverting it.
            // If the text is the email address, leave it as is.
            // If the text is "Mail", leave it as is.
        });
    }

    // --- Initial Setup ---

    // Fade in Heading and Description first
    setTimeout(() => {
        heading.classList.add('visible'); //
    }, initialDelay);

    setTimeout(() => {
        description.classList.add('visible'); //
    }, initialDelay + staggerDelay);

    // Create and fade in links
    linksData.forEach((linkData, index) => {
        createLinkElement(linkData, index); //
    });
});