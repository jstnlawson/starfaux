  
  //This is abandoned logic for enemy jet dodging but something similar
  //can be used for the boss dodging logic
  
  // Keep track of the current dodge position
  let currentDodgeX = 0;
  let currentDodgeY = 0;
  
  export function dodgeEnemyJet() {
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