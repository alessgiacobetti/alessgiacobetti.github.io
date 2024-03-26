document.addEventListener("DOMContentLoaded", function() {
    const links = ['GitHub', 'LinkedIn']; // Links in reverse order to start from bottom
    const container = document.getElementById('container');

    links.reverse().forEach((linkText, index) => {
        const link = document.createElement('a');
        link.href = linkText === 'LinkedIn' ? "https://www.linkedin.com/in/alessandrogiacobetti/" : "https://github.com/alessgiacobetti";
        link.target = "_blank";
        container.appendChild(link);

        // Create a span for each letter of the link text
        for (let i = 0; i < linkText.length; i++) {
            const span = document.createElement('span');
            span.textContent = linkText[i];
            span.style.animation = `fall 1s ease-out ${(links.length - index) * 0.5 + i * 0.1}s forwards`; // Increased delay
            link.appendChild(span);
        }
    });
});
