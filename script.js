document.addEventListener('DOMContentLoaded', () => {
      // Initialize particles background
      initParticles();
      
      // Header scroll effect
      const header = document.querySelector('header');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      // Smooth scrolling for navigation links
      const navLinks = document.querySelectorAll('nav a, .btn');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          if (link.hash) {
            e.preventDefault();
            
            const targetSection = document.querySelector(link.hash);
            
            if (targetSection) {
              const headerHeight = header.offsetHeight;
              const targetPosition = targetSection.offsetTop - headerHeight;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for language cards progress bars
            if (entry.target.classList.contains('language-card')) {
              const progressBar = entry.target.querySelector('.progress-fill');
              if (progressBar) {
                setTimeout(() => {
                  progressBar.style.width = progressBar.getAttribute('data-progress') + '%';
                }, 300);
              }
            }
          }
        });
      }, observerOptions);

      // Observe all animatable elements
      const animatableElements = document.querySelectorAll('.skill-card, .language-card, .contact-item, .fade-in');
      animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
      });

      // Typing animation for hero text
      const heroTitle = document.querySelector('.hero h1 span');
      if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          } else {
            setTimeout(() => {
              heroTitle.style.borderRight = 'none';
            }, 1000);
          }
        };
        
        setTimeout(typeWriter, 1000);
      }

      // Add parallax effect to hero image
      const heroImage = document.querySelector('.hero-image img');
      if (heroImage) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          heroImage.style.transform = `translateY(${rate}px)`;
        });
      }

      // Dynamic color change for navigation on scroll
      const sections = document.querySelectorAll('section[id]');
      const navItems = document.querySelectorAll('.nav-links a');

      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
          }
        });

        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
          }
        });
      });
    });

    // Particles.js configuration
    function initParticles() {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": ["#8b5cf6", "#3b82f6", "#06b6d4"]
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#8b5cf6",
            "opacity": 0.2,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "push": {
              "particles_nb": 4
            }
          }
        },
        "retina_detect": true
      });
    }
