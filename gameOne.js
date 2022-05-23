// GLOBAL DOM / VARIABLES
let game = document.querySelector("#game");
let player;
let zverev;
// this creates a 2 dimensional canvas =>
let ctx = game.getContext("2d");
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);


/*=================== class Collections======================*/

//Build a player class
class Player{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alive = true;
    }
    //adding player's function: render 

    render(x,y,){


    }

}



//==============Ketboard====================//
//KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
    console.log("the key that was pressed was:" + e.key)

    switch (e.key) {

        case "ArrowUp":
            player.y > 0 ? player.y -= 20 : null;
            break
        case "ArrowDown":
            (player.y + player.height) < game.height ? player.y += 20 : null;
            break

        case "ArrowLeft":
            player.x > 0 ? player.x -= 20 : null;
            break

        case "ArrowRight":
            (player.x + player.width) < game.width ? player.x += 20 : null;
            break

    }
}


//================= functions ========================// 

//gameLoop
// function gameLoop() {
//     ctx.clearRect(0, 0, game.width, game.height);
//     movement.textContent = `X: ${player.x}\n Y:${player.y}`;

//     if (circle.alive) {
//         circle.render();
//         // circleEnd();
//         let hit = detectHit(player, circle);
//     }
//     player.render();
//     circle.render();
    
// }

//Detect hit between player and obstacles
// function detectHit(p1, p2) {

//     let hitTest =
//         p1.y + p1.height > p2.y &&
//         p1.y < p2.y + p2.height  &&
//         p1.x + p1.width > p2.x &&
//         p1.x < p2.x + p2.width;

//     let circleEnd =
//         circle.y - (circle.height) > game.height;

//     if (hitTest || circleEnd) {
//         //     let gameScore =Number(score.textContent);
//         // let newScore = gameScore + 100;
//         // score.textContent = newScore;

//         return addNewCirlce();
//     } else {
//         return false;
//     }

// }

//Bounce after hitting sidewalls




//==============EventListner==================//

//DOM Content Loaded EventListener
// window.addEventListener("DOMContentLoaded", function (e) {
//     player = new Crawler((game.width - 20) / 2, game.height - 20, "white", 20, 20);
//     circle = new Ball(xRandom,0, "yellow", 10, 10)
//     const cTwo = new BallTwo(300,100,30,'blue')
   
//     const runGame = setInterval(gameLoop, 100);
// })



// //controler
// document.addEventListener("keydown", movementHandler)