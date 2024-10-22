document.addEventListener('DOMContentLoaded', function() {
    const spaceship = document.getElementById('spaceshipContainer');
    const canvas = document.getElementById('gameCanvas');

    // Initial spaceship position in vw units
    let spaceshipX = 50;  // Start at center (50vw)
    let spaceshipY = 50;  // Start at center (50vh)
    let moveSpeed = 2;  // Movement speed in vw
    let movingLeft = false;
    let movingRight = false;
    let movingUp = false;
    let movingDown = false;

    // Keydown event to start moving
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            movingLeft = true;
        }
        if (event.key === 'ArrowRight') {
            movingRight = true;
        }
        if (event.key === 'ArrowUp') {
            movingUp = true;
        }
        if (event.key === 'ArrowDown') {
            movingDown = true;
        }
    });

    // Keyup event to stop moving
    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowLeft') {
            movingLeft = false;
        }
        if (event.key === 'ArrowRight') {
            movingRight = false;
        }
        if (event.key === 'ArrowUp') {
            movingUp = false;
        }
        if (event.key === 'ArrowDown') {
            movingDown = false;
        }
    });

    // Update function for smooth movement
    function update() {
        // Update spaceship position
        if (movingLeft) {
            spaceshipX -= moveSpeed;  // Move left
            if (spaceshipX < 0) spaceshipX = 0;  // Prevent going off the left side
        } 
        if (movingRight) {
            spaceshipX += moveSpeed;  // Move right
            if (spaceshipX > 100) spaceshipX = 100;  // Prevent going off the right side
        }
        if (movingUp) {
            spaceshipY -= moveSpeed;  // Move up
            if (spaceshipY < 0) spaceshipY = 0;  // Prevent going off the top
        }
        if (movingDown) {
            spaceshipY += moveSpeed;  // Move down
            if (spaceshipY > 100) spaceshipY = 100;  // Prevent going off the bottom
        }

        // Determine the current transformation based on movement
        let transformString = `translate(-50%, -50%) scale(0.75) rotate(0deg)`; // Default transform

        if (movingLeft) {
            transformString = `translate(-50%, -50%) scale(0.75) rotate(-45deg)`;
        }
        if (movingRight) {
            transformString = `translate(-50%, -50%) scale(0.75) rotate(45deg)`;
        }

        // Update the spaceship's position and transform
        spaceship.style.left = spaceshipX + 'vw';
        spaceship.style.top = spaceshipY + 'vh';
        spaceship.style.transform = transformString; // Set the combined transformation

        requestAnimationFrame(update);  // Continue updating
    }

    update();  // Start the update loop

    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
