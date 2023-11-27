class Tile {
  constructor(container, color = "white") {
    this.container = container;

    const div = document.createElement('div');

    div.style.backgroundColor = color;
    div.style.width = "100%";
    div.style.height = "100%";
    
    this.container.appendChild(div);

    div.addEventListener("mousedown", () => {
      this.container.mousepressed = true;
    })
    
    div.addEventListener("mouseup", () => {
      this.container.mousepressed = false;
    })
    
    div.addEventListener("mousemove", () => {
      if (this.container.mousepressed) {
        div.style.backgroundColor = document.querySelector("#pick-color").value;
      }
    })
  }
}

class Canvas {
  constructor() {
    this.container = document.querySelector('#canvas-container');
    
    this.numTilesInput = document.querySelector("#numberTiles");
    this.colorInput = document.querySelector("#pick-color");
    this.eraser = document.querySelector("#eraser");
    this.clear = document.querySelector("#clear");
    this.currentColor = this.colorInput.value;
    
    this.mousepressed = false;
    this.eraser.addEventListener('click', () => { 
      if (this.colorInput.value !== "white") {
        document.querySelector("#pick-color").value = "#ffffff";
      } else {
        document.querySelector("#pick-color").value = this.currentColor;
      }
    });
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