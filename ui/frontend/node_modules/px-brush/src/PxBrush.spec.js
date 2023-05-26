jest.mock('StampMaker')

const PxBrush = require('./PxBrush')
const StampMaker = require('./StampMaker')

describe('PxBrush', () => {
  let pxBrush
  let canvas

  describe('constructor', () => {
    let dummyConfigPixelRatio
    let originalConfigPixelRatio

    beforeEach(() => {
      dummyConfigPixelRatio = jest.fn()
      canvas = document.createElement('canvas')
      originalConfigPixelRatio = PxBrush.prototype.configPixelRatio
      PxBrush.prototype.configPixelRatio = dummyConfigPixelRatio
      pxBrush = new PxBrush(canvas)
    })

    afterEach(() => {
      PxBrush.prototype.configPixelRatio = originalConfigPixelRatio
    })

    it('receives canvas', () => {
      expect(pxBrush.canvas).toEqual(canvas)
    })

    it('sets 2d context', () => {
      expect(pxBrush.context instanceof CanvasRenderingContext2D).toEqual(true)
    })

    it('sets stampMaker', () => {
      expect(pxBrush.stampMaker instanceof StampMaker).toEqual(true)
    })

    it('calls configPixelRatio method', () => {
      expect(pxBrush.configPixelRatio).toHaveBeenCalled()
    })
  })

  describe('getter dpr', () => {
    beforeEach(() => {
      window.devicePixelRatio = 100
      canvas = document.createElement('canvas')
      pxBrush = new PxBrush(canvas)
    })

    it('returns window.devicePixelRatio', () => {
      expect(pxBrush.dpr).toEqual(100)
    })
  })

  describe('configPixelRatio', () => {
    let dummyScale
    let originalScale

    beforeEach(() => {
      window.devicePixelRatio = 2
      dummyScale = jest.fn()
      originalScale = CanvasRenderingContext2D.prototype.scale
      CanvasRenderingContext2D.prototype.scale = dummyScale

      canvas = document.createElement('canvas')
      canvas.width = 500
      canvas.height = 300
      pxBrush = new PxBrush(canvas)
    })

    afterEach(() => {
      CanvasRenderingContext2D.prototype.scale = originalScale
    })

    it('sets width to canvas that mutiplied with dpr', () => {
      expect(pxBrush.canvas.width).toEqual(1000)
    })

    it ('sets height to canvas that multiplied with dpr', () => {
      expect(pxBrush.canvas.height).toEqual(600)
    })

    it('sets style.width to canvas that added "px" at the end of canvas.width ', () => {
      expect(pxBrush.canvas.style.width).toEqual('500px')
    })

    it('sets style.height to canvas that added "px" at the end of canvas.height ', () => {
      expect(pxBrush.canvas.style.height).toEqual('300px')
    })

    it('calls context.scale method with dpr', () => {
      expect(pxBrush.context.scale).toHaveBeenCalledWith(2, 2)
    })

    it('sets false to context.imageSmoothingEnabled', () => {
      expect(pxBrush.context.imageSmoothingEnabled).toEqual(false)
    })
  })

  describe('exportAsPNG', () => {
    // TODO
  })

  describe('distanceBetween', () => {
    beforeEach(() => {
      canvas = document.createElement('canvas')
      pxBrush = new PxBrush(canvas)
    })

    it('returns the distance between point1 and point2', () => {
      const point1 = { x: 100, y: 100 }
      const point2 = { x: 200, y: 200 }
      expect(pxBrush.distanceBetween(point1, point2)).toEqual(141.4213562373095)
    })
  })

  describe('angleBetween', () => {
    beforeEach(() => {
      canvas = document.createElement('canvas')
      pxBrush = new PxBrush(canvas)
    })

    it('returns the angle between point1 and point2', () => {
      const point1 = { x: 100, y: 100 }
      const point2 = { x: 200, y: 200 }
      expect(pxBrush.angleBetween(point1, point2)).toEqual(0.7853981633974483)
    })
  })

  describe('draw', () => {
    let dummyBrush
    let originalBrush

    beforeEach(() => {
      dummyBrush = jest.fn()
      originalBrush = PxBrush.prototype.brush
      PxBrush.prototype.brush = dummyBrush

      canvas = document.createElement('canvas')
      pxBrush = new PxBrush(canvas)
    })

    afterEach(() => {
      PxBrush.prototype.brush = originalBrush
    })

    it('sets "source-over" to context.globalCompositeOperation', () => {
      pxBrush.draw({})
      expect(pxBrush.context.globalCompositeOperation).toEqual('source-over')
    })

    it('calls brush method', () => {
      const from = { x: 100, y: 100 }
      const to = { x: 200, y: 200 }
      const size = 10
      const color = '#ff0000'
      pxBrush.draw({ from, to, size, color })
      expect(pxBrush.brush).toHaveBeenCalledWith({ from, to, size, color })
    })
  })

  describe('erase', () => {
    let dummyBrush
    let originalBrush

    beforeEach(() => {
      dummyBrush = jest.fn()
      originalBrush = PxBrush.prototype.brush
      PxBrush.prototype.brush = dummyBrush

      canvas = document.createElement('canvas')
      pxBrush = new PxBrush(canvas)
    })

    afterEach(() => {
      PxBrush.prototype.brush = originalBrush
    })

    it('sets "destination-out" to context.globalCompositeOperation', () => {
      pxBrush.erase({})
      expect(pxBrush.context.globalCompositeOperation).toEqual('destination-out')
    })

    it('calls brush method', () => {
      const from = { x: 100, y: 100 }
      const to = { x: 200, y: 200 }
      const size = 10
      pxBrush.erase({ from, to, size })
      expect(pxBrush.brush).toHaveBeenCalledWith({ from, to, size, color: '#000000' })
    })
  })

  describe('brush', () => {
    const dummyStamp = 'dummy stamp'
    let dummyMake
    let originalMake
    let dummyDrawImage
    let originalDrawImage
    let dummyRequestAnimationFrame
    let originalRequestAnimationFrame

    beforeEach(() => {
      dummyMake = jest.fn(() => dummyStamp)
      originalMake = StampMaker.prototype.make
      StampMaker.prototype.make = dummyMake
      dummyDrawImage = jest.fn()
      originalDrawImage =  CanvasRenderingContext2D.prototype.drawImage
      CanvasRenderingContext2D.prototype.drawImage = dummyDrawImage
      dummyRequestAnimationFrame = jest.fn(process => process())
      originalRequestAnimationFrame = window.requestAnimationFrame
      window.requestAnimationFrame = dummyRequestAnimationFrame
      canvas = document.createElement('canvas')
      pxBrush = new PxBrush(canvas)
    })

    afterEach(() => {
      StampMaker.prototype.make = originalMake
      CanvasRenderingContext2D.prototype.drawImage = originalDrawImage
      window.requestAnimationFrame = originalRequestAnimationFrame
    })

    describe('when from and to are same position', () => {
      it('calls context.drawImage once', () => {
        const from = { x: 100.5, y: 100.4 }
        const to = { x: 100.5, y: 100.4 }
        const size = 10
        const color = '#ff0000'
        pxBrush.brush({ from, to, size, color })
        expect(pxBrush.stampMaker.make).toHaveBeenCalledWith({ size, color })
        expect(pxBrush.context.drawImage).toHaveBeenCalledWith(
          dummyStamp, 96, 95, 10, 10
        )
      })
    })

    describe('when from and to are different position', () => {
      it('calls context.drawImage needed times', () => {
        const from = { x: 100, y: 100 }
        const to = { x: 200, y: 200 }
        const size = 10
        const color = '#ff0000'
        pxBrush.brush({ from, to, size, color })
        expect(window.requestAnimationFrame).toHaveBeenCalledTimes(142)
        expect(pxBrush.context.drawImage).toHaveBeenCalledTimes(142)
      })
    })
  })
})
