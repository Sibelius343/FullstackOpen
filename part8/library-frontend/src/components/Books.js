import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

const Books = ({ show, ALL_BOOKS, showGenreButtons, heading, subHeading, user }) => {
  const [genres, setGenres] = useState([])
  const [currentGenre, setCurrentGenre] = useState(null)
  const recommended = user ? user.favoriteGenre : null
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(!currentGenre) {
      setCurrentGenre(recommended)
      if (!recommended) {
        getBooks()
      } else {
        getBooks({ variables: { genre: recommended } })
      }
    }

    if (!user && result.data) {
      setGenres(result.data.allBooks.reduce((allGenres, currentBook) => {
        const newGenres = currentBook.genres.filter(g => !allGenres.includes(g))
        return [...allGenres, ...newGenres]
      }, [...genres]))
    }
  }, [result.data]) // eslint-disable-line

  if (!show || !result.data) {
    return null
  }

  const genreChange = (genre) => {
    setCurrentGenre(genre)
    getBooks({ variables: { genre: genre } })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <div>
        {subHeading} {currentGenre ? <b>{currentGenre}</b> : <b>all</b> }
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <span display={showGenreButtons}>
        {genres.map(g => <button key={g} onClick={() => genreChange(g)}>{g}</button>)}
        <button onClick={() => getBooks()}>all genres</button>
      </span>
    </div>
  )
}

export default Books