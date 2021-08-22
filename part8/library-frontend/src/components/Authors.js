import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'


const Authors = ({ show, ALL_AUTHORS, UPDATE_AUTHOR, token }) => {
  const [authors, setAuthors] = useState([])
  const [authorName, setAuthorName] = useState(null)
  const [year, setYear] = useState('')
  const result = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log(error)
    }
  })
  const [authorResult] = useMutation(UPDATE_AUTHOR, {refetchQueries: [{ query: ALL_AUTHORS }]})
  const options = authors.map(a => {return { value: a.name, label: a.name }})

  useEffect(() => {
    if (result.data) {
      console.log('result:', result);
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!show) {
    return null
  }

  const changeBirthyear = (e) => {
    e.preventDefault()
    console.log(authorName)

    authorResult({ variables: { name: authorName.value, setBornTo: Number(year) }})
    setYear('')
    setAuthorName('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token && <h2>Set birthyear</h2>}
      {token && <form onSubmit={changeBirthyear}>
        <div>
          name
          <Select
            defaultValue={authorName}
            options={options}
            onChange={setAuthorName}
          />
        </div>
        <div>
          born
          <br />
          <input
            value={year}
            type='number'
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>}
    </div>
  )
}

export default Authors
