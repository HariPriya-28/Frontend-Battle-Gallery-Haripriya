// Loader
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 800);
});

// Light/Dark Mode
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
toggleBtn.addEventListener('click', () => {
    setMode(!document.body.classList.contains('dark'));
});
if (localStorage.getItem('theme') === 'dark' ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setMode(true);
}

// Lightbox for images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.onclick = function() {
        let overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 9999;
        overlay.onclick = () => document.body.removeChild(overlay);

        let bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.style.maxWidth = '90vw';
        bigImg.style.maxHeight = '90vh';
        bigImg.style.borderRadius = '12px';
        overlay.appendChild(bigImg);

        document.body.appendChild(overlay);
    }
});
