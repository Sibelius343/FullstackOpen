import React from 'react'

const CommentForm = ({ handleSubmit, comment, setComment }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id='comment'
          type='text'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button id='commentButton' type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm