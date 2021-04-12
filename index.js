console.log("script connected");

// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

//     Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

//factory function for players
const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

//Gameboard object using module
const gameboard = (() => {
  //access board through dom
  const boardContain = document.querySelector("#container");
  // initialize empty board
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const render = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        const div = document.createElement("div");
        div.setAttribute("class", "cell");
        div.setAttribute("data-row", i);
        div.setAttribute("data-col", j);
        div.innerText = board[i][j];
        boardContain.appendChild(div);
      }
    }
    flow.createDisplay()
  };
  const placeSymbol = () => {
    boardContain.addEventListener("click", (event) => {
      console.log("click");
      //only allow the user to click empty options
      if (
        event.target.getAttribute("class") === "cell" &&
        event.target.innerText === ""
      ) {
        //figure out whos turn it is function
        let marker = flow.determineTurn();
        //display players move
        event.target.innerText = marker;
        //update array with players move
        gameboard.board[event.target.getAttribute("data-row")][
          event.target.getAttribute("data-col")
        ] = marker;
        console.log(flow.move);
        //check for for win
        console.log(flow.checkForWin(gameboard.board));
        if (flow.checkForWin(gameboard.board) === true) {
          flow.winTime();
        }else{
          flow.nextTurn();
        }
        //next turn of the game
        
      }
    });
  };
  return { board, render, placeSymbol, boardContain };
})();

//module for tracking flow of the game
const flow = (() => {
  //initialize players. Not sure if it should go in here.
  let move = 0;
  let gameOver = false;
  //TODO: get player names
  p1name = prompt("Enter player 1's name: ");
  p2name = prompt("Enter player 2's name: ");
  const player1 = player(p1name, "x");
  const player2 = player(p2name, "o");

  const createDisplay = () =>{
    const display = document.querySelector("#display");
    const h3 = document.createElement("h3");
    display.appendChild(h3);
  }

  const nextTurn = () => {
    if (move < 8) {
      move++;
      console.log("next turn, move: " + move);
    } else {
      const h3 = document.querySelector("h3");
      h3.innerText = "Tie game!"
      alert("game over- tie!");
    }
  };
  const startGame = () => {
    gameboard.render();
    if (!gameOver) {
      determineTurn();
      gameboard.placeSymbol();
    }
    return { player1, player2 };
  };
  const determineTurn = () => {
    let symbol = "";
    
     if (move % 2 === 0) {
      symbol = player1.getSymbol();
     
    } else {
      symbol = player2.getSymbol();
      
    }
    //the following is repetitive with the code in determine winner but I'cant workout how to make it less redundunt.
   
  
   
    return symbol;
  };
  const checkForWin = (moves) => {
    console.log(moves);
    //check for row win
    for (let i = 0; i < moves.length; i++) {
      let j = 0;

      if (
        moves[i][j] != "" &&
        moves[i][j] == moves[i][j + 1] &&
        moves[i][j + 1] == moves[i][j + 2]
      ) {
        return true;
      }
    }
    //check for col win
    for (let j = 0; j < moves[0].length; j++) {
      let i = 0;
      if (
        moves[i][j] != "" &&
        moves[i][j] == moves[i + 1][j] &&
        moves[i + 1][j] == moves[i + 2][j]
      ) {
        return true;
      }
    }
    //check diagonals for win
    if (
      moves[0][0] != "" &&
      moves[0][0] == moves[1][1] &&
      moves[1][1] == moves[2][2]
    ) {
      return true;
    }
    if (
      moves[0][2] != "" &&
      moves[0][2] == moves[1][1] &&
      moves[1][1] == moves[2][0]
    ) {
      return true;
    }

    //no winning condition met
    return false;
  };
  // function that does something when someone wins
  const winTime = () => {
    let winner = "";
    if (move % 2 == 0) {
      winner = player1.getName();
    } else {
      winner = player2.getName();
    }
    const h3 = document.querySelector("h3");
    h3.innerHTML = "Winner: " + winner + "!";
  
  };

  return {
    move,
    nextTurn,
    determineTurn,
    startGame,
    checkForWin,
    winTime,
    createDisplay,
  };
})();

flow.startGame();
