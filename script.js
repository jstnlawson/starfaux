document.addEventListener("DOMContentLoaded", function () {
  const jet = document.getElementById("jetContainer");
  const engine = document.getElementsByClassName("engine")[0];
  const canvas = document.getElementById("gameCanvas");
  const groundMovement = document.getElementsByClassName("ground-movement")[0];
  const nose = document.getElementsByClassName("nose")[0];
  const backWingLeft = document.getElementsByClassName("back-wing__left")[0];
  const backWingRight = document.getElementsByClassName("back-wing__right")[0];

  // Initial jet position in vw units
  let jetX = 50; // Start at center (50vw)
  let jetY = 50; // Start at center (50vh)
  let moveSpeed = 2; // Movement speed in vw
  let movingLeft = false;
  let movingRight = false;
  let movingUp = false;
  let movingDown = false;
  let movingForward = false;
  let movingBackward = false;
  let firingLaser = false;

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
    }
    if (event.key === "s") {
      movingBackward = true;
      engine.classList.add("engine-slow");
      groundMovement.classList.add("ground-movement__slow");
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
    }
    if (event.key === "s") {
      movingBackward = false;
      engine.classList.remove("engine-slow");
      groundMovement.classList.remove("ground-movement__slow");
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
    const offsetLeft = 3; // 3vw for left laser offset
    const offsetRight = 3; // 4vw for right laser offset

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
  }

});
