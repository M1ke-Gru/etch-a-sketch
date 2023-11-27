class Tile {
  constructor(container, color = "white") {
    this.container = container;

    const div = document.createElement('div');

    div.style.backgroundColor = color;
    div.style.width = "100%";
    div.style.height = "100%";
    
    this.container.appendChild(div);

    div.addEventListener("mousemove", (event) => {
      if (event.buttons === 1) { // Check if the left mouse button is pressed
        const newColor = (this.container.eraserMode) ? "#ffffff" : this.container.colorInput.value;
        div.style.backgroundColor = newColor;
      }
    });
  }
}

class Canvas {
  constructor() {
    this.container = document.querySelector('#canvas-container');
    
    this.numTilesInput = document.querySelector("#numberTiles");
    this.colorInput = document.querySelector("#pick-color");
    this.eraser = document.querySelector("#eraser");
    this.clear = document.querySelector("#clear");
    
    this.mousepressed = false;
    this.eraserMode = false;
    this.eraser.addEventListener('click', () => { this.eraserMode = !(this.eraserMode); });
    this.createTiles();
    this.numTilesInput.addEventListener('input', () => this.createTiles());
    this.clear.addEventListener('click', () => {this.createTiles();});
  }

  createTiles() {
    this.container.innerHTML = "";
    this.container.style.gridTemplateColumns = `repeat(${this.numTilesInput.value}, 1fr)`;
    for (let i = 0; i < this.numTilesInput.value ** 2; i++) {
      const tile = new Tile(this.container);
    }
  }   
}


const canvasInstance = new Canvas();