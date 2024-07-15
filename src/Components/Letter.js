import React from "react";
import "./Letter.css";

function Letter({ letter, position }) {
  const letterStyle =
    position === "correct"
      ? { backgroundColor: "#538D4E" }
      : position === "misplaced"
      ? { backgroundColor: "#B59F3B" }
      : { backgroundColor: "transparent" };
  return (
    <div className="allStyles" style={letterStyle}>
      {letter.toUpperCase()}
    </div>
  );
}

export default Letter;
