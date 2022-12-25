import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Header from './components/Header';

const App = () => {
  const [start, setStart] = useState(false);
  const [number, setNumber] = useState(0);

  const [formData, setFormData] = useState({
    difficulty: "easy",
  });

  const changeDifficulty = (event) => {
    const {name, type, checked, value} = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value, 
      }
    });
  }

  const submitDifficulty = (event) => {
    event.preventDefault();
    
    if (formData.difficulty === "easy") {
      setNumber(4);
    } else if (formData.difficulty === "medium") {
      setNumber(8);
    } else {
      setNumber(12);
    }

    setStart(prevVal => !prevVal);
  }

  return (
    <div className="app">
      <Header />
      {start ? 
        <Game number={number} />
        :
        <form className="form" onSubmit={submitDifficulty}>
          <fieldset>
            <legend>Choose a difficulty</legend>
            <div>
              <input
                id="easy"
                name="difficulty"
                value="easy"
                checked={formData.difficulty === "easy"}
                onChange={changeDifficulty}
                type="radio"
              />
              <label htmlFor="easy">Easy</label>
            </div>
            <div>
              <input
                id="medium"
                name="difficulty"
                value="medium"
                checked={formData.difficulty === "medium"}
                onChange={changeDifficulty}
                type="radio"
              />
              <label htmlFor="medium">Medium</label>
            </div>
            <div>
              <input
                id="hard"
                name="difficulty"
                value="hard"
                checked={formData.difficulty === "hard"}
                onChange={changeDifficulty}
                type="radio"
              />
              <label htmlFor="hard">Hard</label>
            </div>
          </fieldset>
          <button>
            <span>Start Game</span>
          </button>
        </form>
      }
    </div>
  );
}

export default App;