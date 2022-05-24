/*========= DOM ========*/
const container = document.getElementById('container');
    //create a 'div'tag
    const square = document.createElement('div');
    container.append(square);
    //square.style.attribute
    square.style.border = 'solid 2px black'
    square.style.borderRadius = '10px'
    square.style.backgroundColor = 'white'
    square.style.width = "250px"
    square.style.height = "150px"
    square.style.position = "absolute"
    square.style.top = '50%'
    square.style.left= '50%'
    square.style.transform = 'translate(-50%,-50%)'
    square.style.textAlign = 'center'
   
    //create a 'text tag'
    const textTag = document.createElement('h3')
    textTag.innerText = "Oh...No...\n GameOver!"
    square.append(textTag)
    //textTag.style.attribute
    textTag.style.padding= '5px 5px 5px 5px';
   //create a 'restart button'
   const restart = document.createElement('button')
   restart.innerText = "Restart\n(space key)"
   square.append(restart)
   square.style.display = "none" 



/*========= VARIABLES ========*/
let game = document.querySelector("#game");
let zverev;
let r = 25;//!!this variable is deciding player circle's radius & movement speed!!
// this creates a 2 dimensional canvas =>
let ctx = game.getContext("2d");
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

//controler
document.addEventListener("keydown", movementHandler)
//    restart.addEventListener("click",location.reload())
// restart.addEventListener("keypress", space)


  
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
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

//Build a obstacle class
class Obstacle{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alive = true;
    }
    //adding obstacle's function: render 

    render(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    //moving automatically
    //Ball bounce if it hits a wall
    //Ball goes back to the top and restart dropping if it hits bottom
    launch(){
        this.render();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(this.x + this.radius > game.width || this.x-this.radius<0){
          this.velocity.x = -1*this.velocity.x  
        }else if(this.y - this.radius > game.height){
            this.y = 0;
            this.velocity.x = Math.floor(Math.random()*9-4)
            this.y += this.velocity.y;
        }

    }

    launchTwo(){
        this.render();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(this.x + this.radius > game.width || this.x-this.radius<0){
          this.velocity.x = -1*this.velocity.x  
        }else if(this.y - this.radius > game.height){
            this.y = -40;
            this.velocity.x = Math.floor(Math.random()*10+10)
            this.y += this.velocity.y;
        }

    }

}
//Build another type of obstacle class
class topSpin{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alive = true;
    }
    //adding obstacle's function: render 

    render(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    //moving automatically
    //Ball goes straight down
    //Ball goes back to the top and restart dropping if it hits bottom
    launch(){
        this.render();
        this.y += 25 
        if(this.y - this.radius > game.height){
           setTimeout(()=>{ 
            //adding a little delay 
            this.y = -60;
            this.x = Math.floor(Math.random()*(game.width-30))
            this.y += 30;
        },100)
        } 
    }

}
/*======== Build Array =======*/
let allBalls = [];
/*=================== Game Player Constructions ======================*/
//construct game players here.
const you = new Player(game.width/2,game.height-r,r,'grey')
// ball always comes down from the top and x rocation alters randomly everytime.
//velocity is an object which has x and y value so I can control the speed and angle of the ball movement.
let rv = Math.floor(Math.random()*15-5);
let rrv = Math.floor(Math.random()*9-5);
// let rrv = Math.floor(Math.random()*13+15);
const ball = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,20,'#FFFF00',{x:rv,y:25})
const ballTwo = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,20,'#FFFF00',{x:rrv,y:25})
const curve = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,20,'#dfff4f')


/*============== Keyboard Control ====================*/
//KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
    console.log("the key that was pressed was:" + e.key)
    console.log(you.y)

    switch (e.key) {
        case "ArrowUp":
            you.y-2*you.radius > 0 ? you.y -= 2*r: null;
            break
        case "ArrowDown":
            (you.y + 2*you.radius) < game.height ? you.y += 2*r : null;
            break
        case "ArrowLeft":
            you.x-you.radius > 0 ? you.x -= 2*r : null;
            break
        case "ArrowRight":
            (you.x + you.radius) < game.width ? you.x += 2*r: null;
            break
        case ' ' :
                restarting();
                console.log('working')
                break
                 
    }    
}
// function space(e) {
//     console.log("the key that was pressed was:" + e.code)
//     switch (e.code) {
//         case 'Space' :
//             restarting();
//             console.log('working')
//             break
//     }    
// }


/* ================= functions ========================*/ 
// function constructingBalls(){
//     let rv = Math.floor(Math.random()*9-18);
//     let rrv = Math.floor(Math.random()*13+5);
//     while(allBalls.length<20){
//     const newBall = new Obstacle(Math.floor(Math.random()*(game.width-30)),30,30,'#FFFF00',{x:rv,y:25});
//     allBalls.push(newBall);
//     allBalls.length++;
    
// }}

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);

    if(you.alive){
    curve.launch();
    ball.launch();
    ballTwo.launchTwo(); 
    
    detectHit(you,curve);
    detectHit(you,ball);
    detectHit(you,ballTwo);

    tShot(you,curve)
    }
    you.render();
 
   
    
 
  
    // for(i=0;i<allBalls.length;i++){
    //     console.log(allBalls)
    //     allBalls[i].launch()
    // } 
    
}
//Detect hit between player and obstacles
function circleD (p1,p2){
    let xD = p1.x -p2.x ;
    let yD = p1.y - p2.y ;
    return Math.sqrt(Math.pow(xD,2)+Math.pow(yD,2));
}

function detectHit(p1,p2) {
  
    if (circleD(p1,p2) < p1.radius+p2.radius) {
        p1.alive = false;
        p2.alive = false;
      
    //    document.removeEventListener("keydown", movementHandler);
       gameOver() ;   
    } 
}
//curve ball
function tShot(p1,p2){
    let v = 10;
    if(circleD(p1,p2)<400&& p1.x > p2.x ){
        p2.x += v;
    }else if(circleD(p1,p2)<400 && p2.x > p1.x){
        p2.x -= v
    }
}
//Game over Text
function gameOver(){
   
    if(you.alive){
        square.style.display = "none"
    }else{
        square.style.display = "block"
    }
   
}
function restarting(){
 location.reload()

}
//Run Game
function runGame() {  
    setInterval(gameLoop,45);
}


// function constructingBalls(){
//     setInterval(() => {
//     let rv = Math.floor(Math.random()*9-5);
//     let rrv = Math.floor(Math.random()*13+5);
//     const newBall = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,30,'#FFFF00',{x:rv,y:rrv});
//     allBalls.push(newBall);
//     console.log(allBalls)

// },500)
// ;
// }

/* ================= Running Game ========================*/ 

    runGame();


// constructingBalls()





// for(i=0;i<allBalls.length;i++){
//     console.log(allBalls)
//     allBalls[i].launch()
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



