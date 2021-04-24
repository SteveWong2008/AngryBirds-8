//constant values of the engine, world, bodies and Constaints.

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


//variables for the objects in the world
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

//gamestate, background and score variables.
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    //preloading the function for getting the background
    getBackgroundImg();
}

function setup(){
    //creating the canvas and the world
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    //the objects for the game.
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);

    //slingshot rope that pulls back the bird
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    //background Images being changed using getBackground();
    if(backgroundImg)
        background(backgroundImg);
    
        //Scoring System
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    
    //displaying all the objects.
        Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //  if (gameState!=="launched"){
    //making it so that the bird gets dragged when mouse is Dragged    
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    //when the mouse is Released then the bird is also released and the gameState changes to "launched"
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       //when space is pressed then the bird trajectory gets deleted and the body position goes back to the sling shot and the rope gets reatached to the bird.
        bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);
       
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}