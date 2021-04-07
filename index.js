console.log('script connected')


// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

//     Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.




//factory function for players 
const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol}
}


//Gameboard object using module 
const gameboard = (() => {
    //access board through dom 
    const boardContain =  document.querySelector('#container')
    // initialize empty board 
    let board = [' ','','',
                '','','',
                '',' ',' '];
    const render = () =>{
       
       for (let i = 0; i < board.length; i++){
            const div = document.createElement('div')
            div.setAttribute('class','cell')
            div.setAttribute('data-index',i)
            div.innerText = board[i]
            boardContain.appendChild(div)
       }
       
    }
    const getMove = (marker) =>{
        console.log(marker)
        boardContain.addEventListener('click', (event) => {
            if (event.target.getAttribute("class") === 'cell'){
                
                event.target.innerText = marker
                console.log(flow.move)
            }
            


        })
    }
    return {board, render, getMove}
})()






//module for tracking flow of the game 
const flow = (() => {
   
    let move = 0;
    let gameOver = false
    //initialize players. Not sure if it should go in here. 
    const player1 = player('1', '❌');
    const player2 = player('2','🅾️');
    const nextTurn = () => {
        move++;
        console.log('next turn, move: '+ move)
        
    }
    const play = () =>{
        gameboard.render()
        if (move % 2 === 0){
            gameboard.getMove(player1.getSymbol())

        }else{
            gameboard.getMove(player2.getSymbol())
        }
        nextTurn();
        
      
    }

    
    return {move, nextTurn ,play}
})()

flow.play()