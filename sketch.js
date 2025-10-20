// Finger-tracking GIF example
let octopusImg;
let prevX = 0;
let prevY = 0;
let speed = 0;
let speedThreshold = 2.0; // Minimum movement speed to show GIF

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Load GIF element
    octopusImg = createImg('octopus.gif');
    octopusImg.size(200, 200); // 初始大小
    octopusImg.position(width/2, height/2);
}

function draw() {
    background(200, 220, 255);

    let currentX, currentY;

    if (touches.length > 0) {
        // Use first touch point
        currentX = touches[0].x;
        currentY = touches[0].y;
    } else {
        // Fallback to mouse
        currentX = mouseX;
        currentY = mouseY;
    }

    // Calculate movement speed
    speed = dist(currentX, currentY, prevX, prevY);

    if (speed > speedThreshold) {
        octopusImg.style('visibility', 'visible');
    } else {
        octopusImg.style('visibility', 'hidden');
    }

    // Move GIF to finger/mouse position
    octopusImg.position(currentX - octopusImg.width/2, currentY - octopusImg.height/2);

    // Display speed
    fill(255, 150, 0);
    stroke(0);
    strokeWeight(4);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Speed: " + nf(speed, 1, 2), width/2, 50);

    // Update previous position
    prevX = currentX;
    prevY = currentY;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
