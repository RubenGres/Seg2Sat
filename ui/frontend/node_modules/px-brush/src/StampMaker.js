const HexPattern = /^#?[0-9A-Fa-f]{1,2}[0-9A-Fa-f]{1,2}[0-9A-Fa-f]{1,2}$/
const RGBPattern = /^rgb\((\s+)?[0-9]{1,3},(\s+)?[0-9]{1,3},(\s+)?[0-9]{1,3}(\s+)?\)$/

export default class StampMaker {
  constructor () {
    this.canvases = {}
  }

  parseColor (color) {
    const isHex = HexPattern.test(color)
    const isRGB = RGBPattern.test(color)
    if (!isHex && !isRGB) {
      throw new Error('Color is not correct format. #123123 or rgb(123, 123, 123) format required.')
    }
    if (isHex) {
      let c = color[0] === '#' ? color.slice(1) : color
      c = c.length === 3
        ? c.split('').reduce((acc, it) => [...acc, it, it], []).join('')
        : c
      const r = parseInt(c.slice(0, 2), 16)
      const g = parseInt(c.slice(2, 4), 16)
      const b = parseInt(c.slice(4, 6), 16)
      return { r, g, b }
    }
    if (isRGB) {
      let [r, g, b] = color
        .replace(/rgb|\s+|\(|\)/g, '')
        .split(',')
        .map(it => parseInt(it))
      r = r > 255 ? 255 : r
      g = g > 255 ? 255 : g
      b = b > 255 ? 255 : b
      return { r, g, b }
    }
  }

  make ({ size, color }) {
    try {
      size = size * window.devicePixelRatio
      const _color = this.parseColor(color)
      const _strColor = JSON.stringify(_color)
      this.canvases[_strColor] = this.canvases[_strColor] || {}

      if (this.canvases[_strColor][size] != null) {
        return this.canvases[_strColor][size]
      }
      const canvas = document.createElement('canvas')
      size = size + (size % 2)
      canvas.width = size
      canvas.height = size

      const context = canvas.getContext('2d')
      const imageData = context.createImageData(size, size)
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255
        imageData.data[i + 1] = 255
        imageData.data[i + 2] = 255
        imageData.data[i + 3] = 0
      }
      this.plotCircle(size * 2, (size * 4) * (size / 2), size / 2, imageData, size, _color)
      this.fillCircle(imageData, _color)
      context.putImageData(imageData, 0, 0)
      this.canvases[_strColor][size] = canvas
      return canvas
    } catch (err) {
      console.error(err)
    }
  }

  plotCircle (xm, ym, r, imageData, size, color) {
    let x = -r
    let y = 0
    let err = 2 - 2 * r /* bottom left to top right */

    do {
      /*   I. Quadrant +x +y */
      const i = xm - ((x + 1) * 4) + (ym + ((y - 1) * (size * 4)))
      imageData.data[i + 0] = color.r
      imageData.data[i + 1] = color.g
      imageData.data[i + 2] = color.b
      imageData.data[i + 3] = 255
      /*  II. Quadrant -x +y */
      const ii = xm - (y * (size * 4)) + (ym - ((x + 1) * 4))
      imageData.data[ii + 0] = color.r
      imageData.data[ii + 1] = color.g
      imageData.data[ii + 2] = color.b
      imageData.data[ii + 3] = 255
      /* III. Quadrant -x -y */
      const iii = (xm + (x * 4)) + (ym - (y * (size * 4)))
      imageData.data[iii + 0] = color.r
      imageData.data[iii + 1] = color.g
      imageData.data[iii + 2] = color.b
      imageData.data[iii + 3] = 255
      /*  IV. Quadrant +x -y */
      const iv = (xm + ((y - 1) * (size * 4))) + (ym + (x * 4))
      imageData.data[iv + 0] = color.r
      imageData.data[iv + 1] = color.g
      imageData.data[iv + 2] = color.b
      imageData.data[iv + 3] = 255
      r = err
      if (r <= y) {
        err += ++y * 2 + 1 /* y step */
      }
      if (r > x || err > y) {
        err += ++x * 2 + 1 /* x step */
      }
    } while (x < 0)
  }

  fillCircle (imageData, color) {
    const cols = imageData.width * 4
    for (let row = 1; row < imageData.height - 1; row += 1) {
      let isHitColor = false
      let isHitClear = false
      let isEnded = false
      for (let col = 0; col < cols; col += 4) {
        const index = cols * row + col
        const alpha = imageData.data[index + 3]
        const isColor = alpha === 255
        const isClear = alpha === 0
        if (isColor && !isHitColor) {
          isHitColor = true
        } else if (isClear && isHitColor) {
          isHitClear = true
        } else if (isColor && isHitColor && isHitClear) {
          isEnded = true
        }
        if (isHitColor && isHitClear && !isEnded) {
          imageData.data[index] = color.r
          imageData.data[index + 1] = color.g
          imageData.data[index + 2] = color.b
          imageData.data[index + 3] = 255
        }
      }
    }
  }
}
