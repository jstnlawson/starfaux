import { laserFunctions } from "../enemy-laser/enemy-laser.js";
import {
  enemyAttackSequenceOne,
  enemyAttackSequenceThree,
  enemyAttackSequenceTwo,
  enemyJet,
  enemyGloat,
} from "../enemy-attacks/enemy-attacks.js";
import { jet } from "../user-jet/user-jet.js";
import { userVictoryTrigged } from "../user-laser/user-laser.js";

const fireball = document.getElementsByClassName("fireball")[0];

export let enemyVictoryTriggered = false;
//export let stopEnemyAttackSequence = false;

export function triggerEnemyVictory() {
  console.log("Enemy victory triggered");
  enemyVictoryTriggered = true;
  enemyJet.classList.add("enemy-victory");
  setTimeout(() => {
    enemyVictoryTriggered = false;
    enemyGloat();
  }, 8000);
  setTimeout(() => {
    fireball.classList.add("expand-fireball--user");
    jet.classList.add("jet-disappear");
  }, 11500);
}

export function enemyAttackSequence() {
  if (enemyVictoryTriggered) return;
  if (userVictoryTrigged) return;
  enemyAttackSequenceOne();
  setTimeout(() => {
    if (enemyVictoryTriggered) return;
    if (userVictoryTrigged) return;
    enemyAttackSequenceTwo();
  }, 18000);
  setTimeout(() => {
    if (enemyVictoryTriggered) return;
    if (userVictoryTrigged) return;
    enemyAttackSequenceThree();
  }, 27000);
  setTimeout(() => {
    if (enemyVictoryTriggered) return;
    if (userVictoryTrigged) return;
    fireball.classList.add("expand-fireball");
    jet.classList.add("jet-disappear");
  }, 36000);
}
