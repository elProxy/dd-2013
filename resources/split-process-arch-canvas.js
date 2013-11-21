var canvas;
var ctx;
var WIDTH = 640;
var HEIGHT = 480;
var stack = 0;
var state = 0;
var intervalHandle;
var progress = 0;

function drawBackground() {
  var lingrad = ctx.createLinearGradient(0,0,0,HEIGHT);
  lingrad.addColorStop(0, 'black');
  lingrad.addColorStop(0.3, 'black');
  lingrad.addColorStop(1, 'rgba(100, 100, 100, 0.6)');
  ctx.fillStyle = lingrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function initProcessDiagram() {
  canvas = document.getElementById("WebKit2");
  canvas.width = WIDTH;
  canvas.height = HEIGHT
  ctx = canvas.getContext("2d");
  intervalHandle = setInterval(draw, 10);
}

function doKeyDown(evt){
    if (!document.body.classList.contains("impress-on-split-diagrams"))
        return;

// Simpler logic: just press enter...
    if (evt.keyCode == 13) {
        state += 1;
        if (state >= 2) {
            stack = (stack + 1) % 3;
            state = 0;
        }
        intervalHandle = setInterval(draw, 10);
    }
}

function drawStack() {
  ctx.fillStyle = 'white'
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold 16px sans-serif";
  var label;
  switch (stack) {
    case 0:
      label = "WebKit 1";
      break;
    case 1:
      label = "WebKit 2";
      break;
    case 2:
      label = "Chromium";
      break;
  }
  ctx.fillText(label, WIDTH/2, 10);
  ctx.font = "16px sans-serif";
  ctx.textBaseline = "middle";
  var vOffset = 80;

  if (stack == 0) // WebKit1
    vOffset = 150;

  ctx.fillStyle = '#a749a2';
  ctx.fillRect(WIDTH/4, vOffset, WIDTH/2, 60);
  if (stack == 2) // Chromium
    ctx.fillRect(WIDTH/4, vOffset + 80, WIDTH/2, 60);
  ctx.fillStyle = 'white';
  if (stack == 2) { // Chromium
    ctx.fillText("Application (Host Process)", WIDTH/2, vOffset + 30);
    ctx.fillText("Application (Render Process)", WIDTH/2, vOffset + 110);
    vOffset += 80;
  } else
    ctx.fillText("Application", WIDTH/2, vOffset + 30);

  vOffset += 70
  ctx.fillStyle = '#2568a2';
  ctx.fillRect(WIDTH/4, vOffset, WIDTH/2, 60);
  if (stack == 1) // WK2
    ctx.fillRect(WIDTH/4, vOffset + 80, WIDTH/2, 60);
  ctx.fillStyle = 'white';
  if (stack == 1) { //WK2
    ctx.fillText("WebKit (UI Process)", WIDTH/2, vOffset + 30);
    ctx.fillText("WebKit (Web Process)", WIDTH/2, vOffset + 110);
    vOffset += 80;
  } else
  ctx.fillText("WebKit", WIDTH/2, vOffset + 30);

  vOffset += 70
  ctx.fillStyle = '#519f64';
  ctx.fillRect(WIDTH/4, vOffset, WIDTH/2, 60);
  ctx.fillStyle = 'white';
  ctx.fillText("WebCore", WIDTH/2, vOffset + 30);

  vOffset += 70
  ctx.fillStyle = '#a72e02';
  ctx.fillRect(WIDTH/4, vOffset, WIDTH/2, 60);
  ctx.fillStyle = 'white';
  ctx.fillText("JS Engine", WIDTH/2, vOffset + 30);

  switch (stack) {
    case 0:
      drawWebKit1State()
      break;
    case 1:
      drawWebKit2State();
      break;
    case 2:
      drawChromiumState();
      break;
  }
}

function drawWebKit1State() {
  if (!state){
    clearInterval(intervalHandle);
    return;
  }
  else if (state == 1) { //rect animation in progress
    ctx.strokeStyle = 'white';
    animateRect(WIDTH/6, 60, (2 * WIDTH) / 3, 390);
  } else { // rect and text
    ctx.strokeStyle = 'white';
    ctx.strokeRect(WIDTH/6, 60, (2 * WIDTH) / 3, 390);
    ctx.fillStyle = 'white';
    ctx.textBaseline = "top";
    ctx.fillText("Single Process", WIDTH/2, 70);
    clearInterval(intervalHandle);
  }
  //if (state > 2) { // QtWebKit API Level
  //  ctx.strokeStyle = 'yellow';
  //  ctx.stroke
  //}
}

function drawChromiumState() {
  if (!state) {
    clearInterval(intervalHandle);
    return;
  }
  else if (state == 1) { //rect animation in progress
    ctx.strokeStyle = 'white';
    animateRect(WIDTH/6, 50, (2 * WIDTH) / 3, 97);
  } else if (state == 2) { //second rect animation in progress
    ctx.strokeStyle = 'white';
    ctx.strokeRect(WIDTH/6, 50, (2 * WIDTH) / 3, 97);
    ctx.fillStyle = 'white';
    ctx.textBaseline = "top";
    ctx.fillText("Host Process", WIDTH/2, 60);
    animateRect(WIDTH/6, 152, (2 * WIDTH) / 3, 315);
  } else { // rect and text
    ctx.strokeStyle = 'white';
    ctx.strokeRect(WIDTH/6, 50, (2 * WIDTH) / 3, 97);
    ctx.fillStyle = 'white';
    ctx.textBaseline = "top";
    ctx.fillText("Host Process", WIDTH/2, 60);
    ctx.fillText("Render Process", WIDTH/2, 440);
    ctx.strokeRect(WIDTH/6, 152, (2 * WIDTH) / 3, 315);
    clearInterval(intervalHandle);
  }
}

function drawWebKit2State() {
  if (!state) {
    clearInterval(intervalHandle);
    return;
  }
  else if (state == 1) { //rect animation in progress
    ctx.strokeStyle = 'white';
    animateRect(WIDTH/6, 50, (2 * WIDTH) / 3, 167);
  } else if (state == 2) { //second rect animation in progress
    ctx.strokeStyle = 'white';
    ctx.strokeRect(WIDTH/6, 50, (2 * WIDTH) / 3, 167);
    ctx.fillStyle = 'white';
    ctx.textBaseline = "top";
    ctx.fillText("UI Process", WIDTH/2, 60);
    animateRect(WIDTH/6, 222, (2 * WIDTH) / 3, 245);
  } else { // rect and text
    ctx.strokeStyle = 'white';
    ctx.strokeRect(WIDTH/6, 50, (2 * WIDTH) / 3, 167);
    ctx.fillStyle = 'white';
    ctx.textBaseline = "top";
    ctx.fillText("UI Process", WIDTH/2, 60);
    ctx.fillText("Web Process", WIDTH/2, 440);
    ctx.strokeRect(WIDTH/6, 222, (2 * WIDTH) / 3, 245);
    clearInterval(intervalHandle);
  }
}

function animateRect(x, y, width, height) {
    ctx.beginPath();
    progress += 2;
    ctx.moveTo(x, y);
    var totalLength = (width + height) * 2;
    var remaining = (progress * totalLength)/100;
    ctx.lineTo(x + Math.min(width, remaining), y);
    remaining -= width;
    if (remaining > 0)
      ctx.lineTo(x + width, y + Math.min(height, remaining));
    remaining -= height;
    if (remaining > 0)
      ctx.lineTo(x + width - Math.min(width, remaining), y + height);
    remaining -= width;
    if (remaining >0)
      ctx.lineTo(x, y + height - Math.min(height, remaining));
    remaining -= height;
    ctx.stroke();
    if (progress >= 100)
    {
      progress = 0;
      state += 1;
    }
}

function draw() {
  clear();
  drawBackground();
  drawStack();
}

initProcessDiagram();
window.addEventListener('keydown',doKeyDown,true);
