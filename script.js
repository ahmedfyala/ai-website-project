// --- Login Validation Logic ---
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
    
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const loginCard = document.querySelector(".login-card");

    loginCard.classList.remove("shake");

    if (usernameInput === "admin" && passwordInput === "1234") {
        errorMessage.style.display = "none";
        window.location.href = "home.html";
    } else {
        errorMessage.style.display = "block";
        errorMessage.style.animation = "none"; 
        void errorMessage.offsetWidth; // Force reflow
        errorMessage.style.animation = "shake 0.5s ease-in-out";
        
        loginCard.classList.add("shake");
        setTimeout(() => loginCard.classList.remove("shake"), 500);
    }
}

// --- Quiz Switching Logic ---
window.switchQuiz = function(url, btnElement) {
    const iframe = document.getElementById('quizFrame');
    if (iframe) {
        iframe.src = url;
        
        // Update button visual states
        const buttons = btnElement.parentElement.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.background = 'var(--text-muted)';
        });
        btnElement.style.background = 'var(--primary-color)';
    }
};

// --- DOM Content Loaded Logic for Home Page ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Dark Mode Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleBtn) {
        // Check for saved user preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '☀️';
        }

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '🌙';
            }
        });
    }

    // 2. Intersection Observer for Scroll Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
