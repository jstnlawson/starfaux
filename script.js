document.addEventListener("DOMContentLoaded", function () {
  const jet = document.getElementById("jetContainer");
  const enemyJet = document.getElementsByClassName("enemy-jet")[0];
  const enemyJetWrapper = document.getElementsByClassName("enemy-jet-wrapper")[0];
  const engine = document.getElementsByClassName("engine")[0];
  const canvas = document.getElementById("gameCanvas");
  const groundMovement = document.getElementsByClassName("ground-movement")[0];
  const nose = document.getElementsByClassName("nose")[0];
  const backWingLeft = document.getElementsByClassName("back-wing__left")[0];
  const backWingRight = document.getElementsByClassName("back-wing__right")[0];
  const laser = document.getElementsByClassName("laser")[0];
//   const enemyLaser = document.getElementsByClassName("enemy-laser")[0];

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
  let firingLaser = false;

  function jetEntrance() {
    enemyJet.classList.add("jet-entrance-one");
  }

  jetEntrance();

//log jet's translate, scale, rotate
console.log(window.getComputedStyle(jet).transform);

  // Keydown event to start moving
  document.addEventListener("keydown", function (event) {
    console.log(`Key down: ${event.key}`);
    if (event.key === "ArrowLeft") {
      movingLeft = true;
    }
    if (event.key === "ArrowRight") {
      movingRight = true;
    }
    if (event.key === "ArrowUp") {
      movingUp = true;
    }
    if (event.key === "ArrowDown") {
      movingDown = true;
      nose.classList.add("nose--visible");
      backWingLeft.classList.add("back-wing__left--down");
      backWingRight.classList.add("back-wing__right--down");
      engine.classList.add("engine--down");
    }
    if (event.key === "w") {
      movingForward = true;
      engine.classList.add("engine-boost");
      groundMovement.classList.add("ground-movement__fast");
      moveSpeed = 1.5; // Increase movement speed
    }
    if (event.key === "s") {
      movingBackward = true;
      engine.classList.add("engine-slow");
      groundMovement.classList.add("ground-movement__slow");
      moveSpeed = 0.25; // Decrease movement speed
    }
    if (event.key === " ") {
      firingLaser = true;
      fireLaserLoop();
    }
  });

  // Keyup event to stop moving
  document.addEventListener("keyup", function (event) {
    console.log(`Key up: ${event.key}`);
    if (event.key === "ArrowLeft") {
      movingLeft = false;
    }
    if (event.key === "ArrowRight") {
      movingRight = false;
    }
    if (event.key === "ArrowUp") {
      movingUp = false;
    }
    if (event.key === "ArrowDown") {
      movingDown = false;
      nose.classList.remove("nose--visible");
      backWingLeft.classList.remove("back-wing__left--down");
      backWingRight.classList.remove("back-wing__right--down");
      engine.classList.remove("engine--down");
    }
    if (event.key === "w") {
      movingForward = false;
      engine.classList.remove("engine-boost");
      groundMovement.classList.remove("ground-movement__fast");
        moveSpeed = 0.5; // Reset movement speed
    }
    if (event.key === "s") {
      movingBackward = false;
      engine.classList.remove("engine-slow");
      groundMovement.classList.remove("ground-movement__slow");
      moveSpeed = 0.5; // Reset movement speed
    }
    if (event.key === " ") {
      firingLaser = false;
    }
  });

  // Update function for smooth movement
  function update() {
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

  // Adjust the canvas size when the window is resized
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  //});
  //const horizontalOffset = lastLaserLeft ? -2.5 * window.innerWidth / 100 : 3.25 * window.innerWidth / 100; // Horizontal offset in vw

  //Fire laser continuously while spacebar is held down
  function fireLaserLoop() {
    if (firingLaser) {
      fireLaser(); // Fire laser when the spacebar is held
    }
    setTimeout(fireLaserLoop, 200); // Fire every 200ms
  }

  // Start the firing loop
  //fireLaserLoop();

  let lastLaserLeft = true; // Track the last side fired from

  function fireLaser() {
    // Create a new laser element
    const laser = document.createElement("div");
    laser.classList.add("laser");

    // Position the laser at the jet's location (front of the jet)
    const jet = document.getElementById("jetContainer");
    const gunSite = document.querySelector(".gun-site");

    // Get jet and gun-site positions relative to the viewport
    const jetRect = jet.getBoundingClientRect();
    const gunSiteRect = gunSite.getBoundingClientRect();

    // Convert offsets to vw for dynamic sizing
    const offsetLeft = 4; // 3vw for left laser offset
    const offsetRight = 1; // 4vw for right laser offset

    // Calculate the starting position based on the last laser fired
    const startX = lastLaserLeft
      ? jetRect.left +
        jetRect.width / 2 -
        (offsetLeft * window.innerWidth) / 100
      : jetRect.left +
        jetRect.width / 2 +
        (offsetRight * window.innerWidth) / 100;

    const startY = jetRect.top + jetRect.height / 2; // Center of the jet

    // Set the laser position
    laser.style.left = startX + "px";
    laser.style.top = startY + "px";

    // Append the laser to the body
    document.body.appendChild(laser);

    // Calculate the center of the gun site
    //const gunSiteCenterX = gunSiteRect.left + (gunSiteRect.width / 2); // Adjust for the gun site width
    const gunSiteCenterX =
      gunSiteRect.left +
      gunSiteRect.width / 2 +
      (-1.45 * window.innerWidth) / 100;
    const gunSiteCenterY = gunSiteRect.top + gunSiteRect.height / 2;

    // Debugging output
    console.log("Start Position:", startX, startY);
    console.log("Gun Site Center:", gunSiteCenterX, gunSiteCenterY);

    // Calculate the angle to the gun-site
    const deltaX = gunSiteCenterX - startX; // Calculate difference in X
    const deltaY = gunSiteCenterY - startY; // Calculate difference in Y
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // Calculate the angle to the target

    // Set the laser angle
    laser.style.transform = `rotate(${angle}deg)`;

    // Animate the laser to move towards the gun-site and shrink
    setTimeout(() => {
      // Move the laser to the gun-site
      laser.style.left = gunSiteCenterX + "px"; // Center the laser on the gun-site
      laser.style.top = gunSiteCenterY + "px";

      // Shrink the laser as it moves
      laser.style.transform += " scale(0.15)";

      // Remove the laser from the DOM after the animation
      setTimeout(() => {
        laser.remove();
      }, 450); // Match this with the transition duration
    }, 10); // Start the animation slightly after placement

    // Toggle the side for the next laser
    lastLaserLeft = !lastLaserLeft;

    // Get all child elements of enemyJet
    const wings = [
      enemyJet.querySelector(".enemy__left-wing"),
      enemyJet.querySelector(".enemy__right-wing"),
    ];
    const bodyTop = enemyJet.querySelector(".enemy__body__top");
    const bodyBottom = enemyJet.querySelector(".enemy__body__bottom");

    // Combine all elements for hit detection
    const elementsToCheck = [...wings, bodyTop, bodyBottom];

    // Check for overlaps with each inner element
    for (const element of elementsToCheck) {
      const elementRect = element.getBoundingClientRect();

      if (isOverlapping(elementRect, gunSiteRect)) {
        dodgeEnemyJet();
        break; // Exit the loop once a hit is detected
      }
    }
  }

  // Function to check if two rectangles overlap
  function isOverlapping(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

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
    if (!enemyLaser) {
        console.error("enemyLaser is not defined.");
        return; // Prevents the error if enemyLaser isn't created yet
    }
    
    // Get positions of the enemy jet and target jet
    const enemyJetRect = enemyJet.getBoundingClientRect(); // Rect for enemy jet
    const targetJetRect = jet.getBoundingClientRect(); // Rect for target jet (assuming targetJet is defined)

    const laserPos = {
        x: enemyJetRect.left + enemyJetRect.width / 2, // Center of the enemy jet
        y: enemyJetRect.bottom, // Bottom of the enemy jet
    };

    const jetPos = {
        x: targetJetRect.left + targetJetRect.width / 2, // Center of the target jet
        y: targetJetRect.top + targetJetRect.height / 2, // Center of the target jet
    };

    // Calculate angle to rotate laser
    const angle = calculateAngle(laserPos, jetPos);

    // Position and animate the laser
    enemyLaser.style.transform = `rotate(${angle}deg)`;
    enemyLaser.style.left = `${laserPos.x}px`;
    enemyLaser.style.top = `${laserPos.y}px`;
    enemyLaser.style.visibility = 'visible'; // Make the laser visible

    // Move the laser towards the target jet
    const distance = Math.sqrt(Math.pow(jetPos.x - laserPos.x, 2) + Math.pow(jetPos.y - laserPos.y, 2));
    const laserSpeed = 300; // Speed of the laser in pixels per second
    const duration = distance / laserSpeed * 1000; // Duration in milliseconds

    // Animate the laser movement
    enemyLaser.animate([
        { transform: `translateY(0)`, opacity: 1, scale: 0 },
        { transform: `translate(${jetPos.x - laserPos.x}px, ${jetPos.y - laserPos.y}px)`, opacity: 0.5, scale: 2 },
    ], {
        duration: duration,
        easing: 'linear',
        fill: 'forwards',
    });

    // Hide the laser after animation completes
    setTimeout(() => {
        enemyLaser.style.visibility = 'hidden';
    }, duration);
}

function startShooting() {
    setTimeout(() => {
        shootLaser(); // Shoot immediately after 3 seconds
        const randomInterval = Math.floor(Math.random() * 3000) + 1000; // Random between 1 to 5 seconds
        setInterval(shootLaser, randomInterval); // Repeat every random interval
    }, 10000); // Start after 3 seconds
}

// Call this function after the enemy jet entrance
// startShooting();




});
