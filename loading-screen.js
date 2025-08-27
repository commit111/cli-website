// Matrix loading effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Making the canvas full screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Characters to print
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const fontSize = 10;
const columns = canvas.width / fontSize;

// Array of drops - one per column
const drops = [];

// x below is the x coordinate
// 1 = y coordinate of the drop (same for every drop initially)
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Drawing the characters
function drawMatrix() {
    // Black with opacity
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create gradient colors
    const gradientColors = ['#6c1df7'];
    
    // Looping over drops
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Calculate color based on position (y-coordinate)
        const colorIndex = Math.floor((drops[i] % canvas.height / fontSize) * gradientColors.length / 20) % gradientColors.length;
        ctx.fillStyle = gradientColors[colorIndex];
        
        // Draw the character with glow effect
        ctx.save();
        ctx.shadowColor = gradientColors[colorIndex];
        ctx.shadowBlur = 16;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.restore();
        
        // Incrementing Y coordinate
        drops[i]++;
    }
}

// Start the Matrix animation
const matrixInterval = setInterval(drawMatrix, 33);

// Hide the matrix loading screen after terminal is loaded
window.addEventListener('load', function() {
    // Let matrix effect show for at least 2 seconds for effect
    setTimeout(function() {
        clearInterval(matrixInterval);
        document.getElementById('matrix-loading').style.display = 'none';
    }, 2250);
});
