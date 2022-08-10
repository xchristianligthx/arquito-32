const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase;
var computer, computerBase;

//Declara una matriz para las flechas playerArrows = [ ]
var playerArrows = [];
var computerArrows = [];
var arrow;
var playerArcherLife = 3;
var computerArcherLife = 3;
function preload(){
  backgroundImg = loadImage("assets/background.gif")
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );
  computerArcher = new ComputerArcher(
    width - 340,
    computerBase.body.position.y - 180,
    120,
    120
  );
  //función para administrar las flechas de la computadora
  handleComputerArcher(); 


}

function draw() {
  background(backgroundImg);

  //escribe una línea correcta de código para mostrar la imagen de fondo
  Engine.update(engine);

  //Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("TIRO CON ARCO ÉPICO", width / 2, 100);

 
  playerBase.display();
  player.life();

  player.display();
  

  computerBase.display();
  computer.display();
  computer.life();

  playerArcher.display();
  computerArcher.display()

 //Usar un loop for para mostrar la flecha usando la función showArrow() 
 for (var i = 0; i < playerArrows.length; i++) {
  showArrows(i, playerArrows);
}

for (var i = 0; i < computerArrows.length; i++) {
  showArrows(i, computerArrows);
}


//Llamar funciones para deneter la colision para el jugador y la computadora

}

function keyPressed() {

  if(keyCode === 32){
    //crea un objeto de flecha y agregala en una matriz ; establece su ángulo igul que el de playerArcher
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);

  }
}

function keyReleased () {

  if(keyCode === 32){
    //llamar a la función shoot() por cada flecha en una matriz playerArrows
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }

}
//Mostrar la flecha y la trayectoria
function showArrows(index, arrows) {
  arrows[index].display();
  
    
  
 

}

function handleComputerArcher() {
  if (!computerArcher.collapse && !playerArcher.collapse) {
    setTimeout(() => {
      var pos = computerArcher.body.position;
      var angle = computerArcher.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP") {
        angleValue = 0.1;
      } else {
        angleValue = -0.1;
      }
      angle += angleValue;

      var arrow = new ComputerArrow(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(computerArcher.body, angle);
      Matter.Body.setAngle(computerArcher.body, angle);

      computerArrows.push(arrow);
      setTimeout(() => {
        computerArrows[computerArrows.length - 1].shoot(angle);
      }, 100);

      handleComputerArcher();
    }, 2000);
  }
}

function handlePlayerArrowCollision() {
//Escribir código para detectar la colisión entre la flecha del jugador y el opontente
}

function handleComputerArrowCollision() {
  //Escribir código para detectar colisión entre la flecha de la computadora y el oponente
}

