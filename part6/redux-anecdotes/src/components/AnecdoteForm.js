import React from "react"
import { connect  } from "react-redux"
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnec(content)
    props.setNotification(`you submitted '${content}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
      </form>
    </>
  )  
}

const mapDispatchToProps = {
  createAnec, setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
