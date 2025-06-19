// Enhanced Loader
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hide');
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 400);
    }, 800);
});

// Enhanced Light/Dark Mode
const toggleBtn = document.getElementById('toggleMode');
const modeIcon = document.getElementById('modeIcon');

function setMode(dark) {
    if (dark) {
        document.body.classList.add('dark');
        modeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        modeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Theme toggle event listener
toggleBtn.addEventListener('click', () => {
    setMode(!document.body.classList.contains('dark'));
});

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setMode(true);
    } else {
        setMode(false);
    }
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) {
        if (!localStorage.getItem('theme')) {
            setMode(e.matches);
        }
    });
}

// Initialize theme
initializeTheme();

// Enhanced Lightbox for images
function createLightbox(imgSrc, imgAlt) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: zoom-out;
    `;

    // Create image
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;
    img.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px; right: 20px;
        background: rgba(255,255,255,0.9);
        border: none;
        width: 40px; height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
        transition: background 0.2s ease;
    `;

    // Add elements to overlay
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);

    // Close functionality
    function closeLightbox() {
        overlay.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Keyboard navigation
    function handleKeyPress(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeyPress);
        }
    }
    document.addEventListener('keydown', handleKeyPress);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when closed
    overlay.addEventListener('transitionend', () => {
        if (overlay.style.opacity === '0') {
            document.body.style.overflow = '';
        }
    });
}

// Apply lightbox to all gallery images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        createLightbox(img.src, img.alt);
    });
});

// Enhanced Active Link Highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 200; // Offset for navbar height
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Throttled scroll event for performance
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Enhanced gallery item animations on scroll
function animateOnScroll() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const windowHeight = window.innerHeight;
    
    galleryItems.forEach((item, index) => {
        const elementTop = item.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}

// Initialize gallery items for scroll animation
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

// Add scroll listener for animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Performance optimization: Lazy loading for videos
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load(); // Preload video when it comes into view
                videoObserver.unobserve(video);
            }
        });
    });

    document.querySelectorAll('video').forEach(video => {
        videoObserver.observe(video);
    });
}

// Error handling for missing assets
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const caption = this.nextElementSibling;
        if (caption && caption.classList.contains('caption')) {
            caption.textContent += ' (Image not found)';
        }
    });
});

document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', function() {
        this.style.display = 'none';
        const caption = this.nextElementSibling;
        if (caption && caption.classList.contains('caption')) {
            caption.textContent += ' (Video not found)';
        }
    });
});

console.log('Frontend Battle Gallery loaded successfully! 🚀');
