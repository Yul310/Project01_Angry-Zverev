/*========= DOM Manipulation========*/

const container = document.getElementById('container');
//create a GameOver'div'tag
const square = document.createElement('div');
    container.append(square);
    square.style.borderRadius = '10px'
    square.style.backgroundColor = 'white'
    square.style.width = "250px"
    square.style.height = "150px"
    square.style.position = "absolute"
    square.style.top = '50%'
    square.style.left= '50%'
    square.style.transform = 'translate(-50%,-50%)'
    square.style.textAlign = 'center'
    square.style.display = "none" 
//create a GameOver 'text tag'
const textTag = document.createElement('h3')
    textTag.setAttribute('id','textTag')
    square.append(textTag)
    textTag.style.padding= '5px 5px 5px 5px';

//Create a div for the Starting Page
const sDiv = document.createElement('div')
    sDiv.setAttribute('id','sDiv');
    document.body.append(sDiv);


//Create a 'Starting Page GIF'
const zImage = document.createElement('IMG');
    zImage.setAttribute('id','zImage')
    zImage.src = 'https://c.tenor.com/Fc22vaevNrcAAAAd/alexander-zverev-temper-tantrum.gif'
    zImage.style.borderRadius = '50px'
    zImage.style.marginTop = '15vh'
    zImage.style.width = "40vh"
    zImage.style.height = "40vh"
    zImage.style.border = "solid 4px black"
    sDiv.append(zImage)  

//Create a 'Instruction Start Button'
const start = document.createElement('div')
    start.setAttribute('id','start')
    start.innerText = "10sec Animated tutorial\n Click here!"
    start.style.margin = '50px auto'
    start.style.width = '30vh'
    start.style.border = "solid 4px black"
    start.style.fontSize = '28px'
    start.style.padding = '20px 40px 20px 40px'
    start.style.borderRadius = '10px'
    sDiv.append(start)


// create a time count board tags and texts
const board = document.getElementById('board');
   let secondText = document.createElement('h3');
   secondText.setAttribute('id','time')
   board.append(secondText);
   let seconds = 0;
   secondText.innerText = "Time\n"+ seconds;
   board.style.display = "none" 


   
/* ======== create Image Tags & Srcs ========= */

  imgP = new Image();
  imgP.src ="Image/smileTwo.png";
  imgP2 = new Image();
  imgP2.src ="Image/smile.png";
  imgP3 = new Image();
  imgP3.src ="Image/angry.png";
  ballY = new Image();
  ballY.src ="Image/ballYellow.png";
  ballR = new Image();
  ballR.src ="Image/ballRed.png";
  ballP = new Image();
  ballP.src ="Image/ballpurple.png";
  ballO = new Image();
  ballO.src ="Image/ball orange.png";
  


  /* ========= CSS Animation Preparation // This will be applied to the Starting page ======*/
  let cellCollection = document.createElement('div');
  cellCollection.setAttribute('id','cellCollection')
  document.body.append(cellCollection);
  

  function cellMaker(cellCount){
      for(i=0;i <= cellCount;i++){
  const cell = document.createElement('img');
  cell.setAttribute('class','cell')
  cell.setAttribute('id',`img${i}`);
  cell.src = 'Image/ballFour.png'
  cell.style.width = '20px'
  cell.style.height = '20px'
  cellCollection.append(cell)
  }
}
cellMaker(2)


function cell2Maker(cellCount){
    for(i=0;i <= cellCount;i++){
const cell2 = document.createElement('img');
cell2.setAttribute('class','cell2')
cell2.setAttribute('id',`imgT${i}`);
cell2.src = 'Image/ballFour.png'
cell2.style.width = '20px'
cell2.style.height = '20px'
cellCollection.append(cell2)
}
}
cell2Maker(2)



/*========= VARIABLES ========*/
let game = document.querySelector("#game");

let zverev;
let r = 20;//!!this variable is deciding player circle's radius & movement speed!!
let rs = 40;
let os =30;
let rv = Math.floor(Math.random()*10-4);
let rrv = Math.floor(Math.random()*8);
let arrayR = [20,-20,-5,5,-10,35,-50,40]
// this creates a 2 dimensional canvas => 
let ctx = game.getContext("2d"); 

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);



