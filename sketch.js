//Create variables here
var dog, happyDog, database, foodS, foodStock
var Imgdog,ImgHappydog


function preload()
{
  Imgdog = loadImage("dogImg.png")
  ImgHappydog = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10)
  dog.addImage(Imgdog);
  dog.scale = 0.3

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(46,139,87)

  textSize(10);
  fill("white")
  stroke("blue")
  text("NOTE: Press UP_ARROW key to Feed Drago Milk",150,50);
  text("Food Remaining:" + foodS,200,130)


  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(ImgHappydog);
  }

  drawSprites();
  //add styles here

}

function readStock(data)
{
  foodS = data.val()
}


function writeStock(x)
{
  if(x <= 0)
  {
    x=0;
  }
  else
  {
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
