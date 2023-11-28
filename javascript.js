class Tile {
  constructor(canvas, color = "white") {
    this.canvas = canvas;
    this.eraserMode = false;

    const div = document.createElement('div');

    div.style.backgroundColor = color;
    div.style.width = "100%";
    div.style.height = "100%";
    
    this.canvas.appendChild(div);

    document.body.onmousedown = () => (this.canvas.mousepressed = true);
    document.body.onmouseup = () => (this.canvas.mousepressed = false);

    document.querySelector("#eraser").addEventListener('click', () => {
      this.eraserMode = !this.eraserMode;
    })

    div.addEventListener("mouseover", () => {
      if (this.canvas.mousepressed && this.eraserMode) {
        div.style.backgroundColor = "#ffffff";
      } else if (this.canvas.mousepressed) {
        div.style.backgroundColor = document.querySelector("#pick-color").value;
      }
    })
  }
}

class Canvas {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    
    this.numTilesInput = document.querySelector("#numberTiles");
    this.colorInput = document.querySelector("#pick-color");
    this.eraser = document.querySelector("#eraser");
    this.clear = document.querySelector("#clear");
    
    this.createTiles();
    this.numTilesInput.addEventListener('input', this.createTiles());
    this.clear.addEventListener('click', this.createTiles());
  }

  createTiles() {
    this.canvas.innerHTML = "";
    this.canvas.style.gridTemplateColumns = `repeat(${this.numTilesInput.value}, 1fr)`;
    for (let i = 0; i < this.numTilesInput.value ** 2; i++) {
      const tile = new Tile(this.canvas);
    }
  }   
}


const canvasInstance = new Canvas();