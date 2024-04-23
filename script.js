let canvas = document.getElementById("snake"); // create element that will run the game
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; // create snake as a list
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let prevSnakePositions = []; // Variable to store previous positions of the snake

function drawSnakeTrail() {
    context.fillStyle = "rgba(0, 255, 0, 0.1)"; // Slightly transparent green color
    prevSnakePositions.forEach(position => {
        context.fillRect(position.x, position.y, box, box);
    });
}

function startGame() {
    // Your existing code...

    // Draw the snake's trail
    drawSnakeTrail();

    // Your existing code...

    // Store the current position of the snake in the previous positions array
    prevSnakePositions.unshift({ x: snakeX, y: snakeY });

    // Ensure the previous positions array doesn't grow too large
    if (prevSnakePositions.length > 10) {
        prevSnakePositions.pop(); // Remove the oldest position
    }

    // Your existing code...
}
let direction = "right";
let gameSpeed = 300; // Initial game speed in milliseconds

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBackground(){
    context.fillStyle = "white";
    context.fillRect(0, 0, 16*box, 16*box); // draw the rectangle using x and y and the set width and height
}

function startGame() {
    createBackground();
    drawFood();
    drawSnakeTrail();
    drawScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('eatSound').play(); // Play the eat sound
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    prevSnakePositions.unshift({ x: snakeX, y: snakeY });
    if (prevSnakePositions.length > 10) {
        prevSnakePositions.pop();
    }

    snake.unshift(newHead);

    // Check for collisions
    if (snakeX < 0 || snakeX >= 16 * box || snakeY < 0 || snakeY >= 16 * box || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over :(");
    }
}


function createSnake() {
    snake.forEach((segment, index) => {
        const radius = index === 0 ? 3 : 2; // Adjusted radius for all segments
        context.fillStyle = index === 0 ? "grey" : "darkgrey";
        
        // Add shadow properties
        context.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color (black with 50% opacity)
        context.shadowBlur = 5; // Blur radius
        context.shadowOffsetX = 2; // Horizontal offset
        context.shadowOffsetY = 2; // Vertical offset
        
        context.beginPath();
        context.moveTo(segment.x + radius, segment.y);
        context.lineTo(segment.x + box - radius, segment.y);
        context.arcTo(segment.x + box, segment.y, segment.x + box, segment.y + radius, radius);
        context.lineTo(segment.x + box, segment.y + box - radius);
        context.arcTo(segment.x + box, segment.y + box, segment.x + box - radius, segment.y + box, radius);
        context.lineTo(segment.x + radius, segment.y + box);
        context.arcTo(segment.x, segment.y + box, segment.x, segment.y + box - radius, radius);
        context.lineTo(segment.x, segment.y + radius);
        context.arcTo(segment.x, segment.y, segment.x + radius, segment.y, radius);
        context.closePath();
        context.fill();
        
        // Reset shadow properties
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    });
}
function drawFood() {
    // Generate a random color for the enemy
    const colors = ["darkgrey", "black", "grey", "black", "darkgrey"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    context.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color (black with 50% opacity)
    context.shadowBlur = 5; // Blur radius
    context.shadowOffsetX = 2; // Horizontal offset
    context.shadowOffsetY = 2; // Vertical offset

    context.fillStyle = randomColor; // Set the color for the enemy

    // Draw the enemy (food) as a circle
    context.beginPath();
    context.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    context.fill();

    // Reset shadow properties
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

// when an event occurs, detect and call a function
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    createBackground();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); // pop removes the last element from the list
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
