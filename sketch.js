// Octopus GIF - "Sadness Always Follows" with Intro Page and Creepster font
let octopusImg;
let posX, posY;
let velX = 0, velY = 0;
let damping = 0.98;
let sensitivity = 1.0;
let pullBack = 0.02;

// Shake detection
let shakeCount = 0;
let lastShakeTime = 0;
let shakeThreshold = 5;
let shakeCooldown = 500;

// Zooming subtitle
let showZoomText = false;
let zoomTextSize = 10;       
let zoomMaxSize = 150;       

// Font
let creepsterFont;

// Intro page flag
let introActive = true;

function preload() {
    creepsterFont = loadFont('fonts/Creepster-Regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    octopusImg = createImg('octopus.gif');
    octopusImg.size(300, 300);
    posX = width / 2;
    posY = height / 2;
    octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    lockGestures();
    enableGyroTap();

    textFont(creepsterFont);
}

function draw() {
    background(0); // black background for both intro and main

    if (introActive) {
        // Initial page text
        fill(255, 150, 0); // orange
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(36);
        text("Shake the Sadness Octopus hard to try to shake it off!", width / 2, height / 2);
        return; // skip rest until user shakes
    }

    // Top subtitle
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(24);
    text("Shake me!", width / 2, 30);

    // Tilt-based interaction
    if (window.sensorsEnabled) {
        velX += accelerationX * sensitivity;
        velY += accelerationY * sensitivity;

        velX *= damping;
        velY *= damping;

        let centerX = width / 2;
        let centerY = height / 2;
        velX += (centerX - posX) * pullBack;
        velY += (centerY - posY) * pullBack;

        posX += velX;
        posY += velY;

        if (posX < 0 || posX > width) velX *= -0.6;
        if (posY < 0 || posY > height) velY *= -0.6;
        posX = constrain(posX, 0, width);
        posY = constrain(posY, 0, height);

        // Slight jitter and shake detection
        if (abs(accelerationX) > shakeThreshold || abs(accelerationY) > shakeThreshold) {
            posX += random(-2, 2);
            posY += random(-2, 2);

            let now = millis();
            if (now - lastShakeTime > shakeCooldown) {
                shakeCount++;
                lastShakeTime = now;

                // End intro on first shake
                if (introActive) {
                    introActive = false;
                }
            }
        }

        octopusImg.position(posX - octopusImg.width / 2, posY - octopusImg.height / 2);

        // Zooming subtitle after 7 shakes
        if (shakeCount >= 7) {
            showZoomText = true;
        }

        if (showZoomText) {
            fill(255, 50, 50);
            stroke(0);
            strokeWeight(2);
            textAlign(CENTER, CENTER);
            zoomTextSize = min(zoomTextSize + 1.5, zoomMaxSize);
            textSize(zoomTextSize);
            text("Accept the sadness passing through you!", width / 2, height / 2);
        }

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
