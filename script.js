document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".about, .skills, .projects, .education, .contact");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
    });

    sections.forEach((section) => {
        observer.observe(section);
    });
});