/*========= EVENT LISTENERS ========*/

//controler
document.addEventListener("keydown", movementHandler)

start.addEventListener("click",() => {
    instructorInit()
    console.log("work")
    cellCollection.style.display = 'none'
    // gameStart.style.display = 'block' 
    })


//////////////////////////////////////////////////////////////////
/*=================== CLASS COLLECTIONS ======================*/
//////////////////////////////////////////////////////////////////

//===========PLAYER Class ==========//
class ImagePlayer{
    constructor(x,y,width,height,radius){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.alive = true;
        this.face = true;
       
    }
    //=> I've added an altering face if statement on draw function. 
    draw(){ 
        if(this.face === true ){
     ctx.drawImage(imgP,this.x,this.y,this.width,this.height) 
     setTimeout(() =>{this.face =false},300)
        }else if(this.alive === false){
            ctx.drawImage(imgP3,this.x,this.y,this.width,this.height)  
        }
           else{
            ctx.drawImage(imgP2,this.x,this.y,this.width,this.height)
            setTimeout(() =>{this.face =true},300)
        }
        }

}


//========OBSTACLE class_Bounce Balls =======//

// ball always comes down from the top and x rocation alters randomly everytime.
//velocity is an object which has x and y value so I can control the speed and angle of the ball movement.

class Obstacle{
    constructor(x,y,width,height,velocity){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.alive = true;
    }

    //types of render method decides the color of the ball.
    render(){
        if(this.alive){
        ctx.drawImage(ballY,this.x,this.y,this.width,this.height)
       }
    }
    renderOrange(){
        if(this.alive){
        ctx.drawImage(ballO,this.x,this.y,this.width,this.height)
       }
    }

    //Each ball moves differently by using launch function.
    //render function is calledback in launch function for a easier use.
    launchYellow(){
        this.render();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        //Ball bounce if it hits a wall
        if(this.x + this.width > game.width || this.x <= 0){
          this.velocity.x = -1*this.velocity.x  
        //Ball goes back to the top and restart dropping if it hits bottom
        }else if(this.y - this.width > game.height){
            this.x = Math.floor(Math.random()*(game.width-30));
            this.y = 0;
            this.velocity.x =rv
            this.y += this.velocity.y;
        }
    }

    launchOrange(){
        this.renderOrange();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(this.x + this.width > game.width || this.x <= 0){
          this.velocity.x = -1*this.velocity.x  
        }else if(this.y - this.width > game.height){
            this.x = Math.floor(Math.random()*(game.width-30));
            this.y = -40;
            this.velocity.x = Math.floor(Math.random()*10+10)
            this.y += this.velocity.y;
        }
    }
}

//======Another Type of OBSTACLE class_Straight=========//
class topSpin{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
    }
    
    //types of render method decides the color of the ball.
    renderRed(){
        if(this.alive){
        ctx.drawImage(ballR,this.x,this.y,this.width,this.height)
       }}
    renderPurple(){
        if(this.alive){
        ctx.drawImage(ballP,this.x,this.y,this.width,this.height)
       }}
    
    //Ball goes straight down
    //Ball goes back to the top and restart dropping if it hits bottom
    //I decided to add curve ball function later so I can change every color of the balls to curve ball.

    launch(){
        this.renderRed();
        this.y += 25 
        if(this.y - this.width > game.height){
           setTimeout(()=>{ 
            //adding a little delay 
            this.y = -60;
            this.x = Math.floor(Math.random()*(game.width-30))
            this.y += 30;
        },100)
        } 
    }
    launchP(){
        this.renderPurple();
        this.y += 22 
        if(this.y - this.width > game.height){
            this.y = -60;
            this.x = Math.floor(Math.random()*(game.width-rs)/1.5)
            this.y += 30; 
        } }
    

}

/*======== Build Array =======*/
let allBalls = [];

////////////////////////////////////////////////////////////////////////
/*=================== Game Player Constructions ======================*/
/////////////////////////////////////////////////////////////////////////


