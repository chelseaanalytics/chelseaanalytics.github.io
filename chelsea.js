// =======================
// CHARCOAL + SLATE PALETTE
// Retina crisp + redraw on resize WITHOUT resetting animation
// =======================

// ******************* Animation ******************* //

function Animate() {
  // Only fill squares if the grid isn't fully filled yet
  if (COUNT < (RECTWIDTH * RECTHEIGHT) / (size * size)) {
    a = Math.random() * RECTWIDTH;
    a = Math.round(a / size) * size;
    b = Math.random() * RECTHEIGHT;
    b = Math.round(b / size) * size;

    if ((a + size) <= RECTWIDTH && (b + size) <= RECTHEIGHT) {

      // Main square — charcoal
      ctx1.fillStyle = '#1B1D1F';
      ctx1.fillRect(a, b, size, size);

      // Darker offset square
      ctx1.fillStyle = '#0B0C0D';
      ctx1.fillRect(a - size, b - size, size, size);

      // Muted slate / ink-blue accent
      ctx1.fillStyle = '#121A22';
      ctx1.fillRect(a, b - size, size, size);

      // Grid stroke
      ctx1.strokeStyle = '#0F1113';
      ctx1.lineWidth = 1;
      ctx1.beginPath();
      ctx1.rect(a, b, size, size);
      ctx1.stroke();

      filledSquares.push({ x: a, y: b });
    }

    COUNT++;
  } else {
    // Toggle filled squares
    if (filledSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * filledSquares.length);
      const square = filledSquares[randomIndex];
      const toggleState = Math.random() > 0.5;

      if (toggleState) {
        ctx1.fillStyle = '#1E2022';
        ctx1.fillRect(square.x, square.y, size, size);
      } else {
        ctx1.clearRect(square.x, square.y, size, size);
      }
    }
  }

  if (COUNT >= 5000) {
    window.clearInterval(animator);
  }
}

// ******************* Main Program ******************* //

var size = 40;
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
  // Background
  ctx1.fillStyle = '#050607';
  ctx1.fillRect(x0, y0, w, h);

  // Subtle grid
  ctx1.strokeStyle = '#0F1113';
  ctx1.lineWidth = 1;

  ctx1.beginPath();
  var startX = Math.floor(x0 / size) * size;
  var startY = Math.floor(y0 / size) * size;
  var endX = x0 + w;
  var endY = y0 + h;

  for (var x = startX; x < endX; x += size) {
    for (var y = startY; y < endY; y += size) {
      ctx1.rect(x, y, size, size);
    }
  }
  ctx1.stroke();
}

function resizeCanvasKeepState() {
  dpr = Math.max(1, window.devicePixelRatio || 1);

  var cssW = window.innerWidth;
  var cssH = window.innerHeight;

  RECTWIDTH = Math.ceil(cssW / size) * size;
  RECTHEIGHT = Math.ceil(cssH / size) * size;

  var oldW = Animation.width;
  var oldH = Animation.height;

  var buffer = document.createElement('canvas');
  buffer.width = oldW;
  buffer.height = oldH;
  var bctx = buffer.getContext('2d');
  bctx.drawImage(Animation, 0, 0);

  Animation.style.width = cssW + "px";
  Animation.style.height = cssH + "px";

  Animation.width = Math.floor(cssW * dpr);
  Animation.height = Math.floor(cssH * dpr);

  ctx1.setTransform(1, 0, 0, 1, 0, 0);
  ctx1.scale(dpr, dpr);

  ctx1.save();
  ctx1.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx1.drawImage(buffer, 0, 0);
  ctx1.restore();

  if (prevCssW === 0 && prevCssH === 0) {
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

// Init
resizeCanvasKeepState();
window.addEventListener("resize", resizeCanvasKeepState);
var animator = window.setInterval(Animate, 100);