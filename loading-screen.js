// Matrix loading effect (version: glitching)
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Making the canvas full screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Characters to print
const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

// Drawing the characters
function drawMatrix() {
    // Clear screen with black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.fillStyle = '#650e45';
    ctx.shadowColor = '#650e45';
    ctx.shadowBlur = 5;
    ctx.font = fontSize + 'px monospace';

    // Draw random characters at random positions
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            // Only draw characters with 5% probability
            if (Math.random() < 0.1) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, j * fontSize);
            }
        }
    }
}

// Start the Matrix animation
const matrixInterval = setInterval(drawMatrix, 200);

// Hide the matrix loading screen after terminal is loaded
window.addEventListener('load', function() {
    // Let matrix effect show for at least 2 seconds for effect
    setTimeout(function() {
        clearInterval(matrixInterval);
        document.getElementById('matrix-loading').style.display = 'none';
    }, 2000);
});
