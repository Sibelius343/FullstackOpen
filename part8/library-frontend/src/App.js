import React, { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { USER, ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS, UPDATE_AUTHOR, CREATE_BOOK, LOGIN } from './queries'

const showGenreButtons = Object.freeze({
  show: '',
  hide: 'none'
})

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const userResult = useQuery(USER)
  const [user, setUser] = useState(null)

  const updateCacheWith = (addedBook) => {
    const includedIn = (cache, object) => 
      cache.map(b => b.id).includes(object.id)

    const includedDataStores = addedBook.genres.reduce((allStores, currentGenre) => {
      const genreQuery = client.readQuery({ query: ALL_BOOKS, variables: { genre: currentGenre }})
      if (genreQuery) {
        return [...allStores, genreQuery]
      }
      return allStores
    }, [client.readQuery({ query: ALL_BOOKS })])

    includedDataStores.forEach(store => {
      if(!includedIn(store.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: store.allBooks.concat(addedBook)}
        })
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log('subscription', subscriptionData)
      window.alert(`book added: ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('library-user-token'))
    }
  }, []) //eslint-disable-line

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me)
    }
  }, [userResult.data])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recBooks')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        ALL_AUTHORS={ALL_AUTHORS}
        UPDATE_AUTHOR={UPDATE_AUTHOR}
        token={token}
      />

      <Books
        show={page === 'books'}
        ALL_BOOKS={ALL_BOOKS}
        showGenreButtons={showGenreButtons.show}
        heading='books'
        subHeading='in genre'
      />

      <Books
        show={page === 'recBooks'}
        ALL_BOOKS={ALL_BOOKS}
        showGenreButtons={showGenreButtons.hide}
        heading='recommendations'
        subHeading='books in your favorite genre'
        user={user}
      />

      <NewBook
        show={page === 'add'}
        ALL_AUTHORS={ALL_AUTHORS}
        ALL_BOOKS={ALL_BOOKS}
        CREATE_BOOK={CREATE_BOOK}
      />

      <Login
        show={page === 'login'}
        LOGIN={LOGIN}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  )
}

export default App