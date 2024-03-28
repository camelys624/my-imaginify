export default class Drawer {
  #isDrawing = false;
  #brushSize = 5;
  #brushColor = '#8b9d25';

  constructor(context) {
    this.context = context;
  }

  beginDraw(x, y) {
    this.#isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(x, y);
  }

  drawing(x, y) {
    if (this.#isDrawing) {
      this.context.lineTo(x, y);
      this.context.strokeStyle = this.#brushColor;
      this.context.lineWidth = this.#brushSize;
      this.context.stroke();
    }
  }

  endDraw() {
    this.#isDrawing = false;
  }

  setBrushSize(size) {
    this.#brushSize = size;
  }

  setBrushColor(color) {
    this.#brushColor = color;
  }
}