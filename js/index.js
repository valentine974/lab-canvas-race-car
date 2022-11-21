const myObstacles = [];

const myGameArea = {
  canvas: document.getElementById("canvas"), 
  frames: 0,
  start: function () {
    this.context = this.canvas.getContext("2d");
    this.roadImg = new Image();
    this.roadImg.src = "../images/road.png";
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage( this.roadImg, 0, 0, this.canvas.width, this.canvas.height );
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage( this.roadImg, 0, 0, this.canvas.width, this.canvas.height );
  },
};

class Component {
  constructor(width, height, src, x, y) {
    this.width = width;
    this.height = height;
    this.src = src;
    this.x = x;
    this.y = y;
    this.speedX = 0; 
  }

  update() {
    const ctx = myGameArea.context;
    ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX; 
  }

  crashWith(obstacle) {
    return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
  }
}

class Obstacles {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


document.addEventListener('keydown', (e) => {
  switch (e.keyCode) { 
    case 37: // left arrow
      car.speedX -= 1;
      break;
    case 39: // right arrow
      car.speedX += 1;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  car.speedX = 0;
  car.speedY = 0;
});


// CREATE THE PLAYER 
const carImg = new Image();
carImg.src = "../images/car.png";
const carW = 50;
const carH = 90;
const carX = 225;
const carY = 400;
const car = new Component(carW, carH, carImg, carX, carY);


window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  let interval
  function startGame() {
    myGameArea.start(); 
    interval = setInterval(updateGameArea, 20);

     
  }

  
 
  function updateGameArea() {
    myGameArea.clear();
    car.newPos();
    car.update();
    updateObstacles();
    checkGameOver();
  }

  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].y += 1;
      myObstacles[i].update(); 
    }

    myGameArea.frames += 1;

    if (myGameArea.frames % 180 === 0) {
      // let y = myGameArea.canvas.height;
      let y = 0
      let minWidth = 20;
      let maxWidth = 300;
      let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      let minGap = 100;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Obstacles( width                                , 20, '#870107', 0          , y));
      myObstacles.push(new Obstacles( myGameArea.canvas.width - width - gap, 20, '#870107', width + gap, y));
    }
  }

  function stopGame(){
    clearInterval(interval);

  }

  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
   
    if (crashed) {
      stopGame()
    }
  }

};
