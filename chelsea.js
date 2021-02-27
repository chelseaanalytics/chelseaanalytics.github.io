// function draw() {
//   //Animate();
//   Text();
// }

function Animate() {

//Draw random fills
a = Math.random()*RECTWIDTH;
a = Math.round(a/size)*size;
b = Math.random()*RECTHEIGHT;
b = Math.round(b/size)*size;

if((a+size)<=RECTWIDTH && (b+size)<=RECTHEIGHT){
  ctx1.fillStyle = '#064276';  //#073156
  ctx1.fillRect(a, b, size, size);
  ctx1.fillStyle = '#0E4778';  //#073156
  ctx1.fillRect(a-size, b-size, size, size);
  ctx1.fillStyle = '#073156';  //#073156 #CBE3F8
  ctx1.fillRect(a, b-size, size, size);
  //ctx1.fillStyle = '#CBE3F8';  //#073156 #CBE3F8
  //ctx1.fillRect(a-size, b, size, size);
  ctx1.strokeStyle = "#064276";
  ctx1.lineWidth = 1;
  ctx1.rect(a, b, size, size);
  ctx1.stroke();
  ctx1.save
  // if ((COUNT % 100) === 0) {
  //   ctx1.fillStyle = "white";
  //   ctx1.font = '72px Helvetica';
  //   ctx1.textAlign = 'center';
  //   ctx1.fillText('Chelsea Analytics', RECTWIDTH/2, RECTHEIGHT/2);
  // }
}

if (COUNT<5000) {
  COUNT = COUNT+1;
  }
else {
  //Print text again so it's on top of animation
  ctx1.fillStyle = "White";
  ctx1.font = '72px Helvetica';
  ctx1.textAlign = 'center';
  ctx1.fillText('Chelsea Analytics', RECTWIDTH/2, RECTHEIGHT/2);
  window.clearInterval(animator);
}

// Draw text
//ctx1.fillStyle = "white";
//if (width > 800) {
//  ctx1.font = '72px Helvetica';
//}
//else {
//  ctx1.font = '36px Helvetica';
//}
//ctx1.textAlign = 'center';
//ctx1.fillText('Chelsea Analytics', width/2, height/2);

}

function Text() {
//ctx1.clearRect(0, 0, RECTWIDTH, RECTHEIGHT);

// if (WIDTH > 800) {
//   ctx1.font = '72px Helvetica';
// }
// else {
//   ctx1.font = '36px Helvetica';
// }
ctx2.fillStyle = "White";
ctx2.font = '72px Helvetica';
ctx2.textAlign = 'center';
ctx2.fillText('Chelsea Analytics', RECTWIDTH/2, RECTHEIGHT/2);

}


// *******************   Main program   ******************* //

var x = 0;
var y = 0;
var size = 40;
var buffer = 0;
var COUNT = 0;

Animation = document.getElementById("Animation");
ctx1 = Animation.getContext('2d');

Text = document.getElementById("Text");
ctx2 = Text.getContext('2d' , );
ctx2.canvas.width = 1200;
ctx2.canvas.height = 800;
ctx2.canvas.left = 500;

var width = ctx1.canvas.width = 1200;
var height = ctx1.canvas.height = 800;

var width2 = ctx2.canvas.width;
var height2 = ctx2.canvas.height;

ctx2.fillStyle = "White";
ctx2.font = '72px Helvetica';
ctx2.textAlign = 'center';
ctx2.fillText('Chelsea Analytics', width2/2, height2/2);


RECTWIDTH = Math.floor((width/size))*size+buffer*2;
RECTHEIGHT = Math.floor((height/size))*size+buffer*2;

ctx1.clearRect(0, 0, RECTWIDTH, RECTHEIGHT);
ctx1.fillStyle = '#BFDDF6';
ctx1.fillRect(0, 0, RECTWIDTH, RECTHEIGHT);


//Draw background
for (x=0;x<RECTWIDTH;x+=size) {
  for (y=0;y<RECTHEIGHT;y+=size) {
   ctx1.rect(x, y, size, size);
   ctx1.stroke();
 }
}

//Text();
var animator = window.setInterval(Animate, 0.25);
