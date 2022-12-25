import './Dice.css';

const Dice = (props) => {
  const {id, value, frozen, toggle} = props;
  
  const styles = {
    backgroundColor: frozen && '#A6ACAF',
    border: frozen && 'none',
    color: frozen && 'white',
  }

  return (
    <div onClick={toggle} className="dice" style={styles}>
      {value}
    </div>
  );
}

export default Dice;