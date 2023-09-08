import React from "react";
import "./main-board.css";
import MiniBoard from "../mini-board/mini-board.component";

export default function MainBoard(props) {
  const style = props.gameStarted ? "show" : "hide";

  let activeBoardStyle;
  let boardDone;
  let symbolBoardClosed;

  return (
    <div className={style}>
      {props.miniBoards.map((row, rowIndex) => {
        {
          activeBoardStyle =
            rowIndex !== props.activeBoard
              ? " notActive"
              : props.controlPlayerName === "Computer"
              ? " notClicable"
              : "";
          boardDone = 
            (props.winnersBoard[rowIndex] === "X")
              ? " doneX"
              : (props.winnersBoard[rowIndex] === "O")
              ? " doneO"
              : (props.winnersBoard[rowIndex] === "full")
              ? " full"
              : " none";
        }
        return (
          <MiniBoard
            boardDone={boardDone}
            player={props.player}
            onNextChangeBoard={props.onNextChangeBoard}
            style={activeBoardStyle}
            key={`L:${rowIndex}`}
            rowIndex={rowIndex}
            miniBoard={row}
            onUpdatePosition={props.onUpdatePosition}
          />
        );
      })}
    </div>
  );
}
