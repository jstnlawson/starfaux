import { enemyJet, fireUserLaser } from "../user-laser/user-laser.js";

export const jet = document.getElementById("jetContainer");
const engine = document.getElementsByClassName("engine")[0];
const groundMovement = document.getElementsByClassName("ground-movement")[0];
const nose = document.getElementsByClassName("nose")[0];
const backWingLeft = document.getElementsByClassName("back-wing__left")[0];
const backWingRight = document.getElementsByClassName("back-wing__right")[0];
const wKey = document.getElementsByClassName("w-key")[0];
const sKey = document.getElementsByClassName("s-key")[0];
const spaceKey = document.getElementsByClassName("space-key")[0];
const upKey = document.getElementsByClassName("up-key")[0];
const downKey = document.getElementsByClassName("down-key")[0];
const leftKey = document.getElementsByClassName("left-key")[0];
const rightKey = document.getElementsByClassName("right-key")[0];


export const useJetElements = {
    jet,
    engine,
    nose,
    backWingLeft,
    backWingRight,
}

// Initial jet position in vw units
let jetX = 50; // Start at center (50vw)
let jetY = 50; // Start at center (50vh)
let moveSpeed = 0.5; // Movement speed in vw
let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = false;
let movingForward = false;
let movingBackward = false;

export const userJetMovement = {
    jetX,
    jetY,
    moveSpeed,
    movingLeft,
    movingRight,
    movingUp,
    movingDown,
    movingForward,
    movingBackward,
};

let fireInterval;

// Keydown event to start moving
document.addEventListener("keydown", function (event) {
  console.log(`Key down: ${event.key}`);
  if (event.key === "ArrowLeft") {
    leftKey.classList.add("key-pressed");
    movingLeft = true;
  }
  if (event.key === "ArrowRight") {
    movingRight = true;
    rightKey.classList.add("key-pressed");
  }
  if (event.key === "ArrowUp") {
    movingUp = true;
    upKey.classList.add("key-pressed");
  }
  if (event.key === "ArrowDown") {
    movingDown = true;
    downKey.classList.add("key-pressed");
    nose.classList.add("nose--visible");
    backWingLeft.classList.add("back-wing__left--down");
    backWingRight.classList.add("back-wing__right--down");
    engine.classList.add("engine--down");
  }
  if (event.key === "w") {
    movingForward = true;
    wKey.classList.add("key-pressed");
    engine.classList.add("engine-boost");
    groundMovement.classList.add("ground-movement__fast");
    moveSpeed = 1.5; // Increase movement speed
  }
  if (event.key === "s") {
    movingBackward = true;
    sKey.classList.add("key-pressed");
    engine.classList.add("engine-slow");
    groundMovement.classList.add("ground-movement__slow");
    moveSpeed = 0.25; // Decrease movement speed
  }
  if (event.key === " " && !fireInterval) {
    event.preventDefault();
    spaceKey.classList.add("key-pressed");
    firingLaser = true;
    fireInterval = setInterval(() => {
    fireUserLaser();
    }, 75);
  }
});

// Keyup event to stop moving
document.addEventListener("keyup", function (event) {
  console.log(`Key up: ${event.key}`);
  if (event.key === "ArrowLeft") {
    leftKey.classList.remove("key-pressed");
    movingLeft = false;
  }
  if (event.key === "ArrowRight") {
    movingRight = false;
    rightKey.classList.remove("key-pressed");
  }
  if (event.key === "ArrowUp") {
    movingUp = false;
    upKey.classList.remove("key-pressed");
  }
  if (event.key === "ArrowDown") {
    movingDown = false;
    downKey.classList.remove("key-pressed");
    nose.classList.remove("nose--visible");
    backWingLeft.classList.remove("back-wing__left--down");
    backWingRight.classList.remove("back-wing__right--down");
    engine.classList.remove("engine--down");
  }
  if (event.key === "w") {
    movingForward = false;
    wKey.classList.remove("key-pressed");
    engine.classList.remove("engine-boost");
    groundMovement.classList.remove("ground-movement__fast");
    moveSpeed = 0.5; // Reset movement speed
  }
  if (event.key === "s") {
    movingBackward = false;
    sKey.classList.remove("key-pressed");
    engine.classList.remove("engine-slow");
    groundMovement.classList.remove("ground-movement__slow");
    moveSpeed = 0.5; // Reset movement speed
  }
  if (event.key === " ") {
    clearInterval(fireInterval);
    fireInterval = null;
    firingLaser = false;
    spaceKey.classList.remove("key-pressed");
  }
});

// Update function for smooth movement
export function update() {
  // Update jet position
  if (movingLeft) {
    jetX -= moveSpeed; // Move left
    if (jetX < 0) jetX = 0; // Prevent going off the left side
  }
  if (movingRight) {
    jetX += moveSpeed; // Move right
    if (jetX > 100) jetX = 100; // Prevent going off the right side
  }
  if (movingUp) {
    jetY -= moveSpeed; // Move up
    if (jetY < 0) jetY = 0; // Prevent going off the top
  }
  if (movingDown) {
    jetY += moveSpeed; // Move down
    if (jetY > 100) jetY = 100; // Prevent going off the bottom
  }

  // Start with default transformations
  let scale = 0.65; // Default scale
  let rotate = 0; // Default rotation

  // Apply scale changes based on forward and backward movement
  if (movingForward) {
    scale = 0.45; // Scale down when moving forward
  }
  if (movingBackward) {
    scale = 1; // Scale up when moving backward
  }

  // Apply rotation based on left and right movement
  if (movingLeft) {
    rotate = -45; // Rotate left
  }
  if (movingRight) {
    rotate = 45; // Rotate right
  }

  // Combine transformations (scale + rotate)
  let transformString = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`;

  // Update the jet's position and transform
  jet.style.left = jetX + "vw";
  jet.style.top = jetY + "vh";
  jet.style.transform = transformString; // Set the combined transformation

  requestAnimationFrame(update); // Continue updating
}

update(); // Start the update loop

export let firingLaser = false;


//Fire laser continuously while spacebar is held down and jet is moving
export function fireUserLaserLoop() {
  
    if (firingLaser) {
      fireUserLaser(); // Fire laser when the spacebar is held
    }
    setTimeout(fireUserLaserLoop, 1500); // Fire every 200ms
  }