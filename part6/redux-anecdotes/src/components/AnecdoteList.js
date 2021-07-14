import React from 'react'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = (props) => {
  const filter = useSelector(({ filter }) => filter).toLowerCase()

  const anecdotes = useSelector(({ anecdotes }) => {
    console.log(anecdotes)
    const filteredAnec = anecdotes.filter(anec => {
      let text = anec.content.toLowerCase()
      return text.includes(filter)
    })
    return filteredAnec.sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteOn(votedAnecdote))
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList