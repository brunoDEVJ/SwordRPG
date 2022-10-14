const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravidade = 0.5

class Jogador {
    constructor() {
        this.posicao =
        {
            x: 100,
            y: 100,
        }
        this.velocidade =
        {
            x: 0,
            y: 1
        }

        this.width = 30
        this.height = 30
    }
    desenhar() {
        contexto.fillStyle = 'red'
        contexto.fillRect(this.posicao.x, this.posicao.y, this.width, this.height)
    }
    atualizar() {
        this.desenhar()
        this.posicao.y += this.velocidade.y
        this.posicao.x += this.velocidade.x

        if (this.posicao.y + this.height + this.velocidade.y <= canvas.height)
            this.velocidade.y += gravidade
        else this.velocidade.y = 0

    }
}

class Plataforma {
    constructor({ x, y, image }) {
        this.posicao =
        {
            x: x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image
    }
    desenhar() {
        contexto.drawImage(this.image, this.posicao.x, this.posicao.y)
       
    }
}

const image = new Image()
image.src = ''
console.log(image)

const jogador = new Jogador()
const plataformas =
    [
        new Plataforma({
            x: 200,
            y: 100,
            image
        }),
        new Plataforma({
            x: 500,
            y: 200
        })
    ]

const tecla = {
    direita: {
        pressionado: false
    },
    esquerda: {
        pressionado: false
    }
}

let deslocamentoRolagem = 0

function animar() {
    requestAnimationFrame(animar)
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    jogador.atualizar();
    plataformas.forEach((plataforma) => {
        plataforma.desenhar()
    })


    if (tecla.direita.pressionado && jogador.posicao.x < 400) {
        jogador.velocidade.x = 5
    }
    else if (tecla.esquerda.pressionado && jogador.posicao.x > 100) {
        jogador.velocidade.x = -5
    }
    else {
        jogador.velocidade.x = 0

        if (tecla.direita.pressionado) {
            deslocamentoRolagem += 5
            plataformas.forEach((plataforma) => {

                plataforma.posicao.x -= 5
            })
        }
        else if (tecla.esquerda.pressionado) {
            deslocamentoRolagem -= 5
            plataformas.forEach((plataforma) => {

                plataforma.posicao.x += 5
            })
        }
    }

    //detectação da colisão da plataforma
    plataformas.forEach((plataforma) => {
        if (
            jogador.posicao.y + jogador.height <= plataforma.posicao.y
            && jogador.posicao.y + jogador.height + jogador.velocidade.y >= plataforma.posicao.y
            && jogador.posicao.x + jogador.width >= plataforma.posicao.x
            && jogador.posicao.x <= plataforma.posicao.x + plataforma.width
        ) {
            jogador.velocidade.y = 0
        }
    })
    if (deslocamentoRolagem > 2000) {
        console.log("você ganhou")
    }
}


animar()

window.addEventListener('keydown', ({ key }) => {
    console.log(key)
    switch (key) {
        case 'w':
            jogador.velocidade.y -= 5
            break
        case 's':
            break
        case 'a':
            tecla.esquerda.pressionado = true
            break
        case 'd':
            tecla.direita.pressionado = true
            break
    }
})

window.addEventListener('keyup', ({ key }) => {
    console.log(key)
    switch (key) {
        case 'w':
            jogador.velocidade.y = 0
            break
        case 's':
            break
        case 'a':
            tecla.esquerda.pressionado = false
            break
        case 'd':
            tecla.direita.pressionado = false
            break
    }
})