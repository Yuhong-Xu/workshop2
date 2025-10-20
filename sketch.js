// Octopus GIF - "Sadness Always Follows" final version
let octopusImg;
let posX, posY;
let velX = 0, velY = 0;
let damping = 0.98;       // Inertia for drifting
let sensitivity = 1.0;    // Tilt effect stronger for free movement
let pullBack = 0.02;      // Slow return to center

// Shake detection
let shakeCount = 0;
let lastShakeTime = 0;
let shakeThreshold = 5;    // Acceleration threshold for shake
let shakeCooldown = 500;   // 0.5s cooldown

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    octopusImg = createImg('octopus.gif');
    octopusImg.size(300, 300);
    posX = width / 2;
    posY = height / 2;
    octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

    // Fullscreen canvas without white border
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    lockGestures();
    enableGyroTap();
}

function draw() {
    // Black background for atmosphere
    background(0, 0, 20);

    // Top subtitle
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(24);
    text("Shake me!", width / 2, 30);

    if (window.sensorsEnabled) {
        // Tilt controls velocity
        velX += accelerationX * sensitivity;
        velY += accelerationY * sensitivity; // direction adjusted for natural feel

        // Apply inertia
        velX *= damping;
        velY *= damping;

        // Slow pull back to center
        let centerX = width / 2;
        let centerY = height / 2;
        velX += (centerX - posX) * pullBack;
        velY += (centerY - posY) * pullBack;

        // Update position
        posX += velX;
        posY += velY;

        // Boundary collision + slight jitter
        if (posX < 0 || posX > width) velX *= -0.6;
        if (posY < 0 || posY > height) velY *= -0.6;
        posX = constrain(posX, 0, width);
        posY = constrain(posY, 0, height);

        // Slight jitter when tilt is strong (symbolizes struggle)
        if (abs(accelerationX) > shakeThreshold || abs(accelerationY) > shakeThreshold) {
            posX += random(-2, 2);
            posY += random(-2, 2);

            // Count shakes
            let now = millis();
            if (now - lastShakeTime > shakeCooldown) {
                shakeCount++;
                lastShakeTime = now;
            }
        }

        // Update octopus position
        octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

        // Display center subtitle after 5 shakes
        if (shakeCount >= 5) {
            fill(255, 50, 50);
            stroke(0);
            strokeWeight(2);
            textSize(28);
            textAlign(CENTER);
            text("Accept the sadness passing through you!", width / 2, height / 2);
        }

    } else {
        fill(255, 100, 100);
        textAlign(CENTER, CENTER);
        // something
        textSize(24);
        text("Motion sensors not available", width / 2, height / 2);
        text("Tap to enable on iOS", width / 2, height / 2 + 30);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    octopusImg.size(300, 300);
}
