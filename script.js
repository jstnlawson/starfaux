import {
  userJetMovement,
  update,
  useJetElements,
} from "./components/user-jet/user-jet.js";
import { enemyAttackSequence } from "./components/enemy-jet/enemy-jet.js";

document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.querySelector(".start-screen");    
  const startButton = document.querySelector(".start-button");
  const openControlsMenu = document.querySelector(".controls-menu__title");
  const closeMenu = document.querySelector(".close-menu");
  const groundMovement = document.querySelector(".ground-movement");
  const audio = new Audio("./audio/starfaux.mp3");
  audio.volume = 0.3;

  function playAudio() {
    audio.play();
  }

  groundMovement.style.display = "none";

  openControlsMenu.addEventListener("click", () => {
    const controlsMenu = document.querySelector(".controls-menu");
    controlsMenu.style.display = "flex";
  });

  closeMenu.addEventListener("click", () => {
    const controlsMenu = document.querySelector(".controls-menu");
    controlsMenu.style.display = "none";
  });

  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    groundMovement.style.display = "block";
    enemyAttackSequence();
    playAudio();
  });
});
