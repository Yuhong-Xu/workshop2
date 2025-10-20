// Octopus with motion-based floating effect
// Move your phone to make the octopus sway!

let octopusImg;
let posX, posY;        // Octopus position
let velX = 0, velY = 0; // Velocity
let damping = 0.95;     // Friction / resistance
let sensitivity = 0.4;  // How much motion affects the octopus

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Create GIF element
    octopusImg = createImg('octopus.gif');
    octopusImg.size(300, 300);
    octopusImg.position(width / 2 - 150, height / 2 - 150);

    // Initial position
    posX = width / 2;
    posY = height / 2;

    // Lock gestures to avoid browser scrolling
    lockGestures();

    // Enable iOS motion permission
    enableGyroTap();
}

function draw() {
    background(200, 220, 255);

    if (window.sensorsEnabled) {
        // Apply acceleration to velocity (inverted Y for natural feel)
        velX += accelerationX * sensitivity;
        velY -= accelerationY * sensitivity;

        // Apply damping to simulate friction
        velX *= damping;
        velY *= damping;

        // Update position
        posX += velX;
        posY += velY;

        // Boundary limits (soft bounce)
        if (posX < 0 || posX > width) velX *= -0.6;
        if (posY < 0 || posY > height) velY *= -0.6;

        // Clamp position
        posX = constrain(posX, 0, width);
        posY = constrain(posY, 0, height);

        // Move the octopus image
        octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

        // Display status
        fill(255, 150, 0);
        stroke(0);
        strokeWeight(3);
        textSize(32);
        textAlign(CENTER);
        text("Move your phone!", width / 2, 50);

    } else {
        fill(255, 100, 100);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Motion sensors not available", width / 2, height / 2);
        text("Tap to enable on iOS", width / 2, height / 2 + 30);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    octopusImg.size(300, 300);
}
