document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const code = button.previousElementSibling.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // -----------------------------------------
    // Animate elements on scroll using cssanimation.io
    // -----------------------------------------

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cssanimation', 'fadeInBottom');
                obs.unobserve(entry.target); // Once animated, stop observing
            }
        });
    }, {
        threshold: 0.1
    });

    // Select elements you want to animate
    document.querySelectorAll('.feature-card, .step, .hero h1, .hero .subtitle').forEach(el => {
        observer.observe(el);
    });
}); 