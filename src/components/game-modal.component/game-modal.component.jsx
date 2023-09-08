import React from "react";
import "./game-modal.css";

const Modal = ({
  xTimer,
  oTimer,
  playerWinner,
  mappingPlayers,
  handleFaultTimePlayer,
  points,
  playerNameX,
  playerNameO,
  closeModal,
}) => {
  let firstPlace = undefined;
  const xPlayerPoints = points.xPlayerPoints;
  const oPlayerPoints = points.oPlayerPoints;
  let hideInfo = undefined;

  if (handleFaultTimePlayer === undefined) {
    switch (playerWinner) {
      case "X":
        firstPlace = playerNameX;
        break;
      case "O":
        firstPlace = playerNameO;
        break;
      case "full":
        if (xPlayerPoints === oPlayerPoints) {
          xTimer > oTimer
            ? firstPlace = playerNameX
            : oTimer > xTimer
            ? firstPlace = playerNameO
            : firstPlace = "It's a TIE";
        } else if (xPlayerPoints > oPlayerPoints) {
          firstPlace = playerNameX;
        } else {
          firstPlace = playerNameO;
        }
        break;
      default:
        break;
    }
    hideInfo = "modalContent";
  } else {
    handleFaultTimePlayer === "X"
      ? (firstPlace = mappingPlayers.get("O"))
      : (firstPlace = mappingPlayers.get("X"));
    hideInfo = "hide";
  }

  return (
    <>
      <div className="darkBG" />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Winner: {firstPlace}</h5>
          </div>
          <div className={hideInfo}>
            X: {playerNameX} - {xPlayerPoints} points
          </div>
          <div className={hideInfo}>
            O: {playerNameO} - {oPlayerPoints} points
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="startAgainBtn"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
