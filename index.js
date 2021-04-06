console.log('script connected')


// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

//     Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.



//Gameboard object using module 
const gameboard = (() => {
    let board = ['x','x','o',
                'o','x','o',
                'o','o','x'];
    const render = () =>{
       const boardContain =  document.querySelector('#container')
       for (let i = 0; i < board.length; i++){
            const div = document.createElement('div')
            div.setAttribute('class','cell')
            div.setAttribute('data-index',i)
            div.innerText = board[i]
            boardContain.appendChild(div)
       }
       
    }
    return {board, render}
})()

gameboard.render()


//factory function for players 
const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol}
}


const ben = player('ben',"x")


//module for tracking flow of the game 
const flow = (() => {
    let move = 0;
    const nextTurn = () => ++move;
    return {move, nextTurn}
})()