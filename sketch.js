var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var stopMonkey;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  stopMonkey = loadAnimation("sprite_8.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop",stopMonkey);

  monkey.scale = 0.1;
  
  ground = createSprite(200,500,600,10)
  ground.x = ground.width /2;

  
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
  
}

function draw() {
  background("white");
  //displaying score
  text("Score: "+ score, 500,50);
  
  text("Survival Time:" + survivalTime,350,50);
  
  if (gameState=== PLAY){
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  survivalTime=Math.ceil(frameCount/frameRate())
    if ( bananasGroup.isTouching(monkey)) {
score = score + 1;
 bananasGroup[0].destroy();
}
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 400) {
        monkey.velocityY = -12;
    }
    spawnBananas();
  spawnObstacles();
  
    if (obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
  }
  
  if (gameState=== END){
     ground.velocityX = 0;
    monkey.velocityY = 0;
    
//set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    monkey.changeAnimation("stop");
  }
  
  
  
  monkey.collide(ground);
  
  
 
   
  
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 90 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(350,400));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,470,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale= 0.15;
   obstacle.velocityX = -6;
   obstaclesGroup.add(obstacle);
   obstacle.setCollider("circle", 0,0,30)
 }
  
}
