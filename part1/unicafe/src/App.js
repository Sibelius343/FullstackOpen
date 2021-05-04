import React, { useState } from 'react'

const Button = ({handler, text}) => (
  <>
    <button onClick={handler}>{text}</button>
  </>
)

const Stat = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = ((good / all) * 100) + ' %'

  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <table>
      <tbody>
        <Stat text='good' value={good}></Stat>
        <Stat text='neutral' value={neutral}></Stat>
        <Stat text='bad' value={bad}></Stat>
        <Stat text='all' value={all}></Stat>
        <Stat text='average' value={avg}></Stat>
        <Stat text='positive' value={pos}></Stat>
        </tbody>
    </table>
  )  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={clickGood} text='good'></Button>
      <Button handler={clickNeutral} text='neutral'></Button>
      <Button handler={clickBad} text='bad'></Button>
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad}></Stats>
    </div>
  )
}

export default App