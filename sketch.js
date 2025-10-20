// Octopus GIF controlled by phone tilt (accelerationX/Y)
let octopusImg;
let posX, posY;       // Current position of the octopus
let velX = 0, velY = 0; // Velocity
let damping = 0.95;    // Friction to simulate inertia
let sensitivity = 0.5; // How strongly tilt affects movement

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Create GIF element
    octopusImg = createImg('octopus.gif');
    octopusImg.size(300, 300);
    posX = width / 2;
    posY = height / 2;
    octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

    // Lock gestures to prevent scrolling
    lockGestures();

    // Enable motion permissions on iOS
    enableGyroTap();
}

function draw() {
    background(0);

    if (window.sensorsEnabled) {
        // Update velocity based on phone tilt
        // X axis: left/right tilt
        // Y axis: forward/back tilt (invert for natural feel)
        velX += accelerationX * sensitivity;
        velY -= accelerationY * sensitivity;

        // Apply damping to simulate friction / inertia
        velX *= damping;
        velY *= damping;

        // Update position
        posX += velX;
        posY += velY;

        // Keep the octopus within canvas bounds
        if (posX < 0 || posX > width) velX *= -0.6;
        if (posY < 0 || posY > height) velY *= -0.6;
        posX = constrain(posX, 0, width);
        posY = constrain(posY, 0, height);

        // Move the octopus GIF
        octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

        // Optional: display tilt values
        fill(255, 150, 0);
        stroke(0);
        strokeWeight(3);
        textSize(32);
        textAlign(CENTER);
        text("Tilt your phone to move the octopus!", width / 2, 50);

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
