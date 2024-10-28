import { userJetMovement, update, useJetElements } from "./components/user-jet/user-jet.js";

document.addEventListener("DOMContentLoaded", function () {
    
  const jet = document.getElementById("jetContainer");
//   const enemyJet = document.getElementsByClassName("enemy-jet")[0];
//   const enemyJetWrapper = document.getElementsByClassName("enemy-jet-wrapper")[0];
//   const engine = document.getElementsByClassName("engine")[0];
//   const canvas = document.getElementById("gameCanvas");
//   const groundMovement = document.getElementsByClassName("ground-movement")[0];
//   const nose = document.getElementsByClassName("nose")[0];
//   const backWingLeft = document.getElementsByClassName("back-wing__left")[0];
//   const backWingRight = document.getElementsByClassName("back-wing__right")[0];
//   const laser = document.getElementsByClassName("laser")[0];
// //   const enemyLaser = document.getElementsByClassName("enemy-laser")[0];

//   // Initial jet position in vw units
//   let jetX = 50; // Start at center (50vw)
//   let jetY = 50; // Start at center (50vh)
//   let moveSpeed = 0.5; // Movement speed in vw
//   let movingLeft = false;
//   let movingRight = false;
//   let movingUp = false;
//   let movingDown = false;
//   let movingForward = false;
//   let movingBackward = false;
//   let firingLaser = false;

//   // Adjust the canvas size when the window is resized
//   window.addEventListener("resize", function () {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   });

// //   function jetEntrance() {
// //     enemyJet.classList.add("jet-entrance-one");
// //   }

// //   jetEntrance();

// //log jet's translate, scale, rotate
// console.log(window.getComputedStyle(jet).transform);

//   // Keydown event to start moving
//   document.addEventListener("keydown", function (event) {
//     console.log(`Key down: ${event.key}`);
//     if (event.key === "ArrowLeft") {
//       movingLeft = true;
//     }
//     if (event.key === "ArrowRight") {
//       movingRight = true;
//     }
//     if (event.key === "ArrowUp") {
//       movingUp = true;
//     }
//     if (event.key === "ArrowDown") {
//       movingDown = true;
//       nose.classList.add("nose--visible");
//       backWingLeft.classList.add("back-wing__left--down");
//       backWingRight.classList.add("back-wing__right--down");
//       engine.classList.add("engine--down");
//     }
//     if (event.key === "w") {
//       movingForward = true;
//       engine.classList.add("engine-boost");
//       groundMovement.classList.add("ground-movement__fast");
//       moveSpeed = 1.5; // Increase movement speed
//     }
//     if (event.key === "s") {
//       movingBackward = true;
//       engine.classList.add("engine-slow");
//       groundMovement.classList.add("ground-movement__slow");
//       moveSpeed = 0.25; // Decrease movement speed
//     }
//     if (event.key === " ") {
//       firingLaser = true;
//       fireLaserLoop();
//     }
//   });

//   // Keyup event to stop moving
//   document.addEventListener("keyup", function (event) {
//     console.log(`Key up: ${event.key}`);
//     if (event.key === "ArrowLeft") {
//       movingLeft = false;
//     }
//     if (event.key === "ArrowRight") {
//       movingRight = false;
//     }
//     if (event.key === "ArrowUp") {
//       movingUp = false;
//     }
//     if (event.key === "ArrowDown") {
//       movingDown = false;
//       nose.classList.remove("nose--visible");
//       backWingLeft.classList.remove("back-wing__left--down");
//       backWingRight.classList.remove("back-wing__right--down");
//       engine.classList.remove("engine--down");
//     }
//     if (event.key === "w") {
//       movingForward = false;
//       engine.classList.remove("engine-boost");
//       groundMovement.classList.remove("ground-movement__fast");
//         moveSpeed = 0.5; // Reset movement speed
//     }
//     if (event.key === "s") {
//       movingBackward = false;
//       engine.classList.remove("engine-slow");
//       groundMovement.classList.remove("ground-movement__slow");
//       moveSpeed = 0.5; // Reset movement speed
//     }
//     if (event.key === " ") {
//       firingLaser = false;
//     }
//   });

//   // Update function for smooth movement
//   function update() {
//     // Update jet position
//     if (movingLeft) {
//       jetX -= moveSpeed; // Move left
//       if (jetX < 0) jetX = 0; // Prevent going off the left side
//     }
//     if (movingRight) {
//       jetX += moveSpeed; // Move right
//       if (jetX > 100) jetX = 100; // Prevent going off the right side
//     }
//     if (movingUp) {
//       jetY -= moveSpeed; // Move up
//       if (jetY < 0) jetY = 0; // Prevent going off the top
//     }
//     if (movingDown) {
//       jetY += moveSpeed; // Move down
//       if (jetY > 100) jetY = 100; // Prevent going off the bottom
//     }

//     // Start with default transformations
//     let scale = 0.65; // Default scale
//     let rotate = 0; // Default rotation

//     // Apply scale changes based on forward and backward movement
//     if (movingForward) {
//       scale = 0.45; // Scale down when moving forward
//     }
//     if (movingBackward) {
//       scale = 1; // Scale up when moving backward
//     }

//     // Apply rotation based on left and right movement
//     if (movingLeft) {
//       rotate = -45; // Rotate left
//     }
//     if (movingRight) {
//       rotate = 45; // Rotate right
//     }

//     // Combine transformations (scale + rotate)
//     let transformString = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`;

//     // Update the jet's position and transform
//     jet.style.left = jetX + "vw";
//     jet.style.top = jetY + "vh";
//     jet.style.transform = transformString; // Set the combined transformation

//     requestAnimationFrame(update); // Continue updating
//   }

//   update(); // Start the update loop

  
//   //});
//   //const horizontalOffset = lastLaserLeft ? -2.5 * window.innerWidth / 100 : 3.25 * window.innerWidth / 100; // Horizontal offset in vw

//   //Fire laser continuously while spacebar is held down
//   function fireLaserLoop() {
//     if (firingLaser) {
//       fireLaser(); // Fire laser when the spacebar is held
//     }
//     setTimeout(fireLaserLoop, 200); // Fire every 200ms
//   }

//   // Start the firing loop
//   //fireLaserLoop();

//   let lastLaserLeft = true; // Track the last side fired from

//   function fireLaser() {
//     // Create a new laser element
//     const laser = document.createElement("div");
//     laser.classList.add("laser");

//     // Position the laser at the jet's location (front of the jet)
//     const jet = document.getElementById("jetContainer");
//     const gunSite = document.querySelector(".gun-site");

//     // Get jet and gun-site positions relative to the viewport
//     const jetRect = jet.getBoundingClientRect();
//     const gunSiteRect = gunSite.getBoundingClientRect();

//     // Convert offsets to vw for dynamic sizing
//     const offsetLeft = 4; // 3vw for left laser offset
//     const offsetRight = 1; // 4vw for right laser offset

//     // Calculate the starting position based on the last laser fired
//     const startX = lastLaserLeft
//       ? jetRect.left +
//         jetRect.width / 2 -
//         (offsetLeft * window.innerWidth) / 100
//       : jetRect.left +
//         jetRect.width / 2 +
//         (offsetRight * window.innerWidth) / 100;

//     const startY = jetRect.top + jetRect.height / 2; // Center of the jet

//     // Set the laser position
//     laser.style.left = startX + "px";
//     laser.style.top = startY + "px";

//     // Append the laser to the body
//     document.body.appendChild(laser);

//     // Calculate the center of the gun site
//     //const gunSiteCenterX = gunSiteRect.left + (gunSiteRect.width / 2); // Adjust for the gun site width
//     const gunSiteCenterX =
//       gunSiteRect.left +
//       gunSiteRect.width / 2 +
//       (-1.45 * window.innerWidth) / 100;
//     const gunSiteCenterY = gunSiteRect.top + gunSiteRect.height / 2;

//     // Debugging output
//     console.log("Start Position:", startX, startY);
//     console.log("Gun Site Center:", gunSiteCenterX, gunSiteCenterY);

//     // Calculate the angle to the gun-site
//     const deltaX = gunSiteCenterX - startX; // Calculate difference in X
//     const deltaY = gunSiteCenterY - startY; // Calculate difference in Y
//     const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // Calculate the angle to the target

//     // Set the laser angle
//     laser.style.transform = `rotate(${angle}deg)`;

//     // Animate the laser to move towards the gun-site and shrink
//     setTimeout(() => {
//       // Move the laser to the gun-site
//       laser.style.left = gunSiteCenterX + "px"; // Center the laser on the gun-site
//       laser.style.top = gunSiteCenterY + "px";

//       // Shrink the laser as it moves
//       laser.style.transform += " scale(0.15)";

//       // Remove the laser from the DOM after the animation
//       setTimeout(() => {
//         laser.remove();
//       }, 450); // Match this with the transition duration
//     }, 10); // Start the animation slightly after placement

//     // Toggle the side for the next laser
//     lastLaserLeft = !lastLaserLeft;

//     // Get all child elements of enemyJet
//     const wings = [
//       enemyJet.querySelector(".enemy__left-wing"),
//       enemyJet.querySelector(".enemy__right-wing"),
//     ];
//     const leftWing = enemyJet.querySelector(".enemy__left-wing");
//     const rightWing = enemyJet.querySelector(".enemy__right-wing");
//     const bodyTop = enemyJet.querySelector(".enemy__body__top");
//     const bodyBottom = enemyJet.querySelector(".enemy__body__bottom");

//     // Combine all elements for hit detection
//     const elementsToCheck = [...wings, bodyTop, bodyBottom];

//     // Check for overlaps with each inner element
//     for (const element of elementsToCheck) {
//       const elementRect = element.getBoundingClientRect();

//       if (isOverlapping(elementRect, gunSiteRect)) {
//         if (element === bodyTop) {
//             bodyTop.classList.add("body-top--hit");
//         }
//         if (element === bodyBottom) {
//             bodyBottom.classList.add("body-bottom--hit");
//         }
//         if (element === leftWing) {
//             leftWing.classList.add("left-wing--hit");
//         }
//         if (element === rightWing) {
//             rightWing.classList.add("right-wing--hit");
//         }
//         setTimeout(() => {
//             bodyTop.classList.remove("body-top--hit");
//             bodyBottom.classList.remove("body-bottom--hit");
//             leftWing.classList.remove("left-wing--hit");
//             rightWing.classList.remove("right-wing--hit");
//         }, 500); // Reset hit state after 1.5s
//         break; // Exit the loop once a hit is detected
//       }
//     }
//   }

//   // Function to check if two rectangles overlap
//   function isOverlapping(rect1, rect2) {
//     return (
//       rect1.left < rect2.right &&
//       rect1.right > rect2.left &&
//       rect1.top < rect2.bottom &&
//       rect1.bottom > rect2.top
//     );
//   }

  // Keep track of the current dodge position
let currentDodgeX = 0;
let currentDodgeY = 0;

function dodgeEnemyJet() {
    // Randomly choose dodge direction and calculate movement distance
    const dodgeDirection = Math.random() < 0.5 ? -1 : 1;
    const dodgeDistanceX = dodgeDirection * 20; // Adjust dodge distance as needed
    const dodgeDistanceY = dodgeDirection * 10; // Adjust dodge distance as needed

    // Update the current dodge position based on calculated movement
    currentDodgeX += dodgeDistanceX;
    currentDodgeY += dodgeDistanceY;

    // Apply smooth translation
    enemyJet.style.transform = `translate(${currentDodgeX}px, ${currentDodgeY}px)`;
}

const enemyLaser = document.createElement("div");
enemyLaser.classList.add("enemy-laser");
enemyLaser.style.visibility = 'hidden'; // Initially hidden
document.body.appendChild(enemyLaser); // Append it to the body

function calculateAngle(laserPos, jetPos) {
    const deltaX = jetPos.x - laserPos.x;
    const deltaY = jetPos.y - laserPos.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
}

function shootLaser() {
    const newLaser = document.createElement("div");
    newLaser.classList.add("enemy-laser");
    document.body.appendChild(newLaser);

    const enemyJetRect = enemyJet.getBoundingClientRect();
    const targetJetRect = jet.getBoundingClientRect();

    const laserPos = {
        x: enemyJetRect.left + enemyJetRect.width / 2,
        y: enemyJetRect.bottom,
    };

    const jetPos = {
        x: targetJetRect.left + targetJetRect.width / 2,
        y: targetJetRect.top + targetJetRect.height / 2,
    };

    const angle = calculateAngle(laserPos, jetPos);
    newLaser.style.transform = `rotate(${angle}deg)`;
    newLaser.style.left = `${laserPos.x}px`;
    newLaser.style.top = `${laserPos.y}px`;
    newLaser.style.visibility = 'visible';

    const offScreenDistance = 1.5 * Math.max(window.innerWidth, window.innerHeight);
    const endX = laserPos.x + offScreenDistance * Math.cos(angle * Math.PI / 180);
    const endY = laserPos.y + offScreenDistance * Math.sin(angle * Math.PI / 180);

    const laserSpeed = 800;
    const duration = (offScreenDistance / laserSpeed) * 1000;

    const laserAnimation = newLaser.animate([
        { transform: `translateY(0)`, opacity: 1, scale: 0 },
        { transform: `translate(${endX - laserPos.x}px, ${endY - laserPos.y}px)`, opacity: 1, scale: 2 },
    ], {
        duration: duration,
        easing: 'linear',
        fill: 'forwards',
    });

    // Check for collision during the animation
    const checkCollision = setInterval(() => {
        const laserRect = newLaser.getBoundingClientRect();
        const hit = isColliding(laserRect, targetJetRect);
        
        if (hit) {
            // Handle hit logic here (e.g., remove laser, trigger effects)
            console.log("Laser hit the jet!");
            newLaser.remove(); // Remove the laser element
            clearInterval(checkCollision); // Stop checking for collision
            jet.classList.add("user-hit");
            setTimeout(() => {
                jet.classList.remove("user-hit");
            }, 1500); // Reset hit state after 1.5s
        }
    }, 10); // Check every 50ms

    // Remove the laser after animation completes if it hasn't hit anything
    setTimeout(() => {
        if (!newLaser.isConnected) return; // Check if laser is already removed
        newLaser.remove();
        clearInterval(checkCollision); // Stop checking for collision
    }, duration);
}

// Function to check collision between two rectangles
function isColliding(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function startJetAndLaserSequence() {
    enemyJet.classList.add("jet-entrance-one");

    enemyJet.addEventListener("animationstart", () => {
        const checkpoints = [
            { time: 0.45, fired: false },
            { time: 0.475, fired: false },
            { time: 0.5, fired: false },
            { time: 0.65, fired: false },
            { time: 0.675, fired: false },
            { time: 0.7, fired: false },

            
        ];

        checkpoints.forEach(checkpoint => {
            const duration = parseFloat(getComputedStyle(enemyJet).animationDuration) * 1000;
            const checkpointTime = checkpoint.time * duration;

            setTimeout(() => {
                shootLaser();
            }, checkpointTime);
        });
    }, { once: true });
}

startJetAndLaserSequence();


});
