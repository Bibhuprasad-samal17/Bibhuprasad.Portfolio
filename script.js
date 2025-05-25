
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Typing effect
const professions = ["Professional Developer", "UI/UX Designer", "Full Stack Engineer", "Problem Solver"];
let currentIndex = 0;
let currentText = '';
let letterIndex = 0;
const professionElement = document.getElementById("profession");

function type() {
    if (letterIndex < professions[currentIndex].length) {
        currentText += professions[currentIndex].charAt(letterIndex);
        professionElement.textContent = currentText;
        letterIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (letterIndex > 0) {
        currentText = professions[currentIndex].substring(0, letterIndex - 1);
        professionElement.textContent = currentText;
        letterIndex--;
        setTimeout(erase, 50);
    } else {
        currentIndex = (currentIndex + 1) % professions.length;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(type, 1000);

    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress');
    setTimeout(() => {
        progressBars.forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    }, 500);

    // Reveal animations when scrolling
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener('scroll', checkFade);
    checkFade();

    // Create floating particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 15 + 5;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.bottom = `${-50}px`;
        particle.style.opacity = '0';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);

        // Remove and recreate particles to avoid memory issues
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }
});
