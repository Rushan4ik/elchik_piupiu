const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'blue', 'purple', 'orange']
let time = 0
let score = 0

startBtn.addEventListener('click',(event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}


function decreaseTime(){
    if (time === 0){
        finishGame()
    }
    else{
        let current = --time
        if(current<10){
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}
function finishGame() {
    board.innerHTML = '<h1>Счёт:<span class="primary">'+' '+score+'</span></h1>'
    timeEl.parentNode.remove()
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(20, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)

    circle.classList.add('circle')
    circle.style.width = size+'px'
    circle.style.height = size+'px'
    circle.style.top = x+'px'
    circle.style.left = y+'px'
    board.append(circle) 
    circle.style.background = getRandomColor()
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(element) {
   const index = Math.floor(Math.random() * colors.length)
   return colors[index]
}
