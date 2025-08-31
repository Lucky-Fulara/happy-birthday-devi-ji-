// Global variables
let fireworksCanvas, ctx;
let fireworks = [];
let particles = [];

// CUSTOMIZE: Replace this URL with your desired redirect destination
const REDIRECT_URL = 'https://example.com/surprise'; // Change this to your desired URL

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeFireworks();
    setupEventListeners();
    playBackgroundMusic();
    startFirecrackerShow();
});

// Setup event listeners
function setupEventListeners() {
    const cakeButton = document.getElementById('cake-button');
    const cake = document.getElementById('cake');
    const continueButton = document.getElementById('continue-button');
    
    cakeButton.addEventListener('click', showCakeSection);
    cake.addEventListener('click', cutCake);
    continueButton.addEventListener('click', redirectToNextPage);
}

// Background music setup
function playBackgroundMusic() {
    const music = document.getElementById('background-music');
    music.volume = 0.3; // Set comfortable volume level
    
    // Try to play music immediately
    music.play().catch(e => {
        console.log('Audio autoplay prevented by browser - will play on first interaction');
        
        // Play music on first user interaction
        document.addEventListener('click', function() {
            music.play().catch(e => console.log('Audio play failed:', e));
        }, { once: true });
    });
    
    // Ensure music keeps playing throughout the experience
    music.addEventListener('ended', function() {
        music.currentTime = 0;
        music.play();
    });
}

// Fireworks Canvas Setup
function initializeFireworks() {
    fireworksCanvas = document.getElementById('fireworks-canvas');
    ctx = fireworksCanvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start continuous fireworks animation with varying intervals
    startFireworksShow();
    animateFireworks();
}

// Enhanced fireworks show with firecrackers
function startFireworksShow() {
    // Regular fireworks every 1-2 seconds
    setInterval(() => {
        createFirework();
    }, 1000 + Math.random() * 1000);
    
    // Burst fireworks every 3-5 seconds
    setInterval(() => {
        createFireworkBurst();
    }, 3000 + Math.random() * 2000);
}

// Firecracker show - rapid succession of small explosions
function startFirecrackerShow() {
    setInterval(() => {
        createFirecrackerBurst();
    }, 2000 + Math.random() * 3000);
}

function createFirecrackerBurst() {
    // Create multiple small fireworks in quick succession
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * fireworksCanvas.width;
            const y = Math.random() * fireworksCanvas.height * 0.7 + fireworksCanvas.height * 0.1;
            createSmallFirework(x, y);
        }, i * 200);
    }
}

function createFireworkBurst() {
    // Create multiple fireworks at once for dramatic effect
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }
}

function createSmallFirework(x, y) {
    // Create smaller, quicker fireworks for firecracker effect
    for (let i = 0; i < 8; i++) {
        particles.push(new Particle(x, y, getRandomFirecrackerColor()));
    }
}

