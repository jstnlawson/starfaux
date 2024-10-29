import { jet } from "../user-jet/user-jet.js";

export function calculateAngle(laserPos, jetPos) {
    const deltaX = jetPos.x - laserPos.x;
    const deltaY = jetPos.y - laserPos.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
}

export function shootLaser() {
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
            document.dispatchEvent(new CustomEvent("laserHit"));
            
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

let hitCounter = 0;
// Event listener for 'laserHit' to update hit counter and health bar
document.addEventListener("laserHit", () => {
    hitCounter++;
    console.log("Hit Counter:", hitCounter);

    // Handle visual changes for the health bar
    const healthBar = document.querySelector(".health-bar");
    healthBar.classList.add(`user-damage__${hitCounter}`);

    // Optional: Trigger jet hit effects
    jet.classList.add("user-hit");
    setTimeout(() => {
        jet.classList.remove("user-hit");
    }, 1500);

    // Stop tracking hits once hitCounter reaches 10
    if (hitCounter >= 10) {
        document.removeEventListener("laserHit", incrementHitCounter); // Stop listener after 10 hits
    }
});

// export Function to check collision between two rectangles
export function isColliding(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

export const laserFunctions = {
    calculateAngle,
    shootLaser,
    isColliding
};