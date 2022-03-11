const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')

const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()

bird.src = 'img/bird.png'
bg.src = 'img/bg.png'
// fg.src = 'img/fg.png'
pipeUp.src = 'img/pipeUp.png'
pipeBottom.src = 'img/pipeBottom.png'

const pipe = []
pipe[0] = {
  x: cvs.width,
  y: 0
}

const gap = 120
let gravitation = 1.5
let score = 0
let xPos = 10
let yPos = 150

document.addEventListener('keydown', moveUp)

function moveUp() {
  yPos -= 25
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

    // Столкнулись с препятстием?
    if (xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
      || yPos + bird.height >= cvs.height - fg.height) {
      // location.reload()
      window.location = window.location.href;
    }

    if (pipe[i].x === 5) {
      score++
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height)
  ctx.drawImage(bird, xPos, yPos)
  yPos += gravitation

  ctx.fillStyle = '#fff'
  ctx.font = '24px Verdana'
  ctx.fillText(`Score: ${score}`, 10, cvs.height - 20)
  requestAnimationFrame(draw)
}

pipeBottom.onload = draw