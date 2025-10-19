// Fly control example - fixed to play GIF
// Device acceleration (accelerationY) controls speed

let octopusImg;
let speedMultiplier = 3.0; // How much speed per unit of acceleration
let movementThreshold = 0.1; // Minimum acceleration needed to play

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(200, 220, 255);

    // Create GIF element
    octopusImg = createImg('octopus.gif');
    octopusImg.size(width, height);
    octopusImg.position(0, 0);

    // Lock mobile gestures to prevent browser interference
    lockGestures();

    // Request permission for motion sensors on iOS
    enableGyroTap();
}

function draw() {
    // Update background
    background(200, 220, 255);

    if (window.sensorsEnabled) {
        let moveAmount = abs(accelerationY);

        if (moveAmount < movementThreshold) {
            // Too still -> hide GIF (simulate paused)
            octopusImg.style('visibility', 'hidden');
        } else {
            // Show GIF
            octopusImg.style('visibility', 'visible');

            // Optional: adjust speed via CSS animation (hacky, GIF itself cannot be slowed easily)
            // For precise speed control, GIF needs to be split into frames
        }

        // Display acceleration value
        fill(255, 150, 0);
        stroke(0);
        strokeWeight(4);
        textSize(64);
        text("Accel Y: " + nf(accelerationY, 1, 2), width / 2, 80);

    } else {
        fill(255, 100, 100);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Motion sensors not available", width/2, height/2);
        text("On iOS: Tap to request motion permission", width/2, height/2 + 30);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    octopusImg.size(width, height);
}
