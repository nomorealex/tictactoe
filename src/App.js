import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import {
  Header,
  Footer,
  ControlPanel,
  LoadingPane,
  MainBoard,
  Modal,
} from "./components";

// Modal window with the winner, validate the main board or if all then mini
// boards are full, the winner is the one with more miniboards
// time for each move (each player).
// get the names of the players
// quick css fix
// reset to the game

import {
  chooseRandomPosition,
  choosePlayerToStart,
  setupMapSymbolToPlayer,
  checkWinner,
} from "./helpers/index";

import { TIMEOUTGAME } from "./constants";

let nextBoard = undefined;
let timerId = undefined;
let handlePlayerTime = undefined;
let handleFaultTimePlayer = undefined;
let firstPlayer = undefined;
let secondPlayer = undefined;
let playerWinner = undefined;
const mappingPlayers = new Map();

function verifyElement(element, winnerBoard) {
  if (
    winnerBoard[element] !== "X" &&
    winnerBoard[element] !== "O" &&
    winnerBoard[element] !== "full"
  )
    return true;
  return false;
}

//Verify if the main board is full
function winnerBoardIsFull(board) {
  for (let element of board) {
    if (element !== "X" && element !== "O" && element !== "full") return false;
  }
  return true;
}

function App() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [gameMode, setGameMode] = useState("0");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameArray, setgameArray] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(" "))
  );
  const [winnerBoard, setWinnerBoard] = useState(Array(9).fill(undefined));
  const [player, setPlayer] = useState(undefined);
  const [activeBoard, setActiveBoard] = useState(undefined);
  const [points, setPoints] = useState({ xPlayerPoints: 0, oPlayerPoints: 0 });
  const [showModal, setShowModal] = useState(false);
  const [xTimer, setXTimer] = useState(TIMEOUTGAME);
  const [oTimer, setOTimer] = useState(TIMEOUTGAME);


  useEffect(() => {
    if (handleFaultTimePlayer !== undefined) {
      openModal();
      setActiveBoard(-1);
      return;
    }
    switch (checkWinner(winnerBoard)) {
      case "X":
        playerWinner = "X";
        clearInterval(timerId);
        openModal();
        setActiveBoard(-1);
        return;
      case "O":
        playerWinner = "O";
        clearInterval(timerId);
        openModal();
        setActiveBoard(-1);
        return;
      case "full":
        playerWinner = "full";
        clearInterval(timerId);
        openModal();
        setActiveBoard(-1);
        return;
      default:
        break;
    }    
    if (gameStarted && !winnerBoardIsFull(winnerBoard)) {
      onChangingBoard();
    } else {
      setActiveBoard(-1);
    } 
  }, [winnerBoard]);

  useEffect(() => {
    handlePlayerTime = player;
    setTimeout(() => {
      if (
        gameStarted &&
        gameMode === "2" &&
        mappingPlayers.get(player) === "Computer"
      ) {
        let newRandomPosition = generateRandomPosition();
        const newArray = [...gameArray];
        while (newArray[activeBoard][newRandomPosition] !== " ") {
          newRandomPosition = generateRandomPosition();
        }
        newArray[activeBoard][newRandomPosition] = player;
        setgameArray(newArray);
        onNextChangeBoard(newRandomPosition);
      }
    }, "1000");
  }, [player]);



  useEffect(() => {
    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        if (handlePlayerTime === "X") {
          setXTimer((previousState) => {
            nextTimer = previousState - 1;
            return nextTimer;
          });

          if (nextTimer - 1 === 0) {
            handleFaultTimePlayer = "X";
            const auxArray = [...winnerBoard];
            setWinnerBoard(auxArray);
            clearInterval(timerId);
          }
        } else if (handlePlayerTime === "O") {
          setOTimer((previousState) => {
            nextTimer = previousState - 1;
            return nextTimer;
          });

          if (nextTimer - 1 === 0) {
            handleFaultTimePlayer = "O";
            const auxArray = [...winnerBoard];
            setWinnerBoard(auxArray);
            clearInterval(timerId);
          }
        }
      }, 1000);
    } else if (xTimer !== TIMEOUTGAME || oTimer !== TIMEOUTGAME) {
      setXTimer(TIMEOUTGAME);
      setOTimer(TIMEOUTGAME);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && gameMode !== "0") {
      initGame();
    } else if (!gameStarted) {
      reset();
    }
  }, [gameStarted]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //Stop the loading screen
  const handleLoadingVisible = () => {
    if (loadingVisible === true) setLoadingVisible(false);
  };

  //Generate a random number between 0 and 8
  const generateRandomPosition = () => {
    return chooseRandomPosition();
  };

  //Change the player
  const changePlayer = () => (player === "X" ? setPlayer("O") : setPlayer("X"));

  //Function that change the state variable of game mode, based on the dropdown provided
  const handleOptionChange = (event) => {
    const { value } = event.currentTarget;
    setGameMode(value);
  };

  const initGame = () => {
    const number = generateRandomPosition();
    setActiveBoard(number);
    if (gameMode === "1")
      setupMapSymbolToPlayer(mappingPlayers, firstPlayer, secondPlayer);
    else if (gameMode === "2")
      setupMapSymbolToPlayer(mappingPlayers, "Computer", "Player");
    setPlayer(choosePlayerToStart());
  }

  const reset = () => {
    setActiveBoard(-1);
    mappingPlayers.clear();
    setgameArray(
      Array.from({ length: 9 }, () => Array(9).fill(" "))
    );
    setWinnerBoard(Array(9).fill(undefined));
    const newPoints = { xPlayerPoints: 0, oPlayerPoints: 0 };
    setPoints(newPoints);
    nextBoard = undefined;
    timerId = undefined;
    handlePlayerTime = undefined;
    handleFaultTimePlayer = undefined;
    playerWinner = undefined;
    firstPlayer = undefined;
    secondPlayer = undefined;
    setPlayer(undefined);
  }


  const handlePlayersPoints = (target) => {
    const newPoints = points;
    switch (target) {
      case "X":
        newPoints.xPlayerPoints++;
        setPoints(newPoints);
        break;
      case "O":
        newPoints.oPlayerPoints++;
        setPoints(newPoints);
        break;
      default:
        break;
    }
  };

  const handleGameStart = (name1 = undefined, name2 = undefined) => {
    firstPlayer = name1;
    secondPlayer = name2;
    if (!gameStarted && gameMode !== "0") {
      setGameStarted(true);
    } else {
      setGameStarted(false);
    }
  };

  const onNextChangeBoard = (number) => {
    nextBoard = number;
    let auxArray;
    switch (checkWinner(gameArray[activeBoard])) {
      case "X":
        auxArray = [...winnerBoard];
        auxArray[activeBoard] = "X";
        handlePlayersPoints("X");
        break;
      case "O":
        auxArray = [...winnerBoard];
        auxArray[activeBoard] = "O";
        handlePlayersPoints("O");
        break;
      case "full":
        auxArray = [...winnerBoard];
        auxArray[activeBoard] = "full";
        break;
      default:
        auxArray = [...winnerBoard];
        break;
    }
    setWinnerBoard(auxArray);

  };

  const onChangingBoard = () => {
    let candidate = nextBoard;
    while (verifyElement(candidate, winnerBoard) !== true) {
      candidate = generateRandomPosition();
    }

    setActiveBoard(candidate);
    changePlayer();
  };

  const handleUpdatePosition = (row, column) => {
    const newArray = [...gameArray];
    if (newArray[row][column] === " ") {
      newArray[row][column] = player;
      setgameArray(newArray);
      onNextChangeBoard(column);
    }
  };

  const gameStartedStyle = gameStarted ? "" : "hide";
  const playerStyle = player === "X" ? "playerX" : "playerO";
  const playerName = mappingPlayers.get(player);

  return (
    <>
      <div id="controlPanelContainer">
        <LoadingPane
          loadingVisible={loadingVisible}
          onLoading={handleLoadingVisible}
        />
        <Header />
        {showModal && (
          <Modal
            xTimer={xTimer}
            oTimer={oTimer}
            playerWinner={playerWinner}
            mappingPlayers={mappingPlayers}
            handleFaultTimePlayer={handleFaultTimePlayer}
            points={points}
            playerNameX={mappingPlayers.get("X")}
            playerNameO={mappingPlayers.get("O")}
            closeModal={closeModal}
          />
        )}
        <ControlPanel
          xTimer={xTimer}
          oTimer={oTimer}
          points={points}
          playerNameX={mappingPlayers.get("X")}
          playerNameO={mappingPlayers.get("O")}
          gameStarted={gameStarted}
          gameMode={gameMode}
          onGameStarted={handleGameStart}
          onOptionChange={handleOptionChange}
        />
        <Footer />
      </div>
      <div id="container" className={gameStartedStyle}>
        <div className={`infoContainer ${gameStartedStyle} ${playerStyle}`}>
          <h1>
            {mappingPlayers.get(player)} <br />
            it's your move
          </h1>
        </div>
        <div id="gameContainer" className={gameStartedStyle}>
          <MainBoard
            winnersBoard={winnerBoard}
            controlPlayerName={playerName}
            gameMode={gameMode}
            player={player}
            activeBoard={activeBoard}
            onNextChangeBoard={onNextChangeBoard}
            gameStarted={gameStarted}
            miniBoards={gameArray}
            onUpdatePosition={handleUpdatePosition}
          />
        </div>
        <div className={`infoContainer ${gameStartedStyle} ${playerStyle}`}>
          <h1>
            {mappingPlayers.get(player)} <br />
            it's your move
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;