//dark mode
//interruptor no HTML
//estilização do dark mode no CSS através do root e da classe dark
//aqui é como se fosse o sistema elétrico que faz o interruptor funcionar.
const darkToggle = document.querySelector('#darkModeButton') //seleciona o botão HTML
darkToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark') //adicionar/remove a classe dark do body
    darkToggle.classList.toggle('darkBtn') //o mesmo acontece com o botão, para mudar a imagem do botão
})
//--------------------------------------------------------------------------------------//
/*
Estado do jogo
    O jogo deve começar sozinho.
    O jogador inicial é X. 
    Cada jogada alterna o jogador.
    Uma casa por vez.
    O jogo termina com vitória ou empate.
*/

const gameInfo = document.querySelector('.gameInfo') //Seleciona o HTML onde as informações
// do jogo serão exibidas

const state = {
    currentPlayer: 'X',
    board: Array(9).fill(null),
    gameOver: false
}

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],//linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8],//colunas
    [0, 4, 8], [2, 4, 6]]//diagonais 

const cells = document.querySelectorAll('.casa')

function checkWin(board) { //Verifica se houve vitória ou empate
    for (const condition of winConditions) {
        const [a, b, c] = condition
        if (board[a]
            && board[a] === board[b]
            && board[a] === board[c]) {
            return board[a] // 'X' ou 'O'}
        }
    }
    if (board.every(cell => cell !== null)) {
        return 'Empate' //retorna empate se as casas estão preenchidas mas sem winner
    }
    return null //retorna null se o jogo ainda não acabou 

}

function makeMove(index) { //Função para aplicar a jogada
    //validações --> 
    if (state.gameOver) return //Impede jogada após o jogo terminar
    if (state.board[index] !== null) return //Impede jogada em casa ja jogadas
    //aplica a jogada no estado do jogo --> 
    state.board[index] = state.currentPlayer
    //Ele está corrigindo possíveis problemas ao selecionar a casa
    //makeMove está aplicando a jogada no estado do jogo, não insira o
    //sistema de alternar jogador, porque ele pode causar problemas na hora de atualizar o
    //indicador de jogador, já que o makeMove é responsável apenas por aplicar a jogada.
}

function render() { //traduz em tela o que está acontecendo
    cells.forEach((cell, index) => {
        const value = state.board[index]
        cell.textContent = value ?? '' //atualiza o conteúdo de casa com o valor correspondente ao jogador
        cell.classList.remove('x', 'o') //remove as classes de estilo anteriores
        if (value === 'X')
            cell.classList.add('x') //adiciona a classe de estilo para o X
        if (value === 'O') cell.classList.add('o') //adiciona a classe de estilo para o O
    }
    )
}

cells.forEach((cell, index) => { //adiciona um evento de clique a cada casa do tabuleiro
    cell.addEventListener('click', function () { //quando a casa for clicada...

        makeMove(index) //Aplica a jogada

        const winner = checkWin(state.board) //verifica se houve vitória
        if (winner === 'X' || winner === 'O') {
            state.gameOver = true
            state.winner = winner
            gameInfo.textContent = `Jogador ${winner} venceu!`
        }
        else if (winner === 'Empate') {
            state.gameOver = true
            state.winner = 'Empate'
            gameInfo.textContent = 'É um empate!'
        }
        else {
            state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X' //alterna o jogador
            gameInfo.textContent = `É a vez do jogador ${state.currentPlayer}` //atualiza o indicador
            //Os dois não podem estar dentro do makeMove porque eles bagunçam o indicar
            // de jogador, já que o makeMove só é responsável por aplicar a jogada,
            //e não por verificar o estado do jogo ou alternar o jogador
        }

        render() //Atualiza a interface do jogo
    })
})

const resetBtn = document.querySelector('#reset') //Seleciona o botão de reset
resetBtn.addEventListener('click', function (){
    state.currentPlayer = 'X'
    state.board = Array(9).fill(null)
    state.gameOver = false
    gameInfo.textContent = `É a vez do jogador ${state.currentPlayer}`
    render()
})
