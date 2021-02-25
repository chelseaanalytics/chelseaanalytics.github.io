const canvas = document.querySelector("Canvas");
var gl = document.getElementById('Canvas').getContext('2d');

var x = 0;
var y = 0;
var size = 40;
var buffer = 0;
var count = 0;

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function draw() {

  rectWidth = Math.floor((width/size))*size+buffer*2;
  rectHeight = Math.floor((height/size))*size+buffer*2;

// Draw canvas, but only first time through
  if ((x === 0) && (y === 0)){
    gl.clearRect(0, 0, rectWidth, rectHeight);
    gl.fillStyle = '#6498C6';
    gl.fillRect(0, 0, rectWidth, rectHeight);
  }

// Draw background
  if ((x+size)<=rectWidth) {
    if ((y+size)<=rectHeight) {
      gl.fillStyle = '#BFDDF6';
      gl.fillRect(x, y, size, size);
      gl.strokeStyle = "white";
      gl.lineWidth = 1;
      gl.rect(x, y, size, size);
      gl.stroke();
      //gl.save();
      y += size;
    }
    else {
      y = 0;
      x += size;
    }
  }
  //else {

  //}

 //Draw random fills
  a = Math.random()*rectWidth;
  //a = Math.round(a/size)*size;
  b = Math.random()*rectHeight;
  //b = Math.round(b/size)*size;

  //if((a+size)<=rectWidth && (b+size)<=rectHeight){
    gl.fillStyle = '#064276';  //#073156
    gl.fillRect(a, b, size, size);
    gl.fillStyle = '#064276';  //#073156
    gl.fillRect(a-size, b-size, size, size);
    gl.fillStyle = '#073156';  //#073156 #CBE3F8
    gl.fillRect(a, b-size, size, size);
    //gl.fillStyle = '#CBE3F8';  //#073156 #CBE3F8
    //gl.fillRect(a-size, b, size, size);
    //gl.strokeStyle = "grey";
    //gl.lineWidth = 1;
    //gl.rect(a, b, size, size);
    //gl.stroke();
    gl.save
  //}
  //else {
  //  a = 0;
  //  b = 0;
  //}




  //Animate
  window.setInterval(draw, 20);
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
  gl.restore();



  canvas.addEventListener("mousemove", on_mousemove, false);
  canvas.addEventListener("click", on_click, false);

}

draw();


  //for(i=0;i<=rectWidth;i+=size) {
  //  for (j=0;j<=rectHeight;j+=size) {
  //if(((buffer+i+size)<=(rectWidth)) && ((buffer+j+size)<=(rectHeight))) {
    //gl.rect(20, 20+i, 100, 100);
    //if((i+j)%3 === 0){
      //gl.fillStyle = '#BFDDF6';
      //gl.fillRect(buffer+i, buffer+j, size, size);
      //gl.save();
    //}
    //x = Math.floor(Math.random()*rectWidth);
    //y = Math.floor(Math.random()*rectHeight);
    //if(((x+size)<rectWidth) && (y+size)<rectHeight){
      //gl.fillStyle = '#073156';  //#073156
      //gl.fillRect(x, y, size, size);
      //gl.fillStyle = '#064276';  //#073156
      //gl.fillRect(x-size, y-size, size, size);
      //gl.save
    //}
    //gl.strokeStyle = "white";
    //gl.lineWidth = 1;
    //gl.rect(buffer+i, buffer+j, size, size);
    //gl.stroke();

  //}
    //}
  //}

//  gl.fillStyle = "white";
//  gl.font = '72px helvetica';
//  gl.fillText('Chelsea Analytics', rectWidth/16, rectHeight/2);
//  window.requestAnimationFrame(main);
//  gl.textAlign = 'left';
//  var a = document.createElement('a');

// Main Program


//window.requestAnimationFrame(main);