// construct OBSTACLES
const yellow = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,os,os,{x:rv,y:23})
const orange = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,os,os,{x:arrayR[rrv],y:20})
const red = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,os,os)
const purple = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,os,os)
//=> bellow purpleIns is only for the instruction page
const purpleIns = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,os,os)
//Construct PLAYER
const smile = new ImagePlayer((game.width-rs)/2,game.height-rs,rs,rs,rs);


////////////////////////////////////////////////////////
/*============== Keyboard Control ====================*/
////////////////////////////////////////////////////////

//KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
    // console.log("the key that was pressed was:" + e.key)
    // console.log(smile.y)

    switch (e.key) {
        case "ArrowUp":
            smile.y > 0 ? smile.y -= rs: null;
            break
        case "ArrowDown":
            (smile.y + smile.height) < game.height ? smile.y += rs : null;
            break
        case "ArrowLeft":
           ( smile.x ) >= 0 ? smile.x -= rs: null;
        //    console.log(smile.x)
            break
       
        case "ArrowRight":
            (smile.x + smile.width ) <= game.width ? smile.x += rs: null;
            // console.log(smile.x)
            break
        // case ' '  :
        //     restarting();
        //     // console.log('working')
        //     break
        case 'Enter' :
            start.removeEventListener("click",() => {
                instructorInit()
                // gameStart.style.display = 'block' 
            })
            gameInit()
           
            break
                 
         } 
         //by using below condition, RESTARTING function is activated only when player is not alive.   
        if (e.key ===' ' && smile.alive === false){
        restarting();
        }
}
///////////////////////////////////////////////////////////
/* ================= functions ======================== */ 
////////////////////////////////////////////////////////////

//Restarting//
function restarting(){
   window.onload()
   reloadP()
}
//=>Below restarting function, made some bugs. Everything gets faster after restarting.
//=>I choose to use window.onload() to restart for now.
//=>I am going to re-visit this one in near future.

/* **** REVISIT ITEM ***** 
function restarting(){
       text = null;
       clearInterval()
       smile.alive = true;
       seconds = 0;
       gameInit()       
         }
*/

//reloading Auto Command 01//
//=>found out this after Google Search
window.onload = function() {
        var reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
            gameInit2();
        }
    }

//reloading  Auto Command 02
function reloadP() {
        sessionStorage.setItem("reloading", "true");
        document.location.reload();
    }

//instruction Initiation//
function instructorInit(){
    sDiv.style.display = 'none'
    game.style.display = "block";
    
    instructor();
}

// Game Initiation 001 //
function gameInit(){
        text = null;
        clearInterval();
        board.style.display = "block" 
        // gameStart.style.visibility = 'hidden' 
        setInterval(timeCount,1000)
        runGame(); 
    }

 // Game Initiation 002 // this will be activated when you restart   
function gameInit2(){
        cellCollection.style.display = 'none'
        // gameStart.style.visibility = 'hidden' 
        sDiv.style.display = 'none'
        text = null;
        clearInterval();
        game.style.display = "block";
        board.style.display = "block" 
        
       setInterval(timeCount,1000)
        runGame(); 
    }
    
//Game Loop//
function gameLoop() {
   
    ctx.clearRect(0, 0, game.width, game.height);
    
    if(smile.alive){    
    
    yellow.launchYellow();
    red.launch()
    detectHit(smile,yellow);  
    detectHit(smile,red);  

    if(seconds >= 5){
        orange.launchOrange();
        detectHit(smile,orange);
    }
    if(seconds >= 15){
        purple.launchP();
        tShot(smile,purple) 
        detectHit(smile,purple);
    }
    }else{ctx.clearRect(0, 0, game.width, game.height)}
    
    smile.draw();
    victory(); 
   
}


// Detect hit between player and obstacles //

function detectHit(p1,p2) {

    let hitTest =  p1.y + p1.height > p2.y &&
    p1.y < p2.y + p2.height &&
    p1.x + p1.width > p2.x &&
    p1.x < p2.x + p2.width; 
  
    // if (circleD(p1,p2) < p1.width/2+p2.radius) {
    if (hitTest) {
        p1.alive = false;
        p2.alive = false;
      
       gameOver() ;   
    } 
    console.log(smile.alive)
}  


