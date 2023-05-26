# PxBrush

Pixelated Brush on HTML5 Canvas

## Getting started

1. `npm install --save px-brush` or `yarn add px-brush`
2. `import PxBrush from 'px-brush'`
3. `const pxBrush = new PxBrush(canvas)`
4. call `draw` or `erase` function like below

```js
const canvas = document.createElement('canvas')
const pxBrush = new PxBrush(canvas)
const size = 10
const color = '#0000ff' // blue

let mouseDown = false
let startPosition = null

const getPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mousedown', () => {
  mouseDown = true
  startPosition = getPosition(canvas, event)
  pxBrush.draw({
    from: startPosition,
    to: startPosition,
    size,
    color
  })
})

canvas.addEventListener('mousemove', (event) => {
  if (!mouseDown) { return }
  const position = getPosition(canvas, event)
  pxBrush.draw({
    from: startPosition,
    to: position,
    size,
    color
  })
  startPosition = position
})

canvas.addEventListener('mouseup', () => {
  mouseDown = false
})

```