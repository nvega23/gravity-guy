import Game from './scripts/game'

document.addEventListener('DOMContentLoaded', () =>{
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const CANVAS_WIDTH = canvas.width = 600
    const CANVAS_HEIGHT = canvas.width = 600
    const hud = document.getElementById('hud')
    const play = document.getElementById('start')
    const end = document.getElementById('endGame')
    const gcontrols = document.getElementById('gravity')
    const score = document.getElementById('output')
    const win = document.getElementById('win')
    const playSong = document.getElementById('play')
    const pauseSong = document.getElementById('pause')
    let music = new Audio()
    music.src = '../src/audio/2.mp3'
    music.volume = 0.08
    playSong.addEventListener('click', ()=>{
        music.play()
    })
    pauseSong.addEventListener('click', ()=>{
        music.pause()
    })
    // music.play()
    play.addEventListener('click', () => {
        canvas.classList.remove('hidden')
        // canvas.classList.add('hidden')
        const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
        play.classList.add('hidden')
        hud.classList.add('hidden')
        gcontrols.classList.remove('hidden')
    })
    end.addEventListener('click', () => {
        canvas.classList.add('hidden')
        play.classList.remove('hidden')
        hud.classList.remove('hidden')
        score.classList.add('hidden')
        gcontrols.classList.add('hidden')
        win.classList.add('hidden')
    })
})

//game over reset, you win or lose
