// Global variables
let currentPage = 'home';
let isPlaying = false;
let audioPlayer;
let vinyl;
let progressFill;
let clickHeartsContainer;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeFloatingElements();
    initializeNavigation();
    initializeMusicPlayer();
    initializeGallery();
    initializeLovePage();
    initializeAnimationDelays();
});

// Initialize floating hearts and stars
function initializeFloatingElements() {
    const floatingContainer = document.getElementById('floating-elements');
    
    // Create floating hearts
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(floatingContainer);
    }
    
    // Create twinkling stars
    for (let i = 0; i < 20; i++) {
        createTwinklingStar(floatingContainer);
    }
    
    // Continue creating hearts and stars
    setInterval(() => {
        createFloatingHeart(floatingContainer);
    }, 3000);
    
    setInterval(() => {
        createTwinklingStar(floatingContainer);
    }, 2000);
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

function createTwinklingStar(container) {
    const star = document.createElement('div');
    star.className = 'floating-star';
    star.textContent = '✨';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.fontSize = (Math.random() * 10 + 8) + 'px';
    
    container.appendChild(star);
    
    // Remove star after some time
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 6000);
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });
    
    currentPage = pageId;
    
    // Trigger page-specific animations
    triggerPageAnimations(pageId);
}

function triggerPageAnimations(pageId) {
    const page = document.getElementById(pageId);
    const animatedElements = page.querySelectorAll('.message-item, .photo-card, .love-item, .wish-item');
    
    animatedElements.forEach((element, index) => {
        element.style.setProperty('--delay', index);
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = `fadeInUp 0.8s ease forwards`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Music player functionality
function initializeMusicPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    vinyl = document.getElementById('vinyl');
    progressFill = document.getElementById('progressFill');
    
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', () => {
            isPlaying = false;
            updatePlayButton();
            vinyl.classList.remove('playing');
        });
    }
}

function togglePlay() {
    if (!audioPlayer) return;
    
    if (isPlaying) {
        audioPlayer.pause();
        vinyl.classList.remove('playing');
    } else {
        audioPlayer.play();
        vinyl.classList.add('playing');
    }
    
    isPlaying = !isPlaying;
    updatePlayButton();
}

function updatePlayButton() {
    const playIcon = document.getElementById('playIcon');
    if (playIcon) {
        playIcon.textContent = isPlaying ? '⏸️' : '▶️';
    }
}

function updateProgress() {
    if (audioPlayer && progressFill) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Gallery functionality
function initializeGallery() {
    const clickHeartsContainer = document.getElementById('clickHearts');
}

function openModal(imagePath) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imagePath;
    modal.style.display = "block";
  }

  function closeModal() {
    document.getElementById('imageModal').style.display = "none";
  }


// Love page functionality
function initializeLovePage() {
    const lovePage = document.getElementById('love');
    
    lovePage.addEventListener('click', function(e) {
        createClickHeart(e);
    });
    
    // Initialize emoji grid with hover effects
    const emojiGrid = document.getElementById('emojiGrid');
    if (emojiGrid) {
        const emojis = emojiGrid.textContent.split('');
        emojiGrid.innerHTML = '';
        
        emojis.forEach((emoji, index) => {
            if (emoji.trim()) {
                const span = document.createElement('span');
                span.textContent = emoji;
                span.style.setProperty('--delay', index);
                span.addEventListener('click', function(e) {
                    e.stopPropagation();
                    createClickHeart(e);
                });
                emojiGrid.appendChild(span);
            }
        });
    }
}

function createClickHeart(e) {
    if (!clickHeartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = '💖';
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    heart.style.left = (rect.left + x) + 'px';
    heart.style.top = (rect.top + y) + 'px';
    
    clickHeartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Initialize animation delays for staggered effects
function initializeAnimationDelays() {
    const animatedElements = document.querySelectorAll('.message-item, .photo-card, .love-item, .wish-item');
    
    animatedElements.forEach((element, index) => {
        element.style.setProperty('--delay', index);
    });
}

// Utility functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Create subtle mouse trail effect
    if (Math.random() < 0.1) {
        createMouseTrailHeart(e.clientX, e.clientY);
    }
});

function createMouseTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '12px';
    heart.style.color = 'rgba(236, 72, 153, 0.3)';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '5';
    heart.textContent = '💕';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const pages = ['home', 'message', 'gallery', 'music', 'love'];
    const currentIndex = pages.indexOf(currentPage);
    
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    } else if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === ' ' && currentPage === 'music') {
        e.preventDefault();
        togglePlay();
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const pages = ['home', 'message', 'gallery', 'music', 'love'];
        const currentIndex = pages.indexOf(currentPage);
        
        if (diff > 0 && currentIndex < pages.length - 1) {
            // Swipe left - next page
            showPage(pages[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous page
            showPage(pages[currentIndex - 1]);
        }
    }
}

// Add some fun Easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 50) {
        // Easter egg after 50 clicks
        createHeartExplosion();
        clickCount = 0;
    }
});

function createHeartExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = '30px';
            heart.style.color = '#ec4899';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            heart.textContent = '💖';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 100);
    }
}

// Performance optimization - throttle expensive operations
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize mouse move events
document.addEventListener('mousemove', throttle(function(e) {
    // Throttled mouse move effects
}, 100));

