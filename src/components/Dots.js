import { useEffect, useState } from "react";

const Dots = (props) => {
  const { number } = props;
  const dots = [];
  let count = 0;

  const addToArray = (number) => {
    if (count === 0) {
      for (let i=0; i<number; i++) {
        dots.push(i);
      }
    }
    count++
  }

  useEffect(() => {
    addToArray(number);{dots.map((dot) => {
      return console.log(dot)
    })}
  }, []);

  
  return (
    <div className="dots">
      
    </div>
  );
}

export default Dots;