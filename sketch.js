var dogNormal , dogHappy , dog
var food , foodCount , database , time

function preload()
{
	dogNormal = loadImage("dogImg.png")
  dogHappy = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(400, 600);
  dog = createSprite(200,200,50,50)
  dog.addImage(dogNormal)
  dog.scale = 0.2

  database  = firebase.database();

  foodCount = database.ref('foodDB')
  foodCount.on("value",readStock)
  food = foodCount;
}



function draw() {  
  background("lightblue")
  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(food - 1)
    dog.addImage(dogHappy);

    time = hour();
    database.ref('/').update({
      lastFed: time
    })    

    
    
  }
  
  textSize(20);

  if(time === 0){
    text("Last Fed: 12 AM",400,200)
  }
  else if(time  >= 12){
    text("last Fed: " + time + ":00" + " PM" , 150,80)
  }
  if(time <= 12){
    text("last Fed: " + time + ":00" + " AM" , 150 ,80)
  }

  if(keyWentDown(DOWN_ARROW) && food <= 2){
    writeStock(20)
    dog.addImage(dogNormal);
  }

  textSize(20);
  text("Food Left: " + food , 150 ,400);

  if(food <= 2){
    text("Press down arrow to get more food", 50 ,500);
    
  }
  

  

}

function readStock(data){
  food = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }

  database.ref('/').update({
    foodDB:x
  })
}



