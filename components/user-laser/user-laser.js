
export const enemyJet = document.getElementsByClassName("enemy-jet")[0];

// export let firingLaser = false;
export let lastLaserLeft = true; // Track the last side fired from

// export const gunSite = document.querySelector(".gun-site");
// export const gunSiteRect = gunSite.getBoundingClientRect();



//Fire laser continuously while spacebar is held down
// export function fireUserLaserLoop() {
  
//     if (firingLaser) {
//       fireUserLaser(); // Fire laser when the spacebar is held
//     }
//     setTimeout(fireUserLaserLoop, 200); // Fire every 200ms
//   }
  
  // export function fireUserLaser(event) {
  //   event.preventDefault();
    
  //   // Create a new laser element
  //   const laser = document.createElement("div");
  //   laser.classList.add("laser");
  
  //   // Position the laser at the jet's location (front of the jet)
  //   const jet = document.getElementById("jetContainer");
  //   const gunSite = document.querySelector(".gun-site");
  
  //   // Get jet and gun-site positions relative to the viewport
  //   const jetRect = jet.getBoundingClientRect();
  //   const gunSiteRect = gunSite.getBoundingClientRect();
  
  //   // Convert offsets to vw for dynamic sizing
  //   const offsetLeft = 4; 
  //   const offsetRight = 1; 
  
  //   // Calculate the starting position based on the last laser fired
  //   const startX = lastLaserLeft
  //     ? jetRect.left + jetRect.width / 2 - (offsetLeft * window.innerWidth) / 100
  //     : jetRect.left +
  //       jetRect.width / 2 +
  //       (offsetRight * window.innerWidth) / 100;
  
  //   const startY = jetRect.top + jetRect.height / 2; // Center of the jet
  
  //   // Set the laser position
  //   laser.style.left = startX + "px";
  //   laser.style.top = startY + "px";
  
  //   // Append the laser to the body
  //   document.body.appendChild(laser);
  
  //   // Calculate the center of the gun site
  //   //const gunSiteCenterX = gunSiteRect.left + (gunSiteRect.width / 2); // Adjust for the gun site width
  //   const gunSiteCenterX =
  //     gunSiteRect.left +
  //     gunSiteRect.width / 2 +
  //     (-1.45 * window.innerWidth) / 100;
  //   const gunSiteCenterY = gunSiteRect.top + gunSiteRect.height / 2;
  
  //   // Debugging output
  //   console.log("Start Position:", startX, startY);
  //   console.log("Gun Site Center:", gunSiteCenterX, gunSiteCenterY);
  
  //   // Calculate the angle to the gun-site
  //   const deltaX = gunSiteCenterX - startX; // Calculate difference in X
  //   const deltaY = gunSiteCenterY - startY; // Calculate difference in Y
  //   const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // Calculate the angle to the target
  
  //   // Set the laser angle
  //   laser.style.transform = `rotate(${angle}deg)`;
  
  //   // Animate the laser to move towards the gun-site and shrink
  //   setTimeout(() => {
  //     // Move the laser to the gun-site
  //     laser.style.left = gunSiteCenterX + "px"; // Center the laser on the gun-site
  //     laser.style.top = gunSiteCenterY + "px";
  
  //     // Shrink the laser as it moves
  //     laser.style.transform += " scale(0.15)";
  
  //     // Remove the laser from the DOM after the animation
  //     setTimeout(() => {
  //       laser.remove();
  //     }, 450); // Match this with the transition duration
  //   }, 10); // Start the animation slightly after placement
  
  //   // Toggle the side for the next laser
  //   lastLaserLeft = !lastLaserLeft;
  
  //   // // Get all child elements of enemyJet
  //   const wings = [
  //     enemyJet.querySelector(".enemy__left-wing"),
  //     enemyJet.querySelector(".enemy__right-wing"),
  //   ];
  //   const leftWing = enemyJet.querySelector(".enemy__left-wing");
  //   const rightWing = enemyJet.querySelector(".enemy__right-wing");
  //   const bodyTop = enemyJet.querySelector(".enemy__body__top");
  //   const bodyBottom = enemyJet.querySelector(".enemy__body__bottom");
  
  //   // // Combine all elements for hit detection
  //   const elementsToCheck = [...wings, bodyTop, bodyBottom];
  
  //   // // Check for overlaps with each inner element
  //   for (const element of elementsToCheck) {
  //     const elementRect = element.getBoundingClientRect();
  
  //     if (isOverlapping(elementRect, gunSiteRect)) {
  //       document.dispatchEvent(new CustomEvent("enemyHit"));
  //       if (element === bodyTop) {
  //         bodyTop.classList.add("body-top--hit");
  //       }
  //       if (element === bodyBottom) {
  //         bodyBottom.classList.add("body-bottom--hit");
  //       }
  //       if (element === leftWing) {
  //         leftWing.classList.add("left-wing--hit");
  //       }
  //       if (element === rightWing) {
  //         rightWing.classList.add("right-wing--hit");
  //       }
  //       setTimeout(() => {
  //         bodyTop.classList.remove("body-top--hit");
  //         bodyBottom.classList.remove("body-bottom--hit");
  //         leftWing.classList.remove("left-wing--hit");
  //         rightWing.classList.remove("right-wing--hit");
  //       }, 500); // Reset hit state after 1.5s
  //       break; // Exit the loop once a hit is detected
  //     }
  //   }
  // }

  export function fireUserLaser(event = null) {
    if (event) {
      event.preventDefault();
    }
    
    // Create a new laser element
    const laser = document.createElement("div");
    laser.classList.add("laser");
  
    // Position the laser at the jet's location
    const jet = document.getElementById("jetContainer");
    const gunSite = document.querySelector(".gun-site");
  
    // Get jet and gun-site positions
    const jetRect = jet.getBoundingClientRect();
    const gunSiteRect = gunSite.getBoundingClientRect();
  
    // Calculate starting position based on the last laser fired
    const offsetLeft = 4;
    const offsetRight = 1;
    const startX = lastLaserLeft
      ? jetRect.left + jetRect.width / 2 - (offsetLeft * window.innerWidth) / 100
      : jetRect.left + jetRect.width / 2 + (offsetRight * window.innerWidth) / 100;
    const startY = jetRect.top + jetRect.height / 2;
  
    // Set laser's starting position and append to the body
    laser.style.left = startX + "px";
    laser.style.top = startY + "px";
    document.body.appendChild(laser);

        // Calculate the center of the gun site
    // const gunSiteCenterX = gunSiteRect.left + (gunSiteRect.width / 2); // Adjust for the gun site width
    const gunSiteCenterX =
      gunSiteRect.left +
      gunSiteRect.width / 2 +
      (-1.45 * window.innerWidth) / 100;
    const gunSiteCenterY = gunSiteRect.top + gunSiteRect.height / 2;

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

      // // Get all child elements of enemyJet
    const wings = [
      enemyJet.querySelector(".enemy__left-wing"),
      enemyJet.querySelector(".enemy__right-wing"),
    ];
    const leftWing = enemyJet.querySelector(".enemy__left-wing");
    const rightWing = enemyJet.querySelector(".enemy__right-wing");
    const bodyTop = enemyJet.querySelector(".enemy__body__top");
    const bodyBottom = enemyJet.querySelector(".enemy__body__bottom");
  
    // // Combine all elements for hit detection
    const elementsToCheck = [...wings, bodyTop, bodyBottom];
  
    // // Check for overlaps with each inner element
    for (const element of elementsToCheck) {
      const elementRect = element.getBoundingClientRect();
  
      if (isOverlapping(elementRect, gunSiteRect)) {
        document.dispatchEvent(new CustomEvent("enemyHit"));
        if (element === bodyTop) {
          bodyTop.classList.add("body-top--hit");
        }
        if (element === bodyBottom) {
          bodyBottom.classList.add("body-bottom--hit");
        }
        if (element === leftWing) {
          leftWing.classList.add("left-wing--hit");
        }
        if (element === rightWing) {
          rightWing.classList.add("right-wing--hit");
        }
        setTimeout(() => {
          bodyTop.classList.remove("body-top--hit");
          bodyBottom.classList.remove("body-bottom--hit");
          leftWing.classList.remove("left-wing--hit");
          rightWing.classList.remove("right-wing--hit");
        }, 500); // Reset hit state after 1.5s
        break; // Exit the loop once a hit is detected
      }
    }
  
    // // Combine all elements for hit detection
    // const elementsToCheck = [
    //   enemyJet.querySelector(".enemy__left-wing"),
    //   enemyJet.querySelector(".enemy__right-wing"),
    //   enemyJet.querySelector(".enemy__body__top"),
    //   enemyJet.querySelector(".enemy__body__bottom")
    // ];
  
    // // Check for overlaps every few milliseconds
    // const collisionCheck = setInterval(() => {
    //   const laserRect = laser.getBoundingClientRect();
    //   elementsToCheck.forEach((element) => {
    //     const elementRect = element.getBoundingClientRect();
        
    //     if (isOverlapping(laserRect, elementRect)) {
    //       document.dispatchEvent(new CustomEvent("enemyHit"));
          
    //       // Apply hit animation and styles
    //       element.classList.add(`${element.classList[0]}--hit`);
    //       setTimeout(() => {
    //         element.classList.remove(`${element.classList[0]}--hit`);
    //       }, 500);
          
    //       // Stop checking for this laser after a hit
    //       clearInterval(collisionCheck);
    //     }
    //   });
    // }, 10);
  }
  

  let enemyHitCounter = 0;
// Event listener for 'laserHit' to update hit counter and health bar
document.addEventListener("enemyHit", () => {
    enemyHitCounter++;
    console.log("enemy Hit Counter:", enemyHitCounter);

    // Handle visual changes for the health bar
    const enemyHealthBar = document.querySelector(".enemy-health--bar");
    enemyHealthBar.classList.add(`enemy-health__${enemyHitCounter}`);

    // Optional: Trigger jet hit effects
    // jet.classList.add("user-hit");
    // setTimeout(() => {
    //     jet.classList.remove("user-hit");
    // }, 1500);

    // // Stop tracking hits once hitCounter reaches 10
    // if (hitCounter >= 10) {
    //     document.removeEventListener("laserHit", incrementHitCounter); // Stop listener after 10 hits
    // }
});
  
  // // Function to check if two rectangles overlap
  export function isOverlapping(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  export const userLaserControls = {
    fireUserLaser,
  };