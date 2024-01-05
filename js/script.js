const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const game_board = document.querySelector('.game-board')
const audio = document.querySelector('.audio')
const gameOver = document.querySelector('.game-over')

    document.addEventListener('DOMContentLoaded', function(){
        const animacaoPipe = document.querySelector('.pipe')

       function atualizarVelocidade(){
        const velocidadeAtual = parseFloat(animacaoPipe.style.animationDuration) || 1
        const novaVelocidade = velocidadeAtual - 0.1

        animacaoPipe.style.animationDuration = novaVelocidade + 's'
       }

       setInterval(atualizarVelocidade, 10000)
    })

    var contador = 0

    var elementoContador = document.querySelector('.score')

    function incrementarScore(){
        contador++
        elementoContador.textContent = contador * 100
    }

    const scoreInterval = setInterval(incrementarScore, 1000)

    const jump = () => {
        mario.classList.add('jump')
        audio.play()

        setTimeout(() => {
    
            mario.classList.remove('jump')
    
        }, 500) //animacao acontece a classe é alocada e depois é retirando, pressiona de novo e acontece novamente em um loop
    }
    
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft //pegando a distancia left do pipe
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    
        
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){//primeiro controlar o left do pipe, segundo ver se o mario cairia em cima do pipe, terceiro controlar se o pula do mario foi alto o suficiente
            gameOver.play()
            clearInterval(scoreInterval)
            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px`
    
            mario.style.animation = 'none'
            mario.style.bottom = `${marioPosition}px`
    
            mario.src = './images/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'
    
            game_board.innerHTML = `GAME OVER`
            game_board.style.color = `red`
            game_board.style.fontSize = '50px'
            game_board.style.textAlign = 'Center'
            game_board.style.paddingTop = '250px'

            const reiniciar = document.querySelector('.reiniciar')
    
            reiniciar.style.display = "block"
            reiniciar.style.padding = "17px"
            reiniciar.style.background = "#27da0f"
            reiniciar.style.color = "white"
            reiniciar.style.borderRadius = "20px"
            reiniciar.style.border = "white"
            reiniciar.style.fontSize = "17px"
            reiniciar.style.cursor = "pointer"
            reiniciar.style.margin = 'auto'
            reiniciar.style.marginTop = '20px'

            elementoContador.style.textAlign= 'center'
            elementoContador.style.marginTop= '15px'
            elementoContador.style.marginLeft= '-145px'
            elementoContador.innerHTML = `Sua pontuação foi: ${contador * 100}`

            
            game_board.appendChild(reiniciar)
            game_board.appendChild(elementoContador)

    
            clearInterval(loop) //acaba o loop
        }
    }, 10)

document.addEventListener('keydown', jump)
document.addEventListener('touchstart', jump)
    
