import React, { useState } from "react";
import "./control-panel.css";
import { isStringEmptyOrOnlySpaces } from "../../helpers";

export default function ControlPanel({
  xTimer,
  oTimer,
  points,
  playerNameX,
  playerNameO,
  gameStarted,
  gameMode,
  onGameStarted,
  onOptionChange,
}) {
  const handleClick = (event) => {
    event.preventDefault();
    const inputTag1 = valor;
    const inputTag2 = valor1;
    if (gameMode === "1") {
      (isStringEmptyOrOnlySpaces(inputTag1) ||
      isStringEmptyOrOnlySpaces(inputTag2))
        ? alert("Fill the blank fields! -> (name the players)")
        : onGameStarted(inputTag1, inputTag2);
    } else if (gameMode === "2") {
      onGameStarted();
    }
  };

  const [valor, setValor] = useState("");
  const handleChange = (event) => {
    setValor(event.target.value);
  };

  const [valor1, setValor1] = useState("");
  const handleChange1 = (event) => {
    setValor1(event.target.value);
  };

  return (
    <div>
      <form>
        <div
          id="isGameStartedInfoPanel"
          className={!gameStarted ? "hide" : "show infoPanel"}
        >
          <div>
            <label className="xPlayer">{`[X] ${playerNameX}: ${points.xPlayerPoints}`}</label>
            <label className="xPlayer">TIMER: {xTimer}</label>
          </div>
          <div>
            <label
              className="oPlayer"
              style={{ marginLeft: "100px" }}
            >{`[O] ${playerNameO}: ${points.oPlayerPoints}`}</label>
            <label className="oPlayer" style={{ marginLeft: "100px" }}>
              TIMER: {oTimer}
            </label>
          </div>
        </div>
        <div className={gameStarted ? "hide" : "gameModeStyle"}>
          <fieldset>
            <label>Game Mode:</label>
            <select
              defaultValue={0}
              onChange={onOptionChange}
              disabled={gameStarted}
            >
              <option value="0">Choose...</option>
              <option value="1">1 VS 1</option>
              <option value="2">1 VS Computer</option>
            </select>
          </fieldset>
          <div className={gameMode === "1" ? "showOptions" : "hideOptions"}>
            <div className="data1vs1">
              <div className="gameModeStyle">
                <label>First Player:</label>
                <label>Second Player:</label>
              </div>
              <div className="gameModeStyle">
                <input
                  type="text"
                  className="inputMargin"
                  maxLength={30}
                  value={valor}
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  maxLength={30}
                  value={valor1}
                  onChange={handleChange1}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" disabled={gameMode === "0"} onClick={handleClick}>
          {!gameStarted ? "Start Game" : "End Game"}
        </button>
      </form>
    </div>
  );
}
