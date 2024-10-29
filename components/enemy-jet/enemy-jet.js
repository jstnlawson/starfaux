import { laserFunctions } from "../enemy-laser/enemy-laser.js";
import { enemyAttackSequenceOne, enemyAttackSequenceThree, enemyAttackSequenceTwo } from "../enemy-attacks/enemy-attacks.js";
  
  const fireball = document.getElementsByClassName("fireball")[0];

  export function enemyJet() {
    enemyAttackSequenceOne();
    setTimeout(() => {
      enemyAttackSequenceTwo();
    }, 18000);
    setTimeout(() => {
      enemyAttackSequenceThree();
    }, 27000);
    setTimeout(() => {
      fireball.classList.add("expand-fireball");
    }, 36000);
  }