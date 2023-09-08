import React, { useEffect } from "react";
import "./cell.css";

export default function Cell(props) {
  const style = props.value === "X" ? "x" : props.value === "O" ? "o" : "";

  return (
    <button
      className="box"
      onClick={() => {
        props.onUpdatePosition(props.row, props.column);
      }}
    >
      <div className={style}>{props.value}</div>
    </button>
  );
}
