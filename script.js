document.addEventListener('DOMContentLoaded', function() {
    const spaceship = document.getElementById('spaceshipContainer');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // let spaceshipX = canvas.width / 2 - 25;
    // let spaceshipY = canvas.height - 200;

    // function drawSpaceship() {
    //     spaceship.style.left = spaceshipX + 'px';
    //     spaceship.style.top = spaceshipY + 'px';
    // }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // drawSpaceship();
        requestAnimationFrame(update);
    }

    update();
});