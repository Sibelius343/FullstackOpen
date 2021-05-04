import React, { useState } from 'react'

const Button = ({handler, text}) => (
  <>
    <button onClick={handler}>{text}</button>
  </>
)

const MostVotes = ({anecdotes, points}) => {
  var highest = 0
  for (let i = 0; i < anecdotes.length; i++) {
    if (points[i] > points[highest]) {
      highest = i
    }
  }

  return (
    <>
      {anecdotes[highest]}
      <br></br>
      has {points[highest]} votes
    </>  
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  // const points = new Array(anecdotes.length).fill(0)
  // console.log(points)
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const clickHandler = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)

    console.log(rand)

    setSelected(rand)
  }

  const voteHandler = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <Button handler={voteHandler} text='vote'></Button>
      <Button handler={clickHandler} text='next anecdote'></Button>
      <br></br>
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={anecdotes} points={points}></MostVotes>
    </div>
  )
}

export default App