function getRandomFirecrackerColor() {
    const colors = ['#FF4500', '#FFD700', '#FF6347', '#FFA500', '#FF69B4', '#FF1493'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

// Firework object
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * -3 - 2;
        this.gravity = 0.1;
        this.life = 60;
        this.maxLife = 60;
        this.color = this.getRandomColor();
    }
    
    getRandomColor() {
        const colors = ['#FF69B4', '#FFD700', '#E91E63', '#FF6B6B', '#FFA500', '#FF1493'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life--;
        
        // Create explosion at peak
        if (this.vy >= 0 && this.life > this.maxLife / 2) {
            this.explode();
            this.life = 0;
        }
    }
    
    explode() {
        for (let i = 0; i < 15; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Particle object for explosions
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.gravity = 0.1;
        this.life = 40;
        this.maxLife = 40;
        this.color = color;
        this.size = Math.random() * 3 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.99;
        this.life--;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = fireworksCanvas.height;
    fireworks.push(new Firework(x, y));
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    // Update and draw fireworks
    fireworks = fireworks.filter(firework => {
        firework.update();
        firework.draw();
        return firework.life > 0;
    });
    
    // Update and draw particles
    particles = particles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0;
    });
    
    requestAnimationFrame(animateFireworks);
}

// Show cake section
function showCakeSection() {
    const photoSection = document.getElementById('photo-section');
    const cakeSection = document.getElementById('cake-section');
    
    // Intensify fireworks when transitioning to cake section
    createCelebrationBurst();
    
    photoSection.style.transform = 'translateY(-20px)';
    photoSection.style.opacity = '0';
    
    setTimeout(() => {
        photoSection.classList.add('hidden');
        cakeSection.classList.remove('hidden');
        cakeSection.classList.add('fade-in');
    }, 500);
}

// Cut cake animation
function cutCake() {
    const cake = document.getElementById('cake');
    const knife = document.getElementById('knife');
    const cakeSection = document.getElementById('cake-section');
    
    // Create celebration fireworks when cutting cake
    createMegaCelebrationBurst();
    
    // Animate knife cutting
    knife.classList.add('cutting');
    
    setTimeout(() => {
        // Add cake cutting effect
        cake.classList.add('cut');
        createCakeParticles();
        
        setTimeout(() => {
            showMessageSection();
        }, 2000);
    }, 1000);
}

// Create cake particles effect
function createCakeParticles() {
    const cakeContainer = document.querySelector('.cake-container');
    const pieces = document.createElement('div');
    pieces.className = 'cake-pieces';
    
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.className = 'cake-piece';
        piece.style.left = Math.random() * 200 + 'px';
        piece.style.top = Math.random() * 180 + 'px';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        pieces.appendChild(piece);
    }
    
    cakeContainer.appendChild(pieces);
    
    // Remove particles after animation
    setTimeout(() => {
        pieces.remove();
    }, 2000);
}

// Show message section
function showMessageSection() {
    const cakeSection = document.getElementById('cake-section');
    const messageSection = document.getElementById('message-section');
    
    // Final celebration burst for the love message
    createFinalCelebrationBurst();
    
    cakeSection.style.transform = 'translateY(-20px)';
    cakeSection.style.opacity = '0';
    
    setTimeout(() => {
        cakeSection.classList.add('hidden');
        messageSection.classList.remove('hidden');
        messageSection.classList.add('fade-in');
        
        // Add extra sparkle effects
        createSparkles();
    }, 500);
}

// Special celebration effects
function createCelebrationBurst() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 150);
    }
}

function createMegaCelebrationBurst() {
    // Massive fireworks display when cutting the cake
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFirework();
            if (i % 3 === 0) {
                createFirecrackerBurst();
            }
        }, i * 100);
    }
}

function createFinalCelebrationBurst() {
    // Grand finale fireworks for the love message
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFirework();
            if (i % 2 === 0) {
                const x = Math.random() * fireworksCanvas.width;
                const y = Math.random() * fireworksCanvas.height * 0.6;
                createSmallFirework(x, y);
            }
        }, i * 80);
    }
}

// Create sparkle effects
function createSparkles() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.animationDelay = Math.random() * 1 + 's';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 100);
    }
}

// Redirect to next page
function redirectToNextPage() {
    // CUSTOMIZE: Change the REDIRECT_URL constant at the top of this file
    // You can also add a confirmation dialog if desired
    
    // Optional: Add a nice exit animation
    document.body.style.transition = 'opacity 1s ease-out';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 1000);
}

// Additional interactive effects
document.addEventListener('mousemove', function(e) {
    // Occasionally create sparkles on mouse movement
    if (Math.random() < 0.05) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
});

// Create random fireworks on page load
setTimeout(() => {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }
}, 1000);

// Add periodic firecracker sounds and effects during the experience
setInterval(() => {
    if (Math.random() < 0.3) {
        createFirecrackerBurst();
    }
}, 4000);

// Add click sound effect (optional)
function playClickSound() {
    // You can add a click sound effect here if desired
    // const clickSound = new Audio('path-to-click-sound.mp3');
    // clickSound.play();
}

// Add sound effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});