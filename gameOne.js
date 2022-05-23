// GLOBAL DOM / VARIABLES
let game = document.querySelector("#game");
let zverev;
let r = 25;//!!this variable is deciding player circle's radius & movement speed!!
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
    //adding player's function: render & moving(location change) 

    render(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fillstyle = this.color;
        ctx.fill();
    }

}

/*=================== Game Player Constructions ======================*/
//construct game players here.
const you = new Player(game.width/2,game.height-r,r,'yellow')


/*============== Keyboard Control ====================*/
//KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
    console.log("the key that was pressed was:" + e.key)
    console.log(you.y)

    switch (e.key) {
        case "ArrowUp":
            you.y-you.radius > 0 ? you.y -= r: null;
            break
        case "ArrowDown":
            (you.y + you.radius) < game.height ? you.y += r : null;
            break
        case "ArrowLeft":
            you.x-you.radius > 0 ? you.x -= r : null;
            break
        case "ArrowRight":
            (you.x + you.radius) < game.width ? you.x += r: null;
            break
    }
}


/* ================= functions ========================*/ 

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    you.render(); 
}

/* ================= Running Game ========================*/ 
const runGame = setInterval(gameLoop,60);









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



//controler
document.addEventListener("keydown", movementHandler)