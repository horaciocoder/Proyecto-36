var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//crea aquí las variables feed y lastFed 
var feed, lastFed;
var lastFedDate;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  feed = createButton("Alimentar al Perro");
  feed.position(650, 95);
  feed.mousePressed(feedDog);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("skyblue");
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  var FeedingRef = database.ref("FeedTime").on("value", function(data) {
    lastFed = data.val();
  })
 
  //escribe el código para mostrar el texto lastFed time aquí
  fill("black");
  textSize(20);
  textAlign(CENTER);
  text("Se alimentó por última vez a las " + lastFed, 500, 100);
 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  if (foodS > 0) {
    dog.addImage(happyDog);
    var date = new Date();
    var hours = date.getHours();
    var mins = date.getMinutes();
    if (mins < 10) {
      mins = "0"+mins;
    }
    if (hours < 12) {
      hours = hours + ":" + mins + " A.M.";
    }
    else {
      hours = (hours - 12) + ":" + mins + " P.M.";
    }
    var day = date.getDay();
    switch(day) {
      case 1:
        day = "Lunes";
        break;
      case 2:
        day = "Martes"
        break;
      case 3:
        day = "Miércoles";
        break;
      case 4:
        day = "Jueves";
        break;
      case 5:
        day = "Viernes";
        break;
      case 6:
        day = "Sábado";
        break;
      case 7:
        day = "Domingo";
      default:
        break;
    }
    var lastFedDate = date.getDate();
    var month = date.getMonth();
    month = month + 1;
    switch (month) {
      case 1:
        month = "Enero";
        break;
      case 2:
        month = "Febrero";
        break;
      case 3:
        month = "Marzo";
        break;
      case 4:
        month = "Abril";
        break;
      case 5:
        month = "Mayo";
        break; 
      case 6:
        month = "Junio";
        break;
      case 7:
        month = "Julio";
        break;
      case 8:
        month = "Agosto";
        break;
      case 9:
        month = "Septiembre";
        break;
      case 10:
        month = "Octubre";
        break; 
      case 11:
        month = "Noviembre";
        break;
      case 12:
        month = "Diciembre";
        break;
      default:
        break;  
    }
    var year = date.getFullYear();
    database.ref("/").update({
      FeedTime: hours + " del " + day +", " + lastFedDate + " de " + month + " del " + year
    });
    foodObj.deductFood();
  foodStock = foodObj.foodStock
  database.ref("/").update({
    Food: foodStock
  })
  }
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
