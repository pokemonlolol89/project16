var PLAY = 1, END = 0, gameState = PLAY;
var ground, invisibleGround
var monkey , monkey_running,monkey_collided;
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survival=0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation("sprite_7.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  
  ground=createSprite(400,350,900,10);
  ground.x=ground.width/2;
  console.log(ground.x);
  monkey=createSprite(50,300,20,40)
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("collided",monkey_collided)
  monkey.scale=0.17
  bananaGroup=new Group();
  obstacleGroup=new Group();
}

function draw() {
  background("white");
  fill("blue");
  textSize(16);
  text("Survival time: "+ survival, 250,50);
  
  bananaF();
  obstacleF();
 
  if(gameState === PLAY){
    survival=survival+10
    
    
      if(keyDown("space") && monkey.y>190){
        monkey.velocityY=-10
      }
    monkey.velocityY=monkey.velocityY+0.5
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
    }
    
  }
  else if(gameState === END){
    monkey.changeAnimation("collided",monkey_collided)
    monkey.velocityY=0
     obstacleGroup.setVelocityXEach(0)
      bananaGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-2)
    bananaGroup.setLifetimeEach(-2)
    
  }
  monkey.collide(ground)
  drawSprites();
 
}
  
function bananaF(){
  if(frameCount % 100 === 0){
    banana = createSprite(600,120,40,10);
    banana.y=Math.round(random(150,200))
    banana.velocityX=-3
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.lifetime=200
    banana.depth=monkey.depth
    monkey.depth=monkey.depth+1
    bananaGroup.add(banana)
  }
}

function obstacleF(){
 if(frameCount % 140 === 0){
   obstacle = createSprite(600,310,10,40);
   obstacle.velocityX=-3
   obstacle.addImage(obstacleImage)
   obstacle.scale=0.2    
    obstacle.lifetime=200
   obstacleGroup.add(obstacle)
 } 
}