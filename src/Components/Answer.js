import React, { useEffect } from "react";
import Letter from "./Letter";
import "./Answer.css";
import PropTypes from "prop-types";

Answer.propTypes = {
  word: PropTypes.string,
  wordOfTheDay: PropTypes.string,
  check: PropTypes.func,
};

function Answer({ word, wordOfTheDay, check }) {
  let objWord = {};
  let objWordOfTheDay = {};
  const arrayWord = word.split("");
  const arrayWordOfTheDay = wordOfTheDay.split("");
  let correctLetters = 0;
  arrayWordOfTheDay.forEach((elem) => {
    if (objWordOfTheDay[elem]) {
      objWordOfTheDay[elem]++;
    } else {
      objWordOfTheDay[elem] = 1;
    }
  });
  arrayWord.forEach((elem, idx) => {
    if (objWordOfTheDay[elem]) {
      if (elem === arrayWordOfTheDay[idx]) {
        objWord[elem] = "correct";
        correctLetters++;
      } else {
        objWord[elem] = "misplaced";
      }
    } else {
      objWord[elem] = "incorrect";
    }
  });

  useEffect(() => {
    if (correctLetters === 5) {
      check(true);
    }
  }, [correctLetters]);

  return (
    <div className="Answer">
      {arrayWord.map((elem, idx) => {
        if (objWord[elem] === "correct") {
          return <Letter letter={elem} key={idx} position={"correct"}></Letter>;
        } else if (objWord[elem] === "misplaced") {
          return (
            <Letter letter={elem} key={idx} position={"misplaced"}></Letter>
          );
        } else {
          return (
            <Letter letter={elem} key={idx} position={"incorrect"}></Letter>
          );
        }
      })}
    </div>
  );
}

export default Answer;
