import React, { useEffect } from "react";
import "./mini-board.css";
import Cell from "../cell/cell.component";

export default function MiniBoard(props) {
  //add style here

  const playerStyle = props.player == "X" ? " playerX" : " playerO";

  const symbolClosed = props.boardDone === " doneX" ? "X" : props.boardDone === " doneO" ? "O" : props.boardDone === " full" ? "--" : "";
  return (
    <div className={`miniBoard${props.style}${playerStyle}`}>
      <div className={props.boardDone}>{symbolClosed}</div>
      {props.miniBoard.map((row, ColumnIndex) => {
        return (
          <Cell
            gameMode={props.gameMode}
            onNextChangeBoard={props.onNextChangeBoard}
            key={`C:${ColumnIndex}`}
            value={row}
            onUpdatePosition={props.onUpdatePosition}
            row={props.rowIndex}
            column={ColumnIndex}
          />
        );
        
      })}
      
    </div>
  );
}
