// Function to animate the filling of the grid and toggle the squares
function Animate() {
    // Only fill squares if the grid isn't fully filled yet
    if (COUNT < RECTWIDTH * RECTHEIGHT / (size * size)) {
        a = Math.random() * RECTWIDTH;
        a = Math.round(a / size) * size;
        b = Math.random() * RECTHEIGHT;
        b = Math.round(b / size) * size;

        // Ensure the rectangle is within bounds
        if ((a + size) <= RECTWIDTH && (b + size) <= RECTHEIGHT) {
            // Fill the square
            ctx1.fillStyle = '#064276';  //#073156
            ctx1.fillRect(a, b, size, size); // Fill the square with primary color
            ctx1.fillStyle = '#0E4778';  //#073156
            ctx1.fillRect(a - size, b - size, size, size); // Fill adjacent squares for effect
            ctx1.fillStyle = '#073156';  //#073156 #CBE3F8
            ctx1.fillRect(a, b - size, size, size); // More adjacent fills
            ctx1.strokeStyle = "#064276";
            ctx1.lineWidth = 1;
            ctx1.rect(a, b, size, size);
            ctx1.stroke();

            // Mark this square as filled
            filledSquares.push({ x: a, y: b });
        }

        COUNT++;
    } else {
        // Start toggling squares on and off
        if (filledSquares.length > 0) {
            // Choose a random filled square to toggle
            const randomIndex = Math.floor(Math.random() * filledSquares.length);
            const square = filledSquares[randomIndex];

            // Randomly toggle it on or off
            const toggleState = Math.random() > 0.5;  // 50% chance to toggle

            if (toggleState) {
                // Turn the square back on (fill it)
                ctx1.fillStyle = '#064276';
                ctx1.fillRect(square.x, square.y, size, size);
            } else {
                // Turn the square off (clear it)
                ctx1.clearRect(square.x, square.y, size, size);
            }
        }
    }

    // Stop animation after COUNT exceeds the grid size
    if (COUNT >= 5000) {
        window.clearInterval(animator);
    }
}

// ******************* Main program ******************* //

var x = 0;
var y = 0;
var size = 40;  // Size of each square
var COUNT = 0;
var filledSquares = [];  // Array to store filled square coordinates

Animation = document.getElementById("Animation");
ctx1 = Animation.getContext('2d');

var a = window.innerWidth;
var b = window.innerHeight;

var width = ctx1.canvas.width = a;
var height = ctx1.canvas.height = b;

// Ensure the canvas perfectly fits the grid size without a buffer
RECTWIDTH = Math.ceil(width / size) * size; // Rounding up ensures the grid fills the canvas
RECTHEIGHT = Math.ceil(height / size) * size;

ctx1.clearRect(0, 0, RECTWIDTH, RECTHEIGHT); // Clear canvas first
ctx1.fillStyle = '#064276';
ctx1.fillRect(0, 0, RECTWIDTH, RECTHEIGHT);

// Draw the background grid (initial grid layout)
for (x = 0; x < RECTWIDTH; x += size) {
    for (y = 0; y < RECTHEIGHT; y += size) {
        ctx1.rect(x, y, size, size);
    }
}

// Set the interval for the animation (adjusted to 100ms for smoother animation)
var animator = window.setInterval(Animate, 100);
