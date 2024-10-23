document.addEventListener("DOMContentLoaded", function () {
  const spaceship = document.getElementById("spaceshipContainer");
  const engine = document.getElementsByClassName("engine")[0];
  const canvas = document.getElementById("gameCanvas");
  const groundMovement = document.getElementsByClassName("ground-movement")[0];
  const nose = document.getElementsByClassName("nose")[0];
  const backWingLeft = document.getElementsByClassName("back-wing__left")[0];
  const backWingRight = document.getElementsByClassName("back-wing__right")[0];

  // Initial spaceship position in vw units
  let spaceshipX = 50; // Start at center (50vw)
  let spaceshipY = 50; // Start at center (50vh)
  let moveSpeed = 2; // Movement speed in vw
  let movingLeft = false;
  let movingRight = false;
  let movingUp = false;
  let movingDown = false;
  let movingForward = false;
  let movingBackward = false;

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
      console.log("Left Wing Classes:", backWingLeft.classList); // Log classes
      console.log("Right Wing Classes:", backWingRight.classList);
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
      console.log("Left Wing Classes:", backWingLeft.classList); // Log classes
      console.log("Right Wing Classes:", backWingRight.classList);
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
  });

  // Update function for smooth movement
  function update() {
    // Update spaceship position
    if (movingLeft) {
      spaceshipX -= moveSpeed; // Move left
      if (spaceshipX < 0) spaceshipX = 0; // Prevent going off the left side
    }
    if (movingRight) {
      spaceshipX += moveSpeed; // Move right
      if (spaceshipX > 100) spaceshipX = 100; // Prevent going off the right side
    }
    if (movingUp) {
      spaceshipY -= moveSpeed; // Move up
      if (spaceshipY < 0) spaceshipY = 0; // Prevent going off the top
    }
    if (movingDown) {
      spaceshipY += moveSpeed; // Move down
      if (spaceshipY > 100) spaceshipY = 100; // Prevent going off the bottom
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

    // Update the spaceship's position and transform
    spaceship.style.left = spaceshipX + "vw";
    spaceship.style.top = spaceshipY + "vh";
    spaceship.style.transform = transformString; // Set the combined transformation

    requestAnimationFrame(update); // Continue updating
  }

  update(); // Start the update loop

  // Adjust the canvas size when the window is resized
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function createPillar() {
    // Create a new pillar element
    const pillar = document.createElement("div");
    pillar.classList.add("pillar");

    // Get a random x position between 0 and 100vw
    let randomX = Math.random() * 100; // Random value between 0 and 100
    pillar.style.left = randomX + "vw"; // Set the random x position

    // Set initial scale and position (start at scale 0)
    pillar.style.transform = "scale(0)";
    pillar.style.bottom = "50vh";

    // Append pillar to the game container
    document.body.appendChild(pillar);

    // Determine the direction and set the animation
    let direction = "none";
    if (randomX < 50) {
      direction = "left"; // Move to the left
    } else if (randomX > 50) {
      direction = "right"; // Move to the right
    } else {
      direction = "straight"; // Stay straight if at center
    }

    // Start the animation
    animatePillar(pillar, direction);
  }

  // Function to animate the pillar
  function animatePillar(pillar, direction) {
    let startY = 35; // Start from 50vh
    let endY = -100; // End at 0vh (bottom of the screen)
    let currentScale = 0; // Start at scale(0)
    let scaleIncrement = 0.02; // Amount to scale per frame
    let xMove = 0; // Horizontal movement adjustment

    // Set xMove based on direction
    if (direction === "left") {
      xMove = -0.5; // Move left slightly each frame
    }
    if (direction === "right") {
      xMove = 0.5; // Move right slightly each frame
    } else if (direction === "straight") {
      xMove = 0; // Don't move horizontally
    }

    // Update function to move and scale the pillar
    function updatePillar() {
      // startY -= 0.5; // Move down 1vh per frame
      // currentScale += scaleIncrement; // Gradually increase scale

      let time = 0; // A variable to track how long the pillar has been moving
      let duration = 2000; // Total duration of movement in milliseconds
      let accelerationFactor = 0.05; // Adjust this value to control acceleration
      let initialStartY = startY; // Save the starting position to calculate change

      // Calculate the elapsed time as a fraction of the total duration
      time += accelerationFactor; // Increment time

      // Use cubic easing-in for acceleration: starts slow, accelerates towards the end
      let progress = time / duration; // A value from 0 to 1
      let easeInProgress = progress ** 3; // Cubic easing-in (accelerates over time)

      // Update the position based on easing (start slow, accelerate at the end)
      startY = initialStartY - easeInProgress * (initialStartY - endY); // Calculate new position

      currentScale += scaleIncrement; // Gradually increase scale

      // Update position and scale
      pillar.style.bottom = startY + "vh";
      pillar.style.transform = `scale(${currentScale})`;

      // Move left or right based on direction
      let currentX = parseFloat(pillar.style.left);
      pillar.style.left = currentX + xMove + "vw";

      // Remove the pillar when it goes off-screen
      if (startY <= endY) {
        pillar.remove(); // Remove the element from the DOM
      } else {
        requestAnimationFrame(updatePillar); // Continue the animation
      }
    }

    requestAnimationFrame(updatePillar);
  }

  // Spawn pillars every few seconds for demonstration
  setInterval(createPillar, 3000); // Adjust interval as needed
});
