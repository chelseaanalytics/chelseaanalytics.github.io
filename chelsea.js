// =======================
// UPDATED: Retina crisp + redraw on resize WITHOUT resetting your animation
// - keeps your "fills the screen no matter what" behavior
// - adds resize listener
// - fixes DPI so lines/squares aren't blurry
// =======================

// Function to animate the filling of the grid and toggle the squares
function Animate() {
  // Only fill squares if the grid isn't fully filled yet
  if (COUNT < (RECTWIDTH * RECTHEIGHT) / (size * size)) {
    a = Math.random() * RECTWIDTH;
    a = Math.round(a / size) * size;
    b = Math.random() * RECTHEIGHT;
    b = Math.round(b / size) * size;

    // Ensure the rectangle is within bounds
    if ((a + size) <= RECTWIDTH && (b + size) <= RECTHEIGHT) {
      // Fill the square
      ctx1.fillStyle = '#2e2f2f';
      ctx1.fillRect(a, b, size, size);

      ctx1.fillStyle = '#00080e';
      ctx1.fillRect(a - size, b - size, size, size);

      ctx1.fillStyle = '#073156';
      ctx1.fillRect(a, b - size, size, size);

      ctx1.strokeStyle = "#171717";
      ctx1.lineWidth = 1;
      ctx1.beginPath();
      ctx1.rect(a, b, size, size);
      ctx1.stroke();

      // Mark this square as filled
      filledSquares.push({ x: a, y: b });
    }

    COUNT++;
  } else {
    // Start toggling squares on and off
    if (filledSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * filledSquares.length);
      const square = filledSquares[randomIndex];
      const toggleState = Math.random() > 0.5;

      if (toggleState) {
        ctx1.fillStyle = '#2b2b29';
        ctx1.fillRect(square.x, square.y, size, size);
      } else {
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
var size = 40; // Size of each square (CSS pixels)
var COUNT = 0;
var filledSquares = [];

var Animation = document.getElementById("Animation");
var ctx1 = Animation.getContext('2d');

var a = 0;
var b = 0;

var RECTWIDTH = 0;
var RECTHEIGHT = 0;

var dpr = Math.max(1, window.devicePixelRatio || 1);
var prevCssW = 0;
var prevCssH = 0;

function drawGridRegion(x0, y0, w, h) {
  // Fill background for region
  ctx1.fillStyle = '#000000';
  ctx1.fillRect(x0, y0, w, h);

  // Draw grid lines (rect strokes) for region
  ctx1.strokeStyle = "#171717";
  ctx1.lineWidth = 1;

  ctx1.beginPath();
  var startX = Math.floor(x0 / size) * size;
  var startY = Math.floor(y0 / size) * size;
  var endX = x0 + w;
  var endY = y0 + h;

  for (x = startX; x < endX; x += size) {
    for (y = startY; y < endY; y += size) {
      ctx1.rect(x, y, size, size);
    }
  }
  ctx1.stroke();
}

function resizeCanvasKeepState() {
  dpr = Math.max(1, window.devicePixelRatio || 1);

  // CSS pixel size (what you were using before)
  var cssW = window.innerWidth;
  var cssH = window.innerHeight;

  // Update logical grid bounds in CSS pixels
  RECTWIDTH = Math.ceil(cssW / size) * size;
  RECTHEIGHT = Math.ceil(cssH / size) * size;

  // IMPORTANT: preserve the existing drawing when resizing:
  // copy old canvas into an offscreen buffer (device pixels)
  var oldW = Animation.width;
  var oldH = Animation.height;

  var buffer = document.createElement('canvas');
  buffer.width = oldW;
  buffer.height = oldH;
  var bctx = buffer.getContext('2d');
  bctx.drawImage(Animation, 0, 0);

  // Set CSS size explicitly
  Animation.style.width = cssW + "px";
  Animation.style.height = cssH + "px";

  // Set backing store size (device pixels)
  Animation.width = Math.floor(cssW * dpr);
  Animation.height = Math.floor(cssH * dpr);

  // Scale context so drawing commands remain in CSS pixels
  ctx1.setTransform(1, 0, 0, 1, 0, 0);
  ctx1.scale(dpr, dpr);

  // Restore old content (map old device pixels -> new CSS pixels properly)
  // We draw buffer at 0,0 in CSS-pixel space by scaling it down by dpr.
  // Since ctx is already scaled by dpr, drawImage expects CSS px coordinates.
  ctx1.save();
  ctx1.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx1.drawImage(buffer, 0, 0);
  ctx1.restore();

  // If the window grew, draw background/grid only in the newly exposed regions
  if (prevCssW === 0 && prevCssH === 0) {
    // First load: draw full background + grid once
    drawGridRegion(0, 0, RECTWIDTH, RECTHEIGHT);
  } else {
    if (cssW > prevCssW) {
      drawGridRegion(prevCssW, 0, cssW - prevCssW, cssH);
    }
    if (cssH > prevCssH) {
      drawGridRegion(0, prevCssH, cssW, cssH - prevCssH);
    }
  }

  prevCssW = cssW;
  prevCssH = cssH;
}

// Initial size + grid
resizeCanvasKeepState();

// Redraw canvas on resize (keeps state)
window.addEventListener("resize", resizeCanvasKeepState);

// Set the interval for the animation
var animator = window.setInterval(Animate, 100);