let nPlays = 0

let nPairs = 0

let playsEnd = 0

let gameStatus = 0

const imgParrots = [
  'imgs/bobrossparrot.gif',
  'imgs/explodyparrot.gif',
  'imgs/fiestaparrot.gif',
  'imgs/metalparrot.gif',
  'imgs/revertitparrot.gif',
  'imgs/tripletsparrot.gif',
  'imgs/unicornparrot.gif'
]

let flipped = []

let selected = []

function gameStart() {
  let nCards = parseInt(
    prompt('Quantas cartas você quer jogar? \n Escolha um nº entre 4 e 14')
  )

  while (nCards % 2 !== 0 || nCards < 4 || nCards > 14) {
    nCards = parseInt(
      prompt(
        'Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?'
      )
    )
  }

  let widthJogo = (nCards / 2) * 150
  let ul = document.querySelector('.cards')
  ul.style.width = widthJogo + 'px'

  renderCards(nCards)
  gameStatus = 'jogando'
  playsEnd = nCards
}
function renderCards(nCards) {
  randomParrot(nCards)

  while (selected.length !== 0) {
    let card = document.createElement('li')

    card.setAttribute('onclick', 'click1(this)')

    let imgcard = document.createElement('img')

    let randomParrot = Math.floor(selected.length * Math.random())

    let urlAleatorio = selected[randomParrot]
    imgcard.setAttribute('src', urlAleatorio)

    selected.splice(randomParrot, 1)

    imgcard.style.display = 'none'

    card.appendChild(imgcard)

    let ul = document.querySelector('.cards')
    ul.appendChild(card)
  }
}

function randomParrot(nCards) {
  for (let i = 0; i < nCards / 2; i++) {
    let randomParrot = Math.floor(imgParrots.length * Math.random())
    selected.push(imgParrots[randomParrot])
    selected.push(imgParrots[randomParrot])
    imgParrots.splice(randomParrot, 1)
  }
}

gameStart()

function gameEnd() {
  gameStatus = 'ganhou'
  alert('Você ganhou em ' + nPlays + ' jogadas!!!')
}

function click1(element) {
  flipped.push(element)

  if (flipped.length < 3) {
    flip(element, 'rotateY(180deg)', 'none', 'initial')
    nPlays++

    if (flipped.length === 2) {
      click2()
    }

    if (nPairs === playsEnd) {
      gameEnd()
      statusJogo = 'ganhou'
    }
  }
}

function click2() {
  let card1 = imgSrc(0)
  let card2 = imgSrc(1)

  let cards = verifyCards(card1, card2)

  if (cards === true) {
    flipped = []
    nPairs += 2
  } else if (cards === false) {
    setTimeout(function () {
      flip(flipped[0], 'rotateY(0deg)', 'url(imgs/front.png)', 'none')
      flip(flipped[1], 'rotateY(0deg)', 'url(imgs/front.png)', 'none')
      flipped = []
    }, 1000)
  }
}

function imgSrc(i) {
  let cardF = flipped[i].querySelector('img')
  let parrot = cardF.getAttribute('src')
  return parrot
}

function verifyCards(card1, card2) {
  if (card1 === card2) return true
  else return false
}

function flip(element, rotation, backgroundImg, display) {
  element.style.transform = rotation
  element.style.backgroundImage = backgroundImg
  let img = element.querySelector('img')
  img.style.display = display
}
