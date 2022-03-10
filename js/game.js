const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')

const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()

bird.src = 'img/bird.png'
bg.src = 'img/bg.png'
fg.src = 'img/fg.png'
pipeUp.src = 'img/pipeUp.png'
pipeBottom.src = 'img/pipeBottom.png'

const pipe = []
pipe[0] = {
  x: cvs.width,
  y: 0
}

const gap = 90
let gravitation = 1
let xPos = 10
let yPos = 150

document.addEventListener('keydown', moveUp)

function moveUp() {
  yPos -= 20
}

function draw() {

  ctx.drawImage(bg, 0, 0)

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
    pipe[i].x--

    if (pipe[i].x === 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      })
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height)
  ctx.drawImage(bird, xPos, yPos)
  yPos += gravitation
  requestAnimationFrame(draw)
}

pipeBottom.onload = draw