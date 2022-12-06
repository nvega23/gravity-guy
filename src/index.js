import Game from './scripts/game'

document.addEventListener('DOMContentLoaded', () =>{
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const CANVAS_WIDTH = canvas.width = 600
    const CANVAS_HEIGHT = canvas.width = 600

    const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
})
