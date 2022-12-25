import { useEffect, useState } from "react";
import './Game.css';
import Dice from "./Dice";

const Game = (props) => {
  const [diceElements, setDiceElements] = useState([]);
  const [rolls, setRolls] = useState(0);
  const [win, setWin] = useState(false);

  const gameData = (number) => {
    const data = [];

    for (let i=1; i<number+1; i++) {
      const randomNumber = generateRandomNumber(1, 6);
      data.push({
        id: i,
        value: randomNumber,
        frozen: false,
      });
    }
    
    setDiceElements(data);
  }

  const dice = diceElements.map((val) => {
    return <Dice key={val.id} {...val} toggle={() => toggle(val.id)} />
  });

  const toggle = (id) => {
    setDiceElements(prevDiceElements => {
      return prevDiceElements.map(diceElement => {
        return diceElement.id === id ? {...diceElement, frozen: !diceElement.frozen} : {...diceElement}
      })
    })  
  }

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const rollDice = () => {
    setDiceElements(prevDiceElements => {
      return prevDiceElements.map((diceElement) => {
        return diceElement.frozen ? {...diceElement} : {...diceElement, value: generateRandomNumber(1, 6)} 
      })
    });
    setRolls(prevRolls => prevRolls + 1);
  }

  const isWin = () => {
    let valueArray = [];
    let score = 0;
    let sumValue = 0;

    diceElements.map((diceElement) => {
      valueArray.push(diceElement.value);
      sumValue += diceElement.value;
    });

    const winningNumber = parseInt(sumValue / diceElements.length);

    for (let i=0; i<valueArray.length; i++) {
      if (valueArray[i] === winningNumber) {
        score += 1;
      }
    }

    if (score === diceElements.length) {
      setWin(true);
    }
  }

  useEffect(() => {
    gameData(props.number);
  },  []);

  return (
    <div className="game">
      {win ? 
        <div className="win">
          <span>You won the game with {rolls} rolls!</span>
          <button onClick={() => window.location.reload()}>
            <span>Play Again</span>
          </button>
        </div>
        :
        <>
        <div className="dices">
          {dice}
        </div>
        <div className="buttons">
          <button onClick={rollDice}>
            <span>Roll</span>
          </button>
          <button onClick={isWin}>
            <span>Finish</span>
          </button>
        </div>
        </>
      }
    </div>
  );
}

export default Game;