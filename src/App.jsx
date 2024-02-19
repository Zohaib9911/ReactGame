import React from 'react';
import './App.css'
import Die from './Die'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dies, setDies] = React.useState(allNewDies())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dies.every(newdie => newdie.isHeld)
    const firstValu = dies[0].value
    const allSame = dies.every(newdie => newdie.value === firstValu)
    if (allHeld && allSame) {
      setTenzies(true)
    }
  }, [dies])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDies() {
    const newDies = [];
    for (let i = 0; i < 10; i++) {
      newDies.push(generateNewDie())
    }
    return newDies
  }


  function handleRoll() {
    if (!tenzies) {

      setDies(oldDies => oldDies.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDies(allNewDies())
    }
  }

  function holdDies(id) {
    setDies(oldvalue => oldvalue.map(die => (
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    )))
  }

  const diesElements = dies.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDies={() => holdDies(die.id)}
    />))

  return (
    <>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diesElements}
        </div>
        <button
          className="roll-dice"
          onClick={handleRoll}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  )
}

export default App
