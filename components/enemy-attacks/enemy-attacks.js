import { shootLaser } from "../enemy-laser/enemy-laser.js";

export const enemyJet = document.getElementsByClassName("enemy-jet")[0];


export function enemyAttackSequenceOne() {
    enemyJet.classList.add("jet-entrance-one");

    enemyJet.addEventListener("animationstart", () => {
        const checkpoints = [
            { time: 0.45, fired: false },
            { time: 0.475, fired: false },
            { time: 0.5, fired: false },
            { time: 0.65, fired: false },
            { time: 0.675, fired: false },
            { time: 0.7, fired: false },            
        ];

        checkpoints.forEach(checkpoint => {
            const duration = parseFloat(getComputedStyle(enemyJet).animationDuration) * 1000;
            const checkpointTime = checkpoint.time * duration;

            setTimeout(() => {
                shootLaser();
            }, checkpointTime);
        });
    }, { once: true });
}