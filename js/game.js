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

// const flyAudio = new Audio()
// const scoreAudio = new Audio()

// flyAudio.src = "audio/fly.mp3"
// scoreAudio.src = "audio/score.mp3"

const pipe = []
pipe[0] = {
  x: cvs.width,
  y: 0
}

const gap = 110
let gravitation = 1.5
let score = 0
let bestScore = 0
let xPos = 10
let yPos = 150
let game

const localStorageRaw = localStorage.getItem('flappyBirdGame')
const localStorageObject = JSON.parse(localStorageRaw)

if (localStorageObject != null) {
  bestScore = localStorageObject.bestScore
}

document.addEventListener('keydown', moveUp)
document.addEventListener('touchstart', moveUp)

function drawLoop() {
  game = setInterval(draw, 20)
}

window.onload = drawLoop

function draw() {

  ctx.drawImage(bg, 0, 0)

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
    pipe[i].x--

    // 
    if (pipe[i].x === 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      })
    }

    // Did we crash into a pipe?
    if (xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
      // Yep
      if (score > bestScore) {
        bestScore = score
        localStorage.setItem('flappyBirdGame', JSON.stringify({ bestScore: bestScore }))
      }
      clearInterval(game)
      location.reload()
    }

    if (pipe[i].x === 5) {
      score++
//       scoreAudio.play()
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height)
  ctx.drawImage(bird, xPos, yPos)
  yPos += gravitation

  ctx.fillStyle = '#fff'
  ctx.font = '24px Verdana'
  ctx.fillText(`Score: ${score}`, 10, cvs.height - 50)
  ctx.fillText(`Best score: ${bestScore}`, 10, cvs.height - 20)
}

function moveUp() {
  yPos -= 25
//   flyAudio.play();
}
