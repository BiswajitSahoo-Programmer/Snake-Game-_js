//board
var blocksize = 35;
var rows = 20;
var cols = 30;
var board;
var context;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;

var snakebody = [];

//food 
var foodX;
var foodY;

var gameover = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10);
}

function update(){
    if (gameover){
        return;
    }
     
    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX, foodY])
        placefood();
    }
    
    for (let i = snakebody.length-1; i > 0; i++){
        snakebody[i] = snakebody[i-1];
    }
    if (snakebody.length){
        snakebody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "blue";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    for(let i = 0; i < snakebody.length; i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }

    // gameover conditoons 

    if(snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize){
      
        gameover = true;
        alert("Game Over Ha HA Ha LOL")
    }

    for(let i = 0; i < snakebody.length; i++){
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
        gameover = true;   
        alert("Game Over HA HA HA WTF");
    }
}    
}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}

function placefood(){
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}
