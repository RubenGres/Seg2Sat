import StampMaker from './StampMaker'

export default class PxBrush {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.stampMaker = new StampMaker()
    this.configPixelRatio()
  }

  get dpr () {
    return window.devicePixelRatio || 1
  }

  configPixelRatio () {
    const { width, height } = this.canvas
    this.canvas.width = width * this.dpr
    this.canvas.height = height * this.dpr
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.context.scale(this.dpr, this.dpr)
    this.context.imageSmoothingEnabled = false
  }

  exportAsPNG (fileName) {
    return new Promise(resolve => {
      const resultCanvas = document.createElement('canvas')
      const resultContext = resultCanvas.getContext('2d')
      const { width, height } = this.canvas
      const reducedWidth = width / this.dpr
      const reducedHeight = height / this.dpr
      resultCanvas.width = reducedWidth
      resultCanvas.height = reducedHeight
      resultContext.imageSmoothingEnabled = false
      resultContext.drawImage(
        this.canvas,
        0, 0, width, height,
        0, 0, reducedWidth, reducedHeight
      )
      resultCanvas.toBlob(blob => {
        blob.lastModifedDate = new Date()
        blob.name = fileName
        resolve(blob)
      })
    })
  }

  distanceBetween (point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
  }

  angleBetween (point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y)
  }

  draw ({ from, to, size, color }) {
    this.context.globalCompositeOperation = 'source-over'
    this.brush({ from, to, size, color })
  }

  erase ({ from, to, size }) {
    this.context.globalCompositeOperation = 'destination-out'
    this.brush({ from, to, size, color: '#000000' })
  }

  brush ({ from, to, size, color }) {
    const halfSize = (size - (size % 2)) / 2
    const stamp = this.stampMaker.make({ size, color })
    if (from.x === to.x && from.y === to.y) {
      const x = from.x - halfSize
      const y = from.y - halfSize
      this.context.drawImage(stamp, Math.round(x), Math.round(y), size, size)
      return
    }
    const dist = this.distanceBetween(from, to)
    const angle = this.angleBetween(from, to)
    for (let i = 0; i < dist; i += 1) {
      const x = from.x + (Math.sin(angle) * i) - halfSize
      const y = from.y + (Math.cos(angle) * i) - halfSize
      window.requestAnimationFrame(() => {
        this.context.drawImage(stamp, Math.round(x), Math.round(y), size, size)
      })
    }
  }
}
