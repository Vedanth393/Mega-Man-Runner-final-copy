var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mega_man, mega_man_running;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, tree1, tree2, tree3, obstacle1, tree4, tree5;
var gameoverImg,gameover,restart,restartImg
var score;


function preload(){
  mega_man_running = loadAnimation("mega_man.gif");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  gameoverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart1.png")

  tree1 = loadImage("tree1.jpg");
  tree2 = loadImage("tree2.jpg");
  tree3 = loadImage("tree3.jpg");
  obstacle1 = loadImage("obstacle1.jpg");
  tree4 = loadImage("tree4.jpg");
  tree5 = loadImage("tree5.jpg");
  
}

function setup() {
  createCanvas(600, 200);
  
  mega_man = createSprite(50,180,20,50);
  mega_man.addAnimation("running", mega_man_running);
  mega_man.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameover = createSprite(300,50)
  gameover.addImage(gameoverImg);
  gameover.scale=0.3

restart = createSprite(300,140)
restart.addImage(restartImg)
restart.scale=0.3

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  mega_man.setCollider("circle",0,0,40);
  mega_man.debug = false
  
  score = 0
}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -4;
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& mega_man.y >=100) {
        mega_man.velocityY = -13;
    }
    
    
    mega_man.velocityY = mega_man.velocityY + 0.8
  
    
    spawnClouds();
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(mega_man)){
        gameState = END;
    }
    restart.visible=false;
    gameover.visible=false;
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
   
     restart.visible=true;
     gameover.visible=true;
   }
  
 
  
  mega_man.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(tree1);
              break;
      case 2: obstacle.addImage(tree2);
              break;
      case 3: obstacle.addImage(tree3);
              break;
      case 4: obstacle.addImage(obstacle1);
              break;
      case 5: obstacle.addImage(tree4);
              break;
      case 6: obstacle.addImage(tree5);
              break;
      default: break;
    }
   
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 134;
    
  
    cloud.depth = mega_man.depth;
    mega_man.depth = mega_man.depth + 1;
    
    
   cloudsGroup.add(cloud);
    }
}

