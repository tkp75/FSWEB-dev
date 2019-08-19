import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick} >{text}</button>

const Statistic = ({text, value, children})  => <tr><td>{text}</td><td>{value}{children}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={all !== 0 ? (good - bad) / all : 0} />
        <Statistic text='positive' value={all !== 0 ? 100 * good / all : 0} > %</Statistic>
      </tbody>
    </table>
  );
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
