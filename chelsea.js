function draw() {

//Draw random fills
a = Math.random()*rectWidth;
a = Math.round(a/size)*size;
b = Math.random()*rectHeight;
b = Math.round(b/size)*size;

if((a+size)<=rectWidth && (b+size)<=rectHeight){
  gl.fillStyle = '#064276';  //#073156
  gl.fillRect(a, b, size, size);
  gl.fillStyle = '#0E4778';  //#073156
  gl.fillRect(a-size, b-size, size, size);
  gl.fillStyle = '#073156';  //#073156 #CBE3F8
  gl.fillRect(a, b-size, size, size);
  //gl.fillStyle = '#CBE3F8';  //#073156 #CBE3F8
  //gl.fillRect(a-size, b, size, size);
  gl.strokeStyle = "#064276";
  gl.lineWidth = 1;
  gl.rect(a, b, size, size);
  gl.stroke();
  gl.save
}
else {
  a = 0;
  b = 0;
}

if (count<10000) {
  count = count+1;
}
else {
  window.clearInterval(animator);
}

// Draw text
gl.fillStyle = "white";
if (width > 800) {
  gl.font = '72px Helvetica';
}
else {
  gl.font = '36px Helvetica';
}
gl.textAlign = 'center';
gl.fillText('Chelsea Analytics', width/2, height/2);

}

// *******************   Main program   ******************* //
const canvas = document.querySelector("Canvas");
var gl = document.getElementById('Canvas').getContext('2d');

var x = 0;
var y = 0;
var size = 40;
var buffer = 0;
var count = 0;

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

rectWidth = Math.floor((width/size))*size+buffer*2;
rectHeight = Math.floor((height/size))*size+buffer*2;

// Draw canvas
gl.clearRect(0, 0, rectWidth, rectHeight);
gl.fillStyle = '#BFDDF6';
gl.fillRect(0, 0, rectWidth, rectHeight);

// Draw background
for (x=0;x<rectWidth;x+=size) {
  for (y=0;y<=rectHeight;y+=size) {
    gl.rect(x, y, size, size);
    gl.stroke();
  }
}

gl.save();
var animator = window.setInterval(draw, 0.25);
