var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  //create tower,ghost sprites and groups
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.y=tower.height/2;
  
  ghost = createSprite(200,200,20,20);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=createGroup();
 climbersGroup=createGroup();
  invisibleBlockGroup=createGroup();
}

function draw(){
  background(0);
  //instructions for game state-play
  if(gameState==="play"){
    //keep tower continous
  if(tower.y>550){
    tower.y=300;
  }
    //spawn doors at intervals
  spawnDoors();
  //make ghost jump
 if(keyDown("space")){
   ghost.velocityY=-10;
}
    //give gravity to ghost
  ghost.velocityY=ghost.velocityY+0.8;
  
    //make ghost move left and right
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
    //make ghost stand over the climber
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    //end game and destroy ghost if it leaves screen or touches the block
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      gameState="end";
      ghost.destroy();
    }
    
    drawSprites();
  }
  //show game over once game ends
  if(gameState==="end"){
    textSize(35);
    fill("red");
    text("GAME OVER",200,160 );
  }
  }
  
//spawn doors at intervals and add the doors,climbers and blocks to groups
function spawnDoors(){
  if(frameCount%250===0){
    door= createSprite(200,-50,10,10);
    door.addImage(doorImg);
    //make door move and give random x poxition
    door.velocityY = 1;
    door.x=Math.round(random(130,400));
    door.lifetime=600;
    
    doorsGroup.add(door);
    
    climber = createSprite(200,10,10,10);
    climber.addImage(climberImg);
    //alligning climber with door
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,15,10,10);
    invisibleBlock.debug=true;
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=600;
    invisibleBlockGroup.add(invisibleBlock);
  }
}




