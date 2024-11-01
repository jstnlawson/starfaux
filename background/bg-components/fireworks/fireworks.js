function fireFireworks() {
    console.log("fireFireworks");

    // Create a new fireworks container
    const fireworkContainer = document.createElement("div");
    fireworkContainer.classList.add("fireworks");

    // Create individual firework parts and append them to the container
    for (let i = 1; i <= 8; i++) {
        const fireworkPart = document.createElement("div");
        fireworkPart.classList.add(`firework-${i}`);
        fireworkContainer.appendChild(fireworkPart);
    }

    // Append the new fireworks container to the body
    document.body.appendChild(fireworkContainer);

    // Randomly select a size animation class
    const sizeClasses = ["expand-fireworks-large", "expand-fireworks-medium", "expand-fireworks-small"];
    const randomSizeClass = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
    console.log("Adding class:", randomSizeClass);
    fireworkContainer.classList.add(randomSizeClass);

    // Calculate a random position in the top 30% of the screen
    const maxHeight = window.innerHeight * 0.45; // 45% of the viewport height
    const randomTop = Math.random() * maxHeight;
    fireworkContainer.style.top = `${randomTop}px`;

    // Calculate a random position from left to right
    const maxWidth = window.innerWidth; // Full width of the viewport
    const randomLeft = Math.random() * maxWidth;
    fireworkContainer.style.left = `${randomLeft}px`;

    // Trigger reflow to ensure animation runs
    fireworkContainer.offsetWidth;

    // Remove the firework container from the DOM after animation ends
    fireworkContainer.addEventListener("animationend", () => {
        fireworkContainer.remove();
    }, { once: true });
}


// Function to fire fireworks at random intervals
export function startRandomFireworks() {
    // Set an interval to fire a firework every random number of seconds
    setInterval(() => {
        fireFireworks();
    }, Math.random() * 1000 + 50); // Fire every 500ms to 2500ms
}


