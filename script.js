document.addEventListener("DOMContentLoaded", function() {
    const links = ['LinkedIn', 'GitHub', 'Mail']; // Links in desired order
	const container = document.getElementById('container');

	const heading = document.querySelector('.heading');
	const description = document.querySelector('.description');

	setTimeout(() => {
		heading.classList.add('visible');
	}, 750); // Delay heading

	setTimeout(() => {
		description.classList.add('visible');
	}, 1250); // Delay description

	
	

    links.forEach((linkText, index) => {
        const link = document.createElement('a');
        if (linkText === 'Mail') {
            link.href = "#"; // Use # as href for Mail link
            link.textContent = linkText; // Initial text is "Mail"
            link.classList.add('email-link'); // Add a class for email links
        } else {
            link.href = linkText === 'LinkedIn' ? "https://www.linkedin.com/in/alessandrogiacobetti/" : "https://github.com/alessgiacobetti";
            link.target = "_blank";
            link.textContent = linkText;
        }
        container.appendChild(link);

        // Delay appearance of each link
        setTimeout(() => {
            link.classList.add('visible');
        }, (index + 3.5) * 500); // Start delay from the second link
    });

    // Add event listener to handle click events on email links
    document.querySelectorAll('.email-link').forEach(link => {
        let email = "alessgiacobetti@proton.me"; // Replace with your email address
        let copiedTextTimeout;

        link.addEventListener('click', function(event) {
            event.preventDefault();

            if (link.textContent === "Mail") { // Check if the link text is "Mail"
                link.textContent = email;
                link.title = "Click to copy"; // Set the title attribute
            } else {
                navigator.clipboard.writeText(email);
                link.textContent = "Copied";
                clearTimeout(copiedTextTimeout);
                copiedTextTimeout = setTimeout(() => {
                    link.textContent = email;
                    link.title = ""; // Remove the title attribute
                }, 1000);
                setTimeout(() => {
                    link.textContent = "Mail"; // Revert back to "Mail"
                    link.title = "Click to show email"; // Reset the title attribute
                }, 1000); // Adjusted timing
            }
        });

        // Add hover effect for "Click to copy" when email is visible
        link.addEventListener('mouseenter', function() {
            if (link.textContent !== "Mail") { // Check if the link text is not "Mail"
                link.textContent = "Click to copy";
            }
        });

        link.addEventListener('mouseleave', function() {
            if (link.textContent === "Click to copy") {
                link.textContent = email; // Restore the original email text on mouse leave
            }
        });
    });
});
