export default class Drawer {
  #isDrawing = false
  #brushSize = 5
  #brushColor = '#8b9d25'
  #points = []
  #width = 0
  #height = 0

  constructor(context, width, height) {
    this.context = context
    this.#width = width
    this.#height = height
  }

  beginDraw(x, y) {
    this.clear()
    this.#isDrawing = true
    this.context.lineCap = 'round' // 线条端点为圆滑
    this.context.lineJoin = 'round' // 线条连接处为圆滑
    this.context.beginPath()
    this.context.moveTo(x, y)
    this.#points.push([x, y])
  }

  drawing(x, y) {
    if (this.#isDrawing) {
      this.context.lineTo(x, y)
      this.context.strokeStyle = this.#brushColor
      this.context.lineWidth = this.#brushSize
      this.context.stroke()
      this.#points.push([x, y])
    }
  }

  endDraw() {
    this.#isDrawing = false
  }

  setBrushSize(size) {
    this.#brushSize = size
  }

  setBrushColor(color) {
    this.#brushColor = color
  }

  clear() {
    this.context.clearRect(0, 0, this.#width, this.#height)
    this.#points = []
  }

  async exportImage(imageUrl) {
    if (!this.#points.length) {
      return {
        status: false,
        message: '请选择您想要移除的物体'
      }
    } else {
      const exportCanvas = document.createElement('canvas')
      // exportCanvas.style.display = 'none'
      exportCanvas.width = this.#width
      exportCanvas.height = this.#height
      // document.body.appendChild(exportCanvas)
      const exportContext = exportCanvas.getContext('2d')

      exportContext.fillStyle = 'black'
      exportContext.fillRect(0, 0, this.#width, this.#height)

      const firstPoint = this.#points.shift()
      exportContext.lineCap = 'round'
      exportContext.lineJoin = 'round'
      exportContext.beginPath()
      exportContext.moveTo(firstPoint[0], firstPoint[1])
      this.#points.forEach(([x, y]) => {
        exportContext.lineTo(x, y)
        exportContext.strokeStyle = 'white'
        exportContext.lineWidth = this.#brushSize
        exportContext.stroke()
      })
      const { widthScale = 1, heightScale = 1 } = await this.#getScaleRatio(imageUrl)
      exportContext.scale(widthScale, heightScale)
      exportCanvas.width=this.#width*widthScale
      exportCanvas.height=this.#height*heightScale
      return {
        status: true,
        img: exportCanvas.toDataURL('image/png')
      }
    }
  }
  #getScaleRatio(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = imageUrl

      img.onload = () => {
        const widthScale = img.width / this.#width
        const heightScale = img.height / this.#height

        resolve({
          widthScale,
          heightScale
        })
      }

      img.onerror = () => {
        reject({})
      }
    })
  }
}
