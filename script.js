import { userJetMovement, update, useJetElements } from "./components/user-jet/user-jet.js";
import { enemyAttackSequence } from "./components/enemy-jet/enemy-jet.js";

document.addEventListener("DOMContentLoaded", function () {

   const startButton = document.querySelector(".start-button");
   const audio = new Audio ("./audio/starfaux.mp3");
   audio.volume = 0.3;

   function playAudio() {
       audio.play();
    }

    startButton.addEventListener("click", () => {
    startButton.style.display = "none";

    enemyAttackSequence();

    playAudio();

    });

    
});
