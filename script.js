// script.js
let currentSlide = 0;
const totalSlides = 8;

// Function to load slide content
function loadSlides() {
    fetch('slides.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('deck-container').innerHTML = data;
            initializeSlides();
        })
        .catch(error => console.error('Error loading slides:', error));
}

// Initialize slides
function initializeSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
        slide.classList.toggle('active', index === 0);
    });
    updateSlideCounter();
    adjustSlideScale();
}

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
        slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
    updateSlideCounter();
}

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Update slide counter
function updateSlideCounter() {
    document.getElementById('slide-counter').textContent = `${currentSlide + 1} / ${totalSlides}`;
}

// Adjust slide scale based on window size
function adjustSlideScale() {
    const slides = document.querySelectorAll('.slide');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / 1920;
    const scaleY = windowHeight / 1080;
    const scale = Math.min(scaleX, scaleY, 1);
    
    slides.forEach(slide => {
        slide.style.transform = `scale(${scale})`;
    });
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Keyboard navigation
function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            nextSlide();
            break;
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSlides();
    
    document.getElementById('next-btn').addEventListener('click', nextSlide);
    document.getElementById('prev-btn').addEventListener('click', prevSlide);
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
    document.addEventListener('keydown', handleKeyboard);
    window.addEventListener('resize', adjustSlideScale);
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}
