class Tile {
  constructor(canvas, color = "white") {
    this.canvas = canvas;
    this.eraserMode = false;

    const div = document.createElement('div');

    div.style.backgroundColor = color;
    div.style.width = "100%";
    div.style.height = "100%";
    
    this.canvas.appendChild(div);

    this.mouseLogic(div);
  }
  mouseLogic(div) {
    document.addEventListener('mousedown', () => (this.canvas.mousepressed = true))
    document.addEventListener('mouseup', () => (this.canvas.mousepressed = false));

    document.querySelector("#eraser").addEventListener('click', () => (this.eraserMode = !this.eraserMode))

    div.addEventListener("mouseover", () => this.mouseOverLogic(div, this.eraserMode, this.canvas.mousepressed))
  }

  mouseOverLogic(div, eraserMode, mousepressed) {
    const pickColor = document.querySelector("#pick-color");
    if (mousepressed && eraserMode) {
      div.style.backgroundColor = "#ffffff";
    } else if (mousepressed) {
      div.style.backgroundColor = pickColor.value;
    } 
  }
}

class Canvas {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    
    this.numTilesInput = document.querySelector("#numberTiles");
    this.clear = document.querySelector("#clear");
    
    this.createTiles();
    this.numTilesInput.addEventListener('input', () => this.createTiles());
    this.clear.addEventListener('click', () => this.createTiles());
  }

  createTiles() {
    this.canvas.innerHTML = "";
    if (this.numTilesInput.value > this.numTilesInput.max) {
      this.numTilesInput.value = this.numTilesInput.max;
    } 
    let numTiles = this.numTilesInput.value;
    this.canvas.style.gridTemplateColumns = `repeat(${this.numTilesInput.value}, 1fr)`;
    for (let i = 0; i < numTiles ** 2; i++) {
      const tile = new Tile(this.canvas);
    }
  }   
}


const canvasInstance = new Canvas();