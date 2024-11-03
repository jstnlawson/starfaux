import { shootLaser } from "../enemy-laser/enemy-laser.js";
// import { gunSite, gunSiteRect } from "../user-laser/user-laser.js";
import { userVictoryTrigged } from "../user-laser/user-laser.js";


export const enemyJet = document.getElementsByClassName("enemy-jet")[0];
const enemyEngine = document.getElementsByClassName("enemy-engine")[0];


export function enemyAttackSequenceOne() {
    if (userVictoryTrigged) return;
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
    if (userVictoryTrigged) return;
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

// export function enemyAttackSequenceThree() {
//     if (userVictoryTrigged) return;
//     enemyEngine.classList.remove("enemy-rear-visible");
//     enemyJet.classList.add("enemy-attack-three");

//     enemyJet.addEventListener("animationstart", () => {
//         const checkpoints = [
//             // { time: 0.1, fired: false },
//             { time: 0.2, fired: false },
//             { time: 0.3, fired: false },
//             { time: 0.4, fired: false },
//             { time: 0.5, fired: false },
//             { time: 0.6, fired: false }, 
//             // { time: 0.6125, fired: false },
//             // { time: 0.625, fired: false },
//             // { time: 0.6375, fired: false },
//             // { time: 0.65, fired: false },
//             // { time: 0.6625, fired: false },
//             // { time: 0.675, fired: false },
//             { time: 0.7, fired: false },
//             // { time: 0.7125, fired: false },
//             // { time: 0.725, fired: false },
//             // { time: 0.7375, fired: false },
//             // { time: 0.75, fired: false },
//             // { time: 0.7525, fired: false },
//             // { time: 0.775, fired: false },
//             // { time: 0.7875 , fired: false },
//             { time: 0.8, fired: false },
//             // { time: 0.8125, fired: false },
//             // { time: 0.825, fired: false },
//             // { time: 0.8375, fired: false },
//             { time: 0.85, fired: false },
//             { time: 0.8625, fired: false },
//             { time: 0.875, fired: false },
//             { time: 0.8875, fired: false },
//             { time: 0.9, fired: false }, 
//             { time: 0.90625, fired: false },
//             { time: 0.9125, fired: false },
//             { time: 0.91875, fired: false },
//             { time: 0.925, fired: false },
//             { time: 0.93125, fired: false },
//             { time: 0.9375, fired: false },
//             { time: 0.94375, fired: false },
//             { time: 0.95, fired: false },
//             { time: 0.95625, fired: false },
//             { time: 0.9625, fired: false },
//             { time: 0.96875, fired: false },
//             { time: 0.975, fired: false },

//         ];

//         checkpoints.forEach(checkpoint => {
//             const duration = parseFloat(getComputedStyle(enemyJet).animationDuration) * 1000;
//             const checkpointTime = checkpoint.time * duration;

//             setTimeout(() => {
//                 shootLaser();
//             }, checkpointTime);
//         });
//     }, { once: true });
// }

export function enemyAttackSequenceThree() {
    if (userVictoryTrigged) return;
    console.log("userVictoryTrigged", userVictoryTrigged);

    enemyEngine.classList.remove("enemy-rear-visible");
    enemyJet.classList.add("enemy-attack-three");

    const duration = 10000; // Duration of the CSS animation in milliseconds
    const startTime = performance.now();

    const checkpoints = [
            // { time: 0.1, fired: false },
            { time: 0.2, fired: false },
            { time: 0.3, fired: false },
            { time: 0.4, fired: false },
            { time: 0.5, fired: false },
            { time: 0.6, fired: false }, 
            // { time: 0.6125, fired: false },
            // { time: 0.625, fired: false },
            // { time: 0.6375, fired: false },
            // { time: 0.65, fired: false },
            // { time: 0.6625, fired: false },
            // { time: 0.675, fired: false },
            { time: 0.7, fired: false },
            // { time: 0.7125, fired: false },
            // { time: 0.725, fired: false },
            // { time: 0.7375, fired: false },
            // { time: 0.75, fired: false },
            // { time: 0.7525, fired: false },
            // { time: 0.775, fired: false },
            // { time: 0.7875 , fired: false },
            { time: 0.8, fired: false },
            // { time: 0.8125, fired: false },
            // { time: 0.825, fired: false },
            // { time: 0.8375, fired: false },
            { time: 0.85, fired: false },
            { time: 0.8625, fired: false },
            { time: 0.875, fired: false },
            { time: 0.8875, fired: false },
            { time: 0.9, fired: false }, 
            { time: 0.90625, fired: false },
            { time: 0.9125, fired: false },
            { time: 0.91875, fired: false },
            { time: 0.925, fired: false },
            { time: 0.93125, fired: false },
            { time: 0.9375, fired: false },
            { time: 0.94375, fired: false },
            { time: 0.95, fired: false },
            { time: 0.95625, fired: false },
            { time: 0.9625, fired: false },
            { time: 0.96875, fired: false },
            { time: 0.975, fired: false },
    ];

    function checkProgress() {
        if (userVictoryTrigged) return;

        const currentTime = (performance.now() - startTime) / duration; // Progress as a fraction (0 to 1)

        checkpoints.forEach(checkpoint => {
            if (currentTime >= checkpoint.time && !checkpoint.fired) {
                checkpoint.fired = true;
                shootLaser();
                console.log(`Shot fired at ${checkpoint.time * 100}% progress`);
            }
        });

        // If the animation isn’t done, keep checking
        if (currentTime < 1) {
            requestAnimationFrame(checkProgress);
        }
    }

    // Start the progress checker
    requestAnimationFrame(checkProgress);
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