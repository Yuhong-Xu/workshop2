// Octopus GIF - "Sadness Always Follows" version
let octopusImg;
let posX, posY;       
let velX = 0, velY = 0; 
let damping = 0.98;       // Inertia for slow drifting
let sensitivity = 0.3;    // Tilt effect is small, representing "unshakable weight"

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Create GIF
    octopusImg = createImg('octopus.gif');
    octopusImg.size(300, 300);
    posX = width / 2;
    posY = height / 2;
    octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

    // Fullscreen canvas without white border
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    // Mobile gestures / sensor permission
    lockGestures();
    enableGyroTap();
}

function draw() {
    // Black background for deep night solitude feeling
    background(0, 0, 20);

    if (window.sensorsEnabled) {
        // Tilt controls velocity
        velX += accelerationX * sensitivity;
        velY -= accelerationY * sensitivity;

        // Inertia drifting
        velX *= damping;
        velY *= damping;

        // Octopus slowly returns to center (symbolizing sadness that can't be shaken off)
        let centerX = width / 2;
        let centerY = height / 2;
        let pullBack = 0.05; // Pull-back strength
        velX += (centerX - posX) * pullBack;
        velY += (centerY - posY) * pullBack;

        // Update position
        posX += velX;
        posY += velY;

        // Boundary collision + slight shake (symbolizing struggle)
        if (posX < 0 || posX > width) velX *= -0.6;
        if (posY < 0 || posY > height) velY *= -0.6;
        posX = constrain(posX, 0, width);
        posY = constrain(posY, 0, height);

        // Slight jitter when tilt is strong
        if (abs(accelerationX) > 5 || abs(accelerationY) > 5) {
            posX += random(-2, 2);
            posY += random(-2, 2);
        }

        // Update octopus position
        octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

        // Display message
        fill(255, 50, 50);
        stroke(0);
        strokeWeight(2);
        textSize(28);
        textAlign(CENTER);
        text("Sadness always follows, can't shake it off...", width / 2, 50);

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