// ==========   curve ball  ========== //

//Step_01_Distance first
function circleD (p1,p2){
    let xD = p1.x -p2.x ;
    let yD = p1.y - p2.y ;
    return Math.sqrt(Math.pow(xD,2)+Math.pow(yD,2));
}

// Step_02_when the ball gets closer to the player, the ball changes its movement
function tShot(p1,p2){
    let v = 9;
    let detection = 300
    if(circleD(p1,p2)<detection&& p1.x > p2.x ){
        p2.x += v; 
        if(p2.x >= game.width){ v = -1*v}
    }else if(circleD(p1,p2)<detection && p2.x > p1.x){
        p2.x -= v;
        if(p2.x <= 0){ v = -1*v}
    }
}

// Game over & Vitory Text //
function gameOver(){  
    if(smile.alive){
        square.style.display = "none"
    }
    else if(smile.alive === false){
        textTag.innerText = "Oh...No...\n GameOver!\n \nto try again\n hit SPACE key"
        textTag.style.fontSize = '28px'
        textTag.style.color = "white"
        square.style.display = "block"
        square.style.removeProperty("background-color")
    }  
}
function victory(){ 
   
    if(seconds === 60){
        textTag.innerText = "You Won!\n but don't stop yet!"
        textTag.style.fontSize = '28px'
        textTag.style.color = "white"
        square.style.display = "block"
        square.style.removeProperty("background-color")
    }else if(seconds >= 34|| smile.alive === true){
        square.style.display = "none"
    }
   
}

//Run Game
function runGame() {  
    setInterval(gameLoop,45);
    
}

function timeCount(){
    if(smile.alive)
  {  seconds +=1;
    secondText.innerText = "Time\n"+ seconds}
   
}
let text = true


/*=========== Instructing Tutoral Function ==========*/
// My goal is  making a short text animation & a train session 

function instructor (){
   
let textTwo = true
function instruction(){
if(text === false)
   { ctx.clearRect(0, 0, game.width, game.height)
    smile.draw();
    purpleIns.launchP()
    tShot(smile,purpleIns) 
    // text
    
    ctx.font = "22px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = 'white'
   
    
    ctx.fillText("Can you dodge it?", (game.width)/2,game.height/2+60);
    ctx.fillText("When you are ready to play,", (game.width)/2,game.height/2+90);
    ctx.fillText("hit ENTER key! ", (game.width)/2,game.height/2+120);
    ctx.fillText("Just 1 minute and you win! ", (game.width)/2,game.height/2+150);
    ctx.fillText("Easy, right? ", (game.width)/2,game.height/2+180);
    
console.log('ins')
  }
}
  
  function texting() {
    ctx.font = "22px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = 'white'
    if(text === true){
    ctx.fillText("You have to dodge", (game.width)/2,game.height/2+60);
    ctx.fillText("all the balls coming", (game.width)/2,game.height/2+90);
    ctx.fillText("to you. Use ARROW keys", (game.width)/2,game.height/2+120);
    ctx.fillText("to avoid the balls.", (game.width)/2,game.height/2+150);
    ctx.fillText("(Wait,more texts are coming!)", (game.width)/2,game.height/2+180);
    }   

  }
  function textingTwo() {
    ctx.clearRect(0, 0, game.width, game.height)
    ctx.font = "22px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = 'white'
    if(textTwo === true){
    ctx.fillText("After 15 seconds,", (game.width)/2,game.height/2+60);
    ctx.fillText("Zverev is going to shoot ", (game.width)/2,game.height/2+90);
    ctx.fillText("you MAGIC PURPLE Shots!", (game.width)/2,game.height/2+120);
    ctx.fillText("Be careful those spin shots!.", (game.width)/2,game.height/2+150);
    ctx.fillText("I'll show you ", (game.width)/2,game.height/2+180);
    ctx.fillText("the shots for your practice. ", (game.width)/2,game.height/2+210);
    }   
  }

  // SetTimeout function for a short animation
   texting()
   setTimeout(textingTwo,5000)
   setTimeout(()=>{text = false},10000)
   const insInter = setInterval(instruction,45)
   }



/*============ bin ==================*/
