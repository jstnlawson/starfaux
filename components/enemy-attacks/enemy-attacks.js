import { shootLaser } from "../enemy-laser/enemy-laser.js";
// import { gunSite, gunSiteRect } from "../user-laser/user-laser.js";


export const enemyJet = document.getElementsByClassName("enemy-jet")[0];
const enemyEngine = document.getElementsByClassName("enemy-engine")[0];


export function enemyAttackSequenceOne() {
    enemyJet.classList.add("enemy-attack-one");

    enemyJet.addEventListener("animationstart", () => {
        const checkpoints = [
            { time: 0.45, fired: false },
            { time: 0.475, fired: false },
            { time: 0.5, fired: false },
            { time: 0.75, fired: false },
            { time: 0.775, fired: false },
            { time: 0.8, fired: false },            
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

export function enemyAttackSequenceTwo() {
    enemyJet.classList.add("enemy-attack-two");
    enemyEngine.classList.add("enemy-rear-visible");

    enemyJet.addEventListener("animationstart", () => {
        const checkpoints = [
            { time: 0, fired: false },
            { time: 0.125, fired: false },
            { time: 0.35, fired: false },
                      
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

export function enemyAttackSequenceThree() {
    enemyEngine.classList.remove("enemy-rear-visible");
    enemyJet.classList.add("enemy-attack-three");

    enemyJet.addEventListener("animationstart", () => {
        const checkpoints = [
            { time: 0.1, fired: false },
            { time: 0.2, fired: false },
            { time: 0.3, fired: false },
            { time: 0.4, fired: false },
            { time: 0.5, fired: false },
            { time: 0.6, fired: false }, 
            { time: 0.7, fired: false },
            { time: 0.8, fired: false },
            { time: 0.9, fired: false },           
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

export function enemyGloat() {
    enemyJet.classList.add("enemy-gloat");
    enemyEngine.classList.add("enemy-rear-visible");

    enemyJet.addEventListener("animationstart", () => {
        const checkpoints = [
            
            
            
            { time: 0.3, fired: false },
            
                      
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