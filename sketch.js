var dogIMG, happyDogIMG;
var dog, happyDog, database, foodS, foodStock, foodObj;
var button1, button2

function preload()
{
	dogIMG = loadImage("images/Dog.png")
  happyDogIMG = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()
  dog = createSprite(250,250,10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  button1 = createButton('Feed the Dog');
  button1.position(600, 150);
  button1.mousePressed(writeStock)

  button2 = createButton('Add Food');
  button2.position(520, 150);

  foodObj = new Food()
}

function draw() {  
  background(46, 139, 87);

  drawSprites();
  
  textSize(15)
  fill(0,0,0);
  text("Food Remaining : "+foodS,170,150)
  text("Note : Press UP_ARROW key to feed Drago Milk",100,30);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDogIMG);
  if(foodObj.writeStock()<=0){
    foodObj.updateFoodStock(foodObj.writeStock()*0)
  }
    if(mousePressed(button1)){
      writeStock(foodS);
    }
}


