import { jet } from "../user-jet/user-jet.js";
import { triggerEnemyVictory, enemyVictoryTriggered } from "../enemy-jet/enemy-jet.js";

export function calculateAngle(laserPos, jetPos) {
    const deltaX = jetPos.x - laserPos.x;
    const deltaY = jetPos.y - laserPos.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
}

export function shootLaser() {
    if (enemyVictoryTriggered) return;
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
    

    const userBody = [
        jet.querySelector(".body__left"),
        jet.querySelector(".body__right"),
    ];
    const leftWing = jet.querySelector(".back-wing__left");
    const rightWing = jet.querySelector(".back-wing__right");
    
    const elementsToCheck = [...userBody, leftWing, rightWing];
    
    const checkCollision = setInterval(() => {
        const laserRect = newLaser.getBoundingClientRect();
      
        // Check for overlaps with each inner element
        for (const element of elementsToCheck) {

            const elementRect = element.getBoundingClientRect();
            
            if (isColliding(laserRect, elementRect)) {
                // Dispatch a hit event
                document.dispatchEvent(new CustomEvent("laserHit"));
    
                if (element === userBody[0]) {
                    element.classList.add("body__left--hit");
                } else if (element === userBody[1]) {
                    element.classList.add("body__right--hit");
                } else if (element === leftWing) {
                    element.classList.add("back-wing__left--hit");
                } else if (element === rightWing) {
                    element.classList.add("back-wing__right--hit");
                }
            
    
                // Remove laser, clear interval
                newLaser.remove();
                clearInterval(checkCollision);
    
                // Reset the hit state after 0.5s
                setTimeout(() => {
                    userBody[0].classList.remove("body__left--hit");
                    userBody[1].classList.remove("body__right--hit");
                    leftWing.classList.remove("back-wing__left--hit");
                    rightWing.classList.remove("back-wing__right--hit");
                }, 500);
                break; // Exit loop once a hit is detected
            }
        }
    }, 10); // Check every 10ms
    
    // Remove the laser after the animation completes if it hasn't hit anything
    setTimeout(() => {
        if (!newLaser.isConnected) return; // Check if laser is already removed
        newLaser.remove();
        clearInterval(checkCollision); // Stop checking for collision
    }, duration);

}

let hitCounter = 0;

document.addEventListener("laserHit", () => {
    const smoke = document.querySelector(".smoke");
    const smokeWispOne = document.querySelector(".smoke-wisp__one");
    const smokeWispTwo = document.querySelector(".smoke-wisp__two");
    const smokeWispThree = document.querySelector(".smoke-wisp__three");
    const groundMovement = document.querySelector(".ground-movement");
    const shieldBar = document.querySelector(".shield-bar");
    const healthBar = document.querySelector(".health-bar");
    const shield = document.querySelector(".shield");
    hitCounter++;
    console.log("Hit Counter:", hitCounter);

    // hits 1 to 5 decrease shield bar

    if (hitCounter <= 5) {
        shieldBar.classList.add(`shield-damage__${hitCounter}`);
        shield.classList.add("shield--visible");
        setTimeout(() => {
            shield.classList.remove("shield--visible");
        }, 250);
    }
    
    // hits 6 to 15 decrease health bar

    if (hitCounter >= 6) {
        healthBar.classList.add(`user-damage__${hitCounter}`);
    }

    if (hitCounter >= 12) {
        smoke.classList.add("add-smoke");
    }

    if (hitCounter >= 15 && !enemyVictoryTriggered) {
        jet.classList.add("jet-crash-animation");
        smokeWispOne.classList.add("big-smoke");
        smokeWispTwo.classList.add("big-smoke");
        smokeWispThree.classList.add("big-smoke");
        groundMovement.classList.add("ground-movement__stop");
        triggerEnemyVictory();
        console.log("Game Over!");
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