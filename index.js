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
    let board = [['','',''],
                ['','',''],
                ['','','']];
    const render = () =>{
       
       for (let i = 0; i < board.length; i++){
           for (let j = 0; j < board[0].length; j++){
            const div = document.createElement('div')
            div.setAttribute('class','cell')
            div.setAttribute('data-row',i)
            div.setAttribute('data-col', j)
            div.innerText = board[i][j]
            boardContain.appendChild(div)
           }
       }
       
       
    }
    const placeSymbol = () =>{
       boardContain.addEventListener('click', (event)=>{
           console.log('click')
           if (event.target.getAttribute("class") === 'cell' && event.target.innerText === ''){
                //figure out whos turn it is function 
                let marker = flow.determineTurn()
                event.target.innerText = marker
                gameboard.board[event.target.getAttribute('data-row')][event.target.getAttribute('data-col')] = marker
                console.log(flow.move)
                //check for win function goes here? 
                flow.checkForWin(gameboard.board)
                flow.nextTurn()
            }
       })
    }
    return {board, render, placeSymbol}
})()






//module for tracking flow of the game 
const flow = (() => {
   
    
    //initialize players. Not sure if it should go in here. 
        let move = 0;
        let gameOver = false
        const player1 = player('1', '❌');
        const player2 = player('2','🅾️');
    
    const nextTurn = () => {
        if (move <8){
            move++;
            console.log('next turn, move: '+ move)
        }else{
            alert('game over- tie!')
        }
        
        
    }
    const startGame = () =>{
        gameboard.render()
        if (!gameOver){
            determineTurn()
            gameboard.placeSymbol()
        }
    }
    const determineTurn = () =>{
        
        let symbol = ''
        if (move % 2 === 0){
            symbol = player1.getSymbol() 

        }else{
             symbol = player2.getSymbol() 
        }
        return symbol
        
      
    }
    const checkForWin = (moves) =>{
        console.log(moves)
    }

    
    return {move, nextTurn ,determineTurn, startGame, checkForWin}
})()

flow.startGame()


// winning logic 
